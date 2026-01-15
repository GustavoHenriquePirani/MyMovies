import { createContext, useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

type MovieContextData = {
  favoriteMovies: number[];
  allFavoriteMovies: MovieDetails[];
  addFavoriteMovie: (movieId: number) => void;
  removeFavoriteMovie: (movieId: number) => void;
};

export const MovieContext = createContext<MovieContextData>({
  favoriteMovies: [],
  allFavoriteMovies: [],
  addFavoriteMovie: () => {},
  removeFavoriteMovie: () => {},
});

type MovieProviderProps = {
  children: React.ReactNode;
};

export function MovieProvider({ children }: MovieProviderProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [allFavoriteMovies, setAllFavoriteMovies] = useState<MovieDetails[]>(
    []
  );

  useEffect(() => {
    async function loadFavoriteMovies() {
      const favoriteMovies = await AsyncStorage.getItem("@favoriteMovies");
      if (favoriteMovies) {
        setFavoriteMovies(JSON.parse(favoriteMovies));
      }
    }
    loadFavoriteMovies();
  }, []);

  const addFavoriteMovie = useCallback(
    async (movieId: number) => {
      if (!favoriteMovies.includes(movieId)) {
        const newFavoriteMovies = [...favoriteMovies, movieId];
        setFavoriteMovies(newFavoriteMovies);
        await AsyncStorage.setItem(
          "@favoriteMovies",
          JSON.stringify(newFavoriteMovies)
        );
      }
    },
    [favoriteMovies]
  );

  const removeFavoriteMovie = useCallback(
    async (movieId: number) => {
      if (favoriteMovies.includes(movieId)) {
        const newFavoriteMovies = favoriteMovies.filter((id) => id !== movieId);
        setFavoriteMovies(newFavoriteMovies);
        await AsyncStorage.setItem(
          "@favoriteMovies",
          JSON.stringify(newFavoriteMovies)
        );
      }
    },
    [favoriteMovies]
  );

  const contextData: MovieContextData = {
    favoriteMovies,
    allFavoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
  };

  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  );
}
