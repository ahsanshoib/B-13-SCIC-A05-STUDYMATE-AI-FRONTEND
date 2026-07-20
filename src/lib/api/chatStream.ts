export interface StreamChatCallbacks {
  onInit?: (conversationId: string) => void;
  onChunk: (text: string) => void;
  onDone?: (suggestedFollowUps: string[]) => void;
  onError?: (message: string) => void;
}

/**
 * Streams a chat reply using fetch + ReadableStream, parsing Server-Sent
 * Events manually (axios has no native SSE support).
 */
export async function streamChatMessage(
  params: { conversationId?: string; message: string },
  callbacks: StreamChatCallbacks
): Promise<void> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

  const response = await fetch(`${baseURL}/chat/stream`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok || !response.body) {
    callbacks.onError?.("Could not reach the AI assistant. Please try again.");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const rawEvent of events) {
      const lines = rawEvent.split("\n");
      const eventLine = lines.find((l) => l.startsWith("event:"));
      const dataLine = lines.find((l) => l.startsWith("data:"));
      if (!eventLine || !dataLine) continue;

      const eventName = eventLine.replace("event:", "").trim();
      const data = JSON.parse(dataLine.replace("data:", "").trim());

      if (eventName === "init") callbacks.onInit?.(data.conversationId);
      if (eventName === "chunk") callbacks.onChunk(data.text);
      if (eventName === "done") callbacks.onDone?.(data.suggestedFollowUps ?? []);
      if (eventName === "error") callbacks.onError?.(data.message);
    }
  }
}
