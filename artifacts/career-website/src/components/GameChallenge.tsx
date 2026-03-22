import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Zap, RotateCcw, ChevronRight, Beaker, Brain, Target, Atom } from "lucide-react";

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

interface PhotonObj {
  id: number;
  x: number;
  y: number;
  color: string;
  achievementIdx: number;
  speed: number;
}

// ─── PHOTON CATCHER ───────────────────────────────────────────────────────────

const PHOTON_COLORS = [
  { bg: "bg-amber-400", glow: "shadow-amber-400/60", border: "border-amber-400" },
  { bg: "bg-lime-400", glow: "shadow-lime-400/60", border: "border-lime-400" },
  { bg: "bg-violet-400", glow: "shadow-violet-400/60", border: "border-violet-400" },
  { bg: "bg-cyan-400", glow: "shadow-cyan-400/60", border: "border-cyan-400" },
];

function PhotonCatcher({ onBack }: { onBack: () => void }) {
  const [timeLeft, setTimeLeft] = useState(35);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [photons, setPhotons] = useState<PhotonObj[]>([]);
  const [caught, setCaught] = useState<{ achievement: (typeof ACHIEVEMENTS)[0]; id: number }[]>([]);
  const [activePopup, setActivePopup] = useState<(typeof ACHIEVEMENTS)[0] | null>(null);
  const [score, setScore] = useState(0);
  const [usedAchievements, setUsedAchievements] = useState<number[]>([]);
  const nextId = useRef(0);
  const popupTimeout = useRef<ReturnType<typeof setTimeout>>();

  const spawnPhoton = useCallback((used: number[]) => {
    const remaining = ACHIEVEMENTS.map((_, i) => i).filter((i) => !used.includes(i));
    if (remaining.length === 0) return null;
    const achievementIdx = remaining[Math.floor(Math.random() * remaining.length)];
    const colorIdx = Math.floor(Math.random() * PHOTON_COLORS.length);
    const photon: PhotonObj = {
      id: nextId.current++,
      x: 5 + Math.random() * 85,
      y: 5 + Math.random() * 80,
      color: colorIdx.toString(),
      achievementIdx,
      speed: 2.5 + Math.random() * 2,
    };
    return { photon, achievementIdx };
  }, []);

  useEffect(() => {
    if (!started || finished) return;
    if (timeLeft <= 0) {
      setFinished(true);
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [started, finished, timeLeft]);

  useEffect(() => {
    if (!started || finished) return;
    const spawnInterval = setInterval(() => {
      setPhotons((prev) => {
        if (prev.length >= 5) return prev;
        setUsedAchievements((used) => {
          const result = spawnPhoton(used);
          if (!result) return used;
          setPhotons((p) => [...p, result.photon]);
          return [...used, result.achievementIdx];
        });
        return prev;
      });
    }, 1800);
    return () => clearInterval(spawnInterval);
  }, [started, finished, spawnPhoton]);

  const startGame = () => {
    setStarted(true);
    setFinished(false);
    setTimeLeft(35);
    setScore(0);
    setCaught([]);
    setUsedAchievements([]);
    setPhotons([]);
    nextId.current = 0;
    setTimeout(() => {
      setUsedAchievements((used) => {
        const result = spawnPhoton(used);
        if (!result) return used;
        setPhotons((p) => [...p, result.photon]);
        return [...used, result.achievementIdx];
      });
    }, 300);
  };

  const catchPhoton = (photon: PhotonObj) => {
    const achievement = ACHIEVEMENTS[photon.achievementIdx];
    setPhotons((p) => p.filter((ph) => ph.id !== photon.id));
    setScore((s) => s + 150 + Math.floor(timeLeft * 2));
    setCaught((c) => [...c, { achievement, id: photon.id }]);
    setActivePopup(achievement);
    clearTimeout(popupTimeout.current);
    popupTimeout.current = setTimeout(() => setActivePopup(null), 2800);
  };

  const colorCls = (colorStr: string) => PHOTON_COLORS[parseInt(colorStr)] || PHOTON_COLORS[0];

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
          Photons are flying — each one carries a hidden achievement from Nour's journey. Catch as many as you can in 35 seconds!
        </p>
        <div className="flex justify-center gap-3 mb-8 flex-wrap">
          {["🔬 Real Research", "🤖 Automation", "💻 Full-Stack", "🌍 Global Ready"].map((tag) => (
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
            Launch Photons ⚛️
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
        <p className="text-[#9A9A80] mb-5">{caught.length} achievements unlocked</p>
        {caught.length > 0 && (
          <div className="text-left bg-[#1E1E18] rounded-2xl border border-[#2A2A1E] p-4 mb-5 max-h-52 overflow-y-auto space-y-2">
            {caught.map(({ achievement, id }) => (
              <div key={id} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{achievement.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-lime-400">{achievement.title}</p>
                  <p className="text-xs text-[#9A9A80] leading-snug">{achievement.fact}</p>
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
            <RotateCcw size={14} />Play Again
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
      <div className="px-6 pt-5 pb-4 border-b border-[#2A2A1E] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Atom size={16} className="text-lime-400" />
          <span className="text-sm font-bold text-lime-400">Photon Hunt</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-sm font-semibold text-lime-400">
            <Zap size={14} />{score} pts
          </span>
          <div className={`flex items-center gap-1 text-sm font-bold ${timeLeft <= 8 ? "text-red-400" : "text-[#9A9A80]"}`}>
            <Clock size={14} />{timeLeft}s
          </div>
        </div>
      </div>
      <div className="px-4 py-2 border-b border-[#2A2A1E]">
        <div className="h-1.5 bg-[#2A2A1E] rounded-full overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-colors ${timeLeft <= 8 ? "bg-red-400" : "bg-lime-400"}`}
            animate={{ width: `${(timeLeft / 35) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="relative bg-[#0E0E0B] overflow-hidden" style={{ height: 340 }}>
        <div className="absolute inset-0 pointer-events-none">
          {["hν", "λ", "E=hf", "Δν", "σ_SERS"].map((sym, i) => (
            <motion.span
              key={sym}
              className="absolute text-[#1A1A14] font-mono text-sm font-bold select-none"
              style={{ left: `${8 + i * 20}%`, top: `${20 + (i % 3) * 25}%` }}
              animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
            >
              {sym}
            </motion.span>
          ))}
        </div>

        <AnimatePresence>
          {photons.map((photon) => {
            const c = colorCls(photon.color);
            const tx1 = 5 + Math.random() * 80;
            const ty1 = 5 + Math.random() * 75;
            return (
              <motion.button
                key={photon.id}
                className={`absolute w-12 h-12 rounded-full ${c.bg} shadow-lg ${c.glow} flex items-center justify-center text-lg font-bold text-[#0B0B08] cursor-pointer border-2 ${c.border} select-none`}
                style={{ left: `${photon.x}%`, top: `${photon.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.08, 1],
                  opacity: 1,
                  left: [`${photon.x}%`, `${tx1}%`, `${5 + Math.random() * 80}%`],
                  top: [`${photon.y}%`, `${ty1}%`, `${5 + Math.random() * 75}%`],
                }}
                exit={{ scale: 2, opacity: 0 }}
                transition={{
                  scale: { duration: 1.2, repeat: Infinity },
                  opacity: { duration: 0.3 },
                  left: { duration: photon.speed, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                  top: { duration: photon.speed * 0.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
                }}
                onClick={() => catchPhoton(photon)}
                whileHover={{ scale: 1.25 }}
                whileTap={{ scale: 0.8 }}
              >
                ⚛
              </motion.button>
            );
          })}
        </AnimatePresence>

        <AnimatePresence>
          {activePopup && (
            <motion.div
              key={activePopup.title}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute bottom-3 left-3 right-3 bg-[#141410]/95 backdrop-blur border border-lime-400/30 rounded-2xl p-4 z-10"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">{activePopup.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-lime-400 mb-0.5">Achievement Unlocked: {activePopup.title}</p>
                  <p className="text-xs text-[#9A9A80] leading-snug">{activePopup.fact}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {photons.length === 0 && !activePopup && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-[#2A2A1E] text-sm font-semibold animate-pulse">Photons incoming...</p>
          </div>
        )}
      </div>

      <div className="px-6 py-3 border-t border-[#2A2A1E] flex items-center justify-between">
        <span className="text-xs text-[#9A9A80]">{caught.length} caught · tap photons to unlock achievements</span>
        <button onClick={onBack} className="text-xs text-[#9A9A80] hover:text-[#F5F0E0] transition-colors">← modes</button>
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
            <Beaker size={15} />Recruiter Challenge
          </div>
          <h2 className="text-4xl font-bold text-[#F5F0E0] mb-3">Nour's Lab Challenge</h2>
          <p className="text-[#9A9A80] text-lg">Two ways to explore Nour's world — pick your challenge!</p>
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
                <h3 className="text-xl font-bold text-[#F5F0E0] mb-2">Knowledge Quiz</h3>
                <p className="text-[#9A9A80] text-sm leading-relaxed mb-4">5 random questions from a 20-question pool covering Nour's work in spectroscopy, automation, AI, and full-stack dev.</p>
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
                <h3 className="text-xl font-bold text-[#F5F0E0] mb-2">Photon Catcher</h3>
                <p className="text-[#9A9A80] text-sm leading-relaxed mb-4">Catch flying photons before they escape! Each photon you catch reveals a real achievement from Nour's career.</p>
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
