import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

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
});
