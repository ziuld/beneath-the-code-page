import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

function messages(locale) {
  const suffix = locale === "en" ? "" : `_${locale}`;
  return Object.fromEntries(readFileSync(new URL(`../../src/main/resources/i18n/messages${suffix}.properties`, import.meta.url), "utf8")
    .trim().split(/\r?\n/).map(line => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)]));
}

for (const locale of ["en", "es", "fr"]) {
  const copy = messages(locale);
  for (const javaScriptEnabled of [true, false]) {
    for (const fixture of [false, true]) {
      test(`F03-UH02-AC01: ${locale}, JS=${javaScriptEnabled}, fixture=${fixture}`, async ({ browser, baseURL }) => {
        const context = await browser.newContext({ locale, javaScriptEnabled });
        try {
          const page = await context.newPage();
          const url = fixture ? `${process.env.BTC_COMPONENT_URL}/__shell-fixture` : `${baseURL}/`;
          const requests = [];
          page.on("request", request => requests.push(request));
          const response = await page.goto(url);
          expect(response.status()).toBe(200);
          expect(response.headers()["set-cookie"]).toBeUndefined();
          await expect(page.locator("html")).toHaveAttribute("lang", locale);
          await expect(page).toHaveTitle(copy["home.title"]);
          await expect(page.getByRole("navigation", { name: copy["navigation.label"], exact: true })).toHaveCount(1);
          await expect(page.getByRole("link", { name: copy["navigation.skip"], exact: true })).toHaveCount(1);
          await expect(page.getByRole("navigation").getByRole("link", { name: copy["navigation.home"], exact: true })).toHaveCount(1);
          await expect(page.getByRole("contentinfo")).toContainText(copy["footer.statement"]);
          await expect(page.locator(".section-card h2").nth(0)).toHaveText(copy["home.tools.title"]);
          await expect(page.locator(".section-card h2").nth(1)).toHaveText(copy["home.learn.title"]);
          if (fixture) {
            await expect(page.getByRole("button", { name: copy["action.continue"], exact: true })).toHaveCount(2);
          } else {
            await expect(page.getByRole("img", { name: copy["brand.logo.alt"], exact: true })).toHaveCount(1);
            await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", copy["home.description"]);
            await expect(page.getByRole("region", { name: copy["home.sections"], exact: true })).toHaveCount(1);
          }
          expect(await page.content()).not.toMatch(/\?\?[^?]+\?\?|\bth:/);
          expect(requests.every(request => request.method() === "GET" && request.postData() === null
            && new URL(request.url()).origin === new URL(url).origin)).toBe(true);
          expect(await context.cookies()).toEqual([]);
          expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })))
            .toEqual({ local: 0, session: 0 });
        } finally {
          await context.close();
        }
      });
    }
  }
}
