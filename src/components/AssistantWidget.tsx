"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  getAssistantReply,
  getGreeting,
  type AssistantAction,
} from "@/lib/assistant";
import { siteConfig } from "@/config/site";
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";

type Message = {
  id: number;
  role: "bot" | "user";
  text: string;
  actions?: AssistantAction[];
};

let nextId = 1;

export default function AssistantWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Seed the greeting the first time the panel opens.
  useEffect(() => {
    if (open && messages.length === 0) {
      const g = getGreeting();
      setMessages([{ id: nextId++, role: "bot", text: g.text, actions: g.actions }]);
    }
  }, [open, messages.length]);

  // Auto-scroll to the newest message.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput("");
    setMessages((m) => [...m, { id: nextId++, role: "user", text: trimmed }]);
    setTyping(true);

    // Small delay so it feels like the assistant is "thinking".
    window.setTimeout(() => {
      const reply = getAssistantReply(trimmed);
      setMessages((m) => [
        ...m,
        { id: nextId++, role: "bot", text: reply.text, actions: reply.actions },
      ]);
      setTyping(false);
    }, 450);
  }

  function runAction(action: AssistantAction) {
    switch (action.kind) {
      case "navigate":
        router.push(action.value);
        setOpen(false);
        break;
      case "external":
        window.open(action.value, "_blank", "noopener,noreferrer");
        break;
      case "ask":
        send(action.value);
        break;
    }
  }

  return (
    <>
      {/* Floating launcher */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-600 text-2xl text-white shadow-lg ring-4 ring-brand-600/15 transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
      >
        {open ? <FaTimes /> : <IoChatboxEllipsesOutline />}
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-accent-500" />
          </span>
        )}
      </button>

      {/* Chat panel */}
      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "bottom right" }}
          className="fixed bottom-24 right-4 z-50 flex h-[min(70vh,520px)] w-[min(92vw,380px)] flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-2xl sm:right-6">
          {/* Header */}
          <div className="flex items-center gap-3 bg-brand-600 px-4 py-3 text-white">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 text-lg">🍽️</span>
            <div className="leading-tight">
              <p className="font-bold">{siteConfig.name} Assistant</p>
              <p className="text-xs text-brand-100">Here to help you order</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-cream px-3 py-4">
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div className="max-w-[85%]">
                  <div
                    className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-sm bg-brand-600 text-white"
                        : "rounded-bl-sm border border-line bg-surface text-ink"
                    }`}
                  >
                    {m.text}
                  </div>
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.actions.map((a, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => runAction(a)}
                          className="rounded-full border border-brand-300 bg-surface px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-surface-soft"
                        >
                          {a.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-line bg-surface px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-300 [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-300 [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-300" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-line bg-surface p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything…"
              className="flex-1 rounded-full border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200"
            />
            <button
              type="submit"
              aria-label="Send"
              disabled={!input.trim()}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
            >
              ➤
            </button>
          </form>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
