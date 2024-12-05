import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SectionPage from "./pages/SectionPage";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";
import About from "./pages/About";
import "./App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Account from "./components/Account";
import { useNostrHooks } from "nostr-hooks";

function App() {
    useNostrHooks();
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="sections" element={<HomePage />} />
                <Route path="sections/:section" element={<SectionPage />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="sections/:section/:book" element={<BookPage />} />
                <Route path="sections/:section/:book/:selectedChapter" element={<BookPage />} />
                <Route path="sections/:section/:book/:selectedChapter/:selectedVerse" element={<BookPage />} />
                <Route path="about" element={<About />} />
                <Route path="account" element={<Account />} />
            </Routes>
            <Navbar />
        </Router>
    );
}

export default App;
