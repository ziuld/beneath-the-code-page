import { EditorState, StateEffect, Transaction } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { describe, expect, it, vi } from "vitest";
import { editorPolicy } from "./editor-policy";

const messages = { match: "Match on line {0}.", action: "Action completed." };

describe("editor transaction policy", () => {
  it("replaces content-bearing search announcements before state rendering", () => {
    const other = StateEffect.define<boolean>();
    const state = EditorState.create({
      doc: "sentinel\nsentinel",
      extensions: [editorPolicy(messages, vi.fn())],
    });
    const transaction = state.update({
      selection: { anchor: 9 },
      effects: [EditorView.announce.of("SECRET excerpt"), other.of(true)],
      userEvent: "select.search",
      scrollIntoView: true,
      annotations: Transaction.addToHistory.of(false),
    });
    expect(transaction.effects[0]!.value).toBe("Match on line 2.");
    expect(transaction.effects[1]!.is(other)).toBe(true);
    expect(transaction.newSelection.main.head).toBe(9);
    expect(transaction.scrollIntoView).toBe(true);
    expect(transaction.annotation(Transaction.addToHistory)).toBe(false);
    expect(transaction.annotation(Transaction.userEvent)).toBe("select.search");
  });
  it("retains replacement edits while suppressing excerpt effects", () => {
    const state = EditorState.create({
      doc: "secret",
      extensions: [editorPolicy(messages, vi.fn())],
    });
    const transaction = state.update({
      changes: { from: 0, to: 6, insert: "new" },
      effects: EditorView.announce.of("new secret"),
      userEvent: "input.replace",
    });
    expect(transaction.newDoc.toString()).toBe("new");
    expect(transaction.effects[0]!.value).toBe(messages.action);
  });
  it("rejects oversized insertion and replacement without changing accepted text", () => {
    const onLimit = vi.fn();
    const state = EditorState.create({
      doc: "é",
      extensions: [editorPolicy(messages, onLimit, 4)],
    });
    expect(
      state.update({ changes: { from: 1, insert: "é" } }).newDoc.toString(),
    ).toBe("éé");
    expect(
      state.update({ changes: { from: 1, insert: "€" } }).newDoc.toString(),
    ).toBe("é");
    expect(
      state
        .update({ changes: { from: 0, to: 1, insert: "😀x" } })
        .newDoc.toString(),
    ).toBe("é");
    expect(onLimit).toHaveBeenCalledTimes(2);
    expect(
      state
        .update({ changes: { from: 0, to: 1, insert: "😀" } })
        .newDoc.toString(),
    ).toBe("😀");
  });
});
