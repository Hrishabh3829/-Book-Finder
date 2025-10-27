import { NavLink } from "react-router-dom";

const CATEGORIES = [
  "fiction",
  "science",
  "history",
  "technology",
  "art",
  "biography",
  "children",
  "fantasy",
  "mystery",
];

const Sidebar = () => {
  return (
    <aside id="sidebar" className="sidebar" aria-label="Categories">
      <div className="sidebar-header">Browse</div>
      <nav className="sidebar-nav">
        {CATEGORIES.map((c) => (
          <NavLink key={c} to={`/category/${encodeURIComponent(c)}`} className={({ isActive }) => `side-link${isActive ? " active" : ""}`}>
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </NavLink>
        ))}
        <NavLink to="/favorites" className={({ isActive }) => `side-link${isActive ? " active" : ""}`}>
          ⭐ Favorites
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
