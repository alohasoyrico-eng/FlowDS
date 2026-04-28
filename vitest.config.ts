/**
 * Vitest configuration for FLOW Design System
 * ─────────────────────────────────────────────
 * Extends the Vite config (inherits React plugin).
 * Uses jsdom for DOM simulation in component tests.
 *
 * Setup: npm install --save-dev vitest @testing-library/react
 *        @testing-library/jest-dom @testing-library/user-event jsdom
 *        @vitest/coverage-v8
 */
import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react-swc";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // CSS-specific aliases — regex ensures these match before general @flow/* aliases
      {
        find: /^@flow\/tokens\/css$/,
        replacement: path.resolve(__dirname, "packages/tokens/css/tokens.css"),
      },
      {
        find: /^@flow\/components\/css$/,
        replacement: path.resolve(__dirname, "packages/components/css/components.css"),
      },
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
  test: {
    // Coverage (v8 provider, no external dep)
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/app/components/**"],
      exclude: [
        "src/app/components/flow-components*.tsx",
        // large generated files
        "src/app/components/**/*.stories.*",
        "src/app/components/**/index.tsx",
      ],
    },
    workspace: [
      {
        extends: true,
        test: {
          // Use jsdom to simulate a browser environment
          environment: "jsdom",
          // Global test helpers (describe, it, expect) — no need to import
          globals: true,
          // Setup file: imports @testing-library/jest-dom matchers
          setupFiles: ["./src/test/setup.ts"],
          // Glob patterns for test discovery
          include: ["src/test/**/*.{test,spec}.{ts,tsx}"],
          exclude: [
            // Playwright visual regression tests — run via `npx playwright test`
            "src/test/visual/**",
            // node:test runner files (different API)
            "src/test/node/**",
          ],
        },
      },
    ],
  },
});
