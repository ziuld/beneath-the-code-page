import { INPUT_BYTES, withinUtf8Budget } from "./text-budget";

export interface WorkerRequest {
  id: number;
  operation: string;
  input: string;
}

/** Check before structured cloning; lifecycle/status handling belongs to the caller. */
export function postWorkerInput(
  worker: Pick<Worker, "postMessage">,
  request: WorkerRequest,
): boolean {
  if (
    request.input.length > INPUT_BYTES ||
    !withinUtf8Budget([request.input], INPUT_BYTES)
  )
    return false;
  worker.postMessage(request);
  return true;
}
