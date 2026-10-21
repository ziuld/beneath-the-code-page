import { createEditor } from "./editor";

export function enhanceEditorWorkspace(
  workspace: HTMLElement,
  onChange?: () => void,
  preserveLineEndings = false,
) {
  const host = workspace.querySelector<HTMLElement>("[data-editor-host]")!;
  const status = workspace.querySelector<HTMLElement>("[role=status]")!;
  const phrases: Record<string, string> = {};
  for (const node of workspace.querySelectorAll<HTMLElement>(
    "[data-editor-phrase]",
  ))
    phrases[node.dataset.editorPhrase!] = node.textContent!;
  const resource = (key: string) =>
    workspace.querySelector<HTMLElement>(`[data-editor-message="${key}"]`)!
      .textContent!;
  const editor = createEditor(
    host,
    host.dataset.nonce!,
    {
      label: resource("label"),
      descriptionId: host.dataset.descriptionId!,
      instructions: workspace.querySelector<HTMLElement>(
        `#${host.dataset.descriptionId!}`,
      )!.textContent!,
      match: resource("match"),
      action: resource("action"),
      limit: resource("limit"),
      phrases,
    },
    (message) => {
      status.textContent = message;
    },
    onChange,
    preserveLineEndings,
  );
  // Page lifecycle owns resources; no payload globals, URLs or persistence.
  window.addEventListener("pagehide", () => editor.dispose(), { once: true });
  workspace.dataset.editorReady = "true";
  return editor;
}
