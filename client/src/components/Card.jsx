import React from "react";
import "bulma/css/bulma.min.css";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { useFindSectionByAPIBookTitle } from "../utils/Hooks";

function Card({ reference, text, bookId }) {
    const { book } = useFindSectionByAPIBookTitle(bookId);
    return (
        <>
            <div className={`card ${styles.passageCard}`}>
                <div className="card-content">
                    <div className="subtitle">{reference}</div>
                    <div className="content">{text}</div>
                </div>
                <footer id="cardReadContainer" className="card-footer">
                    <span className="card-footer-item">
                        <Link to={book.route}>Read</Link>
                    </span>
                </footer>
            </div>
        </>
    );
}

export default Card;
