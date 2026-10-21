import { expectProductionCsrf } from "./test-cookies.mjs";
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { addTestStyle } from "./test-styles.mjs";

const languages = [
  { locale: "en", tools: "Tools", learn: "Learn" },
  { locale: "es", tools: "Herramientas", learn: "Aprender" },
  { locale: "fr", tools: "Outils", learn: "Apprendre" },
];

for (const language of languages) {
  test(`F03-UH01-AC01/AC02: ${language.locale} Home without JavaScript`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, locale: language.locale });
    try {
      const page = await context.newPage();
      const requests = [];
      page.on("request", request => requests.push({ url: request.url(), method: request.method(), body: request.postData() }));
      const response = await page.goto(baseURL);
      expect(response.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", language.locale);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByRole("heading", { name: language.tools, exact: true })).toBeVisible();
      await expect(page.getByRole("heading", { name: language.learn, exact: true })).toBeVisible();
      await expect(page.locator(".section-card p:not(.status)")).toHaveCount(2);
      await expect(page.locator(".section-card .status")).toHaveCount(0);
      await expect(page.locator(".wordmark")).toHaveText("Beneath the Code");
      await expect(page.locator("main .layer-art")).toBeVisible();
      const logo = await context.request.get(`${baseURL}/brand/b-composition.png`);
      expect(logo.status()).toBe(200);
      expect(await logo.body()).toEqual(readFileSync(new URL("../../docs/reference/logo-composition-original.png", import.meta.url)));
      await expect(page.locator(`a[href="/tools?lang=${language.locale}"]`)).toHaveCount(3);
      await expect(page.locator(`a[href="/learn?lang=${language.locale}"]`)).toHaveCount(3);
      await expect(page.locator("[onclick]")).toHaveCount(0);
      await expect(page.locator('form[action="/preferences/language"]')).toHaveCount(1);
      for (const href of await page.locator("nav a").evaluateAll(links => links.map(link => link.getAttribute("href")))) {
        expect((await context.request.get(new URL(href, baseURL).href)).status()).toBe(200);
      }
      expect(await page.locator("body").textContent()).not.toContain("??");
      expect(requests.length).toBeGreaterThan(1);
      for (const request of requests) {
        const url = new URL(request.url);
        expect(url.origin).toBe(new URL(baseURL).origin);
        expect(url.pathname).toMatch(/^\/$|^\/assets\/[A-Za-z0-9_-]+\.(css|js)$|^\/brand\/b-composition\.png$/);
        expect(request.method).toBe("GET");
        expect(request.body).toBeNull();
      }
      await expectProductionCsrf(response, context);
    } finally {
      await context.close();
    }
  });

  test(`${language.locale}: keyboard, narrow reflow, contrast and reduced motion`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ locale: language.locale, viewport: { width: 320, height: 800 }, reducedMotion: "reduce" });
    try {
      const page = await context.newPage();
      await page.goto(baseURL);
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      expect(await page.locator(".skip-link").evaluate(element => element.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0);
      await page.keyboard.press("Enter");
      await expect(page.locator("main")).toBeFocused();
      const response = await page.goto(baseURL);
      for (const selector of [".skip-link", ".wordmark", `nav a[href="/?lang=${language.locale}"]`, `nav a[href="/tools?lang=${language.locale}"]`, `nav a[href="/learn?lang=${language.locale}"]`]) {
        await page.keyboard.press("Tab");
        const link = page.locator(selector);
        await expect(link).toBeFocused();
        expect(await link.evaluate(element => getComputedStyle(element).outlineStyle)).toBe("solid");
        const box = await link.boundingBox();
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(320);
      }
      await page.keyboard.press("Shift+Tab");
      await expect(page.locator(`nav a[href="/tools?lang=${language.locale}"]`)).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(page.locator(`nav a[href="/?lang=${language.locale}"]`)).toBeFocused();
      await page.keyboard.press("Shift+Tab");
      await expect(page.locator(".wordmark")).toBeFocused();
      await page.screenshot({ path: `../../target/home-${language.locale}-narrow-default.png`, fullPage: true });
      // Actual CSS layout zoom doubles all rendered sizes, unlike deviceScaleFactor.
      await page.setViewportSize({ width: 1280, height: 900 });
      await addTestStyle(page, response, ":root { zoom: 2; }");
      expect(await page.locator("html").evaluate(element => getComputedStyle(element).zoom)).toBe("2");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await page.screenshot({ path: `../../target/home-${language.locale}-zoom.png`, fullPage: true });
      await addTestStyle(page, response, ":root { zoom: 1; }");
      await page.setViewportSize({ width: 320, height: 800 });
      // 200% text enlargement plus 320 CSS-pixel reflow; not device-scale-factor zoom.
      await addTestStyle(page, response, ":root { font-size: 200%; }");
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      const first = await page.locator(".section-card").first().boundingBox();
      const last = await page.locator(".section-card").last().boundingBox();
      expect(last.y).toBeGreaterThan(first.y + first.height);
      const contrast = await page.locator(".section-card p, .site-footer p, nav span").evaluateAll(elements => {
        const luminance = colour => {
          const channels = colour.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
            const channel = value / 255;
            return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
          });
          return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
        };
        return elements.map(element => {
          let ancestor = element;
          while (getComputedStyle(ancestor).backgroundColor === "rgba(0, 0, 0, 0)") ancestor = ancestor.parentElement;
          const foreground = luminance(getComputedStyle(element).color);
          const background = luminance(getComputedStyle(ancestor).backgroundColor);
          return (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05);
        });
      });
      expect(contrast.length).toBeGreaterThan(0);
      for (const ratio of contrast) expect(ratio).toBeGreaterThanOrEqual(4.5);
      expect(await page.locator("main").evaluate(element => getComputedStyle(element).animationName)).toBe("none");
      await page.screenshot({ path: `../../target/home-${language.locale}-narrow.png`, fullPage: true });
    } finally {
      await context.close();
    }
  });
}
