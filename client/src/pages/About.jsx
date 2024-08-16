import React, { useEffect, useState, useRef, useCallback } from "react";
import "bulma/css/bulma.min.css";
import styles from "./About.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import mailIcon from "../images/mailIcon.svg";
import nostrIcon from "../images/nostrIcon.svg";
import bullHornIcon from "../images/bullHornIcon.svg";
import openInNewIcon from "../images/openInNewIcon.svg";
import heartIcon from "../images/heartIcon.svg";
import { Zap } from "../components/Zap.jsx";
import { useHagahStore } from "../HagahStore.jsx";
import { Block, Box, Button, Container, Icon, Modal } from "react-bulma-components";
import { Copy, X } from "phosphor-react";
import { nip19 } from "nostr-tools";
import QRCode from "react-qr-code";
import { getCachedLightningUri, cacheLightningUri } from "../utils/ZapUtils.jsx";

function About() {
    const location = useLocation();
    const url = location.pathname;
    const [showZapModal, setShowZapModal] = useState(false);
    const [showSignInModal, setShowSignInModal] = useState(false);
    const [invoice, setInvoice] = useState(null);
    const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 5);
    }, [url]);

    return (
        <>
            {showZapModal && (
                <Zap
                    show={showZapModal}
                    setShow={setShowZapModal}
                    setShowInvoiceDialog={setShowInvoiceDialog}
                    setInvoice={setInvoice}
                />
            )}
            <div className={styles.aboutContainer}>
                <img
                    className={styles.ijnaLogo}
                    src="/images/IJNA_logo.png"
                    alt="IJNA logo which is a blue window with a star on the bottom right"
                    title="IJNA logo which is a blue window with a star on the bottom right"
                />
                <div className={styles.content}>
                    <h4 className={styles.aboutHeader}>Who we are</h4>
                    <div className={styles.paragraphContainer}>
                        <div className={styles.paragraph}>
                            <p>hagah.io is a product of IJNA Design based in Plano, TX.</p>
                            <p>
                                The code is open-source and accessible on{" "}
                                <a target="_blank" rel="noreferrer" href="https://github.com/IJNA/the-orb">
                                    Github
                                </a>
                                .
                            </p>
                            <p>If you're interested in getting in touch, please see our contact links below.</p>
                        </div>
                    </div>
                    <h4 className={styles.aboutHeader}>Contact</h4>
                    <div className={styles.buttonContainer}>
                        <a target="_blank" rel="noreferrer" href="mailto:jbasallaje@gmail.com">
                            <button>
                                <img
                                    className={styles.contactButtonImg}
                                    src={mailIcon}
                                    alt="Email button icon, evelope"
                                    title="Email button icon, evelope"
                                />
                                EMAIL
                            </button>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="http://primal.net/p/npub1j4ukddjkwguyt4kk8ugzw9fq8ct69pj7lcnsty2qqsr7ut20u6mshfllhh"
                        >
                            <button>
                                <img
                                    className={styles.contactButtonImg}
                                    src={nostrIcon}
                                    alt="NOSTR button icon, ostrich"
                                    title="NOSTR button icon, ostrich"
                                />
                                NOSTR
                            </button>
                        </a>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            className={`${styles.feedBackLink}`}
                            href="https://formstr.app/#/fill/3548a79d48b7449bf2b2ecad7926973c9c665455a453ec76fc5f65d0523d6e1e"
                        >
                            <button className={`${styles.feedBackButton}`}>
                                <img
                                    className={`${styles.contactButtonImg}`}
                                    src={bullHornIcon}
                                    alt="Give Feedback button icon, bullhorn"
                                    title="Give Feedback button icon, bullhorn"
                                />
                                GIVE FEEDBACK
                            </button>
                        </a>
                    </div>
                    <div className={styles.contributorListContainer}>
                        <a
                            target="_blank"
                            rel="noreferrer"
                            href="https://github.com/IJNA/the-orb/graphs/contributors"
                            className={styles.contributorListLink}
                        >
                            SEE CONTRIBUTOR LIST
                        </a>
                        <img
                            className={`${styles.contributorImg}`}
                            src={openInNewIcon}
                            alt="Open link in new tab icon, square with arrow comming out"
                            title="Open link in new tab icon, square with arrow comming out"
                        />
                    </div>
                    <h4 className={styles.aboutHeader}>Support</h4>
                    <div className={styles.paragraphContainer}>
                        <div className={styles.paragraph}>
                            <p>
                                Your giving helps us spend more time improving hagah while keeping it entirely free and
                                open-source. Thank you
                            </p>
                        </div>
                        <SupportUs npub="npub1xk50nsp89sge5cs0glq9tjxm885lsp077xez6zm6g2ccjdga4enqnkmr0f" />
                    </div>
                </div>
            </div>
        </>
    );
}

