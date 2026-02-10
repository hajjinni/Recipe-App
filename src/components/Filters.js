function Filters({
  categories,
  ingredients,
  mealTypes, // areas/cuisines
  selectedCategory,
  selectedIngredient,
  selectedMeal,
  onFilterChange,
  disabledOptions = {}, // { categories: [], ingredients: [], areas: [] }
}) {
  // Remove duplicates just in case
  const uniqueCategories = Array.from(new Map(categories.map((c) => [c.strCategory, c])).values());
  const uniqueIngredients = Array.from(new Map(ingredients.map((i) => [i.strIngredient, i])).values());
  const uniqueAreas = Array.from(new Map(mealTypes.map((a) => [a.strArea, a])).values());

  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full">
      {/* Category */}
      <select
        className="flex-1 border px-3 py-2 rounded"
        value={selectedCategory}
        onChange={(e) => onFilterChange("cat", e.target.value)}
      >
        <option value="">All Categories</option>
        {uniqueCategories.map((cat) => (
          <option
            key={cat.strCategory}
            value={cat.strCategory}
            disabled={disabledOptions.categories?.includes(cat.strCategory)}
          >
            {cat.strCategory}
          </option>
        ))}
      </select>

      {/* Ingredients */}
      <select
        className="flex-1 border px-3 py-2 rounded"
        value={selectedIngredient}
        onChange={(e) => onFilterChange("ing", e.target.value)}
      >
        <option value="">All Ingredients</option>
        {uniqueIngredients.map((ing) => (
          <option
            key={ing.strIngredient}
            value={ing.strIngredient}
            disabled={disabledOptions.ingredients?.includes(ing.strIngredient)}
          >
            {ing.strIngredient}
          </option>
        ))}
      </select>

      {/* Meal Areas */}
      <select
        className="flex-1 border px-3 py-2 rounded"
        value={selectedMeal}
        onChange={(e) => onFilterChange("area", e.target.value)}
      >
        <option value="">All Areas</option>
        {uniqueAreas.map((area) => (
          <option
            key={area.strArea}
            value={area.strArea}
            disabled={disabledOptions.areas?.includes(area.strArea)}
          >
            {area.strArea}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
