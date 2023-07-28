import { useEffect } from 'react';
import Ellipse from '../images/Ellipse_2.jpg';
import 'bulma/css/bulma.min.css';
import styles from "./HomePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Link, useLocation } from 'react-router-dom';
import NDK from "@nostr-dev-kit/ndk";

function HomePage() {
    const location = useLocation();
    const pathname = location.pathname;
    const ndk = new NDK({ explicitRelayUrls: [
    "wss://nos.lol/",
    "wss://nostr.bitcoiner.social/",
    "wss://relayable.org/",
    "wss://yabu.me/",
    "ws://yabu.me/",
    "wss://relay.nostr.wirednet.jp/",
    "wss://relay.haths.cc/",
    "wss://n-word.sharivegas.com/",
    "wss://relay.shitforce.one/",
    "wss://nostr1.current.fyi/"] });
    const filter = { kinds: [30023], authors: ['957966b656723845d6d63f102715203e17a2865efe270591400407ee2d4fe6b7'] };

    

    useEffect(() => {
        let event; 
        let events;
        const fetchData = async () => {
            try {
                // Will return only the first event
event = await ndk.fetchEvent(filter);

// Will return all found events
events = await ndk.fetchEvents(filter);
console.log({event,events});
            } catch (error) {
              // Handle any errors that occurred during the fetch
              console.error('Error fetching data:', error);
            }
          };
      
          fetchData();
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }, [pathname])

    return (
        <div className={styles.homePageContainer}>
            <div className={`container ${styles.ellipseContainer}`}>
                <img src={Ellipse} className={styles.homePageImg} alt="ellipse" />
                <h1 id={styles.title} className="title is-1">Online<br />Reader's<br />Bible</h1>
            </div>
            <div className={`search field ${styles.searchContainer}`}>
                <div className="control has-icons-left">
                    {/* <a href="../pages/searchPage.html"> */}
                    <Link to="searchPage">
                        <button className="input is-large is-rounded">Search
                            <span className="icon is-left">
                                <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
            <div className={styles.sections}>

                <h4 className="title is-4 subtitle">Sections</h4>

                <Link to="theLaw">
                    <button className={`button ${styles.homePageButton} input is-large`}>The Law</button>
                </Link>
                <Link to="theProphets">
                    <button className={`button ${styles.homePageButton} input is-large`}>The Prophets</button>
                </Link>
                <Link to="theWritings">
                    <button className={`button ${styles.homePageButton} input is-large`}>The Writings</button>
                </Link>
                <Link to="theGospelsAndActs">
                    <button className={`button ${styles.homePageButton} input is-large`}>The Gospels and Acts</button>
                </Link>
                <Link to="theLetters">
                    <button className={`button ${styles.homePageButton} input is-large`}>The Letters</button>
                </Link>
                <Link to="bookPage/REV">
                    <button className={`button ${styles.homePageButton} input is-large`}>The Revelation</button>
                </Link>

            </div>
            <div className={styles.smallLinks}>
                <Link to="#">
                    <button className={`button is-text ${styles.smallLinksText} is-medium`}>About</button>
                </Link><br />
                <Link to="#">
                    <button className={`button is-text ${styles.smallLinksText} is-medium`}>Give</button>
                </Link><br />
                <Link to="#">
                    <button className={`button is-text ${styles.smallLinksText} is-medium`}>Contact</button>
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
