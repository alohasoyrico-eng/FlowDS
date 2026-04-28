/**
 * Shared Vite config for pure-data packages (tokens, icons, flags).
 * These packages have no React dependency and identical build settings.
 * Import in each package: import { createBaseConfig } from "../shared-vite-base";
 */
import { defineConfig } from "vite";
import path from "path";

export function createBaseConfig(dirname: string) {
  return defineConfig({
    build: {
      lib: {
        entry: path.resolve(dirname, "src/index.ts"),
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format === "es" ? "mjs" : "cjs"}`,
      },
      outDir: "dist",
      rollupOptions: {
        external: [],
      },
    },
  });
}
