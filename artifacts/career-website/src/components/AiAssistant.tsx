import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, GripHorizontal } from "lucide-react";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTED = [
  "What makes Nour stand out? 🔬",
  "Tell me about his SERS research",
  "Is he open to relocation?",
  "What projects has he built?",
];

const MIN_W = 300;
const MIN_H = 380;
const MAX_W = 720;
const MAX_H = 860;
const DEFAULT_W = 360;
const DEFAULT_H = 520;

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm Nour's AI assistant. Ask me anything about him — his research, skills, projects, or why you should definitely hire him 😄",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState("");
  const [size, setSize] = useState({ w: DEFAULT_W, h: DEFAULT_H });

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resizing = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const startSize = useRef({ w: DEFAULT_W, h: DEFAULT_H });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const onResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    resizing.current = true;
    startPos.current = { x: e.clientX, y: e.clientY };
    startSize.current = { w: size.w, h: size.h };

    const onMove = (ev: MouseEvent) => {
      if (!resizing.current) return;
      const dx = startPos.current.x - ev.clientX;
      const dy = startPos.current.y - ev.clientY;
      setSize({
        w: Math.min(MAX_W, Math.max(MIN_W, startSize.current.w + dx)),
        h: Math.min(MAX_H, Math.max(MIN_H, startSize.current.h + dy)),
      });
    };

    const onUp = () => {
      resizing.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [size]);

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
          content: "Oops, something went wrong on my end 😅 Try emailing Nour directly at noormich@post.bgu.ac.il!",
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
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 300 }}
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-[70] w-14 h-14 bg-amber-400 text-[#0B0B08] rounded-full shadow-2xl shadow-amber-400/30 flex items-center justify-center hover:scale-110 hover:bg-amber-300 transition-all ${open ? "opacity-0 pointer-events-none" : ""}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-lime-400 rounded-full border-2 border-[#0B0B08] animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            style={{ width: size.w, height: size.h }}
            className="fixed bottom-6 right-6 z-50 flex flex-col bg-[#141410] rounded-3xl shadow-2xl shadow-black/60 border border-[#2A2A1E] overflow-hidden"
          >
            {/* Resize handle — top-left corner */}
            <div
              onMouseDown={onResizeStart}
              className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center cursor-nw-resize z-10 group"
              title="Drag to resize"
            >
              <GripHorizontal
                size={14}
                className="text-[#3A3A28] group-hover:text-amber-400 transition-colors rotate-45"
              />
            </div>

            {/* Header — click anywhere to close */}
            <div
              onClick={() => setOpen(false)}
              className="flex items-center justify-between px-5 py-4 bg-[#1E1E18] border-b border-[#2A2A1E] flex-shrink-0 cursor-pointer hover:bg-[#252520] transition-colors group"
              title="Click to close"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-400 text-[#0B0B08] flex items-center justify-center">
                  <Sparkles size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm text-[#F5F0E0] leading-none">Nour's Assistant</p>
                  <p className="text-[#9A9A80] text-xs mt-0.5 group-hover:text-amber-400/60 transition-colors">Click to close · Ask me anything 🧪</p>
                </div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#2A2A1E] group-hover:bg-[#3A3A28] transition-colors text-[#9A9A80] group-hover:text-[#F5F0E0]">
                <X size={16} />
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
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
                        ? "bg-amber-400 text-[#0B0B08]"
                        : "bg-[#2A2A1E] text-[#9A9A80]"
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
                        ? "bg-[#1E1E18] text-[#F5F0E0] rounded-tl-sm border border-[#2A2A1E]"
                        : "bg-amber-400 text-[#0B0B08] rounded-tr-sm font-medium"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {streaming && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-[#0B0B08] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={14} />
                  </div>
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-tl-sm bg-[#1E1E18] text-[#F5F0E0] text-sm leading-relaxed border border-[#2A2A1E]">
                    {streaming}
                    <span className="inline-block w-1.5 h-3.5 bg-amber-400 ml-0.5 animate-pulse rounded-sm align-middle" />
                  </div>
                </motion.div>
              )}

              {loading && !streaming && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-amber-400 text-[#0B0B08] flex items-center justify-center">
                    <Loader2 size={14} className="animate-spin" />
                  </div>
                  <div className="px-4 py-3 bg-[#1E1E18] rounded-2xl rounded-tl-sm flex gap-1.5 border border-[#2A2A1E]">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-1.5 h-1.5 bg-amber-400 rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="pt-1">
                  <p className="text-xs text-[#9A9A80] mb-2 font-medium">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED.map((s) => (
                      <button
                        key={s}
                        onClick={() => sendMessage(s)}
                        className="text-xs px-3 py-1.5 bg-amber-400/10 text-amber-400 rounded-full border border-amber-400/20 hover:bg-amber-400/20 transition-colors font-medium"
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
              className="px-4 py-3 border-t border-[#2A2A1E] flex gap-2 bg-[#1A1A14] flex-shrink-0"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Nour..."
                className="flex-1 px-4 py-2.5 bg-[#1E1E18] border border-[#2A2A1E] rounded-2xl text-sm text-[#F5F0E0] placeholder:text-[#9A9A80] focus:outline-none focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/10"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="w-10 h-10 rounded-2xl bg-amber-400 text-[#0B0B08] flex items-center justify-center hover:bg-amber-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
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
