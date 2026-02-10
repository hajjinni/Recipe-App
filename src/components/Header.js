import { Link, useSearchParams } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useState, useEffect } from "react";

function Header() {
  const { count } = useFavorites();
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  /* Sync input with URL */
  useEffect(() => {
    setSearch(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = Object.fromEntries([...searchParams]);

    if (search.trim()) params.q = search.trim();
    else delete params.q;

    setSearchParams(params);
  };

  return (
    <header className="bg-gradient-to-r from-red-400 to-pink-500 sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">

        <Link to="/" replace className="flex items-center gap-2 text-white">
          <i className="fa-solid fa-utensils text-2xl"></i>
          <h1 className="text-2xl font-bold whitespace-nowrap">
            Recipe App
          </h1>
          <span className="text-sm font-semibold text-white/90 flex items-center gap-1 animate-pulse ml-2">
            <i className="fa-solid fa-user-chef text-yellow-300"></i>
            Discover Delicious Recipes
          </span>
        </Link>

        {/* Search */}
        <form
          onSubmit={handleSearch}
          className="relative flex-1 max-w-lg w-full"
        >
          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 rounded-full border"
          />
        </form>

        {/* Favorites */}
        <Link
          to="/favorites"
          className="relative flex flex-col items-center text-white"
        >
          <i className="fa-solid fa-heart text-2xl"></i>
          {count > 0 && (
            <span className="absolute -top-1 -right-2 bg-white text-red-500 text-xs px-1 rounded-full">
              {count}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
