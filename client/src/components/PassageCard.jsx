import React from "react";
import "bulma/css/bulma.min.css";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { Card } from "react-bulma-components";
import Highlighter from "react-highlight-words";

export const PassageCard = ({ query, reference, text, route }) => {

    return (
        <>
            <Card className={styles.passageCard}>
                <Card.Content>
                    <div className="subtitle">{reference}</div>
                    <div className="content">{text}</div>
                </Card.Content>
                <Card.Footer id="cardReadContainer">
                    <Card.Footer.Item>
                        <Link to={route}>Read</Link>
                    </Card.Footer.Item>
                </Card.Footer>
            </Card>
        </>
    );
};
