import {
  EditorState,
  Transaction,
  type Text,
  type AnnotationType,
} from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { INPUT_BYTES, withinUtf8Budget } from "../../platform/text-budget";

function* chunks(text: Text): Generator<string> {
  const cursor = text.iter();
  while (!cursor.next().done) yield cursor.value;
}

export function editorPolicy(
  messages: { match: string; action: string },
  onLimit: () => void,
  limit = INPUT_BYTES,
) {
  return EditorState.transactionFilter.of((transaction) => {
    // Inspect the document, not the computed editor state or renderer.
    if (
      transaction.docChanged &&
      (transaction.changes.newLength > limit ||
        !withinUtf8Budget(chunks(transaction.newDoc), limit))
    ) {
      onLimit();
      return [];
    }
    if (!transaction.effects.some((effect) => effect.is(EditorView.announce)))
      return transaction;
    const announcement = transaction.isUserEvent("select.search")
      ? messages.match.replace(
          "{0}",
          String(
            transaction.newDoc.lineAt(transaction.newSelection.main.head)
              .number,
          ),
        )
      : messages.action;
    function preserve<T>(type: AnnotationType<T>) {
      const value = transaction.annotation(type);
      return value === undefined ? [] : [type.of(value)];
    }
    return {
      changes: transaction.changes,
      selection: transaction.newSelection,
      scrollIntoView: transaction.scrollIntoView,
      effects: transaction.effects.map((effect) =>
        effect.is(EditorView.announce)
          ? EditorView.announce.of(announcement)
          : effect,
      ),
      // Keep standard editing/history metadata on the replaced transaction.
      annotations: [
        ...preserve(Transaction.time),
        ...preserve(Transaction.userEvent),
        ...preserve(Transaction.addToHistory),
        ...preserve(Transaction.remote),
      ],
    };
  });
}
