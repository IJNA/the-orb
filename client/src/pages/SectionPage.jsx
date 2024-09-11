import React, { useEffect } from "react";
import "bulma/css/bulma.min.css";
import styles from "./SectionPage.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrentSection } from "../utils/Hooks.jsx";
import theLaw from "../images/theLaw.svg";

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
            <div className={styles.sectionPageContainer}>
                <div className={`${styles.sectionContainer}`}>
                    <h2 className={`${styles.sectionHeader}`}>{currentSection.title}</h2>
                    <img
                        className={`${styles.sectionImg}`}
                        src={`${process.env.PUBLIC_URL}/${currentSection.image}.svg`}
                        alt="Arrow Forward Icon to go to a selected section"
                        title="Arrow Forward Icon to go to a selected section"
                    />
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
