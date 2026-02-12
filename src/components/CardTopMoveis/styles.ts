import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cardTopMovies: {
    width: 150,
    height: 218,
    borderRadius: 16,
    marginHorizontal: 5,
    marginRight: 5,
    marginBottom: 10,
    backgroundColor: "#424242",
  },

  cardTopImage: {
    width: 150,
    height: 218,
    borderRadius: 16,
    zIndex: 1,
  },

  numberPosition: {
    position: "absolute",
    top: 160,
    left: -20,
    color: "#fff",
    fontSize: 75,
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: 5, height: 3 },
    textShadowRadius: 8,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 2,
    overflow: "hidden",
    zIndex: 2,
    elevation: 2,
  },
});

export default styles;
