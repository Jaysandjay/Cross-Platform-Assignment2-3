import type RecipeDetails from "@/types/RecipeiDetails";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import RenderHTML from "react-native-render-html";
const APIKEY = "68ca40677c7b4d3fa5fd36d44dd636a6";



export default function RecipeScreen({route, navigation}: any) {

  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${route.params.id}/information?apiKey=${APIKEY}`
        );
        const data = await res.json();

        const ingredients = data.extendedIngredients
          ? data.extendedIngredients.map((ing: any) => ing.original)
          : [];

        setRecipe({
          title: data.title,
          image: data.image,
          ingredients,
          instructions: data.instructions || "<p>No instructions found.</p>",
        });
      } catch (err) {
        console.log("Error fetching recipe:", err);
      }
    };

    fetchRecipe();
  }, [route.params]);

  if (!recipe) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Loading recipe...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>
        {recipe.title}
      </Text>

      {recipe.image && (
        <Image
          source={{ uri: recipe.image }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 10,
            marginBottom: 20,
          }}
        />
      )}

      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 5 }}>
        Ingredients
      </Text>
      {recipe.ingredients.map((item, index) => (
        <Text key={index}>• {item}</Text>
      ))}

      <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 5 }}>
        Instructions
      </Text>

      {recipe.instructions ? (
        <RenderHTML contentWidth={width} source={{ html: recipe.instructions }} />
      ) : (
        <Text>No instructions available.</Text>
      )}
    </ScrollView>
  );
}
