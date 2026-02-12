import { Pressable, Image, Text, View } from "react-native";
import { Star } from "phosphor-react-native";
import styles from "./styles";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  genres: Array<{ id: number; name: string }>;
  overview: string;
}

interface Props {
  data: Movie;
  onPress?: () => void;
}

export function MovieListCard({ data, ...rest }: Props) {
  const genresText = data.genres.map((g) => g.name).join(", ");
  const rating = data.vote_average.toFixed(1);
  const ratingNumber = Number(rating);

  return (
    <Pressable
      {...rest}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image
        style={styles.poster}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {data.title}
        </Text>
        <Text style={styles.genres} numberOfLines={1}>
          {genresText}
        </Text>
        <Text style={styles.overview} numberOfLines={2}>
          {data.overview}
        </Text>
        <View style={styles.ratingContainer}>
          <Star
            color={ratingNumber >= 7 ? "#FF8700" : "#92929D"}
            weight="fill"
            size={16}
          />
          <Text style={[styles.rating, ratingNumber >= 7 && styles.ratingHigh]}>
            {rating}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
