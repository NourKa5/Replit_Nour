import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface A11ySettings {
  fontSize: "normal" | "large" | "xl";
  highContrast: boolean;
  reduceMotion: boolean;
  dyslexiaFont: boolean;
  lightMode: boolean;
}

interface A11yContextType {
  settings: A11ySettings;
  setFontSize: (size: A11ySettings["fontSize"]) => void;
  toggleHighContrast: () => void;
  toggleReduceMotion: () => void;
  toggleDyslexiaFont: () => void;
  toggleLightMode: () => void;
  reset: () => void;
}

const STORAGE_KEY = "nk_a11y";

const DEFAULT: A11ySettings = {
  fontSize: "normal",
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
  lightMode: false,
};

const A11yContext = createContext<A11yContextType | null>(null);

function load(): A11ySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT, ...JSON.parse(raw) };
  } catch {}
  return DEFAULT;
}

function applyClasses(s: A11ySettings) {
  const root = document.documentElement;
  root.classList.remove("a11y-text-large", "a11y-text-xl", "a11y-high-contrast", "a11y-reduce-motion", "a11y-dyslexia", "a11y-light-mode");
  if (s.fontSize === "large") root.classList.add("a11y-text-large");
  if (s.fontSize === "xl") root.classList.add("a11y-text-xl");
  if (s.highContrast) root.classList.add("a11y-high-contrast");
  if (s.reduceMotion) root.classList.add("a11y-reduce-motion");
  if (s.dyslexiaFont) root.classList.add("a11y-dyslexia");
  if (s.lightMode) root.classList.add("a11y-light-mode");
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(load);

  useEffect(() => {
    applyClasses(settings);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {}
  }, [settings]);

  const setFontSize = (fontSize: A11ySettings["fontSize"]) =>
    setSettings((s) => ({ ...s, fontSize }));
  const toggleHighContrast = () =>
    setSettings((s) => ({ ...s, highContrast: !s.highContrast }));
  const toggleReduceMotion = () =>
    setSettings((s) => ({ ...s, reduceMotion: !s.reduceMotion }));
  const toggleDyslexiaFont = () =>
    setSettings((s) => ({ ...s, dyslexiaFont: !s.dyslexiaFont }));
  const toggleLightMode = () =>
    setSettings((s) => ({ ...s, lightMode: !s.lightMode }));
  const reset = () => setSettings(DEFAULT);

  return (
    <A11yContext.Provider value={{ settings, setFontSize, toggleHighContrast, toggleReduceMotion, toggleDyslexiaFont, toggleLightMode, reset }}>
      {children}
    </A11yContext.Provider>
  );
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used inside AccessibilityProvider");
  return ctx;
}
