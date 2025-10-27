import { useEffect, useRef, useState } from "react";

// Props:
// - value: string (controlled)
// - onImmediateSearch(query): called on submit button
// - onDebouncedChange(query): called after 500ms inactivity
// - recent: string[]
// - onPickRecent(query)
// - onClearRecent()
const SearchBar = ({
  value = "",
  onImmediateSearch,
  onDebouncedChange,
  recent = [],
  onPickRecent,
  onClearRecent,
}) => {
  const [query, setQuery] = useState(value);
  const lastEmitted = useRef("");

  useEffect(() => setQuery(value), [value]);

  // debounce 500ms
  useEffect(() => {
    const id = setTimeout(() => {
      if (query.trim() !== lastEmitted.current.trim()) {
        lastEmitted.current = query;
        onDebouncedChange?.(query);
      }
    }, 500);
    return () => clearTimeout(id);
  }, [query, onDebouncedChange]);

  const handleSubmit = (e) => {
    e.preventDefault();
    lastEmitted.current = query;
    onImmediateSearch?.(query);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="search-container" role="search" aria-label="Book search">
        <input
          type="text"
          placeholder="Search for books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          aria-label="Search books by title"
        />
        <button type="submit" className="search-btn">
          Search
        </button>
      </form>

      {recent?.length ? (
        <div className="recent-bar" aria-label="Recent searches">
          {recent.map((r) => (
            <button
              key={r}
              className="chip"
              onClick={() => onPickRecent?.(r)}
              type="button"
            >
              {r}
            </button>
          ))}
          <button
            className="chip chip-clear"
            onClick={onClearRecent}
            type="button"
            aria-label="Clear recent searches"
          >
            Clear
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
