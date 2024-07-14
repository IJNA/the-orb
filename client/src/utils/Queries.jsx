import { dateToUnix, useNostrEvents } from "nostr-react";
import { kinds } from "nostr-tools";
import { useState, useEffect } from "react";

export const useGetSearchResults = (query) => {
    const { searchingTitle, searchingChapter, searchingVerse, queryString } = parseQuery(query);
    const [isLoading, setIsLoading] = useState(true);
    const [lastEventTime, setLastEventTime] = useState(Date.now());
    const [isQueryEnabled, setIsQueryEnabled] = useState(!!queryString && query?.length > 0);

    const { events } = useNostrEvents({
        filter: {
            search: queryString,
            kinds: [kinds.LongFormArticle],
            authors: ["957966b656723845d6d63f102715203e17a2865efe270591400407ee2d4fe6b7"],
            since: dateToUnix(new Date("2024-07-07")),
            limit: 500,
        },
        enabled: isQueryEnabled,
    });

    useEffect(() => {
        if (events.length > 0) {
            setLastEventTime(Date.now());
        }
    }, [events]);

    useEffect(() => {
        const checkInactivity = setInterval(() => {
            if (Date.now() - lastEventTime > 5000) {
                // Adjust the timeout as needed
                setIsLoading(false);
                clearInterval(checkInactivity);
            }
        }, 1000);

        return () => clearInterval(checkInactivity);
    }, [lastEventTime]);

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
