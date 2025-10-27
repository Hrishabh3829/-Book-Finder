import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import BookList from "../components/BookList";
import Spinner from "../components/Spinner";

const Category = () => {
  const { name } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      setBooks([]);
      try {
        const url = `https://openlibrary.org/subjects/${encodeURIComponent(name)}.json?limit=50`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const works = Array.isArray(data.works) ? data.works : [];
        // Normalize to search-like book docs
        const normalized = works.map((w) => ({
          key: w.key, // "/works/OL...W"
          title: w.title,
          author_name: (w.authors || []).map((a) => a.name),
          author_key: (w.authors || []).map((a) => (a.key || "").split("/").pop()),
          cover_i: w.cover_id,
          first_publish_year: w.first_publish_year,
        }));
        if (!cancelled) setBooks(normalized);
      } catch (e) {
        if (!cancelled) setError("Failed to load category.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [name]);

  const title = name?.charAt(0).toUpperCase() + name?.slice(1);

  const [browseOpen, setBrowseOpen] = useState(false);

  return (
    <div className={`layout ${browseOpen ? "" : "sidebar-collapsed"}`}>
      <Sidebar />
      <main className="main">
        <Header />
        <div className="filters-top" style={{marginBottom: 8}}>
          <div className="filters-left">
            <button
              id="browse-toggle"
              className="filters-toggle browse-toggle"
              onClick={() => setBrowseOpen(!browseOpen)}
              aria-expanded={browseOpen}
              aria-controls="sidebar"
            >
              <span className="caret" aria-hidden>▾</span>
              <span>Browse</span>
            </button>
          </div>
        </div>
        <h2 className="page-title">Category: {title}</h2>
        {loading ? (
          <div className="center"><Spinner /></div>
        ) : error ? (
          <p className="error-text" role="alert">{error}</p>
        ) : books.length === 0 ? (
          <p className="empty-text">No items in this category.</p>
        ) : (
          <BookList books={books} />
        )}
      </main>
    </div>
  );
};

export default Category;
