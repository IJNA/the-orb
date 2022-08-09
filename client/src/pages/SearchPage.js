import 'bulma/css/bulma.min.css';
import styles from './SearchPage.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom';

function SearchPage() {
    return (
        <>
            <div className={`container ${styles.searchPageContainer}`}>
                <div className={`field ${styles.searchBar}`}>
                    <div className="control has-icons-left has-icons-right">
                        <input
                            className="input is-large is-rounded"
                            type="text"
                            placeholder="Search"
                        />
                        <span className="icon is-medium is-left">
                            <Link to="/" className={styles.anchorClass}>
                                <FontAwesomeIcon className={styles.backIcon} icon={faArrowLeft} />
                            </Link>
                        </span>
                        <span className="icon is-medium is-right is-hidden">
                            <i className="fa fa-times"></i>
                        </span>
                    </div>
                    <p className={`is-size-5 ${styles.previewText}`}>
                        <br />
                        <br />
                        &nbsp; &nbsp; Search for passages or phrases.<br />
                        <br />
                        &nbsp; &nbsp; Ex: John 1:1; Garden
                    </p>
                </div>
            </div>
        </>
    );
}

export default SearchPage;
