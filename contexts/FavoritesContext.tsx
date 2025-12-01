// console.log("[FavoritesContext] !!!! FavoritesProvider mounted");

import ProgressModal from "@/components/ProgressModal";
import type Recipe from "@/types/Recipe";
import React, { createContext, useState } from "react";

interface FavoritesContextType {
	favorites: Recipe[];
	toggleFavorite: (recipe: Recipe, value: boolean) => void;
	clearAll: () => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
	favorites: [],
	toggleFavorite: () => {},
	clearAll: () => {},
});

interface FavoritesProviderProps {
	children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
	const [favorites, setFavorites] = useState<Recipe[]>([]);
	const [showProgressModal, setShowProgressModal] = useState(false);
	const [modalCount, setModalCount] = useState(0);

	const toggleFavorite = (recipe: Recipe, value: boolean) => {
		if (!recipe || recipe.id == null) {
			// console.log("[FavoritesContext] EARLY RETURN - recipe invalid");
			return;
		}

		console.log("[FavoritesContext] Recipe valid, calling setFavorites...");

		setFavorites((prev) => {
			// console.log("[FavoritesContext] Inside setFavorites callback");
			// console.log("  - prev array:", prev);
			// console.log("  - prev.length:", prev.length);
			// console.log("  - value:", value);

			if (value) {
				// console.log("[FavoritesContext] ADD branch (value=true)");
				const isDuplicate = prev.some((r) => r?.id === recipe.id);
				// console.log("  - isDuplicate check:", isDuplicate);

				if (isDuplicate) {
					// console.log("[FavoritesContext] Recipe already exists, returning prev");
					return prev;
				}

				const newFavorites = [...prev, recipe];
				// console.log("[FavoritesContext] Creating new array with recipe");
				// console.log("  - newFavorites:", newFavorites);
				// console.log("  - newFavorites.length:", newFavorites.length);

				// Show modal when adding
				// console.log("[FavoritesContext] Setting modal state");
				setModalCount(newFavorites.length);
				setShowProgressModal(true);

				// console.log("[FavoritesContext] RETURNING newFavorites array");
				return newFavorites;
			} else {
				// console.log("[FavoritesContext] REMOVE branch (value=false)");
				const filtered = prev.filter((r) => r?.id !== recipe.id);
				// console.log("  - filtered:", filtered);
				// console.log("  - filtered.length:", filtered.length);
				return filtered;
			}
		});

		// console.log("[FavoritesContext] setFavorites called");
	};

	const clearAll = () => {
		setFavorites([]);
	};

	return (
		<FavoritesContext.Provider value={{ favorites, toggleFavorite, clearAll }}>
			{children}
			<ProgressModal
				visible={showProgressModal}
				currentCount={modalCount}
				onClose={() => setShowProgressModal(false)}
			/>
		</FavoritesContext.Provider>
	);
}
