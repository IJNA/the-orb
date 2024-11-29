import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";


interface IHagahStore {
    nostrExtension: any;
    signedInAs: string | null;
    preferredRelays: string[];
    booksCache: { [x: string]: string[] };
    bookmarks: { [x: string]: string };
    triggerSearchFocus: boolean;
    setPreferredRelays: (preferredRelays: string[]) => void;
    setSignedInAs: (signedInAs: string) => void;
    setSearchFocus: (setSearchFocus: boolean) => void;
    setBookmarks: (fn: (bookmarks: { [x: string]: string }) => { [x: string]: string }) => void;
    setBooksCache: (fn: (booksCache: { [x: string]: string[] }) => { [x: string]: string[] }) => void;
};

export const useHagahStore = create<IHagahStore>()(
    persist(
        (set) => ({
            // initial state
            nostrExtension: window?.nostr,
            signedInAs: null,
            preferredRelays: [],
            booksCache: {},
            bookmarks: {},
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
            setBooksCache: (fn) => set((state) => ({ booksCache: fn(state.booksCache) }))
        }),
        // use localstorage to persist beyond this session
        { name: "hagah-bookmark", storage: createJSONStorage(() => localStorage), partialize: (state) => ({ bookmarks: state.bookmarks }) }
    )
);
