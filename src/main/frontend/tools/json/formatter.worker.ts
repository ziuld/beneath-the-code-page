import { processJsonRequest } from "./worker-protocol";
import { processBase64Request } from "../base64/worker-protocol";

// One bounded production worker entry. Historical asset identity is retained for
// the existing exact manifest/CSP contract; operations remain explicitly closed.
self.onmessage = (event: MessageEvent<unknown>) => {
  const value = event.data;
  const operation =
    value && typeof value === "object"
      ? (value as Record<string, unknown>).operation
      : undefined;
  const response =
    operation === "base64-encode" || operation === "base64-decode"
      ? processBase64Request(value)
      : processJsonRequest(value);
  if (response) self.postMessage(response);
};
