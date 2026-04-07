/**
 * Vitest config for component-only tests (jsdom, no Storybook browser workspace).
 * Use: npx vitest run --config vitest.components.config.ts
 */
import { defineConfig } from "vitest/config";
import path from "path";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/test/**/*.{test,spec}.{ts,tsx}"],
    exclude: ["src/test/node/**", "src/test/visual/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["src/app/components/**", "src/app/primitives.tsx"],
      exclude: [
        "src/app/components/flow-components*.tsx",
        "src/app/components/**/*.stories.*",
        "src/app/components/**/index.tsx",
      ],
      thresholds: {
        statements: 70,
        branches: 60,
        functions: 70,
        lines: 70,
      },
    },
  },
});
