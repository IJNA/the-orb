import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useHagahStore = create(
    persist(
        (set) => ({
            nostrExtension: window?.nostr,
            signedInAs: null,
            preferredRelays: [],
            setPreferredRelays: (preferredRelays) => set({ preferredRelays }),
            setSignedInAs: (signedInAs) => set({ signedInAs }),
            booksCache: {},
            bookmarks: [],
            // pass a function with existing bookmarks to mimic setState
            setBookmarks: (fn) => set((state) => ({ bookmarks: fn(state.bookmarks) })),
            setBooksCache: (fn) => set((state) => ({ booksCache: fn(state.booksCache) }))
        }),
        // use localstorage to persist beyond this session
        { name: "hagah-bookmark", storage: createJSONStorage(() => localStorage), partialize: (state) => ({ bookmarks: state.bookmarks }) }
    )
);
