import { useState, useEffect, useMemo, useRef } from "react";
import { HAGAH_PUBKEY } from "../Constants";
import { BookSectionMap, getBookTitles, getSectionByBookTitle } from "./BookSectionMap";
import { useHagahRelay } from "../hooks/useHagahRelay";
import { useSearchCache } from "./SearchCache";

export const useGetNostrSearchResults = (query: string) => {
    const trimmedQuery = query.trim();
    const { searchingTitle, searchingChapter, searchingVerse, queryString } = parseQuery(trimmedQuery);
    const [searchResults, setSearchResults] = useState<
        {
            sectionName: string;
            title: string;
            chapter?: string;
            value: string;
            verse: string;
            isPerfectMatch: boolean;
            bookOrder: number;
        }[]
    >([]);
    const [searchState, setSearchState] = useState({
        isLoading: true,
        isQueryEnabled: !!queryString && trimmedQuery?.length > 0,
        searchTimeout: false,
    });

    const uniqueResultsRef = useRef<Set<string>>(new Set());
    const latestResultsRef = useRef(searchResults);
    const shouldCacheRef = useRef(false);

    const { getCachedResults, setCachedResults } = useSearchCache();

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

        const cachedResults = getCachedResults<typeof searchResults>(trimmedQuery);
        if (cachedResults) {
            setSearchResults(cachedResults);
            setSearchState((prev) => ({
                ...prev,
                isLoading: false,
                isQueryEnabled: true,
                searchTimeout: false,
            }));
            return;
        }

        setSearchResults([]);

        uniqueResultsRef.current = new Set();

        setSearchState((prev) => ({
            ...prev,
            isLoading: true,
            isQueryEnabled: true,
            searchTimeout: false,
        }));

        const subscription = hagahRelay.subscribe(filters, { closeOnEose: true });

        subscription.on("event", (event) => {
            if (searchingTitle && searchingChapter && (event.tags[0]?.[1] !== searchingTitle || event.tags[2]?.[1] !== searchingChapter)) {
                return;
            }

            const title = event.tags[0]?.[1];
            const section = getSectionByBookTitle(title);
            const sectionName = section?.name;
            const content = JSON.parse(event.content);
            const isText = (type: string) => type.includes("text") || type.includes("stanza");

            const filteredContent = content.filter((item: { type: string; value: string; verse: number }) => {
                if (!isText(item.type)) return false;
                if (!searchingVerse) return new RegExp(trimmedQuery, "i").test(item.value);
                return item.verse.toString() === searchingVerse;
            })[0];

            if (!filteredContent) return;

            const uniqueKey = `${title}-${filteredContent.verse}`;

            if (uniqueResultsRef.current.has(uniqueKey)) {
                return;
            }

            uniqueResultsRef.current.add(uniqueKey);

            const result = {
                title,
                sectionName,
                ...filteredContent,
                isPerfectMatch: isPerfectMatch(filteredContent.value, trimmedQuery),
                bookOrder: getBookOrder(title ?? ""),
            };

            setSearchResults((prev) => {
                const newResults = [...prev, result].sort((a, b) => {
                    if (a.isPerfectMatch && !b.isPerfectMatch) return -1;
                    if (!a.isPerfectMatch && b.isPerfectMatch) return 1;
                    return a.bookOrder - b.bookOrder;
                });
                latestResultsRef.current = newResults;
                return newResults;
            });
        });

        subscription.on("eose", () => {
            setSearchState((prev) => ({ ...prev, isLoading: false }));
            shouldCacheRef.current = true;
        });

        const timeout = setTimeout(() => {
            setSearchState((prev) => ({ ...prev, searchTimeout: true, isLoading: false }));
            shouldCacheRef.current = true;
        }, 30000);

        return () => {
            clearTimeout(timeout);
        };
    }, [queryString, hagahRelay, filters, trimmedQuery, searchingVerse, searchingTitle, searchingChapter, getCachedResults]);

    useEffect(() => {
        if (shouldCacheRef.current && searchResults.length > 0 && !searchState.isLoading) {
            setCachedResults(trimmedQuery, searchResults);
            shouldCacheRef.current = false;
        }
    }, [searchState.isLoading, trimmedQuery, setCachedResults, searchResults]);

    return {
        data: searchResults,
        isLoading: searchState.isLoading,
        searchTimeout: searchState.searchTimeout,
    };
};

function parseQuery(query: string) {
    if (!query)
        return {
            type: "invalid",
            searchingTitle: null,
            searchingChapter: null,
            searchingVerse: null,
            queryString: null,
        };

    const bookNames = getBookTitles();
    const lowerQuery = query.toLowerCase().trim();

    // Regex should match: "1 Timothy 1:1", "John 3:16", "2 Kings 4:5"
    const verseRefRegex = /^(\d*\s*[a-z]+)\s+(\d+):(\d+)$/i;
    const match = lowerQuery.match(verseRefRegex);

    if (match) {
        const [_, bookPart, chapter, verse] = match;
        const normalizedBookName = bookPart?.replace(/^(\d+)\s*/, "$1 ").toLowerCase();

        const matchedBook = bookNames.find((book) => book.toLowerCase().replace("-", " ") === normalizedBookName);

        if (matchedBook) {
            return {
                type: "bookChapterVerse",
                searchingTitle: matchedBook.replace(/-/g, " "),
                searchingChapter: chapter,
                searchingVerse: verse,
                queryString: JSON.stringify({
                    book: matchedBook.replace(/-/g, " "),
                    chapter,
                    verse,
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
}

function isPerfectMatch(text: string, query: string): boolean {
    const normalizedText = text.toLowerCase();
    const normalizedQuery = query.toLowerCase();

    const words = normalizedText.split(/[\s,.!?;:]/);

    if (normalizedQuery.includes(" ")) {
        return normalizedText.includes(normalizedQuery);
    }

    return words.some((word) => word === normalizedQuery);
}
