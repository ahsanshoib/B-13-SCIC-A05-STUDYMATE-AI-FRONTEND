import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatBubble({
  role,
  content,
}: {
  role: "user" | "assistant";
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <span
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-accent/15 text-accent"
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </span>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2.5 text-sm leading-relaxed",
          isUser
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-card text-foreground"
        )}
      >
        <p className="whitespace-pre-line">{content}</p>
      </div>
    </div>
  );
}