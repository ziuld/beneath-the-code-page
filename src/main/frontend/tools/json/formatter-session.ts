import {
  createWorkerManager,
  type JobWorker,
  type WorkerDiagnostic,
  type WorkerStatus,
} from "../../platform/worker-manager";

export type FormatterStatus = WorkerStatus | "ready" | "stale";

/** Page-local result ownership; worker lifecycle stays in the shared manager. */
export function createFormatterSession(
  factory: () => JobWorker,
  view: {
    status: (state: FormatterStatus) => void;
    output: (text: string) => void;
    current: (current: boolean) => void;
    diagnostic: (diagnostic: WorkerDiagnostic, input: string) => void;
  },
) {
  let revision = 0;
  let jobRevision = -1;
  let jobInput = "";
  let lastOutput = "";
  let current = false;
  let disposed = false;
  const manager = createWorkerManager(factory, {
    status: (state) => {
      if (disposed || jobRevision !== revision) return;
      if (state !== "success") {
        current = false;
        view.current(false);
      }
      view.status(state);
    },
    output: (text) => {
      if (disposed || jobRevision !== revision) return;
      lastOutput = text;
      current = true;
      view.output(text);
      view.current(true);
    },
    diagnostic: (diagnostic) => {
      if (!disposed && jobRevision === revision)
        view.diagnostic(diagnostic, jobInput);
    },
  });
  function invalidate() {
    revision++;
    jobRevision = -1;
    jobInput = "";
    current = false;
    manager.cancel();
    view.current(false);
  }
  return {
    start(input: string, indentation: 2 | 4) {
      if (disposed) return false;
      invalidate();
      jobRevision = revision;
      jobInput = input;
      return manager.start(`json-format-${indentation}`, input);
    },
    invalidate() {
      if (disposed) return;
      invalidate();
      view.status(lastOutput ? "stale" : "ready");
    },
    cancel() {
      if (disposed) return;
      invalidate();
      view.status("cancelled");
    },
    currentResult() {
      return !disposed && current
        ? { revision, output: lastOutput }
        : undefined;
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      revision++;
      jobRevision = -1;
      jobInput = lastOutput = "";
      current = false;
      manager.dispose();
      view.output("");
      view.current(false);
    },
  };
}
