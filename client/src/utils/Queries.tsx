import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { HAGAH_PUBKEY, HAGAH_RELAY } from "../Constants";
import { useSubscribe } from "nostr-hooks";
import { BookSectionMap, getBookTitles, normalizeBookTitle } from "./BookSectionMap";

const getBookOrder = (bookTitle: string): number => {
    const bookOrder = BookSectionMap.sections.flatMap((section) => section.books.map((book) => book.title));
    return bookOrder.indexOf(bookTitle);
};

const isPerfectMatch = (text: string, query: string): boolean => {
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    const words = normalizedText.split(/[\s,.!?;:]/);

    if (normalizedQuery.includes(" ")) {
        return normalizedText.includes(normalizedQuery);
    }

    return words.some((word) => word === normalizedQuery);
};

export const useGetNostrSearchResults = (query: string) => {
    const { searchingTitle, searchingChapter, searchingVerse, queryString } = parseQuery(query);
    const [isLoading, setIsLoading] = useState(true);
    const [isQueryEnabled, setIsQueryEnabled] = useState(!!queryString && query?.length > 0);
    const [searchTimeout, setSearchTimeout] = useState(false);

    const relays = useMemo(() => [HAGAH_RELAY], []);
    const filters = useMemo(
        () => [
            {
                search: queryString,
                authors: [HAGAH_PUBKEY],
            },
        ],
        [queryString]
    );

    const { events } = useSubscribe({ filters, relays, enabled: isQueryEnabled });

    useEffect(() => {
        if (queryString) {
            setIsLoading(true);
            setIsQueryEnabled(true);
            setSearchTimeout(false);

            const timeout = setTimeout(() => {
                setSearchTimeout(true);
                setIsLoading(false);
            }, 30000); // Stop searching after 30 seconds

            return () => clearTimeout(timeout);
        }
    }, [queryString]);

    const searchResults = useMemo(() => {
        if (!events.length) return [];

        const results = events
            .filter((event) => (searchingTitle && searchingChapter ? event.tags[0]?.[1] === searchingTitle && event.tags[2]?.[1] === searchingChapter : true))
            .map((event) => {
                const title = event.tags[0]?.[1];
                const content = JSON.parse(event.content);
                const filteredContent = content.filter((item) => {
                    if (item.type !== "paragraph text") return false;
                    if (!searchingVerse) return new RegExp(query, "i").test(item.value);
                    return item.verse.toString() === searchingVerse;
                });

                return filteredContent.length > 0
                    ? {
                          title,
                          ...filteredContent[0],
                          isPerfectMatch: isPerfectMatch(filteredContent[0].value, query),
                          bookOrder: getBookOrder(title ?? ""),
                      }
                    : null;
            })
            .filter((item): item is NonNullable<typeof item> => item !== null);

        // Priori
        results.sort((a, b) => {
            if (a.isPerfectMatch && !b.isPerfectMatch) return -1;
            if (!a.isPerfectMatch && b.isPerfectMatch) return 1;
            return a.bookOrder - b.bookOrder;
        });

        // Limit to 10 results
        return results.slice(0, 10);
    }, [events, searchingTitle, searchingChapter, searchingVerse, query]);

    return {
        data: searchResults,
        isLoading,
        searchTimeout,
    };
};

function parseQuery(query: string) {
    if (!query) return { type: "invalid", searchingTitle: null, searchingChapter: null, searchingVerse: null, queryString: null };

    const bookNames = getBookTitles();

    const lowerQuery = query.toLowerCase();
    let potentialBook = lowerQuery;
    let restOfQuery = "";

    // Check if there's a colon "book chapter:verse"
    const colonIndex = lowerQuery.indexOf(":");
    if (colonIndex !== -1) {
        // Assume everything before the number and colon is the book name
        const match = lowerQuery.slice(0, colonIndex - 1).trim();

        if (match) {
            potentialBook = normalizeBookTitle(match) ?? ""; // Extract the book name
            restOfQuery = `${match[2]}:${lowerQuery.slice(colonIndex + 1).trim()}`; // Extract chapter and verse
        }
    }

    const matchedBook = bookNames.find((book) => potentialBook.startsWith(book));

    if (matchedBook) {
        const queryWithoutBook = lowerQuery.slice(matchedBook.length).trim();
        const queryParts = restOfQuery || queryWithoutBook.split(/[\s:]+/);

        if (queryParts.length === 2 && queryParts?.[0]?.match(/^\d+$/) && queryParts?.[1]?.match(/^\d+$/)) {
            return {
                type: "bookChapterVerse",
                searchingTitle: matchedBook.replace(/-/g, " "),
                searchingChapter: queryParts[0],
                searchingVerse: queryParts[1],
                queryString: JSON.stringify({ book: matchedBook.replace(/-/g, " "), chapter: queryParts[0], verse: queryParts[1] }),
            };
        } else if (queryParts.length === 1 && queryParts?.[0]?.match(/^\d+$/)) {
            return {
                type: "bookChapter",
                searchingTitle: matchedBook.replace(/-/g, " "),
                searchingChapter: queryParts[0],
                searchingVerse: null,
                queryString: JSON.stringify({ book: matchedBook.replace(/-/g, " "), chapter: queryParts[0] }),
            };
        } else {
            return {
                type: "bookOnly",
                searchingTitle: matchedBook.replace(/-/g, " "),
                searchingChapter: null,
                searchingVerse: null,
                queryString: JSON.stringify({ book: matchedBook.replace(/-/g, " ") }),
            };
        }
    }
    return {
        type: "verseText",
        searchingTitle: null,
        searchingChapter: null,
        searchingVerse: null,
        queryString: JSON.stringify({ text: query }),
    };
}
