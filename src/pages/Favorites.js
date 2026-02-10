import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { fetchMealById } from "../services/api";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

function Favorites() {
  const { favorites } = useFavorites();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);

      if (favorites.length === 0) {
        setMeals([]);
        return;
      }

      const data = await Promise.all(
        favorites.map((id) => fetchMealById(id))
      );

      setMeals(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  if (loading) return <Loader />;

  if (meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 text-gray-500">
        <i className="fa-regular fa-heart text-6xl mb-4"></i>
        <h2 className="text-xl font-semibold mb-1">
          No favorites yet
        </h2>
        <p className="text-sm">
          Tap the{" "}
          <i className="fa-solid fa-heart text-red-500 mx-1"></i>
          icon on any recipe to save it
        </p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6 text-center">
        Your Favorite Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {meals.map((meal) => (
          <RecipeCard
            key={meal.idMeal}
            recipe={meal}
            onClick={() => navigate(`/recipe/${meal.idMeal}`)}
          />
        ))}
      </div>
    </>
  );
}

export default Favorites;
