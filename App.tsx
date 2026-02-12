import { FavoritesProvider } from "./src/contexts/FavoritesContext";
import { StatusBar } from "expo-status-bar";
import { Routes } from "./src/routes";
import React from "react";

export default function App() {
  return (
    <FavoritesProvider>
      <Routes />
      <StatusBar style="auto" />
    </FavoritesProvider>
  );
}
