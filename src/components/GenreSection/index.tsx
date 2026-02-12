import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { CardMovies } from "../CardMovies";
import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";
import styles from "./styles";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

interface GenreSectionProps {
  genreName: string;
  genreId: number;
}

export function GenreSection({ genreName, genreId }: GenreSectionProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const hasFetched = useRef(false);
  const navigation = useNavigation();

  useEffect(() => {
    // Só busca uma vez quando o componente monta
    if (!hasFetched.current) {
      fetchMoviesByGenre();
      hasFetched.current = true;
    }
  }, []);

  const fetchMoviesByGenre = async () => {
    setLoading(true);
    try {
      const response = await api.get("/discover/movie", {
        params: {
          with_genres: genreId,
          sort_by: "vote_average.desc",
          "vote_count.gte": 1000,
          "vote_average.gte": 7,
          language: "pt-BR",
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error(`Error fetching ${genreName} movies:`, error);
    }
    setLoading(false);
  };

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <CardMovies
      data={item}
      onPress={() => navigation.navigate("Details", { movieId: item.id })}
    />
  );

  return (
    <View style={styles.genreContainer}>
      <Text style={styles.genreTitle}>{genreName}</Text>
      {loading ? (
        <ActivityIndicator size={40} color="#0296e5" />
      ) : (
        <FlatList
          data={movies}
          horizontal
          keyExtractor={(item) => String(item.id)}
          renderItem={renderMovieItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.moviesList}
        />
      )}
    </View>
  );
}
