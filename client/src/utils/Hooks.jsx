import { useLocation } from "react-router-dom";
import { BookSectionMap } from "../pages/BookSectionMap";
import TITLES from "../book";

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

export const findSectionByAPIBookTitle = (bookId) => {
    const getBookTitle = () => {
        for (let key in TITLES) {
            if (TITLES[key].API_NAME === bookId) {
                return TITLES[key].BOOK_NAME;
            }
        }
        return null;
    };
    for (let section of BookSectionMap.sections) {
        for (let book of section.books) {
            if (book.title.toLowerCase() === getBookTitle()?.toLowerCase()) {
                console.log({ section, book });
                return { section, book };
            }
        }
    }
    
    return { section: null, book: null };
};
