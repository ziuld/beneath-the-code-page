import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const manifest = JSON.parse(readFileSync(new URL("../../target/frontend/asset-manifest.json", import.meta.url), "utf8"));
const path = file => "/" + file.replace(/^static\//, "");
const lazyPath = () => path(manifest["tools/uuid/workspace.ts"].file);
const assets = new Set(Object.values(manifest).flatMap(entry => [entry.file, ...(entry.css || [])]).map(path));
assets.add("/brand/b-composition.png");
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const messages = {
  en: { limit: "Enter a whole number from 1 to 100.", unavailable: "Cryptographic UUID generation is unavailable.", loading: "Generation is unavailable until JavaScript has loaded." },
  es: { limit: "Introduce un número entero entre 1 y 100.", unavailable: "La generación criptográfica de UUID no está disponible.", loading: "La generación no está disponible hasta que se cargue JavaScript." },
  fr: { limit: "Saisissez un nombre entier compris entre 1 et 100.", unavailable: "La génération cryptographique d’UUID est indisponible.", loading: "La génération est indisponible tant que JavaScript n’est pas chargé." },
};
for (const [locale, message] of Object.entries(messages)) {
  test(`F09 AC01/AC02 ${locale}: native v4 batches, boundaries, Copy, keyboard and privacy`, async ({ page, context, baseURL }) => {
    const requests = [], generated = [];
    context.on("request", request => requests.push({url:request.url(),method:request.method(),body:request.postData()}));
    await page.addInitScript(() => {
      window.uuidCalls = 0; window.uuidCopies = []; window.uuidViolations = [];
      const native = crypto.randomUUID.bind(crypto);
      crypto.randomUUID = () => { window.uuidCalls++; return native(); };
      document.addEventListener("securitypolicyviolation", event => window.uuidViolations.push(event.violatedDirective));
      Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText: async text => { window.uuidCopies.push(text); }}});
    });
    await page.goto(`/?lang=${locale}`);
    await page.locator(`.section-grid a[href="/tools?lang=${locale}"]`).click();
    await page.locator(`main a[href="/tools/uuid?lang=${locale}"]`).click();
    const count=page.locator("[data-uuid-count]"), run=page.locator("[data-uuid-run]"), copy=page.locator("[data-uuid-copy]"), output=page.locator("[data-uuid-output]"), status=page.locator("[data-uuid-status]");
    await expect(run).toBeEnabled(); await expect(copy).toBeDisabled();
    expect(await page.evaluate(()=>window.uuidCalls)).toBe(0);
    const initial=requests.length, cookies=await context.cookies();
    for (const size of [3,1,100]) {
      await count.fill(String(size)); await expect(copy).toBeDisabled();
      await count.press("Tab"); await expect(run).toBeFocused(); await run.press("Enter");
      const batch=await output.textContent(); const values=batch.split("\n");
      expect(values).toHaveLength(size); for (const value of values) expect(value).toMatch(uuid);
      generated.push(...values);
      await run.press("Tab"); await expect(copy).toBeFocused(); await copy.press("Enter");
      expect((await page.evaluate(()=>window.uuidCopies)).at(-1)).toBe(batch);
    }
    expect(await page.evaluate(()=>window.uuidCalls)).toBe(104);
    for (const invalid of ["0","101","-1","1.5",""]) {
      await count.fill(invalid); await run.click();
      await expect(status).toHaveText(message.limit); await expect(count).toHaveAttribute("aria-invalid","true");
      await expect(output).toBeEmpty(); await expect(copy).toBeDisabled();
    }
    expect(await page.evaluate(()=>window.uuidCalls)).toBe(104);
    expect(requests).toHaveLength(initial);
    for (const request of requests) {
      const url=new URL(request.url); expect(url.origin).toBe(new URL(baseURL).origin); expect(request.method).toBe("GET"); expect(request.body).toBeNull();
      expect(["/","/tools","/tools/uuid"].includes(url.pathname)||assets.has(url.pathname)).toBe(true);
      if(assets.has(url.pathname)){expect(url.search).toBe("");expect(url.hash).toBe("");}
    }
    expect(await context.cookies()).toEqual(cookies);
    expect(await page.evaluate(async()=>({local:localStorage.length,session:sessionStorage.length,db:(await indexedDB.databases()).length,caches:(await caches.keys()).length}))).toEqual({local:0,session:0,db:0,caches:0});
    expect(await page.evaluate(()=>window.uuidViolations)).toEqual([]);
    const logs=readFileSync(new URL("../../target/home-browser-server.log",import.meta.url),"utf8");
    for(const value of generated){expect(JSON.stringify(requests)).not.toContain(value);expect(logs).not.toContain(value);}
    expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);
    for(const width of [320,1440]){await page.setViewportSize({width,height:900});await count.fill("3");await run.click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`../../target/f09-${locale}-${width}.png`,fullPage:true});}
    const next=locale==="fr"?"es":"fr";
    await page.locator("select[name=language]").selectOption(next);await page.locator(".language-preference button").click();
    await expect(page).toHaveURL(`${baseURL}/tools/uuid`);await expect(page.locator("html")).toHaveAttribute("lang",next);
  });

  test(`F09 ${locale}: unavailable/throwing crypto and safe clipboard failures`, async ({ page }) => {
    await page.addInitScript(()=>{crypto.randomUUID=undefined;});
    await page.goto(`/tools/uuid?lang=${locale}`); const run=page.locator("[data-uuid-run]"), copy=page.locator("[data-uuid-copy]"), status=page.locator("[data-uuid-status]"), output=page.locator("[data-uuid-output]");
    await run.click();await expect(status).toContainText(message.unavailable);await expect(output).toBeEmpty();await expect(copy).toBeDisabled();
    await page.evaluate(()=>{crypto.randomUUID=()=>{throw new Error("SYNTHETIC_PRIVATE_ERROR");};});
    await run.click();await expect(status).toContainText(message.unavailable);await expect(page.locator("body")).not.toContainText("SYNTHETIC_PRIVATE_ERROR");
    await page.evaluate(()=>{crypto.randomUUID=()=>"12345678-1234-4123-8123-123456789abc";Object.defineProperty(navigator,"clipboard",{configurable:true,value:undefined});});
    await run.click();await copy.click();
    await expect(status).toHaveText(await page.locator('[data-uuid-message="copy-unavailable"]').textContent());
    await page.evaluate(()=>{Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async()=>{throw new Error("SYNTHETIC_PRIVATE_ERROR");}}});});
    await copy.click();await expect(status).toHaveText(await page.locator('[data-uuid-message="copy-failed"]').textContent());await expect(output).not.toBeEmpty();
  });

  test(`F09 ${locale}: no-JS and failed lazy load retain disabled explanation`, async ({ browser, page, baseURL }) => {
    const context=await browser.newContext({javaScriptEnabled:false});
    try{const plain=await context.newPage();await plain.goto(`${baseURL}/tools/uuid?lang=${locale}`);await expect(plain.locator("[data-uuid-status]")).toHaveText(message.loading);await expect(plain.locator("[data-uuid-run]")).toBeDisabled();await expect(plain.locator("[data-uuid-count]")).toBeDisabled();}finally{await context.close();}
    await page.route(`**${lazyPath()}`,route=>route.fulfill({status:503,contentType:"text/javascript",body:""}));
    await page.goto(`/tools/uuid?lang=${locale}`);await expect(page.locator("[data-uuid]")).toHaveAttribute("data-uuid-ready","false");await expect(page.locator("[data-uuid-status]")).toHaveText(message.loading);await expect(page.locator("[data-uuid-run]")).toBeDisabled();
    await page.unroute(`**${lazyPath()}`);await page.reload();await expect(page.locator("[data-uuid-run]")).toBeEnabled();
  });
}
