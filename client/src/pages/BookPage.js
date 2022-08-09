import 'bulma/css/bulma.min.css';
import styles from "./BookPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function BookPage() {

    return (
        <>
            <nav className={styles.navbar} role="navigation" aria-label="main navigation">
                <div className={`navbar-brand ${styles.navbarBrandContainer}`}>
                    <span className="icon is-medium">
                        <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowLeft} />
                    </span>
                    <p className="subtitle is-4">Back</p>
                </div>
            </nav>

            <div className={styles.text}>
                <h2 className="title is-2">Bookpage</h2>
                <div className={styles.book}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum maiores laudantium minima doloribus! Recusandae vero voluptas libero impedit tenetur ducimus eveniet totam deserunt inventore maxime, minus laudantium magnam, praesentium sint!
                </div>
            </div>
            <div className={styles.center}>
                <p className="control has-icons-right">
                    <Link to="">
                        <button className={`button is-large ${styles.center, styles.nextBookButton}`}>next book</button>
                        <span className="icon is-right">
                            <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight} />
                        </span>
                    </Link>
                </p>
            </div>
        </>
    );
}

export default BookPage;