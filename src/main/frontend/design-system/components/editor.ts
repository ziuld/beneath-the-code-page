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
  onChange?: () => void,
  preserveLineEndings = false,
) {
  let disposed = false;
  const freshState = () =>
    EditorState.create({
      extensions: [
        // Text codecs retain CR characters in pasted CRLF instead of normalising
        // the original text. Existing JSON editors keep their accepted defaults.
        ...(preserveLineEndings ? [EditorState.lineSeparator.of("\n")] : []),
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
        EditorView.updateListener.of((update) => {
          if (update.docChanged && !disposed) onChange?.();
        }),
      ],
    });
  const view = new EditorView({
    parent: host,
    state: freshState(),
  });
  // Keep horizontally overflowing code reachable even when Escape temporarily
  // removes the content's tab stop. The parent precedes the editable content in
  // tab order, so Escape then Tab still exits to the next workspace control.
  view.scrollDOM.tabIndex = 0;
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
    clear: () => {
      if (disposed) return;
      // A fresh state discards undo/redo and search state, not an undoable edit.
      // The explicit Clear caller owns invalidation; no edit transaction is emitted.
      view.setState(freshState());
    },
    dispose: () => {
      if (disposed) return;
      disposed = true;
      view.destroy();
    },
  };
}
