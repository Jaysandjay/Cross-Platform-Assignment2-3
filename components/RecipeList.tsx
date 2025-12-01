import { FavoritesContext } from "@/contexts/FavoritesContext";
import type Recipe from "@/types/Recipe";
import { useContext } from "react";
import { FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";

interface RecipeListProps {
	recipes?: Recipe[];
	navigation: any;
}

export default function RecipeList({ recipes, navigation }: RecipeListProps) {
	const { favorites, toggleFavorite } = useContext(FavoritesContext);

	const listToRender: Recipe[] = (recipes && recipes.length > 0 ? recipes : favorites) ?? [];

	const isFavorite = (recipe: Recipe) => favorites.some((fav) => fav && fav.id === recipe.id);

	if (!listToRender || listToRender.length === 0) {
		return (
			<View style={styles.emptyState}>
				<Text style={styles.emptyText}>No recipes to show yet. Try searching above ✨</Text>
			</View>
		);
	}

	return (
		<FlatList
			data={listToRender}
			keyExtractor={(recipe, index) => (recipe && recipe.id != null ? recipe.id.toString() : `recipe-${index}`)}
			contentContainerStyle={styles.listContent}
			renderItem={({ item }) => {
				if (!item || item.id == null) return null;

				return (
					<View style={styles.card}>
						{item.image ? (
							<Image
								source={{ uri: item.image }}
								style={styles.recipeImage}
							/>
						) : (
							<View style={[styles.recipeImage, styles.imagePlaceholder]}>
								<Text style={styles.placeholderText}>No image</Text>
							</View>
						)}

						<View style={styles.info}>
							<Text
								style={styles.title}
								numberOfLines={2}
							>
								{item.title}
							</Text>

							<View style={styles.row}>
								<Text style={styles.label}>Favourite</Text>
								<Switch
									value={isFavorite(item)}
									onValueChange={(value) => toggleFavorite(item, value)}
									thumbColor={isFavorite(item) ? "#22D3EE" : "#6B7280"}
									trackColor={{ false: "#111827", true: "#0F172A" }}
								/>
							</View>

							<TouchableOpacity
								style={styles.detailsButton}
								onPress={() => {
									if (!navigation || !navigation.navigate) return;
									navigation.navigate("Recipe", { id: item.id });
								}}
							>
								<Text style={styles.detailsButtonText}>View details</Text>
							</TouchableOpacity>
						</View>
					</View>
				);
			}}
		/>
	);
}

const styles = StyleSheet.create({
	listContent: {
		paddingBottom: 32,
	},
	emptyState: {
		marginTop: 32,
		alignItems: "center",
	},
	emptyText: {
		color: "#9CA3AF",
		textAlign: "center",
	},
	card: {
		flexDirection: "row",
		backgroundColor: "#020617",
		borderRadius: 20,
		padding: 12,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#22D3EE",
		shadowColor: "#00FFF6",
		shadowOpacity: 0.4,
		shadowOffset: { width: 0, height: 0 },
		shadowRadius: 16,
		elevation: 8,
	},
	recipeImage: {
		width: 90,
		height: 90,
		borderRadius: 16,
		marginRight: 12,
	},
	imagePlaceholder: {
		backgroundColor: "#111827",
		alignItems: "center",
		justifyContent: "center",
	},
	placeholderText: {
		color: "#9CA3AF",
		fontSize: 10,
	},
	info: {
		flex: 1,
		justifyContent: "space-between",
	},
	title: {
		color: "#E5E7EB",
		fontWeight: "700",
		marginBottom: 6,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	label: {
		color: "#9CA3AF",
	},
	detailsButton: {
		marginTop: 8,
		alignSelf: "flex-start",
		paddingHorizontal: 14,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: "#00FFF6",
	},
	detailsButtonText: {
		color: "#050816",
		fontWeight: "600",
		fontSize: 13,
	},
});
