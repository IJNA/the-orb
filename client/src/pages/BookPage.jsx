import React, { useEffect, useRef } from "react";
import "bulma/css/bulma.min.css";
import styles from "./BookPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCurrentBook, useCurrentSection } from "../utils/Hooks.jsx";
import { Container } from "react-bulma-components";
import { Navigation } from "../components/Navigation.jsx";
import { useGetBookFromDatabase } from "../utils/Queries.jsx";

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

    const { data: chapters, isLoading } = useGetBookFromDatabase(params.book);

    return (
        <>
            {/* <Navigation /> */}
            <div className={styles.bookPageContainer}>
                <Container
                    className={styles.bookPageHeaderContainer}
                    display="flex"
                    flexDirection="row"
                    alignItems="baseline"
                >
                    <h2 className="title is-2">{currentBook?.title}</h2>
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
    //const chapters = useMemo(() => (data?.length > 0 ? data.map((d) => JSON.parse(d)) : null), [data]);
    const bookData = data;

    const elements = [];
    let currentParagraph = [];
    let currentStanza = [];
    const verseRefs = useRef({});

    useEffect(() => {
        if (bookData?.length > 0 && selectedChapter && selectedVerse) {
            const id = `${selectedChapter}-${selectedVerse}`;
            if (verseRefs.current[id]) {
                verseRefs.current[id].scrollIntoView({ behavior: "smooth", block: "center" });
                verseRefs.current[id].classList.add("has-background-warning");
            }
        }
    }, [bookData?.length, selectedChapter, selectedVerse]);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (verseRefs.current[`${selectedChapter}-${selectedVerse}`]) {
                verseRefs.current[`${selectedChapter}-${selectedVerse}`].classList.remove("has-background-warning");
            }
        };

        window.addEventListener("click", handleUserInteraction);
        window.addEventListener("touchstart", handleUserInteraction);

        return () => {
            window.removeEventListener("click", handleUserInteraction);
            window.removeEventListener("touchstart", handleUserInteraction);
        };
    }, [selectedChapter, selectedVerse]);

    if (bookData?.length > 0) {
        bookData.forEach((item, index) => {
            switch (item.type) {
                case "paragraph start":
                    currentParagraph = [];
                    break;
                case "paragraph text":
                        currentParagraph.push(
                            <span
                                id={`${currentBook.title}-${item.chapter}-${item.verse}-${item.id}`}
                                key={`${currentBook.title}-${item.chapter}-${item.verse}-${item.id}`}
                                ref={(el) => (verseRefs.current[`${item.chapter}-${item.verse}`] = el)}
                            >
                                <sup style={{ display: "none" }}>{item.verse}</sup>
                                {item.value}
                            </span>
                        );
                    break;
                case "paragraph end":
                    elements.push(
                        <p key={`paragraph-${item.section}-${item.chapter}-${item.id}`}>{currentParagraph}</p>
                    );
                    break;
                case "stanza start":
                    currentStanza = [];
                    break;
                case "line text":
                    currentStanza.push(
                        <span key={`${item.chapter}-${item.verse}-${item.section}`}>
                            {item.value}
                            {item.type === "line break" ? <br /> : ""}
                        </span>
                    );
                    break;
                case "line break":
                    currentStanza.push(<br key={`br-${item.chapter}-${index}`} />);
                    break;
                case "stanza end":
                    elements.push(
                        <div key={`stanza-${index}-${item.chapter}`} className="stanza">
                            {currentStanza}
                        </div>
                    );
                    break;
                default:
                    break;
            }
        });
        return <div>{elements}</div>;
    }
};

export default BookPage;
