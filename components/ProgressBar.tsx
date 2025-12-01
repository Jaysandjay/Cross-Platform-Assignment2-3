import { FavoritesContext } from "@/contexts/FavoritesContext";
import { useContext, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

interface ProgressBarProps {
	goalCount?: number;
}

export default function ProgressBar({ goalCount = 5 }: ProgressBarProps) {
	// GET THE FAVORITES FROM CONTEXT FOR COUNT
	const { favorites } = useContext(FavoritesContext);
	const count = favorites.length;

	// CALCS FOR BAR
	const currentProgress = count % goalCount;
	const targetPercentage = (currentProgress / goalCount) * 100;

	// SHOW LITERAL VALUE, BUT ADJ FOR PERC TOWARDS NEXT 5
	const labelProgress = count;
	const labelGoal = Math.ceil(count / goalCount) * goalCount;

	// ANIMATED VALUE FOR SMOOTH WIDTH TRANSITION
	const animatedWidth = useRef(new Animated.Value(targetPercentage)).current;

	// ANIMATE TO NEW PERCENTAGE WHEN FAVORITES COUNT CHANGES
	useEffect(() => {
		Animated.spring(animatedWidth, {
			toValue: targetPercentage,
			friction: 8,
			tension: 40,
			useNativeDriver: false, // WIDTH CANNOT USE NATIVE DRIVER
		}).start();
	}, [targetPercentage]);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>
				{labelProgress}/{labelGoal} favorites
			</Text>
			<View style={styles.barBackground}>
				<Animated.View
					style={[
						styles.barFill,
						{
							width: animatedWidth.interpolate({
								inputRange: [0, 100],
								outputRange: ["0%", "100%"],
							}),
						},
					]}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: "#0B1120",
		borderBottomWidth: 1,
		borderBottomColor: "#22D3EE",
	},
	label: {
		fontSize: 12,
		color: "#A5B4FC",
		marginTop: 40,
		marginBottom: 4,
		textAlign: "center",
	},
	barBackground: {
		height: 6,
		backgroundColor: "#111827",
		borderRadius: 999,
		overflow: "hidden",
	},
	barFill: {
		height: "100%",
		backgroundColor: "#00FFF6",
		borderRadius: 999,
	},
});
