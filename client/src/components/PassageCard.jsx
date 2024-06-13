import React from "react";
import "bulma/css/bulma.min.css";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { useFindSectionByAPIBookTitle } from "../utils/Hooks";
import { Card } from "react-bulma-components";

export const PassageCard = ({ reference, text, bookId }) => {
    const { book } = useFindSectionByAPIBookTitle(bookId);
    return (
        <>
            <Card className={styles.passageCard}>
                <Card.Content>
                    <div className="subtitle">{reference}</div>
                    <div className="content">{text}</div>
                </Card.Content>
                <Card.Footer id="cardReadContainer">
                    <Card.Footer.Item>
                        <Link to={book.route}>Read</Link>
                    </Card.Footer.Item>
                </Card.Footer>
            </Card>
        </>
    );
};
