import { enhanceEditorWorkspace } from "../../design-system/components/editor-workspace";
import { createFormatterSession } from "./formatter-session";
import "./formatter.css";
import { sourcePosition } from "./algorithms/position";

export function enhanceFormatter(workspace: HTMLElement) {
  const editor = enhanceEditorWorkspace(workspace, () => session.invalidate());
  const run = workspace.querySelector<HTMLButtonElement>("[data-format-run]")!;
  const cancel = workspace.querySelector<HTMLButtonElement>(
    "[data-format-cancel]",
  )!;
  const indentation = workspace.querySelector<HTMLSelectElement>(
    "[data-format-indent]",
  )!;
  const output = workspace.querySelector<HTMLElement>("[data-format-output]")!;
  const status = workspace.querySelector<HTMLElement>("[data-format-status]")!;
  const copy =
    workspace.querySelector<HTMLButtonElement>("[data-format-copy]")!;
  const clear = workspace.querySelector<HTMLButtonElement>(
    "[data-format-clear]",
  )!;
  const message = (key: string) =>
    workspace.querySelector<HTMLElement>(`[data-format-message="${key}"]`)!
      .textContent!;
  const outputLabel = workspace.querySelector<HTMLElement>(
    "[data-format-output-label]",
  )!;
  const session = createFormatterSession(
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
        output.textContent = text;
      },
      current: (current) => {
        copy.disabled = !current;
        workspace.dataset.formatCurrent = String(current);
        outputLabel.textContent = message(current ? "current" : "output");
      },
      diagnostic: (diagnostic, jobInput) => {
        const position = sourcePosition(jobInput, diagnostic.offset ?? 0);
        status.textContent = message(diagnostic.code)
          .replace("{0}", String(position.line))
          .replace("{1}", String(position.column));
      },
    },
  );
  run.addEventListener("click", () => {
    session.start(editor.content(), indentation.value === "4" ? 4 : 2);
  });
  cancel.addEventListener("click", () => session.cancel());
  indentation.addEventListener("change", () => session.invalidate());
  copy.addEventListener("click", () => {
    void session.copy(
      navigator.clipboard?.writeText
        ? (text) => navigator.clipboard.writeText(text)
        : undefined,
    );
  });
  clear.addEventListener("click", () => {
    session.clear();
    editor.clear();
    clear.focus();
  });
  const dispose = () => {
    session.dispose();
    editor.dispose();
    output.textContent = "";
    run.disabled =
      cancel.disabled =
      indentation.disabled =
      copy.disabled =
      clear.disabled =
        true;
    workspace.dataset.formatReady = "false";
  };
  window.addEventListener("pagehide", dispose, { once: true });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      // Disposed workspaces never revive payloads/workers from the back-forward cache.
      dispose();
      status.textContent = message("unavailable");
    }
  });
  run.disabled = indentation.disabled = clear.disabled = false;
  status.textContent = message("ready");
  workspace.dataset.formatCurrent = "false";
  workspace.dataset.formatReady = "true";
}
