import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  overview: string;
}

interface FavoritesContextData {
  favorites: FavoriteMovie[];
  addFavorite: (movie: FavoriteMovie) => Promise<void>;
  removeFavorite: (movieId: number) => Promise<void>;
  isFavorite: (movieId: number) => boolean;
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
);

const STORAGE_KEY = "@movies:favorites";

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar favoritos do AsyncStorage ao iniciar
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: FavoriteMovie[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error("Erro ao salvar favoritos:", error);
    }
  };

  const addFavorite = async (movie: FavoriteMovie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const removeFavorite = async (movieId: number) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    await saveFavorites(newFavorites);
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
