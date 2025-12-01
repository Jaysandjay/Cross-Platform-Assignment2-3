import { FavoritesContext } from "@/contexts/FavoritesContext";
import type Recipe from "@/types/Recipe";
import { useContext } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Test recipe objects
const testRecipe1: Recipe = {
	id: 999991,
	title: "Test Recipe #1 (Debug)",
	image: "https://via.placeholder.com/312x231.png?text=Test+Recipe+1",
	imageType: "jpg",
};

const testRecipe2: Recipe = {
	id: 999992,
	title: "Test Recipe #2 (Debug)",
	image: "https://via.placeholder.com/312x231.png?text=Test+Recipe+2",
	imageType: "jpg",
};

export default function HowToUseScreen() {
	const { favorites, toggleFavorite, clearAll } = useContext(FavoritesContext);

	const logSeparator = () => {
		console.log("==========================================");
	};

	const handleAddTest1 = () => {
		logSeparator();
		console.log("ADD TEST 1 - Button Clicked");
		console.log("Current favorites count:", favorites.length);
		console.log("Current favorites:", JSON.stringify(favorites, null, 2));
		console.log("Calling toggleFavorite(testRecipe1, true)...");
		console.log("Test Recipe 1:", testRecipe1);

		toggleFavorite(testRecipe1, true);

		console.log("toggleFavorite() called");
		console.log("ADD TEST 1 - Complete");
		logSeparator();
	};

	const handleRemoveTest1 = () => {
		logSeparator();
		console.log("REMOVE TEST 1 - Button Clicked");
		console.log("Current favorites count:", favorites.length);
		console.log("Current favorites:", JSON.stringify(favorites, null, 2));
		console.log("Calling toggleFavorite(testRecipe1, false)...");

		toggleFavorite(testRecipe1, false);

		console.log("toggleFavorite() called");
		console.log("REMOVE TEST 1 - Complete");
		logSeparator();
	};

	const handleToggleTest1 = () => {
		const isCurrentlyFavorite = favorites.some((fav) => fav?.id === testRecipe1.id);

		logSeparator();
		console.log("TOGGLE TEST 1 - Button Clicked");
		console.log("Current favorites count:", favorites.length);
		console.log("Is Test Recipe 1 currently favorited?", isCurrentlyFavorite);
		console.log("Will toggle to:", !isCurrentlyFavorite);
		console.log("Calling toggleFavorite(testRecipe1, " + !isCurrentlyFavorite + ")...");

		toggleFavorite(testRecipe1, !isCurrentlyFavorite);

		console.log("toggleFavorite() called");
		console.log("TOGGLE TEST 1 - Complete");
		logSeparator();
	};

	const handleAddTest2 = () => {
		logSeparator();
		console.log("ADD TEST 2 - Button Clicked");
		console.log("Current favorites count:", favorites.length);
		console.log("Calling toggleFavorite(testRecipe2, true)...");
		console.log("Test Recipe 2:", testRecipe2);

		toggleFavorite(testRecipe2, true);

		console.log("ADD TEST 2 - Complete");
		logSeparator();
	};

	const handleShowFavorites = () => {
		logSeparator();
		console.log("SHOW FAVORITES - Button Clicked");
		console.log("Total favorites count:", favorites.length);
		console.log("Favorites array:");
		favorites.forEach((fav, index) => {
			console.log(`  [${index}]:`, {
				id: fav?.id,
				title: fav?.title,
			});
		});
		console.log("Full favorites object:", JSON.stringify(favorites, null, 2));
		logSeparator();
	};

	const handleClearAll = () => {
		logSeparator();
		console.log("CLEAR ALL - Button Clicked");
		console.log("Favorites before clear:", favorites.length);
		console.log("Calling clearAll()...");

		clearAll();

		console.log("clearAll() called");
		console.log("CLEAR ALL - Complete");
		logSeparator();
	};

	const handleTestContext = () => {
		logSeparator();
		console.log("TEST CONTEXT - Button Clicked");
		console.log("FavoritesContext exists?", !!FavoritesContext);
		console.log("favorites is defined?", favorites !== undefined);
		console.log("favorites is array?", Array.isArray(favorites));
		console.log("toggleFavorite is function?", typeof toggleFavorite === "function");
		console.log("clearAll is function?", typeof clearAll === "function");
		console.log("Current state:");
		console.log("  - favorites.length:", favorites.length);
		console.log("  - favorites:", favorites);
		logSeparator();
	};

	return (
		<ScrollView
			style={styles.screen}
			contentContainerStyle={styles.content}
		>
			<Text style={styles.appTitle}>Debug & Test</Text>
			<Text style={styles.subtitle}>Check Console for Verbose Logging</Text>

			<View style={styles.infoBox}>
				<Text style={styles.infoText}>Current Favorites: {favorites.length}</Text>
				<Text style={styles.infoTextSmall}>(Check browser console for detailed logs)</Text>
			</View>

			{/* Context Test */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Context Test</Text>
				<TouchableOpacity
					style={styles.testButton}
					onPress={handleTestContext}
				>
					<Text style={styles.buttonText}>Test Context Health</Text>
				</TouchableOpacity>
			</View>

			{/* Add Tests */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Add Tests</Text>
				<TouchableOpacity
					style={[styles.testButton, styles.addButton]}
					onPress={handleAddTest1}
				>
					<Text style={styles.buttonText}>Add Test Recipe #1</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.testButton, styles.addButton]}
					onPress={handleAddTest2}
				>
					<Text style={styles.buttonText}>Add Test Recipe #2</Text>
				</TouchableOpacity>
			</View>

			{/* Remove Tests */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Remove Test</Text>
				<TouchableOpacity
					style={[styles.testButton, styles.removeButton]}
					onPress={handleRemoveTest1}
				>
					<Text style={styles.buttonText}>Remove Test Recipe #1</Text>
				</TouchableOpacity>
			</View>

			{/* Toggle Test */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Toggle Test</Text>
				<TouchableOpacity
					style={[styles.testButton, styles.toggleButton]}
					onPress={handleToggleTest1}
				>
					<Text style={styles.buttonText}>Toggle Test Recipe #1</Text>
				</TouchableOpacity>
			</View>

			{/* Show State */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Show State</Text>
				<TouchableOpacity
					style={styles.testButton}
					onPress={handleShowFavorites}
				>
					<Text style={styles.buttonText}>Log All Favorites</Text>
				</TouchableOpacity>
			</View>

			{/* Clear All */}
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Clear All</Text>
				<TouchableOpacity
					style={[styles.testButton, styles.clearButton]}
					onPress={handleClearAll}
				>
					<Text style={styles.buttonText}>Clear All Favorites</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>Open browser DevTools Console (F12) to see detailed logs</Text>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#050816",
	},
	content: {
		padding: 20,
		paddingBottom: 40,
	},
	appTitle: {
		fontSize: 32,
		fontWeight: "800",
		color: "#00FFF6",
		textAlign: "center",
		marginBottom: 8,
		textShadowColor: "#FF00FF",
		textShadowOffset: { width: 0, height: 0 },
		textShadowRadius: 18,
	},
	subtitle: {
		fontSize: 16,
		color: "#A5B4FC",
		textAlign: "center",
		marginBottom: 20,
	},
	infoBox: {
		backgroundColor: "#1a1f35",
		borderRadius: 12,
		padding: 16,
		marginBottom: 20,
		borderWidth: 2,
		borderColor: "#FF00FF",
		alignItems: "center",
	},
	infoText: {
		fontSize: 20,
		fontWeight: "700",
		color: "#00FFF6",
		marginBottom: 4,
	},
	infoTextSmall: {
		fontSize: 12,
		color: "#A5B4FC",
	},
	section: {
		backgroundColor: "#0B1120",
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#22D3EE",
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		color: "#00FFF6",
		marginBottom: 12,
	},
	testButton: {
		backgroundColor: "#22D3EE",
		paddingVertical: 14,
		paddingHorizontal: 20,
		borderRadius: 12,
		marginBottom: 8,
		alignItems: "center",
	},
	addButton: {
		backgroundColor: "#10B981",
	},
	removeButton: {
		backgroundColor: "#EF4444",
	},
	toggleButton: {
		backgroundColor: "#F59E0B",
	},
	clearButton: {
		backgroundColor: "#DC2626",
	},
	buttonText: {
		color: "#050816",
		fontWeight: "700",
		fontSize: 15,
	},
	footer: {
		marginTop: 20,
		paddingVertical: 20,
		alignItems: "center",
	},
	footerText: {
		fontSize: 14,
		color: "#A5B4FC",
		textAlign: "center",
		fontWeight: "600",
	},
});
