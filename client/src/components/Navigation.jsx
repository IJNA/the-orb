import React from "react";
import "bulma/css/bulma.min.css";
import styles from "./Navigation.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const Navigation = () => {
    const navigate = useNavigate();
    const handleBack = () => navigate(-1);
    return (
        <div className={styles.headerContainer}>
            <nav className={styles.navbar} role="navigation" aria-label="main navigation">
                <div className={`navbar-brand ${styles.navbarBrandContainer}`}>
                    <div onClick={handleBack} className={styles.backContainer}>
                        <span className="icon is-medium">
                            <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowLeft} />
                        </span>
                        <div className="subtitle is-4">Back</div>
                    </div>
                </div>
            </nav>
        </div>
    );
};
