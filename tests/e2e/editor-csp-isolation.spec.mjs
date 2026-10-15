import { test, expect } from "@playwright/test";

const cases = [
  { name: "Home", origin: process.env.BTC_BASE_URL, path: "/", editor: false },
  { name: "shared shell without editor scripts", origin: process.env.BTC_COMPONENT_URL, path: "/__shell-fixture", editor: false },
  { name: "editor enhancement", origin: process.env.BTC_COMPONENT_URL, path: "/__editor-fixture", editor: true },
];

for (const entry of cases) {
  test(`initial-load CSP isolation: ${entry.name}`, async ({ page }, testInfo) => {
    const scripts = [];
    page.on("request", (request) => {
      if (request.resourceType() === "script") scripts.push(new URL(request.url()).pathname);
    });
    await page.addInitScript(() => {
      window.policyViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => {
        window.policyViolations.push({
          directive: event.violatedDirective,
          resource: event.blockedURI,
          sourceFile: event.sourceFile,
          lineNumber: event.lineNumber,
          columnNumber: event.columnNumber,
        });
      });
    });
    const response = await page.goto(`${entry.origin}${entry.path}`);
    expect(response.status()).toBe(200);
    const policy = response.headers()["content-security-policy"];
    expect(policy).toContain("style-src-attr 'none'");
    expect(policy).not.toMatch(/unsafe-inline|unsafe-eval/);
    await expect(page.locator("#interface-language")).toBeVisible();
    if (entry.editor) await expect(page.locator("[data-editor-ready=true]")).toBeVisible();
    else await expect(page.locator("[data-editor-workspace]")).toHaveCount(0);
    // Observe initial rendering/measurement without editor interactions or a fixed sleep.
    await page.evaluate(() => new Promise((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
    }));
    const violations = await page.evaluate(() => window.policyViolations);
    const observation = { engine: testInfo.project.name, page: entry.name, scripts, violations };
    // Safe initial-load metadata only: no HTML, nonce, cookies or content samples.
    console.log("Initial-load CSP isolation:", JSON.stringify(observation));
    if (!entry.editor) expect(scripts.join("\n")).not.toContain("editor-workspace");
    if (entry.name === "shared shell without editor scripts") expect(scripts).toEqual([]);
    expect(violations).toEqual([]);
  });
}

test("native selector CSP: minimal document and CSS isolation", async ({ browser }, testInfo) => {
  const observations = [];
  const url = `${process.env.BTC_COMPONENT_URL}/__shell-fixture`;
  const variants = [
    { name: "no-select control", content: "<p>Control</p>", css: "" },
    { name: "unstyled native select", content: '<select aria-label="Language"><option>English</option></select>', css: "" },
    { name: "select without native appearance", content: '<select aria-label="Language"><option>English</option></select>', css: "select { appearance: none; }" },
    { name: "dark colour scheme", content: '<select aria-label="Language"><option>English</option></select>', css: ":root { color-scheme: dark; }" },
    { name: "native listbox", content: '<select aria-label="Language" size="3"><option>English</option><option>Spanish</option><option>French</option></select>', css: "" },
  ];
  for (const variant of variants) {
    const context = await browser.newContext();
    try {
      // Diagnostic documents only: preserve the actual response CSP, never alter the app.
      await context.route(url, async (route) => {
        const response = await route.fetch();
        const policy = response.headers()["content-security-policy"];
        expect(policy).toContain("style-src-attr 'none'");
        expect(policy).not.toMatch(/unsafe-inline|unsafe-eval/);
        const nonce = policy.match(/'nonce-([^']+)'/)[1];
        const style = variant.css ? `<style nonce="${nonce}">${variant.css}</style>` : "";
        await route.fulfill({ response, body: `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Selector diagnostic</title>${style}</head><body>${variant.content}</body></html>` });
      });
      const page = await context.newPage();
      await page.addInitScript(() => {
        window.policyViolations = [];
        document.addEventListener("securitypolicyviolation", (event) => {
          window.policyViolations.push({ directive: event.violatedDirective, resource: event.blockedURI, sourceFile: event.sourceFile, lineNumber: event.lineNumber });
        });
      });
      const response = await page.goto(url);
      expect(response.status()).toBe(200);
      await page.evaluate(() => new Promise((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      }));
      const violations = await page.evaluate(() => window.policyViolations);
      observations.push({ variant: variant.name, violations });
    } finally { await context.close(); }
  }
  // Print every controlled variant before asserting, so one failure does not hide the comparison.
  console.log("Minimal native-select CSP:", JSON.stringify({ engine: testInfo.project.name, observations }));
  expect(observations.filter((entry) => entry.violations.length)).toEqual([]);
});
