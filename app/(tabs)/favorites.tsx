import ProgressBar from "@/components/ProgressBar";
import FavoritesScreen from "@/screens/FavoritesScreen";
import RecipeScreen from "@/screens/RecipeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";

const Stack = createNativeStackNavigator();

export default function FavoritesTab() {
	return (
		<View style={{ flex: 1 }}>
			<ProgressBar />
			<Stack.Navigator
				initialRouteName="FavoritesList"
				screenOptions={{ headerShown: false }}
			>
				<Stack.Screen
					name="FavoritesList"
					component={FavoritesScreen}
				/>
				<Stack.Screen
					name="Recipe"
					component={RecipeScreen}
				/>
			</Stack.Navigator>
		</View>
	);
}
