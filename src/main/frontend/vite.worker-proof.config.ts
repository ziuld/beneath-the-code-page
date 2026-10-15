import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import base from "./vite.config";

// Only the copied browser-proof JAR uses this build. Normal Maven assets are untouched.
export default defineConfig({
  ...base,
  build: {
    ...base.build,
    outDir: fileURLToPath(
      new URL("../../../target/worker-proof", import.meta.url),
    ),
    rollupOptions: {
      input: {
        "worker-proof": fileURLToPath(
          new URL("../../test/frontend/worker-proof.ts", import.meta.url),
        ),
      },
      output: {
        entryFileNames: "static/assets/proof-[name]-[hash].js",
        chunkFileNames: "static/assets/proof-[name]-[hash].js",
        assetFileNames: "static/assets/proof-[name]-[hash][extname]",
      },
    },
  },
  worker: {
    format: "es",
    rollupOptions: {
      output: { entryFileNames: "static/assets/proof-worker-[hash].js" },
    },
  },
  plugins: [
    {
      name: "private-worker-proof-resources",
      generateBundle(_options, bundle) {
        const workers = Object.values(bundle)
          .filter(
            (item) =>
              item.type === "asset" &&
              /^static\/assets\/proof-worker-[\w-]+\.js$/.test(item.fileName),
          )
          .map((item) => item.fileName);
        this.emitFile({
          type: "asset",
          fileName: "worker-proof-resources.json",
          source: JSON.stringify(workers),
        });
      },
    },
  ],
});
