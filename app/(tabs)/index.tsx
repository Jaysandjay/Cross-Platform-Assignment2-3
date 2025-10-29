import { FavoritesProvider } from '@/contexts/FavoritesContext';
import FavoritesScreen from '@/screens/FavoritesScreen';
import HomeScreen from '@/screens/HomeScreen';
import RecipeScreen from '@/screens/RecipeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

 
// create stack navigator
const Stack = createNativeStackNavigator();
 
//style sheet



//App entry point
export default function App() {
  return (
<FavoritesProvider>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Recipe" component={RecipeScreen} />
    <Stack.Screen name="Favorites" component={FavoritesScreen} />
  </Stack.Navigator>
</FavoritesProvider>
  );
}
 