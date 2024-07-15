import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "bulma/css/bulma.min.css";
import styles from "./SearchPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { PassageCard } from "../components/PassageCard";
import { Container } from "react-bulma-components";
import { useGetSearchResults } from "../utils/Queries";
import { getDetailsByBookTitle } from "./BookSectionMap";
import Highlighter from "react-highlight-words";
import { faTimes } from "../../node_modules/@fortawesome/free-solid-svg-icons/index";
import { BookSectionMap } from "./BookSectionMap";

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState(null);
    const location = useLocation();
    const [bookResults, setBookResults] = useState([]);
    const { data: foundPassages, isLoading: isSearching } = useGetSearchResults(query);

    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0);
        };
        setTimeout(scrollToTop, 10);
    }, [location.pathname]);

    const handleClear = () => {
        setSearchInput("");
        setQuery(null);
    };

    const handleSearch = useCallback(
        (e) => {
            if (e.key === "Enter") {
                setQuery(searchInput);
            }
        },
        [searchInput]
    );

    useEffect(() => {
        if (query) {
            BookSectionMap.sections.forEach((section) => {
                const results = section.books.filter((book) => book.title.toLowerCase().includes(query.toLowerCase()));
                setBookResults((prev) => [...prev, ...results]);
            });
        }
    }, [query]);
    const searchResultContents = useMemo(
        () =>
            foundPassages?.map((item) => ({
                bookTitle: item.title,
                foundVerses: item.content.map((x) => ({ ...x })),
            })),
        [foundPassages]
    );

    const verseSummary = useMemo(
        () =>
            searchResultContents?.map((content, chapterIndex) => (
                <div key={chapterIndex}>
                    {content.foundVerses?.map((verse, verseIndex) => (
                        <div key={verseIndex}>
                            <Highlighter
                                highlightClassName={styles.boldText}
                                searchWords={[query]}
                                autoEscape={true}
                                textToHighlight={verse.value}
                            />
                        </div>
                    ))}
                </div>
            )),
        [query, searchResultContents]
    );

    const verseText = useMemo(() => verseSummary, [verseSummary]);

    const verses = useMemo(
        () => searchResultContents?.map((item) => ({ bookTitle: item.bookTitle, foundVerses: item.foundVerses })),
        [searchResultContents]
    );

    return (
        <Container className={styles.searchPageContainer}>
            <div className={`field ${styles.searchBar}`}>
                <div className="control has-icons-left has-icons-right">
                    <input
                        type="text"
                        className="input is-large is-rounded"
                        onKeyDown={handleSearch}
                        placeholder="Search"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <span className="icon is-medium is-left">
                        <Link to="/" className={styles.anchorClass}>
                            <FontAwesomeIcon className={styles.clickableIcon} icon={faArrowLeft} />
                        </Link>
                    </span>

                    {!!query && isSearching ? (
                        <span className="icon is-medium is-right">
                            <div className="loader" />
                        </span>
                    ) : (
                        !!query &&
                        foundPassages?.length > 0 && (
                            <span className="icon is-medium is-right">
                                <Link to="/search" className={styles.anchorClass} onClick={handleClear}>
                                    <FontAwesomeIcon className={styles.clickableIcon} icon={faTimes} />
                                </Link>
                            </span>
                        )
                    )}
                </div>
                {!query && foundPassages?.length === 0 && (
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

            {query && foundPassages && (
                <div className={styles.resultsContainer}>
                    {bookResults?.length > 0 && (
                        <>
                            <h4 className={`title is-4 ${styles.booksHeader}`}>Books</h4>
                            {([...new Set(bookResults)]).map((book, index) => (
                                <Link key={index} to={book.route}>
                                    <button className={`button input ${styles.space} is-large`}>{book.title}</button>
                                </Link>
                            ))}
                        </>
                    )}
                    {verses?.length > 0 && (
                        <>
                            <h4 className={`title is-4 ${styles.results}`}>Passages</h4>

                            {verses.map((item, index) =>
                                item.foundVerses.map((verse) => {
                                    const book = getDetailsByBookTitle(item.bookTitle);
                                    if (!book?.route) return null;
                                    return (
                                        <PassageCard
                                            key={`${item.bookTitle}-${verse.chapter}-${verse.verse}`}
                                            query={query}
                                            reference={`${book.title} ${verse.chapter}:${verse.verse}`}
                                            text={verseText[index]}
                                            route={`${book.route}/${verse.chapter}/${verse.verse}`}
                                        />
                                    );
                                })
                            )}
                        </>
                    )}

                    {query && !isSearching && bookResults?.length === 0 && searchResultContents?.length === 0 && (
                        <p className={`is-size-5 ${styles.noResult}`}>No results found.</p>
                    )}
                </div>
            )}
        </Container>
    );
};

export default SearchPage;
