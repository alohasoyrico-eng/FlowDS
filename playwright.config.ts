import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "src/test/visual",
  outputDir: "test-results/visual",
  snapshotDir: "src/test/visual/__snapshots__",
  snapshotPathTemplate: "{snapshotDir}/{projectName}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 4,
  timeout: 30_000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
    },
  },
  use: {
    baseURL: "http://localhost:5173",
    screenshot: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  webServer: {
    command: "npm run dev -- --port 5173 --strictPort",
    port: 5173,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
