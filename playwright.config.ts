import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "src/test/visual",
  outputDir: "test-results/visual",
  snapshotDir: "src/test/visual/__snapshots__",
  snapshotPathTemplate: "{snapshotDir}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: "http://localhost:6006",
    screenshot: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run storybook -- --ci --port 6006",
    port: 6006,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
