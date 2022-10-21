import React, { useEffect, useState } from "react";
import "bulma/css/bulma.min.css";
import styles from "./BookPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";

function BookPage() {
  let params = useParams();
  const [content, setContent] = useState("retrieving content...");
  const [bookName, setBookName] = useState("");
  const [nextBook, setNextBook] = useState("");
  const [nextApiName, setNextApiName] = useState("");

  useEffect(() => {
    console.log("params: ", params.book);
    fetch(`/api/bookPage/${params.book}`)
      .then((response) => {
        return response.json(); // parses response to only give use the data we want
      })
      .then((data) => {
        // console.log(data);
        let content = "";
        setBookName(data.bookName);
        setNextBook(data.nextBook);
        setNextApiName(data.nextApiName);
        console.log(data);
        data.result.forEach((book) => {
          content += book.data.content;
        });
        // console.log('content: ', content);
        setContent(content);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <>
      <nav
        className={styles.navbar}
        role="navigation"
        aria-label="main navigation"
      >
        <div className={`navbar-brand ${styles.navbarBrandContainer}`}>
          <span className="icon is-medium">
            <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowLeft} />
          </span>
          <div className="subtitle is-4">Back</div>
        </div>
      </nav>
      <div className={styles.bookPageHeaderContainer}>
        <h2 className="title is-2">{bookName}</h2>
      </div>
      <div
        className={`is-flex is-flex-direction-column is-align-items-center ${styles.text}`}
      >
        <div className={styles.book}>{parse(content)}</div>
      </div>
      <div className={styles.center}>
        <div>
          <Link to={`/bookPage/${nextApiName}`}>
            <button className={`button is-large ${styles.button}`}>
              <div className={`${styles.center}`}>
                {nextBook}
                <FontAwesomeIcon
                  className={styles.arrowIcon}
                  icon={faArrowRight}
                />
              </div>
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default BookPage;
