import { useFavorites } from "../context/FavoritesContext";

function RecipeCard({ recipe, onClick }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(recipe.idMeal);

  const handleFav = (e) => {
    e.stopPropagation();
    toggleFavorite(recipe.idMeal);
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden relative"
    >
      <button
        onClick={handleFav}
        className="absolute top-3 right-3 text-xl"
      >
        <i
          className={`fa-heart ${
            fav ? "fa-solid text-red-500" : "fa-regular text-white"
          }`}
        ></i>
      </button>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h2 className="font-semibold text-lg truncate">
          {recipe.strMeal}
        </h2>
        <p className="text-sm text-gray-500">
          {recipe.strCategory}
        </p>
      </div>
    </div>
  );
}

export default RecipeCard;
