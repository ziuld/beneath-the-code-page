import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("F18-UH01-AC03: shared control tokens propagate across page families", async ({ page }) => {
  const routes = ["/", "/learn", "/tools/json-formatter", "/tools/json-validator", "/tools/json-minifier", "/tools/base64", "/tools/uuid", "/tools/jwt"];
  const secondaryStyles = [];
  const primaryStyles = [];
  const controlStyle = element => {
    const style = getComputedStyle(element);
    return Object.fromEntries(["fontFamily", "fontSize", "lineHeight", "padding", "borderRadius", "borderWidth", "color", "backgroundColor", "minHeight"].map(key => [key, style[key]]));
  };
  for (const route of routes) {
    await page.goto(`${route}?lang=en`);
    secondaryStyles.push(await page.locator(".language-preference .button").evaluate(controlStyle));
    if (route.startsWith("/tools/")) {
      const run = page.locator("[data-format-run], [data-base64-run], [data-uuid-run], [data-jwt-run]");
      await expect(run).toBeEnabled();
    }
    primaryStyles.push(await page.locator(".button--primary").first().evaluate(controlStyle));
    // Change the owning token in the loaded stylesheet, without injecting per-page
    // CSS or bypassing the document CSP. Every control must inherit the change.
    const owners = await page.evaluate(() => {
      const definitions = [];
      const visit = rules => {
        for (const rule of rules) {
          if (rule.style?.getPropertyValue("--radius-control")) definitions.push(rule.style);
          if (rule.cssRules) visit(rule.cssRules);
        }
      };
      for (const sheet of document.styleSheets) visit(sheet.cssRules);
      for (const style of definitions) style.setProperty("--radius-control", "11px");
      return definitions.length;
    });
    expect(owners).toBe(1);
    for (const control of await page.locator(".button, .language-preference select").all()) {
      await expect(control).toHaveCSS("border-radius", "11px");
    }
    // Navigation reloads the stylesheet before the next page; no source is mutated.
  }
  for (const style of secondaryStyles) expect(style).toEqual(secondaryStyles[0]);
  expect(primaryStyles).toHaveLength(8);
  for (const style of primaryStyles) expect(style).toEqual(primaryStyles[0]);
  expect(primaryStyles[0].backgroundColor).not.toBe(secondaryStyles[0].backgroundColor);
});

const pageRoutes = ["/", "/learn", "/learn/java-fundamentals", "/learn/java-fundamentals/source-to-jvm", "/learn/java-fundamentals/values-types-numeric-limits", "/learn/java-fundamentals/control-flow-tracing", "/tools", "/tools/json-formatter", "/tools/json-validator", "/tools/json-minifier", "/tools/base64", "/tools/uuid", "/tools/jwt"];
for (const locale of ["en", "es", "fr"]) {
  test(`F18-UH01-AC02: ${locale} all page families reflow and retain native navigation`, async ({ page }) => {
    test.setTimeout(90000);
    const errors = [];
    await page.addInitScript(() => {
      window.f18Violations = [];
      document.addEventListener("securitypolicyviolation", event => window.f18Violations.push(event.violatedDirective));
    });
    page.on("pageerror", error => errors.push(error.message));
    for (const width of [320, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const route of pageRoutes) {
        expect((await page.goto(`${route}?lang=${locale}`)).status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
        await expect(page.locator(".site-header")).toHaveCount(1);
        await expect(page.locator(".site-footer")).toHaveCount(1);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
        expect(await page.evaluate(() => window.f18Violations)).toEqual([]);
        expect(await page.locator("body").textContent()).not.toContain("??");
        if (route.startsWith("/tools/json-")) await expect(page.locator("[data-format-run]")).toBeEnabled();
        if (route.startsWith("/learn/java-fundamentals/")) {
          const sections = await page.locator(".lesson-contents a").evaluateAll(links => links.map(link => link.getAttribute("href").slice(1)));
          expect(sections.length).toBeGreaterThan(0);
          expect(new Set(sections).size).toBe(sections.length);
          for (const id of sections) await expect(page.locator(`article h2[id="${id}"]`)).toHaveCount(1);
          await page.locator(".lesson-contents a").first().click();
          expect(new URL(page.url()).hash).toBe(`#${sections[0]}`);
        }
        if (locale === "en" && width === 1440) expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
        if (locale === "en") await page.screenshot({ path: `../../target/f18-${route.replaceAll("/", "_") || "home"}-${width}.png`, fullPage: true });
      }
    }
    expect(errors).toEqual([]);
  });
}

test("F18: redesigned families remain usable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  try {
    const page = await context.newPage();
    for (const route of pageRoutes) {
      await page.goto(`${baseURL}${route}?lang=en`);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      if (route.startsWith("/tools/json-")) await expect(page.locator("[data-format-run]")).toBeDisabled();
      if (route.startsWith("/learn/java-fundamentals/")) {
        await page.locator(".lesson-contents a").last().click();
        expect(new URL(page.url()).hash).toMatch(/^#lesson-section-[0-9]+$/);
        await expect(page.locator("article pre code").first()).toBeVisible();
      }
    }
    expect((await page.goto(`${baseURL}/learn/java-fundamentals/missing-f18-page?lang=en`)).status()).toBe(404);
    await expect(page.locator(".error-page .button--primary")).toHaveAttribute("href", "/?lang=en");
  } finally { await context.close(); }
});
