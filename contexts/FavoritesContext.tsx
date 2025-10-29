import type Recipe from "@/types/Recipe";
import React, { createContext, ReactNode, useState } from "react";

interface FavoritesContextType {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe, value: boolean) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const toggleFavorite = (recipe: Recipe, value: boolean) => {
    setFavorites(prev =>
      value ? [...prev, recipe] : prev.filter(r => r.id !== recipe.id)
    );
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
