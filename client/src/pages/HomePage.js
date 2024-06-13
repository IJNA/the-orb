import { useEffect } from "react";
import "bulma/css/bulma.min.css";
import styles from "./HomePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import NDK from "@nostr-dev-kit/ndk";
import Header from "../components/Header";
import IJNA from "../images/IJNA_logo.png";

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
            <Link to="about" className={styles.aboutLink}>
              ABOUT US
            </Link>
          </div>
        </div>
        <div className={styles.sections}>
          <h4 className={styles.sectionsHeader}>Sections of the Bible</h4>

          <Link to="theLaw" className={`${styles.homePageLink}`}>
            <div className={`${styles.homePageLinkContainer}`}>
              <div className={`${styles.homePageButton}`}>
                The Law
              </div>
              <div className={`${styles.homePageButtonDiv}`}></div>
            </div>
          </Link>
          <Link to="theProphets">
            <div className={`${styles.homePageLinkContainer}`}>
              <div className={`${styles.homePageButton}`}>
                The Prophets
              </div>
              <div className={`${styles.homePageButtonDiv}`}></div>
            </div>
          </Link>
          <Link to="theWritings">
            <div className={`${styles.homePageLinkContainer}`}>
              <div className={`${styles.homePageButton}`}>
                The Writings
              </div>
              <div className={`${styles.homePageButtonDiv}`}></div>
            </div>
          </Link>
          <Link to="theGospelsAndActs">
            <div className={`${styles.homePageLinkContainer}`}>
              <div className={`${styles.homePageButton}`}>
                The Gospels and Acts
              </div>
              <div className={`${styles.homePageButtonDiv}`}></div>
            </div>
          </Link>
          <Link to="theLetters">
            <div className={`${styles.homePageLinkContainer}`}>
              <div className={`${styles.homePageButton}`}>
                The Letters
              </div>
              <div className={`${styles.homePageButtonDiv}`}></div>
            </div>
          </Link>
          <Link to="bookPage/REV">
            <div className={`${styles.homePageLinkContainer}`}>
              <div className={`${styles.homePageButton}`}>
                The Revelation
              </div>
              <div className={`${styles.homePageButtonDiv}`}></div>
            </div>
          </Link>
        </div>
        <img
          className={styles.ijnaLogo}
          src={IJNA}
          alt="IJNA logo which is a blue window with a star on the bottom right"
          title="IJNA logo which is a blue window with a star on the bottom right"
        />
        <p className={styles.openSourceParagraph}>Open-source | <span className={styles.gitHub}><a href="https://github.com/IJNA/the-orb">See Github</a></span></p>
      </div>
    </div>
  );
}

export default HomePage;