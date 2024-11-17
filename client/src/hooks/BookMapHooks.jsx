import { useLocation } from "react-router-dom";
import { BookSectionMap } from "../utils/BookSectionMap.jsx";
import { useMemo } from "react";

export const useCurrentSection = () => {
    const location = useLocation();
    return useMemo(() => {
        return BookSectionMap.sections?.find((section) =>
            location.pathname.includes(section.route)
        );
    }, [location.pathname]);
};

export const useCurrentBook = () => {
    const location = useLocation();
    const currentSection = useCurrentSection();
    return useMemo(() => {
        if (!currentSection?.books) return;
        return currentSection.books.find((book) =>
            location.pathname.includes(book.route)
        );
    }, [location.pathname, currentSection]);
};
