import type { NostrEvent } from "nostr-tools";
import { getSectionByBookTitle, BookSectionMap, getDetailsByBookTitle } from "./BookSectionMap";
import type { BookSearchResult } from "../HagahTypes";

export function formatChapterEvents(events: any[]) {
    return (events as NostrEvent[])
        .map((event) => ({
            ...event,
            chapter: event.tags?.find((tag) => tag[0] === "chapter")?.[1],
        }))
        .sort((a, b) => Number(a.chapter) - Number(b.chapter))
        .map((e) => e.content);
}

export const orderBooks = (items: BookSearchResult[]) => {
    const uniqueItems = new Map<string, BookSearchResult>();

    items.forEach((item) => {
        const itemKey = String(item.sectionName);
        const uniqueKey = `${itemKey}-${item.chapter || "0"}-${item.verse}`;

        if (!uniqueItems.has(uniqueKey)) {
            uniqueItems.set(uniqueKey, item);
        }
    });

    const uniqueItemsArray = Array.from(uniqueItems.values());
    const groupedItems = uniqueItemsArray.reduce(
        (result, item) => ({
            ...result,
            [String(item.sectionName)]: [...(result[String(item.sectionName)] || []), item],
        }),
        {} as Record<string, BookSearchResult[]>
    );

    const getSectionOrder = (title: string) => {
        const section = getSectionByBookTitle(title);
        if (!section) return 999;
        
        const sectionIndex = BookSectionMap.sections.findIndex((s: { title: string }) => s.title === section.title);
        return sectionIndex >= 0 ? sectionIndex : 999;
    };

    const sortedGroupedItems = Object.entries(groupedItems).sort((a, b) => {
        const firstItemA = a[1][0];
        const firstItemB = b[1][0];
        
        if (!firstItemA || !firstItemB) {
            return 0;
        }

        const sectionOrderA = getSectionOrder(firstItemA.title);
        const sectionOrderB = getSectionOrder(firstItemB.title);
        
        if (sectionOrderA !== sectionOrderB) {
            return sectionOrderA - sectionOrderB;
        }
        
        return a[0].localeCompare(b[0]);
    });

    return sortedGroupedItems.map(([sectionName, items]) => [
        sectionName,
        items.sort((a, b) => {
            const bookOrderDiff = a.bookOrder - b.bookOrder;
            if (bookOrderDiff !== 0) return bookOrderDiff;

            const chapterA = parseInt(a.chapter || "0");
            const chapterB = parseInt(b.chapter || "0");
            const chapterDiff = chapterA - chapterB;
            if (chapterDiff !== 0) return chapterDiff;
            return parseInt(a.verse) - parseInt(b.verse);
        }),
    ]) as [string, BookSearchResult[]][];
};