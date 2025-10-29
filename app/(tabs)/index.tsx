import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';


//Create Recipe Type
interface Recipe {
  id: number,
  title: string,
  image: string,
  imageType: string
}


export default function HomeScreen() {
  // TEMP
  const APIKEY = '68ca40677c7b4d3fa5fd36d44dd636a6'
  const router = useRouter()

  const [searchText, setSearchText] = useState<string>("");
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([])
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])

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

  const toggleFavorite = (recipe: Recipe, value: boolean) => {
    if (value){
      setFavoriteRecipes([...favoriteRecipes, recipe])
    }else{
      setFavoriteRecipes(favoriteRecipes.filter((r) => r.id !== recipe.id))
    }
    console.log(favoriteRecipes)
  }

  const isFavorite = (recipe: Recipe) => {
    return favoriteRecipes.some((r) => r.id === recipe.id)
  }


  return (
   <View style={styles.container}>
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

      <FlatList
        data={searchedRecipes}
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
              onPress={() => router.push(`/recipe?recipeId=${item.id.toString()}`)}
            >
              <Text>See Recipe</Text>
            </TouchableOpacity>
          </View>
        )}
      />

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
  },
  recipeImage: {
    width: 100,
    height: 100
  }
})



