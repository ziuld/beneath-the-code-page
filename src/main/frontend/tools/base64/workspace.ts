import { enhanceEditorWorkspace } from "../../design-system/components/editor-workspace";
import { createToolSession } from "../../platform/tool-session";

export function enhanceBase64(workspace: HTMLElement) {
  const mode =
    workspace.querySelector<HTMLSelectElement>("[data-base64-mode]")!;
  const run = workspace.querySelector<HTMLButtonElement>("[data-base64-run]")!;
  const cancel = workspace.querySelector<HTMLButtonElement>(
    "[data-base64-cancel]",
  )!;
  const copy =
    workspace.querySelector<HTMLButtonElement>("[data-base64-copy]")!;
  const clear = workspace.querySelector<HTMLButtonElement>(
    "[data-base64-clear]",
  )!;
  const output = workspace.querySelector<HTMLElement>("[data-base64-output]")!;
  const status = workspace.querySelector<HTMLElement>("[data-base64-status]")!;
  const feedback = workspace.querySelector<HTMLElement>(
    "[data-editor-feedback]",
  )!;
  const label = workspace.querySelector<HTMLElement>(
    "[data-base64-output-label]",
  )!;
  const message = (key: string) =>
    workspace.querySelector<HTMLElement>(`[data-base64-message="${key}"]`)!
      .textContent!;
  const editor = enhanceEditorWorkspace(
    workspace,
    () => {
      feedback.textContent = "";
      session.invalidate();
    },
    true,
  );
  const session = createToolSession(
    () =>
      new Worker(new URL("../json/formatter.worker.ts", import.meta.url), {
        type: "module",
      }),
    {
      status: (state) => {
        workspace.dataset.base64State = state;
        cancel.disabled = state !== "running";
        status.textContent = message(state);
      },
      output: (text) => {
        output.textContent = text;
      },
      current: (value) => {
        workspace.dataset.base64Current = String(value);
        copy.disabled = !value;
        label.textContent = message(value ? "current" : "output");
      },
      diagnostic: (diagnostic) => {
        status.textContent = message(
          diagnostic.code === "syntax"
            ? mode.value === "encode"
              ? "invalid-text"
              : "invalid-base64"
            : diagnostic.code,
        );
      },
    },
  );
  run.addEventListener("click", () => {
    if (mode.value === "encode" || mode.value === "decode")
      session.start(editor.content(), `base64-${mode.value}`);
  });
  mode.addEventListener("change", () => {
    session.invalidate();
    run.textContent = message(mode.value === "decode" ? "decode" : "encode");
  });
  cancel.addEventListener("click", () => session.cancel());
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
    feedback.textContent = "";
    clear.focus();
  });
  const dispose = () => {
    session.dispose();
    editor.dispose();
    feedback.textContent = "";
    output.textContent = "";
    for (const control of [mode, run, cancel, copy, clear])
      control.disabled = true;
    workspace.dataset.base64Ready = "false";
  };
  window.addEventListener("pagehide", dispose, { once: true });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      dispose();
      status.textContent = message("unavailable");
    }
  });
  mode.disabled = run.disabled = clear.disabled = false;
  status.textContent = message("ready");
  workspace.dataset.base64Current = "false";
  workspace.dataset.base64Ready = "true";
}
