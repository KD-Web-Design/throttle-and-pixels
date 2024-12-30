import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Simule un environnement DOM pour les tests React
    globals: true, // Permet d'utiliser les API de tests sans import explicite
    setupFiles: "./vitest.setup.ts", // Fichier de configuration initiale
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./") },
  },
});
