import Ellipse from '../images/imageTheLaw.png';
import 'bulma/css/bulma.min.css';
import styles from './SectionPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function TheGospelsAndActs() {
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
            <div className={`container ${styles.theGospelsAndActsContainer}`}>
                <h2 className={`title is-2 ${styles.theGospelsAndActsHeader}`}>The Gospels and Acts</h2>
                <div className={styles.imgContainer}>
                    <img className={styles.sectionEllipse} src={Ellipse} />
                </div>
                <div className={styles.quotedTextContainer}>
                    <p className={styles.quotedText}></p>
                </div>

                <div className={styles.buttonContainer}>
                    <button id="genButton" className={`button input ${styles.space} is-large`} onclick="getBook('Matthew')">Matthew</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Mark')">Mark</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Luke')">Luke</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('John')">John</button>
                    <button className={`button input ${styles.space} is-large`} onclick="handleSectionClick('Acts')">Acts</button>
                </div>
            </div>
        </>
    );
}

export default TheGospelsAndActs;
