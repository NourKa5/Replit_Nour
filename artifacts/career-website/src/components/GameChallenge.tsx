import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Zap, RotateCcw, ChevronRight, Beaker, Brain, Target, Atom } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// ─── QUESTION BANK (20 questions, 5 picked randomly per game) ───────────────

const ALL_QUESTIONS = [
  {
    category: "Spectroscopy",
    icon: "🔬",
    question: "What does SERS stand for in analytical chemistry?",
    options: ["Surface-Enhanced Raman Spectroscopy", "Spectral Emission Resonance System", "Surface Electron Reflection Scan", "Signal-Enhanced Raman Sensor"],
    correct: 0,
    fact: "SERS can detect single molecules — Nour spent 2.5 years developing algorithms for SERS analysis at Atiko Labs! 🔬",
  },
  {
    category: "Spectroscopy",
    icon: "🌊",
    question: "Which optical phenomenon does Raman spectroscopy rely on?",
    options: ["Photoelectric effect", "Inelastic scattering of photons", "Nuclear magnetic resonance", "Fluorescence emission"],
    correct: 1,
    fact: "Raman scattering shifts light frequency based on molecular vibrations — a molecular fingerprint! Nour's algorithms exploit this. 🌊",
  },
  {
    category: "Spectroscopy",
    icon: "📉",
    question: "What SNR did Nour's RamanSense algorithm achieve at Atiko Labs?",
    options: ["Less than 5%", "Less than 2%", "Less than 10%", "Less than 0.5%"],
    correct: 1,
    fact: "RamanSense achieved SNR <2% and detected molecules down to 1 µM concentration in complex media like blood! 📄",
  },
  {
    category: "Spectroscopy",
    icon: "⚗️",
    question: "Which statistical technique did Nour use for dimensionality reduction of spectral data?",
    options: ["Linear regression only", "k-NN classification", "PCA, PLS, and PCR", "Bubble sort"],
    correct: 2,
    fact: "PCA, PLS, and PCR are powerful for spectral data — Nour applied all three at Atiko Labs to enhance SERS analysis! 📊",
  },
  {
    category: "Chemical Eng.",
    icon: "🧪",
    question: "What is the molecular formula for water?",
    options: ["H₃O", "H₂O₂", "H₂O", "HO₂"],
    correct: 2,
    fact: "Simple but fundamental — Nour's water treatment research at BIDR focused on removing ammonium from wastewater using zeolite membranes! 💧",
  },
  {
    category: "Chemical Eng.",
    icon: "💧",
    question: "What natural mineral did Nour use for ammonium removal in water treatment research?",
    options: ["Silica gel", "Activated carbon", "Zeolite", "Graphene oxide"],
    correct: 2,
    fact: "Zeolite is excellent for ion exchange and adsorption. Nour ran column experiments with it at the Jacob Blaustein Institutes (BIDR)! 🌊",
  },
  {
    category: "Chemical Eng.",
    icon: "🔋",
    question: "What acid did Nour use to recover nickel from Ni-MH batteries in his engineering project?",
    options: ["Hydrochloric acid (HCl)", "Nitric acid (HNO₃)", "Phosphoric acid (H₃PO₄)", "Sulfuric acid (H₂SO₄)"],
    correct: 3,
    fact: "H₂SO₄ leaching is a key hydrometallurgical technique. Nour's team designed and optimized the full Ni recovery process at BGU! ⚡",
  },
  {
    category: "Chemical Eng.",
    icon: "📐",
    question: "What does P&ID stand for in process engineering?",
    options: ["Process & Instrument Diagram", "Piping and Instrumentation Diagram", "Pressure & Interface Design", "Plant and Integration Drawing"],
    correct: 1,
    fact: "P&IDs are essential for process design — one of Nour's core chemical engineering skills alongside PFD design and mass/energy balances! 📐",
  },
  {
    category: "Automation",
    icon: "🤖",
    question: "What does PLC stand for in industrial automation?",
    options: ["Programmable Logic Controller", "Process Loop Controller", "Pneumatic Line Control", "Power Load Computer"],
    correct: 0,
    fact: "Nour programmed PLCs from Siemens, Unitronics, and Allen-Bradley at Moona — building automated box-sorting systems with robotics! 🏭",
  },
  {
    category: "Automation",
    icon: "🏭",
    question: "Which robot brand did Nour program in his Industry 4.0 training at Moona?",
    options: ["KUKA", "ABB", "Yaskawa", "Fanuc"],
    correct: 2,
    fact: "Yaskawa robots + Cognex cameras + laser sensors = the automated box-sorting system Nour built at Moona's Industry 4.0 lab! 🤖",
  },
  {
    category: "Automation",
    icon: "🔧",
    question: "Which 3D design tool did Nour use for system prototyping at Moona?",
    options: ["AutoCAD", "SolidWorks", "Fusion 360", "Blender"],
    correct: 1,
    fact: "Nour used SolidWorks and 3D printing to design and prototype system components, improving sorting reliability at Moona! 🔧",
  },
  {
    category: "AI & Data",
    icon: "🧠",
    question: "Which programming language did Nour primarily use for his SERS algorithm development at Atiko Labs?",
    options: ["Java", "C++", "Excel & Python", "MATLAB only"],
    correct: 2,
    fact: "Nour started with Excel for algorithm prototyping and statistical coding, then fully migrated to Python. Exploring CNNs next! 🐍",
  },
  {
    category: "AI & Data",
    icon: "📊",
    question: "What does PCA stand for in data science?",
    options: ["Principal Component Analysis", "Predictive Classification Algorithm", "Probabilistic Cluster Assignment", "Pattern Correlation Array"],
    correct: 0,
    fact: "PCA is a core dimensionality reduction technique — Nour applied it alongside PLS and PCR for spectral data analysis! 📊",
  },
  {
    category: "Full-Stack Dev",
    icon: "💻",
    question: "What does REST stand for in API design?",
    options: ["Rapid Execution Standard Template", "Representational State Transfer", "Remote Execution Socket Technology", "Resource Endpoint Structure Type"],
    correct: 1,
    fact: "Nour builds full-stack REST APIs — this very portfolio runs on Express + React + PostgreSQL, all built by him! 💻",
  },
  {
    category: "Full-Stack Dev",
    icon: "🌐",
    question: "Which database does Nour use in his full-stack projects?",
    options: ["MongoDB", "SQLite", "PostgreSQL", "Firebase"],
    correct: 2,
    fact: "PostgreSQL powers this entire portfolio site — Nour built it from scratch with React, Vite, Express, and Drizzle ORM! 🗄️",
  },
  {
    category: "Spectroscopy",
    icon: "🏆",
    question: "What is the title of Nour's paper currently under review?",
    options: ["SERS Signal Optimizer v2", "RamanSense: An Adaptive Algorithm for Enhanced SERS Analysis", "Deep SERS: A Neural Approach", "SpectroNet: Real-Time Raman Detection"],
    correct: 1,
    fact: "RamanSense is co-authored with Prof. Muhammad Y. Bashouti — a real contribution to analytical chemistry research! 📄",
  },
  {
    category: "Chemical Eng.",
    icon: "🌍",
    question: "Which languages does Nour speak?",
    options: ["Arabic and English only", "Hebrew, English, and French", "Arabic, Hebrew, and English", "Arabic and Hebrew only"],
    correct: 2,
    fact: "Arabic (native), Hebrew (fluent), English (advanced) — Nour is trilingual and open to global opportunities! 🌍",
  },
  {
    category: "AI & Data",
    icon: "🎓",
    question: "What certification is Nour currently completing alongside his job search?",
    options: ["Google Cloud Associate", "AWS Solutions Architect", "AI Developer Program (Ecom School)", "Microsoft Azure AI"],
    correct: 2,
    fact: "Nour is completing an AI Developer (Computer & Data Science) certification at Ecom School, expected 2026! 🎓",
  },
  {
    category: "Automation",
    icon: "⚡",
    question: "Which microcontroller did Nour use for smart home / IoT projects at Moona?",
    options: ["Raspberry Pi", "ESP32", "Arduino", "BeagleBone"],
    correct: 2,
    fact: "Nour built Arduino-based systems for smart traffic, gas detection, irrigation, and access control — real IoT experience! ⚡",
  },
  {
    category: "Chemical Eng.",
    icon: "🧬",
    question: "What track did Nour study in his Chemical Engineering degree at BGU?",
    options: ["Petroleum & Petrochemicals", "Energy, Water, and Advanced Technologies", "Biomedical Engineering", "Environmental Chemistry"],
    correct: 1,
    fact: "Energy, Water, and Advanced Technologies — with top grades in Semiconductors (90), Nanostructured Surfaces (97), and Microelectronics (91)! 🎓",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickQuestions(n = 5) {
  return shuffle(ALL_QUESTIONS).slice(0, n);
}

// ─── ACHIEVEMENTS for Photon Catcher ────────────────────────────────────────

const ACHIEVEMENTS = [
  { emoji: "🔬", title: "RamanSense Author", fact: "Nour's algorithm 'RamanSense' is under peer review — it enables trace-level molecule detection down to 1 µM in blood!" },
  { emoji: "📉", title: "SNR Crusher", fact: "At Atiko Labs, Nour reduced signal-to-noise ratio to <2% — making SERS analysis far more reliable for real-world diagnostics." },
  { emoji: "💧", title: "Water Researcher", fact: "Nour ran zeolite column experiments for ammonium removal at the prestigious Jacob Blaustein Institutes for Desert Research (BIDR)." },
  { emoji: "🤖", title: "Robot Whisperer", fact: "Nour programmed Yaskawa robots + Cognex cameras + PLCs to build a fully automated box-sorting system at Moona's Industry 4.0 lab." },
  { emoji: "🎓", title: "97 in Nano Science", fact: "Nour scored 97/100 in Nano- & Molecularly Structured Surfaces, 91 in Microelectronics, and 90 in Semiconductor Properties at BGU." },
  { emoji: "🔋", title: "Battery Recycler", fact: "Nour co-designed a nickel recovery process from Ni-MH batteries using H₂SO₄ leaching — turning waste into resources." },
  { emoji: "🐍", title: "Code Converter", fact: "Nour developed SERS algorithms starting in Excel, then fully migrated to Python — and is now building full-stack web apps too!" },
  { emoji: "🌍", title: "Trilingual Engineer", fact: "Nour speaks Arabic (native), Hebrew (fluent), and English (advanced) — ready to work in any international environment." },
  { emoji: "⚡", title: "IoT Builder", fact: "Nour built Arduino systems for smart traffic control, gas detection, irrigation, and access control — real embedded systems experience." },
  { emoji: "📊", title: "Data Scientist", fact: "Nour applies PCA, PLS, and PCR for spectral data analysis — his supervised learning project was graded 'one of the best seen'." },
  { emoji: "💻", title: "Full-Stack Creator", fact: "Nour built this entire portfolio website from scratch — React + Vite + Express + PostgreSQL + OpenAI integration. All by himself!" },
  { emoji: "🎯", title: "Open to the World", fact: "Nour is actively seeking roles in process engineering, R&D, automation, data analysis, or biomedical — open to relocation globally!" },
];

// ─── TYPES ────────────────────────────────────────────────────────────────────

type AppState = "menu" | "quiz" | "photon";
type QuizState = "idle" | "playing" | "answer" | "finished";

interface FallingPhoton {
  id: number;
  x: number;
  colorIdx: number;
  achievementIdx: number;
  duration: number;
}

// ─── PHOTON CATCHER ───────────────────────────────────────────────────────────

const PHOTON_COLORS = [
  { bg: "bg-amber-400", shadow: "shadow-amber-400/70" },
  { bg: "bg-lime-400", shadow: "shadow-lime-400/70" },
  { bg: "bg-violet-400", shadow: "shadow-violet-400/70" },
  { bg: "bg-cyan-400", shadow: "shadow-cyan-400/70" },
  { bg: "bg-orange-400", shadow: "shadow-orange-400/70" },
];

function PhotonCatcher({ onBack }: { onBack: () => void }) {
  const GAME_DURATION = 40;
  const FALL_HEIGHT = 380;

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [photons, setPhotons] = useState<FallingPhoton[]>([]);
  const [caught, setCaught] = useState<(typeof ACHIEVEMENTS)[0][]>([]);
  const [missed, setMissed] = useState(0);
  const [score, setScore] = useState(0);
  const [popup, setPopup] = useState<(typeof ACHIEVEMENTS)[0] | null>(null);
  const usedIdx = useRef<number[]>([]);
  const nextId = useRef(0);
  const popupTimeout = useRef<ReturnType<typeof setTimeout>>();
  const timeRef = useRef(GAME_DURATION);

  const spawnOne = useCallback(() => {
    const remaining = ACHIEVEMENTS.map((_, i) => i).filter((i) => !usedIdx.current.includes(i));
    if (remaining.length === 0) return;
    const achievementIdx = remaining[Math.floor(Math.random() * remaining.length)];
    usedIdx.current = [...usedIdx.current, achievementIdx];
    const photon: FallingPhoton = {
      id: nextId.current++,
      x: 6 + Math.random() * 78,
      colorIdx: Math.floor(Math.random() * PHOTON_COLORS.length),
      achievementIdx,
      duration: 2.8 + Math.random() * 2,
    };
    setPhotons((prev) => (prev.length >= 5 ? prev : [...prev, photon]));
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        timeRef.current = s - 1;
        if (s <= 1) { setFinished(true); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [started, finished]);

  useEffect(() => {
    if (!started || finished) return;
    const iv = setInterval(spawnOne, 1300);
    return () => clearInterval(iv);
  }, [started, finished, spawnOne]);

  const startGame = () => {
    usedIdx.current = [];
    nextId.current = 0;
    setStarted(true);
    setFinished(false);
    setTimeLeft(GAME_DURATION);
    timeRef.current = GAME_DURATION;
    setScore(0);
    setCaught([]);
    setMissed(0);
    setPhotons([]);
    setPopup(null);
    setTimeout(spawnOne, 200);
    setTimeout(spawnOne, 900);
  };

  const catchPhoton = useCallback((id: number, achievementIdx: number) => {
    setPhotons((prev) => prev.filter((p) => p.id !== id));
    const bonus = 100 + timeRef.current * 3;
    setScore((s) => s + bonus);
    const ach = ACHIEVEMENTS[achievementIdx];
    setCaught((c) => [...c, ach]);
    setPopup(ach);
    clearTimeout(popupTimeout.current);
    popupTimeout.current = setTimeout(() => setPopup(null), 5000);
  }, []);

  const missPhoton = useCallback((id: number) => {
    setPhotons((prev) => prev.filter((p) => p.id !== id));
    setMissed((m) => m + 1);
  }, []);

  if (!started) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl p-10 text-center"
      >
        <div className="w-24 h-24 mx-auto bg-lime-400 rounded-3xl flex items-center justify-center text-[#0B0B08] text-4xl mb-6 shadow-lg shadow-lime-400/20">
          ⚛️
        </div>
        <h3 className="text-2xl font-bold text-[#F5F0E0] mb-2">Catch the Photons!</h3>
        <p className="text-[#9A9A80] mb-6 text-sm leading-relaxed max-w-sm mx-auto">
          Photons fall from the top — click them before they escape! Each catch reveals a real achievement from Nour's journey.
        </p>
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {["⬇️ Click falling photons", "🏆 Unlock achievements", "⏱ 40 seconds", "🎯 Don't miss!"].map((tag) => (
            <span key={tag} className="px-3 py-1.5 bg-lime-400/10 text-lime-400 text-xs font-semibold rounded-full border border-lime-400/20">{tag}</span>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={startGame}
            className="px-10 py-4 bg-lime-400 text-[#0B0B08] font-bold text-lg rounded-2xl shadow-lg shadow-lime-400/20 hover:bg-lime-300 transition-colors"
          >
            Start! ⚛️
          </motion.button>
          <button onClick={onBack} className="px-6 py-4 text-[#9A9A80] hover:text-[#F5F0E0] font-semibold rounded-2xl border border-[#2A2A1E] transition-colors text-sm">
            ← Back
          </button>
        </div>
      </motion.div>
    );
  }

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl p-8 text-center"
      >
        <div className="text-5xl mb-3">⚛️</div>
        <h3 className="text-2xl font-bold text-lime-400 mb-1">Photon Hunt Complete!</h3>
        <div className="text-5xl font-black text-[#F5F0E0] my-3">{score}</div>
        <p className="text-[#9A9A80] mb-5">{caught.length} caught · {missed} missed</p>
        {caught.length > 0 && (
          <div className="text-left bg-[#1E1E18] rounded-2xl border border-[#2A2A1E] p-4 mb-5 max-h-52 overflow-y-auto space-y-2">
            {caught.map((ach, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{ach.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-lime-400">{ach.title}</p>
                  <p className="text-xs text-[#9A9A80] leading-snug">{ach.fact}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="bg-[#1E1E18] border border-lime-400/20 rounded-2xl p-5 mb-5">
          <Brain className="mx-auto mb-2 text-lime-400" size={24} />
          <p className="font-bold text-[#F5F0E0] mb-1">Impressed? 🎉</p>
          <p className="text-[#9A9A80] text-xs mb-3">Nour brings this same energy — curiosity, precision, and real results — to every role.</p>
          <a href="mailto:noormich@post.bgu.ac.il" className="inline-block px-6 py-2.5 bg-lime-400 text-[#0B0B08] font-bold rounded-xl hover:bg-lime-300 transition-colors text-sm">
            Hire Nour →
          </a>
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={startGame} className="flex items-center gap-2 text-[#9A9A80] hover:text-lime-400 font-semibold transition-colors text-sm">
            <RotateCcw size={14} /> Play Again
          </button>
          <button onClick={onBack} className="flex items-center gap-2 text-[#9A9A80] hover:text-[#F5F0E0] font-semibold transition-colors text-sm">
            ← Change Mode
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-4 pb-3 border-b border-[#2A2A1E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Atom size={16} className="text-lime-400" />
          <span className="text-sm font-bold text-lime-400">Photon Hunt</span>
        </div>
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1 text-sm font-bold text-lime-400">
            <Zap size={14} />{score} pts
          </span>
          <span className="text-[#2A2A1E]">|</span>
          <span className="text-xs text-[#9A9A80]">{caught.length} caught</span>
          <span className="text-[#2A2A1E]">|</span>
          <div className={`flex items-center gap-1 text-sm font-bold ${timeLeft <= 8 ? "text-red-400 animate-pulse" : "text-[#9A9A80]"}`}>
            <Clock size={14} />{timeLeft}s
          </div>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1 bg-[#2A2A1E]">
        <motion.div
          className={`h-full ${timeLeft <= 8 ? "bg-red-400" : "bg-lime-400"}`}
          animate={{ width: `${(timeLeft / GAME_DURATION) * 100}%` }}
          transition={{ duration: 0.8, ease: "linear" }}
        />
      </div>

      {/* Fall zone */}
      <div className="relative bg-[#0A0A08] overflow-hidden select-none" style={{ height: FALL_HEIGHT }}>
        {/* Background symbols */}
        <div className="absolute inset-0 pointer-events-none">
          {["hν", "λ", "E=hf", "Δν", "σ"].map((sym, i) => (
            <span
              key={sym}
              className="absolute font-mono text-xs text-[#1C1C14] select-none"
              style={{ left: `${10 + i * 20}%`, top: `${15 + (i % 3) * 28}%` }}
            >{sym}</span>
          ))}
        </div>

        {/* "Catch zone" bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent pointer-events-none" />
        <div className="absolute bottom-1 left-0 right-0 text-center pointer-events-none">
          <span className="text-[10px] text-red-400/40 font-mono">— ESCAPE ZONE —</span>
        </div>

        {/* Falling photons */}
        <AnimatePresence>
          {photons.map((photon) => {
            const c = PHOTON_COLORS[photon.colorIdx];
            return (
              <motion.button
                key={photon.id}
                className={`absolute w-14 h-14 rounded-full ${c.bg} ${c.shadow} shadow-xl flex items-center justify-center text-xl font-bold text-[#0B0B08] cursor-pointer select-none z-10`}
                style={{ left: `${photon.x}%`, marginLeft: -28, top: 0 }}
                initial={{ y: -70, scale: 0.6, opacity: 0 }}
                animate={{ y: FALL_HEIGHT + 20, scale: 1, opacity: 1 }}
                exit={{ scale: 2.5, opacity: 0, transition: { duration: 0.25 } }}
                transition={{ duration: photon.duration, ease: "easeIn", opacity: { duration: 0.2, delay: 0 } }}
                onAnimationComplete={() => missPhoton(photon.id)}
                onClick={(e) => { e.stopPropagation(); catchPhoton(photon.id, photon.achievementIdx); }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.75 }}
              >
                ⚛
              </motion.button>
            );
          })}
        </AnimatePresence>

        {photons.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-[#2A2A1E] text-sm font-mono animate-pulse">incoming...</p>
          </div>
        )}
      </div>

      {/* Achievement popup — below the fall zone, never blocks gameplay */}
      <div className="min-h-[68px] border-t border-[#2A2A1E] bg-[#0D0D0B]">
        <AnimatePresence mode="wait">
          {popup ? (
            <motion.div
              key={popup.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="px-4 py-3 flex items-start gap-3"
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{popup.emoji}</span>
              <div>
                <p className="text-xs font-bold text-lime-400 mb-0.5">🏆 {popup.title}</p>
                <p className="text-xs text-[#9A9A80] leading-snug">{popup.fact}</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-5 py-3 flex items-center justify-between"
            >
              <span className="text-xs text-[#3A3A2E]">Click photons before they reach the red line</span>
              <button onClick={onBack} className="text-xs text-[#3A3A2E] hover:text-[#9A9A80] transition-colors ml-4 flex-shrink-0">← modes</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── QUIZ GAME ────────────────────────────────────────────────────────────────

function QuizGame({ onBack }: { onBack: () => void }) {
  const [gameState, setGameState] = useState<QuizState>("idle");
  const [questions, setQuestions] = useState(pickQuestions(5));
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const question = questions[currentQ];

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selected !== null || gameState !== "playing") return;
      setSelected(idx);
      setGameState("answer");
      const correct = idx === question.correct;
      const timeBonus = Math.floor((timeLeft / 15) * 50);
      if (correct) {
        setScore((s) => s + 100 + timeBonus);
        setParticles(Array.from({ length: 8 }, (_, i) => ({ id: Date.now() + i, x: Math.random() * 100, y: Math.random() * 100 })));
      }
      setAnswers((a) => [...a, correct]);
    },
    [selected, gameState, question, timeLeft]
  );

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) { handleAnswer(-1); return; }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameState, handleAnswer]);

  const nextQuestion = () => {
    setParticles([]);
    if (currentQ + 1 >= questions.length) { setGameState("finished"); }
    else { setCurrentQ((q) => q + 1); setSelected(null); setTimeLeft(15); setGameState("playing"); }
  };

  const startGame = () => {
    setQuestions(pickQuestions(5));
    setCurrentQ(0); setSelected(null); setScore(0);
    setTimeLeft(15); setAnswers([]); setParticles([]);
    setGameState("playing");
  };

  const correctCount = answers.filter(Boolean).length;
  const rank =
    score >= 600 ? { label: "Lab Genius", emoji: "🏆", color: "text-amber-400" }
    : score >= 400 ? { label: "AI Researcher", emoji: "🤖", color: "text-lime-400" }
    : score >= 200 ? { label: "Chem Grad", emoji: "⚗️", color: "text-amber-300" }
    : { label: "Keep Learning", emoji: "📚", color: "text-[#9A9A80]" };

  if (gameState === "idle") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl p-10 text-center"
      >
        <div className="w-24 h-24 mx-auto bg-amber-400 rounded-3xl flex items-center justify-center text-[#0B0B08] text-4xl mb-6 shadow-lg shadow-amber-400/20">🧬</div>
        <h3 className="text-2xl font-bold text-[#F5F0E0] mb-2">Ready to test your knowledge?</h3>
        <p className="text-[#9A9A80] mb-4 text-sm">5 random questions · 15 seconds each · bonus points for speed</p>
        <p className="text-[#9A9A80]/60 text-xs mb-8">Questions are shuffled from a 20-question pool — every game is different!</p>
        <div className="grid grid-cols-4 gap-3 mb-10">
          {[{ icon: "🔬", label: "Spectroscopy" }, { icon: "🤖", label: "Automation" }, { icon: "🧪", label: "Chem Eng." }, { icon: "💻", label: "Full-Stack" }].map((cat) => (
            <div key={cat.label} className="bg-[#1E1E18] rounded-2xl p-3 text-center border border-[#2A2A1E]">
              <div className="text-xl mb-1">{cat.icon}</div>
              <div className="text-xs font-semibold text-[#9A9A80]">{cat.label}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={startGame}
            className="px-10 py-4 bg-amber-400 text-[#0B0B08] font-bold text-lg rounded-2xl shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-colors">
            Start Quiz →
          </motion.button>
          <button onClick={onBack} className="px-6 py-4 text-[#9A9A80] hover:text-[#F5F0E0] font-semibold rounded-2xl border border-[#2A2A1E] transition-colors text-sm">
            ← Back
          </button>
        </div>
      </motion.div>
    );
  }

  if (gameState === "finished") {
    return (
      <motion.div key="finished" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl p-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.2 }} className="text-6xl mb-4">
          {rank.emoji}
        </motion.div>
        <h3 className={`text-2xl font-bold mb-1 ${rank.color}`}>{rank.label}</h3>
        <div className="text-5xl font-black text-[#F5F0E0] my-4">{score}</div>
        <p className="text-[#9A9A80] mb-6">{correctCount} / {questions.length} correct</p>
        <div className="flex justify-center gap-3 mb-8">
          {answers.map((correct, i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${correct ? "bg-amber-400 text-[#0B0B08]" : "bg-red-400/20 text-red-400 border border-red-400/30"}`}>
              {correct ? "✓" : "✗"}
            </div>
          ))}
        </div>
        <div className="bg-[#1E1E18] border border-amber-400/20 rounded-2xl p-6 text-white mb-6">
          <Brain className="mx-auto mb-2 text-amber-400" size={28} />
          <p className="font-bold text-lg mb-1 text-[#F5F0E0]">Impressed? 🎉</p>
          <p className="text-[#9A9A80] text-sm">Nour built this site, created algorithms for SERS, and is ready to bring this energy to your team.</p>
          <a href="mailto:noormich@post.bgu.ac.il" className="inline-block mt-4 px-6 py-2.5 bg-amber-400 text-[#0B0B08] font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm">
            Hire Nour →
          </a>
        </div>
        <div className="flex gap-4 justify-center">
          <button onClick={startGame} className="flex items-center gap-2 text-[#9A9A80] hover:text-amber-400 font-semibold transition-colors text-sm">
            <RotateCcw size={14} />New Questions
          </button>
          <button onClick={onBack} className="flex items-center gap-2 text-[#9A9A80] hover:text-[#F5F0E0] font-semibold transition-colors text-sm">
            ← Change Mode
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
      className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl overflow-hidden relative">
      <div className="px-6 pt-6 pb-4 border-b border-[#2A2A1E]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {questions.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i < currentQ ? (answers[i] ? "bg-amber-400" : "bg-red-400") : i === currentQ ? "bg-amber-400" : "bg-[#2A2A1E]"}`} />
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-sm font-semibold text-amber-400"><Zap size={14} />{score} pts</span>
            <div className={`flex items-center gap-1 text-sm font-bold ${timeLeft <= 5 ? "text-red-400" : "text-[#9A9A80]"}`}>
              <Clock size={14} />{timeLeft}s
            </div>
          </div>
        </div>
        <div className="h-1.5 bg-[#2A2A1E] rounded-full overflow-hidden">
          <motion.div className={`h-full rounded-full ${timeLeft <= 5 ? "bg-red-400" : "bg-amber-400"}`}
            animate={{ width: `${(timeLeft / 15) * 100}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <div className="px-6 py-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{question.icon}</span>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{question.category}</span>
        </div>
        <h3 className="text-xl font-bold text-[#F5F0E0] mb-6 leading-snug">{question.question}</h3>
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((opt, idx) => {
            const isSelected = selected === idx;
            const isCorrect = idx === question.correct;
            let classes = "w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all text-sm ";
            if (gameState === "answer") {
              if (isCorrect) classes += "border-amber-400 bg-amber-400/10 text-amber-300";
              else if (isSelected && !isCorrect) classes += "border-red-400 bg-red-400/10 text-red-400";
              else classes += "border-[#2A2A1E] bg-[#1A1A14] text-[#9A9A80]/60";
            } else {
              classes += "border-[#2A2A1E] bg-[#1E1E18] text-[#F5F0E0] hover:border-amber-400/50 hover:bg-amber-400/5 hover:text-amber-300 cursor-pointer";
            }
            return (
              <motion.button key={idx} onClick={() => handleAnswer(idx)} className={classes}
                whileHover={gameState === "playing" ? { scale: 1.01 } : {}}
                whileTap={gameState === "playing" ? { scale: 0.99 } : {}}>
                <span className="font-bold mr-3 text-[#9A9A80]">{["A", "B", "C", "D"][idx]}</span>
                {opt}
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {gameState === "answer" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-6 pb-6">
            <div className={`rounded-2xl p-4 mb-4 ${selected === question.correct ? "bg-amber-400/10 border border-amber-400/20" : "bg-[#1E1E18] border border-[#2A2A1E]"}`}>
              <p className="text-sm text-[#9A9A80]"><span className="font-semibold text-[#F5F0E0]">Fun fact: </span>{question.fact}</p>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={nextQuestion}
              className="w-full py-3.5 bg-amber-400 text-[#0B0B08] font-bold rounded-2xl hover:bg-amber-300 transition-colors flex items-center justify-center gap-2">
              {currentQ + 1 >= questions.length ? "See Results" : "Next Question"}
              <ChevronRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {particles.map((p) => (
        <motion.div key={p.id} className="absolute w-2 h-2 rounded-full bg-amber-400 pointer-events-none"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ scale: 0, opacity: 1 }} animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], y: -60 }}
          transition={{ duration: 0.8 }} />
      ))}
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function GameChallenge() {
  const [appState, setAppState] = useState<AppState>("menu");
  const { t } = useLanguage();

  return (
    <section id="challenge" className="py-24 bg-[#0E0E0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        {["H₂O", "CO₂", "NH₃", "C₆H₆", "hν", "SERS"].map((mol, i) => (
          <motion.span key={mol} className="absolute text-[#2A2A1E] font-mono text-sm font-bold"
            style={{ left: `${10 + i * 16}%`, top: `${15 + (i % 3) * 30}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}>
            {mol}
          </motion.span>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 relative">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 text-sm font-semibold mb-4">
            <Beaker size={15} />{t("game_badge")}
          </div>
          <h2 className="text-4xl font-bold text-[#F5F0E0] mb-3">{t("game_title")}</h2>
          <p className="text-[#9A9A80] text-lg">{t("game_subtitle")}</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {appState === "menu" && (
            <motion.div key="menu" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <motion.button whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                onClick={() => setAppState("quiz")}
                className="bg-[#141410] border border-[#2A2A1E] hover:border-amber-400/40 rounded-3xl p-8 text-left transition-all group">
                <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg shadow-amber-400/20 group-hover:scale-110 transition-transform">
                  🧬
                </div>
                <h3 className="text-xl font-bold text-[#F5F0E0] mb-2">{t("game_quiz_title")}</h3>
                <p className="text-[#9A9A80] text-sm leading-relaxed mb-4">{t("game_quiz_desc")}</p>
                <div className="flex flex-wrap gap-2">
                  {["🔬 Spectroscopy", "🤖 PLC & Robots", "💻 Dev", "🧪 Chemistry"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-amber-400/10 text-amber-400 text-xs font-semibold rounded-full border border-amber-400/20">{tag}</span>
                  ))}
                </div>
              </motion.button>

              <motion.button whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                onClick={() => setAppState("photon")}
                className="bg-[#141410] border border-[#2A2A1E] hover:border-lime-400/40 rounded-3xl p-8 text-left transition-all group">
                <div className="w-16 h-16 bg-lime-400 rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg shadow-lime-400/20 group-hover:scale-110 transition-transform">
                  ⚛️
                </div>
                <h3 className="text-xl font-bold text-[#F5F0E0] mb-2">{t("game_photon_title")}</h3>
                <p className="text-[#9A9A80] text-sm leading-relaxed mb-4">{t("game_photon_desc")}</p>
                <div className="flex flex-wrap gap-2">
                  {["⚡ Fast-paced", "🏆 Achievements", "🎯 Catch & Learn", "🌊 Animated"].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 bg-lime-400/10 text-lime-400 text-xs font-semibold rounded-full border border-lime-400/20">{tag}</span>
                  ))}
                </div>
              </motion.button>
            </motion.div>
          )}

          {appState === "quiz" && (
            <motion.div key="quiz" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <QuizGame onBack={() => setAppState("menu")} />
            </motion.div>
          )}

          {appState === "photon" && (
            <motion.div key="photon" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}>
              <PhotonCatcher onBack={() => setAppState("menu")} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
