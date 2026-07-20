"use client";

import { useEffect, useRef, useState } from "react";
import { MessagesSquare, Send, Sparkles } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatBubble } from "@/components/ai/ChatBubble";
import { TypingIndicator } from "@/components/ai/TypingIndicator";
import { streamChatMessage } from "@/lib/api/chatStream";
import { ChatMessage } from "@/types/ai";

const STARTER_PROMPTS = [
  "Help me build a study plan for my finals",
  "How do I stay focused during long study sessions?",
  "Summarize the last document I uploaded",
];

export default function ChatAssistantPage() {
  const [conversationId, setConversationId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const [followUps, setFollowUps] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isStreaming) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed, createdAt: new Date().toISOString() }]);
    setInput("");
    setFollowUps([]);
    setIsStreaming(true);
    setStreamingText("");

    let accumulated = "";

    await streamChatMessage(
      { conversationId, message: trimmed },
      {
        onInit: (id) => setConversationId((prev) => prev ?? id),
        onChunk: (chunk) => {
          accumulated += chunk;
          setStreamingText(accumulated);
        },
        onDone: (suggested) => {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: accumulated, createdAt: new Date().toISOString() },
          ]);
          setStreamingText("");
          setFollowUps(suggested);
          setIsStreaming(false);
        },
        onError: (message) => {
          toast.error(message);
          setStreamingText("");
          setIsStreaming(false);
        },
      }
    );
  };

  return (
    <div className="mx-auto flex h-[calc(100vh-4rem)] max-w-3xl flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-2 py-6">
        <MessagesSquare className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">AI Chat Assistant</h1>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pb-4">
        {messages.length === 0 && !isStreaming ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <Sparkles className="h-8 w-8 text-primary" />
            <p className="max-w-sm text-sm text-muted-foreground">
              Ask about your study plan, uploaded documents, or how to use StudyMate AI.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              {STARTER_PROMPTS.map((prompt) => (
                <Button key={prompt} variant="outline" size="sm" onClick={() => sendMessage(prompt)}>
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <ChatBubble key={i} role={msg.role} content={msg.content} />
            ))}
            {isStreaming && streamingText && <ChatBubble role="assistant" content={streamingText} />}
            {isStreaming && !streamingText && <TypingIndicator />}
          </>
        )}
        <div ref={scrollRef} />
      </div>

      {followUps.length > 0 && !isStreaming && (
        <div className="flex flex-wrap gap-2 pb-3">
          {followUps.map((f) => (
            <Button key={f} variant="outline" size="sm" onClick={() => sendMessage(f)}>
              {f}
            </Button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="flex gap-2 border-t border-border py-4"
      >
        <Input
          placeholder="Ask StudyMate AI anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isStreaming}
        />
        <Button type="submit" size="icon" disabled={isStreaming || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}