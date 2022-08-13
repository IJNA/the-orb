import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TheLaw from "./pages/TheLaw";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";

import './App.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="theLaw" exact element={<TheLaw />} />
          <Route path="searchPage" exact element={<SearchPage />} />
          <Route path="bookPage/:book" exact element={<BookPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
