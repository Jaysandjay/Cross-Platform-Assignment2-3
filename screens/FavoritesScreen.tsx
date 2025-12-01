import ConfirmModal from '@/components/ConfirmModal';
import RecipeList from '@/components/RecipeList';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import { usePulseAnimation } from '@/hooks/use-pulse-animation';
import { useContext, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function FavoritesScreen({ navigation }: any) {
  const { favorites, clearAll } = useContext(FavoritesContext);
  const [showClearModal, setShowClearModal] = useState(false);

  const clearPulse = usePulseAnimation({
    enabled: favorites.length > 0,
    minScale: 0.98,
    maxScale: 1.02,
    duration: 2500,
  });

  const handleClearAll = () => {
    clearAll();
    setShowClearModal(false);
  };

  if (!favorites.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No favourites yet</Text>
        <Text style={styles.emptyText}>
          Search for recipes and tap the toggle to add to favorites!✨
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Favourites</Text>

        <Animated.View style={{ transform: [{ scale: clearPulse }] }}>
          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => setShowClearModal(true)}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      <RecipeList navigation={navigation} />

      <ConfirmModal
        visible={showClearModal}
        title="Clear All Favorites?"
        message="This will remove all your saved recipes. This action cannot be undone."
        confirmText="Clear All"
        cancelText="Cancel"
        onConfirm={handleClearAll}
        onCancel={() => setShowClearModal(false)}
      />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#00FFF6',
    fontSize: 22,
    fontWeight: '700',
  },
  clearButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#FF00FF',
  },
  clearButtonText: {
    color: '#050816',
    fontWeight: '700',
    fontSize: 13,
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
