import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MovieListCard } from "../../components/MovieListCard";
import { useFavorites } from "../../contexts/FavoritesContext";
import styles from "./styles";

export function MyList() {
  const { favorites, loading } = useFavorites();
  const navigation = useNavigation();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0296e5" />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum filme favoritado ainda</Text>
        <Text style={styles.emptySubtext}>
          Adicione filmes aos favoritos clicando no ícone de bookmark
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Minha Lista</Text>
      <FlatList
        data={favorites}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <MovieListCard
            data={item}
            onPress={() => navigation.navigate("Details", { movieId: item.id })}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
