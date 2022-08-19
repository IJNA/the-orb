import Ellipse from '../images/Ellipse_2.jpg';
import 'bulma/css/bulma.min.css';
import styles from "./HomePage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function HomePage() {

    return (
        // react fragment
        <div className={styles.homePageContainer}>
            <div className={`container ${styles.ellipseContainer}`}>
                <img src={Ellipse} className={styles.homePageImg} alt="ellipse" />
                <h1 id={styles.title} className="title is-1">Online<br />Reader's<br />Bible</h1>
            </div>
            <div className={`search field ${styles.searchContainer}`}>
                <di className="control has-icons-left">
                    {/* <a href="../pages/searchPage.html"> */}
                    <Link to="searchPage">
                        <button className="input is-large is-rounded">Search 
                        <span className="icon is-left">
                            <FontAwesomeIcon className={styles.searchIcon} icon={faMagnifyingGlass} />
                        </span>
                        </button>
                    </Link>
                </di>
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
                <Link to="theRevelation">
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
