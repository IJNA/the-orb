import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { NostrProvider } from "nostr-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

const relayUrls = [
    "wss://relay.damus.io",
    "wss://nostr.mom",
    "wss://nostr.slothy.win",
    "wss://relay.stoner.com",
    "wss://nostr.einundzwanzig.space",
    "wss://nos.lol",
    "wss://relay.nostr.band",
];

root.render(
    <React.StrictMode>
        <NostrProvider relayUrls={relayUrls}>
            <App />
        </NostrProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
