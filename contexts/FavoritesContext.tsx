import type Recipe from '@/types/Recipe';
import React, { createContext, useState } from 'react';

interface FavoritesContextType {
  favorites: Recipe[];
  toggleFavorite: (recipe: Recipe, value: boolean) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
});

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const toggleFavorite = (recipe: Recipe, value: boolean) => {
    if (!recipe || recipe.id == null) return;

    setFavorites((prev) => {
      if (value) {
        if (prev.some((r) => r?.id === recipe.id)) return prev;
        return [...prev, recipe];
      } else {
        return prev.filter((r) => r?.id !== recipe.id);
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
