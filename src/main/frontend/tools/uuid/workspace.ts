import { generateBatch } from "./generate";

export function enhanceUuid(workspace: HTMLElement) {
  const count = workspace.querySelector<HTMLInputElement>("[data-uuid-count]")!;
  const run = workspace.querySelector<HTMLButtonElement>("[data-uuid-run]")!;
  const copy = workspace.querySelector<HTMLButtonElement>("[data-uuid-copy]")!;
  const output = workspace.querySelector<HTMLElement>("[data-uuid-output]")!;
  const status = workspace.querySelector<HTMLElement>("[data-uuid-status]")!;
  const message = (key: string) =>
    workspace.querySelector<HTMLElement>(`[data-uuid-message="${key}"]`)!
      .textContent!;
  const reset = () => {
    output.textContent = "";
    copy.disabled = true;
  };
  count.addEventListener("input", () => {
    reset();
    status.textContent = message("ready");
    count.removeAttribute("aria-invalid");
  });
  run.addEventListener("click", () => {
    reset();
    const valid =
      Number.isInteger(count.valueAsNumber) &&
      count.valueAsNumber >= 1 &&
      count.valueAsNumber <= 100;
    count.setAttribute("aria-invalid", String(!valid));
    if (!valid) {
      status.textContent = message("limit");
      return;
    }
    try {
      output.textContent = generateBatch(count.valueAsNumber);
      copy.disabled = false;
      status.textContent = message("success");
    } catch {
      status.textContent = message("unavailable");
    }
  });
  copy.addEventListener("click", () => {
    const text = output.textContent!;
    if (copy.disabled) return;
    if (!navigator.clipboard?.writeText) {
      status.textContent = message("copy-unavailable");
      return;
    }
    void navigator.clipboard.writeText(text).then(
      () => {
        if (output.textContent === text) status.textContent = message("copied");
      },
      () => {
        if (output.textContent === text)
          status.textContent = message("copy-failed");
      },
    );
  });
  count.disabled = run.disabled = false;
  status.textContent = message("ready");
  workspace.dataset.uuidReady = "true";
  window.addEventListener("pagehide", reset);
}
