import React, { useEffect } from "react";
import "bulma/css/bulma.min.css";
import styles from "./BookPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { GetBookContentByNoteId } from "../utils/NostrUtils";
import { useCurrentBook, useCurrentSection } from "../utils/Hooks";
import { Container, Progress } from "react-bulma-components";

function BookPage() {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    const currentSection = useCurrentSection();
    const currentBook = useCurrentBook();
    const { pageContent, isLoading } = GetBookContentByNoteId(currentBook?.nostrId);

    function cleanedPageContent() {
        return pageContent?.split("<br>")?.at(0);
    }

    const formattedPageContent = cleanedPageContent()
        ?.split("\n")
        .map((line, index) => <p key={index}>{line}</p>);

    return (
        <div className={styles.bookPageContainer}>
            <nav className={styles.navbar} role="navigation" aria-label="main navigation">
                <div className={`navbar-brand ${styles.navbarBrandContainer}`}>
                    <div onClick={handleBack} className={styles.backContainer}>
                        <span className="icon is-medium">
                            <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowLeft} />
                        </span>
                        <div className="subtitle is-4">Back</div>
                    </div>
                </div>
            </nav>
            <Container
                className={styles.bookPageHeaderContainer}
                display="flex"
                flexDirection="row"
                alignItems="baseline"
            >
                <h2 className="title is-2">{currentBook?.title}</h2>
                {isLoading || !pageContent ? <div className="loader" /> : null}
            </Container>
            {pageContent ? (
                <Container>
                    <div className={`is-flex is-flex-direction-column is-align-items-center ${styles.text}`}>
                        <div className={styles.book}>{formattedPageContent}</div>
                    </div>
                    <div className="has-text-centered mb-4">
                        {currentBook.nextRoute ? (
                            <Link to={currentBook.nextRoute}>
                                <button className={`button is-large ${styles.button}`}>
                                    <div className={`${styles.center}`}>
                                        {
                                            currentSection?.books.find((book) => book.route === currentBook.nextRoute)
                                                ?.title
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
    );
}

export default BookPage;
