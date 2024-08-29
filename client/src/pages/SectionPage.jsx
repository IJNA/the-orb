import React, { useEffect } from "react";
import "bulma/css/bulma.min.css";
import styles from "./SectionPage.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrentSection } from "../utils/Hooks.jsx";
import { Navigation } from "../components/Navigation.jsx";

const SectionPage = () => {
    const location = useLocation();
    const currentSection = useCurrentSection();
    const url = location.pathname;
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }, [url]);

    return (
        <div>
            {/* <Navigation /> */}
            <div className={styles.sectionPageContainer}>
                <div className={`${styles.sectionContainer}`}>
                    <h2 className={`${styles.sectionHeader}`}>{currentSection.title}</h2>
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
};

export default SectionPage;
