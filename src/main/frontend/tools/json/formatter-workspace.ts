import { enhanceEditorWorkspace } from "../../design-system/components/editor-workspace";
import { createWorkerManager } from "../../platform/worker-manager";
import "./formatter.css";

export function enhanceFormatter(workspace: HTMLElement) {
  const editor = enhanceEditorWorkspace(workspace);
  const run = workspace.querySelector<HTMLButtonElement>("[data-format-run]")!;
  const cancel = workspace.querySelector<HTMLButtonElement>(
    "[data-format-cancel]",
  )!;
  const indentation = workspace.querySelector<HTMLSelectElement>(
    "[data-format-indent]",
  )!;
  const output = workspace.querySelector<HTMLTextAreaElement>(
    "[data-format-output]",
  )!;
  const status = workspace.querySelector<HTMLElement>("[data-format-status]")!;
  const message = (key: string) =>
    workspace.querySelector<HTMLElement>(`[data-format-message="${key}"]`)!
      .textContent!;
  const manager = createWorkerManager(
    () =>
      new Worker(new URL("./formatter.worker.ts", import.meta.url), {
        type: "module",
      }),
    {
      status: (state) => {
        workspace.dataset.formatState = state;
        cancel.disabled = state !== "running";
        status.textContent = message(state);
      },
      output: (text) => {
        output.value = text;
      },
    },
  );
  run.addEventListener("click", () =>
    manager.start(
      indentation.value === "4" ? "json-format-4" : "json-format-2",
      editor.content(),
    ),
  );
  cancel.addEventListener("click", () => manager.cancel());
  const dispose = () => {
    manager.dispose();
    editor.dispose();
    output.value = "";
    run.disabled = cancel.disabled = indentation.disabled = true;
    workspace.dataset.formatReady = "false";
  };
  window.addEventListener("pagehide", dispose, { once: true });
  run.disabled = indentation.disabled = false;
  status.textContent = message("ready");
  workspace.dataset.formatReady = "true";
}
