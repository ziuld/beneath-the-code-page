import { expectProductionCsrf } from "./test-cookies.mjs";
import { test, expect } from "@playwright/test";

for (const { locale, label } of [
  { locale: "en", label: "Continue" },
  { locale: "es", label: "Continuar" },
  { locale: "fr", label: "Continuer" },
]) {
  for (const javaScriptEnabled of [true, false]) {
    test(`F03-UH02: ${locale} native component states, JS=${javaScriptEnabled}`, async ({ browser }) => {
      const context = await browser.newContext({ locale, javaScriptEnabled, viewport: { width: 320, height: 900 } });
      try {
        const page = await context.newPage();
        const requests = [];
        page.on("request", request => requests.push({ url: request.url(), method: request.method() }));
        const response = await page.goto(`${process.env.BTC_COMPONENT_URL}/__shell-fixture`);
        expect(response.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        const buttons = page.getByRole("button", { name: label, exact: true });
        await expect(buttons).toHaveCount(2);
        await expect(buttons.nth(0)).toBeEnabled();
        await expect(buttons.nth(1)).toBeDisabled();
        await expect(buttons.nth(0)).toHaveAttribute("type", "button");
        await expect(page.locator("nav [aria-current=page]")).toHaveAttribute("href", `/tools?lang=${locale}`);
        await expect(page.locator("a[href^='/learn']")).toHaveCount(0);
        if (javaScriptEnabled) {
          await page.evaluate(() => {
            window.activations = 0;
            document.querySelector("main button").addEventListener("click", () => window.activations++);
          });
        }
        await buttons.nth(0).focus();
        await expect(buttons.nth(0)).toBeFocused();
        await page.keyboard.press("Space");
        await page.keyboard.press("Enter");
        await expect(buttons.nth(0)).toBeFocused();
        if (javaScriptEnabled) {
          expect(await page.evaluate(() => window.activations)).toBe(2);
        }
        // Test the rendered pointer-pressed state. Firefox does not give Space
        // the same visual state; matches(":active") also differs from rendering.
        // Keyboard Space/Enter activation and focus are asserted separately above.
        const normalBackground = await buttons.nth(0).evaluate(button => getComputedStyle(button).backgroundColor);
        const activeBackground = await buttons.nth(0).evaluate(button => {
          const hex = getComputedStyle(button).getPropertyValue("--surface-active").trim();
          return `rgb(${hex.slice(1).match(/../g).map(pair => parseInt(pair, 16)).join(", ")})`;
        });
        await buttons.nth(0).hover();
        await page.mouse.down();
        await expect(buttons.nth(0)).toHaveCSS("background-color", activeBackground);
        await page.mouse.up();
        await expect(buttons.nth(0)).toHaveCSS("background-color", normalBackground);
        if (javaScriptEnabled) expect(await page.evaluate(() => window.activations)).toBe(3);
        await expect(page).toHaveURL(`${process.env.BTC_COMPONENT_URL}/__shell-fixture`);
        await page.keyboard.press("Tab");
        await expect(buttons.nth(0)).not.toBeFocused();
        await expect(buttons.nth(1)).not.toBeFocused();
        expect(requests.every(request => request.method === "GET")).toBe(true);
        expect(requests.filter(request => request.url.includes("/__shell-fixture"))).toHaveLength(1);
        await expectProductionCsrf(response, context);
      } finally {
        await context.close();
      }
    });
  }
}
