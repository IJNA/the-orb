import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "bulma/css/bulma.min.css";
import styles from "./SearchPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { PassageCard } from "../components/PassageCard";
import { Container } from "react-bulma-components";
import { useGetNostrSearchResults } from "../utils/Queries";
import { getDetailsByBookTitle } from "../utils/BookSectionMap";
import Highlighter from "react-highlight-words";
import { faTimes } from "../../node_modules/@fortawesome/free-solid-svg-icons/index.js";
import { BookSectionMap } from "../utils/BookSectionMap";
import { useHagahStore } from "../HagahStore";

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");
    const location = useLocation();
    const { data: searchResults, isLoading: isSearching, searchTimeout } = useGetNostrSearchResults(query);
    const { triggerSearchFocus, setSearchFocus } = useHagahStore();
    const searchInputRef = useRef(null);
    const endSearch = useMemo(() => searchTimeout || searchResults?.length >= 10, [searchTimeout, searchResults]);
    useEffect(() => {
        const scrollToTop = () => {
            window.scrollTo(0, 0);
        };
        setTimeout(scrollToTop, 10);
    }, [location.pathname]);

    useEffect(() => {
        if (triggerSearchFocus && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [triggerSearchFocus]);

    const handleClear = () => {
        setSearchInput("");
        setQuery("");
    };

    const handleSearch = useCallback(
        (e) => {
            if (searchInputRef?.current && e.key === "Enter") {
                searchInputRef.current.blur();
                setQuery(searchInput);
            }
        },
        [searchInput]
    );

    const bookResults = useMemo(() => (query ? BookSectionMap.sections.flatMap((section) => section.books).filter((book) => book.title.toLowerCase().includes(query.toLowerCase())) : []), [query]);

    const verseSummary = useMemo(
        () =>
            query &&
            searchResults?.map((item) => (
                <div key={`${item.id}`}>
                    <Highlighter highlightClassName={styles.boldText} searchWords={[query.trim()]} autoEscape={true} textToHighlight={item.value} />
                </div>
            )),
        [query, searchResults]
    );

    return (
        <Container className={styles.searchPageContainer}>
            <div className={`field ${styles.searchBar}`}>
                <div className="control has-icons-left has-icons-right">
                    <input
                        ref={searchInputRef}
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

                    {!!query && isSearching && !endSearch ? (
                        <span className="icon is-medium is-right">
                            <div className="loader" />
                        </span>
                    ) : (
                        !!query &&
                        (searchResults?.length > 0 || bookResults?.length > 0) && (
                            <span className="icon is-medium is-right">
                                <Link to="/search" className={styles.anchorClass} onClick={handleClear}>
                                    <FontAwesomeIcon className={styles.clickableIcon} icon={faTimes} />
                                </Link>
                            </span>
                        )
                    )}
                </div>
                {!query && searchResults?.length === 0 && (
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

            {query && searchResults && (
                <div className={styles.resultsContainer}>
                    {bookResults?.length > 0 && (
                        <>
                            <h4 className={`title is-4 ${styles.booksHeader}`}>Books</h4>
                            {[...new Set(bookResults)].map((book, index) => (
                                <Link key={index} to={book.route}>
                                    <button className={`button input ${styles.space} is-large`}>{book.title}</button>
                                </Link>
                            ))}
                        </>
                    )}
                    {searchResults?.length > 0 && (
                        <>
                            <h4 className={`title is-4 ${styles.results}`}>Passages</h4>
                            {searchResults.map((item, index) => {
                                const book = getDetailsByBookTitle(item.title);
                                if (!book?.route) return null;
                                return (
                                    <PassageCard
                                        key={`${item.id}`}
                                        query={query}
                                        reference={`${book.title} ${item.chapter}:${item.verse}`}
                                        textElement={verseSummary[index]}
                                        route={`${book.route}/${item.chapter}/${item.verse}`}
                                        text={item.value}
                                    />
                                );
                            })}
                        </>
                    )}

                    {query && !isSearching && bookResults?.length === 0 && searchResults?.length === 0 && <p className={`is-size-5 ${styles.noResult}`}>No results found.</p>}

                    {endSearch && <p className="is-size-5 my-2 has-text-centered">Showing top 10 results.</p>}
                </div>
            )}
        </Container>
    );
};

export default SearchPage;
