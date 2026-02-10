import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import {
  fetchCategories,
  fetchIngredients,
  fetchMealAreas,
  searchMeals,
  fetchMealsByFilters,
} from "../services/api";
import Filters from "../components/Filters";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [mealAreas, setMealAreas] = useState([]);
  const [loading, setLoading] = useState(false);

  const [offset, setOffset] = useState(0);
  const LIMIT = 12;
  const [total, setTotal] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  /* 🔥 FULL HARD RESET ON BROWSER RELOAD */
  useEffect(() => {
    const navType = performance.getEntriesByType("navigation")[0]?.type;

    if (navType === "reload") {
      window.location.replace("/");
    }
  }, []);

  /* ♻ Reset pagination when filters/search change */
  useEffect(() => {
    setOffset(0);
    setRecipes([]);
  }, [searchParams]);

  /* 📥 Load categories, ingredients, areas */
  useEffect(() => {
    const loadFilters = async () => {
      setCategories(await fetchCategories());
      setIngredients(await fetchIngredients());
      setMealAreas(await fetchMealAreas());
    };
    loadFilters();
  }, []);

  /* 🍽 Load recipes */
  useEffect(() => {
    const loadMeals = async () => {
      setLoading(true);
      try {
        const cat = searchParams.get("cat") || "";
        const ing = searchParams.get("ing") || "";
        const area = searchParams.get("area") || "";
        const q = searchParams.get("q") || "";

        // 🔍 TEXT SEARCH
        if (q) {
          const data = await searchMeals(q);
          setRecipes(data || []);
          setTotal(data?.length || 0);
          return;
        }

        // 🎯 FILTERS + PAGINATION
        const res = await fetchMealsByFilters({
          category: cat,
          ingredient: ing,
          area,
          offset,
          limit: LIMIT,
        });

        setRecipes((prev) =>
          offset === 0 ? res.meals : [...prev, ...res.meals]
        );
        setTotal(res.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMeals();
  }, [searchParams, offset]);

  /* 🎛 Update filters */
  const handleFilterChange = (type, value) => {
    const params = Object.fromEntries([...searchParams]);

    if (value) params[type] = value;
    else delete params[type];

    setSearchParams(params);
  };

  /* 🔄 Soft Reset Button */
  const handleResetHome = () => {
    setSearchParams({});
    setOffset(0);
    setRecipes([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isDefault =
    !searchParams.get("q") &&
    !searchParams.get("cat") &&
    !searchParams.get("ing") &&
    !searchParams.get("area");

  return (
    <>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Recipes</h1>

        {!isDefault && (
          <button
            onClick={handleResetHome}
            className="px-4 py-2 text-sm bg-red-400 text-white rounded-lg hover:bg-red-500 transition"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* FILTERS */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Filters
          categories={categories}
          ingredients={ingredients}
          mealTypes={mealAreas}
          selectedCategory={searchParams.get("cat") || ""}
          selectedIngredient={searchParams.get("ing") || ""}
          selectedMeal={searchParams.get("area") || ""}
          onFilterChange={handleFilterChange}
        />
      </div>

      {/* RESULTS */}
      {loading ? (
        <Loader />
      ) : recipes.length === 0 ? (
        <p className="text-center text-gray-600">No recipes found 🍽️</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onClick={() =>
                  navigate(`/recipe/${recipe.idMeal}`, {
                    state: {
                      from: location.pathname + location.search,
                    },
                  })
                }
              />
            ))}
          </div>

          {/* LOAD MORE */}
          {recipes.length < total && !loading && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setOffset((prev) => prev + LIMIT)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Home;
