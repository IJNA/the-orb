import React from "react";
import "bulma/css/versions/bulma-no-dark-mode.css";
import styles from "./Header.module.scss";
import { Link, useLocation } from "react-router-dom";

function Header() {
    const { pathname } = useLocation();
    const location = useLocation();
    const restrictedPaths = ["/search", "/account", "/about"];
    const isNarrowScreen = window.innerWidth < 1060;

    if (restrictedPaths.includes(pathname) && isNarrowScreen) return null;
    if (location.pathname.match('/sections') && isNarrowScreen) return null;

    return (
        <Link to="/" className={styles.headerText}>
            <span>hagah</span>
        </Link>
    );
}

export default Header;
