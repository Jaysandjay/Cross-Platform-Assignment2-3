import RecipeList from '@/components/RecipeList';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FavoritesScreen({ navigation }: any) {
  const { favorites } = useContext(FavoritesContext);

  if (!favorites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No favourites yet</Text>
        <Text style={styles.emptyText}>
          Turn on the switches on recipes to save them here ✨
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Your Favourites</Text>
      <RecipeList navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050816',
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  title: {
    color: '#00FFF6',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#050816',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#E5E7EB',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
