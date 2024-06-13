import React, { useEffect } from "react";
import "bulma/css/bulma.min.css";
import styles from "./HomePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Header from "../components/Header";

function HomePage() {
  return (
    <div>
      <div className={styles.homePageContainer}>
      <div className={styles.sections}>
        <h4 className="title is-4 subtitle">Sections</h4>

        <Link to="sections/the-law">
          <button className={`button ${styles.homePageButton} input is-large`}>
            The Law
          </button>
        </Link>
        <Link to="sections/the-prophets">
          <button className={`button ${styles.homePageButton} input is-large`}>
            The Prophets
          </button>
        </Link>
        <Link to="sections/the-writings">
          <button className={`button ${styles.homePageButton} input is-large`}>
            The Writings
          </button>
        </Link>
        <Link to="sections/the-gospels-and-acts">
          <button className={`button ${styles.homePageButton} input is-large`}>
            The Gospels and Acts
          </button>
        </Link>
        <Link to="sections/the-letters">
          <button className={`button ${styles.homePageButton} input is-large`}>
            The Letters
          </button>
        </Link>
        <Link to="sections/the-revelation/revelation">
          <button className={`button ${styles.homePageButton} input is-large`}>
            The Revelation
          </button>
        </Link>
      </div>
      <div className={styles.smallLinks}>
        <Link to="#">
          <button
            className={`button is-text ${styles.smallLinksText} is-medium`}
          >
            About
          </button>
        </Link>
        <br />
        <Link to="#">
          <button
            className={`button is-text ${styles.smallLinksText} is-medium`}
          >
            Give
          </button>
        </Link>
        <br />
        <Link to="#">
          <button
            className={`button is-text ${styles.smallLinksText} is-medium`}
          >
            Contact
          </button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default HomePage;
