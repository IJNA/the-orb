import "bulma/css/bulma.min.css";
import styles from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Logo from "../images/hagah_logo.png";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <>
      <div className={` sticky-top ${styles.headerBlock}`}>
        <div className={styles.headerTextBrand}>
          <img src={Logo} className={styles.homePageImg} alt="logo" />
          <Link to="/" className={styles.headerText}>
            hagah
          </Link>
        </div>
        <div className={styles.searchIconContainer}>
          <Link to="/searchPage">
            <span>
              <FontAwesomeIcon
                className={styles.searchIcon}
                icon={faMagnifyingGlass}
              />
            </span>
          </Link>
        </div>
      </div >
    </>
  );
}

export default Header;
