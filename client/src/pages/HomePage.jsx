import React, {useEffect} from "react";
import "bulma/css/bulma.min.css";
import styles from "./HomePage.module.scss";
import { Link, useLocation, useParams } from "react-router-dom";

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
                    <h4 className={styles.sectionsHeader}>Sections of the Bible</h4>
                    <Link to="sections/the-law" className={styles.homePageLink}>
                        <div className={`${styles.homePageLinkContainer}`}>
                            <div className={`${styles.homePageButton}`}>The Law</div>
                            <div className={`${styles.homePageButtonDiv}`}></div>
                        </div>
                    </Link>
                    <Link to="sections/the-prophets" className={styles.homePageLink}>
                        <div className={`${styles.homePageLinkContainer}`}>
                            <div className={`${styles.homePageButton}`}>The Prophets</div>
                            <div className={`${styles.homePageButtonDiv}`}></div>
                        </div>
                    </Link>
                    <Link to="sections/the-writings" className={styles.homePageLink}>
                        <div className={`${styles.homePageLinkContainer}`}>
                            <div className={`${styles.homePageButton}`}>The Writings</div>
                            <div className={`${styles.homePageButtonDiv}`}></div>
                        </div>
                    </Link>
                    <Link to="sections/the-gospels-and-acts" className={styles.homePageLink}>
                        <div className={`${styles.homePageLinkContainer}`}>
                            <div className={`${styles.homePageButton}`}>The Gospels and Acts</div>
                            <div className={`${styles.homePageButtonDiv}`}></div>
                        </div>
                    </Link>
                    <Link to="sections/the-letters" className={styles.homePageLink}>
                        <div className={`${styles.homePageLinkContainer}`}>
                            <div className={`${styles.homePageButton}`}>The Letters</div>
                            <div className={`${styles.homePageButtonDiv}`}></div>
                        </div>
                    </Link>
                    <Link to="sections/the-revelation/revelation" className={styles.homePageLink}>
                        <div className={`${styles.homePageLinkContainer}`}>
                            <div className={`${styles.homePageButton}`}>The Revelation</div>
                            <div className={`${styles.homePageButtonDiv}`}></div>
                        </div>
                    </Link>
                </div>
                <img
                    className={styles.ijnaLogo}
                    src="/images/IJNA_logo.png"
                    alt="IJNA logo which is a blue window with a star on the bottom right"
                    title="IJNA logo which is a blue window with a star on the bottom right"
                />
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
