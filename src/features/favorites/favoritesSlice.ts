// Favoriler için Redux slice - Redux slice for favorites feature
import { createSlice } from "@reduxjs/toolkit";

const FAVORITES_KEY = "favorites";
const PRODUCTS_KEY = "products";

// LocalStorage'daki favorileri temizleyerek yükler - Loads and cleans favorites based on existing products
const loadInitialFavorites = (): string[] => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]") as string[];
  const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || "[]") as { id: string }[];
  const validProductIds = products.map((p) => p.id);
  const cleanedFavorites = favorites.filter((id) => validProductIds.includes(id));
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(cleanedFavorites));
  return cleanedFavorites;
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadInitialFavorites(),
  reducers: {
    // Favori ekler veya çıkarır - Toggles product favorite state
    toggleFavorite(state, action) {
      const id = action.payload;
      const newState = state.includes(id) ? state.filter((i) => i !== id) : [...state, id];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(newState));
      return newState;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
