import { useContext } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const Header = () => {
  const { dark, toggleDark, resetSearch } = useContext(SearchContext);
  const location = useLocation();
  const navigate = useNavigate();
  const showBack = location.pathname !== "/";

  return (
    <header className="app-header">
      <div className="header-left">
        {showBack && (
          <button
            className="back-btn"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ← Back
          </button>
        )}
        <h1 className="app-title">
          <Link
            to="/"
            className="link-button brand"
            onClick={() => {
              resetSearch();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Go home and clear search"
          >
            📚 Book Finder
          </Link>
        </h1>
      </div>
      <button className="theme-toggle" onClick={toggleDark} aria-pressed={dark} aria-label="Toggle dark mode">
        {dark ? "🌞 Light" : "🌙 Dark"}
      </button>
    </header>
  );
};

export default Header;
