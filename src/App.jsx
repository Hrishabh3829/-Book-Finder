import Home from "./pages/Home";
import Category from "./pages/Category";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import Author from "./pages/Author";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <FavoritesProvider>
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:name" element={<Category />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/author/:id" element={<Author />} />
            </Routes>
          </div>
        </FavoritesProvider>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
