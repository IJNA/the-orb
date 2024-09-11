import React, { useEffect } from "react";
import "bulma/css/bulma.min.css";
import styles from "./HomePage.module.scss";
import { Link, useLocation } from "react-router-dom";
import theLaw from "../images/theLaw.svg";
import theProphets from "../images/theProphets.svg";
import theWritings from "../images/theWritings.svg";
import theGospelandActs from "../images/theGospelsandActs.svg";
import theLetters from "../images/theLetters.svg";
import theRevelation from "../images/theRevelation.svg";
import arrowForwardIcon from "../images/ArrowForwardIcon.svg";

const HomePage = () => {
    const location = useLocation();

    const url = location.pathname;

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 5);
    }, [url]);

    return (
        <>
            <div className={styles.homePageHeader}>hagah</div>
            <div className={styles.homePageContainer}>
                <div className={styles.paragraphContainer}>
                    <div className={styles.paragraph}>
                        <p>hagah is a bible app designed to help you meditate on scripture.</p>
                        <Link to="about" className={styles.aboutLink}>
                            ABOUT US
                        </Link>
                    </div>
                </div>
                <div className={styles.sections}>
                    <div className={styles.sectionRow}>
                        <div className={styles.sectionContainer}>
                            <h4 className={styles.sectionsHeader}>The Law</h4>
                            <Link to="sections/the-law">
                                <img className={styles.theLaw} src={theLaw} alt="Section Logo" title="Section Logo" />
                            </Link>
                            <Link to="sections/the-law" className={styles.openSectionLinkContainer}>
                                OPEN SECTION
                                <img
                                    className={`${styles.arrowForwardIcon}`}
                                    src={arrowForwardIcon}
                                    alt="Arrow Forward Icon to go to a selected section"
                                    title="Arrow Forward Icon to go to a selected section"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.sectionRow}>
                        <div className={styles.sectionContainer}>
                            <h4 className={styles.sectionsHeader}>The Prophets</h4>
                            <Link to="sections/the-prophets">
                                <img
                                    className={styles.sectionImg}
                                    src={theProphets}
                                    alt="Section Logo"
                                    title="Section Logo"
                                />
                            </Link>
                            <Link to="sections/the-prophets" className={styles.openSectionLinkContainer}>
                                OPEN SECTION
                                <img
                                    className={`${styles.arrowForwardIcon}`}
                                    src={arrowForwardIcon}
                                    alt="Arrow Forward Icon to go to a selected section"
                                    title="Arrow Forward Icon to go to a selected section"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.sectionRow}>
                        <div className={styles.sectionContainer}>
                            <h4 className={styles.sectionsHeader}>The Writings</h4>
                            <Link to="sections/the-writings">
                                <img
                                    className={styles.sectionImg}
                                    src={theWritings}
                                    alt="Section Logo"
                                    title="Section Logo"
                                />
                            </Link>
                            <Link to="sections/the-writings" className={styles.openSectionLinkContainer}>
                                OPEN SECTION
                                <img
                                    className={`${styles.arrowForwardIcon}`}
                                    src={arrowForwardIcon}
                                    alt="Arrow Forward Icon to go to a selected section"
                                    title="Arrow Forward Icon to go to a selected section"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.sectionRow}>
                        <div className={styles.sectionContainer}>
                            <h4 className={styles.sectionsHeader}>The Gospels and Acts</h4>
                            <Link to="sections/the-gospels-and-acts">
                                <img
                                    className={styles.sectionImg}
                                    src={theGospelandActs}
                                    alt="Section Logo"
                                    title="Section Logo"
                                />
                            </Link>
                            <Link to="sections/the-gospels-and-acts" className={styles.openSectionLinkContainer}>
                                OPEN SECTION
                                <img
                                    className={`${styles.arrowForwardIcon}`}
                                    src={arrowForwardIcon}
                                    alt="Arrow Forward Icon to go to a selected section"
                                    title="Arrow Forward Icon to go to a selected section"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.sectionRow}>
                        <div className={styles.sectionContainer}>
                            <h4 className={styles.sectionsHeader}>The Letters</h4>
                            <Link to="sections/the-letters">
                                <img
                                    className={styles.sectionImg}
                                    src={theLetters}
                                    alt="Section Logo"
                                    title="Section Logo"
                                />
                            </Link>
                            <Link to="sections/the-letters" className={styles.openSectionLinkContainer}>
                                OPEN SECTION
                                <img
                                    className={`${styles.arrowForwardIcon}`}
                                    src={arrowForwardIcon}
                                    alt="Arrow Forward Icon to go to a selected section"
                                    title="Arrow Forward Icon to go to a selected section"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.sectionRow}>
                        <div className={styles.sectionContainer}>
                            <h4 className={styles.sectionsHeader}>The Revelation</h4>
                            <Link to="sections/the-revelation/revelation">
                                <img
                                    className={styles.sectionImg}
                                    src={theRevelation}
                                    alt="Section Logo"
                                    title="Section Logo"
                                />
                            </Link>
                            <Link to="sections/the-revelation/revelation" className={styles.openSectionLinkContainer}>
                                OPEN SECTION
                                <img
                                    className={`${styles.arrowForwardIcon}`}
                                    src={arrowForwardIcon}
                                    alt="Arrow Forward Icon to go to a selected section"
                                    title="Arrow Forward Icon to go to a selected section"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <Link to="about">
                    <img
                        className={styles.ijnaLogo}
                        src="/images/IJNA_logo.png"
                        alt="IJNA logo which is a blue window with a star on the bottom right"
                        title="IJNA logo which is a blue window with a star on the bottom right"
                    />
                </Link>
                <p className={styles.openSourceParagraph}>
                    Open-source |&nbsp;
                    <span className={styles.gitHub}>
                        <a target="_blank" rel="noreferrer" href="https://github.com/IJNA/the-orb">
                            See Github
                        </a>
                    </span>
                </p>
            </div>
        </>
    );
};

export default HomePage;
