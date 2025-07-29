import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    vanillaExtractPlugin(),
    react(),
    svgr({
      svgrOptions: {
        icon: true,
      },
      include: "**/*.svg",
    }),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "DaycanUI",
      fileName: (format) => `daycan-ui.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@vanilla-extract/css"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@vanilla-extract/css": "vanillaExtract",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
