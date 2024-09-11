import React from "react";
import "bulma/css/versions/bulma-no-dark-mode.css";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHome, faSearch, faUser, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    
    const location = useLocation();

    const navItems = [
        { path: '/', icon: faBookOpen, label: 'Bible' },
        { path: '/search', icon: faMagnifyingGlass, label: 'Discover' },
        { path: '/account', icon: faUser, label: 'You' },
    ];

    return (
        <div className={`${styles.bottomNavbar}`}>
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                >
                    <FontAwesomeIcon icon={item.icon} className={`${styles.navIcon}`} />
                    <span className={`${styles.navText}`}>{item.label}</span>
                </Link>
            ))}
        </div>
    );
}

export default Navbar;
