import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../../target/frontend/asset-manifest.json", import.meta.url), "utf8"));
const assetPath = (file) => "/" + file.replace(/^static\//, "");
const workerPath = assetPath(manifest["__json-formatter-worker"].file);
const lazyPath = assetPath(manifest["tools/json/formatter-workspace.ts"].file);
const assets = new Set(Object.values(manifest).flatMap((entry) => [entry.file, ...(entry.css || [])]).map(assetPath));
const messages = {
  en: { format: "Format JSON", input: "Content editor", success: "Processing completed.", error: "Processing failed. You can try again.", unavailable: "Processing is not available until JavaScript and the editor have loaded." },
  es: { format: "Formatear JSON", input: "Editor de contenido", success: "Procesamiento completado.", error: "El procesamiento falló. Puedes intentarlo de nuevo.", unavailable: "El procesamiento no está disponible hasta que se carguen JavaScript y el editor." },
  fr: { format: "Formater le JSON", input: "Éditeur de contenu", success: "Traitement terminé.", error: "Le traitement a échoué. Vous pouvez réessayer.", unavailable: "Le traitement n’est pas disponible tant que JavaScript et l’éditeur ne sont pas chargés." },
};

for (const [locale, copy] of Object.entries(messages)) {
  test(`JSON formatter ${locale}: real worker, fidelity, recovery, CSP and privacy`, async ({ page, context, baseURL }) => {
    const requests = [];
    const workerResponses = [];
    context.on("request", (request) => requests.push({ url: request.url(), method: request.method(), body: request.postData(), headers: request.headers() }));
    context.on("response", (response) => { if (new URL(response.url()).pathname === workerPath) workerResponses.push(response); });
    await page.addInitScript(() => {
      window.formatterViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => window.formatterViolations.push({ directive: event.violatedDirective, blocked: event.blockedURI }));
    });
    const response = await page.goto(`/tools/json-formatter?lang=${locale}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"]).toBe("no-store");
    const workspace = page.locator("[data-json-formatter]");
    await expect(workspace).toHaveAttribute("data-format-ready", "true");
    const initial = requests.length;
    const cookies = await context.cookies();
    const input = page.getByRole("textbox", { name: copy.input, exact: true });
    const output = page.locator("[data-format-output]");
    const status = page.locator("[data-format-status]");
    const run = page.getByRole("button", { name: copy.format, exact: true });
    const sentinel = `SYNTHETIC_BTC_JSON_${locale}<img src=x onerror=alert(1)>`;
    const source = `{"id":9007199254740993,"id":-0,"n":1.2300e+999,"escape":"\\u0041\\/","private":${JSON.stringify(sentinel)}}`;
    await input.fill(source);
    await run.click();
    await expect(status).toHaveText(copy.success);
    const expected = `{\n  "id": 9007199254740993,\n  "id": -0,\n  "n": 1.2300e+999,\n  "escape": "\\u0041\\/",\n  "private": ${JSON.stringify(sentinel)}\n}`;
    await expect(output).toHaveValue(expected);
    expect(await workspace.locator("img").count()).toBe(0);
    await page.locator("[data-format-indent]").selectOption("4");
    await run.click();
    await expect(output).toHaveValue(expected.replace(/^  /gm, "    "));
    // Same-task cancellation/replacement avoids racing against a deliberately fast formatter.
    await page.evaluate(() => {
      document.querySelector("[data-format-run]").click();
      document.querySelector("[data-format-cancel]").click();
    });
    await expect(workspace).toHaveAttribute("data-format-state", "cancelled");
    await page.evaluate(() => {
      document.querySelector("[data-format-run]").click();
      document.querySelector("[data-format-run]").click();
    });
    await expect(status).toHaveText(copy.success);
    await expect(output).toHaveValue(expected.replace(/^  /gm, "    "));

    await input.fill('{"invalid":1,}');
    await run.click();
    await expect(status).toHaveText(copy.error);
    expect(await input.textContent()).toBe('{"invalid":1,}');
    await input.fill(source);
    await run.click();
    await expect(status).toHaveText(copy.success);
    await expect(output).toHaveValue(expected.replace(/^  /gm, "    "));
    await input.focus();
    await input.press("Escape");
    await input.press("Tab");
    await expect(page.locator("[data-format-indent]")).toBeFocused();
    expect(await workspace.locator("form").count()).toBe(0);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    expect(await page.evaluate(() => window.formatterViolations)).toEqual([]);
    expect(await context.cookies()).toEqual(cookies);
    expect(await page.evaluate(async () => ({ local: localStorage.length, session: sessionStorage.length, databases: (await indexedDB.databases()).length, caches: (await caches.keys()).length })))
      .toEqual({ local: 0, session: 0, databases: 0, caches: 0 });
    for (const [index, request] of requests.entries()) {
      const url = new URL(request.url);
      expect(url.origin).toBe(new URL(baseURL).origin);
      expect(request.method).toBe("GET");
      expect(request.body).toBeNull();
      if (index === 0) expect(url.pathname).toBe("/tools/json-formatter");
      else {
        expect(assets.has(url.pathname)).toBe(true);
        expect(url.search).toBe("");
        expect(url.hash).toBe("");
      }
      if (index >= initial) expect(url.pathname).toBe(workerPath);
      expect(JSON.stringify(request)).not.toContain("SYNTHETIC_BTC_JSON_");
    }
    expect(workerResponses.length).toBeGreaterThanOrEqual(1);
    for (const worker of workerResponses) {
      expect(worker.status()).toBe(200);
      const headers = worker.headers();
      expect(headers["content-security-policy"]).toContain("connect-src 'none'");
      expect(headers["content-security-policy"]).not.toMatch(/unsafe-eval|unsafe-inline/);
      expect(headers["cache-control"]).toContain("immutable");
      expect(headers["content-type"]).toMatch(/javascript/);
      expect(headers["x-content-type-options"]).toBe("nosniff");
    }
    const asset = await context.request.get(workerPath);
    expect(await asset.body()).toEqual(readFileSync(new URL("../../target/frontend/static" + workerPath, import.meta.url)));
    expect(readFileSync(new URL("../../target/home-browser-server.log", import.meta.url), "utf8")).not.toContain("SYNTHETIC_BTC_JSON_");
  });

  test(`JSON formatter ${locale}: no-JS explanation and failed enhancement`, async ({ browser, baseURL }) => {
    const disabled = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await disabled.newPage();
      await page.goto(`${baseURL}/tools/json-formatter?lang=${locale}`);
      await expect(page.locator("noscript p")).toBeVisible();
      await expect(page.locator("[data-format-run]")).toBeDisabled();
      await expect(page.locator("[data-json-formatter] form")).toHaveCount(0);
    } finally { await disabled.close(); }
    const context = await browser.newContext();
    try {
      const page = await context.newPage();
      await page.route(`**${lazyPath}`, (route) => route.abort());
      await page.goto(`${baseURL}/tools/json-formatter?lang=${locale}`);
      await expect(page.locator("[data-json-formatter]")).toHaveAttribute("data-format-ready", "false");
      await expect(page.locator("[data-format-run]")).toBeDisabled();
      await expect(page.locator("[data-format-status]")).toHaveText(copy.unavailable);
    } finally { await context.close(); }
  });
}

test("JSON formatter: ordinary Home and index visits never load tool/editor assets", async ({ page }) => {
  for (const path of ["/", "/tools"]) {
    const requests = [];
    const listener = (request) => requests.push(new URL(request.url()).pathname);
    page.on("request", listener);
    await page.goto(path);
    expect(requests).not.toContain(lazyPath);
    expect(requests).not.toContain(workerPath);
    expect(requests.some((url) => url.includes("editor-workspace"))).toBe(false);
    page.off("request", listener);
  }
});
