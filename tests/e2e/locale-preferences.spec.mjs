import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

function messages(locale) {
  const suffix = locale === "en" ? "" : `_${locale}`;
  return Object.fromEntries(readFileSync(new URL(`../../src/main/resources/i18n/messages${suffix}.properties`, import.meta.url), "utf8")
    .trim().split(/\r?\n/).map(line => [line.slice(0, line.indexOf("=")), line.slice(line.indexOf("=") + 1)]));
}

for (const language of ["en", "es", "fr"]) {
  for (const javaScriptEnabled of [true, false]) {
    test(`F04-UH01-AC01: native ${language} preference, JS=${javaScriptEnabled}`, async ({ browser }) => {
      const context = await browser.newContext({ locale: "en", javaScriptEnabled, viewport: { width: 320, height: 900 } });
      try {
        const page = await context.newPage();
        const base = process.env.BTC_PREFERENCES_URL;
        await page.goto(`${base}/?lang=${language}`);
        const copy = messages(language);
        const selector = page.getByLabel(copy["language.label"], { exact: true });
        await expect(selector).toHaveValue(language);
        for (const option of ["en", "es", "fr"]) {
          await expect(selector.locator(`option[value="${option}"]`)).toHaveText(copy[`language.${option}`]);
        }
        const csrf = (await context.cookies()).find(cookie => cookie.name === "XSRF-TOKEN");
        expect(csrf).toMatchObject({ httpOnly: true, secure: false, sameSite: "Lax", path: "/" });
        const token = await page.locator('input[name="_csrf"]').getAttribute("value");
        expect(token).not.toBe(csrf.value);
        const post = page.waitForResponse(response => response.request().method() === "POST");
        await selector.selectOption(language);
        await page.getByRole("button", { name: copy["language.apply"], exact: true }).click();
        const submitted = await post;
        expect(submitted.status()).toBe(303);
        expect(submitted.headers()["location"]).toBe("/");
        const fields = new URLSearchParams(submitted.request().postData());
        expect([...fields.keys()].sort()).toEqual(["_csrf", "language", "returnTo"]);
        expect(fields.get("language")).toBe(language);
        expect(fields.get("_csrf")).toBe(token);
        await expect(page).toHaveURL(`${base}/`);
        await expect(page.locator("html")).toHaveAttribute("lang", language);
        await page.reload();
        await expect(page.locator("html")).toHaveAttribute("lang", language);
        const cookies = await context.cookies();
        expect(cookies.map(cookie => cookie.name).sort()).toEqual(["BTC_LANGUAGE", "XSRF-TOKEN"]);
        const preference = cookies.find(cookie => cookie.name === "BTC_LANGUAGE");
        expect(preference).toMatchObject({ value: language, httpOnly: true, secure: false, sameSite: "Lax", path: "/" });
        expect(preference.expires - Date.now() / 1000).toBeGreaterThan(31535900);
        expect(preference.expires - Date.now() / 1000).toBeLessThan(31536100);
        expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length })))
          .toEqual({ local: 0, session: 0 });
      } finally {
        await context.close();
      }
    });
  }
}

for (const mode of ["missing-token", "missing-cookie", "mismatch", "raw"]) {
  test(`F04-UH01-AC02: reject ${mode} with genuine GET cookie`, async ({ browser }) => {
    const context = await browser.newContext({ locale: "en" });
    try {
      const base = process.env.BTC_PREFERENCES_URL;
      await context.addCookies([{ name: "BTC_LANGUAGE", value: "fr", url: base, httpOnly: true, sameSite: "Lax" }]);
      const page = await context.newPage();
      await page.goto(base);
      const cookie = (await context.cookies()).find(cookie => cookie.name === "XSRF-TOKEN");
      const token = await page.locator('input[name="_csrf"]').getAttribute("value");
      if (mode === "missing-cookie") await context.clearCookies({ name: "XSRF-TOKEN" });
      const form = { language: "es", returnTo: "/" };
      if (mode !== "missing-token") form._csrf = mode === "raw" ? cookie.value : mode === "mismatch" ? "SYNTHETIC_WRONG_TOKEN" : token;
      const response = await context.request.post(`${base}/preferences/language`, { form, maxRedirects: 0 });
      expect(response.status()).toBe(403);
      expect(response.headers()["location"]).toBeUndefined();
      expect(await response.text()).not.toContain(cookie.value);
      expect(await response.text()).not.toContain(token);
      const cookies = await context.cookies();
      expect(cookies.find(cookie => cookie.name === "BTC_LANGUAGE").value).toBe("fr");
      expect(cookies.some(cookie => cookie.name === "JSESSIONID")).toBe(false);
      await page.goto(base);
      await expect(page.locator("html")).toHaveAttribute("lang", "fr");
    } finally {
      await context.close();
    }
  });
}
