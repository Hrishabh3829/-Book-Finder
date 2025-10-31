import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  { name: "fiction", icon: "📚" },
  { name: "science", icon: "🔬" },
  { name: "history", icon: "📜" },
  { name: "technology", icon: "💻" },
  { name: "art", icon: "🎨" },
  { name: "biography", icon: "👤" },
  { name: "children", icon: "🧒" },
  { name: "fantasy", icon: "🐉" },
  { name: "mystery", icon: "🔍" },
];

const BrowseDropdown = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="browse-dropdown-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
            }}
          />
          
          <motion.div
            className="browse-dropdown"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="browse-dropdown-header">Categories</div>
            <nav className="browse-dropdown-nav">
              {CATEGORIES.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <NavLink
                    to={`/category/${encodeURIComponent(category.name)}`}
                    className={({ isActive }) =>
                      `browse-dropdown-link${isActive ? " active" : ""}`
                    }
                    onClick={onClose}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name.charAt(0).toUpperCase() + category.name.slice(1)}</span>
                  </NavLink>
                </motion.div>
              ))}
              
              <div className="browse-dropdown-divider" />
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: CATEGORIES.length * 0.03 }}
              >
                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `browse-dropdown-link${isActive ? " active" : ""}`
                  }
                  onClick={onClose}
                >
                  <span>⭐</span>
                  <span>Favorites</span>
                </NavLink>
              </motion.div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BrowseDropdown;
