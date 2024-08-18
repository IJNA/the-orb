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
import { Button } from "react-bulma-components";
import { kinds, finalizeEvent, verifyEvent, generateSecretKey } from "nostr-tools";
import { dateToUnix, useNostr } from "nostr-react";
import { BookSectionMap, jsonToMarkdown } from "./BookSectionMap.jsx";
import outputJson from "../output.json";
import { Buffer } from "buffer";

const HomePage = () => {
    const location = useLocation();

    const url = location.pathname;

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 5);
    }, [url]);

    // const doSomething = () => {
    //     const privKey = Uint8Array.from(
    //         Buffer.from("fa5b9f5f1353838ed39ec92d08d94816e2f688ee87c95f7c5674227448e20452", "hex")
    //     );
    //     //const privKey = generateSecretKey();
    //     let completeEvents = [];
    //     let failedEvents = [];
    //     const newBookSectionMap = BookSectionMap.sections.map((section) => ({
    //         ...section,
    //         books: section.books.map((book) => ({
    //             ...book,
    //             chapters: book.chapters.map((chapter, index) => {
    //                 const currentChapter = index + 1;
    //                 const sectionName = book.route.split("/")[2];
    //                 const bookName = book.route.split("/")[3];
    //                 const currentChapterContent = Object.entries(outputJson)
    //                     .at(Object.keys(outputJson).indexOf(bookName))[1]
    //                     .filter((chapterMeta) => chapterMeta.chapter === currentChapter);

    //                 const event = finalizeEvent(
    //                     {
    //                         kind: kinds.LongFormArticle,
    //                         content: jsonToMarkdown(currentChapterContent),
    //                         tags: [
    //                             ["book", bookName],
    //                             ["section", sectionName],
    //                             ["chapter", currentChapter.toString()],
    //                             ["type", ]
    //                         ],
    //                         created_at: dateToUnix(new Date("2024-07-25 00:00:00")),
    //                     },
    //                     privKey
    //                 );
    //                 completeEvents.push(event);
    //                 // connectedRelays.forEach(async (relay) => {
    //                 //     if (relay.status === 2) relay.connect();

    //                 //     try {
    //                 //         const isValid = verifyEvent(event);

    //                 //         if (isValid) {
    //                 //             relay.publish(event);
    //                 //             completeEvents.push(event);
    //                 //         }
                           
    //                 //     } catch (ex) {
    //                 //         console.error(ex);
    //                 //         failedEvents.push(event);
    //                 //     }
    //                 //     relay.close();
    //                 //     await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 1000));
    //                 // });
    //                 return { ...chapter, nostrId: event.id };
    //             }),
    //         })),
    //     }));
    //     console.log({ newBookSectionMap });
    //     console.log({ completeEvents, failedEvents });
    // };

    return (
        <>
            <div className={styles.homePageContainer}>
                <div className={styles.paragraphContainer}>
                    <div className={styles.paragraph}>
                        <p>hagah is a bible app designed to help you meditate on scripture.</p>
                        <Link to="about" className={styles.aboutLink}>
                            ABOUT US
                        </Link>
                        {/* <Button onClick={doSomething}>Do something</Button> */}
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
