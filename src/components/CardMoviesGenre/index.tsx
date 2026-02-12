import { Pressable, Image } from "react-native";
import styles from "./styles";

interface Movie {
  id: number;
  poster_path: string;
}

interface Props {
  data: Movie;
  onPress?: () => void;
}

export function CardMoviesGenre({ data, ...rest }: Props) {
  return (
    <Pressable {...rest} style={styles.cardTopMovies}>
      <Image
        style={styles.cardTopImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        }}
      />
    </Pressable>
  );
}
