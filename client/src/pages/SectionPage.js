import React, { useEffect, useState } from "react";
import 'bulma/css/bulma.min.css';
import SECTIONS from '../sectionInfo.js';
import styles from './SectionPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function SectionPage() {
    const [pathName, setPathName] = useState(window.location.pathname.slice(1));
    const image = require('../images/' + SECTIONS[pathName].IMAGE + '.png'); // NOTE: ES6 template literals breaks this
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
            <div className={`container ${styles.sectionContainer}`}>
                <h2 className={`title is-2 ${styles.sectionHeader}`}>{SECTIONS[pathName].SECTION_NAME}</h2>
                <div className={styles.imgContainer}>
                    <img className={styles.sectionEllipse} src={image} alt='ellipseImg'/>
                </div>
                <div className={styles.quotedTextContainer}>
                    <p className={styles.quotedText}>{SECTIONS[pathName].QUOTE}</p>
                </div>

                {/* Kaitlyn TODO: dynamically generate these buttons */}
                <div className={styles.buttonContainer}>
                    <Link to='/bookPage/GEN'>
                        <button className={`button input ${styles.space} is-large`}>Genesis</button>
                    </Link>
                    <Link to='/bookPage/EXO'>
                        <button className={`button input ${styles.space} is-large`}>Exodus</button>
                    </Link>
                    <Link to='/bookPage/LEV'>
                        <button className={`button input ${styles.space} is-large`}>Leviticus</button>
                    </Link>
                    <Link to='/bookPage/NUM'>
                        <button className={`button input ${styles.space} is-large`}>Numbers</button>
                    </Link>
                    <Link to='/bookPage/DEU'>
                        <button className={`button input ${styles.space} is-large`}>Deuteronomy</button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default SectionPage;
