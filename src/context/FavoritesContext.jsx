import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem("favorites");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const isFav = useCallback((workKey) => favorites.some((f) => f.key === workKey), [favorites]);

  const addFavorite = useCallback((book) => {
    setFavorites((prev) => (prev.some((f) => f.key === book.key) ? prev : [book, ...prev]));
  }, []);

  const removeFavorite = useCallback((workKey) => {
    setFavorites((prev) => prev.filter((f) => f.key !== workKey));
  }, []);

  const value = useMemo(
    () => ({ favorites, isFav, addFavorite, removeFavorite }),
    [favorites, isFav, addFavorite, removeFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
