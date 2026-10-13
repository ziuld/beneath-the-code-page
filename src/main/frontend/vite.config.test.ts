import { mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "vite";
import { describe, expect, it } from "vitest";
import config from "./vite.config";

interface ManifestEntry {
  file: string;
  isEntry: boolean;
  css: string[];
}

describe("SSR asset build", () => {
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
    } finally {
      await rm(fixture, { recursive: true, force: true });
    }
  });
});
