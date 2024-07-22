import React, { useEffect } from "react";
import "bulma/css/bulma.min.css";
import styles from "./HomePage.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";

import theLaw from '../images/theLaw.svg';
import theProphets from '../images/theProphets.svg';
import theWritings from '../images/theWritings.svg';
import theGospelandActs from '../images/theGospelsandActs.svg';
import theLetters from '../images/theLetters.svg';
import theRevelation from '../images/theRevelation.svg';

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
                    <div className={styles.sectionContainer}>
                        <h4 className={styles.sectionsHeader}>The Law</h4>
                        <img src="" />
                        <Link to="theLaw">
                            <img
                                className={styles.theLaw}
                                src={theLaw}
                                alt="Section Logo"
                                title="Section Logo"
                            />
                        </Link>
                    </div>
                    <div className={styles.sectionContainer}>
                        <h4 className={styles.sectionsHeader}>The Prophets</h4>
                        <img src="" />
                        <Link to="theProphets">
                            <img
                                className={styles.sectionImg}
                                src={theProphets}
                                alt="Section Logo"
                                title="Section Logo"
                            />
                        </Link>
                    </div>
                    <div className={styles.sectionContainer}>
                        <h4 className={styles.sectionsHeader}>The Writings</h4>
                        <img src="" />
                        <Link to="theWritings">
                            <img
                                className={styles.sectionImg}
                                src={theWritings}
                                alt="Section Logo"
                                title="Section Logo"
                            />
                        </Link>
                    </div>
                    <div className={styles.sectionContainer}>
                        <h4 className={styles.sectionsHeader}>The Gospels and Acts</h4>
                        <img src="" />
                        <Link to="theGospelsAndActs">
                            <img
                                className={styles.sectionImg}
                                src={theGospelandActs}
                                alt="Section Logo"
                                title="Section Logo"
                            />
                        </Link>
                    </div>
                    <div className={styles.sectionContainer}>
                        <h4 className={styles.sectionsHeader}>The Letters</h4>
                        <img src="" />
                        <Link to="theLetters">
                            <img
                                className={styles.sectionImg}
                                src={theLetters}
                                alt="Section Logo"
                                title="Section Logo"
                            />
                        </Link>
                    </div>
                    <div className={styles.sectionContainer}>
                        <h4 className={styles.sectionsHeader}>The Revelation</h4>
                        <img src="" />
                        <Link to="bookPage/REV">
                            <img
                                className={styles.sectionImg}
                                src={theRevelation}
                                alt="Section Logo"
                                title="Section Logo"
                            />
                        </Link>
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
                        <a target="_blank" rel="noreferrer" href="https://github.com/IJNA/the-orb">See Github</a>
                    </span>
                </p>
            </div>
        </>
    );
}

export default HomePage;
