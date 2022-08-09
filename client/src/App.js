import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TheLaw from "./pages/TheLaw";
import SearchPage from "./pages/SearchPage";

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="theLaw" exact element={<TheLaw />} />
          <Route path="searchPage" exact element={<SearchPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
