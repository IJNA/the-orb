import { PauseCircle, PlayCircle } from 'phosphor-react';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Box, Button } from 'react-bulma-components';
import styles from './AudioPlaybackBar.module.scss';

export const AudioPlaybackBar = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
    const versesRef = useRef<HTMLElement[]>([]);
    const [currentVerseIndex, setCurrentVerseIndex] = useState(0);

    const setActiveVerseHighlightAndScroll = useCallback((verseIndex: number) => {
        const verses = versesRef.current;
        if (!verses.length) return;

        verses.forEach((verse) => {
            verse.classList.remove(styles.playbackActiveVerse);
        });

        const verseElement = verses[verseIndex];

        if (verseElement) {
            verseElement.classList.add(styles.playbackActiveVerse);

            verseElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }, []);

    useEffect(() => {
        const speech = new SpeechSynthesisUtterance();
        speech.rate = 1;
        speech.pitch = 1;
        speech.volume = 1;

        speech.onend = () => {
            setIsPlaying(false);
        };

        setUtterance(speech);

        return () => {
            window.speechSynthesis.cancel();
        };
    }, []);

    // Get all verse elements when component mounts or isPlaying state changes
    useEffect(() => {
        versesRef.current = Array.from(document.querySelectorAll('.verse'));
    }, [isPlaying]);

    const findVisibleVerseIndex = () => {
        const verses = versesRef.current;
        if (!verses.length) return 0;
        if (window.scrollY === 0) return 0;

        const viewportMiddle = window.innerHeight / 2;

        for (let i = 0; i < verses.length; i++) {
            const verse = verses[i];
            if (!verse) continue;

            const rect = verse.getBoundingClientRect();

            if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
                return i;
            }
        }
        return 0;
    }

    const speakVerse = (verseIndex: number) => {
        if (!utterance) return;

        const verses = versesRef.current;
        const verseText = verses[verseIndex]?.textContent || '';
        utterance.text = verseText;

        setActiveVerseHighlightAndScroll(verseIndex);
        setCurrentVerseIndex(verseIndex);

        utterance.onend = () => {
            const nextVerseIndex = verseIndex + 1;
            if (nextVerseIndex < verses.length) {
                setActiveVerseHighlightAndScroll(nextVerseIndex);
                speakVerse(nextVerseIndex);
            } else {
                setIsPlaying(false);
            }
        };

        window.speechSynthesis.speak(utterance);
    };

    const startReadingFromVerse = (verseElement: HTMLElement) => {
        if (!utterance) return;

        const verses = versesRef.current;
        const startIndex = verses.indexOf(verseElement);

        window.speechSynthesis.cancel();
        setTimeout(() => {
            setIsPlaying(true);
            speakVerse(startIndex);
        }, 50);
    };

    const stopReading = () => {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setActiveVerseHighlightAndScroll(-1);
    };

    // Will toggle play/pause, will start from the first visible verse (middle of the viewport)
    const handlePlayPause = () => {
        if (isPlaying) {
            stopReading();
        } else {
            const verses = versesRef.current;
            const visibleVerse = verses[findVisibleVerseIndex()];
            const currentVerse = verses[currentVerseIndex];

            if (verses.length > 0 && (visibleVerse !== undefined)) {
                startReadingFromVerse(visibleVerse);
            }
        }
    };

    return (
        <Button
            className={styles.playbackButton}
            onClick={handlePlayPause}
        >
            {isPlaying ? <PauseCircle size={20} weight='fill' /> : <PlayCircle size={20} weight='fill' />}
            <div className='ml-1'>{isPlaying ? 'Pause' : 'Listen'}</div>
        </Button>
    );
};
