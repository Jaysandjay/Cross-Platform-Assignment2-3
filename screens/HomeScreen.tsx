import RecipeList from '@/components/RecipeList';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import type Recipe from '@/types/Recipe';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';



export default function HomeScreen({navigation}: any) {
  // TEMP
  const APIKEY = '68ca40677c7b4d3fa5fd36d44dd636a6'


  const [searchText, setSearchText] = useState<string>("");
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([])
  // const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])

  const { toggleFavorite } = useContext(FavoritesContext)

  function handleSearchText(text: string) {
    setSearchText(text)
  }

  async function handleSearch(){
    console.log('searching...')
    try {
      const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&apiKey=${APIKEY}`)
      if(!res.ok){
        throw new Error(`Error fetching Recipes ${res.status}`)
      }
      const recipes = await res.json()
      console.log(recipes)
      console.log(recipes.results)
      setSearchedRecipes(recipes.results)
    }
    catch (err) {
      console.log(err)
    }
  }



  return (
   <View style={styles.container}>
    <Button
        title="Go to Favorites"
        onPress={() => navigation.navigate('Favorites')}
      />
      <Text style={styles.title}>Recipe Finder</Text>
      <TextInput
        style={styles.searchBar}
        placeholder='Search...'
        value={searchText}
        onChangeText={handleSearchText}
      />
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
      >
        <Text>Search</Text>
      </TouchableOpacity>

      <RecipeList recipes={searchedRecipes} navigation={navigation}/>

   </View>
  );
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
  }
})



