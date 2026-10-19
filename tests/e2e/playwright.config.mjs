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
    { name: "firefox", testMatch: ["editor*.spec.mjs", "learning.spec.mjs"], use: { browserName: "firefox" } },
    { name: "webkit", testMatch: ["editor*.spec.mjs", "learning.spec.mjs"], use: { browserName: "webkit" } },
  ],
  use: {
    baseURL: process.env.BTC_BASE_URL,
    browserName: "chromium",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
