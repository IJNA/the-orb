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
      <Link to={{ pathname: "https://www.hagah.io/"}}>
         <h1 id={styles.title} className="title is-1">
          hagah
          <img src={Logo} className={styles.homePageImg} alt="logo" />
          </h1>  
          </Link>
          <Link reloadDocument to="https://www.hagah.io/searchPage/">
              <span>
                <FontAwesomeIcon
                  className={styles.searchIcon}
                  icon={faMagnifyingGlass}
                />
              </span>
          </Link>
      </div>
    </>
  );
}

export default Header;
