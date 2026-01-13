import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { CardMovies } from "../../components/CardMovies";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import styles from "./styles";

interface MovieHome {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export function Home() {
  const [discoveryMovies, setDiscoveryMovies] = useState<MovieHome[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<MovieHome[]>([]);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResultMovies, setNoResultMovies] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadMoreData();
  }, []);

  // Função para carregar mais dados quando o usuário rolar até o final da lista
  const loadMoreData = async () => {
    setLoading(true);
    const response = await api.get("/movie/popular", {
      params: {
        page,
      },
    });
    setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
    setPage(page + 1);
    setLoading(false);
  };

  const searchMovies = async (query: string) => {
    setLoading(true);
    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });
    if (response.data.results.length === 0) {
      setNoResultMovies(true);
    } else {
      setSearchResultMovies(response.data.results);
    }
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

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>O que você quer assistir hoje?</Text>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchBoxText}
          placeholder="Buscar"
          value={search}
          onChangeText={handleSearch}
        />
        <MagnifyingGlassIcon size={24} weight="light" color="#fff" />
      </View>

      <View style={styles.containerMovies}>
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={renderMovieItem}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.5}
        />
        {loading && <ActivityIndicator size={50} color="#0296e5" />}
      </View>
    </View>
  );
}
