import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext();

const KEY = "favoriteMeals";

const getStoredFavorites = () =>
  JSON.parse(localStorage.getItem(KEY)) || [];

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getStoredFavorites());

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        count: favorites.length,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
