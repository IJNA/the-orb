import React, { Suspense, useEffect, useMemo, useRef, useState, type MutableRefObject } from 'react';
import 'bulma/css/bulma.min.css';
import styles from './BookPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useCurrentBook, useCurrentSection } from '../hooks/BookMapHooks';
import { Container } from 'react-bulma-components';
import { formatChapterEvents } from '../utils/NostrUtils';
import { useHagahStore } from '../HagahStore';
import { findChaptersByBookTitle, normalizeBookTitle } from '../utils/BookSectionMap';
import { useBookmarker } from '../hooks/Bookmarker';
import { kinds } from 'nostr-tools';
import { HAGAH_PUBKEY, HAGAH_RELAY } from '../Constants';
import { useSubscribe } from 'nostr-hooks';
import { AudioPlaybackBar } from '../components/AudioPlaybackBar';

function BookPage() {
    const { book } = useParams();
    const currentBook = useCurrentBook();
    const currentSection = useCurrentSection();
    const nextBookTitle = currentSection?.books.find((book) => book.route === currentBook?.nextRoute)?.title;

    const ids = useMemo(() => {
        if (!book) return [];
        const chapters = findChaptersByBookTitle(book);
        return chapters?.map((chapter) => chapter.nostrId);
    }, [book]);

    const filters = useMemo(
        () => [
            {
                ids,
                authors: [HAGAH_PUBKEY],
                kinds: [kinds.LongFormArticle],
            },
        ],
        [ids]
    );

    const relays = useMemo(() => [HAGAH_RELAY], []);
    const [booksCache, setBooksCache] = useHagahStore((state) => [state.booksCache, state.setBooksCache]);
    const isBookCached = useMemo(
        () => ids && book && booksCache?.[book]?.length && booksCache[book].length >= ids.length,
        [booksCache, ids?.length]
    );
    const { events } = useSubscribe({ filters, relays, enabled: !isBookCached });

    useEffect(() => {
        function cacheOnExit() {
            if (ids && book && !isBookCached && events.length >= ids.length) {
                setBooksCache((prevState) => ({
                    ...prevState,
                    [book]: formatChapterEvents(events),
                }));
            }
        }
        return () => cacheOnExit();
    }, [isBookCached, book, ids, events]);

    const chapters = useMemo(() => {
        return book && isBookCached ? booksCache[book] : formatChapterEvents(events);
    }, [booksCache, book, events]);

    if (chapters && ids && chapters?.length < ids?.length) return <div className='loader' />;

    return (
        <div>
            <div className={styles.bookPageContainer}>
                <Container
                    className={styles.bookPageHeaderContainer}
                    display='flex'
                    flexDirection='row'
                    alignItems='baseline'
                >
                    <h2 className={`${styles.header}`}>{currentBook?.title}</h2>
                    {!chapters ? <div className='loader' /> : null}
                </Container>
                {chapters && chapters.length > 0 ? (
                    <Container>
                        <div className={`is-flex is-flex-direction-column is-align-items-center ${styles.text}`}>
                            <div className={styles.book}>
                                <RenderScripture data={chapters} />
                            </div>
                        </div>
                        <div className='has-text-centered mb-4'>
                            {currentBook?.nextRoute ? (
                                <Link to={currentBook.nextRoute}>
                                    <button className={`button is-large ${styles.button}`}>
                                        <div className={`${styles.center}`}>
                                            {nextBookTitle}
                                            <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight} />
                                        </div>
                                    </button>
                                </Link>
                            ) : null}
                        </div>
                    </Container>
                ) : null}
            </div>
            {chapters && (
                <div>
                    <AudioPlaybackBar />
                </div>
            )}
        </div>
    );
}

