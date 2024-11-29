import React, { useState, useCallback } from "react";
import "bulma/css/versions/bulma-no-dark-mode.css";
import styles from "./Account.module.scss";
import "bulma/css/bulma.min.css";
import heartIcon from "../images/heartIcon.svg";
import { useNostr } from "nostr-react";
import { nip19, nip57 } from "nostr-tools";
import { Button, Modal, Container, Form } from "react-bulma-components";
import {
    getProfileMetadata,
    cacheLightningUri,
    fetchInvoice,
    satToMsat,
} from "../utils/ZapUtils";
import { CopySimple } from "phosphor-react";
import QRCode from "react-qr-code";

function Account() {

    return (
        <div className={styles.accountPageContainer}>
            <div>
                <h1 className={styles.accountHeader}>Work in progress :)</h1>
                <p id={styles.accountParagraph} className={styles.accountParagraph}>Come back to see personalized settings, saved passages, and more here soon!</p>
                <SupportUs npub="npub1xk50nsp89sge5cs0glq9tjxm885lsp077xez6zm6g2ccjdga4enqnkmr0f" />
            </div>
        </div>
    );
}

const SupportUs = ({ npub }) => {
    const pubkey = nip19.decode(npub)?.data;
    const [showZapModal, setShowZapModal] = useState(false);
    const [invoice, setInvoice] = useState(null);
    const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);

    const handleClick = useCallback(() => setShowZapModal(true), []);

    return (
        <>
            {showZapModal && (
                <ZapDialog
                    show={showZapModal}
                    setShow={setShowZapModal}
                    setShowInvoiceDialog={setShowInvoiceDialog}
                    pubkey={pubkey}
                    setInvoice={setInvoice}
                />
            )}
            {invoice ? (
                <InvoiceDialog
                    invoice={invoice}
                    setInvoice={setInvoice}
                    show={showInvoiceDialog}
                    setShow={setShowInvoiceDialog}
                />
            ) : null}
            <button className={styles.supportBtn} onClick={handleClick}>
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

const ZapDialog = ({ pubkey, show, setShow, setInvoice, setShowInvoiceDialog }) => {
    const { connectedRelays } = useNostr();
    const normalizedRelays = connectedRelays?.map((relay) => relay.url);
    const [amount, setAmount] = useState(0);
    const [comment, setComment] = useState("");
    const [isZapping, setIsZapping] = useState(false);
    const handleClose = () => setShow(false);

    const handleZap = useCallback(async () => {
        setIsZapping(true);
        const profileMetadata = await getProfileMetadata(pubkey, normalizedRelays);
        const zapEndpoint = await nip57.getZapEndpoint(profileMetadata);
        try {
            const invoice = await fetchInvoice({
                zapEndpoint,
                amount: satToMsat(amount),
                comment,
                noteId: undefined,
                authorId: pubkey,
                normalizedRelays,
            });
            console.info("No webln available. Showing invoice.");
            setInvoice(invoice);
            setShow(false);
            setShowInvoiceDialog(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsZapping(false);
        }
    }, [pubkey, amount, comment, normalizedRelays, setInvoice, setShow, setShowInvoiceDialog]);

    const handleSelectAmount = useCallback(
        (selectedAmount) => {
            if (selectedAmount === amount) {
                setAmount(0);
            } else {
                setAmount(selectedAmount);
            }
        },
        [amount]
    );
    return (
        <Modal show={show} onClose={handleClose}>
            <Modal.Card>
                <Modal.Card.Header>
                    <img
                        src="/images/hagah_logo.png"
                        alt="hagah.io logo"
                        style={{ width: "40px", marginRight: "1em" }}
                    />
                    <div className="modal-card-title" style={{ marginBottom: "0 !important;" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: "500" }}> Support hagah.io </div>
                    </div>
                </Modal.Card.Header>
                <Modal.Card.Body>
                    Amount in sats
                    <div className="grid">
                        <div className="cell">
                            <Button
                                color={amount === 1000 ? "primary" : undefined}
                                onClick={() => handleSelectAmount(1000)}
                                fullwidth
                            >
                                1k
                            </Button>
                        </div>
                        <div className="cell">
                            <Button
                                color={amount === 5000 ? "primary" : undefined}
                                onClick={() => handleSelectAmount(5000)}
                                fullwidth
                            >
                                5k
                            </Button>
                        </div>
                        <div className="cell">
                            <Button
                                color={amount === 10000 ? "primary" : undefined}
                                onClick={() => handleSelectAmount(10000)}
                                fullwidth
                            >
                                10k
                            </Button>
                        </div>
                        <div className="cell">
                            <Button
                                color={amount === 20000 ? "primary" : undefined}
                                onClick={() => handleSelectAmount(20000)}
                                fullwidth
                            >
                                20k
                            </Button>
                        </div>
                        <div className="cell">
                            <Button
                                color={amount === 100000 ? "primary" : undefined}
                                onClick={() => handleSelectAmount(100000)}
                                fullwidth
                            >
                                100k
                            </Button>
                        </div>
                        <div className="cell">
                            <Button
                                color={amount === 500000 ? "primary" : undefined}
                                onClick={() => handleSelectAmount(500000)}
                                fullwidth
                            >
                                500k
                            </Button>
                        </div>
                    </div>
                    <textarea
                        className="textarea mb-5"
                        placeholder="Comment"
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button onClick={handleZap} disabled={amount === 0} loading={isZapping} fullwidth color="primary">
                        Generate Invoice
                    </Button>
                </Modal.Card.Body>
            </Modal.Card>
        </Modal>
    );
};

const InvoiceDialog = ({ invoice, setInvoice, show, setShow }) => {
    const [lightningUri, setLightningUri] = useState(null);

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
        { label: "Select a Wallet", value: "" },
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
                    <img
                        src="/images/hagah_logo.png"
                        alt="hagah.io logo"
                        style={{ width: "40px", marginRight: "1em" }}
                    />
                    <div className="modal-card-title" style={{ marginBottom: "0 !important;" }}>
                        <div style={{ fontSize: "1.5rem", fontWeight: "500" }}> Invoice </div>
                    </div>
                </Modal.Card.Header>
                <Modal.Card.Body>
                    <Container className="is-flex is-justify-content-center mb-5">
                        <QRCode size={256} value={invoice} viewBox={`0 0 256 256`} />
                    </Container>

                    <div className="tags has-addons is-centered">
                        <Button onClick={handleCopy} className="is-rounded" title="Copy Invoice to Clipboard">
                            <CopySimple fontSize={18} className="mr-1" />
                            <span style={{ textOverflow: "ellipsis", width: "400px", overflow: "hidden" }}>
                                {invoice}
                            </span>
                        </Button>
                    </div>

                    <Form.Field>
                        <Form.Label>Wallet</Form.Label>
                        <Form.Select value={lightningUri} title="Wallet" onChange={handleLigningUriChange} fullwidth>
                            {walletOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Field>

                    <Button color="primary" onClick={handleOpenWallet} fullwidth disabled={!lightningUri}>
                        Open Wallet
                    </Button>
                </Modal.Card.Body>
            </Modal.Card>
        </Modal>
    );
};

export default Account;
