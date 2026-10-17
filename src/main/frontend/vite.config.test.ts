import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { describe, expect, it } from "vitest";
import config from "./vite.config";
import proofConfig from "./vite.worker-proof.config";

interface ManifestEntry {
  file: string;
  isEntry: boolean;
  css: string[];
}

describe("SSR asset build", () => {
  it("emits the isolated proof worker with explicit private metadata", async () => {
    const target = fileURLToPath(new URL("../../../target", import.meta.url));
    await mkdir(target, { recursive: true });
    const output = await mkdtemp(join(target, "btc-worker-proof-"));
    try {
      await build({
        ...proofConfig,
        configFile: false,
        build: { ...proofConfig.build, outDir: output },
      });
      const workers = JSON.parse(
        await readFile(join(output, "worker-proof-resources.json"), "utf8"),
      ) as string[];
      expect(workers).toHaveLength(1);
      expect(workers[0]).toMatch(/^static\/assets\/proof-worker-[\w-]+\.js$/);
      await expect(readFile(join(output, workers[0]!))).resolves.toBeInstanceOf(
        Buffer,
      );
      const manifest = JSON.parse(
        await readFile(join(output, "asset-manifest.json"), "utf8"),
      ) as Record<string, ManifestEntry>;
      const entry = Object.values(manifest).find((item) => item.isEntry)!;
      expect(entry.file).toMatch(
        /^static\/assets\/proof-worker-proof-[\w-]+\.js$/,
      );
      expect(await readFile(join(output, entry.file), "utf8")).toContain(
        workers[0]!.replace(/^static\//, ""),
      );
    } finally {
      await rm(output, { recursive: true, force: true });
    }
  });

  it("records lazy chunks but emits worker files outside manifest entries", async () => {
    const target = fileURLToPath(new URL("../../../target", import.meta.url));
    await mkdir(target, { recursive: true });
    const fixture = await mkdtemp(join(target, "btc-worker-build-"));
    const output = join(fixture, "output");
    try {
      await writeFile(
        join(fixture, "entry.ts"),
        'document.querySelector("[data-proof]") && import("./lazy");',
      );
      await writeFile(
        join(fixture, "lazy.ts"),
        'import "./lazy.css"; new Worker(new URL("./probe.worker.ts", import.meta.url), {type: "module"});',
      );
      await writeFile(
        join(fixture, "lazy.css"),
        "[data-proof] { color: red; }",
      );
      await writeFile(
        join(fixture, "probe.worker.ts"),
        'self.onmessage = () => self.postMessage("probe");',
      );
      await build({
        ...config,
        configFile: false,
        root: fixture,
        // This generic Vite probe is not the production formatter worker.
        worker: {
          format: "es",
          rollupOptions: {
            output: { entryFileNames: "static/assets/[name]-[hash].js" },
          },
        },
        build: {
          ...config.build,
          outDir: output,
          rollupOptions: { input: { entry: join(fixture, "entry.ts") } },
        },
      });
      const manifest = JSON.parse(
        await readFile(join(output, "asset-manifest.json"), "utf8"),
      ) as Record<string, ManifestEntry & { dynamicImports?: string[] }>;
      const entry = manifest["entry.ts"]!;
      expect(entry.dynamicImports).toEqual(["lazy.ts"]);
      const files = await readdir(join(output, "static/assets"));
      const worker = files.find((name) =>
        /^probe\.worker-[\w-]+\.js$/.test(name),
      );
      expect(worker).toBeDefined();
      expect(Object.values(manifest).map((item) => item.file)).not.toContain(
        `static/assets/${worker}`,
      );
      expect(
        await readFile(join(output, manifest["lazy.ts"]!.file), "utf8"),
      ).toContain(`/assets/${worker}`);
      const entryCode = await readFile(join(output, entry.file), "utf8");
      expect(entryCode).not.toContain("/static/assets/");
      const lazy = manifest["lazy.ts"]!;
      expect(lazy.css).toHaveLength(1);
      expect(entryCode).toContain(lazy.css[0]!.replace(/^static\//, ""));
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  });

  it("emits hashed JS and imported CSS with a manifest outside the public tree", async () => {
    const target = fileURLToPath(new URL("../../../target", import.meta.url));
    await mkdir(target, { recursive: true });
    const fixture = await mkdtemp(join(target, "btc-asset-build-"));
    try {
      await build({
        ...config,
        configFile: false,
        build: { ...config.build, outDir: fixture },
      });
      const manifest = JSON.parse(
        await readFile(join(fixture, "asset-manifest.json"), "utf8"),
      ) as Record<string, ManifestEntry>;
      const site = manifest["entries/site.ts"];
      expect(site?.isEntry).toBe(true);
      expect(site?.file).toMatch(/^static\/assets\/site-[\w-]+\.js$/);
      expect(site?.css).toHaveLength(1);
      for (const path of [site!.file, ...site!.css]) {
        expect(path).toMatch(/^static\/assets\/[\w-]+\.(js|css)$/);
        await expect(readFile(join(fixture, path))).resolves.toBeInstanceOf(
          Buffer,
        );
      }
      await expect(
        readFile(join(fixture, "static/asset-manifest.json")),
      ).rejects.toMatchObject({
        code: "ENOENT",
      });
      expect(await readFile(join(fixture, site!.css[0]!), "utf8")).toContain(
        "@layer btc-base",
      );
      const worker = manifest["__json-formatter-worker"]!;
      expect(worker.file).toMatch(
        /^static\/assets\/json-formatter-worker-[\w-]+\.js$/,
      );
      const workerCode = await readFile(join(fixture, worker.file), "utf8");
      expect(workerCode).not.toMatch(
        /\bfetch\s*\(|XMLHttpRequest|importScripts\s*\(|\bimport\s*\(/,
      );
      expect(workerCode).not.toContain("proof-worker");
      expect(site!.file).not.toBe(worker.file);
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  });
});
