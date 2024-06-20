import React from "react";
import "bulma/css/bulma.min.css";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const { pathname } = useLocation();

    if (pathname === "/search") return null;

    return (
        <div className={`sticky-top ${styles.headerBlock}`}>
            <div className={styles.headerTextBrand}>
                <Link to="/" className={styles.headerText}>
                    <img src="/images/hagah_logo.png" className={styles.homePageImg} alt="logo" />
                    <span>hagah</span>
                </Link>
            </div>
            <div className={styles.searchIconContainer}>
                <Link to="search">
                    <span>
                        <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default Header;
