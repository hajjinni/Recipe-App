import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMealById } from "../services/api";
import Loader from "../components/Loader";
import { useFavorites } from "../context/FavoritesContext";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeal = async () => {
      setLoading(true);
      try {
        const data = await fetchMealById(id);
        setMeal(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadMeal();
  }, [id]);

  if (loading) return <Loader />;
  if (!meal) return <p className="text-center">Recipe not found 😢</p>;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) ingredients.push(`${ingredient} - ${measure}`);
  }

  const fav = isFavorite(id);

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-500 hover:underline"
        >
          ← Back
        </button>
        <button onClick={() => toggleFavorite(id)}>
          <i className={`fa-heart text-2xl ${fav ? "fa-solid text-red-500" : "fa-regular"}`}></i>
        </button>
      </div>

      <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full rounded-lg mb-6" />
      <h1 className="text-3xl font-bold mb-2">{meal.strMeal}</h1>
      <p className="text-gray-600 mb-4">{meal.strCategory} • {meal.strArea}</p>

      <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
        {ingredients.map((item, index) => (
          <li key={index} className="bg-gray-100 px-3 py-2 rounded text-sm">{item}</li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mb-2">Instructions</h2>
      <p className="text-gray-700 leading-relaxed whitespace-pre-line mb-6">{meal.strInstructions}</p>

      {meal.strYoutube && (
        <a
          href={meal.strYoutube}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition"
        >
          <i className="fa-brands fa-youtube text-lg"></i>
          Watch Video
        </a>
      )}

    </div>
  );
}

export default RecipeDetails;
