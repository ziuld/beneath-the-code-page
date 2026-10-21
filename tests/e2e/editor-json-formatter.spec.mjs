import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../../target/frontend/asset-manifest.json", import.meta.url), "utf8"));
const assetPath = (file) => "/" + file.replace(/^static\//, "");
const workerPath = assetPath(manifest["__json-formatter-worker"].file);
const lazyPath = assetPath(manifest["tools/json/formatter-workspace.ts"].file);
const assets = new Set(Object.values(manifest).flatMap((entry) => [entry.file, ...(entry.css || [])]).map(assetPath));
assets.add("/brand/b-composition.png");
const messages = {
  en: { format: "Format JSON", input: "Content editor", success: "Processing completed.", syntax: "Invalid JSON at line {0}, column {1}.", stale: "The previous output is no longer current. Format again to update it.", depth: "JSON exceeds the nesting limit of 128. Your input was kept.", unavailable: "Processing is not available until JavaScript and the editor have loaded." },
  es: { format: "Formatear JSON", input: "Editor de contenido", success: "Procesamiento completado.", syntax: "JSON no válido en la línea {0}, columna {1}.", stale: "La salida anterior ya no está actualizada. Vuelve a formatear para actualizarla.", depth: "El JSON supera el límite de anidamiento de 128. Se conservó la entrada.", unavailable: "El procesamiento no está disponible hasta que se carguen JavaScript y el editor." },
  fr: { format: "Formater le JSON", input: "Éditeur de contenu", success: "Traitement terminé.", syntax: "JSON non valide à la ligne {0}, colonne {1}.", stale: "Le résultat précédent n’est plus à jour. Formatez à nouveau pour l’actualiser.", depth: "Le JSON dépasse la limite de 128 niveaux d’imbrication. L’entrée a été conservée.", unavailable: "Le traitement n’est pas disponible tant que JavaScript et l’éditeur ne sont pas chargés." },
};

const actionMessages = {
  en: { copy: "Copy result", clear: "Clear workspace", copied: "Result copied.", failed: "The result could not be copied. Your content was kept.", unavailable: "Clipboard access is unavailable. Your content was kept.", cleared: "Workspace cleared." },
  es: { copy: "Copiar resultado", clear: "Vaciar espacio de trabajo", copied: "Resultado copiado.", failed: "No se pudo copiar el resultado. Se conservó el contenido.", unavailable: "El acceso al portapapeles no está disponible. Se conservó el contenido.", cleared: "Espacio de trabajo vaciado." },
  fr: { copy: "Copier le résultat", clear: "Vider l’espace de travail", copied: "Résultat copié.", failed: "Le résultat n’a pas pu être copié. Votre contenu a été conservé.", unavailable: "L’accès au presse-papiers est indisponible. Votre contenu a été conservé.", cleared: "Espace de travail vidé." },
};

for (const [locale, copy] of Object.entries(messages)) {
  test(`JSON formatter ${locale}: accepted Home to Tools to Formatter journey`, async ({ browser, baseURL }) => {
    const page = await browser.newPage({ locale, baseURL });
    try {
      await page.goto("/");
      await expect(page.locator(`a[href="/learn?lang=${locale}"]`)).toHaveCount(3);
      await page.locator(`.section-grid a[href="/tools?lang=${locale}"]`).click();
      await expect(page).toHaveURL(`${baseURL}/tools?lang=${locale}`);
      await expect(page.locator(`main a[href="/tools/json-formatter?lang=${locale}"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/tools/json-validator?lang=${locale}"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/tools/json-minifier?lang=${locale}"]`)).toHaveCount(1);
      await expect(page.locator(`main a[href="/tools/base64?lang=${locale}"]`)).toHaveCount(1);
      await page.locator(`main a[href="/tools/json-formatter?lang=${locale}"]`).click();
      await expect(page).toHaveURL(`${baseURL}/tools/json-formatter?lang=${locale}`);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("[data-json-formatter]")).toHaveAttribute("data-format-ready", "true");
      await page.getByRole("textbox", { name: copy.input, exact: true }).fill('{"id":9007199254740993}');
      await page.getByRole("button", { name: copy.format, exact: true }).click();
      await expect.poll(() => page.locator("[data-format-output]").textContent()).toBe('{\n  "id": 9007199254740993\n}');
    } finally { await page.close(); }
  });
  test(`JSON formatter ${locale}: real worker, fidelity, recovery, CSP and privacy`, async ({ page, context, baseURL }) => {
    const requests = [];
    const workerResponses = [];
    context.on("request", (request) => requests.push({ url: request.url(), method: request.method(), body: request.postData(), headers: request.headers() }));
    context.on("response", (response) => { if (new URL(response.url()).pathname === workerPath) workerResponses.push(response); });
    await page.addInitScript(() => {
      window.formatterViolations = [];
      window.clipboardWrites = [];
      window.clipboardReads = 0;
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
        writeText: async (text) => { window.clipboardWrites.push(text); },
        readText: async () => { window.clipboardReads++; throw new Error("Unexpected read"); },
      } });
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
    await expect.poll(() => output.textContent()).toBe(expected);
    expect(await workspace.locator("img").count()).toBe(0);
    await page.locator("[data-format-indent]").selectOption("4");
    await run.click();
    await expect.poll(() => output.textContent()).toBe(expected.replace(/^  /gm, "    "));
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
    await expect.poll(() => output.textContent()).toBe(expected.replace(/^  /gm, "    "));

    await input.fill('{"invalid":1,}');
    await run.click();
    await expect(status).toHaveText(copy.syntax.replace("{0}", "1").replace("{1}", "14"));
    await expect(workspace).toHaveAttribute("data-format-current", "false");
    expect(await input.textContent()).toBe('{"invalid":1,}');
    await input.fill(source);
    await run.click();
    await expect(status).toHaveText(copy.success);
    await expect.poll(() => output.textContent()).toBe(expected.replace(/^  /gm, "    "));
    await expect(workspace).toHaveAttribute("data-format-current", "true");
    await input.focus();
    await input.press("Escape");
    await input.press("Tab");
    await expect(page.locator("[data-format-indent]")).toBeFocused();
    expect(await workspace.locator("form").count()).toBe(0);
    expect((await new AxeBuilder({ page }).analyze()).violations).toEqual([]);
    const actions = actionMessages[locale];
    const copyButton = page.getByRole("button", { name: actions.copy, exact: true });
    const clearButton = page.getByRole("button", { name: actions.clear, exact: true });
    expect(await page.evaluate(() => window.clipboardWrites)).toEqual([]);
    await copyButton.focus();
    await copyButton.press("Enter");
    await expect(status).toHaveText(actions.copied);
    expect(await page.evaluate(() => window.clipboardWrites)).toEqual([expected.replace(/^  /gm, "    ")]);
    await clearButton.focus();
    await clearButton.press("Space");
    await expect(status).toHaveText(actions.cleared);
    await expect(clearButton).toBeFocused();
    await expect(copyButton).toBeDisabled();
    await expect(output).toBeEmpty();
    expect(await input.textContent()).toBe("");
    await input.focus();
    await input.press("Control+z");
    expect(await input.textContent()).toBe("");
    expect(await page.evaluate(() => window.clipboardWrites)).toEqual([expected.replace(/^  /gm, "    ")]);
    expect(await page.evaluate(() => window.clipboardReads)).toBe(0);
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

  test(`JSON formatter ${locale}: positioned diagnostics, stale results and depth budget`, async ({ page }) => {
    await page.goto(`/tools/json-formatter?lang=${locale}`);
    const workspace = page.locator("[data-json-formatter]");
    await expect(workspace).toHaveAttribute("data-format-ready", "true");
    const input = page.getByRole("textbox", { name: copy.input, exact: true });
    const run = page.getByRole("button", { name: copy.format, exact: true });
    const status = page.locator("[data-format-status]");
    await input.fill("{}");
    await run.click();
    await expect(workspace).toHaveAttribute("data-format-current", "true");
    await input.fill("[]");
    await expect(workspace).toHaveAttribute("data-format-current", "false");
    await expect(status).toHaveText(copy.stale);
    await expect(page.locator("[data-format-output]")).toHaveText("{}");
    await run.click();
    await expect(workspace).toHaveAttribute("data-format-current", "true");
    await page.locator("[data-format-indent]").selectOption("4");
    await expect(workspace).toHaveAttribute("data-format-current", "false");
    await expect(status).toHaveText(copy.stale);
    for (const [source, line, column] of [
      ["", 1, 1], ["  ", 1, 3], ['{"id":1,}', 1, 9],
      ['//PRIVATE_COMMENT\n{}', 1, 1], ['{} {}', 1, 4],
      ['[\r\n"😀",]', 2, 5], ['[\r\n"😀"', 2, 4], ['"unfinished', 1, 12],
    ]) {
      if (source.includes("\r\n")) {
        // Exercise the editor's raw-text CRLF paste path, not the engines'
        // differing contenteditable insertText behaviour used by Playwright fill.
        await input.focus();
        await input.press("Control+a");
        await input.evaluate((node, text) => {
          const data = new DataTransfer();
          data.setData("text/plain", text);
          const event = new ClipboardEvent("paste", { bubbles: true, cancelable: true });
          Object.defineProperty(event, "clipboardData", { value: data });
          node.dispatchEvent(event);
        }, source);
      } else await input.fill(source);
      expect((await input.locator(".cm-line").allTextContents()).join("\n")).toBe(source.replace(/\r\n/g, "\n"));
      await run.click();
      await expect(status).toHaveText(copy.syntax.replace("{0}", String(line)).replace("{1}", String(column)));
      expect((await input.locator(".cm-line").allTextContents()).join("\n")).toBe(source.replace(/\r\n/g, "\n"));
      await expect(workspace).toHaveAttribute("data-format-current", "false");
      expect(await status.textContent()).not.toContain("PRIVATE_COMMENT");
    }
    await input.fill("[".repeat(129) + "0" + "]".repeat(129));
    await run.click();
    await expect(status).toHaveText(copy.depth);
    await expect(workspace).toHaveAttribute("data-format-current", "false");
    await input.fill("{}");
    await run.click();
    await expect(workspace).toHaveAttribute("data-format-current", "true");
    await input.focus();
    await input.press("Control+a");
    await input.evaluate((node) => {
      const data = new DataTransfer();
      data.setData("text/plain", "😀".repeat(256 * 1024) + "x");
      const event = new ClipboardEvent("paste", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "clipboardData", { value: data });
      node.dispatchEvent(event);
    });
    expect(await input.textContent()).toBe("{}");
    await expect(workspace).toHaveAttribute("data-format-current", "true");
    await page.evaluate(() => {
      document.querySelector("[data-format-run]").click();
      const node = document.querySelector(".cm-content");
      const data = new DataTransfer();
      data.setData("text/plain", "[]");
      const event = new ClipboardEvent("paste", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "clipboardData", { value: data });
      node.dispatchEvent(event);
    });
    await expect(workspace).toHaveAttribute("data-format-current", "false");
    await expect(status).toHaveText(copy.stale);
    await page.goto("/tools");
    await page.goBack();
    await expect(page.locator("[data-format-output]")).toBeEmpty();
    await expect(page.locator("[data-json-formatter]")).toHaveAttribute("data-format-current", "false");
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

  test(`JSON formatter ${locale}: clipboard failures, revision races and irreversible Clear`, async ({ page }) => {
    const actions = actionMessages[locale];
    await page.addInitScript(() => {
      window.clipboardWrites = [];
      window.clipboardReads = 0;
      window.clipboardMode = "denied";
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: {
        writeText: (text) => {
          window.clipboardWrites.push(text);
          if (window.clipboardMode === "pending") return new Promise((resolve, reject) => { window.finishCopy = resolve; window.failCopy = reject; });
          return Promise.reject(new Error("PRIVATE"));
        },
        readText: async () => { window.clipboardReads++; throw new Error("Unexpected read"); },
      } });
    });
    await page.goto(`/tools/json-formatter?lang=${locale}`);
    const workspace = page.locator("[data-json-formatter]");
    await expect(workspace).toHaveAttribute("data-format-ready", "true");
    const input = page.getByRole("textbox", { name: copy.input, exact: true });
    const run = page.locator("[data-format-run]");
    const output = page.locator("[data-format-output]");
    const status = page.locator("[data-format-status]");
    const copyButton = page.getByRole("button", { name: actions.copy, exact: true });
    const clearButton = page.getByRole("button", { name: actions.clear, exact: true });
    await expect(copyButton).toBeDisabled();
    await input.fill("{}");
    await run.click();
    await expect(copyButton).toBeEnabled();
    await copyButton.focus();
    await copyButton.press("Space");
    await expect(status).toHaveText(actions.failed);
    expect(await input.textContent()).toBe("{}");
    expect(await output.textContent()).toBe("{}");
    await expect(copyButton).toBeEnabled();
    await page.evaluate(() => { window.clipboardMode = "pending"; });
    await copyButton.click();
    await input.fill("[]");
    await expect(copyButton).toBeDisabled();
    await run.click();
    await expect(status).toHaveText(copy.success);
    await page.evaluate(() => window.finishCopy());
    await expect(status).toHaveText(copy.success);
    await copyButton.click();
    await clearButton.click();
    await page.evaluate(() => window.failCopy(new Error("PRIVATE")));
    await expect(status).toHaveText(actions.cleared);
    await expect(output).toBeEmpty();
    await expect(copyButton).toBeDisabled();
    await expect(clearButton).toBeFocused();
    expect(await input.textContent()).toBe("");
    await input.focus();
    await input.press("Control+z");
    await input.press("Control+Shift+z");
    expect(await input.textContent()).toBe("");
    await input.fill("[1,]");
    await run.click();
    await expect(workspace).toHaveAttribute("data-format-state", "error");
    await expect(copyButton).toBeDisabled();
    await clearButton.click();
    await expect(status).toHaveText(actions.cleared);
    await clearButton.click();
    await expect(status).toHaveText(actions.cleared);
    await input.fill("{}");
    const state = await page.evaluate(() => {
      document.querySelector("[data-format-run]").click();
      const running = document.querySelector("[data-json-formatter]").dataset.formatState;
      document.querySelector("[data-format-clear]").click();
      return running;
    });
    expect(state).toBe("running");
    await expect(status).toHaveText(actions.cleared);
    await expect(output).toBeEmpty();
    expect(await input.textContent()).toBe("");
    await input.fill("{}");
    await run.click();
    await expect(copyButton).toBeEnabled();
    await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { value: undefined, configurable: true }));
    await copyButton.click();
    await expect(status).toHaveText(actions.unavailable);
    expect(await input.textContent()).toBe("{}");
    expect(await output.textContent()).toBe("{}");
    expect(await page.evaluate(() => window.clipboardReads)).toBe(0);
    expect(await page.evaluate(() => window.clipboardWrites)).toEqual(["{}", "{}", "[]"]);
  });

  test(`JSON formatter ${locale}: worker load failure keeps input and permits a safe retry`, async ({ page }) => {
    await page.goto(`/tools/json-formatter?lang=${locale}`);
    const workspace = page.locator("[data-json-formatter]");
    await expect(workspace).toHaveAttribute("data-format-ready", "true");
    const input = page.getByRole("textbox", { name: copy.input, exact: true });
    const run = page.getByRole("button", { name: copy.format, exact: true });
    await input.fill('{"id":9007199254740993}');
    await run.click();
    await expect(workspace).toHaveAttribute("data-format-current", "true");
    await page.route(`**${workerPath}`, (route) => route.abort());
    await run.click();
    await expect(workspace).toHaveAttribute("data-format-state", "error");
    await expect(workspace).toHaveAttribute("data-format-current", "false");
    expect(await input.textContent()).toBe('{"id":9007199254740993}');
    expect(await page.locator("[data-format-status]").textContent()).not.toContain("9007199254740993");
    await page.unroute(`**${workerPath}`);
    await run.click();
    await expect(page.locator("[data-format-status]")).toHaveText(copy.success);
    await expect(workspace).toHaveAttribute("data-format-current", "true");
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

test("JSON formatter: real size/reference responsiveness observations and bounded expansion", async ({ page }, testInfo) => {
  await page.goto("/tools/json-formatter?lang=en");
  const workspace = page.locator("[data-json-formatter]");
  await expect(workspace).toHaveAttribute("data-format-ready", "true");
  const input = page.getByRole("textbox", { name: messages.en.input, exact: true });
  const run = page.getByRole("button", { name: messages.en.format, exact: true });
  const output = page.locator("[data-format-output]");
  const status = page.locator("[data-format-status]");
  const observations = [];
  for (const size of [10 * 1024, 100 * 1024, 1024 * 1024]) {
    const started = performance.now();
    await input.fill('"' + "a".repeat(size - 2) + '"');
    const inserted = performance.now();
    const running = await run.evaluate((node) => { node.click(); return node.closest("[data-json-formatter]").dataset.formatState; });
    expect(running).toBe("running");
    await input.focus();
    await input.press("Escape");
    await input.press("Tab");
    await expect(page.locator("[data-format-indent]")).toBeFocused();
    await expect(status).toHaveText(messages.en.success);
    expect(await output.evaluate((node) => node.textContent.length)).toBe(size);
    observations.push({ inputBytes: size, insertObservedMs: inserted - started, jobObservedMs: performance.now() - inserted });
  }
  await page.locator("[data-format-indent]").selectOption("4");
  await input.fill("[".repeat(128) + "0,".repeat(5000) + "0" + "]".repeat(128));
  await run.click();
  await expect(status).toHaveText(messages.en.success);
  expect(await output.evaluate((node) => node.textContent.length)).toBeGreaterThan(1024 * 1024);
  await input.fill("[".repeat(128) + "0,".repeat(20000) + "0" + "]".repeat(128));
  await run.click();
  await expect(status).toHaveText("Output exceeds the 8 MiB UTF-8 limit. Existing output was kept.");
  await expect(workspace).toHaveAttribute("data-format-current", "false");
  console.log("Formatter reference observations:", JSON.stringify({ engine: testInfo.project.name, browser: page.context().browser().version(), hardwareConcurrency: await page.evaluate(() => navigator.hardwareConcurrency), observations }));
});