const RenderScripture = ({ data }: { data: string[] }) => {
    const { selectedChapter, selectedVerse } = useParams();
    const currentBook = useCurrentBook();
    const bookTitle = currentBook ? normalizeBookTitle(currentBook?.title) : '';
    const chapters = useMemo(() => (data?.length > 0 ? data.map((d) => JSON.parse(d)) : null), [data]);
    const verseRefs = useRef<{ [x: string]: HTMLElement }>({});
    const bookmarks = useHagahStore((state) => state.bookmarks);
    const bookmarkedElement = useMemo(() => bookmarks[bookTitle], [bookmarks, bookTitle]);

    useBookmarker();

    useEffect(() => {
        if (selectedChapter && selectedVerse) {
            const verseId = `${bookTitle}-${selectedChapter}-${selectedVerse}`;

            // Check if the verseRef exists before scrolling into view and applying highlight
            if (verseRefs.current[verseId]) {
                verseRefs.current[verseId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                verseRefs.current[verseId].classList.add('has-background-warning');
            }

            // Remove the highlight after user interacts with it
            const handleUserInteraction = () => {
                if (verseRefs.current[verseId]) {
                    verseRefs.current[verseId].classList.remove('has-background-warning');

                    // May want to do this in the future - remove the linked verse from the url after interaction
                    // navigate(currentBook.route);
                }
            };

            const attachListeners = () => {
                window.addEventListener('click', handleUserInteraction);
                window.addEventListener('touchstart', handleUserInteraction);
            };

            attachListeners();
            return () => {
                window.removeEventListener('click', handleUserInteraction);
                window.removeEventListener('touchstart', handleUserInteraction);
            };
        } else {
            if (!bookmarkedElement) {
                window.scrollTo(0, 0);
                return;
            }
            const bookmarkedElementRef = document.getElementsByClassName(bookmarkedElement)[0];

            // Scroll to the element right before the bookmark if it exists
            if (bookmarkedElementRef?.previousElementSibling) {
                bookmarkedElementRef?.previousElementSibling.scrollIntoView();
            } else {
                bookmarkedElementRef?.scrollIntoView();
            }
        }
    }, [bookTitle, bookmarkedElement, selectedChapter, selectedVerse]);

    return (
        currentBook && (
            <div className={`book ${normalizeBookTitle(currentBook.title)}`}>
                {chapters?.map((chapterContent, index) => (
                    <BookChapter
                        bookTitle={normalizeBookTitle(currentBook.title)}
                        chapterContent={chapterContent}
                        key={index}
                        index={index}
                        verseRefs={verseRefs}
                    />
                ))}
            </div>
        )
    );
};

type ChapterItem = {
    type: string;
    verse: string;
    value: string;
};

const BookChapter = ({
    bookTitle,
    chapterContent,
    index,
    verseRefs,
}: {
    bookTitle: string;
    chapterContent: ChapterItem[];
    index: number;
    verseRefs: MutableRefObject<{ [x: string]: any }>;
}) => {
    const chapterNumber = index + 1;

    const passages = chapterContent.reduce((acc: any[], content: ChapterItem) => {
        // If we encounter a "start," we either close the previous passage or start a new one
        if (content.type.includes('start')) {
            // If there's an open passage, mark it as complete
            if (acc.length > 0 && acc[acc.length - 1].length > 0) {
                acc.push([]); // Create a new empty passage for the new "start"
            } else {
                acc.push([content]); // Start new passage with the current "start" content
            }
        } else if (content.type.includes('text') || content.type.includes('end')) {
            // If passage is open, add text or end to it
            if (acc.length === 0) {
                acc.push([]); // Create a new passage if none exists
            }
            acc[acc.length - 1].push(content);

            // If it's an "end," finalize the current passage
            if (content.type.includes('end')) {
                acc.push([]); // Prepare for the next potential passage
            }
        }
        return acc;
    }, []);

    return (
        <div>
            {passages.map((passage, index) => (
                <div className={styles.passage} key={index}>
                    {passage.map((verse: { verse: string; value: string }, passageIndex: number) => {
                        const verseId = `${bookTitle}-${chapterNumber}-${verse.verse}`;
                        return verse?.value?.trim() ? (
                            <div key={passageIndex}>
                                <span ref={(el) => (verseRefs.current[verseId] = el)} className={`verse ${verseId}`}>
                                    {verse.value}
                                </span>
                            </div>
                        ) : null;
                    })}
                </div>
            ))}
        </div>
    );
};

export default BookPage;
