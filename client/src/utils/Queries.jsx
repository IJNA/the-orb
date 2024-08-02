import axios from "axios";
import { dateToUnix, useNostrEvents } from "nostr-react";
import { kinds } from "nostr-tools";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

const url = process.env.REACT_APP_API_URL;

export const useGetNostrSearchResults = (query) => {
    const { searchingTitle, searchingChapter, searchingVerse, queryString } = parseQuery(query);
    const [isLoading, setIsLoading] = useState(true);
    const [isQueryEnabled, setIsQueryEnabled] = useState(!!queryString && query?.length > 0);

    const { events } = useNostrEvents({
        filter: {
            search: queryString,
            kinds: [kinds.LongFormArticle],
            authors: ["957966b656723845d6d63f102715203e17a2865efe270591400407ee2d4fe6b7"],
            since: dateToUnix(new Date("2024-07-07")),
            limit: 100,
        },
        enabled: isQueryEnabled,
    });

    useEffect(() => {
        if (queryString) {
            setIsLoading(true);
            setIsQueryEnabled(true);

            const timeout = setTimeout(() => {
                setIsQueryEnabled(false);
                setIsLoading(false);
            }, 10000); // Stop searching after 10 seconds

            return () => clearTimeout(timeout);
        }
    }, [queryString]);

    const found = events
        .filter((event) => {
            return searchingTitle && searchingChapter
                ? event.tags[0][1] === searchingTitle && event.tags[1][1] === searchingChapter
                : true;
        })
        .map((event) => {
            const title = event.tags[0][1];
            const content = JSON.parse(event.content);
            const filteredContent = content.filter((c) => {
                if (c.type !== "paragraph text") {
                    return false;
                }

                if (searchingVerse) {
                    return c.verse.toString() === searchingVerse;
                } else {
                    return c.value.includes(query);
                }
            });
            return filteredContent.length > 0 ? { title, content: filteredContent } : null;
        })
        .filter((item) => item !== null);
    return { data: query ? found : [], isLoading };
};

export const useGetSearchResults = (query) => {
    const { searchingTitle, searchingChapter, searchingVerse, queryString } = parseQuery(query);

    return useQuery({
        queryKey: ["search", queryString],
        queryFn: async () => {
            if (searchingTitle && searchingChapter && searchingVerse) {
                const response = await axios.get(
                    `${url}/bible/${searchingTitle}/${searchingChapter}/${searchingVerse}`
                );
                return response.data ? response.data.sort((a, b) => Number(a.chapter) - Number(b.chapter)) : null;
            }
            const response = await axios.get(`${url}/bible/search/${query}`);
            return response.data ? response.data.sort((a, b) => Number(a.chapter) - Number(b.chapter)) : null;
        },
        staleTime: Infinity,
        enabled: !!query,
    });
};

export const useGetBookFromDatabase = (bookName) => {
    return useQuery({
        queryKey: ["book", bookName],
        queryFn: async () => {
            const response = await axios.get(`${url}/bible/${bookName}`);
            return response.data ? response.data.sort((a, b) => Number(a.chapter) - Number(b.chapter)) : null;
        },
        staleTime: Infinity,
        enabled: !!bookName,
    });
};

const parseQuery = (query) => {
    if (!query) return { searchingTitle: null, searchingChapter: null, searchingVerse: null, queryString: null };
    const queryParts = query.toLowerCase().split(/[\s:]+/);
    if (queryParts.length === 3 && queryParts[1].match(/^\d+$/) && queryParts[2].match(/^\d+$/)) {
        return {
            searchingTitle: queryParts[0],
            searchingChapter: queryParts[1],
            searchingVerse: queryParts[2],
            queryString: JSON.stringify({ verse: queryParts[2] }),
        };
    }
    return { searchingTitle: null, searchingChapter: null, searchingVerse: null, queryString: JSON.stringify(query) };
};
