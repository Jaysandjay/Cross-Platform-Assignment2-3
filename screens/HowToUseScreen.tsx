import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function HowToUseScreen() {
	return (
		<ScrollView
			style={styles.screen}
			contentContainerStyle={styles.content}
		>
			<Text style={styles.appTitle}>How to Use this App</Text>
			<Text style={styles.subtitle}>Recipe Finder Guide</Text>

			<View style={styles.section}>
				<Text style={styles.stepTitle}>1. Search for Recipes</Text>
				<Text style={styles.stepText}>Type a food or ingredient in the search box (like "pasta", "chicken", or "chocolate") and tap the Search button to find delicious recipes.</Text>

				<Text style={styles.stepTitle}>2. Toggle Favorites</Text>
				<Text style={styles.stepText}>Found a recipe you love? Toggle the favorite switch on any recipe card to save it. You can also favorite from the recipe details page by tapping the heart button.</Text>

				<Text style={styles.stepTitle}>3. Track Your Progress</Text>
				<Text style={styles.stepText}>Watch the progress bar at the top! It shows your journey to 5 favorites. When you hit milestones (5, 10, 15...), you'll get a celebration! 🎉</Text>

				<Text style={styles.stepTitle}>4. View Recipe Details</Text>
				<Text style={styles.stepText}>Tap "View details" on any recipe to see the full list of ingredients and step-by-step instructions.</Text>

				<Text style={styles.stepTitle}>5. Manage Your Favorites</Text>
				<Text style={styles.stepText}>Go to the Favorites tab to see all your saved recipes. Need a fresh start? Use the "Clear All" button to remove all favorites at once.</Text>
			</View>

			<View style={styles.footer}>
				<Text style={styles.footerText}>Happy cooking! ✨</Text>
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
		marginBottom: 32,
	},
	section: {
		backgroundColor: "#0B1120",
		borderRadius: 20,
		padding: 20,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: "#22D3EE",
	},
	stepNumber: {
		fontSize: 32,
		marginBottom: 8,
	},
	stepTitle: {
		fontSize: 20,
		fontWeight: "700",
		color: "#00FFF6",
		marginBottom: 8,
	},
	stepText: {
		fontSize: 15,
		color: "#E5E7EB",
		lineHeight: 22,
	},
	footer: {
		marginTop: 20,
		paddingVertical: 20,
		alignItems: "center",
	},
	footerText: {
		fontSize: 18,
		color: "#FF00FF",
		fontWeight: "600",
	},
});
