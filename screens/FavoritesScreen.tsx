import RecipeList from "@/components/RecipeList";
import { FavoritesContext } from "@/contexts/FavoritesContext";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function FavoritesScreen({navigation}: any) {

    const {favorites, toggleFavorite}= useContext(FavoritesContext)
    if(favorites.length === 0){
        return(
            <View>
                <Text>No Favourites</Text>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Your Favorites</Text>
           <RecipeList recipes={favorites} navigation={navigation}/>
        </View>
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
  recipeImage: {
    width: 100,
    height: 100
  },
   searchButton: {
    backgroundColor: 'lightblue',
    padding: 5,
    borderRadius: 5,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
})