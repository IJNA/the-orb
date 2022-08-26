import Ellipse from '../images/imageTheLaw.png';
import 'bulma/css/bulma.min.css';
import styles from './SectionPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function TheWritings() {
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
            <div className={`container ${styles.theWritingsContainer}`}>
                <h2 className={`title is-2 ${styles.theWritingsHeader}`}>The Writings (Ketuvim)</h2>
                <div className={styles.imgContainer}>
                    <img className={styles.sectionEllipse} src={Ellipse} />
                </div>
                <div className={styles.quotedTextContainer}>
                    <p className={styles.quotedText}>Wisdom cries aloud in the street, in the markets she raises her voice</p>
                </div>

                <div className={styles.buttonContainer}>
                    <button id="genButton" className={`button input ${styles.space} is-large`} onclick="getBook('Psalms')">Psalms</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Exodus')">Proverbs</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Leviticus')">Job</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Numbers')">Song of Solomon</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Deuteronomy')">Ruth</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Lamentations')">Lamentations</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Ecclesiastes')">Ecclesiastes</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Esther')">Esther</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Daniel')">Daniel</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Ezra')">Ezra</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Nehemiah')">Nehemiah</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('1 Chronicles')">1 Chronicles</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('2 Chronicles')">2 Chronicles</button>

                </div>
            </div>
        </>
    );
}

export default TheWritings;
