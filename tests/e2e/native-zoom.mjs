// Standalone native Chromium 200% zoom review; never installed in the user's browser.
import { chromium, expect } from "@playwright/test";
import { mkdtemp, mkdir, writeFile, rm } from "node:fs/promises";
import { resolve, join } from "node:path";

const base=process.env.BTC_BASE_URL;
if(!base || !["127.0.0.1","localhost"].includes(new URL(base).hostname)) throw new Error("A loopback BTC_BASE_URL is required");
const target=resolve("../../target");await mkdir(target,{recursive:true});
const temporary=await mkdtemp(join(target,"f19-native-zoom-"));
const extension=join(temporary,"extension"),profile=join(temporary,"profile");await mkdir(extension);
await writeFile(join(extension,"manifest.json"),JSON.stringify({manifest_version:3,name:"Local browser zoom verification",version:"1.0",permissions:["tabs"],background:{service_worker:"background.js"}}));
await writeFile(join(extension,"background.js"),'chrome.runtime.onInstalled.addListener(() => {});');
const context=await chromium.launchPersistentContext(profile,{channel:"chromium",headless:true,viewport:null,args:["--window-size=1440,1000",`--disable-extensions-except=${extension}`,`--load-extension=${extension}`]});
const rows=[];
try{
  const worker=context.serviceWorkers()[0]||await context.waitForEvent("serviceworker");
  const page=context.pages()[0]||await context.newPage();
  const capture=await context.newCDPSession(page);
  const routes=["/","/tools","/tools/json-formatter","/tools/json-validator","/tools/json-minifier","/tools/base64","/tools/uuid","/tools/jwt","/learn","/learn/java-fundamentals","/learn/java-fundamentals/source-to-jvm","/learn/java-fundamentals/values-types-numeric-limits","/learn/java-fundamentals/control-flow-tracing"];
  console.log(JSON.stringify({browser:context.browser().version(),method:"native chrome.tabs.setZoom/getZoom",zoom:2}));
  for(const locale of ["en","es","fr"]){
    for(const route of routes){
      await page.goto(`${base}${route}?lang=${locale}`);
      const zoom=await worker.evaluate(async()=>{const [tab]=await chrome.tabs.query({active:true,currentWindow:true});await chrome.tabs.setZoom(tab.id,2);return chrome.tabs.getZoom(tab.id);});
      expect(zoom).toBe(2);
      const run=page.locator('[data-format-run], [data-base64-run], [data-uuid-run], [data-jwt-run]');
      if(await run.count())await expect(run).toBeEnabled();
      await expect(page.getByRole("heading",{level:1})).toBeVisible();
      const layout=await page.evaluate(()=>({width:innerWidth,height:innerHeight,dpr:devicePixelRatio,scroll:document.documentElement.scrollWidth,cssZoom:getComputedStyle(document.documentElement).zoom}));
      expect(layout.width).toBe(720);expect(layout.dpr).toBe(2);expect(layout.scroll).toBeLessThanOrEqual(layout.width);expect(layout.cssZoom).toBe("1");
      await page.evaluate(() => document.fonts.ready);
      const control=await run.count()?run:page.locator('.language-preference button');await control.focus();await expect(control).toBeFocused();await expect(control).toBeInViewport({ratio:1});
      const visible=await control.evaluate(element=>{const r=element.getBoundingClientRect();const hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return hit===element||element.contains(hit);});expect(visible).toBe(true);
      const screenshot=await capture.send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});
      await writeFile(join(target,`f19-zoom-${locale}-${route.replaceAll("/","_")||"home"}.png`),Buffer.from(screenshot.data,"base64"));
      rows.push({locale,route,zoom,...layout});
    }
  }
  await writeFile(join(target,"f19-native-zoom.json"),JSON.stringify(rows,null,2));
  console.log(`PASS: ${rows.length} route/locale checks at native 200% browser zoom; focus visible and unobscured`);
}finally{await context.close();await rm(temporary,{recursive:true,force:true});}
