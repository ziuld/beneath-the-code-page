import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const fixture = process.env.BTC_COMPONENT_URL;
const manifest = JSON.parse(readFileSync(new URL("../../target/frontend/asset-manifest.json", import.meta.url), "utf8"));
const workspaceModule = "/" + manifest["design-system/components/editor-workspace.ts"].file.replace(/^static\//, "");
const labels = {
  en: { editor: "Content editor", find: "Find", next: "next", continue: "Continue", match: "Search result on line 2.", close: "Close search" },
  es: { editor: "Editor de contenido", find: "Buscar", next: "siguiente", continue: "Continuar", match: "Resultado de búsqueda en la línea 2.", close: "Cerrar búsqueda" },
  fr: { editor: "Éditeur de contenu", find: "Rechercher", next: "suivant", continue: "Continuer", match: "Résultat de recherche à la ligne 2.", close: "Fermer la recherche" },
};

async function open(page, locale) {
  await page.addInitScript(() => {
    window.policyViolations = [];
    document.addEventListener("securitypolicyviolation", (event) => {
      window.policyViolations.push({
        directive: event.violatedDirective,
        resource: event.blockedURI,
        sourceFile: event.sourceFile,
        lineNumber: event.lineNumber,
        columnNumber: event.columnNumber,
        phase: window.editorProofPhase,
      });
    });
  });
  const response = await page.goto(`${fixture}/__editor-fixture?lang=${locale}`);
  await expect(page.locator("[data-editor-ready=true]")).toBeVisible();
  expect(response.headers()["content-security-policy"]).toContain("style-src-attr 'none'");
  return page.getByRole("textbox", { name: labels[locale].editor });
}

for (const [locale, label] of Object.entries(labels)) {
  test(`editor ${locale}: keyboard, private search announcements and axe`, async ({ page }) => {
    const input = await open(page, locale);
    await input.fill("PRIVATE_SENTINEL\nPRIVATE_SENTINEL");
    await input.press("Control+Home");
    await input.press("Control+f");
    const find = page.getByRole("textbox", { name: label.find, exact: true });
    await expect(find).toBeFocused();
    await find.fill("PRIVATE_SENTINEL");
    // CodeMirror commits on change/keyup; fill emits input, so blur first.
    await find.press("Tab");
    await page.getByRole("button", { name: label.next, exact: true }).click();
    await expect(page.locator(".cm-announced")).toHaveText(label.match.replace("2", "1"));
    await expect(page.locator(".cm-announced")).not.toContainText("PRIVATE_SENTINEL");
    await page.getByRole("button", { name: label.next, exact: true }).click();
    await expect(page.locator(".cm-announced")).toHaveText(label.match);
    await expect(page.locator(".cm-announced")).not.toContainText("PRIVATE_SENTINEL");
    await page.getByRole("button", { name: label.next, exact: true }).click();
    await expect(page.locator(".cm-announced")).toHaveText(label.match.replace("2", "1"));
    await expect(page.locator(".cm-announced")).not.toContainText("PRIVATE_SENTINEL");
    await find.focus();
    await find.press("Escape");
    await expect(find).toHaveCount(0);
    await expect(input).toBeFocused();
    await input.press("Escape");
    await input.press("Tab");
    await expect(page.locator("[data-editor-workspace] > button")).toBeFocused();
    await page.keyboard.press("Shift+Tab");
    await expect(input).toBeFocused();
    const result = await new AxeBuilder({ page }).analyze();
    expect(result.violations).toEqual([]);
    expect(await page.evaluate(() => window.policyViolations)).toEqual([]);
  });

  test(`editor ${locale}: JavaScript-disabled explanation`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await context.newPage();
      await page.goto(`${fixture}/__editor-fixture?lang=${locale}`);
      await expect(page.locator("noscript p")).toBeVisible();
      await expect(page.locator("#editor-instructions")).toBeVisible();
      await expect(page.locator("[data-editor-workspace] form")).toHaveCount(0);
      await expect(page.locator("[data-editor-ready]")).toHaveCount(0);
    } finally { await context.close(); }
  });
}

test("editor input: Unicode paste/typing limits preserve accepted content", async ({ page }) => {
  const input = await open(page, "en");
  await input.focus();
  await input.evaluate((node) => {
    const clipboardData = new DataTransfer();
    clipboardData.setData("text/plain", "é".repeat(512 * 1024));
    const event = new ClipboardEvent("paste", { bubbles: true, cancelable: true });
    // Firefox clears constructor-supplied data on untrusted clipboard events.
    Object.defineProperty(event, "clipboardData", { value: clipboardData });
    node.dispatchEvent(event);
  });
  await input.press("Control+End");
  await input.press("x");
  await expect(page.getByRole("status")).toContainText("1 MiB");
  expect(await input.textContent()).not.toContain("x");
  await input.press("Control+a");
  await input.evaluate((node) => {
    const clipboardData = new DataTransfer();
    clipboardData.setData("text/plain", "😀".repeat(256 * 1024) + "x");
    const event = new ClipboardEvent("paste", { bubbles: true, cancelable: true });
    Object.defineProperty(event, "clipboardData", { value: clipboardData });
    node.dispatchEvent(event);
  });
  expect(await input.textContent()).not.toContain("😀");
});

