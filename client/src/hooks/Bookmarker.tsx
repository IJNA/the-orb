import { useRef, useEffect, useMemo } from "react";
import { useHagahStore } from "../HagahStore";
import { normalizeBookTitle } from "../utils/BookSectionMap";
import { useCurrentBook } from "./BookMapHooks";

export const useBookmarker = () => {
    const visibleElementsRef = useRef<Set<HTMLElement>>(new Set());
    const setBookmarks = useHagahStore((state) => state.setBookmarks);
    const currentBook = useCurrentBook();
    const isIos = navigator.userAgent.match(/ipad|iphone/i);

    useEffect(() => {
        const saveBookmark = () => {
            const isScrollbarAtTop = window.scrollY === 0;
            const bookmarkedPassageClassName = visibleElementsRef.current.size > 0 ? [...visibleElementsRef.current][0].className : null;

            if (currentBook && bookmarkedPassageClassName) {
                setBookmarks((prevBookmarks) => ({
                    ...prevBookmarks,
                    [normalizeBookTitle(currentBook.title)]: isScrollbarAtTop ? null : bookmarkedPassageClassName, // If the scrollbar is at the top, don't bookmark anything
                }));
            }
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    visibleElementsRef.current.add(entry.target);
                } else {
                    visibleElementsRef.current.delete(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 1,
        });

        const passageElements = document.querySelectorAll(".verse");
        passageElements.forEach((element) => observer.observe(element));

        window.addEventListener(isIos ? "pagehide" : "beforeunload", saveBookmark);

        return () => {
            observer.disconnect();
            // We need to save their spot in the page only when this component unmounts or they close the tab
            window.removeEventListener(isIos ? "pagehide" : "beforeunload", saveBookmark);
            saveBookmark();
        };
    }, [currentBook?.title, isIos, setBookmarks]);

    // This could return the visible elements if needed but persisting bookmarks with the store is enough for now
    return;
};
