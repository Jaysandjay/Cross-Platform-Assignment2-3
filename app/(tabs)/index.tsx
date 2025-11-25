import { FavoritesProvider } from '@/contexts/FavoritesContext';
import FavoritesScreen from '@/screens/FavoritesScreen';
import HomeScreen from '@/screens/HomeScreen';
import RecipeScreen from '@/screens/RecipeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function TabHome() {
  return (
    <FavoritesProvider>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
      </Stack.Navigator>
    </FavoritesProvider>
  );
}
