import React, { useState } from "react";
import "bulma/css/versions/bulma-no-dark-mode.css";
import styles from "./Navbar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faHome, faSearch, faUser, faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
    const location = useLocation();
    
    // Set default active item to 'Bible'
    const [activeItem, setActiveItem] = useState('/');

    const navItems = [
        { path: '/', icon: faBookOpen, label: 'Bible' },
        { path: '/search', icon: faMagnifyingGlass, label: 'Discover' },
        { path: '/account', icon: faUser, label: 'You' },
    ];

    const handleNavClick = (path) => {
        setActiveItem(path);
    };

    return (
        <div className={`${styles.navbar}`}>
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => handleNavClick(item.path)} // Update active item on click
                    className={`${styles.navItem} ${activeItem === item.path ? styles.active : ''}`}
                >
                    <FontAwesomeIcon icon={item.icon} className={`${styles.navIcon}`} />
                    <span className={`${styles.navText}`}>{item.label}</span>
                </Link>
            ))}
        </div>
    );
}

export default Navbar;