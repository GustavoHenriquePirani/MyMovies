import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#242424",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#333",
    marginBottom: 12,
    overflow: "hidden",
  },

  cardPressed: {
    opacity: 0.7,
    backgroundColor: "#2a2a2a",
  },

  poster: {
    width: 100,
    height: 150,
  },

  info: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },

  genres: {
    fontSize: 12,
    color: "#92929D",
    marginBottom: 6,
  },

  overview: {
    fontSize: 11,
    color: "#ccc",
    marginBottom: 8,
    lineHeight: 16,
  },

  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  rating: {
    fontSize: 14,
    color: "#92929D",
    fontWeight: "600",
  },

  ratingHigh: {
    color: "#FF8700",
  },
});

export default styles;
