import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "@/features/favorites/favoritesSlice";

// LocalStorage'dan favorileri yükler - Loads favorites from localStorage
const loadFavorites = (): string[] => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Favorileri localStorage'a kaydeder - Persists favorites to localStorage
const saveFavorites = (favorites: string[]) => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

// Redux store oluşturulur - Create Redux store
export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: loadFavorites(),
  },
});

// Store değişikliğinde favorileri localStorage'a senkronize eder. - Syncs favorites to localStorage on state change
store.subscribe(() => {
  saveFavorites(store.getState().favorites);
});

// Global state ve dispatch tipleri - Global state and dispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
