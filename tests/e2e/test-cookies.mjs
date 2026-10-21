import { expect } from "@playwright/test";

export async function expectProductionCsrf(response, context) {
  const header = (await response.allHeaders())["set-cookie"];
  expect(header).toMatch(/^XSRF-TOKEN=/);
  for (const flag of [/;\s*Path=\/(?:;|$)/i, /;\s*Secure(?:;|$)/i, /;\s*HttpOnly(?:;|$)/i, /;\s*SameSite=Lax(?:;|$)/i]) expect(header).toMatch(flag);
  // The production server must issue Secure cookies. Browsers may discard them
  // on this plain-HTTP test origin; persistence/POST is tested on the local profile.
  const cookies = await context.cookies();
  expect(cookies.length).toBeLessThanOrEqual(1);
  for (const cookie of cookies) expect(cookie).toMatchObject({ name: "XSRF-TOKEN", httpOnly: true, secure: true, sameSite: "Lax", path: "/" });
}
