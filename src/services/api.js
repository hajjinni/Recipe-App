import axios from "axios";

const API_BASE = "https://www.themealdb.com/api/json/v1/1";


let cachedCategories = null;
let cachedIngredients = null;
let cachedAreas = null;

const mealListCache = {}; 

const cacheFetch = async (key, fetcher) => {
  if (mealListCache[key]) return mealListCache[key];
  const data = await fetcher();
  mealListCache[key] = data;
  return data;
};

export const fetchCategories = async () => {
  if (cachedCategories) return cachedCategories;
  const res = await axios.get(`${API_BASE}/categories.php`);
  cachedCategories = res.data.categories || [];
  return cachedCategories;
};

export const fetchIngredients = async () => {
  if (cachedIngredients) return cachedIngredients;
  const res = await axios.get(`${API_BASE}/list.php?i=list`);
  cachedIngredients = res.data.meals || [];
  return cachedIngredients;
};

export const fetchMealAreas = async () => {
  if (cachedAreas) return cachedAreas;
  const res = await axios.get(`${API_BASE}/list.php?a=list`);
  cachedAreas = res.data.meals || [];
  return cachedAreas;
};


export const fetchMealsByLetter = async (letter = "a") => {
  const res = await axios.get(`${API_BASE}/search.php?f=${letter}`);
  return res.data.meals || [];
};

export const searchMeals = async (query) => {
  const res = await axios.get(`${API_BASE}/search.php?s=${query}`);
  return res.data.meals || [];
};

export const fetchMealsByCategory = async (category) => {
  return cacheFetch(`cat:${category}`, async () => {
    const res = await axios.get(`${API_BASE}/filter.php?c=${category}`);
    return res.data.meals || [];
  });
};

export const fetchMealsByIngredient = async (ingredient) => {
  return cacheFetch(`ing:${ingredient}`, async () => {
    const res = await axios.get(`${API_BASE}/filter.php?i=${ingredient}`);
    return res.data.meals || [];
  });
};

export const fetchMealsByArea = async (area) => {
  return cacheFetch(`area:${area}`, async () => {
    const res = await axios.get(`${API_BASE}/filter.php?a=${area}`);
    return res.data.meals || [];
  });
};

export const fetchMealById = async (id) => {
  const res = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
  return res.data.meals?.[0];
};


export const fetchMealsByFilters = async ({
  category,
  ingredient,
  area,
  offset = 0,
  limit = 12
}) => {
  const requests = [];

  if (category) requests.push(fetchMealsByCategory(category));
  if (ingredient) requests.push(fetchMealsByIngredient(ingredient));
  if (area) requests.push(fetchMealsByArea(area));

  
  if (requests.length === 0) {
    return {
      meals: await fetchMealsByLetter(),
      total: 0
    };
  }

  // Fetch partial lists
  const results = await Promise.all(requests);

  // Intersect IDs
  const idSets = results.map(list =>
    new Set(list.map(m => m.idMeal))
  );

  const commonIds = [...idSets.reduce((a, b) =>
    new Set([...a].filter(id => b.has(id)))
  )];

  // Batch slice
  const batchIds = commonIds.slice(offset, offset + limit);

  // Fetch full details ONLY for batch
  const meals = await Promise.all(
    batchIds.map(id => fetchMealById(id))
  );

  return {
    meals: meals.filter(Boolean),
    total: commonIds.length
  };
};
