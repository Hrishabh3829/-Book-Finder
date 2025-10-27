import { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async (query) => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();

      if (data.docs.length === 0) {
        setError("No books found. Try another title.");
      } else {
        setBooks(data.docs.slice(0, 20));
      }
    } catch {
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📚 Book Finder</h1>
      <SearchBar onSearch={fetchBooks} />
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      {!loading && !error && <BookList books={books} />}
    </div>
  );
};

export default Home;
