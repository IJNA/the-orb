import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import { BookSectionMap } from "./BookSectionMap";
import styles from "./SectionPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useCurrentSection } from "../utils/Hooks";

function SectionPage() {
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
                <nav className={styles.navbar} role="navigation" aria-label="main navigation">
                    <div className={`navbar-brand ${styles.navbarBrandContainer}`}>
                        <Link to="/" className={styles.backLink}>
                            <span className="icon is-medium">
                                <FontAwesomeIcon className={styles.backIcon} icon={faArrowLeft} />
                            </span>
                            <div className={`subtitle is-4 ${styles.backText}`}>Back</div>
                        </Link>
                    </div>
                </nav>
                <div className={`container ${styles.sectionContainer}`}>
                    <h2 className={`title is-2 ${styles.sectionHeader}`}>{currentSection.title}</h2>
                    <div className={styles.imgContainer}>
                        <img className={styles.sectionEllipse} src={image} alt="ellipseImg" />
                    </div>
                    <div className={styles.quotedTextContainer}>
                        <p className={styles.quotedText}>{currentSection.quote}</p>
                    </div>

                    <div className={styles.buttonContainer}>
                        {currentSection.books.map((book, index) => (
                            <Link key={index} to={book.route}>
                                <button className={`button input ${styles.space} is-large`}>{book.title}</button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SectionPage;
