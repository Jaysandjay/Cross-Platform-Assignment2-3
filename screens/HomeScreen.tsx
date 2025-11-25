import RecipeList from '@/components/RecipeList';
import type Recipe from '@/types/Recipe';
import { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const APIKEY = '630133bfb92c43928ed509e01e16330d';

export default function HomeScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState<string>('');
  const [searchedRecipes, setSearchedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(
    'Start by typing a recipe name and pressing Search.',
  );
  const [searchPerformed, setSearchPerformed] = useState(false);

 
  const buttonScale = useRef(new Animated.Value(1)).current;
  const cardFade = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  const startProgress = () => {
    progress.setValue(0);
    Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: false,
      }),
    ).start();
  };

  const stopProgress = () => {
    progress.stopAnimation();
    progress.setValue(0);
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      setStatus('Please type a recipe name before searching.');
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setStatus(`Searching for “${searchText.trim()}”...`);
    setSearchPerformed(true);
    startProgress();

 
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.spring(buttonScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(
          searchText,
        )}&number=10&apiKey=${APIKEY}`,
      );
      const data = await res.json();
      const results: Recipe[] = data.results ?? [];
      setSearchedRecipes(results);

      if (!results.length) {
        setStatus(
          `No recipes found for “${searchText.trim()}”. Try another keyword (e.g. pasta, salad, chicken).`,
        );
      } else {
        setStatus(null);
      }

      Animated.timing(cardFade, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.error(error);
      setStatus('Something went wrong while loading recipes. Please try again.');
    } finally {
      setLoading(false);
      stopProgress();
    }
  };

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.screen}>
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={() => navigation.navigate('Favorites')}
        >
          <Text style={styles.favoritesButtonText}>View Favorites</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.appTitle}>Recipe Finder</Text>

      <View style={styles.searchCard}>
        <Text style={styles.subtitle}>
          Search millions of recipes✨
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder="Type a recipe (e.g. pasta, salad, tacos)"
          placeholderTextColor="#6B7280"
          value={searchText}
          onChangeText={setSearchText}
        />

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity>
        </Animated.View>

        {loading && (
          <View style={styles.progressContainer}>
            <Animated.View
              style={[styles.progressBar, { width: progressWidth }]}
            />
          </View>
        )}
      </View>

   
      {status && !loading && (
        <Text style={styles.statusText}>{status}</Text>
      )}

      {loading && (
        <View style={styles.loaderRow}>
          <ActivityIndicator size="large" color="#00FFF6" />
          <Text style={styles.loaderText}>Cooking up results…</Text>
        </View>
      )}

      <Animated.View
        style={[
          styles.resultsContainer,
          {
            opacity: searchPerformed ? cardFade : 1,
          },
        ]}
      >
        <RecipeList recipes={searchedRecipes} navigation={navigation} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050816', 
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#00FFF6',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 18,
  },
  searchCard: {
    backgroundColor: '#0B1120',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#22D3EE',
    shadowColor: '#00FFF6',
    shadowOpacity: 0.45,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    elevation: 10,
  },
  subtitle: {
    color: '#A5B4FC',
    fontSize: 14,
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#020617',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#22D3EE',
    color: '#E5E7EB',
    fontSize: 16,
    marginBottom: 12,
  },
  searchButton: {
    backgroundColor: '#FF00FF',
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF00FF',
    shadowOpacity: 0.7,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  searchButtonText: {
    color: '#050816',
    fontWeight: '700',
    fontSize: 16,
  },
  progressContainer: {
    height: 6,
    borderRadius: 999,
    backgroundColor: '#111827',
    overflow: 'hidden',
    marginTop: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#00FFF6',
  },
  loaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    columnGap: 10,
  },
  loaderText: {
    color: '#E5E7EB',
  },
  statusText: {
    marginTop: 16,
    color: '#E5E7EB',
    textAlign: 'center',
  },
  resultsContainer: {
    flex: 1,
    marginTop: 24,
  },

    topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  favoritesButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#22D3EE',
    backgroundColor: '#0B1120',
  },
  favoritesButtonText: {
    color: '#00FFF6',
    fontWeight: '600',
    fontSize: 13,
  },

});
