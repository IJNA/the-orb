import { useLocation } from "react-router-dom";
import { BookSectionMap } from "../pages/BookSectionMap";


export const useCurrentSection = () => {
    const location = useLocation();
    const section = BookSectionMap.sections.find((section) => location.pathname.includes(section.route));
    return section;
};

export const useCurrentBook = () => {
    const location = useLocation();
    const currentSection = useCurrentSection();
    return currentSection.books.find((book) => location.pathname.includes(book.route));
};