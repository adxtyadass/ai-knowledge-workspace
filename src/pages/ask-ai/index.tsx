import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AskAiInput from "../../components/ask-ai/ask-ai-input";
import { markdownToHtml } from "../../utils/markdown";
import { HeadCircuitIcon } from "@phosphor-icons/react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

const API_URL = "http://localhost:5000/api/ai/ask";

export default function AskAIPage() {
  const [query, setQuery] = useState("");
//   const [messages, setMessages] = useState<Message[]>([]);
    const STORAGE_KEY = "ask-ai-messages";

    const [messages, setMessages] = useState<Message[]>(() => {
        try {
            const storedMessages = localStorage.getItem(STORAGE_KEY);

            return storedMessages ? JSON.parse(storedMessages) : [];
        } catch {
            return [];
        }
    });
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = query.trim();
      if (!trimmed || isLoading) return;

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: trimmed };
      setMessages((prev) => [...prev, userMsg]);
      setQuery("");
      setIsLoading(true);
      scrollToBottom();

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: trimmed }),
        });
        const data = await res.json();

        const aiMsg: Message = { id: crypto.randomUUID(), role: "ai", content: data.answer ?? "No response received." };
        setMessages((prev) => [...prev, aiMsg]);
      } catch {
        const errMsg: Message = { id: crypto.randomUUID(), role: "ai", content: "Something went wrong. Please try again." };
        setMessages((prev) => [...prev, errMsg]);
      } finally {
        setIsLoading(false);
        scrollToBottom();
      }
    },
    [query, isLoading],
  );

    useEffect(() => {
        scrollRef.current?.scrollTo({
            top: scrollRef.current.scrollHeight,
            behavior: "smooth",
        });
    }, [messages, isLoading]);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

  return (
    <div className="flex h-full flex-col">
        <aside>

        </aside>
      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 pb-4 pt-6 sm:px-6">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-1 flex-col items-center justify-center py-20 text-center">
              <div className="mb-3 flex size-14 items-center justify-center rounded-2xl bg-primary/10">
                <HeadCircuitIcon className="size-7 text-primary" />
              </div>
              <h2 className="text-lg font-semibold text-dark">Ask AI anything</h2>
              <p className="mt-1 max-w-sm text-sm text-muted">
                Type a question below and get an AI-powered response instantly.
              </p>
            </div>
          )}

          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                <span className="size-2 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                <span className="size-2 animate-bounce rounded-full bg-slate-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      <AskAiInput
        query={query}
        setQuery={setQuery}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  const renderedHtml = useMemo(
    () => (isUser ? null : markdownToHtml(message.content)),
    [message.content, isUser],
  );

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[95%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[90%] ${
          isUser
            ? "rounded-br-md bg-primary text-white"
            : "md-content rounded-bl-md borderborder-slate-200 bgwhite text-dark"
        }`}
      >
        {isUser ? (
          message.content
        ) : (
          <div dangerouslySetInnerHTML={{ __html: renderedHtml! }} />
        )}
      </div>
    </div>
  );
}
