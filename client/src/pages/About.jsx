import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.min.css";
import styles from "./About.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";

function About() {
  const params = useParams();
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [content, setContent] = useState("retrieving content...");
  const [bookName, setBookName] = useState("");
  const [nextBook, setNextBook] = useState("");
  const [nextApiName, setNextApiName] = useState("");
  const shouldMount = useRef(true);

  useEffect(() => {

  }, []);

  return (
    <div className={styles.aboutContainer}>
      <img
        className={styles.ijnaLogo}
        src="/images/IJNA_logo.png"
        alt="IJNA logo which is a blue window with a star on the bottom right"
        title="IJNA logo which is a blue window with a star on the bottom right"
      />
      <div className={styles.content}>
        <h4 className={styles.aboutHeader}>Who we are</h4>
        <div className={styles.paragraphContainer}>
          <div className={styles.paragraph}>
            <p>hagah.io is a product of IJNA Design based in Plano, TX.</p>
            <p>The code is open-source and accessible on <a target="_blank" rel="noreferrer" href="https://github.com/IJNA/the-orb">Github</a>.</p>
            <p>If you're interested in getting in touch, please see our contact links below.</p>
          </div>
        </div>
        <h4 className={styles.aboutHeader}>Contact</h4>
        <div className={styles.buttonContainer}>
          <button><img
            className={styles.contactButtonImg}
            src="/images/mailIcon.png"
            alt="Email button icon, evelope"
            title="Email button icon, evelope"
          />EMAIL</button>
          <button><img
            className={styles.contactButtonImg}
            src="/images/nostrIcon.png"
            alt="NOSTR button icon, ostrich"
            title="NOSTR button icon, ostrich"
          />NOSTR</button>
          <button><img
            className={styles.contactButtonImg}
            src="/images/feedbackIcon.png"
            alt="Give Feedback button icon, megaphone"
            title="Give Feedback button icon, megaphone"
          />GIVE FEEDBACK</button>
          <div className={styles.contributerListContainer}>
            <a target="_blank" rel="noreferrer" href="https://github.com/IJNA/the-orb/graphs/contributors" className={styles.contributerList}>
              SEE CONTRIBUTER LIST
            </a>
            <img
              className={styles.contactButtonImg}
              src="/images/openInNewTabIcon.png"
              alt="Open link in new tab icon, square with arrow comming out"
              title="Open link in new tab icon, square with arrow comming out"
            />
          </div>
        </div>
        <h4 className={styles.aboutHeader}>Support</h4>
        <div className={styles.paragraphContainer}>
          <div className={styles.paragraph}>
            <p>Your giving helps us spend more time improving hagah while keeping it entirely free and open-source. Thank you</p>
          </div>
        </div>
        <button className={styles.supportBtn}>SUPPORT<img
          className={styles.contactButtonImg}
          src="/images/heartIcon.png"
          alt="Support button icon, heart"
          title="Support button icon, heart"
        /></button>
      </div>
    </div>
  );
}

export default About;
