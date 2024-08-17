import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Button,
  Container,
  Grid,
  Typography,
  Divider,
  Stack,
  Card,
  LinearProgress,
  CardMedia,
  CardContent,
  Avatar,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  Box,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import "bulma/css/bulma.min.css";
import styles from "./About.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import parse from "html-react-parser";
import mailIcon from '../images/mailIcon.svg';
import nostrIcon from '../images/nostrIcon.svg';
import bullHornIcon from '../images/bullHornIcon.svg';
import openInNewIcon from '../images/openInNewIcon.svg';
import heartIcon from '../images/heartIcon.svg';
import { useNostr } from "nostr-react";
import { nip19, nip57 } from "nostr-tools";
import { Button as BulmaButton, Box as BulmaBox, Icon } from "react-bulma-components";
import { getProfileMetadata, getCachedLightningUri, cacheLightningUri, fetchInvoice, satToMsat } from "../utils/ZapUtils.jsx";
import { useHagahStore } from "../HagahStore.jsx";
import { Copy, X } from "phosphor-react";
import QRCode from "react-qr-code";

function About() {
  const params = useParams();
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [content, setContent] = useState("retrieving content...");
  const [bookName, setBookName] = useState("");
  const [nextBook, setNextBook] = useState("");
  const [nextApiName, setNextApiName] = useState("");
  const shouldMount = useRef(true);
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
      setTimeout(() => {
          window.scrollTo(0, 0);
      }, 5);
  }, [url]);

  return (
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
            <p>The code is open-source and accessible on <a target="_blank" rel="noreferrer" href="https://github.com/IJNA/the-orb">Github</a>.</p>
            <p>If you're interested in getting in touch, please see our contact links below.</p>
          </div>
        </div>
        <h4 className={styles.aboutHeader}>Contact</h4>
        <div className={styles.buttonContainer}>
          <a target="_blank" rel="noreferrer" href="mailto:jbasallaje@gmail.com">
            <button><img
              className={styles.contactButtonImg}
              src={mailIcon}
              alt="Email button icon, evelope"
              title="Email button icon, evelope"
            />EMAIL</button>
          </a>
          <a target="_blank" rel="noreferrer" href="http://primal.net/p/npub1j4ukddjkwguyt4kk8ugzw9fq8ct69pj7lcnsty2qqsr7ut20u6mshfllhh">
            <button><img
              className={styles.contactButtonImg}
              src={nostrIcon}
              alt="NOSTR button icon, ostrich"
              title="NOSTR button icon, ostrich"
            />NOSTR</button>
          </a>
          <a target="_blank" rel="noreferrer" className={`${styles.feedBackLink}`} href="https://formstr.app/#/fill/3548a79d48b7449bf2b2ecad7926973c9c665455a453ec76fc5f65d0523d6e1e">
            <button className={`${styles.feedBackButton}`}><img
              className={`${styles.contactButtonImg}`}
              src={bullHornIcon}
              alt="Give Feedback button icon, bullhorn"
              title="Give Feedback button icon, bullhorn"
            />GIVE FEEDBACK</button>
          </a>
        </div>
        <div className={styles.contributorListContainer}>
          <a target="_blank" rel="noreferrer" href="https://github.com/IJNA/the-orb/graphs/contributors" className={styles.contributorListLink}>
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
            <p>Your giving helps us spend more time improving hagah while keeping it entirely free and open-source. Thank you</p>
          </div>
        </div>
        {/* <button className={styles.supportBtn}>SUPPORT<img
          className={styles.contactButtonImg}
          src={heartIcon}
          alt="Support button icon, heart"
          title="Support button icon, heart"
        /></button> */}
        <SupportUs npub="npub1xk50nsp89sge5cs0glq9tjxm885lsp077xez6zm6g2ccjdga4enqnkmr0f" />
      </div>
    </div>
  );
}
const SupportUs = ({ npub }) => {
  const pubkey = nip19.decode(npub)?.data;
  const [showZapModal, setShowZapModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);

  const handleClick = useCallback(() => setShowZapModal(true), []);

  return (
      <>
          <ZapDialog
              show={showZapModal}
              setShow={setShowZapModal}
              setShowInvoiceDialog={setShowInvoiceDialog}
              pubkey={pubkey}
              setInvoice={setInvoice}
          />
          <SignInDialog show={showSignInModal} setShow={setShowSignInModal} />
          {invoice ? (
              <InvoiceDialog
                  invoice={invoice}
                  setInvoice={setInvoice}
                  show={showInvoiceDialog}
                  setShow={setShowInvoiceDialog}
              />
          ) : null}
          <Button variant="outlined" endIcon={<Icon icon="heart"/>} onClick={handleClick}>
              <Typography fontWeight={600}>Support</Typography>
          </Button>
      </>
  );
};

