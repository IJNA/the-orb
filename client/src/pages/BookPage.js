import React, { useEffect, useState } from "react";
import 'bulma/css/bulma.min.css';
import styles from "./BookPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons"
import { Link, useParams } from 'react-router-dom';
import parse from "html-react-parser";

function BookPage() {
    let params = useParams();
    const [content, setContent] = useState("retrieving content...");

    useEffect(() => {
        console.log('params: ', params.book);
        fetch(`/api/bookPage/${params.book}`)
            .then((response) => {
                return response.json(); // parses response to only give use the data we want
            })
            .then((data) => {
                // console.log(data);
                let content = '';
                data.forEach(book => {
                    content += book.data.content
                });
                // console.log('content: ', content);
                setContent(content);
            })
            .catch((err) => {
                console.log(err);
            });
    })

    return (
        <>
            <nav className={styles.navbar} role="navigation" aria-label="main navigation">
                <div className={`navbar-brand ${styles.navbarBrandContainer}`}>
                    <span className="icon is-medium">
                        <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowLeft} />
                    </span>
                    <p className="subtitle is-4">Back</p>
                </div>
            </nav>

            <div className={styles.text}>
                <h2 className="title is-2">Bookpage</h2>
                <div className={styles.book}>
                    {parse(content)}
                </div>
            </div>
            <div className={styles.center}>
                <p className="control has-icons-right">
                    <Link to="">
                        <button className={`button is-large ${styles.center, styles.nextBookButton}`}>next book</button>
                        <span className="icon is-right">
                            <FontAwesomeIcon className={styles.arrowIcon} icon={faArrowRight} />
                        </span>
                    </Link>
                </p>
            </div>
        </>
    );
}

export default BookPage;