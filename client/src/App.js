import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SectionPage from "./pages/SectionPage";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";
import About from './pages/About';

import './App.css';

function App() {  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path=":section" exact element={<SectionPage />} />
          <Route path="searchPage" exact element={<SearchPage />} />
          <Route path="bookPage/:book" exact element={<BookPage />} />
          <Route path="about" exact element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;