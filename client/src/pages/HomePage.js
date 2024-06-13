import { useEffect } from "react";
import "bulma/css/bulma.min.css";
import styles from "./HomePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import NDK from "@nostr-dev-kit/ndk";
import Header from "../components/Header";

function HomePage() {
  const location = useLocation();
  const pathname = location.pathname;
  const ndk = new NDK({
    explicitRelayUrls: [
      "wss://nos.lol/",
      "wss://nostr.bitcoiner.social/",
      "wss://relayable.org/",
      "wss://yabu.me/",
      "ws://yabu.me/",
      "wss://relay.nostr.wirednet.jp/",
      "wss://relay.haths.cc/",
      "wss://n-word.sharivegas.com/",
      "wss://relay.shitforce.one/",
      "wss://nostr1.current.fyi/",
    ],
  });
  const filter = {
    kinds: [30023],
    authors: [
      "957966b656723845d6d63f102715203e17a2865efe270591400407ee2d4fe6b7",
    ],
  };

  useEffect(() => {
    let event;
    let events;
    const fetchData = async () => {
      try {
        await ndk.connect();
        // Will return only the first event
        event = await ndk.fetchEvent(filter);

        // Will return all found events
        events = await ndk.fetchEvents(filter);
        console.log({ event, events });
      } catch (error) {
        // Handle any errors that occurred during the fetch
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 10);
  }, [pathname]);

  return (
    <div>
      <Header></Header>
      <div className={styles.homePageContainer}>
        <div className={`${styles.paragraphContainer}`}>
          <div className={`${styles.paragraph}`}>
            <p>hagah is a bible app designed to help you meditate on scripture.</p>
            <Link to="about">
              ABOUT US
            </Link>
          </div>
        </div>
        <div className={styles.sections}>
          <h4 className="title is-4 subtitle">Sections of the Bible</h4>

          <Link to="theLaw">
            <button className={`button ${styles.homePageButton} input is-large`}>
              The Law
            </button>
          </Link>
          <Link to="theProphets">
            <button className={`button ${styles.homePageButton} input is-large`}>
              The Prophets
            </button>
          </Link>
          <Link to="theWritings">
            <button className={`button ${styles.homePageButton} input is-large`}>
              The Writings
            </button>
          </Link>
          <Link to="theGospelsAndActs">
            <button className={`button ${styles.homePageButton} input is-large`}>
              The Gospels and Acts
            </button>
          </Link>
          <Link to="theLetters">
            <button className={`button ${styles.homePageButton} input is-large`}>
              The Letters
            </button>
          </Link>
          <Link to="bookPage/REV">
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
