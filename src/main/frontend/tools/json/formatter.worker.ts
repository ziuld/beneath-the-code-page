import { processJsonRequest } from "./worker-protocol";

self.onmessage = (event: MessageEvent<unknown>) => {
  const response = processJsonRequest(event.data);
  if (response) self.postMessage(response);
};
