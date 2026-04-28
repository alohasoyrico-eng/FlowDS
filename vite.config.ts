import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  // GitHub Pages serves the site at /flow/ — set base so assets resolve correctly.
  // In local dev (no GITHUB_PAGES env) base stays "/" so hot reload works normally.
  base: process.env.GITHUB_PAGES ? "/FlowDS/" : "/",
  plugins: [
    react(),
    // Bundle analysis — run `npm run analyze` to generate stats.html
    ...(process.env.ANALYZE
      ? [visualizer({ open: true, filename: "stats.html", gzipSize: true })]
      : []),
  ],
  resolve: {
    alias: [
      // CSS-specific aliases — regex ensures these match before general @flow/* aliases
      // Bare @import (e.g. "@flow/tokens/css") → barrel file
      {
        find: /^@flow\/tokens\/css$/,
        replacement: path.resolve(__dirname, "packages/tokens/css/tokens.css"),
      },
      {
        find: /^@flow\/components\/css$/,
        replacement: path.resolve(__dirname, "packages/components/css/components.css"),
      },
      // Sub-path @import (e.g. "@flow/tokens/css/responsive") → directory
      {
        find: /^@flow\/tokens\/css\//,
        replacement: path.resolve(__dirname, "packages/tokens/css") + "/",
      },
      {
        find: /^@flow\/primitives\/css\//,
        replacement: path.resolve(__dirname, "packages/primitives/css") + "/",
      },
      {
        find: /^@flow\/components\/css\//,
        replacement: path.resolve(__dirname, "packages/components/css") + "/",
      },
      {
        find: /^@flow\/patterns\/css\//,
        replacement: path.resolve(__dirname, "packages/patterns/css") + "/",
      },
      // General @flow/* aliases — source packages for HMR
      { find: /^@flow\/design-system/, replacement: path.resolve(__dirname, "packages/flow/src") },
      { find: /^@flow\/tokens/, replacement: path.resolve(__dirname, "packages/tokens/src") },
      { find: /^@flow\/icons/, replacement: path.resolve(__dirname, "packages/icons/src") },
      { find: /^@flow\/flags/, replacement: path.resolve(__dirname, "packages/flags/src") },
      {
        find: /^@flow\/primitives/,
        replacement: path.resolve(__dirname, "packages/primitives/src"),
      },
      {
        find: /^@flow\/components/,
        replacement: path.resolve(__dirname, "packages/components/src"),
      },
      { find: /^@flow\/patterns/, replacement: path.resolve(__dirname, "packages/patterns/src") },
    ],
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ["**/*.svg", "**/*.csv"],
});
