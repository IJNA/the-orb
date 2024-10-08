import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import SectionPage from "./pages/SectionPage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import BookPage from "./pages/BookPage.jsx";
import About from "./pages/About.jsx";
import "./App.css";
import Header from "./components/Header.jsx";
import Navbar from "./components/Navbar.jsx";
import Account from "./components/Account.jsx"

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
