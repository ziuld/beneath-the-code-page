import js from "@eslint/js";
import tseslint from "typescript-eslint";
import { dirname, resolve } from "node:path";
import { builtinModules } from "node:module";

const pureImports = {
  meta: {
    type: "problem",
    schema: [],
    messages: {
      boundary:
        "Pure algorithms must not import browser adapters or application wiring.",
    },
  },
  create(context) {
    const filename = context.filename.replaceAll("\\", "/");
    const capability = filename.match(
      /^(.*\/tools\/[^/]+)\/(?:algorithms|domain)\//,
    )?.[1];
    function check(node) {
      const source = node.source?.value;
      if (!capability || typeof source !== "string" || !source.startsWith("."))
        return;
      const target = resolve(dirname(filename), source).replaceAll("\\", "/");
      if (
        !["algorithms", "domain"].some((layer) =>
          target.startsWith(`${capability}/${layer}/`),
        )
      ) {
        context.report({ node, messageId: "boundary" });
      }
    }
    return {
      ImportDeclaration: check,
      ExportNamedDeclaration: check,
      ExportAllDeclaration: check,
    };
  },
};

export default [
  { ignores: ["node_modules/**"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["tools/*/algorithms/**/*.ts", "tools/*/domain/**/*.ts"],
    plugins: { btc: { rules: { "pure-imports": pureImports } } },
    rules: {
      "btc/pure-imports": "error",
      "no-restricted-imports": [
        "error",
        {
          paths: builtinModules,
          patterns: [
            "@codemirror/*",
            "codemirror",
            "node:*",
            "@monaco-editor/*",
            "monaco-editor",
          ],
        },
      ],
      "no-restricted-globals": [
        "error",
        "window",
        "document",
        "self",
        "globalThis",
        "fetch",
        "XMLHttpRequest",
        "WebSocket",
        "EventSource",
        "navigator",
        "localStorage",
        "sessionStorage",
        "indexedDB",
        "caches",
        "Worker",
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector: "ImportExpression",
          message: "Pure algorithms use static, boundary-checked imports only.",
        },
      ],
    },
  },
];
