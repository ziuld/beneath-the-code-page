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
        await expect(page.locator("nav [aria-current=page]")).toHaveAttribute("href", "/tools");
        await expect(page.locator("a[href='/learn']")).toHaveCount(0);
        if (javaScriptEnabled) {
          await page.evaluate(() => {
            window.activations = 0;
            document.querySelector("main button").addEventListener("click", () => window.activations++);
          });
        }
        await buttons.nth(0).focus();
        await expect(buttons.nth(0)).toBeFocused();
        await page.keyboard.down("Space");
        expect(await buttons.nth(0).evaluate(button => button.matches(":active"))).toBe(true);
        await page.keyboard.up("Space");
        expect(await buttons.nth(0).evaluate(button => button.matches(":active"))).toBe(false);
        await page.keyboard.press("Enter");
        await expect(buttons.nth(0)).toBeFocused();
        if (javaScriptEnabled) {
          expect(await page.evaluate(() => window.activations)).toBe(2);
        }
        await expect(page).toHaveURL(`${process.env.BTC_COMPONENT_URL}/__shell-fixture`);
        await page.keyboard.press("Tab");
        await expect(buttons.nth(0)).not.toBeFocused();
        await expect(buttons.nth(1)).not.toBeFocused();
        expect(requests.every(request => request.method === "GET")).toBe(true);
        expect(requests.filter(request => request.url.includes("/__shell-fixture"))).toHaveLength(1);
        const cookies = await context.cookies();
        expect(cookies.map(cookie => cookie.name)).toEqual(["XSRF-TOKEN"]);
        expect(cookies[0]).toMatchObject({ httpOnly: true, secure: true, sameSite: "Lax", path: "/" });
      } finally {
        await context.close();
      }
    });
  }
}
