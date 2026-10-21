import { EditorState } from "@codemirror/state";
import { redoDepth, undoDepth } from "@codemirror/commands";
import { EditorView } from "@codemirror/view";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { createEditor } from "./editor";

// Keep real CodeMirror states/extensions/history, replacing only the DOM view.
const rendered = vi.hoisted(() => ({ view: undefined as unknown }));
vi.mock("@codemirror/view", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@codemirror/view")>();
  return {
    ...actual,
    EditorView: new Proxy(actual.EditorView, {
      construct(_target, [config]) {
        const view = {
          scrollDOM: { tabIndex: -1 },
          state: config.state as EditorState,
          dispatch(spec: Parameters<EditorState["update"]>[0]) {
            this.state = this.state.update(spec).state;
          },
          setState(state: EditorState) {
            this.state = state;
          },
          focus: vi.fn(),
          destroy: vi.fn(),
        };
        rendered.view = view;
        return view;
      },
    }),
  };
});

describe("editor explicit history reset", () => {
  beforeEach(() => {
    rendered.view = undefined;
  });

  it("replaces active state and history while preserving nonce, labels, phrases and input policy", () => {
    const onChange = vi.fn();
    const announce = vi.fn();
    const editor = createEditor(
      {} as HTMLElement,
      "test-nonce",
      {
        label: "Input",
        descriptionId: "instructions",
        instructions: "Escape then Tab",
        match: "Match {0}",
        action: "Done",
        limit: "Too large",
        phrases: { Find: "Buscar" },
      },
      announce,
      onChange,
    );
    const view = rendered.view as { state: EditorState };
    editor.replace("PRIVATE");
    expect(undoDepth(view.state)).toBeGreaterThan(0);
    const previous = view.state;
    editor.clear();
    expect(view.state).not.toBe(previous);
    expect(editor.content()).toBe("");
    expect(undoDepth(view.state)).toBe(0);
    expect(redoDepth(view.state)).toBe(0);
    expect(view.state.facet(EditorView.cspNonce)).toBe("test-nonce");
    expect(view.state.phrase("Find")).toBe("Buscar");
    expect(view.state.facet(EditorView.contentAttributes)).toContainEqual({
      "aria-label": "Input",
      "aria-describedby": "instructions",
    });
    expect(editor.replace("x".repeat(1024 * 1024 + 1))).toBe(false);
    expect(editor.content()).toBe("");
    expect(announce).toHaveBeenLastCalledWith("Too large");
    expect(onChange).not.toHaveBeenCalled(); // Reset is not an edit transaction.
    editor.dispose();
  });

  it("allows repeated empty reset and remains inert after disposal", () => {
    const editor = createEditor(
      {} as HTMLElement,
      "nonce",
      {
        label: "Input",
        descriptionId: "instructions",
        instructions: "Escape",
        match: "Match",
        action: "Done",
        limit: "Too large",
        phrases: {},
      },
      vi.fn(),
    );
    editor.clear();
    editor.clear();
    const view = rendered.view as {
      state: EditorState;
      destroy: ReturnType<typeof vi.fn>;
    };
    editor.dispose();
    const state = view.state;
    editor.clear();
    expect(view.state).toBe(state);
    expect(editor.replace("PRIVATE")).toBe(false);
    expect(view.destroy).toHaveBeenCalledOnce();
  });
});
