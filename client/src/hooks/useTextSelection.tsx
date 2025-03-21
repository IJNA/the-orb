import { useEffect, useState } from "react";

interface ShareContent {
    text: string;
    url: string;
    passage: string;
}

export const useTextSelection = (currentBook: { route: string; title: string }) => {
    const [textSelection, setTextSelection] = useState<ShareContent | null>(null);

    useEffect(() => {
        const handleSelection = () => {
            try {
                const selection = window?.getSelection();
                if (!selection?.toString()) return;

                const selectedText = selection.toString();
                const verseElement = selection.anchorNode?.parentElement;

                const [, chapterId, verseId] = verseElement?.classList.item(1)?.split("-") ?? [];

                if (chapterId && verseId) {
                    const shareUrl = `${window.location.origin}${currentBook.route}/${chapterId}/${verseId}`;

                    setTextSelection({
                        text: selectedText.length < (verseElement?.textContent?.length ?? 0) ? verseElement?.textContent ?? "" : selectedText,
                        url: shareUrl,
                        passage: `${currentBook.title} ${chapterId}:${verseId}`,
                    });
                }
            } catch (err) {
                console.error("Selection error:", err);
            }
        };

        document.addEventListener("selectionchange", handleSelection);

        return () => {
            document.removeEventListener("selectionchange", handleSelection);
        };
    }, [currentBook]);

    return { textSelection };
};
