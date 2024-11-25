export function formatChapterEvents(events) {
    return events
        .map((event) => ({
            ...event,
            chapter: event.tags.find((tag) => tag[0] === "chapter")[1],
        }))
        .sort((a, b) => Number(a.chapter) - Number(b.chapter))
        .map((e) => e.content);
}