const SignInDialog = ({ show, setShow }) => {
  const { signedInAs, setSignedInAs } = useHagahStore();
  const handleClose = () => setShow(false);

  const handleSingInWithExtension = useCallback(async () => {
      const nostrExtension = window?.nostr ?? null;

      if (!signedInAs && nostrExtension) {
          try {
              const publicKey = (await nostrExtension?.getPublicKey()) ?? null;
              setSignedInAs(publicKey);
          } catch (e) {
              console.error(e);
          }
      }
  }, [setSignedInAs, signedInAs]);

  return (
      <Dialog open={show && !signedInAs} onClose={handleClose} fullWidth>
          <DialogTitle>
              <Grid container item xs={12} alignItems="center">
                  <Avatar src="apple-touch-icon.png" sx={{ marginRight: 1 }} /> Sign In
              </Grid>
          </DialogTitle>
          <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
              }}
          >
              <X />
          </IconButton>
          <DialogContent>
              <Stack direction="column">
                  <Button variant="contained" sx={{ marginTop: 3 }} onClick={handleSingInWithExtension}>
                      Sign in with extension
                  </Button>
              </Stack>
          </DialogContent>
      </Dialog>
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
              authorId: pubkey,
              normalizedRelays,
          });
          if (window.webln) {
              try {
                  console.info("Attempting to send payment automatically.");
                  await window.webln.enable();
                  await window.webln.sendPayment(invoice);
                  setShow(false);
              } catch (e) {
                  console.info("Couldn't send payment automatically. Showing invoice.");
                  setInvoice(invoice);
                  setShow(false);
                  setShowInvoiceDialog(true);
              }
          } else {
              console.info("No webln available. Showing invoice.");
              setInvoice(invoice);
              setShow(false);
              setShowInvoiceDialog(true);
          }
      } catch (error) {
          console.error(error);
      } finally {
          setIsZapping(false);
      }
  }, [pubkey, amount, comment, normalizedRelays, setInvoice, setShow, setShowInvoiceDialog]);

  return (
      <Dialog open={show} onClose={handleClose} fullWidth>
          <DialogTitle>
              <Grid container item xs={12} alignItems="center">
                  <Avatar src="apple-touch-icon.png" sx={{ marginRight: 1 }} /> Send sats to Zeum.space
              </Grid>
          </DialogTitle>
          <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
              }}
          >
              <X />
          </IconButton>
          <DialogContent>
              <Typography variant="subtitle1">Zap amount in sats</Typography>
              <Grid container spacing={1} justifyContent="center" marginBottom={1}>
                  <Grid item xs={12} md={4}>
                      <Button
                          variant={amount === 1000 ? "contained" : "outlined"}
                          onClick={() => setAmount(1000)}
                          fullWidth
                      >
                          1k
                      </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Button
                          variant={amount === 5000 ? "contained" : "outlined"}
                          onClick={() => setAmount(5000)}
                          fullWidth
                      >
                          5k
                      </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Button
                          variant={amount === 10000 ? "contained" : "outlined"}
                          onClick={() => setAmount(10000)}
                          fullWidth
                      >
                          10k
                      </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Button
                          variant={amount === 20000 ? "contained" : "outlined"}
                          onClick={() => setAmount(20000)}
                          fullWidth
                      >
                          20k
                      </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Button
                          variant={amount === 100000 ? "contained" : "outlined"}
                          onClick={() => setAmount(100000)}
                          fullWidth
                      >
                          100k
                      </Button>
                  </Grid>
                  <Grid item xs={12} md={4}>
                      <Button
                          variant={amount === 500000 ? "contained" : "outlined"}
                          onClick={() => setAmount(500000)}
                          fullWidth
                      >
                          500k
                      </Button>
                  </Grid>
              </Grid>

              <TextField
                  hiddenLabel
                  placeholder="Comment"
                  type="text"
                  fullWidth
                  variant="outlined"
                  onChange={(e) => setComment(e.target.value)}
                  multiline
                  sx={{ marginBottom: 2 }}
              />

              <Button
                  variant="contained"
                  onClick={handleZap}
                  sx={{ textTransform: "none" }}
                  fullWidth
                  disabled={amount === 0}
              >
                  {isZapping ? (
                      <CircularProgress size={16} color="inherit" sx={{ marginRight: "4px" }} />
                  ) : null}
                  <Typography>Zap Zeum</Typography>
              </Button>
          </DialogContent>
      </Dialog>
  );
};

const InvoiceDialog = ({ invoice, setInvoice, show, setShow }) => {
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
      <Dialog open={show} onClose={handleClose} fullWidth>
          <DialogTitle>
              <Grid container item xs={12} alignItems="center">
                  <Avatar src="apple-touch-icon.png" sx={{ marginRight: 1 }} /> Invoice
              </Grid>
          </DialogTitle>
          <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
              }}
          >
              <X />
          </IconButton>
          <DialogContent>
              <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={12} textAlign="center">
                      <Box>
                          <QRCode size={256} value={invoice} viewBox={`0 0 256 256`} />
                      </Box>
                  </Grid>
                  <Grid item xs={12}>
                      <Chip
                          label={invoice}
                          sx={{ marginTop: 2, textAlign: "center", textOverflow: "ellipsis" }}
                          onClick={handleCopy}
                          icon={<Copy fontSize="18" />}
                      />
                  </Grid>
                  <Grid item xs={12}>
                      <FormControl size="small" sx={{ minWidth: 240 }} fullWidth>
                          <InputLabel id="wallet-select-label">Wallet</InputLabel>
                          <Select
                              labelId="wallet-select-label"
                              id="wallet-select"
                              value={lightningUri}
                              label="Wallet"
                              onChange={handleLigningUriChange}
                          >
                              {walletOptions.map((option) => (
                                  <MenuItem key={option.value} value={option.value}>
                                      {option.label}
                                  </MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                      <Button variant="contained" onClick={handleOpenWallet} sx={{ textTransform: "none" }} fullWidth>
                          Open Wallet
                      </Button>
                  </Grid>
              </Grid>
          </DialogContent>
      </Dialog>
  );
};

export default About;
