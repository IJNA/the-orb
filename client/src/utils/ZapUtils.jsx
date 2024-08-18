import { nip19, nip57, SimplePool, finalizeEvent } from "nostr-tools";
import { Buffer } from "buffer";

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
export const fetchInvoice = async ({ zapEndpoint, amount, comment, authorId, noteId, normalizedRelays }) => {
    const zapEvent = nip57.makeZapRequest({
        profile: authorId,
        event: noteId,
        amount,
        relays: normalizedRelays,
        comment,
    });
    const privKey = Buffer.from('fa5b9f5f1353838ed39ec92d08d94816e2f688ee87c95f7c5674227448e20452', 'hex');
    const signedEvent = finalizeEvent(zapEvent, privKey);
    if (zapEvent) {
        let url = `${zapEndpoint}?amount=${amount}&nostr=${encodeURIComponent(JSON.stringify(signedEvent))}`;

        if (comment) {
            url = `${url}&comment=${encodeURIComponent(comment)}`;
        }

        const res = await fetch(url);
        const { pr: invoice } = await res.json();

        return invoice;
    }
};

export const satToMsat = (msat) => msat * 1000;
