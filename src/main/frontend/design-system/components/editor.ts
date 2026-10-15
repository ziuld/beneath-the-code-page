import { EditorState } from "@codemirror/state";
import { EditorView, hoverTooltip, keymap } from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import { search, searchKeymap } from "@codemirror/search";
import { editorPolicy } from "./editor-policy";
import "../styles/editor.css";

export interface EditorMessages {
  label: string;
  descriptionId: string;
  instructions: string;
  match: string;
  action: string;
  limit: string;
  phrases: Record<string, string>;
}

export function createEditor(
  host: HTMLElement,
  nonce: string,
  messages: EditorMessages,
  announce: (message: string) => void,
) {
  const view = new EditorView({
    parent: host,
    state: EditorState.create({
      extensions: [
        EditorView.cspNonce.of(nonce),
        EditorView.contentAttributes.of({
          "aria-label": messages.label,
          "aria-describedby": messages.descriptionId,
        }),
        EditorState.phrases.of(messages.phrases),
        history(),
        search({ top: true }),
        hoverTooltip((_editor, pos) => ({
          pos,
          create: () => {
            const dom = document.createElement("div");
            dom.className = "editor-help-tooltip";
            dom.setAttribute("role", "tooltip");
            dom.textContent = messages.instructions;
            return { dom };
          },
        })),
        // Go-to-line is intentionally omitted: it creates an input form.
        keymap.of([
          ...searchKeymap.filter((binding) => binding.key !== "Mod-g"),
          {
            key: "Escape",
            run: (editor) => {
              // Search closes first; otherwise Escape must work with a selection.
              editor.setTabFocusMode(2000);
              return true;
            },
          },
          ...defaultKeymap,
          ...historyKeymap,
          indentWithTab,
        ]),
        editorPolicy(messages, () => announce(messages.limit)),
      ],
    }),
  });
  let disposed = false;
  return {
    content: () => view.state.doc.toString(),
    replace: (text: string) => {
      if (disposed) return false;
      const before = view.state;
      view.dispatch({
        changes: { from: 0, to: before.doc.length, insert: text },
      });
      return view.state.doc.toString() === text;
    },
    focus: () => {
      if (!disposed) view.focus();
    },
    dispose: () => {
      if (disposed) return;
      disposed = true;
      view.destroy();
    },
  };
}
