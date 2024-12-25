import NDK, { type NDKFilter } from "@nostr-dev-kit/ndk";
import "websocket-polyfill";
import { HAGAH_PUBKEY, HAGAH_RELAY } from "../Constants";
import { useEffect, useMemo } from "react";


export const useHagahRelay = () => {
    const ndk = useMemo(() => new NDK({
        explicitRelayUrls: [HAGAH_RELAY],
    }), []);

    useEffect(() => {
        ndk.connect();
    }, [ndk])
    
    return ndk;
}
