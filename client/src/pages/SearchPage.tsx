import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import "bulma/css/bulma.min.css";
import styles from "./SearchPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { PassageCard } from "../components/PassageCard";
import { Container } from "react-bulma-components";
import { useGetNostrSearchResults } from "../utils/Queries";
import { getDetailsByBookTitle } from "../utils/BookSectionMap";
import Highlighter from "react-highlight-words";
import { faTimes } from "../../node_modules/@fortawesome/free-solid-svg-icons/index.js";
import { BookSectionMap } from "../utils/BookSectionMap";
import { useHagahStore } from "../HagahStore";
import { ArrowRight } from "phosphor-react";

const SearchPage = () => {
    const [searchInput, setSearchInput] = useState("");
    const [query, setQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { data: searchResults, isLoading: isSearching, searchTimeout } = useGetNostrSearchResults(query);
    const { triggerSearchFocus, setSearchFocus } = useHagahStore();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const endSearch = useMemo(() => searchTimeout || searchResults?.length >= 10, [searchTimeout, searchResults]);
    const truncatedResults = useMemo(() => searchResults?.slice(0, 10), [searchResults]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const urlQuery = searchParams.get("q");
        if (urlQuery) {
            setSearchInput(urlQuery);
            setQuery(urlQuery);
        }
    }, [location.search]);

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
        navigate("/search", { replace: true });
    };

    const handleSearch = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (searchInputRef?.current && e.key === "Enter") {
                searchInputRef.current.blur();
                setQuery(searchInput);
                navigate(`/search?q=${encodeURIComponent(searchInput)}`, { replace: true });
            }
        },
        [searchInput, navigate]
    );

    const bookResults = useMemo(() => (query ? BookSectionMap.sections.flatMap((section) => section.books).filter((book) => book.title.toLowerCase().includes(query.toLowerCase())) : []), [query]);

    const verseSummary = useMemo(
        () =>
            query &&
            searchResults?.map((item, index) => (
                <div key={index}>
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

            {query && truncatedResults && (
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
                    {truncatedResults?.length > 0 && (
                        <>
                            <h4 className={`title is-4 ${styles.results}`}>Passages</h4>
                            {truncatedResults.map((item, index) => {
                                const book = getDetailsByBookTitle(item.title);
                                if (!book?.route) return null;
                                return (
                                    <PassageCard
                                        key={index}
                                        reference={`${book.title} ${item.chapter}:${item.verse}`}
                                        textElement={verseSummary[index]}
                                        route={`${book.route}/${item.chapter}/${item.verse}`}
                                        text={item.value}
                                    />
                                );
                            })}
                        </>
                    )}

                    {query && !isSearching && bookResults?.length === 0 && truncatedResults?.length === 0 && <p className={`is-size-5 ${styles.noResult}`}>No results found.</p>}
                    <Container>{endSearch && <p className="is-size-5 my-5">Showing top 10 results.</p>}</Container>

                    {searchResults.length > 10 && !isSearching ? (
                        <Container className="my-5 ">
                            <Link className="is-size-5 is-flex is-align-items-center" to={`/search/all?q=${query}`}>
                                See full results ({searchResults.length})<ArrowRight fontSize={24} />
                            </Link>
                        </Container>
                    ) : null}
                </div>
            )}
        </Container>
    );
};

export default SearchPage;
