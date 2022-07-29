import Ellipse from '../images/imageTheLaw.png';
import 'bulma/css/bulma.min.css';
import styles from './SectionPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function TheLaw() {
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
            <div className={`container ${styles.theLawContainer}`}>
                <h2 className={`title is-2 ${styles.theLawHeader}`}>The Law (Torah)</h2>
                <div className={styles.imgContainer}>
                    <img className={styles.sectionEllipse} src={Ellipse} />
                </div>
                <div className={styles.quotedTextContainer}>
                    <p className={styles.quotedText}>Hear, O Israel: The LORD our God, the LORD is one.</p>
                </div>

                <div className={styles.buttonContainer}>
                    <button id="genButton" className={`button input ${styles.space} is-large`} onclick="getBook('GEN')">Genesis</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Exodus')">Exodus</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Leviticus')">Leviticus</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Numbers')">Numbers</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Deuteronomy')">Deuteronomy</button>
                </div>
            </div>
        </>
    );
}

export default TheLaw;
