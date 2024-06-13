import React, { useEffect, useState, useRef, useCallback } from "react";
import "bulma/css/bulma.min.css";
import styles from "./SearchPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Card from "../components/Card";
import TITLES from "../book";
import { Container } from "react-bulma-components";
import { useGetSearchResults } from "../utils/Queries";

const SearchPage = () => {
    const [query, setQuery] = useState(null);
    const [verses, setVerses] = useState([]);
    const [verseText, setVerseText] = useState([]);
    const [showPreviewText, setShowPreviewText] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [bookResults, setBookResults] = useState([]);
    const searchRef = useRef();
    const location = useLocation();

    const { data: searchResults, isLoading: isSearching } = useGetSearchResults(query);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0);
        };
        setTimeout(scrollToTop, 10);
    }, [location.pathname]);

    const handleSearch = useCallback((e) => {
        if (e.key !== "Enter") return;
        const query = e.target.value;
        setQuery(query);
        //searchRef.current.blur();
        setShowPreviewText(false);
        setShowResults(true);

        // fetch(`https://jenjaoocpj.execute-api.us-east-1.amazonaws.com/staging/searchPage/${query}`)
        //     .then((response) => response.json())
        //     .then((data) => {
        //         const re = new RegExp(`${query}`, "i");
        //         const verseSummary = data.data.verses.map((verse) =>
        //             verse.text.replace(re, (match) => `<b><i>${match}</i></b>`)
        //         );
        //         setVerseText(verseSummary);
        //         setVerses(data.data.verses);

        //         const bookMatches = Object.values(TITLES)
        //             .filter((book) => book.BOOK_NAME.toLowerCase().includes(query.toLowerCase()))
        //             .map((book) => ({
        //                 bookName: book.BOOK_NAME,
        //                 apiName: book.API_NAME,
        //             }));
        //         setBookResults(bookMatches);
        //     })
        //     .catch(console.error);
    }, []);

    const handleFocus = () => {
        setShowPreviewText(true);
        setShowResults(false);
    };

    useEffect(() => {
        if (searchResults) {
            const verseSummary = searchResults.verses?.map((verse, index) => (
                <div key={index}>{highlightText(verse.text, query)}</div>
            ));

            setVerseText(verseSummary);
            setVerses(searchResults.verses);

            const bookMatches = Object.values(TITLES)
                .filter((book) => book.BOOK_NAME.toLowerCase().includes(query.toLowerCase()))
                ?.map((book) => ({
                    bookName: book.BOOK_NAME,
                    apiName: book.API_NAME,
                }));
            setBookResults(bookMatches);
        }
    }, [query, searchResults]);

    return (
        <Container className={styles.searchPageContainer}>
            <div className={`field ${styles.searchBar}`}>
                <div className="control has-icons-left has-icons-right">
                    <input
                        ref={searchRef}
                        className="input is-large is-rounded"
                        type="text"
                        placeholder="Search"
                        onKeyPress={handleSearch}
                        onFocus={handleFocus}
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
            {isSearching ? (
                <p className={`is-size-5 ${styles.loading}`}>Loading...</p>
            ) : (
                searchResults &&
                showResults && (
                    <div className={styles.resultsContainer}>
                        {bookResults?.length > 0 && (
                            <>
                                <h4 className={`title is-4 ${styles.booksHeader}`}>Books</h4>
                                {bookResults.map((bookResult, index) => (
                                    <Link
                                        key={index}
                                        to={`/${toKebabCase(bookResult.bookName)}/${toKebabCase(bookResult.apiName)}`}
                                    >
                                        <button className={`button input ${styles.space} is-large`}>
                                            {bookResult.bookName}
                                        </button>
                                    </Link>
                                ))}
                            </>
                        )}
                        {verses?.length > 0 && (
                            <>
                                <h4 className={`title is-4 ${styles.results}`}>Passages</h4>
                                {verses.map((verse, index) => (
                                    <Card
                                        key={index}
                                        reference={verse.reference}
                                        text={verseText[index]}
                                        bookId={verse.bookId}
                                    />
                                ))}
                            </>
                        )}

                        {!isSearching && searchResults?.length === 0 && (
                            <p className={`is-size-5 ${styles.noResult}`}>No results found.</p>
                        )}
                    </div>
                )
            )}
        </Container>
    );
};

const highlightText = (text, query) => {
    const re = new RegExp(`\\b${query}\\b`, "gi");
    const parts = text.split(re);
    const matches = text.match(re);

    return parts.reduce((acc, part, index) => {
        acc.push(part);
        if (matches && matches[index]) {
            acc.push(
                <b key={index}>
                    <i>{matches[index]}</i>
                </b>
            );
        }
        return acc;
    }, []);
};

const toKebabCase = (text) => {
    const kebabCaseText = text.replace(/([a-z])([A-Z])/g, "$1-$2");
    return kebabCaseText.replace(/\s+/g, "-").toLowerCase();
};

export default SearchPage;
