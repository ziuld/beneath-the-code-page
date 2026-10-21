import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFileSync } from "node:fs";

const manifest=JSON.parse(readFileSync(new URL("../../target/frontend/asset-manifest.json",import.meta.url),"utf8"));
const path=file=>"/"+file.replace(/^static\//,"");
const assets=new Set(Object.values(manifest).flatMap(entry=>[entry.file,...(entry.css||[])]).map(path));assets.add("/brand/b-composition.png");
const encode=text=>Buffer.from(text).toString("base64url");
const token=(payload,header='{"alg":"HS256","typ":"JWT","jku":"https://synthetic.invalid/keys"}')=>`${encode(header)}.${encode(payload)}.AP8`;
const messages={
  en:{notice:"Signature not verified.",jwe:"Encrypted tokens (five-part JWE) are not supported.",loading:"Decoding is unavailable until JavaScript has loaded."},
  es:{notice:"Firma no verificada.",jwe:"Los tokens cifrados (JWE de cinco partes) no son compatibles.",loading:"La decodificación no está disponible hasta que se cargue JavaScript."},
  fr:{notice:"Signature non vérifiée.",jwe:"Les jetons chiffrés (JWE en cinq parties) ne sont pas pris en charge.",loading:"Le décodage est indisponible tant que JavaScript n’est pas chargé."},
};
for(const [locale,message] of Object.entries(messages)){
  test(`F10 AC01/AC02 ${locale}: exact escaped inspection, permanent disclaimer, keyboard and privacy`,async({page,context,baseURL})=>{
    const requests=[],errors=[];context.on("request",request=>requests.push({url:request.url(),method:request.method(),body:request.postData(),headers:request.headers()}));page.on("pageerror",error=>errors.push(error.message));
    await page.addInitScript(()=>{window.jwtViolations=[];document.addEventListener("securitypolicyviolation",event=>window.jwtViolations.push(event.violatedDirective));});
    await page.goto(`/?lang=${locale}`);await page.locator(`.section-grid a[href="/tools?lang=${locale}"]`).click();await page.locator(`main a[href="/tools/jwt?lang=${locale}"]`).click();
    const input=page.locator("[data-jwt-input]"),run=page.locator("[data-jwt-run]"),clear=page.locator("[data-jwt-clear]"),header=page.locator("[data-jwt-header]"),payload=page.locator("[data-jwt-payload]"),status=page.locator("[data-jwt-status]"),notice=page.locator("[data-jwt-disclaimer]");
    await expect(run).toBeEnabled();await expect(notice).toContainText(message.notice);await expect(notice).toBeVisible();
    const initial=requests.length,cookies=await context.cookies();
    const claims=`{"sub":"SYNTHETIC_F10_${locale} café 😀 <script>alert(1)</script><img src=x onerror=alert(2)>","n":9007199254740993,"exp":0,"__proto__":{"polluted":true},"x":1,"x":2}`;
    const jwt=token(claims);await input.fill(jwt);await input.press("Tab");await expect(run).toBeFocused();await run.press("Enter");
    await expect(header).toHaveText('{"alg":"HS256","typ":"JWT","jku":"https://synthetic.invalid/keys"}');expect(await payload.textContent()).toBe(claims);
    await expect(page.locator("[data-jwt] script, [data-jwt] img, [data-jwt] a")).toHaveCount(0);
    await input.fill(token('{"exp":"not a date"}'));await expect(header).toBeEmpty();await expect(payload).toBeEmpty();await run.click();await expect(payload).toHaveText('{"exp":"not a date"}');
    for(const invalid of ["a.b.c.d.e","e30.e30.%","e30._w.AP8",token('{"exp":}'),token('[]'),"e30..AP8"]){await input.fill(invalid);await run.click();await expect(input).toHaveAttribute("aria-invalid","true");await expect(payload).toBeEmpty();await expect(header).toBeEmpty();await expect(notice).toContainText(message.notice);}
    await input.fill("a.b.c.d.e");await run.click();await expect(status).toHaveText(message.jwe);
    for(const [value,key] of [["A".repeat(16385),"input-limit"],[token('{"x":'.repeat(33)+'0'+'}'.repeat(33)),"depth-limit"]]){await input.fill(value);await run.click();await expect(status).toHaveText(await page.locator(`[data-jwt-message="${key}"]`).textContent());await expect(payload).toBeEmpty();}
    await input.fill(jwt);await run.click();await run.press("Tab");await expect(clear).toBeFocused();await clear.press("Enter");await expect(input).toBeFocused();await expect(input).toHaveValue("");await expect(payload).toBeEmpty();await input.press("Control+z");await expect(input).toHaveValue("");await expect(notice).toContainText(message.notice);
    expect((await new AxeBuilder({page}).analyze()).violations).toEqual([]);expect(errors).toEqual([]);expect(await page.evaluate(()=>window.jwtViolations)).toEqual([]);
    expect(requests).toHaveLength(initial);for(const request of requests){const url=new URL(request.url);expect(url.origin).toBe(new URL(baseURL).origin);expect(request.method).toBe("GET");expect(request.body).toBeNull();expect(["/","/tools","/tools/jwt"].includes(url.pathname)||assets.has(url.pathname)).toBe(true);expect(JSON.stringify(request)).not.toContain("SYNTHETIC_F10_");expect(request.url).not.toContain(jwt);if(assets.has(url.pathname)){expect(url.search).toBe("");expect(url.hash).toBe("");}}
    expect(await context.cookies()).toEqual(cookies);expect(await page.evaluate(async()=>({local:localStorage.length,session:sessionStorage.length,db:(await indexedDB.databases()).length,caches:(await caches.keys()).length}))).toEqual({local:0,session:0,db:0,caches:0});
    const logs=readFileSync(new URL("../../target/home-browser-server.log",import.meta.url),"utf8");expect(logs).not.toContain("SYNTHETIC_F10_");expect(logs).not.toContain(jwt);
    for(const width of [320,1440]){await page.setViewportSize({width,height:900});await input.fill(jwt);await run.click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.screenshot({path:`../../target/f10-${locale}-${width}.png`,fullPage:true});}
    const next=locale==="fr"?"es":"fr";await page.locator("select[name=language]").selectOption(next);await page.locator(".language-preference button").click();await expect(page).toHaveURL(`${baseURL}/tools/jwt`);await expect(page.locator("html")).toHaveAttribute("lang",next);await expect(input).toHaveValue("");
  });

  test(`F10 ${locale}: no-JS and failed lazy loading keep disclaimer and inert controls`,async({browser,page,baseURL})=>{
    const context=await browser.newContext({javaScriptEnabled:false});try{const plain=await context.newPage();await plain.goto(`${baseURL}/tools/jwt?lang=${locale}`);await expect(plain.locator("[data-jwt-disclaimer]")).toContainText(message.notice);await expect(plain.locator("[data-jwt-status]")).toHaveText(message.loading);for(const selector of ["input","run","clear"])await expect(plain.locator(`[data-jwt-${selector}]`)).toBeDisabled();}finally{await context.close();}
    const lazy=path(manifest["tools/jwt/workspace.ts"].file);await page.route(`**${lazy}`,route=>route.fulfill({status:503,contentType:"text/javascript",body:""}));await page.goto(`/tools/jwt?lang=${locale}`);await expect(page.locator("[data-jwt]")).toHaveAttribute("data-jwt-ready","false");await expect(page.locator("[data-jwt-disclaimer]")).toContainText(message.notice);await expect(page.locator("[data-jwt-status]")).toHaveText(message.loading);await expect(page.locator("[data-jwt-run]")).toBeDisabled();await page.unroute(`**${lazy}`);await page.reload();await expect(page.locator("[data-jwt-run]")).toBeEnabled();
  });
}

test("F10: real 16 KiB boundary, no worker/editor assets and pagehide clearing",async({page})=>{
  const requests=[];page.on("request",request=>requests.push(new URL(request.url()).pathname));await page.goto("/tools/jwt?lang=en");await expect(page.locator("[data-jwt-run]")).toBeEnabled();
  const small=token('{}'),exact=small+"A".repeat(16384-small.length);
  await page.locator("[data-jwt-input]").fill(exact);await page.locator("[data-jwt-run]").click();await expect(page.locator("[data-jwt-payload]")).toHaveText("{}");
  expect(requests.some(url=>/worker|editor-workspace|formatter-workspace/.test(url))).toBe(false);
  await page.evaluate(()=>window.dispatchEvent(new PageTransitionEvent("pagehide")));await expect(page.locator("[data-jwt-input]")).toHaveValue("");await expect(page.locator("[data-jwt-header]")).toBeEmpty();await expect(page.locator("[data-jwt-payload]")).toBeEmpty();
});
