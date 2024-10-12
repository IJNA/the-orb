import React, { useEffect, useMemo, useRef } from "react";
import "bulma/css/bulma.min.css";
import styles from "./BookPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCurrentBook, useCurrentSection } from "../utils/Hooks.jsx";
import { Container } from "react-bulma-components";
import { useGetBookChaptersByBookName } from "../utils/NostrUtils.jsx";

function BookPage() {
    const location = useLocation();
    const url = location.pathname;
    const params = useParams();
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }, [url]);

    const currentSection = useCurrentSection();
    const currentBook = useCurrentBook();
    const { data: chapters, isLoading } = useGetBookChaptersByBookName(params.book);

    return (
        <>
            <div className={styles.bookPageContainer}>
                <Container
                    className={styles.bookPageHeaderContainer}
                    display="flex"
                    flexDirection="row"
                    alignItems="baseline"
                >
                    <h2 className={`${styles.header}`}>{currentBook?.title}</h2>
                    {isLoading || chapters?.length <= 0 ? <div className="loader" /> : null}
                </Container>
                {chapters?.length > 0 ? (
                    <Container>
                        <div className={`is-flex is-flex-direction-column is-align-items-center ${styles.text}`}>
                            <div className={styles.book}>
                                <RenderBibleText
                                    data={chapters}
                                    selectedChapter={params?.selectedChapter}
                                    selectedVerse={params?.selectedVerse}
                                    currentBook={currentBook}
                                />
                            </div>
                        </div>
                        <div className="has-text-centered mb-4">
                            {currentBook?.nextRoute ? (
                                <Link to={currentBook.nextRoute}>
                                    <button className={`button is-large ${styles.button}`}>
                                        <div className={`${styles.center}`}>
                                            {
                                                currentSection?.books.find(
                                                    (book) => book.route === currentBook.nextRoute
                                                )?.title
                                            }
                                            <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight} />
                                        </div>
                                    </button>
                                </Link>
                            ) : null}
                        </div>
                    </Container>
                ) : null}
            </div>
        </>
    );
}

const RenderBibleText = ({ data, currentBook, selectedChapter, selectedVerse }) => {
    const chapters = useMemo(() => (data?.length > 0 ? data.map((d) => JSON.parse(d)) : null), [data]);

    const elements = [];
    let currentParagraph = [];
    let currentStanza = [];
    const verseRefs = useRef({});

    useEffect(() => {
        if (chapters?.length < 1 || !selectedChapter || !selectedVerse) return;

        const id = `${selectedChapter}-${selectedVerse}`;

        // Check if the verseRef exists before scrolling into view and applying highlight
        if (verseRefs.current[id]) {
            verseRefs.current[id].scrollIntoView({ behavior: "smooth", block: "center" });
            verseRefs.current[id].classList.add("has-background-warning");
        }

        // Function to remove the highlight on user interaction
        const handleUserInteraction = () => {
            if (verseRefs.current[id]) {
                verseRefs.current[id].classList.remove("has-background-warning");
            }
        };

        // Delay attaching event listeners to avoid triggering the removal right after link navigation
        const attachListeners = () => {
            window.addEventListener("click", handleUserInteraction);
            window.addEventListener("touchstart", handleUserInteraction);
        };

        // Use a small timeout to avoid immediate removal when clicking the link
        const timeoutId = setTimeout(attachListeners, 500);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener("click", handleUserInteraction);
            window.removeEventListener("touchstart", handleUserInteraction);
        };
    }, [chapters?.length, selectedChapter, selectedVerse]);

    if (chapters?.length > 0) {
        chapters.forEach((chapterContent) => {
            chapterContent.forEach((content, contentIndex) => {
                const key = `${content.type}-${content.chapter}-${content.section}-${content?.verse ?? contentIndex}${content?.value ? `-${content.value}` : ""}`;
                switch (content.type) {
                    case "paragraph start":
                        currentParagraph = [];
                        break;
                    case "paragraph text":
                        currentParagraph.push(
                            <span
                                id={`${content.chapter}-${content.verse}`}
                                key={key}
                                ref={(el) => (verseRefs.current[`${content.chapter}-${content.verse}`] = el)}
                            >
                                <sup style={{ display: "none" }}>{content.verse}</sup>
                                {content.value}
                            </span>
                        );
                        break;
                    case "paragraph end":
                        elements.push(<p key={key}>{currentParagraph}</p>);
                        break;
                    case "stanza start":
                        currentStanza = [];
                        break;
                    case "line text":
                        currentStanza.push(
                            <span key={key}>
                                {content.value}
                                {content.type === "line break" ? <br /> : ""}
                            </span>
                        );
                        break;
                    case "line break":
                        currentStanza.push(<br key={key} />);
                        break;
                    case "stanza end":
                        elements.push(
                            <div key={key} className="stanza">
                                {currentStanza}
                            </div>
                        );
                        break;
                    default:
                        break;
                }
            });
        });
        return <div>{elements}</div>;
    }
};

export default BookPage;
