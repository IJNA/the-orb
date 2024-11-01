import { useLocation } from "react-router-dom";
import { BookSectionMap, normalizeBookTitle } from "../pages/BookSectionMap.jsx";
import { useRef, useEffect } from "react";
import { useHagahStore } from "../HagahStore.jsx";

export const useCurrentSection = () => {
    const location = useLocation();
    const section = BookSectionMap.sections?.find((section) => location.pathname.includes(section.route));
    return section;
};

export const useCurrentBook = () => {
    const location = useLocation();
    const currentSection = useCurrentSection();
    if (!currentSection?.books) return;
    return currentSection.books.find((book) => location.pathname.includes(book.route));
};

export const useBookmarker = () => {
    const visibleElementsRef = useRef(new Set());
    const setBookmarks = useHagahStore((state) => state.setBookmarks);
    const currentBook = useCurrentBook();

    useEffect(() => {
        const saveBookmark = () => {
            const bookmarkedPassageClassName = visibleElementsRef.current.size > 0 ? [...visibleElementsRef.current][0].className : null;

            if (bookmarkedPassageClassName) {
                setBookmarks((prevBookmarks) => ({
                    ...prevBookmarks,
                    [normalizeBookTitle(currentBook.title)]: bookmarkedPassageClassName,
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
            threshold: 0.5, // 50% of the element should be visible
        });

        const passageElements = document.querySelectorAll(".verse");
        passageElements.forEach((element) => observer.observe(element));

        window.addEventListener("beforeunload", saveBookmark);

        return () => {
            observer.disconnect();
            // We need to save their spot in the page only when this component unmounts or they close the tab
            window.removeEventListener("beforeunload", saveBookmark);
            saveBookmark();
        };
    }, [currentBook.title, setBookmarks]);

    // This could return the visible elements if needed but persisting bookmarks with the store is enough for now
    return;
};
