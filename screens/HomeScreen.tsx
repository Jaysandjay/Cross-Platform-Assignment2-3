import RecipeList from '@/components/RecipeList';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import type Recipe from '@/types/Recipe';
import React, { useContext, useRef, useState } from 'react';
import { Animated, Button, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';



export default function HomeScreen({navigation}: any) {
  // TEMP
  const APIKEY = '630133bfb92c43928ed509e01e16330d'


  const [searchText, setSearchText] = useState<string>("");
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([])
  // const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([])

  //Animation
  const rotateAnim = useRef( new Animated.Value(0)).current
  const colorAnim = useRef( new Animated.Value(0)).current
  const bgColor = colorAnim.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["coral", "orange", "purple", "blue"]
  })
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  })

  const { toggleFavorite } = useContext(FavoritesContext)

  function rotate() {
      Animated.parallel([
        Animated.timing(colorAnim, {
          toValue: 3,
          duration: 2000,
          useNativeDriver: false
        }),
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
          }),
            Animated.timing(rotateAnim, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true
            }),
        ])
    ]).start(() => {
      Animated.timing(colorAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start()
    })
    }

  function handleSearchText(text: string) {
    setSearchText(text)
  }

  async function handleSearch(){
    rotate()
    console.log('searching...')
  //   try {
  //     const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchText}&apiKey=${APIKEY}`)
  //     if(!res.ok){
  //       throw new Error(`Error fetching Recipes ${res.status}`)
  //     }
  //     const recipes = await res.json()
  //     console.log(recipes)
  //     console.log(recipes.results)
  //     setSearchedRecipes(recipes.results)
  //   }
  //   catch (err) {
  //     console.log(err)
  //   }
   }



  return (
   <Animated.View style={[styles.container, {backgroundColor: bgColor}]}>
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
      <Animated.View style={[{transform: [{rotate: rotation}]}]}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearch}
        >
        <Text>Search</Text>
        </TouchableOpacity>
      </Animated.View>

      <RecipeList recipes={searchedRecipes} navigation={navigation}/>

   </Animated.View>
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



