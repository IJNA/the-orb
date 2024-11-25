import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useHagahStore = create(
    persist(
        (set) => ({
            // initial state
            nostrExtension: window?.nostr,
            signedInAs: null,
            preferredRelays: [],
            booksCache: {},
            bookmarks: [],
            triggerSearchFocus: false,
            // set functions
            setPreferredRelays: (preferredRelays) => set({ preferredRelays }),
            setSignedInAs: (signedInAs) => set({ signedInAs }),
            setSearchFocus: (triggerSearchFocus) => {
                set({ triggerSearchFocus })
            },
            // pass a function with existing bookmarks to mimic setState
            setBookmarks: (fn) => set((state) => ({ bookmarks: fn(state.bookmarks) })),
            setBooksCache: (fn) => set((state) => ({ booksCache: fn(state.booksCache) }))
        }),
        // use localstorage to persist beyond this session
        { name: "hagah-bookmark", storage: createJSONStorage(() => localStorage), partialize: (state) => ({ bookmarks: state.bookmarks }) }
    )
);
