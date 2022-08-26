import Ellipse from '../images/imageTheLaw.png';
import 'bulma/css/bulma.min.css';
import styles from './SectionPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function TheProphets() {
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
            <div className={`container ${styles.theProphetsContainer}`}>
                <h2 className={`title is-2 ${styles.theProphetsHeader}`}>The Prophets (Nevi'im)</h2>
                <div className={styles.imgContainer}>
                    <img className={styles.sectionEllipse} src={Ellipse} />
                </div>
                <div className={styles.quotedTextContainer}>
                    <p className={styles.quotedText}>He shall build a house for my name, and I will establish the throne of his kingdome forever.</p>
                </div>

                <div className={styles.buttonContainer}>
                    <button id="genButton" className={`button input ${styles.space} is-large`} onclick="getBook('Joshua')">Joshua</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Judges')">Judges</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('1 Samuel')">1 Samuel</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('2 Samuel')">2 Samuel</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('1 Kings')">1 Kings</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('2 Kings')">2 Kings</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Isiah')">Isiah</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Jeremiah')">Jeremiah</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Ezekiel')">Ezekiel</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Hosea')">Hosea</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Joel')">Joel</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Amos')">Amos</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Obadiah')">Obadiah</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Jonah')">Jonah</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Micah')">Micah</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Nahum')">Nahum</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Habakkuk')">Habakkuk</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Zephania')">Zephaniah</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Haggai')">Haggai</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Zechariah')">Zechariah</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Malachi')">Malachi</button>

                </div>
            </div>
        </>
    );
}

export default TheProphets;
