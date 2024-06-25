import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { BookSectionMap } from "./BookSectionMap";
import styles from "./SectionPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useCurrentSection } from "../utils/Hooks";

const SectionPage = () => {
    const location = useLocation();
    const currentSection = useCurrentSection();
    const image = "/images/" + currentSection.image + ".png";

    const url = location.pathname;

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }, [url]);

    return (
        <div>
            <div className={styles.sectionPageContainer}>
                <div className={`container ${styles.sectionContainer}`}>
                    <h2 className={`title is-2 ${styles.sectionHeader}`}>{currentSection.title}</h2>
                    <div className={styles.quotedTextContainer}>
                        <p className={styles.quotedText}>{currentSection.quote}</p>
                    </div>

                    <div className={styles.buttonContainer}>
                        {currentSection.books.map((book, index) => (
                            <Link key={index} to={book.route} className={styles.sectionPageLink}>
                                <div className={`${styles.sectionPageLinkContainer}`}>
                                    <div className={`${styles.sectionPageButton}`}>{book.title}</div>
                                    <div className={`${styles.sectionPageButtonDiv}`}></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionPage;
