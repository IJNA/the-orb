import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import 'bulma/css/bulma.min.css';
import styles from './BookPage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faShareFromSquare, faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link, useParams } from 'react-router-dom';
import { useCurrentBook, useCurrentSection } from '../hooks/BookMapHooks';
import { Button, Container } from 'react-bulma-components';
import { formatChapterEvents } from '../utils/NostrUtils';
import { useHagahStore } from '../HagahStore';
import { findChaptersByBookTitle, normalizeBookTitle, PsalmsBooksVerseMarkers } from '../utils/BookSectionMap';
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
                            <p className="mt-5">The World English Bible is in the Public Domain. That means that it is not
                                copyrighted. However,
                                "World English Bible" is a Trademark of eBible.org.</p>
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

    const chapters = useMemo(
        () => parseChapterContent(chapterContent, { chapterNumber, bookTitle }),
        [chapterContent, chapterNumber, bookTitle]
    );

    return (
        <>
            {!isMobile ? (
                <Selection.Root>
                    <Selection.Trigger>
                        <ChapterListRenderer
                            chapters={chapters}
                            chapterNumber={chapterNumber}
                            bookTitle={bookTitle}
                            verseRefs={verseRefs}
                            variant='desktop'
                        />
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
                    <ChapterListRenderer
                        chapters={chapters}
                        chapterNumber={chapterNumber}
                        bookTitle={bookTitle}
                        verseRefs={verseRefs}
                        variant='mobile'
                    />

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

type ChapterListRendererProps = {
    chapters: ChapterItem[][];
    chapterNumber: number;
    bookTitle: string;
    verseRefs: React.MutableRefObject<{ [key: string]: HTMLElement }>;
    variant: 'desktop' | 'mobile';
};

const ChapterListRenderer = ({ bookTitle, ...rest }: ChapterListRendererProps) => {
    return bookTitle === 'psalms'
        ? <PsalmChapterList bookTitle={bookTitle} {...rest} />
        : <NormalChapterList bookTitle={bookTitle} {...rest} />;
};

const PsalmChapterList = ({ chapters, bookTitle, chapterNumber, verseRefs, variant }: ChapterListRendererProps) => {
    const headingLocation = findPsalmHeadingLocation(chapters);

    return (
        <>
            {chapters.map((chapter, index) => (
                <PsalmChapter
                    key={`psalm-chapter-${index}`}
                    chapter={chapter}
                    chapterIndex={index}
                    bookTitle={bookTitle}
                    chapterNumber={chapterNumber}
                    verseRefs={verseRefs}
                    variant={variant}
                    headingLocation={headingLocation}
                />
            ))}
        </>
    );
};

type PsalmChapterProps = {
    chapter: ChapterItem[];
    chapterIndex: number;
    chapterNumber: number;
    bookTitle: string;
    verseRefs: React.MutableRefObject<{ [key: string]: HTMLElement }>;
    variant: 'desktop' | 'mobile';
};

const PsalmChapter = ({
    chapter,
    chapterIndex,
    chapterNumber,
    bookTitle,
    verseRefs,
    variant,
    headingLocation,
}: PsalmChapterProps & { headingLocation: { chapterIndex: number; passageIndex: number } | null }) => {

    return (
        <div className={styles.passage}>
            {chapter.map((item, passageIndex) => {
                const shouldShowPsalmHeading =
                    headingLocation != null &&
                    headingLocation.chapterIndex === chapterIndex &&
                    headingLocation.passageIndex === passageIndex;

                if (item?.type === 'book number') {
                    return (
                        <span key={`psalm-book-${chapterIndex}-${passageIndex}`} className='title is-2'>
                            {item.value}
                        </span>
                    );
                }

                if (item?.type.includes('header')) {

                    return (
                        <React.Fragment key={`psalm-header-${chapterIndex}-${passageIndex}`}>
                            {shouldShowPsalmHeading && <PsalmHeading chapterNumber={chapterNumber} />}
                            <span className='title is-4'>{item.value}</span>
                        </React.Fragment>
                    );
                }

                if (item?.value?.trim() === '') return null;

                const verseId = `${bookTitle}-${chapterNumber}-${item.verse}`;
                return (
                    <div key={`psalm-verse-${chapterIndex}-${passageIndex}`}>
                        {shouldShowPsalmHeading && <PsalmHeading chapterNumber={chapterNumber} />}
                        <span
                            ref={(el) => (verseRefs.current[verseId] = el as HTMLElement)}
                            className={`verse ${verseId}`}
                        >
                            {item.value}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

type NormalChapterListProps = ChapterListRendererProps;

const NormalChapterList = ({ chapters, bookTitle, chapterNumber, verseRefs, variant }: NormalChapterListProps) => (
    <>
        {chapters.map((chapter, index) => (
            <NormalChapter
                key={`normal-chapter-${index}`}
                chapter={chapter}
                chapterIndex={index}
                chapterNumber={chapterNumber}
                bookTitle={bookTitle}
                verseRefs={verseRefs}
                variant={variant}
            />
        ))}
    </>
);

type NormalChapterProps = {
    chapter: ChapterItem[];
    chapterIndex: number;
    chapterNumber: number;
    bookTitle: string;
    verseRefs: React.MutableRefObject<{ [key: string]: HTMLElement }>;
    variant: 'desktop' | 'mobile';
};

const NormalChapter = ({
    chapter,
    chapterIndex,
    chapterNumber,
    bookTitle,
    verseRefs,
    variant,
}: NormalChapterProps) => (
    <div className={styles.passage}>
        {chapter.map((item, passageIndex) => {
            if (item?.type === 'book number') return null;

            if (item?.type === 'header') {
                if (!item.value?.trim()) return null;
                const key = `normal-header-${chapterIndex}-${passageIndex}`;
                return <h2 key={key} className={`title is-4 ${styles.chapterTitle}`}>
                    {item.value}
                </h2>

            }

            if (item?.value?.trim() === '') return null;

            const verseId = `${bookTitle}-${chapterNumber}-${item.verse}`;
            return (
                <div key={`normal-verse-${chapterIndex}-${passageIndex}`}>
                    <span
                        ref={(el) => (verseRefs.current[verseId] = el as HTMLElement)}
                        className={`verse ${verseId}`}
                    >
                        {item.value}
                    </span>
                </div>
            );
        })}
    </div>
);

const PsalmHeading = ({ chapterNumber }: { chapterNumber: number }) => (
    <h3 className='title is-3'>Psalm {chapterNumber}</h3>
);

function findPsalmHeadingLocation(chapters: ChapterItem[][]): { chapterIndex: number; passageIndex: number } | null {
    for (let chapterIndex = 0; chapterIndex < chapters.length; chapterIndex++) {
        const chapter = chapters[chapterIndex];
        if (!chapter) continue;
        for (let passageIndex = 0; passageIndex < (chapter?.length || 0); passageIndex++) {
            const item = chapter[passageIndex];
            if (item && item.type !== 'book number' && item?.value?.trim()) {
                return { chapterIndex, passageIndex };
            }
        }
    }
    return null;
}

function parseChapterContent(
    chapterContent: ChapterItem[],
    options?: { chapterNumber?: number; bookTitle?: string }
): ChapterItem[][] {
    const isHeader = (item: ChapterItem) => item.type === 'header';
    const isStartMarker = (item: ChapterItem) => (item.type.includes('start'));
    const isEndMarker = (item: ChapterItem) => (item.type.includes('end'));
    const isTextItem = (item: ChapterItem) => (item.type.includes('text'));

    const chapters: ChapterItem[][] = [];
    let currentPassage: ChapterItem[] = [];

    chapterContent.forEach((item, index) => {
        if (isHeader(item)) {
            if (currentPassage.length > 0) {
                chapters.push([...currentPassage]);
                currentPassage = [];
            }
            currentPassage.push({ ...item });
        }
        if (isStartMarker(item)) {
            if (currentPassage.length > 0) {
                chapters.push([...currentPassage]);
                currentPassage = [];
            }

            currentPassage.push(item);
        } else if (isTextItem(item) || isEndMarker(item)) {
            if (currentPassage.length === 0) {
                currentPassage = [];
            }

            currentPassage.push(item);

            if (isEndMarker(item)) {
                chapters.push([...currentPassage]);
                currentPassage = [];
            }
        }
    });

    if (currentPassage.length > 0) {
        chapters.push([...currentPassage]);
    }

    const { chapterNumber, bookTitle } = options ?? {};
    if (bookTitle === 'psalms' && typeof chapterNumber === 'number') {
        const marker = PsalmsBooksVerseMarkers.find(([, startChapter]) => startChapter === chapterNumber);
        if (marker) {
            const [bookNumber] = marker;
            chapters.unshift([
                {
                    type: 'book number',
                    verse: `${bookNumber}`,
                    value: `Book ${bookNumber}`,
                },
            ]);
        }
    }

    return chapters;
}

export default BookPage;
