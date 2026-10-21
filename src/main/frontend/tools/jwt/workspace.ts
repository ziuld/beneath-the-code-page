import { decodeJwt } from "./algorithms/decode";

export function enhanceJwt(workspace: HTMLElement) {
  const input =
    workspace.querySelector<HTMLTextAreaElement>("[data-jwt-input]")!;
  const run = workspace.querySelector<HTMLButtonElement>("[data-jwt-run]")!;
  const clear = workspace.querySelector<HTMLButtonElement>("[data-jwt-clear]")!;
  const header = workspace.querySelector<HTMLElement>("[data-jwt-header]")!;
  const payload = workspace.querySelector<HTMLElement>("[data-jwt-payload]")!;
  const status = workspace.querySelector<HTMLElement>("[data-jwt-status]")!;
  const message = (key: string) =>
    workspace.querySelector<HTMLElement>(`[data-jwt-message="${key}"]`)!
      .textContent!;
  const reset = () => {
    header.textContent = payload.textContent = "";
    input.removeAttribute("aria-invalid");
  };
  input.addEventListener("input", () => {
    reset();
    status.textContent = message("ready");
  });
  run.addEventListener("click", () => {
    reset();
    const result = decodeJwt(input.value);
    input.setAttribute("aria-invalid", String(result.status === "error"));
    if (result.status === "error") {
      status.textContent = message(result.code);
      return;
    }
    header.textContent = result.header;
    payload.textContent = result.payload;
    status.textContent = message("decoded");
  });
  clear.addEventListener("click", () => {
    input.value = input.defaultValue = "";
    reset();
    status.textContent = message("cleared");
    input.focus();
  });
  window.addEventListener("pagehide", () => {
    input.value = input.defaultValue = "";
    reset();
    status.textContent = message("ready");
  });
  input.disabled = run.disabled = clear.disabled = false;
  status.textContent = message("ready");
  workspace.dataset.jwtReady = "true";
}
