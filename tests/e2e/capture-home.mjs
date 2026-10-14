import { chromium } from "@playwright/test";
import { mkdirSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const directory = resolve(process.argv[2]);
mkdirSync(directory, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BTC_BROWSER_CHANNEL === "chrome" ? "chrome" : undefined });
try {
  for (const locale of ["en", "es", "fr"]) {
    for (const width of [320, 1280]) {
      const context = await browser.newContext({ locale, viewport: { width, height: 900 } });
      try {
        const page = await context.newPage();
        if (process.argv[3]) {
          await page.route("**/*.css", route => route.fulfill({
            contentType: "text/css", body: readFileSync(process.argv[3], "utf8"),
          }));
        }
        await page.goto(process.env.BTC_BASE_URL);
        await page.screenshot({ path: resolve(directory, `${locale}-${width}.png`), fullPage: true });
      } finally {
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
