import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../../target/frontend/asset-manifest.json", import.meta.url), "utf8"));
const assetPath = (file) => "/" + file.replace(/^static\//, "");
const workerPath = assetPath(manifest["__json-formatter-worker"].file);
const lazyPath = assetPath(manifest["tools/json/formatter-workspace.ts"].file);
const assets = new Set(Object.values(manifest).flatMap((entry) => [entry.file, ...(entry.css || [])]).map(assetPath));
assets.add("/brand/b-composition.png");
const failAsset = (route) => route.fulfill({ status: 503, contentType: "text/javascript", headers: { "cache-control": "no-store" }, body: "" });
const minifierCopy = {
  en: { run: "Minify JSON", current: "Current minified output", stale: "The previous output is no longer current. Minify again to update it.", copied: "Result copied.", cleared: "Workspace cleared." },
  es: { run: "Minificar JSON", current: "Salida minificada actual", stale: "La salida anterior ya no está actualizada. Minifica de nuevo para actualizarla.", copied: "Resultado copiado.", cleared: "Espacio de trabajo vaciado." },
  fr: { run: "Minifier le JSON", current: "Sortie minifiée actuelle", stale: "La sortie précédente n’est plus à jour. Minifiez à nouveau pour la mettre à jour.", copied: "Résultat copié.", cleared: "Espace de travail vidé." },
};
const messages = {
  en: { input: "Content editor", run: "Validate JSON", valid: "Valid JSON.", ready: "Ready to validate locally. No current verdict.", syntax: "Invalid JSON at line {0}, column {1}.", depth: "JSON exceeds the nesting limit of 128. Your input was kept.", limit: "Input exceeds the 1 MiB UTF-8 limit. Existing content was kept.", cleared: "Workspace cleared.", unavailable: "Processing is not available until JavaScript and the editor have loaded." },
  es: { input: "Editor de contenido", run: "Validar JSON", valid: "JSON válido.", ready: "Listo para validar localmente. No hay un resultado de validación actual.", syntax: "JSON no válido en la línea {0}, columna {1}.", depth: "El JSON supera el límite de anidamiento de 128. Se conservó la entrada.", limit: "La entrada supera el límite de 1 MiB en UTF-8. Se conservó el contenido anterior.", cleared: "Espacio de trabajo vaciado.", unavailable: "El procesamiento no está disponible hasta que se carguen JavaScript y el editor." },
  fr: { input: "Éditeur de contenu", run: "Valider le JSON", valid: "JSON valide.", ready: "Prêt à valider localement. Aucun verdict actuel.", syntax: "JSON non valide à la ligne {0}, colonne {1}.", depth: "Le JSON dépasse la limite de 128 niveaux d’imbrication. L’entrée a été conservée.", limit: "La saisie dépasse la limite de 1 MiB en UTF-8. Le contenu précédent a été conservé.", cleared: "Espace de travail vidé.", unavailable: "Le traitement n’est pas disponible tant que JavaScript et l’éditeur ne sont pas chargés." },
};

async function paste(input, source) {
  await input.focus();
  await input.press("Control+a");
  await input.evaluate((node, text) => {
    const data = new DataTransfer();
    data.setData("text/plain", text);
    const event = new ClipboardEvent("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "clipboardData", { value: data });
    node.dispatchEvent(event);
  }, source);
}

for (const [locale, copy] of Object.entries(messages)) {
  test(`JSON validator ${locale}: published Home to Tools to Validator journey`, async ({ browser, baseURL }) => {
    const page = await browser.newPage({ locale, baseURL });
    try {
      await page.goto("/");
      await page.locator(`.section-grid a[href="/tools?lang=${locale}"]`).click();
      await expect(page.locator(`main a[href="/tools/json-formatter?lang=${locale}"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/tools/json-minifier?lang=${locale}"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/tools/base64?lang=${locale}"]`)).toHaveCount(1);
      await expect(page.locator(`nav a[href="/learn?lang=${locale}"]`)).toHaveCount(1);
      await page.locator(`main a[href="/tools/json-validator?lang=${locale}"]`).click();
      await expect(page).toHaveURL(`${baseURL}/tools/json-validator?lang=${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("[data-json-validator]")).toHaveAttribute("data-format-ready", "true");
      await page.getByRole("textbox", { name: copy.input, exact: true }).fill("null");
      await page.getByRole("button", { name: copy.run, exact: true }).click();
      await expect(page.locator("[data-format-status]")).toHaveText(copy.valid);
    } finally { await page.close(); }
  });

  test(`JSON validator ${locale}: F07-UH01-AC01 real worker, verdict ownership, privacy and CSP`, async ({ page, context, baseURL }) => {
    const requests = [];
    const workerResponses = [];
    context.on("request", (request) => requests.push({ url: request.url(), method: request.method(), body: request.postData(), headers: request.headers() }));
    context.on("response", (response) => { if (new URL(response.url()).pathname === workerPath) workerResponses.push(response); });
    await page.addInitScript(() => {
      window.validatorViolations = [];
      window.validatorClipboardCalls = 0;
      document.addEventListener("securitypolicyviolation", (event) => window.validatorViolations.push({ directive: event.violatedDirective, blocked: event.blockedURI }));
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
        readText: () => { window.validatorClipboardCalls++; return Promise.reject(new Error("Unexpected read")); },
        writeText: () => { window.validatorClipboardCalls++; return Promise.reject(new Error("Unexpected write")); },
      } });
    });
    const response = await page.goto(`/tools/json-validator?lang=${locale}`);
    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"]).toBe("no-store");
    const workspace = page.locator("[data-json-validator]");
    await expect(workspace).toHaveAttribute("data-format-ready", "true");
    await expect(workspace.locator("[data-format-copy], [data-format-output], [data-format-indent], form")).toHaveCount(0);
    const input = page.getByRole("textbox", { name: copy.input, exact: true });
    const run = page.getByRole("button", { name: copy.run, exact: true });
    const status = page.locator("[data-format-status]");
    const cookies = await context.cookies();
    const initial = requests.length;
    const sentinel = `SYNTHETIC_BTC_VALIDATOR_${locale}<img src=x onerror=alert(1)>`;
    const source = `{"id":9007199254740993,"id":-0,"n":1.2300e+999,"escape":"\\u0041\\/","private":${JSON.stringify(sentinel)}}`;
    for (const text of ["true", "null", "1e999", '"a b"', "[]", source]) {
      await input.fill(text);
      await expect(status).toHaveText(copy.ready);
      await run.click();
      await expect(status).toHaveText(copy.valid);
      expect((await input.locator(".cm-line").allTextContents()).join("\n")).toBe(text);
      await expect(workspace).toHaveAttribute("data-format-current", "true");
    }
    expect(await workspace.locator("img").count()).toBe(0);
    await input.focus();
    await input.press("Escape");
    await input.press("Tab");
    await expect(run).toBeFocused();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.evaluate(() => {
      document.querySelector("[data-format-run]").click();
      document.querySelector("[data-format-cancel]").click();
    });
    await expect(workspace).toHaveAttribute("data-format-state", "cancelled");
    await expect(workspace).toHaveAttribute("data-format-current", "false");
    await page.evaluate(() => {
      document.querySelector("[data-format-run]").click();
      document.querySelector("[data-format-run]").click();
    });
    await expect(status).toHaveText(copy.valid);
    await input.fill("//PRIVATE_INVALID");
    await run.click();
    await expect(status).toHaveText(copy.syntax.replace("{0}", "1").replace("{1}", "1"));
    await page.locator("[data-format-clear]").click();
    await expect(status).toHaveText(copy.cleared);
    await expect(page.locator("[data-format-clear]")).toBeFocused();
    await expect(workspace).toHaveAttribute("data-format-current", "false");
    expect(await input.textContent()).toBe("");
    await input.focus();
    await input.press("Control+z");
    expect(await input.textContent()).toBe("");
    expect(await page.evaluate(() => window.validatorClipboardCalls)).toBe(0);
    expect(await page.evaluate(() => window.validatorViolations)).toEqual([]);
    expect(await context.cookies()).toEqual(cookies);
    expect(await page.evaluate(async () => ({ local: localStorage.length, session: sessionStorage.length, databases: (await indexedDB.databases()).length, caches: (await caches.keys()).length })))
      .toEqual({ local: 0, session: 0, databases: 0, caches: 0 });
    for (const [index, request] of requests.entries()) {
      const url = new URL(request.url);
      expect(url.origin).toBe(new URL(baseURL).origin);
      expect(request.method).toBe("GET");
      expect(request.body).toBeNull();
      if (index === 0) expect(url.pathname).toBe("/tools/json-validator");
      else {
        expect(assets.has(url.pathname)).toBe(true);
        expect(url.search).toBe("");
        expect(url.hash).toBe("");
      }
      if (index >= initial) expect(url.pathname).toBe(workerPath);
      expect(JSON.stringify(request)).not.toContain("SYNTHETIC_BTC_VALIDATOR_");
    }
    expect(workerResponses.length).toBeGreaterThan(0);
    for (const worker of workerResponses) {
      const headers = worker.headers();
      expect(headers["content-security-policy"]).toContain("connect-src 'none'");
      expect(headers["content-security-policy"]).not.toMatch(/unsafe-eval|unsafe-inline/);
      expect(headers["cache-control"]).toContain("immutable");
      expect(headers["content-type"]).toMatch(/javascript/);
      expect(headers["x-content-type-options"]).toBe("nosniff");
    }
    const worker = await context.request.get(workerPath);
    expect(await worker.body()).toEqual(readFileSync(new URL("../../target/frontend/static" + workerPath, import.meta.url)));
    expect(readFileSync(new URL("../../target/home-browser-server.log", import.meta.url), "utf8")).not.toContain("SYNTHETIC_BTC_VALIDATOR_");
  });

  test(`JSON validator ${locale}: F07-UH01-AC02 diagnostics, retained rejected edits and Back clearing`, async ({ page }) => {
    await page.goto(`/tools/json-validator?lang=${locale}`);
    const workspace = page.locator("[data-json-validator]");
    await expect(workspace).toHaveAttribute("data-format-ready", "true");
    const input = page.getByRole("textbox", { name: copy.input, exact: true });
    const run = page.locator("[data-format-run]");
    const status = page.locator("[data-format-status]");
    for (const [source, line, column] of [
      ["", 1, 1], ["  ", 1, 3], ['{"id":1,}', 1, 9], ["//PRIVATE_COMMENT\n{}", 1, 1],
      ["{} {}", 1, 4], ['[\r\n"😀",]', 2, 5], ['[\r\n"😀"', 2, 4], ['"unfinished', 1, 12],
    ]) {
      if (source.includes("\r\n")) await paste(input, source);
      else await input.fill(source);
      await run.click();
      await expect(status).toHaveText(copy.syntax.replace("{0}", String(line)).replace("{1}", String(column)));
      expect((await input.locator(".cm-line").allTextContents()).join("\n")).toBe(source.replace(/\r\n/g, "\n"));
      await expect(workspace).toHaveAttribute("data-format-current", "false");
    }
    await input.fill("[".repeat(129) + "0" + "]".repeat(129));
    await run.click();
    await expect(status).toHaveText(copy.depth);
    for (const source of ["true", "//comment"]) {
      await input.fill(source);
      await run.click();
      await expect(workspace).toHaveAttribute("data-format-state", source === "true" ? "success" : "error");
      const verdict = await status.textContent();
      await paste(input, "😀".repeat(256 * 1024) + "x");
      expect(await input.textContent()).toBe(source);
      await expect(status).toHaveText(verdict);
      await expect(page.locator("[data-editor-feedback]")).toHaveText(copy.limit);
    }
    await page.locator("[data-format-clear]").click();
    await expect(page.locator("[data-editor-feedback]")).toBeEmpty();
    await input.fill("true");
    await run.click();
    await expect(status).toHaveText(copy.valid);
    await page.goto("/tools");
    await page.goBack();
    expect((await page.locator(".cm-content").allTextContents()).join("")).toBe("");
    await expect(page.locator("[data-json-validator]")).toHaveAttribute("data-format-current", "false");
    await expect(page.locator("[data-format-status]")).not.toHaveText(copy.valid);
  });

  test(`JSON validator ${locale}: no-JS and lazy load failure feedback`, async ({ browser, baseURL }) => {
    const disabled = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await disabled.newPage();
      await page.goto(`${baseURL}/tools/json-validator?lang=${locale}`);
      await expect(page.locator("noscript p")).toBeVisible();
      await expect(page.locator("[data-format-run]")).toBeDisabled();
      await expect(page.locator("[data-json-validator] form")).toHaveCount(0);
    } finally { await disabled.close(); }
    const context = await browser.newContext();
    try {
      const page = await context.newPage();
      await page.route(`**${lazyPath}`, failAsset);
      await page.goto(`${baseURL}/tools/json-validator?lang=${locale}`);
      await expect(page.locator("[data-json-validator]")).toHaveAttribute("data-format-ready", "false");
      await expect(page.locator("[data-format-run]")).toBeDisabled();
      await expect(page.locator("[data-format-status]")).toHaveText(copy.unavailable);
    } finally { await context.close(); }
  });

  test(`JSON validator ${locale}: lazy load recovery after reload`, async ({ browser, baseURL }) => {
    // F19: retry the previously deferred WebKit module-failure recovery checks.
    const context = await browser.newContext();
    try {
      const page = await context.newPage();
      await page.route(`**${lazyPath}`, failAsset);
      await page.goto(`${baseURL}/tools/json-validator?lang=${locale}`);
      await expect(page.locator("[data-json-validator]")).toHaveAttribute("data-format-ready", "false");
      await expect(page.locator("[data-format-status]")).toHaveText(copy.unavailable);
      await page.unroute(`**${lazyPath}`);
      await page.reload();
      await expect(page.locator("[data-json-validator]")).toHaveAttribute("data-format-ready", "true");
    } finally { await context.close(); }
  });

  test(`JSON validator ${locale}: worker load failure preserves input and permits retry`, async ({ page }) => {
    await page.goto(`/tools/json-validator?lang=${locale}`);
    await expect(page.locator("[data-json-validator]")).toHaveAttribute("data-format-ready", "true");
    const input = page.getByRole("textbox", { name: copy.input, exact: true });
    await input.fill("true");
    await page.route(`**${workerPath}`, failAsset);
    await page.locator("[data-format-run]").click();
    await expect(page.locator("[data-json-validator]")).toHaveAttribute("data-format-state", "error");
    expect(await input.textContent()).toBe("true");
    await page.unroute(`**${workerPath}`);
    await page.locator("[data-format-run]").click();
    await expect(page.locator("[data-format-status]")).toHaveText(copy.valid);
  });
}

test("JSON validator: real limits, controlled deadline and clean retry", async ({ page }) => {
  await page.goto("/tools/json-validator?lang=en");
  const workspace = page.locator("[data-json-validator]");
  await expect(workspace).toHaveAttribute("data-format-ready", "true");
  const input = page.getByRole("textbox", { name: messages.en.input, exact: true });
  const run = page.locator("[data-format-run]");
  for (const source of ['"' + "a".repeat(1024 * 1024 - 2) + '"', "[".repeat(128) + "0,".repeat(20_000) + "0" + "]".repeat(128)]) {
    await input.fill(source);
    await run.click();
    await expect(page.locator("[data-format-status]")).toHaveText(messages.en.valid);
    // CodeMirror virtualises large lines. Its explicit copy event reads the
    // complete selected document, without using the real system clipboard.
    await input.focus();
    await input.press("Control+a");
    const preserved = await input.evaluate((node) => {
      const data = new DataTransfer();
      const event = new ClipboardEvent("copy", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "clipboardData", { value: data });
      node.dispatchEvent(event);
      return data.getData("text/plain");
    });
    expect(preserved).toBe(source);
  }
  await input.fill("true");
  await page.route(`**${workerPath}`, async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), "cache-control": "no-store" },
      body: "self.onmessage = () => { while (true) {} };",
    });
  });
  await run.click();
  await expect(workspace).toHaveAttribute("data-format-state", "timeout");
  expect(await input.textContent()).toBe("true");
  await page.unroute(`**${workerPath}`);
  await run.click();
  await expect(page.locator("[data-format-status]")).toHaveText(messages.en.valid);
});

for (const [locale, copy] of Object.entries(minifierCopy)) {
  test(`JSON minifier ${locale}: published Home to Tools to Minifier journey`, async ({ browser, baseURL }) => {
    const page = await browser.newPage({ locale, baseURL });
    try {
      await page.goto("/");
      await page.locator(`.section-grid a[href="/tools?lang=${locale}"]`).click();
      for (const tool of ["formatter", "validator", "minifier"])
        await expect(page.locator(`main a[href="/tools/json-${tool}?lang=${locale}"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/tools/base64?lang=${locale}"]`)).toHaveCount(1);
      await expect(page.locator(`nav a[href="/learn?lang=${locale}"]`)).toHaveCount(1);
      await page.locator(`main a[href="/tools/json-minifier?lang=${locale}"]`).click();
      await expect(page).toHaveURL(`${baseURL}/tools/json-minifier?lang=${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("[data-json-minifier]")).toHaveAttribute("data-format-ready", "true");
      await page.getByRole("textbox", { name: messages[locale].input, exact: true }).fill(" [ true, null ] ");
      await page.getByRole("button", { name: copy.run, exact: true }).click();
      await expect(page.locator("[data-format-output]")).toHaveText("[true,null]");
    } finally { await page.close(); }
  });

  test(`JSON minifier ${locale}: fidelity, stale Copy, Clear and all-action privacy`, async ({ page, context, baseURL }) => {
    const requests = [];
    context.on("request", (request) => requests.push({ url: request.url(), method: request.method(), body: request.postData(), headers: request.headers() }));
    await page.addInitScript(() => {
      window.minifierWrites = [];
      window.minifierViolations = [];
      document.addEventListener("securitypolicyviolation", (event) => window.minifierViolations.push(event.violatedDirective));
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
        readText: () => { throw new Error("Unexpected clipboard read"); },
        writeText: async (text) => { window.minifierWrites.push(text); },
      } });
    });
    await page.goto(`/tools/json-minifier?lang=${locale}`);
    const workspace = page.locator("[data-json-minifier]");
    await expect(workspace).toHaveAttribute("data-format-ready", "true");
    const input = page.getByRole("textbox", { name: messages[locale].input, exact: true });
    const run = page.getByRole("button", { name: copy.run, exact: true });
    const output = page.locator("[data-format-output]");
    const copyButton = page.locator("[data-format-copy]");
    const status = page.locator("[data-format-status]");
    const cookies = await context.cookies();
    await expect(copyButton).toBeDisabled();
    const sentinel = `SYNTHETIC_BTC_MINIFIER_${locale}<img src=x onerror=alert(1)>`;
    const compact = `{"id":9007199254740993,"id":-0,"n":1.2300e+999,"s":"\\u0041\\/ a b","private":${JSON.stringify(sentinel)}}`;
    const source = " \t" + compact.replace(/,/g, ", ") + " \n";
    await paste(input, source);
    await run.click();
    await expect(output).toHaveText(compact);
    expect((await input.locator(".cm-line").allTextContents()).join("\n")).toBe(source);
    await expect(page.locator("[data-format-output-label]")).toHaveText(copy.current);
    expect(await page.evaluate(() => window.minifierWrites)).toEqual([]);
    await copyButton.click();
    expect(await page.evaluate(() => window.minifierWrites)).toEqual([compact]);
    await expect(status).toHaveText(copy.copied);
    await input.fill("//PRIVATE_INVALID");
    await expect(status).toHaveText(copy.stale);
    await expect(copyButton).toBeDisabled();
    await run.click();
    await expect(status).toHaveText(messages[locale].syntax.replace("{0}", "1").replace("{1}", "1"));
    await expect(output).toHaveText(compact);
    await expect(copyButton).toBeDisabled();
    await input.fill("true");
    await page.evaluate(() => {
      document.querySelector("[data-format-run]").click();
      document.querySelector("[data-format-cancel]").click();
    });
    await expect(workspace).toHaveAttribute("data-format-state", "cancelled");
    await expect(copyButton).toBeDisabled();
    await page.evaluate(() => {
      document.querySelector("[data-format-run]").click();
      document.querySelector("[data-format-run]").click();
    });
    await expect(output).toHaveText("true");
    await expect(copyButton).toBeEnabled();
    await input.focus();
    await input.press("Escape");
    await input.press("Tab");
    await expect(run).toBeFocused();
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    await page.locator("[data-format-clear]").click();
    await expect(status).toHaveText(copy.cleared);
    await expect(page.locator("[data-format-clear]")).toBeFocused();
    await expect(output).toBeEmpty();
    await expect(copyButton).toBeDisabled();
    await input.focus();
    await input.press("Control+z");
    expect(await input.textContent()).toBe("");
    await input.fill("null");
    await run.click();
    await expect(output).toHaveText("null");
    await page.goto("/tools");
    await page.goBack();
    await expect(page.locator("[data-format-output]")).toBeEmpty();
    expect((await page.locator(".cm-content").allTextContents()).join("")).toBe("");
    await expect(page.locator("[data-format-copy]")).toBeDisabled();
    expect(await context.cookies()).toEqual(cookies);
    expect(await page.evaluate(() => ({ local: localStorage.length, session: sessionStorage.length }))).toEqual({ local: 0, session: 0 });
    expect(await page.evaluate(() => window.minifierViolations)).toEqual([]);
    for (const request of requests) {
      const url = new URL(request.url);
      expect(url.origin).toBe(new URL(baseURL).origin);
      expect(request.method).toBe("GET");
      expect(request.body).toBeNull();
      expect(["/tools/json-minifier", "/tools"].includes(url.pathname) || assets.has(url.pathname)).toBe(true);
      if (assets.has(url.pathname)) { expect(url.search).toBe(""); expect(url.hash).toBe(""); }
      expect(JSON.stringify(request)).not.toContain("SYNTHETIC_BTC_MINIFIER_");
    }
    expect(readFileSync(new URL("../../target/home-browser-server.log", import.meta.url), "utf8")).not.toContain("SYNTHETIC_BTC_MINIFIER_");
  });
}

test("JSON minifier: no-JS explanation and worker-load retry", async ({ browser, page, baseURL }) => {
  const disabled = await browser.newContext({ javaScriptEnabled: false });
  try {
    const noJs = await disabled.newPage();
    await noJs.goto(`${baseURL}/tools/json-minifier?lang=en`);
    await expect(noJs.locator("noscript p")).toBeVisible();
    await expect(noJs.locator("[data-format-run]")).toBeDisabled();
    await expect(noJs.locator("[data-json-minifier] form")).toHaveCount(0);
  } finally { await disabled.close(); }
  await page.goto("/tools/json-minifier?lang=en");
  await expect(page.locator("[data-json-minifier]")).toHaveAttribute("data-format-ready", "true");
  await page.getByRole("textbox", { name: messages.en.input, exact: true }).fill(" [ 1, 2 ] ");
  await page.route(`**${workerPath}`, failAsset);
  await page.locator("[data-format-run]").click();
  await expect(page.locator("[data-json-minifier]")).toHaveAttribute("data-format-state", "error");
  await expect(page.locator("[data-format-copy]")).toBeDisabled();
  expect(await page.locator(".cm-content").textContent()).toBe(" [ 1, 2 ] ");
  await page.unroute(`**${workerPath}`);
  await page.locator("[data-format-run]").click();
  await expect(page.locator("[data-format-output]")).toHaveText("[1,2]");
});
