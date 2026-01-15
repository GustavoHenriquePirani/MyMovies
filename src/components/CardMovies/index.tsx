import { Pressable, Image, Text } from "react-native";
import styles from "./styles";

interface Movie {
  id: number;
  poster_path: string;
}

interface Props {
  data: Movie;
  onPress?: () => void;
  position?: number;
}

export function CardMovies({ data, ...rest }: Props) {
  return (
    <Pressable {...rest} style={styles.cardMovies}>
      <Image
        style={styles.cardImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        }}
      />
    </Pressable>
  );
}

export function CardTopMovies({ data, position, ...rest }: Props) {
  return (
    <Pressable {...rest} style={styles.cardTopMovies}>
      <Image
        style={styles.cardTopImage}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        }}
      />
      {position && (
        <Text
          style={styles.numberPosition}
        >
          {position}
        </Text>
      )}
    </Pressable>
  );
}
