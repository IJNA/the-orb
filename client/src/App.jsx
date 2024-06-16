import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SectionPage from "./pages/SectionPage";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";
import About from "./pages/About";
import "./App.css";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="sections" element={<HomePage />} />
                    <Route path="sections/:section" element={<SectionPage />} />
                    <Route path="search" element={<SearchPage />} />
                    <Route path="sections/:section/:book" element={<BookPage />} />
                    <Route path="about" exact element={<About />} />
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
