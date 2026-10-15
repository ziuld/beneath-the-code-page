import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const fixture = process.env.BTC_COMPONENT_URL;
const copy = {
  en: { editor: "Content editor", success: "Processing completed.", cancelled: "Processing cancelled.", timeout: "Processing exceeded the two-second limit. You can try again.", error: "Processing failed. You can try again.", limit: "Output exceeds the 8 MiB UTF-8 limit. Existing output was kept." },
  es: { editor: "Editor de contenido", success: "Procesamiento completado.", cancelled: "Procesamiento cancelado.", timeout: "El procesamiento superó el límite de dos segundos. Puedes intentarlo de nuevo.", error: "El procesamiento falló. Puedes intentarlo de nuevo.", limit: "La salida supera el límite de 8 MiB en UTF-8. Se conservó la salida anterior." },
  fr: { editor: "Éditeur de contenu", success: "Traitement terminé.", cancelled: "Traitement annulé.", timeout: "Le traitement a dépassé la limite de deux secondes. Vous pouvez réessayer.", error: "Le traitement a échoué. Vous pouvez réessayer.", limit: "Le résultat dépasse la limite de 8 MiB en UTF-8. Le résultat précédent a été conservé." },
};

for (const [locale, messages] of Object.entries(copy)) {
  test(`editor worker ${locale}: timeout, cancel, replacement, recovery and privacy`, async ({ page, context }, testInfo) => {
    const requests = [];
    context.on("request", (request) => requests.push({ url: request.url(), method: request.method(), body: request.postData() }));
    await page.goto(`${fixture}/__editor-fixture?lang=${locale}`);
    const proof = page.locator("[data-worker-proof]");
    await expect(proof).toHaveAttribute("data-ready", "true");
    const cookies = await context.cookies();
    const input = page.getByRole("textbox", { name: messages.editor, exact: true });
    const output = proof.locator("[data-worker-output]");
    const status = proof.locator("[data-worker-status]");
    const sentinel = `SYNTHETIC_BTC_WORKER_${locale}<img src=x onerror=alert(1)>`;
    await input.fill(sentinel);
    let started = performance.now();
    await proof.locator('[data-operation="echo"]').click();
    await expect(status).toHaveText(messages.success);
    await expect(output).toHaveText(sentinel);
    await expect(output.locator("img")).toHaveCount(0);
    const echoMs = performance.now() - started;

    started = performance.now();
    await proof.locator('[data-operation="busy"]').click();
    await expect(proof).toHaveAttribute("data-state", "running");
    await input.focus();
    await input.press("Escape");
    await input.press("Tab");
    await expect(page.locator("[data-editor-workspace] > button")).toBeFocused();
    await expect(status).toHaveText(messages.timeout, { timeout: 10000 });
    const timeoutObservedMs = performance.now() - started;
    await expect(output).toHaveText(sentinel);

    await proof.locator('[data-operation="busy"]').click();
    await expect(proof).toHaveAttribute("data-state", "running");
    started = performance.now();
    await proof.locator("[data-worker-cancel]").click();
    await expect(status).toHaveText(messages.cancelled);
    const cancelMs = performance.now() - started;
    await expect(output).toHaveText(sentinel);

    await proof.locator('[data-operation="busy"]').click();
    await input.fill(sentinel + " B");
    await proof.locator('[data-operation="echo"]').click();
    await expect(status).toHaveText(messages.success);
    await expect(output).toHaveText(sentinel + " B");
    await proof.locator('[data-operation="throw"]').click();
    await expect(status).toHaveText(messages.error);
    await expect(output).toHaveText(sentinel + " B");
    await proof.locator('[data-operation="oversize"]').click();
    await expect(status).toHaveText(messages.limit);
    await expect(output).toHaveText(sentinel + " B");
    await proof.locator('[data-operation="echo"]').click();
    await expect(status).toHaveText(messages.success);
    await expect(status).not.toContainText("SYNTHETIC_BTC_WORKER_");

    expect(await context.cookies()).toEqual(cookies);
    const storage = await page.evaluate(async () => ({
      local: localStorage.length, session: sessionStorage.length,
      databases: (await indexedDB.databases()).length, caches: (await caches.keys()).length,
    }));
    expect(storage).toEqual({ local: 0, session: 0, databases: 0, caches: 0 });
    for (const request of requests) {
      const url = new URL(request.url);
      expect(url.origin).toBe(new URL(fixture).origin);
      expect(url.pathname === "/__editor-fixture" || url.pathname.startsWith("/assets/")).toBe(true);
      expect(request.method).toBe("GET");
      expect(request.body).toBeNull();
      expect(request.url).not.toContain("SYNTHETIC_BTC_WORKER_");
    }
    for (const name of ["home", "shell", "preferences"])
      expect(readFileSync(new URL(`../../target/${name}-browser-server.log`, import.meta.url), "utf8")).not.toContain("SYNTHETIC_BTC_WORKER_");

    await proof.locator('[data-operation="busy"]').click();
    await proof.locator("[data-worker-dispose]").click();
    await expect(proof).toHaveAttribute("data-disposed", "true");
    await expect(proof.locator("button:enabled")).toHaveCount(0);
    console.log("Worker proof measurements:", JSON.stringify({ engine: testInfo.project.name, locale, echoMs, cancelMs, timeoutObservedMs, inputBytes: new TextEncoder().encode(sentinel).length, hardwareConcurrency: await page.evaluate(() => navigator.hardwareConcurrency) }));
  });
}

test("editor worker: actual response CSP denies network/eval independently", async ({ page, context }) => {
  const responses = [];
  const workerPath = "/" + JSON.parse(readFileSync(new URL("../../target/worker-proof/worker-proof-resources.json", import.meta.url), "utf8"))[0].replace(/^static\//, "");
  context.on("response", (response) => {
    if (new URL(response.url()).pathname === workerPath) responses.push(response);
  });
  await page.goto(`${fixture}/__editor-fixture?lang=en`);
  const proof = page.locator("[data-worker-proof]");
  await expect(proof).toHaveAttribute("data-ready", "true");
  const output = proof.locator("[data-worker-output]");
  await proof.locator('[data-operation="network"]').click();
  await expect(output).toHaveText("network-blocked");
  await proof.locator('[data-operation="eval"]').click();
  await expect(output).toHaveText("eval-blocked");
  expect(responses.length).toBeGreaterThanOrEqual(1);
  for (const response of responses) {
    expect(response.status()).toBe(200);
    const headers = response.headers();
    expect(headers["content-security-policy"]).toContain("connect-src 'none'");
    expect(headers["content-security-policy"]).not.toMatch(/unsafe-eval|unsafe-inline/);
    expect(headers["content-type"]).toMatch(/javascript/);
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["cache-control"]).toContain("immutable");
    const path = new URL("../../target/worker-proof/static" + new URL(response.url()).pathname, import.meta.url);
    // The manager terminates completed workers; their network body session may be gone.
    // Keep the actual worker headers above and verify bytes at the same immutable URL.
    const asset = await context.request.get(response.url());
    expect(asset.status()).toBe(200);
    expect(await asset.body()).toEqual(readFileSync(path));
  }
  const missing = await context.request.get(`${fixture}/assets/proof-worker-missing.js`);
  expect(missing.status()).toBe(404);
  expect(missing.headers()["cache-control"]).toBe("no-store");
});