test("Home stays independent of editor chunks and production denies proof route", async ({ page, request }) => {
  const resources = [];
  page.on("request", (req) => resources.push(req.url()));
  await page.goto("/");
  expect(resources.join("\n")).not.toContain("editor-workspace");
  expect(resources.join("\n")).not.toContain("worker");
  const response = await request.get("/__editor-fixture");
  expect(response.status()).toBe(403);
});

test("editor API: programmatic byte boundaries, inert content and disposal", async ({ page }) => {
  await open(page, "en");
  const result = await page.evaluate(async (moduleUrl) => {
    const { enhanceEditorWorkspace } = await import(moduleUrl);
    // Exercise the real exported enhancement API, without production test globals.
    const workspace = document.querySelector("[data-editor-workspace]").cloneNode(true);
    workspace.querySelector("[data-editor-host]").replaceChildren();
    workspace.querySelector("[role=status]").textContent = "";
    document.querySelector("main").append(workspace);
    const editor = enhanceEditorWorkspace(workspace);
    const exact = "😀".repeat(256 * 1024);
    const accepted = editor.replace(exact);
    const rejected = editor.replace(exact + "x");
    const preserved = editor.content() === exact;
    const notice = workspace.querySelector("[role=status]").textContent;
    const inert = "<img src=x onerror=alert(1)>";
    const inertAccepted = editor.replace(inert);
    const noImage = workspace.querySelector("[data-editor-host] img") === null;
    editor.dispose();
    editor.dispose();
    const noEditor = workspace.querySelector(".cm-editor") === null;
    const disposedRejects = !editor.replace("after disposal");
    workspace.remove();
    return { accepted, rejected, preserved, notice, inertAccepted, noImage, noEditor, disposedRejects };
  }, `${fixture}${workspaceModule}`);
  expect(result).toEqual({
    accepted: true, rejected: false, preserved: true,
    notice: "Input exceeds the 1 MiB UTF-8 limit. Existing content was kept.",
    inertAccepted: true, noImage: true, noEditor: true, disposedRejects: true,
  });
});

test("editor CSP: selection, scroll, help tooltip, resize and fresh nonce", async ({ page }) => {
  const resources = [];
  const responses = [];
  page.on("request", (request) => resources.push({ url: request.url(), method: request.method() }));
  page.on("response", (response) => {
    if (new URL(response.url()).pathname.startsWith("/assets/")) responses.push(response);
  });
  await page.setViewportSize({ width: 1000, height: 900 });
  await page.addInitScript(() => { window.editorProofPhase = "initial enhancement"; });
  const input = await open(page, "en");
  const nonce = await page.locator("[data-editor-host]").getAttribute("data-nonce");
  expect(await page.locator("style").evaluateAll((nodes) => nodes.map((node) => node.nonce))).toContain(nonce);
  await page.evaluate(() => { window.editorProofPhase = "selection and scrolling"; });
  await input.fill(Array.from({ length: 200 }, (_, index) => `line ${index} sample`).join("\n"));
  await input.press("Control+Home");
  await input.press("Shift+End");
  expect(await page.evaluate(() => window.getSelection().toString())).toBe("line 0 sample");
  await input.press("Control+End");
  await expect(page.locator(".cm-content")).toContainText("line 199 sample");
  await expect.poll(() => page.locator(".cm-scroller").evaluate((node) => node.scrollTop)).toBeGreaterThan(0);
  await input.press("Control+Home");
  await page.evaluate(() => { window.editorProofPhase = "help tooltip"; });
  const instructions = await page.locator("#editor-instructions").textContent();
  await page.locator(".cm-line").first().hover({ position: { x: 20, y: 10 } });
  await expect(page.getByRole("tooltip")).toHaveText(instructions);
  let box = await page.getByRole("tooltip").boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(1000);
  await page.evaluate(() => { window.editorProofPhase = "narrow resize and tooltip"; });
  await page.setViewportSize({ width: 375, height: 900 });
  await input.scrollIntoViewIfNeeded();
  await page.locator(".cm-line").first().hover({ position: { x: 20, y: 10 } });
  await expect(page.getByRole("tooltip")).toBeVisible();
  box = await page.getByRole("tooltip").boundingBox();
  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(375);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  expect(await page.evaluate(() => window.policyViolations)).toEqual([]);
  for (const resource of resources) {
    expect(new URL(resource.url).origin).toBe(new URL(fixture).origin);
    expect(resource.method).toBe("GET");
  }
  for (const response of responses) {
    expect(response.status()).toBe(200);
    expect(response.headers()["cache-control"]).toContain("immutable");
    expect(response.headers()["content-type"]).toMatch(/javascript|text\/css/);
    const file = new URL("../../target/frontend/static" + new URL(response.url()).pathname, import.meta.url);
    expect(await response.body()).toEqual(readFileSync(file));
  }
  expect(responses.length).toBeGreaterThanOrEqual(4);
  await page.goto(`${fixture}/__editor-fixture?lang=en`);
  await expect(page.locator("[data-editor-ready=true]")).toBeVisible();
  expect(await page.locator("[data-editor-host]").getAttribute("data-nonce")).not.toBe(nonce);
});
