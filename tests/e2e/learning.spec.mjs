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
        await page.locator(".learning-grid .unit-list a").focus();
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
          expect(url.pathname).toMatch(/^\/learn(?:\/java-fundamentals(?:\/fixture-unit)?)?$|^\/assets\/[\w-]+\.(?:css|js)$|^\/brand\/b-composition\.png$/);
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
          await page.screenshot({ path: `../../target/learning-${language}-zoom.png`, fullPage: true, caret: "initial" });
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

    test(`F14/F16-UH01-AC01: ${language} Home to real unit and explanatory answer, JS=${javaScriptEnabled}`, async ({ browser, baseURL }) => {
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
        await context.addCookies([{ name: "BTC_LANGUAGE", value: "en", url: baseURL, httpOnly: true, sameSite: "Lax" }]);
        await page.goto(`${baseURL}/?lang=${language}`);
        await expect(page.locator(`.section-grid a[href="/learn?lang=${language}"]`)).toHaveCount(1);
        await page.locator(`.section-grid a[href="/learn?lang=${language}"]`).click();
        await expect(page).toHaveURL(`${baseURL}/learn?lang=${language}`);
        await page.keyboard.press("Tab");
        await expect(page.locator(".skip-link")).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page.locator("main")).toBeFocused();
        await page.keyboard.press("Tab");
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(`${baseURL}/learn/java-fundamentals?lang=${language}`);
        await expect(page.getByRole("heading", { name: realCopy[language].prerequisites, exact: true })).toBeVisible();
        await expect(page.getByRole("heading", { name: realCopy[language].outcomes, exact: true })).toBeVisible();
        await expect(page.locator("main .status").last()).toBeVisible();
        await expect(page.locator(".learning-grid .unit-list a")).toHaveCount(3);
        await page.locator(".learning-grid .unit-list a").first().focus();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(`${baseURL}${realPath}?lang=${language}`);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(realCopy[language].title);
        await expect(page.getByRole("heading", { name: realCopy[language].answer, exact: true })).toBeVisible();
        await expect(page.locator("article")).toContainText("Hello, JVM!");
        await expect(page.locator("article")).toContainText("Hello, bytecode!");
        await expect(page.locator("article pre code.language-java")).toContainText("public class Main");
        await expect(page.locator("article script, article img, [rel=prev], .cm-editor")).toHaveCount(0);
        await expect(page.locator("[rel=next]")).toHaveAttribute("href", `/learn/java-fundamentals/values-types-numeric-limits?lang=${language}`);
        expect(await page.locator("article").textContent()).not.toMatch(/F13_PRIVATE_|fixtureExecuted|synthetic fixture/);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        if (javaScriptEnabled) expect(await page.evaluate(() => window.readingViolations)).toEqual([]);
        // WebKit screenshot preparation injects an animation-sync style. Capture
        // only after asserting CSP for the actual journey, before diagnostic work.
        await page.screenshot({ path: `../../target/f14-${language}-narrow-js-${javaScriptEnabled}.png`, fullPage: true, caret: "initial" });
        expect(errors).toEqual([]);
        for (const request of requests) {
          const url = new URL(request.url());
          expect(url.origin).toBe(new URL(baseURL).origin);
          expect(url.pathname).toMatch(/^\/$|^\/brand\/b-composition\.png$|^\/learn(?:\/java-fundamentals(?:\/source-to-jvm)?)?$|^\/assets\/[\w-]+\.(?:css|js)$|^\/brand\/b-composition\.png$/);
          expect(request.resourceType()).not.toBe("worker");
          expect(request.method()).toBe("GET");
          expect(request.postData()).toBeNull();
        }
        expect((await context.cookies()).find(cookie => cookie.name === "BTC_LANGUAGE").value).toBe("en");
        const response = await page.reload();
        if (javaScriptEnabled) {
          await page.setViewportSize({ width: 1280, height: 900 });
          await addTestStyle(page, response, ":root { zoom: 2; }");
          expect(await page.locator("html").evaluate(element => getComputedStyle(element).zoom)).toBe("2");
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
          await page.screenshot({ path: `../../target/f14-${language}-zoom.png`, fullPage: true, caret: "initial" });
        }
        const preferencesBase = process.env.BTC_LOCAL_URL;
        await page.goto(`${preferencesBase}${realPath}?lang=${language}`);
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
        await expect(page).toHaveURL(`${preferencesBase}${realPath}`);
        await expect(page.locator("html")).toHaveAttribute("lang", nextLanguage);
        await expect(page.getByRole("heading", { level: 1 })).toHaveText(realCopy[nextLanguage].title);
        expect((await context.cookies()).some(cookie => cookie.name === "JSESSIONID")).toBe(false);
        expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
      } finally { await context.close(); }
    });
  }

  for (const lesson of [
    { story: "F15-UH01", slug: "values-types-numeric-limits", previous: "source-to-jvm", next: "control-flow-tracing", artifact: "values", content: ["0.30000000000000004", "-294967296"], titles: { en: "Values, types and numeric limits", es: "Valores, tipos y límites numéricos", fr: "Valeurs, types et limites numériques" } },
    { story: "F15-UH02", slug: "control-flow-tracing", previous: "values-types-numeric-limits", next: null, artifact: "flow", content: ["public class ControlFlowTrace", "public class ControlFlowExercise"], titles: { en: "Control flow and tracing", es: "Flujo de control y trazas", fr: "Flot de contrôle et traces d’exécution" } },
  ]) {
    for (const javaScriptEnabled of [true, false]) {
      test(`${lesson.story}: ${language} ordered ${lesson.artifact} lesson and locale return, JS=${javaScriptEnabled}`, async ({ browser, baseURL }) => {
        const base = baseURL;
        const path = `/learn/java-fundamentals/${lesson.slug}`;
        const previousPath = `/learn/java-fundamentals/${lesson.previous}`;
        const titles = lesson.titles;
        const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 320, height: 900 } });
        try {
          const page = await context.newPage();
          const errors = [], requests = [];
          page.on("pageerror", error => errors.push(error.message));
          page.on("request", request => requests.push(request));
          await context.addInitScript(() => {
            window.readingViolations = [];
            document.addEventListener("securitypolicyviolation", event => window.readingViolations.push(event.violatedDirective));
          });
          await page.goto(`${base}${previousPath}?lang=${language}`);
          await page.locator("[rel=next]").focus();
          await page.keyboard.press("Enter");
          await expect(page).toHaveURL(`${base}${path}?lang=${language}`);
          await expect(page.getByRole("heading", { level: 1 })).toHaveText(titles[language]);
          await expect(page.getByRole("heading", { name: realCopy[language].answer, exact: true })).toBeVisible();
          await expect(page.locator("article pre code.language-java")).toHaveCount(2);
          for (const text of lesson.content) await expect(page.locator("article")).toContainText(text);
          await expect(page.locator("article script, article img, .cm-editor")).toHaveCount(0);
          await expect(page.locator("[rel=prev]")).toHaveAttribute("href", `${previousPath}?lang=${language}`);
          if (lesson.next) await expect(page.locator("[rel=next]")).toHaveAttribute("href", `/learn/java-fundamentals/${lesson.next}?lang=${language}`);
          else await expect(page.locator("[rel=next]")).toHaveCount(0);
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
          await page.screenshot({ path: `../../target/f15-${lesson.artifact}-${language}-narrow-js-${javaScriptEnabled}.png`, fullPage: false, caret: "initial" });
          if (javaScriptEnabled) {
            const response = await page.reload();
            await page.setViewportSize({ width: 1280, height: 900 });
            await addTestStyle(page, response, ":root { zoom: 2; }");
            expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
            await page.screenshot({ path: `../../target/f15-${lesson.artifact}-${language}-css-zoom.png`, fullPage: false, caret: "initial" });
          }
          await page.locator("[rel=prev]").click();
          await expect(page).toHaveURL(`${base}${previousPath}?lang=${language}`);
          await page.locator("[rel=next]").click();
          if (javaScriptEnabled) expect(await page.evaluate(() => window.readingViolations)).toEqual([]);
          for (const request of requests) {
            const url = new URL(request.url());
            expect(url.origin).toBe(new URL(base).origin);
            expect(url.pathname).toMatch(/^\/learn\/java-fundamentals\/(?:source-to-jvm|values-types-numeric-limits|control-flow-tracing)$|^\/assets\/[\w-]+\.(?:css|js)$|^\/brand\/b-composition\.png$/);
            expect(request.resourceType()).not.toBe("worker");
            expect(request.method()).toBe("GET");
            expect(request.postData()).toBeNull();
          }
          const preferencesBase = process.env.BTC_LOCAL_URL;
          await page.goto(`${preferencesBase}${path}?lang=${language}`);
          const nextLanguage = language === "fr" ? "es" : "fr";
          await page.locator("select[name=language]").selectOption(nextLanguage);
          const submitted = page.waitForResponse(result => result.request().method() === "POST");
          await page.locator(".language-preference button").click();
          const post = await submitted;
          expect(post.status()).toBe(303);
          expect(post.headers().location).toBe(path);
          await expect(page).toHaveURL(`${preferencesBase}${path}`);
          await expect(page.getByRole("heading", { level: 1 })).toHaveText(titles[nextLanguage]);
          expect((await context.cookies()).some(cookie => cookie.name === "JSESSIONID")).toBe(false);
          expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
          expect(errors).toEqual([]);
        } finally { await context.close(); }
      });
    }

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
