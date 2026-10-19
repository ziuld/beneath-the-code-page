import { test, expect } from "@playwright/test";
import { addTestStyle } from "./test-styles.mjs";

const unitPath = "/learn/java-fundamentals/fixture-unit";
const copy = {
  en: { course: "Java Fundamentals — synthetic fixture", unit: "Synthetic unit <script>metadata</script>", exercise: "Exercise" },
  es: { course: "Fundamentos de Java — ejemplo sintético", unit: "Unidad sintética <script>metadata</script>", exercise: "Ejercicio" },
  fr: { course: "Les bases de Java — exemple synthétique", unit: "Unité synthétique <script>metadata</script>", exercise: "Exercice" },
};
const realPath = "/learn/java-fundamentals/source-to-jvm";
const realCopy = {
  en: { title: "From Java source to the JVM", prerequisites: "Prerequisites", outcomes: "Learning outcomes", answer: "Answer and reasoning" },
  es: { title: "Del código fuente de Java a la JVM", prerequisites: "Requisitos previos", outcomes: "Objetivos de aprendizaje", answer: "Respuesta y razonamiento" },
  fr: { title: "Du code source Java à la JVM", prerequisites: "Prérequis", outcomes: "Objectifs d’apprentissage", answer: "Réponse et raisonnement" },
};

