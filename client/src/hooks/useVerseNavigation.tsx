import { useEffect, type MutableRefObject } from "react";

interface VerseNavigationProps {
    bookTitle: string;
    selectedChapter?: string;
    selectedVerse?: string;
    verseRefs: MutableRefObject<{ [x: string]: HTMLElement }>;
    bookmarkedElement?: string;
}

export const useVerseNavigation = ({ bookTitle, selectedChapter, selectedVerse, verseRefs, bookmarkedElement }: VerseNavigationProps) => {
    useEffect(() => {
        const findVerseElement = () => {
            if (!bookTitle || !selectedChapter || !selectedVerse) return null;

            const verseId = `${bookTitle}-${selectedChapter}-${selectedVerse}`;
            return verseRefs.current[verseId] || null;
        };

        // For selected verse navigation
        if (selectedChapter && selectedVerse) {
            // Use a slightly delayed execution to ensure the DOM is fully rendered
            const scrollTimer = setTimeout(() => {
                const selectedVerseElement = findVerseElement();

                if (selectedVerseElement) {
                    try {
                        const rect = selectedVerseElement.getBoundingClientRect();
                        const scrollTop = rect.top + window.scrollY - window.innerHeight / 2;
                        window.scrollTo({
                            top: scrollTop,
                            behavior: "smooth",
                        });
                        setTimeout(() => {
                            selectedVerseElement.classList.add("has-background-warning");
                        }, 500);
                    } catch (err) {
                        selectedVerseElement.scrollIntoView({
                            block: "center",
                            behavior: "smooth",
                        });
                        selectedVerseElement.classList.add("has-background-warning");
                    }

                    // Remove highlight on interaction
                    const handleUserInteraction = () => {
                        if (selectedVerseElement) {
                            selectedVerseElement.classList.remove("has-background-warning");
                        }
                    };

                    window.addEventListener("click", handleUserInteraction);
                    window.addEventListener("touchstart", handleUserInteraction);

                    return () => {
                        window.removeEventListener("click", handleUserInteraction);
                        window.removeEventListener("touchstart", handleUserInteraction);
                    };
                }
            }, 300); // Slightly longer delay for mobile

            return () => clearTimeout(scrollTimer);
        }
        // For bookmark navigation
        else if (bookmarkedElement) {
            setTimeout(() => {
                const bookmarkedElementRef = document.getElementsByClassName(bookmarkedElement)[0];
                if (bookmarkedElementRef) {
                    const rect = bookmarkedElementRef.getBoundingClientRect();
                    const scrollTop = rect.top + window.scrollY - window.innerHeight / 2;

                    window.scrollTo({
                        top: scrollTop,
                        behavior: "auto",
                    });
                }
            }, 200);
        } else {
            // If no verse or bookmark specified, scroll to top
            window.scrollTo(0, 0);
        }
    }, [bookTitle, selectedChapter, selectedVerse, bookmarkedElement, verseRefs]);
};
