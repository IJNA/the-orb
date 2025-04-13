import React, { useCallback, useEffect, useMemo, useRef, type MutableRefObject, useState } from 'react';
import 'bulma/css/bulma.min.css';
import styles from './BookPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faShareFromSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useCurrentBook, useCurrentSection } from '../hooks/BookMapHooks';
import { Button, Container } from 'react-bulma-components';
import { formatChapterEvents } from '../utils/NostrUtils';
import { useHagahStore } from '../HagahStore';
import { findChaptersByBookTitle, normalizeBookTitle } from '../utils/BookSectionMap';
import { useBookmarker } from '../hooks/Bookmarker';
import { kinds } from 'nostr-tools';
import { HAGAH_PUBKEY, HAGAH_RELAY } from '../Constants';
import { useSubscribe } from 'nostr-hooks';
import { AudioPlaybackBar } from '../components/AudioPlaybackBar';
import { useTextSelection } from '../hooks/useTextSelection';
import * as Selection from 'selection-popover';
import * as Toolbar from '@radix-ui/react-toolbar';
import { shareContent } from '../utils/ShareHandler';
import { isMobile } from '../utils/DeviceDetection';
import { toast } from 'react-toastify';
import { useVerseNavigation } from '../hooks/useVerseNavigation';

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
    const currentBook = useCurrentBook();
    const bookTitle = currentBook ? normalizeBookTitle(currentBook?.title) ?? '' : '';
    const chapters = useMemo(() => (data?.length > 0 ? data.map((d) => JSON.parse(d)) : null), [data]);

    useBookmarker();

    return (
        currentBook && (
            <div onContextMenu={(e) => e.preventDefault()} className={`book ${normalizeBookTitle(currentBook.title)}`}>
                {chapters?.map((chapterContent, index) => (
                    <BookChapter
                        currentBook={currentBook}
                        bookTitle={bookTitle}
                        chapterContent={chapterContent}
                        key={index}
                        index={index}
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
    currentBook,
    bookTitle,
    chapterContent,
    index,
}: {
    currentBook: { route: string; title: string };
    bookTitle: string;
    chapterContent: ChapterItem[];
    index: number;
}) => {
    const { textSelection } = useTextSelection(currentBook ?? '');
    const [copiedSuccess, setCopiedSuccess] = useState(false);
    const [showMobileToolbar, setShowMobileToolbar] = useState(false);
    const { selectedChapter, selectedVerse } = useParams();
    const bookmarks = useHagahStore((state) => state.bookmarks);
    const bookmarkedElement = useMemo(() => bookmarks[bookTitle], [bookmarks, bookTitle]);
    const verseRefs = useRef<{ [x: string]: HTMLElement }>({});

    useVerseNavigation({
        bookTitle,
        selectedChapter: selectedChapter ?? '',
        selectedVerse: selectedVerse ?? '',
        verseRefs,
        bookmarkedElement,
    });

    const handleShare = useCallback(async () => {
        if (!textSelection) return;

        try {
            await shareContent(textSelection);
            setCopiedSuccess(true);

            setTimeout(() => {
                setCopiedSuccess(false);
                if (isMobile) setShowMobileToolbar(false);
            }, 1500);
        } catch (err) {
            console.error('Share error:', err);
            toast.error('Failed to share passage');
        }
    }, [textSelection]);

    useEffect(() => {
        if (isMobile) {
            const handleSelectionChange = () => {
                const selection = window.getSelection();
                if (selection && selection.toString().trim()) {
                    setShowMobileToolbar(true);
                } else {
                    setShowMobileToolbar(false);
                }
            };

            document.addEventListener('selectionchange', handleSelectionChange);
            return () => document.removeEventListener('selectionchange', handleSelectionChange);
        }
    }, []);

    const chapterNumber = index + 1;

    const passages = useMemo(() => parseChapterContent(chapterContent), [chapterContent]);

    return (
        <>
            {!isMobile ? (
                <Selection.Root>
                    <Selection.Trigger>
                        {passages.map((passage, index) => (
                            <div className={styles.passage} key={index}>
                                {passage.map((verse: { verse: string; value: string }, passageIndex: number) => {
                                    const verseId = `${bookTitle}-${chapterNumber}-${verse.verse}`;
                                    return verse?.value?.trim() ? (
                                        <div key={passageIndex}>
                                            <span
                                                ref={(el) => (verseRefs.current[verseId] = el as HTMLElement)}
                                                className={`verse ${verseId}`}
                                            >
                                                {verse.value}
                                            </span>
                                        </div>
                                    ) : null;
                                })}
                            </div>
                        ))}
                    </Selection.Trigger>
                    <Selection.Portal>
                        <Selection.Content className={styles.selectionContent}>
                            <Toolbar.Root className={styles.toolbarRoot}>
                                <span className={styles.toolbarText}>{textSelection?.passage}</span>

                                <Toolbar.Separator className={styles.toolbarSeparator} />
                                <Toolbar.Button onClick={handleShare} style={{ border: 'none', boxShadow: 'none' }}>
                                    <FontAwesomeIcon
                                        fontSize='14px'
                                        className={`${styles.toolbarIcon} ${copiedSuccess ? styles.success : ''}`}
                                        icon={copiedSuccess ? faCheck : faShareFromSquare}
                                    />
                                </Toolbar.Button>
                            </Toolbar.Root>
                            <Selection.Arrow style={{ fill: 'white' }} />
                        </Selection.Content>
                    </Selection.Portal>
                </Selection.Root>
            ) : (
                <>
                    {passages.map((passage, index) => (
                        <div className={styles.passage} key={index}>
                            {passage.map((verse: { verse: string; value: string }, passageIndex: number) => {
                                const verseId = `${bookTitle}-${chapterNumber}-${verse.verse}`;
                                return verse?.value?.trim() ? (
                                    <div key={passageIndex}>
                                        <span
                                            ref={(el) => (verseRefs.current[verseId] = el as HTMLElement)}
                                            className={`verse ${verseId}`}
                                        >
                                            {verse.value}
                                        </span>
                                    </div>
                                ) : null;
                            })}
                        </div>
                    ))}

                    {/* Mobile toolbar*/}
                    {showMobileToolbar && textSelection && (
                        <div className={styles.mobileToolbar}>
                            <span className={styles.toolbarText}>{textSelection.passage}</span>
                            <button onClick={handleShare} className={styles.mobileShareButton}>
                                <FontAwesomeIcon
                                    className={`${styles.toolbarIcon} ${copiedSuccess ? styles.success : ''}`}
                                    icon={copiedSuccess ? faCheck : faShareFromSquare}
                                />
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

function parseChapterContent(chapterContent: ChapterItem[]): ChapterItem[][] {
    const isStartMarker = (item: ChapterItem) => item.type.includes('start');
    const isEndMarker = (item: ChapterItem) => item.type.includes('end');
    const isTextItem = (item: ChapterItem) => item.type.includes('text');

    const result: ChapterItem[][] = [];
    let currentPassage: ChapterItem[] = [];

    chapterContent.forEach((item) => {
        if (isStartMarker(item)) {
            if (currentPassage.length > 0) {
                result.push([...currentPassage]);
                currentPassage = [];
            }
            currentPassage.push(item);
        } else if (isTextItem(item) || isEndMarker(item)) {
            if (currentPassage.length === 0) {
                currentPassage = [];
            }

            currentPassage.push(item);

            if (isEndMarker(item)) {
                result.push([...currentPassage]);
                currentPassage = [];
            }
        }
    });

    if (currentPassage.length > 0) {
        result.push([...currentPassage]);
    }

    return result;
}

export default BookPage;
