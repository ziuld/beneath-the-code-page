import { test, expect } from "@playwright/test";
import { addTestStyle } from "./test-styles.mjs";

async function visualStates(page, selector, focus = false) {
  return page.locator(selector).evaluateAll((elements, focus) => {
    const luminance = colour => {
      const [r, g, b] = colour.match(/[\d.]+/g).slice(0, 3).map(Number).map(value => {
        const channel = value / 255;
        return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
      });
      return r * 0.2126 + g * 0.7152 + b * 0.0722;
    };
    return elements.map(element => {
      const style = getComputedStyle(element);
      // A positive-offset outline sits outside the control, against its parent
      // surface. Text contrast still uses the control's own background.
      let ancestor = focus && parseFloat(style.outlineOffset) >= 0 ? element.parentElement : element;
      while (getComputedStyle(ancestor).backgroundColor === "rgba(0, 0, 0, 0)") ancestor = ancestor.parentElement;
      const foreground = luminance(focus ? style.outlineColor : style.color);
      const background = luminance(getComputedStyle(ancestor).backgroundColor);
      const size = parseFloat(style.fontSize);
      return {
        ratio: (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05),
        threshold: focus || size >= 24 || (size >= 18.66 && parseInt(style.fontWeight) >= 700) ? 3 : 4.5,
        animation: style.animationName, transition: style.transitionDuration,
      };
    });
  }, focus);
}

async function visibleFocus(control) {
  await expect(control).toBeFocused();
  const state = await control.evaluate(element => {
    const box = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const hit = document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2);
    const extent = parseFloat(style.outlineOffset) + parseFloat(style.outlineWidth);
    return {
      solid: style.outlineStyle === "solid", width: parseFloat(style.outlineWidth),
      unobscured: element === hit || element.contains(hit),
      inView: box.left >= extent && box.top >= extent && box.right + extent <= innerWidth && box.bottom + extent <= innerHeight,
      target: box.width >= 24 && box.height >= 24,
    };
  });
  expect(state).toEqual({ solid: true, width: 2, unobscured: true, inView: true, target: true });
}

for (const locale of ["en", "es", "fr"]) {
  for (const width of [320, 1280]) {
    for (const fixture of [false, true]) {
      test(`F03-UH02-AC02: ${locale}, width=${width}, fixture=${fixture}`, async ({ browser, baseURL }) => {
        const context = await browser.newContext({ locale, viewport: { width, height: 900 }, reducedMotion: "reduce" });
        try {
          const page = await context.newPage();
          const url = fixture ? `${process.env.BTC_COMPONENT_URL}/__shell-fixture` : `${baseURL}/`;
          const response = await page.goto(url);
          const controls = page.locator("a[href], select, button:not(:disabled)");
          await expect(controls).toHaveCount(fixture ? 8 : 11);
          for (let index = 0; index < await controls.count(); index++) {
            await page.keyboard.press("Tab");
            await visibleFocus(controls.nth(index));
            for (const state of await visualStates(page, ":focus", true)) expect(state.ratio).toBeGreaterThanOrEqual(3);
          }
          for (let index = (await controls.count()) - 2; index >= 0; index--) {
            await page.keyboard.press("Shift+Tab");
            await visibleFocus(controls.nth(index));
          }
          await page.keyboard.press("Enter");
          await expect(page.locator("main")).toBeFocused();
          await page.keyboard.press("Tab");
          // Skip moves past the navigation, with no focus trap in the main landmark.
          if (fixture) await expect(page.locator("main button:not(:disabled)")).toBeFocused();
          await expect(page.locator(".unavailable:focus, button:disabled:focus")).toHaveCount(0);

          const text = "p, h1, h2, .wordmark, .navigation a, .unavailable, button, label, select";
          for (const state of await visualStates(page, text)) {
            expect(state.ratio).toBeGreaterThanOrEqual(state.threshold);
            expect(state.animation).toBe("none");
            expect(state.transition).toBe("0s");
          }
          if (fixture) {
            const button = page.locator("main button:not(:disabled)");
            await button.hover();
            expect(await button.evaluate(element => getComputedStyle(element).textDecorationLine)).toBe("underline");
            for (const state of await visualStates(page, "button")) expect(state.ratio).toBeGreaterThanOrEqual(4.5);
            await button.focus();
            await page.keyboard.down("Space");
            for (const state of await visualStates(page, "button")) expect(state.ratio).toBeGreaterThanOrEqual(4.5);
            await page.keyboard.up("Space");
          }
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
          await page.setViewportSize({ width: 1280, height: 900 });
          await addTestStyle(page, response, ":root { zoom: 2; }");
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
          await addTestStyle(page, response, ":root { zoom: 1; font-size: 200%; }");
          await page.setViewportSize({ width: 320, height: 900 });
          expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
          for (const button of await page.locator("button").all()) {
            const box = await button.boundingBox();
            expect(box.x).toBeGreaterThanOrEqual(0);
            expect(box.x + box.width).toBeLessThanOrEqual(320);
          }
        } finally {
          await context.close();
        }
      });
    }
  }
}
