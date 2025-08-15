import { defineConfig } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./index.ts"),
      name: "DaycanAPI",
      fileName: (format) => `daycan-api.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["@tanstack/react-query", "axios"],
      output: {
        globals: {
          "@tanstack/react-query": "TanStackQuery",
          axios: "axios",
        },
      },
    },
  },
});
