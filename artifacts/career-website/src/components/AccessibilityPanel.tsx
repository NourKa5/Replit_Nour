import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useA11y } from "../lib/accessibility";
import { X, ZoomIn, ZoomOut, Sun, Wind, Type, RotateCcw } from "lucide-react";

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const { settings, setFontSize, toggleHighContrast, toggleReduceMotion, toggleDyslexiaFont, reset } = useA11y();

  const active =
    settings.fontSize !== "normal" ||
    settings.highContrast ||
    settings.reduceMotion ||
    settings.dyslexiaFont;

  return (
    <div className="fixed bottom-6 left-5 z-[999] flex flex-col items-start gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-[#141410] border border-[#2A2A1E] rounded-2xl shadow-2xl shadow-black/50 p-4 w-64 mb-1"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">♿</span>
                <span className="text-sm font-bold text-[#F5F0E0]">Accessibility</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-[#9A9A80] hover:text-[#F5F0E0] transition-colors"
                aria-label="Close accessibility panel"
              >
                <X size={16} />
              </button>
            </div>

            {/* Font Size */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-[#9A9A80] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Type size={11} /> Text Size
              </p>
              <div className="flex gap-1.5">
                {(["normal", "large", "xl"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setFontSize(size)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                      settings.fontSize === size
                        ? "bg-amber-400 text-[#0B0B08] border-amber-400"
                        : "bg-[#1E1E18] text-[#9A9A80] border-[#2A2A1E] hover:border-amber-400/40 hover:text-[#F5F0E0]"
                    }`}
                    aria-pressed={settings.fontSize === size}
                  >
                    {size === "normal" ? "A" : size === "large" ? "A+" : "A++"}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-2 mb-4">
              <Toggle
                icon={<Sun size={14} />}
                label="High Contrast"
                active={settings.highContrast}
                onToggle={toggleHighContrast}
              />
              <Toggle
                icon={<Wind size={14} />}
                label="Reduce Motion"
                active={settings.reduceMotion}
                onToggle={toggleReduceMotion}
              />
              <Toggle
                icon={<ZoomIn size={14} />}
                label="Dyslexia-Friendly Font"
                active={settings.dyslexiaFont}
                onToggle={toggleDyslexiaFont}
              />
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              disabled={!active}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-[#9A9A80] hover:text-[#F5F0E0] border border-[#2A2A1E] hover:border-[#3A3A2E] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <RotateCcw size={11} /> Reset to defaults
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating trigger button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        className={`w-11 h-11 rounded-full flex items-center justify-center text-lg shadow-lg transition-colors relative ${
          open
            ? "bg-amber-400 text-[#0B0B08] shadow-amber-400/30"
            : "bg-[#1E1E18] text-[#F5F0E0] border border-[#2A2A1E] hover:border-amber-400/50 shadow-black/50"
        }`}
        aria-label="Open accessibility tools"
        aria-expanded={open}
      >
        ♿
        {active && !open && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-full border-2 border-[#0B0B08]" />
        )}
      </motion.button>
    </div>
  );
}

function Toggle({
  icon,
  label,
  active,
  onToggle,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      aria-pressed={active}
      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border transition-all ${
        active
          ? "bg-amber-400/10 border-amber-400/40 text-amber-400"
          : "bg-[#1E1E18] border-[#2A2A1E] text-[#9A9A80] hover:border-[#3A3A2E] hover:text-[#F5F0E0]"
      }`}
    >
      <span className="flex items-center gap-2 text-xs font-semibold">
        {icon}
        {label}
      </span>
      <span
        className={`w-7 h-4 rounded-full relative transition-colors flex-shrink-0 ${
          active ? "bg-amber-400" : "bg-[#2A2A1E]"
        }`}
      >
        <span
          className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform ${
            active ? "translate-x-3.5" : "translate-x-0.5"
          }`}
        />
      </span>
    </button>
  );
}
