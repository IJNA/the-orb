import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.min.css";
import styles from "./SearchPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Card from "../components/Card.js";
import { text } from "@fortawesome/fontawesome-svg-core";
import parse from "html-react-parser";

function SearchPage() {
  const [verses, setVerses] = useState([]);
  const [verseText, setVerseText] = useState([]);
  const [showPreviewText, setShowPreviewText] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef();
  
  
  const handleSearch = (e) => {
    searchRef.current.blur();
    setShowPreviewText(false);
    setShowResults(true);
    console.log(e.target.value);
    fetch(`/api/searchpage/${e.target.value}`)
      .then((response) => {
        return response.json(); // parses response to only give use the data we want
      })
      .then((data) => {
        console.log(data.data.verses);
        const re = new RegExp(`${e.target.value}`, 'i');
        let verseSummary = [];
        data.data.verses.forEach(verse => {
          verseSummary.push(verse.text.replace(re,`<b><i><u>${e.target.value}</u></i></b>`))
        })
        setVerseText(verseSummary)
        setVerses(data.data.verses);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFocus = () => {
    setShowPreviewText(true);
    setShowResults(false);
  };
  return (
    <>
      <div className={`container ${styles.searchPageContainer}`}>
        <div className={`field ${styles.searchBar}`}>
          <div className="control has-icons-left has-icons-right">
            <input
              ref={searchRef}
              className="input is-large is-rounded"
              type="text"
              placeholder="Search"
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)}
              onFocus={handleFocus}
            />
            <span className="icon is-medium is-left">
              <Link to="/" className={styles.anchorClass}>
                <FontAwesomeIcon
                  className={styles.backIcon}
                  icon={faArrowLeft}
                />
              </Link>
            </span>
            <span className="icon is-medium is-right is-hidden">
              <i className="fa fa-times"></i>
            </span>
          </div>
          {showPreviewText && (
            <p className={`is-size-5 ${styles.previewText}`}>
              <br />
              <br />
              &nbsp; &nbsp; Search for passages or phrases.
              <br />
              <br />
              &nbsp; &nbsp; Ex: John 1:1; Garden
            </p>
          )}
        </div>

        {showResults && (
          <div className={`${styles.resultsContainer}`}>
            {/* <h4 className={`title is-4`}>Books</h4> */}
            {verses.length > 0 &&
             <h4 className={`title is-4 ${styles.results}`}>Passages</h4> 
             }
            {verses.map((verse, index) => (
              <Card
                key={index}
                reference={verse.reference}
                text={parse(verseText[index])}
                bookId={verse.bookId}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default SearchPage;
// {verses.length > 0 &&
