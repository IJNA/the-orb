import { create } from "zustand";

export const useHagahStore = create((set) => ({
    nostrExtension: window?.nostr,
    signedInAs: null,
    preferredRelays: [],
    setPreferredRelays: (preferredRelays) => set({ preferredRelays }),
    setSignedInAs: (signedInAs) => set({ signedInAs }),
}));
