import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import TheLaw from "./pages/TheLaw";
import SearchPage from "./pages/SearchPage";
import BookPage from "./pages/BookPage";
import TheProphets from "./pages/TheProphets";
import TheWritings from "./pages/TheWritings";
import TheRevelation from "./pages/TheRevelation";
import TheLetters from "./pages/TheLetters";
import TheGospelsAndActs from "./pages/TheGospelsAndActs";



import './App.css';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="theLaw" exact element={<TheLaw />} />
          <Route path="theProphets" exact element={<TheProphets />} />
          <Route path="theWritings" exact element={<TheWritings />} />
          <Route path="theRevelation" exact element={<TheRevelation />} />
          <Route path="theLetters" exact element={<TheLetters />} />
          <Route path="theGospelsAndActs" exact element={<TheGospelsAndActs />} />
          <Route path="searchPage" exact element={<SearchPage />} />
          <Route path="bookPage" exact element={<BookPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
