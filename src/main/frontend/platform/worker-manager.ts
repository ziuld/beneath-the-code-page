import { INPUT_BYTES, OUTPUT_BYTES, withinUtf8Budget } from "./text-budget";
import { postWorkerInput } from "./worker-input";

export type WorkerStatus =
  | "running"
  | "success"
  | "cancelled"
  | "timeout"
  | "error"
  | "input-limit"
  | "output-limit";

export interface JobWorker {
  postMessage(message: unknown): void;
  terminate(): void;
  onmessage: ((event: MessageEvent<unknown>) => void) | null;
  onerror: ((event: ErrorEvent) => void) | null;
  onmessageerror: ((event: MessageEvent<unknown>) => void) | null;
}

export interface WorkerDiagnostic {
  code: "syntax" | "depth-limit" | "input-limit" | "output-limit";
  offset?: number;
}

function readDiagnostic(
  value: unknown,
  inputLength: number,
): WorkerDiagnostic | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value))
    return undefined;
  const diagnostic = value as Record<string, unknown>;
  if (Object.keys(diagnostic).some((key) => key !== "code" && key !== "offset"))
    return undefined;
  if (
    !["syntax", "depth-limit", "input-limit", "output-limit"].includes(
      diagnostic.code as string,
    )
  )
    return undefined;
  if (diagnostic.code === "syntax") {
    if (
      !Number.isSafeInteger(diagnostic.offset) ||
      (diagnostic.offset as number) < 0 ||
      (diagnostic.offset as number) > inputLength
    )
      return undefined;
  } else if (diagnostic.offset !== undefined) return undefined;
  return diagnostic as unknown as WorkerDiagnostic;
}

interface Job {
  id: number;
  operation: string;
  worker: JobWorker;
  timer: ReturnType<typeof setTimeout>;
  expires: number;
}

/** One active in-memory job. This owns lifecycle, not algorithms or UI messages. */
export function createWorkerManager(
  factory: () => JobWorker,
  callbacks: {
    status: (status: WorkerStatus) => void;
    output: (text: string) => void;
    diagnostic?: (diagnostic: WorkerDiagnostic) => void;
  },
) {
  let active: Job | undefined;
  let sequence = 0;
  let disposed = false;

  function release() {
    const job = active;
    active = undefined;
    if (!job) return;
    clearTimeout(job.timer);
    job.worker.onmessage =
      job.worker.onerror =
      job.worker.onmessageerror =
        null;
    job.worker.terminate();
  }

  function finish(
    job: Job,
    status: WorkerStatus,
    output?: string,
    diagnostic?: WorkerDiagnostic,
  ) {
    if (disposed || active !== job) return;
    release();
    if (output !== undefined) callbacks.output(output);
    if (!disposed && sequence === job.id) callbacks.status(status);
    if (diagnostic && !disposed && sequence === job.id)
      callbacks.diagnostic?.(diagnostic);
  }

  return {
    start(operation: string, input: string): boolean {
      if (disposed) return false;
      release();
      const id = ++sequence;
      if (
        !/^[a-z][a-z0-9-]{0,31}$/.test(operation) ||
        typeof input !== "string"
      ) {
        callbacks.status("error");
        return false;
      }
      if (
        input.length > INPUT_BYTES ||
        !withinUtf8Budget([input], INPUT_BYTES)
      ) {
        callbacks.status("input-limit");
        return false;
      }
      let worker: JobWorker;
      try {
        worker = factory();
      } catch {
        callbacks.status("error");
        return false;
      }
      const job: Job = {
        id,
        operation,
        worker,
        expires: performance.now() + 2000,
        timer: setTimeout(() => finish(job, "timeout"), 2000),
      };
      active = job;
      worker.onmessage = (event) => {
        if (disposed || active !== job) return;
        if (performance.now() >= job.expires) return finish(job, "timeout");
        const response = event.data;
        if (
          !response ||
          typeof response !== "object" ||
          Array.isArray(response)
        )
          return finish(job, "error");
        const message = response as Record<string, unknown>;
        if (!Number.isSafeInteger(message.id)) return finish(job, "error");
        if (message.id !== job.id) return;
        if (message.operation !== job.operation) return finish(job, "error");
        if (message.status === "error")
          return finish(
            job,
            "error",
            undefined,
            readDiagnostic(message.diagnostic, input.length),
          );
        if (message.status !== "success" || typeof message.output !== "string")
          return finish(job, "error");
        if (
          message.output.length > OUTPUT_BYTES ||
          !withinUtf8Budget([message.output], OUTPUT_BYTES)
        )
          return finish(job, "output-limit");
        finish(job, "success", message.output);
      };
      worker.onerror = (event) => {
        event.preventDefault();
        finish(job, "error");
      };
      worker.onmessageerror = () => finish(job, "error");
      callbacks.status("running");
      if (disposed || active !== job) return false;
      try {
        if (!postWorkerInput(worker, { id, operation, input })) {
          finish(job, "input-limit");
          return false;
        }
      } catch {
        finish(job, "error");
        return false;
      }
      return true;
    },
    cancel() {
      if (active) finish(active, "cancelled");
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      release();
    },
  };
}
