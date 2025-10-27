import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContext";
import BookList from "../components/BookList";
import Header from "../components/Header";

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);
  return (
    <div className="app-container">
      <Header />
      <h2 className="page-title">⭐ Favorites</h2>
      {favorites.length === 0 ? (
        <p className="empty-text">No favorites yet. Add some books you love.</p>
      ) : (
        <BookList books={favorites} />
      )}
    </div>
  );
};

export default Favorites;
