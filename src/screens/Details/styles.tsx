import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },

  header: {
    paddingTop: 60,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#1a1a1a",
  },

  headerText: {
    fontWeight: "700",
    fontSize: 18,
    color: "#fff",
  },

  detailsBackdropImage: {
    position: "absolute",
    width: "100%",
    height: 190,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
  },

  posterShadowWrapper: {
    position: "absolute",
    left: 20,
    top: 120,
    width: 100,
    height: 160,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: -8 }, 
    shadowOpacity: 0.8,
    shadowRadius: 18,
    elevation: 24, 
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsPosterImage: {
    width: 100,
    height: 160,
    borderRadius: 16,
    zIndex: 11,
  },

  tittleMovie: {
    position: "absolute",
    left: 0,
    top: 50,
    color: "#fff",
    fontSize: 21,
    fontWeight: "700",
    flexWrap: "wrap",
    marginLeft: 127,
    paddingRight: 15,
    width: "70%",
  },

  description: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 130,
  },

  descriptionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  descriptionText: {
    marginRight: 10,
    color: "#92929D",
    fontSize: 12,
  },

  corNotaAlta: {
    marginRight: 10,
    color: "#FF8700",
  },

  overviewText: {
    marginTop: 15,
    color: "#fff",
    paddingHorizontal: 20,
    textAlign: "justify",
  },

  genresContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  omdbText: {
    color: "#0296e5",
    fontWeight: "600",
    fontSize: 15,
  },

  lineNota: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },

  logoNota: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },

  textoNota: {
    color: "#fff",
    fontSize: 14,
    marginLeft: 8,
  },
});

export default styles;
