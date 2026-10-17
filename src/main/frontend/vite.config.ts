import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

export default defineConfig({
  base: "/",
  experimental: {
    // static/ is a classpath packaging prefix, not part of the public URL.
    renderBuiltUrl: (filename) => `/${filename.replace(/^static\//, "")}`,
  },
  build: {
    outDir: fileURLToPath(new URL("../../../target/frontend", import.meta.url)),
    emptyOutDir: true,
    assetsDir: "static/assets",
    manifest: "asset-manifest.json",
    rollupOptions: {
      input: {
        site: fileURLToPath(new URL("./entries/site.ts", import.meta.url)),
      },
    },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
  worker: {
    format: "es",
    rollupOptions: {
      output: {
        entryFileNames: "static/assets/json-formatter-worker-[hash].js",
      },
    },
  },
  plugins: [
    {
      name: "private-production-worker-metadata",
      async writeBundle(options, bundle) {
        const workers = Object.values(bundle).filter((item) =>
          /^static\/assets\/json-formatter-worker-[\w-]+\.js$/.test(
            item.fileName,
          ),
        );
        if (!workers.length) return;
        if (workers.length !== 1 || !options.dir)
          throw new Error("BTC_WORKER_BUILD_INVALID");
        const path = resolve(options.dir, "asset-manifest.json");
        const manifest = JSON.parse(await readFile(path, "utf8")) as Record<
          string,
          unknown
        >;
        manifest["__json-formatter-worker"] = { file: workers[0]!.fileName };
        await writeFile(path, JSON.stringify(manifest, null, 2));
      },
    },
  ],
});
