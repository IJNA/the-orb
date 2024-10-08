import React from "react";
import "bulma/css/versions/bulma-no-dark-mode.css";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";

function Header() {

    return (
        <Link to="/" className={styles.headerText}>
            <span>hagah</span>
        </Link>
    );
}

export default Header;
