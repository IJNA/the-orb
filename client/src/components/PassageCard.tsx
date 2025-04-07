import React, { useCallback } from "react";
import "bulma/css/bulma.min.css";
import styles from "./Card.module.scss";
import { Link } from "react-router-dom";
import { Card } from "react-bulma-components";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { shareContent } from "../utils/ShareHandler";

export const PassageCard = ({ reference, textElement, route, text }: { reference: string; textElement: string | undefined | JSX.Element; route: string; text: string }) => {
    const handleShare = useCallback(async () => {
        if (!text) return;

        try {
            await shareContent({ passage: reference, text, url: window.location.origin + route });
        } catch (err) {
            console.error("Share error:", err);
            toast.error("Failed to share passage");
        }
    }, [reference, route, text]);

    return (
        <Card className={styles.passageCard}>
            <Card.Content>
                <div className="is-flex is-flex-direction-row is-justify-content-space-between">
                    <div className="subtitle">{reference}</div>
                    <FontAwesomeIcon icon={faShareFromSquare} onClick={handleShare} />
                </div>
                <div className="content">{textElement}</div>
            </Card.Content>
            <Card.Footer className={styles.passageCardFooter}>
                <Card.Footer.Item>
                    <Link to={route}>Read</Link>
                </Card.Footer.Item>
            </Card.Footer>
        </Card>
    );
};
