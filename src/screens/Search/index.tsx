import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { CardMovies } from "../../components/CardMovies";
import { GenreSection } from "../../components/GenreSection";
import { useState } from "react";
import { api } from "../../services/api";
import styles from "./styles";

interface MovieHome {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const GENRES = [
  { id: 28, name: "Ação" },
  { id: 35, name: "Comédia" },
  { id: 878, name: "Ficção Científica" },
  { id: 18, name: "Drama" },
  { id: 27, name: "Terror" },
  { id: 53, name: "Suspense" },
  { id: 16, name: "Animação" },
  { id: 10749, name: "Romance" },
];

export function Search() {
  const [searchResultMovies, setSearchResultMovies] = useState<MovieHome[]>([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const searchMovies = async (query: string) => {
    setLoading(true);
    const response = await api.get("/search/movie", {
      params: {
        query,
        language: "pt-BR",
      },
    });
    setSearchResultMovies(response.data.results);
    setLoading(false);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searchMovies(text);
    } else {
      setSearchResultMovies([]);
    }
  };

  const renderMovieItem = ({ item }: { item: MovieHome }) => (
    <CardMovies
      data={item}
      onPress={() => navigation.navigate("Details", { movieId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchBoxText}
          placeholder="Buscar"
          placeholderTextColor="#999"
          value={search}
          onChangeText={handleSearch}
        />
        <MagnifyingGlassIcon size={24} weight="light" color="#fff" />
      </View>

      {search.length > 2 ? (
        <View style={styles.containerMovies}>
          <Text style={styles.availableMoviesText}>Resultados da busca</Text>
          <FlatList
            data={searchResultMovies}
            numColumns={3}
            renderItem={renderMovieItem}
            keyExtractor={(item) => String(item.id)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
          />
          {loading && <ActivityIndicator size={50} color="#0296e5" />}
        </View>
      ) : (
        <ScrollView
          style={styles.genresContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {GENRES.map((genre) => (
            <GenreSection
              key={genre.id}
              genreName={genre.name}
              genreId={genre.id}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
