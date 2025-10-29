import { FavoritesContext } from "@/contexts/FavoritesContext";
import type Recipe from "@/types/Recipe";
import { useContext } from "react";
import { FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';


interface RecipeListProps {
  recipes?: Recipe[];
  navigation: any; 
}



export default function RecipeList({ recipes, navigation}: RecipeListProps){
    const {favorites, toggleFavorite} = useContext(FavoritesContext)
      const listToRender = recipes ?? favorites; // fallback to favorites if recipes not passed

    const isFavorite = (recipe: Recipe) => {
        return favorites.some(fav => fav.id === recipe.id);
    };

    if (!listToRender.length) {
        return (
        <View>
            <Text>No recipes to show</Text>
        </View>
        );
  }

    return(
        <FlatList
                data={listToRender}
                keyExtractor={(recipe) => recipe.id.toString()}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item.title}</Text>
                    <Switch
                      value={isFavorite(item)}
                      onValueChange={(value) => toggleFavorite(item, value)}
                    />
                    <Image
                      source={{uri: item.image}}
                      style={styles.recipeImage}
                    />
        
                    <TouchableOpacity
                      style={styles.searchButton}
                      onPress={() => navigation.navigate('Recipe', {id: item.id})}
                    >
                      <Text>See Recipe</Text>
                    </TouchableOpacity>
                  </View>
                )}
              />
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    gap: 10
  },
  title:{
    fontSize: 20,
    fontWeight: '400'
  },
  searchBar: {
    height: 40,
    borderColor: 'lightblue',
    borderWidth: 3,
    borderRadius: 10,
    padding: 2,
    width: '100%'
  },
  searchButton: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  recipeImage: {
    width: 100,
    height: 100
  }
})
