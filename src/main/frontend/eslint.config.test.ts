import { ESLint } from "eslint";
import { describe, expect, it } from "vitest";

const eslint = new ESLint();
const filePath = "tools/fixture/algorithms/check.ts";

describe("pure algorithm boundaries (F02-UH02-T04)", () => {
  it.each([
    'import "../../../entries/site";',
    'import "../adapter/worker";',
    'export * from "../../../platform/i18n/messages";',
    'export { value } from "../../../design-system/components/editor";',
    'import "@codemirror/state";',
    'import "node:fs";',
    'import "fs";',
    'void fetch("/synthetic");',
    "void document.title;",
    "void localStorage.length;",
    "void globalThis;",
    'void import("../adapter/worker");',
  ])("rejects forbidden dependency: %s", async (source) => {
    const [result] = await eslint.lintText(source, { filePath });
    expect(
      result?.messages.some((m) =>
        [
          "btc/pure-imports",
          "no-restricted-imports",
          "no-restricted-globals",
          "no-restricted-syntax",
        ].includes(m.ruleId ?? ""),
      ),
    ).toBe(true);
  });

  it("permits pure relative/domain imports and pure library dependencies", async () => {
    const [result] = await eslint.lintText(
      'import "./parser"; import "../domain/types"; import "jsonc-parser"; export const size = (text: string) => text.length;',
      { filePath },
    );
    expect(result?.errorCount).toBe(0);
  });

  it("checks domain files too, without restricting adapter files", async () => {
    const [domain] = await eslint.lintText('import "../adapter/browser";', {
      filePath: "tools/fixture/domain/types.ts",
    });
    expect(domain?.messages.some((m) => m.ruleId === "btc/pure-imports")).toBe(
      true,
    );
    const [adapter] = await eslint.lintText("void document.title;", {
      filePath: "tools/fixture/adapter/browser.ts",
    });
    expect(adapter?.errorCount).toBe(0);
  });
});
