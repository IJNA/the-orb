import Ellipse from '../images/imageTheLaw.png';
import 'bulma/css/bulma.min.css';
import styles from './SectionPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function TheLetters() {
    return (
        <>
            <nav className={`navbar ${styles.navbarContainer}`} role="navigation" aria-label="main navigation">
                <div className={`navbar-brand ${styles.navbarBrandContainer}`}>
                    <Link to="/" className={styles.backLink} >
                        <span className="icon is-medium">
                            <FontAwesomeIcon className={styles.backIcon} icon={faArrowLeft} />
                        </span>
                        <p className={`subtitle is-4 ${styles.backText}`}>Back</p>
                    </Link>
                </div>
            </nav>
            <div className={`container ${styles.theLettersContainer}`}>
                <h2 className={`title is-2 ${styles.theLettersHeader}`}>The Letters</h2>
                <div className={styles.imgContainer}>
                    <img className={styles.sectionEllipse} src={Ellipse} />
                </div>
                <div className={styles.quotedTextContainer}>
                    <p className={styles.quotedText}>I do it all for the sake of the gospel, that I may share with them in its blessings.</p>
                </div>

                <div className={styles.buttonContainer}>
                    <button id="genButton" className={`button input ${styles.space} is-large`} onclick="getBook('Romans')">Romans</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('1 Corinthians')">1 Corinthians</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('2 Corinthians')">2 Corinthians</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Galations')">Galations</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Ephesians')">Ephesians</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Philippians')">Philippians</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Colossians')">Colossians</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('1 Thessalonians')">1 Thessalonians</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('2 Thessalonaians')">2 Thessalonaians</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('1 Timothy')">1 Timothy</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('2 Timothy')">2 Timothy</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Titus')">Titus</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Philemon')">Philemon</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Hebrews')">Hebrews</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('James')">James</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('1 Peter')">1 Peter</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('2 Peter')">2 Peter</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('1 John')">1 John</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('2 John')">2 John</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('3 John')">3 John</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Jude')">Jude</button>


                </div>
            </div>
        </>
    );
}

export default TheLetters;
