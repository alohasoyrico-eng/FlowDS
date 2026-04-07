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
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    // Coverage (v8 provider, no external dep)
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/app/components/**", "src/app/primitives.tsx"],
      exclude: ["src/app/components/flow-components*.tsx",
      // large generated files
      "src/app/components/**/*.stories.*", "src/app/components/**/index.tsx"]
    },
    workspace: [{
      extends: true,
      test: {
        // Use jsdom to simulate a browser environment
        environment: "jsdom",
        // Global test helpers (describe, it, expect) — no need to import
        globals: true,
        // Setup file: imports @testing-library/jest-dom matchers
        setupFiles: ["./src/test/setup.ts"],
        // Glob patterns for test discovery
        include: ["src/test/**/*.{test,spec}.{ts,tsx}",
        // Exclude the node:test runner files (different API)
        "!src/test/node/**"]
      }
    }, {
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: 'playwright',
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});