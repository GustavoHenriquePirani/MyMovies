import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    padding: 25,
  },

  headerText: {
    marginTop: 45,
    fontSize: 24,
    lineHeight: 45,
    color: "#ffffff",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#67686D",
    height: 42,
    paddingHorizontal: 10,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 20,
    justifyContent: "space-between",
  },

  searchBoxText: {
    color: "#fff",
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 10,
  },

  containerMovies: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: -30,
  },

  noResultText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default styles;
