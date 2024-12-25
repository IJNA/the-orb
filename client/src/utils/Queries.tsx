import { useState, useEffect, useMemo } from "react";
import { HAGAH_PUBKEY } from "../Constants";
import { BookSectionMap, getBookTitles } from "./BookSectionMap";
import { useHagahRelay } from "../hooks/useHagahRelay";

export const useGetNostrSearchResults = (query: string) => {
    const { searchingTitle, searchingChapter, searchingVerse, queryString } = parseQuery(query);
    const [searchResults, setSearchResults] = useState<{
        title: string;
        value: string;
        verse: string;
        isPerfectMatch: boolean;
        bookOrder: number;
    }[]>([]);
    const [searchState, setSearchState] = useState({
        isLoading: true,
        isQueryEnabled: !!queryString && query?.length > 0,
        searchTimeout: false,
    });

    const hagahRelay = useHagahRelay();

    const filters = useMemo(
        () => ({
            search: queryString ?? "",
            authors: [HAGAH_PUBKEY],
            kinds: [30023],
        }),
        [queryString]
    );

    useEffect(() => {
        if (!queryString || !hagahRelay) return;

        // Reset search state
        setSearchResults([]);
        setSearchState(prev => ({ 
            ...prev, 
            isLoading: true, 
            isQueryEnabled: true, 
            searchTimeout: false 
        }));

        const subscription = hagahRelay.subscribe(filters, { closeOnEose: true });

        subscription.on("event", (event) => {
            if (searchingTitle && searchingChapter && 
                (event.tags[0]?.[1] !== searchingTitle || event.tags[2]?.[1] !== searchingChapter)) {
                return;
            }

            const title = event.tags[0]?.[1];
            const content = JSON.parse(event.content);
            
            const filteredContent = content.filter((item: { type: string; value: string; verse: number }) => {
                if (item.type !== "paragraph text") return false;
                if (!searchingVerse) return new RegExp(query, "i").test(item.value);
                return item.verse.toString() === searchingVerse;
            })[0];

            if (!filteredContent) return;

            const result = {
                title,
                ...filteredContent,
                isPerfectMatch: isPerfectMatch(filteredContent.value, query),
                bookOrder: getBookOrder(title ?? ""),
            };

            setSearchResults(prev => {
                const newResults = [...prev, result]
                    .sort((a, b) => {
                        if (a.isPerfectMatch && !b.isPerfectMatch) return -1;
                        if (!a.isPerfectMatch && b.isPerfectMatch) return 1;
                        return a.bookOrder - b.bookOrder;
                    })
                    .slice(0, 10);
                return newResults;
            });
        });

        subscription.on("eose", () => {
            setSearchState(prev => ({ ...prev, isLoading: false }));
        });

        const timeout = setTimeout(() => {
            setSearchState(prev => ({ ...prev, searchTimeout: true, isLoading: false }));
        }, 30000);

        return () => {
            clearTimeout(timeout);
        };
    }, [queryString, hagahRelay, filters, query, searchingVerse, searchingTitle, searchingChapter]);

    return {
        data: searchResults,
        isLoading: searchState.isLoading,
        searchTimeout: searchState.searchTimeout,
    };
};

function parseQuery(query: string) {
    if (!query) return { 
        type: "invalid", 
        searchingTitle: null, 
        searchingChapter: null, 
        searchingVerse: null, 
        queryString: null 
    };

    const bookNames = getBookTitles();
    const lowerQuery = query.toLowerCase().trim();

    // Regex should match: "1 Timothy 1:1", "John 3:16", "2 Kings 4:5"
    const verseRefRegex = /^(\d*\s*[a-z]+)\s+(\d+):(\d+)$/i;
    const match = lowerQuery.match(verseRefRegex);

    if (match) {
        const [_, bookPart, chapter, verse] = match;
        const normalizedBookName = bookPart?.replace(/^(\d+)\s*/, '$1 ').toLowerCase();
       
        const matchedBook = bookNames.find(book => 
            book.toLowerCase().replace('-', ' ') === normalizedBookName
        );

        if (matchedBook) {
            return {
                type: "bookChapterVerse",
                searchingTitle: matchedBook.replace(/-/g, " "),
                searchingChapter: chapter,
                searchingVerse: verse,
                queryString: JSON.stringify({ 
                    book: matchedBook.replace(/-/g, " "), 
                    chapter, 
                    verse 
                }),
            };
        }
    }

    // Fallback to existing text search logic
    return {
        type: "verseText",
        searchingTitle: null,
        searchingChapter: null,
        searchingVerse: null,
        queryString: JSON.stringify({ text: query }),
    };
}

function getBookOrder(bookTitle: string): number {
    const bookOrder = BookSectionMap.sections.flatMap((section) => section.books.map((book) => book.title));
    return bookOrder.indexOf(bookTitle);
};

function isPerfectMatch(text: string, query: string): boolean {
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    const words = normalizedText.split(/[\s,.!?;:]/);

    if (normalizedQuery.includes(" ")) {
        return normalizedText.includes(normalizedQuery);
    }

    return words.some((word) => word === normalizedQuery);
};
