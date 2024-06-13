import React from "react";
import "bulma/css/bulma.min.css";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { Heading } from "react-bulma-components";

function Header() {
    const { pathname } = useLocation();

    if (pathname === "/search") return null;

    return (
        <div className={`sticky-top ${styles.headerBlock}`}>
            <Heading id={styles.title} size={1}>
                <Link to="/">
                    hagah
                    <img src="/images/hagah_logo.png" className={styles.homePageImg} alt="logo" />
                </Link>
                <Link to="search">
                    <span>
                        <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
                    </span>
                </Link>
            </Heading>
        </div>
    );
}

export default Header;
