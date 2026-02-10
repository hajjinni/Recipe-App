const KEY = "favoriteMeals";

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem(KEY)) || [];
};

export const isFavorite = (id) => {
  return getFavorites().includes(id);
};

export const toggleFavorite = (id) => {
  let favs = getFavorites();
  if (favs.includes(id)) {
    favs = favs.filter((f) => f !== id);
  } else {
    favs.push(id);
  }
  localStorage.setItem(KEY, JSON.stringify(favs));
  return favs;
};
