import { useState, useEffect, useMemo, useRef } from "react";
import { HAGAH_PUBKEY } from "../Constants";
import { BookSectionMap, getBookTitles, getSectionByBookTitle } from "./BookSectionMap";
import { useHagahRelay } from "../hooks/useHagahRelay";
import { useSearchCache } from "./SearchCache";

type EventItem = {
    type: string;
    value: string;
    verse: number;
    chapter?: string;
}
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
        searchTimeout: false,
    });

    const uniqueResultsRef = useRef<Set<string>>(new Set());
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
                searchTimeout: false,
            }));
            return;
        }

        setSearchResults([]);

        uniqueResultsRef.current = new Set();
        shouldCacheRef.current = false;

        setSearchState((prev) => ({
            ...prev,
            isLoading: true,
            searchTimeout: false,
        }));

        const subscription = hagahRelay.subscribe(filters, { closeOnEose: true });

        subscription.on("event", (event) => {
            const norm = (s?: string | null) => s?.toLowerCase().replace(/-/g, " ").trim();
            if (searchingTitle && searchingChapter) {
                if (norm(event.tags?.[0]?.[1]) !== norm(searchingTitle) || norm(event.tags?.[2]?.[1]) !== norm(searchingChapter)) return;
            }

            const title = event.tags[0]?.[1];
            const section = getSectionByBookTitle(title);
            const sectionName = section?.name;
            let content: EventItem[] = [];
            try {
                content = JSON.parse(event.content);
            } catch {
                return; 
            }

            const regex = searchingVerse ? null : new RegExp(escapeRegExp(trimmedQuery), "i");

            const filteredContent = content.filter((item: EventItem) => {
                if (searchingVerse) return item.verse.toString() === searchingVerse;
                return regex!.test(item.value ?? "");
            });

            if (!filteredContent.length) return;

            filteredContent.forEach((item: EventItem) => {
                const uniqueKey = `${title}-${item.chapter ?? ""}-${item.verse}`;

                if (uniqueResultsRef.current.has(uniqueKey)) {
                    return;
                }

                uniqueResultsRef.current.add(uniqueKey);

                const result = {
                    title: title ?? "",
                    sectionName: sectionName ?? "",
                    chapter: item.chapter,
                    value: String(item.value ?? ""),
                    verse: String(item.verse ?? ""),
                    isPerfectMatch: isPerfectMatch(String(item.value ?? ""), trimmedQuery),
                    bookOrder: getBookOrder(title ?? ""),
                };

                setSearchResults((prev) => {
                    const newResults = [...prev, result].sort((a, b) => {
                        if (a.isPerfectMatch && !b.isPerfectMatch) return -1;
                        if (!a.isPerfectMatch && b.isPerfectMatch) return 1;
                        return a.bookOrder - b.bookOrder;
                    });
                    return newResults;
                });
            });
        });

        subscription.on("eose", () => {
            setSearchState((prev) => ({ ...prev, isLoading: false, searchTimeout: false }));
            shouldCacheRef.current = true;
            clearTimeout(timeout);
        });

        const timeout = setTimeout(() => {
            setSearchState((prev) => ({ ...prev, searchTimeout: true, isLoading: false }));
            shouldCacheRef.current = true;
        }, 30000);

        return () => {
            clearTimeout(timeout);
            // best-effort cleanup if available in NDK version
            // @ts-ignore
            subscription?.stop?.();
            // @ts-ignore
            subscription?.close?.();
        };
    }, [queryString, hagahRelay, trimmedQuery, searchingVerse, searchingTitle, searchingChapter, getCachedResults]);

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

    const verseRefRegex = /^(\d*\s*[a-z]+)\s+(\d+):(\d+)$/i;
    const match = lowerQuery.match(verseRefRegex);

    if (match) {
        const [_, bookPart, chapter, verse] = match;
        const normalizedBookName = bookPart?.replace(/^(\d+)\s*/, "$1 ").toLowerCase();

        const matchedBook = bookNames.find((book) => book.toLowerCase().replace(/-/g, " ") === normalizedBookName);

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
        queryString: query,
    };
}

function getBookOrder(bookTitle: string): number {
    const bookOrder = BookSectionMap.sections.flatMap((section) => section.books.map((book) => book.title));
    
    let index = bookOrder.indexOf(bookTitle);
    
    if (index === -1) {
        const lowerBookTitle = bookTitle.toLowerCase();
        index = bookOrder.findIndex(title => title.toLowerCase() === lowerBookTitle);
    }
    
    if (index === -1) {
        const normalizedBookTitle = bookTitle.toLowerCase().replace(/[-\s]/g, '');
        index = bookOrder.findIndex(title => title.toLowerCase().replace(/[-\s]/g, '') === normalizedBookTitle);
    }
    
    return index;
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

function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
