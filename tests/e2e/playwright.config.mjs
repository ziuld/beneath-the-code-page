import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  testMatch: "*.spec.mjs",
  outputDir: "../../target/browser-results",
  timeout: 30000,
  workers: 1,
  retries: 0,
  reporter: [["list"], ["json", { outputFile: "../../target/browser-results.json" }]],
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
    { name: "firefox", use: { browserName: "firefox" } },
    { name: "webkit", use: { browserName: "webkit", launchOptions: process.env.BTC_WEBKIT_EXECUTABLE ? { executablePath: process.env.BTC_WEBKIT_EXECUTABLE } : {} } },
  ],
  use: {
    baseURL: process.env.BTC_BASE_URL,
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
