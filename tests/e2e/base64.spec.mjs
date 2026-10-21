import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../../target/frontend/asset-manifest.json", import.meta.url), "utf8"));
const path = file => "/" + file.replace(/^static\//, "");
const workerPath = path(manifest["__json-formatter-worker"].file);
const lazyPath = path(manifest["tools/base64/workspace.ts"].file);
const assets = new Set(Object.values(manifest).flatMap(entry => [entry.file, ...(entry.css || [])]).map(path));
assets.add("/brand/b-composition.png");
const messages = {
  en: { invalid: "Use canonical standard padded Base64 containing valid UTF-8 text. Your input was kept.", unavailable: "Processing is not available until JavaScript and the editor have loaded." },
  es: { invalid: "Usa Base64 estándar canónico con relleno que contenga texto UTF-8 válido. Se conservó la entrada.", unavailable: "El procesamiento no está disponible hasta que se carguen JavaScript y el editor." },
  fr: { invalid: "Utilisez du Base64 standard canonique avec remplissage contenant du texte UTF-8 valide. Votre contenu a été conservé.", unavailable: "Le traitement n’est pas disponible tant que JavaScript et l’éditeur ne sont pas chargés." },
};
for (const [locale, copy] of Object.entries(messages)) {
  test(`F08-UH01-AC01/AC02 ${locale}: Unicode, strict decoding, stale/empty Copy, privacy and CSP`, async ({ page, context, baseURL }) => {
    const requests = [], policies = [], times = [];
    context.on("request", request => requests.push({ url: request.url(), method: request.method(), body: request.postData(), headers: request.headers() }));
    context.on("response", response => { if (new URL(response.url()).pathname === workerPath) policies.push(response); });
    await page.addInitScript(() => {
      window.base64Violations = []; window.base64Copies = [];
      document.addEventListener("securitypolicyviolation", event => window.base64Violations.push(event.violatedDirective));
      Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async text => { window.base64Copies.push(text); } } });
    });
    await page.goto(`/?lang=${locale}`);
    await page.locator(`.section-grid a[href="/tools?lang=${locale}"]`).click();
    await page.locator(`main a[href="/tools/base64?lang=${locale}"]`).click();
    await expect(page).toHaveURL(`${baseURL}/tools/base64?lang=${locale}`);
    const workspace = page.locator("[data-base64]");
    await expect(workspace).toHaveAttribute("data-base64-ready", "true");
    const input = page.locator(".cm-content"), run = page.locator("[data-base64-run]"), mode = page.locator("[data-base64-mode]"), output = page.locator("[data-base64-output]"), status = page.locator("[data-base64-status]");
    const cookies = await context.cookies();
    const initial = requests.length;
    const text = `café 漢字 😀 e\u0301\uFEFF\r\nSYNTHETIC_F08_${locale}<script>alert(1)</script>`;
    const encoded = Buffer.from(text, "utf8").toString("base64");
    await input.focus();
    await input.evaluate((node, text) => {
      const data = new DataTransfer(); data.setData("text/plain", text);
      const event = new ClipboardEvent("paste", { bubbles: true, cancelable: true });
      Object.defineProperty(event, "clipboardData", { value: data }); node.dispatchEvent(event);
    }, text);
    let started = performance.now(); await run.click();
    await expect(output).toHaveText(encoded); times.push(performance.now()-started);
    await expect(page.locator("[data-base64-cancel]")).toBeDisabled();
    await page.locator("[data-base64-copy]").click();
    expect(await page.evaluate(() => window.base64Copies)).toEqual([encoded]);
    await mode.selectOption("decode");
    await expect(page.locator("[data-base64-copy]")).toBeDisabled();
    await expect(output).toHaveText(encoded);
    await input.fill(encoded); started = performance.now(); await run.click();
    await expect.poll(() => output.textContent()).toBe(text); times.push(performance.now()-started);
    await expect(workspace).toHaveAttribute("data-base64-current", "true");
    await expect(workspace.locator("script, img, [onerror]")).toHaveCount(0);
    await page.locator("[data-base64-copy]").click();
    expect(await page.evaluate(() => window.base64Copies)).toEqual([encoded, text]);
    for (const invalid of ["%%%", "YQ", "Zh==", "Zm9=", "YQ==\n", "-_8=", "/w==", "4oI="]) {
      await input.fill(invalid); await run.click();
      await expect(status).toHaveText(copy.invalid);
      await expect(workspace).toHaveAttribute("data-base64-current", "false");
      await expect(page.locator("[data-base64-copy]")).toBeDisabled();
      expect(await output.textContent()).toBe(text);
    }
    await input.fill(""); await run.click();
    await expect(workspace).toHaveAttribute("data-base64-current", "true");
    expect(await output.textContent()).toBe("");
    await page.locator("[data-base64-copy]").click();
    expect(await page.evaluate(() => window.base64Copies)).toEqual([encoded, text, ""]);
    await mode.selectOption("encode"); await run.click();
    await expect(workspace).toHaveAttribute("data-base64-current", "true");
    expect(await output.textContent()).toBe("");
    await page.locator("[data-base64-clear]").click();
    await expect(page.locator("[data-base64-clear]")).toBeFocused();
    await input.focus(); await input.press("Control+z"); expect(await input.textContent()).toBe("");
    await input.fill("café"); await input.press("Escape"); await input.press("Tab"); await expect(mode).toBeFocused();
    await page.keyboard.press("Tab"); await expect(run).toBeFocused();
    expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
    await page.evaluate(() => { document.querySelector("[data-base64-run]").click(); document.querySelector("[data-base64-cancel]").click(); });
    await expect(workspace).toHaveAttribute("data-base64-state", "cancelled");
    await run.click(); await expect(output).toHaveText("Y2Fmw6k=");
    expect(await page.evaluate(() => window.base64Violations)).toEqual([]);
    expect(await context.cookies()).toEqual(cookies);
    expect(await page.evaluate(async () => ({local:localStorage.length,session:sessionStorage.length,databases:(await indexedDB.databases()).length,caches:(await caches.keys()).length}))).toEqual({local:0,session:0,databases:0,caches:0});
    for (const [index, request] of requests.entries()) {
      const url = new URL(request.url);
      expect(url.origin).toBe(new URL(baseURL).origin); expect(request.method).toBe("GET"); expect(request.body).toBeNull();
      if (index >= initial) expect(url.pathname).toBe(workerPath);
      else expect(["/", "/tools", "/tools/base64"].includes(url.pathname) || assets.has(url.pathname)).toBe(true);
      expect(JSON.stringify(request)).not.toContain("SYNTHETIC_F08_");
      if (assets.has(url.pathname)) { expect(url.search).toBe(""); expect(url.hash).toBe(""); }
    }
    expect(policies.length).toBeGreaterThan(0);
    for (const response of policies) {
      const headers = response.headers(); expect(headers["content-security-policy"]).toContain("connect-src 'none'"); expect(headers["content-security-policy"]).not.toMatch(/unsafe-eval|unsafe-inline/); expect(headers["cache-control"]).toContain("immutable");
    }
    expect(readFileSync(new URL("../../target/home-browser-server.log",import.meta.url),"utf8")).not.toContain("SYNTHETIC_F08_");
    console.log("F08 round-trip measurements",JSON.stringify({locale,elapsedMs:times.map(Math.round)}));
  });

  test(`F08 ${locale}: no-JS and failed lazy enhancement remain explanatory and disabled`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
    try { const page=await context.newPage();await page.goto(`${baseURL}/tools/base64?lang=${locale}`);await expect(page.locator("[data-base64-status]")).toHaveText(copy.unavailable);for(const control of await page.locator("[data-base64] button, [data-base64] select").all())await expect(control).toBeDisabled();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true); } finally {await context.close();}
    const page=await browser.newPage({baseURL});
    try {await page.route(`**${lazyPath}`,route=>route.fulfill({status:503,contentType:"text/javascript",body:""}));await page.goto(`/tools/base64?lang=${locale}`);await expect(page.locator("[data-base64]")).toHaveAttribute("data-base64-ready","false");await expect(page.locator("[data-base64-status]")).toHaveText(copy.unavailable);await expect(page.locator("[data-base64-run]")).toBeDisabled();await page.unroute(`**${lazyPath}`);await page.reload();await expect(page.locator("[data-base64-run]")).toBeEnabled();}finally{await page.close();}
  });

  test(`F08 ${locale}: native language return preserves the Base64 route`, async ({ browser }) => {
    const base=process.env.BTC_PREFERENCES_URL;const context=await browser.newContext();
    try{const page=await context.newPage();await page.goto(`${base}/tools/base64?lang=${locale}`);const next=locale==="fr"?"es":"fr";await page.locator("select[name=language]").selectOption(next);await page.locator(".language-preference button").click();await expect(page).toHaveURL(`${base}/tools/base64`);await expect(page.locator("html")).toHaveAttribute("lang",next);}finally{await context.close();}
  });
}

