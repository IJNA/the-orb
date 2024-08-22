import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NostrProvider } from "nostr-react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const relayUrls = [
    "wss://nostr.mom",
    "wss://nostr.slothy.win",
    "wss://relay.stoner.com",
    "wss://nostr.einundzwanzig.space",
    "wss://nos.lol",
    "wss://relay.nostr.band",
    "wss://lightningrelay.com",
    "wss://nostr.bch.ninja",
    "wss://relayable.org",
    "wss://nostr.crypticthreadz.com",
    "wss://lightningrelay.com",
    "wss://nostr.wine",
    "wss://astral.ninja",
    "wss://at.nostrworks.com",
    "wss://brb.io",
];

root.render(
    <React.StrictMode>
        <NostrProvider relayUrls={relayUrls}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </NostrProvider>
    </React.StrictMode>
);
