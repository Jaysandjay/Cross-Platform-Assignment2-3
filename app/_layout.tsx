import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Slot } from "expo-router";

export default function RootLayout() {
	return (
		<FavoritesProvider>
			<Slot />
		</FavoritesProvider>
	);
}