test("F08: real worker failure retains input and retry succeeds; narrow/wide reflow", async ({ page }) => {
  await page.route(`**${workerPath}`,route=>route.abort());
  await page.goto("/tools/base64?lang=en");await expect(page.locator("[data-base64-run]")).toBeEnabled();
  const input=page.locator(".cm-content");await input.fill("café");await page.locator("[data-base64-run]").click();await expect(page.locator("[data-base64]")).toHaveAttribute("data-base64-state","error");await expect(input).toHaveText("café");await page.unroute(`**${workerPath}`);await page.locator("[data-base64-run]").click();await expect(page.locator("[data-base64-output]")).toHaveText("Y2Fmw6k=");
  for(const width of [320,768,1440]){await page.setViewportSize({width,height:900});expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`../../target/f08-base64-${width}.png`,fullPage:true});}
  await page.goto("/tools");expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});


test("F08: bounded Unicode insertion and real worker timeout recover cleanly", async ({ page }) => {
  await page.goto("/tools/base64?lang=en"); await expect(page.locator("[data-base64-run]")).toBeEnabled();
  const input=page.locator(".cm-content"), run=page.locator("[data-base64-run]"), workspace=page.locator("[data-base64]");
  const accepted="é".repeat(512*1024);
  await input.fill(accepted); await run.click();
  await expect(page.locator("[data-base64-output]")).toHaveText(Buffer.from(accepted).toString("base64"));
  await input.focus(); await input.press("End"); await input.press("x");
  await input.press("Control+a");
  const preserved=await input.evaluate(node=>{const data=new DataTransfer();const event=new ClipboardEvent("copy",{bubbles:true,cancelable:true});Object.defineProperty(event,"clipboardData",{value:data});node.dispatchEvent(event);return data.getData("text/plain")});
  expect(preserved).toBe(accepted);
  await input.fill("café");
  await page.route(`**${workerPath}`,async route=>{const response=await route.fetch();await route.fulfill({response,headers:{...response.headers(),"cache-control":"no-store"},body:"self.onmessage = () => { while (true) {} };"})});
  await run.click();await expect(workspace).toHaveAttribute("data-base64-state","timeout");expect(await input.textContent()).toBe("café");await page.unroute(`**${workerPath}`);await run.click();await expect(page.locator("[data-base64-output]")).toHaveText("Y2Fmw6k=");
});
