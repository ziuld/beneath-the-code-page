import { OUTPUT_BYTES } from "../../main/frontend/platform/text-budget";
import type { WorkerRequest } from "../../main/frontend/platform/worker-input";

// Synthetic algorithms and deliberate negative security probes never ship in the normal JAR.
self.onmessage = (event: MessageEvent<WorkerRequest>) => {
  const { id, operation, input } = event.data;
  const reply = (output: string) =>
    self.postMessage({ id, operation, status: "success", output });
  if (operation === "busy") {
    for (;;) {
      /* Deliberately busy only in this disposable proof worker. */
    }
  }
  if (operation === "throw") throw new Error("Synthetic worker failure");
  let output = input;
  if (operation === "oversize") output = "x".repeat(OUTPUT_BYTES + 1);
  if (operation === "network") {
    void fetch(new URL("/__worker-probe", self.location.href)).then(
      () => reply("network-allowed"),
      () => reply("network-blocked"),
    );
    return;
  }
  if (operation === "eval") {
    try {
      new Function("return 7")();
      output = "eval-allowed";
    } catch {
      output = "eval-blocked";
    }
  }
  reply(output);
};
