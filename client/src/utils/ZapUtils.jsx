import { nip19, nip57, SimplePool } from "nostr-tools";

const CACHE_PREFIX = "nostrZap.";
const LIGHTNING_URI_KEY = "lightningUri";

const isLocalStorageAvailable = () => typeof localStorage !== "undefined";

const getCachedValue = (key) => {
    if (!isLocalStorageAvailable()) {
        return;
    }

    return localStorage.getItem(`${CACHE_PREFIX}${key}`);
};

const setCachedValue = (key, value) => {
    if (!isLocalStorageAvailable()) {
        return;
    }

    localStorage.setItem(`${CACHE_PREFIX}${key}`, value);
};

export const getCachedLightningUri = () => getCachedValue(LIGHTNING_URI_KEY);

export const cacheLightningUri = (value) => setCachedValue(LIGHTNING_URI_KEY, value);

let cachedProfileMetadata = {};

export const getProfileMetadata = async (authorId, relays) => {
    if (cachedProfileMetadata[authorId]) {
        return cachedProfileMetadata[authorId];
    }
    const pool = new SimplePool();
    try {
        return await pool.get(relays, {
            authors: [authorId],
            kinds: [0],
        });
    } catch (error) {
        throw new Error("failed to fetch user profile :(");
    } finally {
        pool.close(relays);
    }
};

export const listenForZapReceipt = ({ relays, invoice, onSuccess }) => {
    const pool = new SimplePool();
    const normalizedRelays = Array.from(new Set([...relays, "wss://relay.nostr.band"]));
    const closePool = () => {
        if (pool) {
            pool.close(normalizedRelays);
        }
    };
    const since = Math.round(Date.now() / 1000);

    // check for zap receipt every 5 seconds
    const intervalId = setInterval(() => {
        // @ts-ignore
        const sub = pool.sub(normalizedRelays, [
            {
                kinds: [9735],
                since,
            },
        ]);

        sub.on("event", (event) => {
            if (event.tags.find((t) => t[0] === "bolt11" && t[1] === invoice)) {
                onSuccess();
                closePool();
                // @ts-ignore
                clearInterval(intervalId);
            }
        });
    }, 5000);

    return () => {
        closePool();
        // @ts-ignore
        clearInterval(intervalId);
    };
};

export const satToMsat = (msat) => msat * 1000;

export const fetchInvoice = async ({ zapEndpoint, amount, comment, authorId, noteId, normalizedRelays }) => {
    const zapEvent = nip57.makeZapRequest({
        profile: authorId,
        event: null,
        amount,
        relays: normalizedRelays,
        comment,
    });
    
    let url = `${zapEndpoint}?amount=${amount}&nostr=${encodeURIComponent(JSON.stringify(zapEvent))}`;

    if (comment) {
        url = `${url}&comment=${encodeURIComponent(comment)}`;
    }

    const res = await fetch(url);
    const { pr: invoice } = await res.json();

    return invoice;
};

const makeZapEvent = async ({ profile, event, amount, relays, comment }) => {
    const zapEvent = nip57.makeZapRequest({
        profile,
        event,
        amount,
        relays,
        comment,
    });

    return window?.nostr?.signEvent(zapEvent);
};