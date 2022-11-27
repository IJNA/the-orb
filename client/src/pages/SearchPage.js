import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.min.css";
import styles from "./SearchPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Card from "../components/Card.js";
import parse from "html-react-parser";

function SearchPage() {
  //   const [reference, setReference] = useState("");
  //   const [text, setText] = useState("");
  //   const [bookId, setBookId] = useState("");
  const [verses, setVerses] = useState([]);
  const [showPreviewText, setShowPreviewText] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [verseSummary, setVerseSummary] = useState('');
  const searchRef = useRef();

  useEffect(() => {
    searchRef.current.focus();
  }, []);

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
        let summary = [];
        data.data.verses.forEach((verse)=> {
          console.log(verse);
          console.log(verse.text);
          const regExp = new RegExp(`${e.target.value}`, 'i');
          console.log(regExp);
          summary.push({
            text: verse.text.replace(regExp, `<b><i><u>${e.target.value}</u></i></b>`)
            // text: verse.text.replace(`(?i)\${e.target.value}\b`, `<b>${e.target.value}</b>`)
            // text: verse.text.replace(`(?i)/${e.target.value}/b`, `<b>${e.target.value}</b>`)
          })
        });
        setVerseSummary(summary);
        console.log('summary: ', summary);
        console.log('verseSummary: ', verseSummary);
        // setReference(data.verses.reference)
        // setText(data.verse.text)
        // setBookId(data.verse.bookid)
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
            <h4 className={`title is-4`}>Books</h4>
            <h4 className={`title is-4 ${styles.results}`}>Passages</h4>

            {verses.map((verse, index) => (
              <Card
                key={index}
                reference={verse.reference}
                text={parse(verseSummary[index].text)}
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
