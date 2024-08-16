import React, { useState, useCallback } from "react";
import { Modal, Button, Icon, Box, Block, Image } from "react-bulma-components";
import { Lightning, X } from "phosphor-react";
import { useNostr } from "nostr-react";
import { nip57 } from "nostr-tools";
import { fetchInvoice, getProfileMetadata, satToMsat } from "../utils/ZapUtils.jsx";

export const Zap = ({ pubkey, show, setShow, setInvoice, setShowInvoiceDialog }) => {
    const { connectedRelays } = useNostr();
    const normalizedRelays = connectedRelays?.map((relay) => relay.url);
    const [amount, setAmount] = useState(0);
    const [comment, setComment] = useState("");
    const [isZapping, setIsZapping] = useState(false);
    const handleClose = () => setShow(false);

    const handleZap = useCallback(async () => {
        setIsZapping(true);
        const profileMetadata = await getProfileMetadata('35a8f9c0272c119a620f47c055c8db39e9f805fef1b22d0b7a42b189351dae66', normalizedRelays);
        
        const zapEndpoint = await nip57.getZapEndpoint(profileMetadata);
        console.log('zapEndpoint', zapEndpoint);
        try {
            const invoice = await fetchInvoice({
                zapEndpoint,
                amount: satToMsat(amount),
                comment,
                noteId: undefined,
                authorId: '35a8f9c0272c119a620f47c055c8db39e9f805fef1b22d0b7a42b189351dae66',
                normalizedRelays,
            });
            console.info("No webln available. Showing invoice.");
            setInvoice(invoice);
            setShow(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsZapping(false);
        }
    }, [amount, comment, normalizedRelays, setInvoice, setShow]);

    return (
        <Modal show={show} onClose={handleClose}>
            <Modal.Card>
                <Modal.Card.Header className="is-flex is-flex-direction-row is-align-items-center">
                    <figure className="image is-32x32">
                        <Image src="/images/hagah_logo.png" alt="Icon" />
                    </figure>
                    <Modal.Card.Title className="is-align-items-center">Support hagah.io</Modal.Card.Title>
                </Modal.Card.Header>
                <Modal.Card.Body>
                    <Block>
                        <div>
                            <label className="label">Amount in sats</label>
                        </div>
                        <Button.Group className="is-group is-centered">
                            {[1000, 5000, 10000, 20000, 100000, 500000].map((amt) => (
                                <div key={amt}>
                                    <Button color={amount === amt ? "primary" : "light"} onClick={() => setAmount(amt)}>
                                        {amt / 1000}k
                                    </Button>
                                </div>
                            ))}
                        </Button.Group>
                    </Block>
                    <div>
                        <div>
                            <textarea
                                className="textarea"
                                placeholder="Comment"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </div>
                    </div>
                </Modal.Card.Body>
                <Modal.Card.Footer>
                    <Button color="primary" onClick={handleZap} fullwidth disabled={amount === 0}>
                        {isZapping ? (
                            <Icon size="small" align="left">
                                <span className="spinner" />
                            </Icon>
                        ) : null}
                        Generate Invoice
                    </Button>
                </Modal.Card.Footer>
            </Modal.Card>
        </Modal>
    );
};
