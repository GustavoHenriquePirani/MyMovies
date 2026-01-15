import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { MagnifyingGlassIcon } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { CardMovies, CardTopMovies } from "../../components/CardMovies";
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
  const [topTenMovies, setTopTenMovies] = useState<MovieHome[]>([]);
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResultMovies, setNoResultMovies] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTopMovies();
    loadMoreData();
  }, []);

  // Função para carregar os 10 mais populares e com melhores avaliações
  const fetchTopMovies = async () => {
    setLoading(true);
    const response = await api.get("/discover/movie", {
      params: {
        sort_by: "vote_average.desc",
        "vote_count.gte": 1000,
        "vote_average.gte": 8,
        language: "pt-BR",
      },
    });
    setTopTenMovies(response.data.results.slice(0, 10));
    setLoading(false);
  };

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

  const renderTopMovieItem = ({ item, index }: { item: MovieHome; index: number }) => (
  <CardTopMovies
    data={item}
    position={index + 1} // index começa em 0, então +1 para exibir de 1 a 10
    onPress={() => navigation.navigate("Details", { movieId: item.id })}
  />
);

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>O que você quer assistir hoje?</Text>

      <View style={styles.containerTopMovies}>
        <FlatList
          data={topTenMovies}
          horizontal
          keyExtractor={(item) => String(item.id)}
          renderItem={renderTopMovieItem}
          showsHorizontalScrollIndicator={false}
        />
        {loading && <ActivityIndicator size={50} color="#0296e5" />}
      </View>

      <Text style={styles.availableMoviesText}> Filmes disponíveis</Text>
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
