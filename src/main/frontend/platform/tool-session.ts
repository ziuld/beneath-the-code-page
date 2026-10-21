import {
  createWorkerManager,
  type JobWorker,
  type WorkerDiagnostic,
  type WorkerStatus,
} from "./worker-manager";

export type ToolStatus =
  | WorkerStatus
  | "ready"
  | "stale"
  | "copied"
  | "copy-failed"
  | "copy-unavailable"
  | "cleared";

/** Page-local result ownership; worker lifecycle stays in the shared manager. */
export function createToolSession(
  factory: () => JobWorker,
  view: {
    status: (state: ToolStatus) => void;
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
  let hasOutput = false;
  let disposed = false;
  let copyAttempt = 0;
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
      hasOutput = true;
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
    start(input: string, operation: string) {
      if (disposed) return false;
      invalidate();
      jobRevision = revision;
      jobInput = input;
      return manager.start(operation, input);
    },
    invalidate() {
      if (disposed) return;
      invalidate();
      view.status(hasOutput ? "stale" : "ready");
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
    async copy(write?: (text: string) => Promise<void>) {
      if (disposed || !current) return;
      const copyRevision = revision;
      const attempt = ++copyAttempt;
      const eligible = () =>
        !disposed &&
        current &&
        revision === copyRevision &&
        copyAttempt === attempt;
      if (!write) {
        view.status("copy-unavailable");
        return;
      }
      try {
        // Invoked synchronously within the caller's user activation, before awaiting.
        await write(lastOutput);
        if (eligible()) view.status("copied");
      } catch {
        if (eligible()) view.status("copy-failed");
      }
    },
    clear() {
      if (disposed) return;
      invalidate();
      lastOutput = "";
      hasOutput = false;
      view.output("");
      view.status("cleared");
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
