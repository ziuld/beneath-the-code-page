import {
  createToolSession,
  type ToolStatus,
} from "../../platform/tool-session";

export type FormatterStatus = ToolStatus;

/** JSON operation names remain local; lifecycle and revision ownership are shared. */
export function createFormatterSession(
  factory: Parameters<typeof createToolSession>[0],
  view: Parameters<typeof createToolSession>[1],
) {
  let validation = false;
  const session = createToolSession(factory, {
    ...view,
    status: (state) =>
      view.status(validation && state === "stale" ? "ready" : state),
  });
  return {
    ...session,
    copy(write?: (text: string) => Promise<void>) {
      // Validation acknowledges success without producing a copyable document.
      return validation ? Promise.resolve() : session.copy(write);
    },
    start(input: string, operation: 2 | 4 | "validate" | "minify") {
      validation = operation === "validate";
      return session.start(
        input,
        operation === "validate" || operation === "minify"
          ? `json-${operation}`
          : `json-format-${operation}`,
      );
    },
  };
}
