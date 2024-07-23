import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SectionPage from "./pages/SectionPage";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";
import About from "./pages/About";
import "./App.css";
import Header from "./components/Header";

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
                </Routes>
            </Router>
        </>
    );
}

export default App;
