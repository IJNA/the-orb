import { dateToUnix, useNostr } from "nostr-react";
import { kinds } from "nostr-tools";
import { useQuery } from "@tanstack/react-query";
import { findChaptersByBookTitle } from "../pages/BookSectionMap.jsx";
// @ts-ignore
import { NostrFetcher } from "nostr-fetch";

export const useGetBookChaptersByBookName = (bookName) => {
    const { connectedRelays } = useNostr();
    const relayUrls = connectedRelays.map((relay) => relay.url);
    const fetcher = NostrFetcher.init();
    const chapters = findChaptersByBookTitle(bookName);
    const chapterIds = chapters.map((chapter) => chapter.nostrId);

    return useQuery({
        queryKey: ["book", bookName, relayUrls],
        queryFn: async () => {
            const response = relayUrls.length > 0 ? await fetcher.fetchAllEvents(
                relayUrls,
                {
                    ids: chapterIds,
                    kinds: [kinds.LongFormArticle],
                    authors: ["957966b656723845d6d63f102715203e17a2865efe270591400407ee2d4fe6b7"],
                },
                {
                    since: dateToUnix(new Date("2024-07-01")),
                }
            ) : [];
            return response
                .map((event) => ({
                    ...event,
                    chapter: event.tags.find((tag) => tag[0] === "chapter")[1],
                }))
                .sort((a, b) => Number(a.chapter) - Number(b.chapter))
                .map((e) => e.content);
        },

        staleTime: Infinity,
        enabled: !!bookName,
    });
};
