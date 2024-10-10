import React, { useEffect, useMemo, useState } from "react";
import { dateToUnix, useNostrEvents, useNostr } from "nostr-react";
import { nip19, kinds } from "nostr-tools";
import { useQuery } from "@tanstack/react-query";
import { BookSectionMap, findChaptersByBookTitle } from "../pages/BookSectionMap.jsx";
import { NostrFetcher } from "nostr-fetch";

export const useGetBookChaptersByBookName = (bookName) => {
    const relayUrls = [
        "wss://relay.hagah.io",
    ];
    const fetcher = NostrFetcher.init();
    const chapters = findChaptersByBookTitle(bookName).map((chapter) => chapter.nostrId);
    const filter = {
        ids: chapters,
        kinds: [kinds.LongFormArticle],
        authors: ["957966b656723845d6d63f102715203e17a2865efe270591400407ee2d4fe6b7"],
    };

    return useQuery({
        queryKey: ["book", bookName],
        queryFn: async () => {
            const response = await fetcher.fetchAllEvents(relayUrls, filter, {
                since: dateToUnix(new Date("2024-07-01")),
            });
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