const SupportUs = ({ npub }) => {
    const pubkey = nip19.decode(npub)?.data;
    const [showZapModal, setShowZapModal] = useState(false);
    const [invoice, setInvoice] = useState(null);
    const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);
    const handleOpenZapModal = () => {
        setShowZapModal(true);
    };
    useEffect(() => console.log({ invoice, }), [invoice])
    return (
        <>
            <Zap
                show={showZapModal}
                setShow={setShowZapModal}
                setShowInvoiceDialog={setShowInvoiceDialog}
                pubkey={pubkey}
                setInvoice={setInvoice}
            />
            {invoice && (
                <ZapInvoice
                    invoice={invoice}
                    setInvoice={setInvoice}
                    show={!!invoice}
                    setShow={setShowInvoiceDialog}
                />
            )}
            <button className={styles.supportBtn} onClick={handleOpenZapModal}>
                SUPPORT
                <img
                    className={styles.contactButtonImg}
                    src={heartIcon}
                    alt="Support button icon, heart"
                    title="Support button icon, heart"
                />
            </button>
        </>
    );
};

const ZapInvoice = ({ show, setShow, invoice, setInvoice }) => {
    const [lightningUri, setLightningUri] = useState(getCachedLightningUri);

    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(invoice);
        alert("Invoice copied to clipboard");
    }, [invoice]);

    const handleClose = useCallback(() => {
        setShow(false);
        setInvoice(null);
    }, [setInvoice, setShow]);

    const handleLigningUriChange = useCallback((e) => {
        const value = e.target.value;
        setLightningUri(value);
    }, []);

    const handleOpenWallet = useCallback(() => {
        cacheLightningUri(lightningUri);
        window.open(`${lightningUri}${invoice}`, "_blank");
    }, [invoice, lightningUri]);

    const walletOptions = [
        { label: "Default Wallet", value: "lightning:" },
        { label: "Strike", value: "strike:lightning:" },
        { label: "Cash App", value: "https://cash.app/launch/lightning/" },
        { label: "Muun", value: "muun:" },
        { label: "Blue Wallet", value: "bluewallet:lightning:" },
        { label: "Wallet of Satoshi", value: "walletofsatoshi:lightning:" },
        { label: "Zebedee", value: "zebedee:lightning:" },
        { label: "Zeus LN", value: "zeusln:lightning:" },
        { label: "Phoenix", value: "phoenix://" },
        { label: "Breez", value: "breez:" },
        { label: "Bitcoin Beach", value: "bitcoinbeach://" },
        { label: "Blixt", value: "blixtwallet:lightning:" },
        { label: "River", value: "river://" },
    ];

    return (
        <Modal show={show} onClose={handleClose}>
            <Modal.Card>
                <Modal.Card.Header>
                    <Modal.Card.Title>
                        <Box display="flex" alignItems="center">
                            <img src="apple-touch-icon.png" alt="Icon" style={{ marginRight: "8px" }} />
                            Invoice
                        </Box>
                    </Modal.Card.Title>
                    <Button remove onClick={handleClose} style={{ position: "absolute", right: 8, top: 8 }} />
                </Modal.Card.Header>
                <Modal.Card.Body>
                    <Block>
                        <Box display="flex" justifyContent="center">
                            <QRCode size={256} value={invoice} />
                        </Box>
                        <Box textAlign="center" style={{ marginTop: "16px" }}>
                            <Button color="light" onClick={handleCopy} fullwidth>
                                <Icon align="left">
                                    <Copy />
                                </Icon>
                                {invoice}
                            </Button>
                        </Box>
                        <div>
                            <div>
                                <select value={lightningUri} onChange={handleLigningUriChange}>
                                    {walletOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Block>
                </Modal.Card.Body>
                <Modal.Card.Footer>
                    <Button color="primary" onClick={handleOpenWallet} fullwidth>
                        Open Wallet
                    </Button>
                </Modal.Card.Footer>
            </Modal.Card>
        </Modal>
    );
};
export default About;
