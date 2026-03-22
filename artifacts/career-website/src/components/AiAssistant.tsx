import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "What are Nour's main skills?",
  "Tell me about her SERS research",
  "Is she open to relocation?",
  "What projects has she built?",
];

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Nour's AI assistant 👋 Ask me anything about her background, skills, or experience — I'm here to help you decide she's the right hire!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    setStreaming("");

    try {
      const res = await fetch(`${BASE_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.done) {
              setMessages((m) => [
                ...m,
                { role: "assistant", content: accumulated },
              ]);
              setStreaming("");
            } else if (data.content) {
              accumulated += data.content;
              setStreaming(accumulated);
            }
          } catch {
            // ignore parse errors
          }
        }
      }
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I'm having a moment. Try refreshing or emailing Nour directly at noormich@post.bgu.ac.il!",
        },
      ]);
    } finally {
      setLoading(false);
      setStreaming("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-full shadow-2xl shadow-teal-300/50 flex items-center justify-center hover:scale-110 transition-transform ${open ? "opacity-0 pointer-events-none" : ""}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-400 rounded-full border-2 border-white animate-pulse" />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] h-[520px] flex flex-col bg-white rounded-3xl shadow-2xl shadow-slate-300/50 border border-slate-100 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">Nour's Assistant</p>
                  <p className="text-teal-100 text-xs mt-0.5">Powered by AI</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === "assistant"
                        ? "bg-gradient-to-br from-teal-500 to-emerald-500 text-white"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {msg.role === "assistant" ? (
                      <Bot size={14} />
                    ) : (
                      <User size={14} />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === "assistant"
                        ? "bg-slate-50 text-slate-700 rounded-tl-sm"
                        : "bg-gradient-to-br from-teal-500 to-emerald-500 text-white rounded-tr-sm"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Streaming message */}
              {streaming && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5 text-white">
                    <Bot size={14} />
                  </div>
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tl-sm bg-slate-50 text-slate-700 text-sm leading-relaxed">
                    {streaming}
                    <span className="inline-block w-1.5 h-3.5 bg-teal-400 ml-0.5 animate-pulse rounded-sm align-middle" />
                  </div>
                </motion.div>
              )}

              {/* Loading dots */}
              {loading && !streaming && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                  <div className="px-4 py-3 bg-slate-50 rounded-2xl rounded-tl-sm flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-teal-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions (only at start) */}
              {messages.length === 1 && !loading && (
                <div className="pt-1">
                  <p className="text-xs text-slate-400 mb-2 font-medium">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-1.5 bg-teal-50 text-teal-700 rounded-full border border-teal-100 hover:bg-teal-100 transition-colors font-medium"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-slate-100 flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Nour..."
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-teal-300 focus:ring-2 focus:ring-teal-100"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center hover:bg-teal-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
