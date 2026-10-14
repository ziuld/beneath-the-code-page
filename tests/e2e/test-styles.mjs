import { expect } from "@playwright/test";

// Authorise only synthetic accessibility-test CSS using this document's nonce.
export async function addTestStyle(page, response, content) {
  const policy = await response.headerValue("content-security-policy");
  const nonce = policy?.match(/'nonce-([^']+)'/)?.[1];
  expect(nonce).toBeTruthy();
  await page.evaluate(({ nonce, content }) => {
    const style = document.createElement("style");
    style.nonce = nonce;
    style.textContent = content;
    document.head.append(style);
  }, { nonce, content });
}
