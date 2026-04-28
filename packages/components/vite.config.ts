import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es"],
      fileName: () => "[name].mjs",
    },
    outDir: "dist",
    cssCodeSplit: true,
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@flow/tokens",
        "@flow/icons",
        "@flow/flags",
        "@flow/primitives",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].mjs",
        assetFileNames: "[name][extname]",
      },
    },
  },
});
