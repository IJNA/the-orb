import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NostrProvider } from "nostr-react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient();
const relayUrls = ["wss://relay.hagah.io"];

root.render(
    <NostrProvider relayUrls={relayUrls}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </NostrProvider>
);
