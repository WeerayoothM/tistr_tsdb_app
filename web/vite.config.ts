import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  root: "./",
  plugins: [
    svgr(),
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
  ],
  build: {
    outDir: "build",
    target: "esnext",
    chunkSizeWarningLimit: 5000,
  },
  server: {
    port: 3000,
  },
});