for (const language of ["en", "es", "fr"]) {
  for (const javaScriptEnabled of [true, false]) {
    test(`F13: ${language} native journey, JS=${javaScriptEnabled}`, async ({ browser }) => {
      // Reuse the existing local-HTTP preference instance of the copied fixture.
      const base = process.env.BTC_PREFERENCES_URL;
      const context = await browser.newContext({ javaScriptEnabled, locale: "en", viewport: { width: 320, height: 900 } });
      try {
        await context.addCookies([{ name: "BTC_LANGUAGE", value: "en", url: base, httpOnly: true, sameSite: "Lax" }]);
        const page = await context.newPage();
        const requests = [], violations = [];
        await context.addInitScript(() => {
          window.fixtureViolations = [];
          document.addEventListener("securitypolicyviolation", event => window.fixtureViolations.push(event.violatedDirective));
        });
        page.on("request", request => requests.push(request));
        page.on("pageerror", error => violations.push(error.message));
        await page.goto(`${base}/learn?lang=${language}`);
        await page.keyboard.press("Tab");
        await expect(page.locator(".skip-link")).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page.locator("main")).toBeFocused();
        await page.keyboard.press("Tab");
        await expect(page.locator("main h2 a")).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(`${base}/learn/java-fundamentals?lang=${language}`);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy[language].course);
        await page.locator("main > ol a").focus();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(`${base}${unitPath}?lang=${language}`);
        await expect(page.locator("html")).toHaveAttribute("lang", language);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(copy[language].unit);
        await expect(page.getByRole("heading", { name: copy[language].exercise, exact: true })).toBeVisible();
        await expect(page.locator("article pre code")).toContainText("<script>");
        await expect(page.locator("article script, article img, article [onerror], [rel=prev], [rel=next], .cm-editor")).toHaveCount(0);
        expect(await page.locator("article").textContent()).toContain("${7 * 7}");
        expect(await page.locator("article a").evaluateAll(links => links.map(link => link.getAttribute("href"))))
          .toEqual(["https://example.invalid/learning-safe", "", "", ""]);
        expect(await page.evaluate(() => window.fixtureExecuted)).toBeUndefined();
        if (javaScriptEnabled) expect(await page.evaluate(() => window.fixtureViolations)).toEqual([]);
        expect(violations).toEqual([]);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        for (const request of requests) {
          const url = new URL(request.url());
          expect(url.origin).toBe(new URL(base).origin);
          expect(url.pathname).toMatch(/^\/learn(?:\/java-fundamentals(?:\/fixture-unit)?)?$|^\/assets\/[\w-]+\.(?:css|js)$/);
          expect(request.resourceType()).not.toBe("worker");
          expect(request.method()).toBe("GET");
          expect(request.postData()).toBeNull();
          expect(url.href).not.toContain("F13_PRIVATE_SENTINEL");
        }
        expect((await context.cookies()).find(cookie => cookie.name === "BTC_LANGUAGE").value).toBe("en");
        const response = await page.reload();
        if (javaScriptEnabled) {
          await page.setViewportSize({ width: 1280, height: 900 });
          await addTestStyle(page, response, ":root { zoom: 2; }");
          expect(await page.locator("html").evaluate(element => getComputedStyle(element).zoom)).toBe("2");
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
          await page.screenshot({ path: `../../target/learning-${language}-zoom.png`, fullPage: true });
        }
        const nextLanguage = language === "fr" ? "es" : "fr";
        await page.locator("select[name=language]").selectOption(nextLanguage);
        const posted = page.waitForResponse(response => response.request().method() === "POST");
        await page.locator(".language-preference button").focus();
        await page.keyboard.press("Enter");
        const post = await posted;
        expect(post.status()).toBe(303);
        expect(post.headers().location).toBe(unitPath);
        await expect(page).toHaveURL(`${base}${unitPath}`);
        await expect(page.locator("html")).toHaveAttribute("lang", nextLanguage);
        expect((await context.cookies()).find(cookie => cookie.name === "BTC_LANGUAGE").value).toBe(nextLanguage);
        expect((await context.cookies()).some(cookie => cookie.name === "JSESSIONID")).toBe(false);
        expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
      } finally { await context.close(); }
    });

    test(`F14: ${language} real unit and explanatory answer, JS=${javaScriptEnabled}`, async ({ browser, baseURL }) => {
      const context = await browser.newContext({ javaScriptEnabled, locale: "en", viewport: { width: 320, height: 900 } });
      try {
        const page = await context.newPage();
        const requests = [], errors = [];
        await context.addInitScript(() => {
          window.readingViolations = [];
          document.addEventListener("securitypolicyviolation", event => window.readingViolations.push(event.violatedDirective));
        });
        page.on("request", request => requests.push(request));
        page.on("pageerror", error => errors.push(error.message));
        await page.goto(`${baseURL}/learn?lang=${language}`);
        await page.keyboard.press("Tab");
        await expect(page.locator(".skip-link")).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page.locator("main")).toBeFocused();
        await page.keyboard.press("Tab");
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(`${baseURL}/learn/java-fundamentals?lang=${language}`);
        await expect(page.getByRole("heading", { name: realCopy[language].prerequisites, exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: realCopy[language].outcomes, exact: true })).toBeVisible();
        await expect(page.locator("main .status")).toBeVisible();
        await expect(page.locator("main > ol a")).toHaveCount(1);
        await page.locator("main > ol a").focus();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(`${baseURL}${realPath}?lang=${language}`);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(realCopy[language].title);
        await expect(page.getByRole("heading", { name: realCopy[language].answer, exact: true })).toBeVisible();
        await expect(page.locator("article")).toContainText("Hello, JVM!");
        await expect(page.locator("article")).toContainText("Hello, bytecode!");
        await expect(page.locator("article pre code.language-java")).toContainText("public class Main");
        await expect(page.locator("article script, article img, [rel=prev], [rel=next], .cm-editor")).toHaveCount(0);
        expect(await page.locator("article").textContent()).not.toMatch(/F13_PRIVATE_|fixtureExecuted|synthetic fixture/);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        await page.screenshot({ path: `../../target/f14-${language}-narrow-js-${javaScriptEnabled}.png`, fullPage: true });
        if (javaScriptEnabled) expect(await page.evaluate(() => window.readingViolations)).toEqual([]);
        expect(errors).toEqual([]);
        for (const request of requests) {
          const url = new URL(request.url());
          expect(url.origin).toBe(new URL(baseURL).origin);
          expect(url.pathname).toMatch(/^\/learn(?:\/java-fundamentals(?:\/source-to-jvm)?)?$|^\/assets\/[\w-]+\.(?:css|js)$/);
          expect(request.resourceType()).not.toBe("worker");
          expect(request.method()).toBe("GET");
          expect(request.postData()).toBeNull();
        }
        expect((await context.cookies()).some(cookie => cookie.name === "BTC_LANGUAGE")).toBe(false);
        const response = await page.reload();
        if (javaScriptEnabled) {
          await page.setViewportSize({ width: 1280, height: 900 });
          await addTestStyle(page, response, ":root { zoom: 2; }");
          expect(await page.locator("html").evaluate(element => getComputedStyle(element).zoom)).toBe("2");
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
          await page.screenshot({ path: `../../target/f14-${language}-zoom.png`, fullPage: true });
        }
        const nextLanguage = language === "fr" ? "es" : "fr";
        await page.locator("select[name=language]").selectOption(nextLanguage);
        const submitted = page.waitForResponse(result => result.request().method() === "POST");
        await page.locator(".language-preference button").focus();
        await page.keyboard.press("Enter");
        const post = await submitted;
        expect(post.status()).toBe(303);
        expect(post.headers().location).toBe(realPath);
        const fields = new URLSearchParams(post.request().postData());
        expect([...fields.keys()].sort()).toEqual(["_csrf", "language", "returnTo"]);
        expect(fields.get("returnTo")).toBe(realPath);
        await expect(page).toHaveURL(`${baseURL}${realPath}`);
        await expect(page.locator("html")).toHaveAttribute("lang", nextLanguage);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(realCopy[nextLanguage].title);
        expect((await context.cookies()).some(cookie => cookie.name === "JSESSIONID")).toBe(false);
        expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
      } finally { await context.close(); }
    });
  }

  test(`F13: ${language} production fixture absence and bounded missing responses`, async ({ request, baseURL }) => {
    for (const path of [unitPath, "/learn/java-fundamentals/draft"]) {
      const response = await request.get(`${baseURL}${path}?lang=${language}`);
      expect(response.status()).toBe(404);
      expect(await response.text()).not.toContain("synthetic fixture");
    }
    const base = process.env.BTC_COMPONENT_URL;
    for (const slug of ["missing", "draft", "F13_PRIVATE_SENTINEL", "%252e%252e", "%2e%2e%2fapplication.yaml"]) {
      const response = await request.get(`${base}/learn/java-fundamentals/${slug}?lang=${language}`, { headers: { Accept: "text/html" } });
      expect([400, 403, 404]).toContain(response.status());
      if (["missing", "draft", "F13_PRIVATE_SENTINEL"].includes(slug)) {
        expect(response.status()).toBe(404);
        expect(await response.text()).toContain(`lang="${language}"`);
      }
      expect(await response.text()).not.toMatch(/F13_PRIVATE_|BTC_LEARNING_|Exception|published-units|server\.port/);
      expect(response.headers()["cache-control"]).toBe("no-store");
      expect(response.headers()["content-security-policy"]).toContain("default-src 'none'");
      expect(response.headers()["x-content-type-options"]).toBe("nosniff");
    }
    for (const path of ["/learn/other-course", `${unitPath}/nested`, "/tools/missing"]) {
      expect((await request.get(`${base}${path}`)).status()).toBe(403);
    }
    expect((await request.post(`${base}${unitPath}`)).status()).toBe(403);
  });
}
