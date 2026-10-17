import {
  createWorkerManager,
  type WorkerStatus,
} from "../../main/frontend/platform/worker-manager";

const workspace = document.querySelector<HTMLElement>(
  "[data-editor-workspace]",
)!;
const proof = document.querySelector<HTMLElement>("[data-worker-proof]")!;
const { enhanceEditorWorkspace } =
  await import("../../main/frontend/design-system/components/editor-workspace");
const editor = enhanceEditorWorkspace(workspace);
const output = proof.querySelector<HTMLElement>("[data-worker-output]")!;
const status = proof.querySelector<HTMLElement>("[data-worker-status]")!;
const cancel = proof.querySelector<HTMLButtonElement>("[data-worker-cancel]")!;
const message = (key: WorkerStatus) =>
  proof.querySelector<HTMLElement>(`[data-worker-message="${key}"]`)!
    .textContent!;
const manager = createWorkerManager(
  () =>
    new Worker(new URL("./proof.worker.ts", import.meta.url), {
      type: "module",
    }),
  {
    status: (state) => {
      proof.dataset.state = state;
      status.textContent = message(state);
      cancel.disabled = state !== "running";
    },
    output: (text) => {
      output.textContent = text;
    },
  },
);
for (const button of proof.querySelectorAll<HTMLButtonElement>(
  "[data-operation]",
))
  button.addEventListener("click", () =>
    manager.start(button.dataset.operation!, editor.content()),
  );
cancel.addEventListener("click", () => manager.cancel());
function dispose() {
  manager.dispose();
  editor.dispose();
  proof.dataset.disposed = "true";
  for (const button of proof.querySelectorAll<HTMLButtonElement>("button"))
    button.disabled = true;
}
proof
  .querySelector<HTMLButtonElement>("[data-worker-dispose]")!
  .addEventListener("click", dispose);
window.addEventListener("pagehide", dispose, { once: true });
proof.dataset.ready = "true";
