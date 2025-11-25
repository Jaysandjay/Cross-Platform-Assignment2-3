import type RecipeDetails from '@/types/RecipeiDetails';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import RenderHTML from 'react-native-render-html';

const APIKEY = '630133bfb92c43928ed509e01e16330d';

export default function RecipeScreen({ route }: any) {
  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowDimensions();


  const recipeId = route?.params?.id;

  useEffect(() => {
   
    if (!recipeId) {
      setError('Recipe id is missing. Please go back and choose a recipe again.');
      setLoading(false);
      return;
    }

    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${APIKEY}`,
        );
        const data = await res.json();

        const ingredients = Array.isArray(data.extendedIngredients)
          ? data.extendedIngredients.map((ing: any) => ing.original)
          : [];

        setRecipe({
          title: data.title ?? 'Untitled recipe',
          image: data.image,
          ingredients,
          instructions: data.instructions ?? '',
        });
      } catch (err) {
        console.log('Error fetching recipe:', err);
        setError('Could not load recipe details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00FFF6" />
        <Text style={styles.loadingText}>Loading your recipe…</Text>
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error ?? 'Recipe not found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{recipe.title}</Text>

      {recipe.image && (
        <Image source={{ uri: recipe.image }} style={styles.image} />
      )}

      <Text style={styles.sectionTitle}>Ingredients</Text>
      {recipe.ingredients.map((item, index) => (
        <Text key={index} style={styles.bodyText}>
          • {item}
        </Text>
      ))}

      <Text style={styles.sectionTitle}>Instructions</Text>
      {recipe.instructions ? (
        <RenderHTML
          contentWidth={width}
          source={{ html: `<div>${recipe.instructions}</div>` }}
          baseStyle={styles.bodyText}
        />
      ) : (
        <Text style={styles.bodyText}>No instructions available.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050816',
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  centered: {
    flex: 1,
    backgroundColor: '#050816',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: '#E5E7EB',
  },
  errorText: {
    color: '#F97373',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#00FFF6',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 18,
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FF00FF',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 6,
  },
  bodyText: {
    color: '#E5E7EB',
    marginBottom: 4,
    lineHeight: 20,
  },
});
