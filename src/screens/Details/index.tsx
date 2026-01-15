import { useNavigation, useRoute } from "@react-navigation/native";
import {
  BookmarkSimple,
  CalendarBlank,
  CaretLeftIcon,
  Clock,
  Star,
  TicketIcon,
} from "phosphor-react-native";
import {
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Animated,
} from "react-native";
import { useEffect, useState, useRef } from "react";
import { api, fetchOMDbMovie } from "../../services/api";
import styles from "./styles";
import { formatDate } from "../../functions/formatDate";
import {
  translateGenres,
  translatePremios,
  translateCountry,
} from "../../functions/translateText";

type MovieDetails = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  production_countries: Array<{ iso_3166_1: string; name: string }>;
};

type OMDbDetails = {
  Director?: string;
  Actors?: string;
  Writer?: string;
  Country?: string;
  Awards?: string;
  Plot?: string;
  Runtime?: string;
  imdbRating?: string;
  Genre?: string;
  Ratings?: Array<{ Source: string; Value: string }>;
};

type TMDbCredits = {
  cast: Array<{
    name: string;
    character: string;
    order: number;
  }>;
  crew: Array<{
    name: string;
    job: string;
    department: string;
  }>;
};

type RouterProps = {
  movieId: number;
};

export function Details() {
  const route = useRoute();
  const iconRottenTranslateX = useRef(new Animated.Value(-150)).current;
  const iconIMDbTranslateX = useRef(new Animated.Value(-150)).current;
  const iconMetaTranslateX = useRef(new Animated.Value(-150)).current;
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [omdbDetails, setOmdbDetails] = useState<OMDbDetails | null>(null);
  const [tmdbCredits, setTmdbCredits] = useState<TMDbCredits | null>(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = route.params as RouterProps;
  const navigation = useNavigation();

  // Mapeamento estático das bandeiras usando nomes traduzidos
  const flagImages: { [key: string]: any } = {
    Brasil: require("../../public/bandeiras/Brasil.png"),
    "Estados Unidos": require("../../public/bandeiras/Estados Unidos.png"),
    "Reino Unido": require("../../public/bandeiras/Reino Unido.png"),
    Índia: require("../../public/bandeiras/Índia.png"),
    Rússia: require("../../public/bandeiras/Rússia.png"),
    Japão: require("../../public/bandeiras/Japão.png"),
    China: require("../../public/bandeiras/China.png"),
    França: require("../../public/bandeiras/França.png"),
    Alemanha: require("../../public/bandeiras/Alemanha.png"),
    Itália: require("../../public/bandeiras/Itália.png"),
    "Coreia do Sul": require("../../public/bandeiras/Coreia do Sul.png"),
    Nigéria: require("../../public/bandeiras/Nigéria.png"),
    México: require("../../public/bandeiras/México.png"),
  };

  const fetchMovieDetails = async () => {
    try {
      setLoading(true);

      // Buscar dados do TheMovieDB
      const tmdbResponse = await api.get(`/movie/${movieId}`);
      setMovieDetails(tmdbResponse.data);

      // Buscar credits do TMDB (diretor, atores, etc)
      const creditsResponse = await api.get(`/movie/${movieId}/credits`);
      setTmdbCredits(creditsResponse.data);

      // Buscar dados do OMDb como complemento usando o título original
      const movieTitle = tmdbResponse.data.original_title;
      const tmdbId = tmdbResponse.data.id;
      const omdbResponse = await fetchOMDbMovie(movieTitle);

      if (omdbResponse.data.Response === "True") {
        setOmdbDetails(omdbResponse.data);
      }
    } catch (error) {
      console.error("Erro ao buscar detalhes do filme:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Reset animação quando mudar de filme
    iconRottenTranslateX.setValue(-50);
    iconIMDbTranslateX.setValue(-50);
    iconMetaTranslateX.setValue(-50);
    setMovieDetails(null);
    setOmdbDetails(null);
    setTmdbCredits(null);
    fetchMovieDetails();
  }, [movieId]);

  useEffect(() => {
    if (movieDetails && !loading) {
      Animated.timing(iconRottenTranslateX, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();

      Animated.timing(iconIMDbTranslateX, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();

      Animated.timing(iconMetaTranslateX, {
        toValue: 0,
        duration: 600,
        useNativeDriver: false,
      }).start();
    }
  }, [movieDetails, loading]);

  const onRefresh = async () => {
    await fetchMovieDetails();
  };

  // Handler para detectar pull-to-refresh manualmente (opcional)
  const [scrollStartY, setScrollStartY] = useState(0);

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY < -130 && !loading) {
      onRefresh();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
        >
          <CaretLeftIcon color="#fff" size={28} weight="light" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Detalhes do Filme</Text>

        <TouchableOpacity
          onPress={() => {}}
          hitSlop={{ top: 25, bottom: 25, left: 25, right: 25 }}
        >
          <BookmarkSimple color="#fff" size={28} weight="light" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0296e5" />
          <Text style={{ color: "#0296e5", marginTop: 10 }}>Carregando...</Text>
        </View>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View>
            <Image
              style={styles.detailsBackdropImage}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
              }}
            />
            <View style={styles.posterShadowWrapper}>
              <Image
                style={styles.detailsPosterImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
                }}
              />
            </View>

            <View style={{ marginTop: 170 }}>
              {movieDetails?.title &&
                (() => {
                  const [mainTitle, subTitle] =
                    movieDetails.title.split(/:(.+)/);
                  return (
                    <View
                      style={{ alignItems: "center", justifyContent: "center" }}
                    >
                      <Text
                        style={styles.tittleMovie}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        {mainTitle}
                        {subTitle && (
                          <Text
                            style={{
                              fontSize: 18,
                              color: "#fff",
                              fontWeight: "700",
                            }}
                          >{`:${subTitle}`}</Text>
                        )}
                      </Text>
                    </View>
                  );
                })()}

              <View style={styles.description}>
                {/* Data de lançamento */}
                <View style={styles.descriptionGroup}>
                  <CalendarBlank color="#92929D" size={20} weight="thin" />
                  <Text style={styles.descriptionText}>
                    {formatDate(movieDetails?.release_date)}
                  </Text>
                </View>

                <Text style={{ color: "#92929D" }}>{"|"}</Text>

                {/* Usar runtime do TMDB ou OMDb como fallback */}
                {(() => {
                  let runtime = undefined;
                  if (movieDetails?.runtime) {
                    runtime = `${movieDetails.runtime} min`;
                  } else if (
                    omdbDetails?.Runtime &&
                    omdbDetails.Runtime !== "N/A"
                  ) {
                    runtime = omdbDetails.Runtime;
                  }

                  return runtime ? (
                    <View style={styles.descriptionGroup}>
                      <Clock color="#92929D" size={20} weight="thin" />
                      <Text style={styles.descriptionText}>{runtime}</Text>
                    </View>
                  ) : null;
                })()}

                <Text style={{ color: "#92929D" }}>{"|"}</Text>

                {/* Usar nota do OMDb ou TMDB como fallback */}
                {(() => {
                  let rating = undefined;
                  if (
                    omdbDetails?.imdbRating &&
                    omdbDetails.imdbRating !== "N/A"
                  ) {
                    rating = omdbDetails.imdbRating;
                  } else if (
                    movieDetails?.vote_average !== undefined &&
                    movieDetails.vote_average !== null
                  ) {
                    rating = movieDetails.vote_average.toFixed(1);
                  }
                  const ratingNumber = Number(rating);
                  return rating ? (
                    <View style={styles.descriptionGroup}>
                      <Star
                        color={ratingNumber >= 7 ? "#FF8700" : "#92929D"}
                        weight="thin"
                        size={20}
                      />
                      <Text
                        style={
                          ratingNumber >= 7
                            ? styles.corNotaAlta
                            : styles.descriptionText
                        }
                      >
                        {rating}
                      </Text>
                    </View>
                  ) : null;
                })()}
              </View>

              {/* Gênero do filme - usar TMDB ou OMDb como fallback */}
              {(() => {
                let genres = undefined;
                if (movieDetails?.genres && movieDetails.genres.length > 0) {
                  genres = movieDetails.genres
                    .map((genre) => genre.name)
                    .join(", ");
                } else if (
                  omdbDetails?.Genre &&
                  omdbDetails.Genre.trim() !== "N/A" &&
                  omdbDetails.Genre.trim() !== ""
                ) {
                  genres = translateGenres(omdbDetails.Genre);
                }

                return genres ? (
                  <View style={styles.genresContainer}>
                    <View style={styles.descriptionGroup}>
                      <TicketIcon color="#92929D" size={20} weight="thin" />
                      <Text style={styles.descriptionText}>{genres}</Text>
                    </View>
                  </View>
                ) : null;
              })()}
            </View>

            {/* Sinopse do filme */}
            <Text style={styles.overviewText}>
              {movieDetails?.overview &&
              typeof movieDetails.overview === "string" &&
              movieDetails.overview.trim() !== "" &&
              movieDetails.overview !== "N/A"
                ? movieDetails.overview
                : omdbDetails &&
                  typeof omdbDetails.Plot === "string" &&
                  omdbDetails.Plot.trim() !== "" &&
                  omdbDetails.Plot !== "N/A"
                ? omdbDetails.Plot
                : "Sinopse não disponível."}
            </Text>

            {/* Informações sobre o filme */}
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
              {/* Avaliações - apenas quando OMDb tem dados */}
              {omdbDetails &&
                omdbDetails.Ratings &&
                omdbDetails.Ratings.length > 0 && (
                  <View style={{ marginBottom: 7 }}>
                    <Text style={styles.omdbText}>Avaliações:</Text>
                    {/* Rotten Tomatoes */}
                    {omdbDetails.Ratings.find(
                      (r) => r.Source === "Rotten Tomatoes"
                    ) && (
                      <View style={styles.lineNota}>
                        <Animated.View
                          style={{
                            transform: [{ translateX: iconRottenTranslateX }],
                          }}
                        >
                          <Image
                            source={require("../../public/rotten.png")}
                            style={styles.logoNota}
                          />
                        </Animated.View>
                        <Text style={styles.textoNota}>
                          Rotten Tomatoes:{" "}
                          {
                            omdbDetails.Ratings.find(
                              (r) => r.Source === "Rotten Tomatoes"
                            )?.Value
                          }
                        </Text>
                      </View>
                    )}

                    {/* IMDb */}
                    {omdbDetails.Ratings.find(
                      (r) => r.Source === "Internet Movie Database"
                    ) && (
                      <View style={styles.lineNota}>
                        <Animated.View
                          style={{
                            transform: [{ translateX: iconIMDbTranslateX }],
                          }}
                        >
                          <Image
                            source={require("../../public/imdb.png")}
                            style={styles.logoNota}
                          />
                        </Animated.View>
                        <Text style={styles.textoNota}>
                          IMDb:{" "}
                          {
                            omdbDetails.Ratings.find(
                              (r) => r.Source === "Internet Movie Database"
                            )?.Value
                          }
                        </Text>
                      </View>
                    )}

                    {/* Metacritic */}
                    {omdbDetails.Ratings.find(
                      (r) => r.Source === "Metacritic"
                    ) && (
                      <View style={styles.lineNota}>
                        <Animated.View
                          style={{
                            transform: [{ translateX: iconMetaTranslateX }],
                          }}
                        >
                          <Image
                            source={require("../../public/metacritic.png")}
                            style={styles.logoNota}
                          />
                        </Animated.View>
                        <Text style={styles.textoNota}>
                          Metacritic:{" "}
                          {
                            omdbDetails.Ratings.find(
                              (r) => r.Source === "Metacritic"
                            )?.Value
                          }
                        </Text>
                      </View>
                    )}
                  </View>
                )}

              {/* Diretor - usar TMDB ou OMDb como fallback */}
              {(() => {
                let director = undefined;
                if (tmdbCredits?.crew) {
                  const directors = tmdbCredits.crew.filter(
                    (person) => person.job === "Director"
                  );
                  if (directors.length > 0) {
                    director = directors
                      .slice(0, 3)
                      .map((d) => d.name)
                      .join(", ");
                  }
                }
                // Só usa OMDb se TMDB não tiver dados
                if (
                  !director &&
                  omdbDetails?.Director &&
                  omdbDetails.Director.trim() !== "N/A"
                ) {
                  director = omdbDetails.Director;
                }

                return director ? (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Diretor:</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {director}
                    </Text>
                  </View>
                ) : null;
              })()}

              {/* Atores - usar TMDB (máximo 7) com personagem ou OMDb como fallback */}
              {(() => {
                let actors = undefined;
                if (tmdbCredits?.cast && tmdbCredits.cast.length > 0) {
                  actors = tmdbCredits.cast
                    .slice(0, 7)
                    .map((actor) => {
                      if (!(actor.character.trim() === "")) {
                        // Remove ' (voice)' do personagem (isso no caso de animações)
                        const character = actor.character.replace(
                          /\s*\(voice\)/i,
                          ""
                        );
                        return `${actor.name} (${character})`;
                      } else {
                        // No caso de nao ter personagem, só mostra o nome
                        return `${actor.name}`;
                      }
                    })
                    .join(", ");
                } else if (
                  omdbDetails?.Actors &&
                  omdbDetails.Actors.trim() !== "N/A"
                ) {
                  actors = omdbDetails.Actors;
                }

                return actors ? (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Atores:</Text>
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        textAlign: "justify",
                      }}
                    >
                      {actors}
                    </Text>
                  </View>
                ) : null;
              })()}

              {/* Roteirista - usar TMDB ou OMDb como fallback */}
              {(() => {
                let writer = undefined;
                if (tmdbCredits?.crew) {
                  const writers = tmdbCredits.crew.filter(
                    (person) =>
                      person.job === "Writer" ||
                      person.job === "Screenplay" ||
                      person.job === "Story" ||
                      person.job === "Original Story"
                  );
                  if (writers.length > 0) {
                    writer = writers
                      .slice(0, 3)
                      .map((w) => w.name)
                      .join(", ");
                  }
                }
                // Só usa OMDb se TMDB não tiver dados
                if (
                  !writer &&
                  omdbDetails?.Writer &&
                  omdbDetails.Writer.trim() !== "N/A"
                ) {
                  writer = omdbDetails.Writer;
                }

                return writer ? (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Roteirista:</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {writer}
                    </Text>
                  </View>
                ) : null;
              })()}

              {/* Designer de Personagem (Character Designer) */}
              {(() => {
                if (!tmdbCredits?.crew) return null;
                const characterDesigners = tmdbCredits.crew.filter(
                  (person) => person.job === "Character Designer"
                );
                if (characterDesigners.length === 0) return null;

                const designers = characterDesigners
                  .slice(0, 3)
                  .map((d) => d.name)
                  .join(", ");
                return (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Designer de Personagem:</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {designers}
                    </Text>
                  </View>
                );
              })()}

              {/* Diretor de Animação */}
              {(() => {
                if (!tmdbCredits?.crew) return null;
                const animationDirectors = tmdbCredits.crew.filter(
                  (person) =>
                    person.job === "Supervising Animation Director" ||
                    person.job === "Animation Director"
                );
                if (animationDirectors.length === 0) return null;

                const directors = animationDirectors
                  .slice(0, 3)
                  .map((d) => d.name)
                  .join(", ");
                return (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Diretor de Animação:</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {directors}
                    </Text>
                  </View>
                );
              })()}

              {/* Diretor de Fotografia */}
              {(() => {
                if (!tmdbCredits?.crew) return null;
                const cinematographers = tmdbCredits.crew.filter(
                  (person) => person.job === "Director of Photography"
                );
                if (cinematographers.length === 0) return null;

                const photographers = cinematographers
                  .slice(0, 3)
                  .map((c) => c.name)
                  .join(", ");
                return (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Diretor de Fotografia:</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {photographers}
                    </Text>
                  </View>
                );
              })()}

              {/* Editor */}
              {(() => {
                if (!tmdbCredits?.crew) return null;
                const editors = tmdbCredits.crew.filter(
                  (person) => person.job === "Editor"
                );
                if (editors.length === 0) return null;

                const editorNames = editors
                  .slice(0, 3)
                  .map((e) => e.name)
                  .join(", ");
                return (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Editor:</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {editorNames}
                    </Text>
                  </View>
                );
              })()}

              {/* Produtor */}
              {(() => {
                if (!tmdbCredits?.crew) return null;
                const producers = tmdbCredits.crew.filter(
                  (person) => person.job === "Producer"
                );
                if (producers.length === 0) return null;

                const producerNames = producers
                  .slice(0, 3)
                  .map((p) => p.name)
                  .join(", ");
                return (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Produtor:</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {producerNames}
                    </Text>
                  </View>
                );
              })()}

              {/* Compositor Musical */}
              {(() => {
                if (!tmdbCredits?.crew) return null;
                const composers = tmdbCredits.crew.filter(
                  (person) =>
                    person.job === "Original Music Composer" ||
                    person.job === "Music" ||
                    person.job === "Composer"
                );
                if (composers.length === 0) return null;

                const composerNames = composers
                  .slice(0, 3)
                  .map((c) => c.name)
                  .join(", ");
                return (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>Compositor Musical:</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {composerNames}
                    </Text>
                  </View>
                );
              })()}

              {/* País de Produção - priorizar TMDB, OMDb como fallback */}
              {(() => {
                let countries = undefined;
                if (
                  movieDetails?.production_countries &&
                  movieDetails.production_countries.length > 0
                ) {
                  countries = movieDetails.production_countries
                    .slice(0, 5)
                    .map((country) => country.name)
                    .join(", ");
                }
                // Só usa OMDb se TMDB não tiver dados
                if (
                  !countries &&
                  omdbDetails?.Country &&
                  omdbDetails.Country.trim() !== "N/A"
                ) {
                  countries = omdbDetails.Country;
                }

                if (!countries) return null;

                const countryData = translateCountry(countries);
                const singleCountry =
                  countryData.length === 1 ? countryData[0] : null;
                const flagImage = singleCountry
                  ? flagImages[singleCountry.traducao]
                  : null;

                return (
                  <View style={{ marginBottom: 10 }}>
                    <Text style={styles.omdbText}>País(es) de Produção:</Text>
                    {singleCountry && flagImage ? (
                      <View style={styles.lineNota}>
                        <Image source={flagImage} style={styles.logoNota} />
                        <Text style={styles.textoNota}>
                          {singleCountry.traducao}
                        </Text>
                      </View>
                    ) : (
                      <Text style={{ color: "#fff", fontSize: 14 }}>
                        {countryData
                          .map((country) => country.traducao)
                          .join(", ")}
                      </Text>
                    )}
                  </View>
                );
              })()}

              {/* Prêmios e Indicações - apenas quando OMDb tem dados */}
              {omdbDetails?.Awards && omdbDetails.Awards !== "N/A" && (
                <View style={{ marginBottom: 25 }}>
                  <Text style={styles.omdbText}>Prêmios:</Text>
                  <Text style={{ color: "#fff", fontSize: 14 }}>
                    {translatePremios(omdbDetails.Awards)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
}
