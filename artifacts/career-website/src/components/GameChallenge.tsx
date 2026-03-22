import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Clock, Zap, RotateCcw, ChevronRight, Beaker, Brain } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    category: "Spectroscopy",
    icon: "🔬",
    question: "What does SERS stand for in analytical chemistry?",
    options: [
      "Surface-Enhanced Raman Spectroscopy",
      "Spectral Emission Resonance System",
      "Surface Electron Reflection Scan",
      "Signal-Enhanced Raman Sensor",
    ],
    correct: 0,
    fact: "SERS can detect single molecules — Nour spent 2.5 years developing AI algorithms for SERS analysis!",
  },
  {
    id: 2,
    category: "Chemical Engineering",
    icon: "⚗️",
    question: "Which phenomenon does Raman spectroscopy rely on?",
    options: [
      "Photoelectric effect",
      "Inelastic scattering of photons",
      "Nuclear magnetic resonance",
      "Fluorescence emission",
    ],
    correct: 1,
    fact: "Raman scattering shifts light frequency based on molecular vibrations — a molecular fingerprint!",
  },
  {
    id: 3,
    category: "AI & ML",
    icon: "🤖",
    question: "Which ML technique is best for pattern recognition in spectral data?",
    options: [
      "Linear regression",
      "K-means clustering only",
      "Convolutional Neural Networks (CNN)",
      "Bubble sort algorithm",
    ],
    correct: 2,
    fact: "CNNs excel at detecting spectral patterns — exactly what Nour applied to SERS data at Atiko Labs!",
  },
  {
    id: 4,
    category: "Chemical Eng.",
    icon: "🧪",
    question: "What is the molecular formula for water?",
    options: ["H₃O", "H₂O₂", "H₂O", "HO₂"],
    correct: 2,
    fact: "Simple but fundamental — chemical engineers optimize processes involving water at massive scales!",
  },
  {
    id: 5,
    category: "Full-Stack Dev",
    icon: "💻",
    question: "What does REST stand for in API design?",
    options: [
      "Rapid Execution Standard Template",
      "Representational State Transfer",
      "Remote Execution Socket Technology",
      "Resource Endpoint Structure Type",
    ],
    correct: 1,
    fact: "Nour builds full-stack apps with REST APIs — bridging the gap between science and software!",
  },
];

const TIME_PER_QUESTION = 15;

type GameState = "idle" | "playing" | "answer" | "finished";

export function GameChallenge() {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number }[]>([]);

  const question = QUESTIONS[currentQ];

  const handleAnswer = useCallback(
    (idx: number) => {
      if (selected !== null || gameState !== "playing") return;
      setSelected(idx);
      setGameState("answer");
      const correct = idx === question.correct;
      const timeBonus = Math.floor((timeLeft / TIME_PER_QUESTION) * 50);
      if (correct) {
        setScore((s) => s + 100 + timeBonus);
        setParticles(
          Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x: Math.random() * 100,
            y: Math.random() * 100,
          }))
        );
      }
      setAnswers((a) => [...a, correct]);
    },
    [selected, gameState, question, timeLeft]
  );

  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      handleAnswer(-1);
      return;
    }
    const t = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, gameState, handleAnswer]);

  const nextQuestion = () => {
    setParticles([]);
    if (currentQ + 1 >= QUESTIONS.length) {
      setGameState("finished");
    } else {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setTimeLeft(TIME_PER_QUESTION);
      setGameState("playing");
    }
  };

  const startGame = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setTimeLeft(TIME_PER_QUESTION);
    setAnswers([]);
    setParticles([]);
    setGameState("playing");
  };

  const correctCount = answers.filter(Boolean).length;
  const rank =
    score >= 600
      ? { label: "Lab Genius", emoji: "🏆", color: "text-amber-400" }
      : score >= 400
      ? { label: "AI Researcher", emoji: "🤖", color: "text-lime-400" }
      : score >= 200
      ? { label: "Chem Grad", emoji: "⚗️", color: "text-amber-300" }
      : { label: "Keep Learning", emoji: "📚", color: "text-[#9A9A80]" };

  return (
    <section id="challenge" className="py-24 bg-[#0E0E0B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none">
        {["H₂O", "CO₂", "NH₃", "C₆H₆", "NaCl", "SERS"].map((mol, i) => (
          <motion.span
            key={mol}
            className="absolute text-[#2A2A1E] font-mono text-sm font-bold"
            style={{ left: `${10 + i * 16}%`, top: `${15 + (i % 3) * 30}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >
            {mol}
          </motion.span>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-400 text-sm font-semibold mb-4">
            <Beaker size={15} />
            Recruiter Challenge
          </div>
          <h2 className="text-4xl font-bold text-[#F5F0E0] mb-3">
            Nour's Lab Challenge
          </h2>
          <p className="text-[#9A9A80] text-lg">
            5 questions on chemistry, AI & dev. Can you score 500+?
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {gameState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl p-10 text-center"
            >
              <div className="w-24 h-24 mx-auto bg-amber-400 rounded-3xl flex items-center justify-center text-[#0B0B08] text-4xl mb-6 shadow-lg shadow-amber-400/20">
                🧬
              </div>
              <h3 className="text-2xl font-bold text-[#F5F0E0] mb-2">
                Ready to test your knowledge?
              </h3>
              <p className="text-[#9A9A80] mb-8">
                5 questions · 15 seconds each · bonus points for speed
              </p>
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { icon: "🔬", label: "Spectroscopy" },
                  { icon: "🤖", label: "AI & ML" },
                  { icon: "💻", label: "Full-Stack" },
                ].map((cat) => (
                  <div
                    key={cat.label}
                    className="bg-[#1E1E18] rounded-2xl p-4 text-center border border-[#2A2A1E]"
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-semibold text-[#9A9A80]">{cat.label}</div>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startGame}
                className="px-10 py-4 bg-amber-400 text-[#0B0B08] font-bold text-lg rounded-2xl shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-colors"
              >
                Start Challenge →
              </motion.button>
            </motion.div>
          )}

          {(gameState === "playing" || gameState === "answer") && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl overflow-hidden"
            >
              <div className="px-6 pt-6 pb-4 border-b border-[#2A2A1E]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i < currentQ
                            ? answers[i]
                              ? "bg-amber-400"
                              : "bg-red-400"
                            : i === currentQ
                            ? "bg-amber-400"
                            : "bg-[#2A2A1E]"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm font-semibold text-amber-400">
                      <Zap size={14} />
                      {score} pts
                    </span>
                    <div
                      className={`flex items-center gap-1 text-sm font-bold ${
                        timeLeft <= 5 ? "text-red-400" : "text-[#9A9A80]"
                      }`}
                    >
                      <Clock size={14} />
                      {timeLeft}s
                    </div>
                  </div>
                </div>
                <div className="h-1.5 bg-[#2A2A1E] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full transition-colors ${
                      timeLeft <= 5 ? "bg-red-400" : "bg-amber-400"
                    }`}
                    animate={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              <div className="px-6 py-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{question.icon}</span>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    {question.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#F5F0E0] mb-6 leading-snug">
                  {question.question}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {question.options.map((opt, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === question.correct;
                    let classes =
                      "w-full text-left px-5 py-4 rounded-2xl border-2 font-medium transition-all text-sm ";
                    if (gameState === "answer") {
                      if (isCorrect)
                        classes += "border-amber-400 bg-amber-400/10 text-amber-300";
                      else if (isSelected && !isCorrect)
                        classes += "border-red-400 bg-red-400/10 text-red-400";
                      else
                        classes += "border-[#2A2A1E] bg-[#1A1A14] text-[#9A9A80]/60";
                    } else {
                      classes +=
                        "border-[#2A2A1E] bg-[#1E1E18] text-[#F5F0E0] hover:border-amber-400/50 hover:bg-amber-400/5 hover:text-amber-300 cursor-pointer";
                    }
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={classes}
                        whileHover={gameState === "playing" ? { scale: 1.01 } : {}}
                        whileTap={gameState === "playing" ? { scale: 0.99 } : {}}
                      >
                        <span className="font-bold mr-3 text-[#9A9A80]">
                          {["A", "B", "C", "D"][idx]}
                        </span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence>
                {gameState === "answer" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-6 pb-6"
                  >
                    <div
                      className={`rounded-2xl p-4 mb-4 ${
                        selected === question.correct
                          ? "bg-amber-400/10 border border-amber-400/20"
                          : "bg-[#1E1E18] border border-[#2A2A1E]"
                      }`}
                    >
                      <p className="text-sm text-[#9A9A80]">
                        <span className="font-semibold text-[#F5F0E0]">Fun fact: </span>
                        {question.fact}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextQuestion}
                      className="w-full py-3.5 bg-amber-400 text-[#0B0B08] font-bold rounded-2xl hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
                    >
                      {currentQ + 1 >= QUESTIONS.length ? "See Results" : "Next Question"}
                      <ChevronRight size={18} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute w-2 h-2 rounded-full bg-amber-400 pointer-events-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], y: -60 }}
                  transition={{ duration: 0.8 }}
                />
              ))}
            </motion.div>
          )}

          {gameState === "finished" && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#141410] rounded-3xl border border-[#2A2A1E] shadow-xl p-10 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                className="text-6xl mb-4"
              >
                {rank.emoji}
              </motion.div>
              <h3 className={`text-2xl font-bold mb-1 ${rank.color}`}>{rank.label}</h3>
              <div className="text-5xl font-black text-[#F5F0E0] my-4">{score}</div>
              <p className="text-[#9A9A80] mb-6">
                {correctCount} / {QUESTIONS.length} correct
              </p>

              <div className="flex justify-center gap-3 mb-8">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      correct ? "bg-amber-400 text-[#0B0B08]" : "bg-red-400/20 text-red-400 border border-red-400/30"
                    }`}
                  >
                    {correct ? "✓" : "✗"}
                  </div>
                ))}
              </div>

              <div className="bg-[#1E1E18] border border-amber-400/20 rounded-2xl p-6 text-white mb-6">
                <Brain className="mx-auto mb-2 text-amber-400" size={28} />
                <p className="font-bold text-lg mb-1 text-[#F5F0E0]">Impressed? 🎉</p>
                <p className="text-[#9A9A80] text-sm">
                  Nour built this site, created AI algorithms for SERS, and is ready to bring this energy to your team.
                </p>
                <a
                  href="mailto:noormich@post.bgu.ac.il"
                  className="inline-block mt-4 px-6 py-2.5 bg-amber-400 text-[#0B0B08] font-bold rounded-xl hover:bg-amber-300 transition-colors text-sm"
                >
                  Hire Nour →
                </a>
              </div>

              <button
                onClick={startGame}
                className="flex items-center gap-2 text-[#9A9A80] hover:text-amber-400 font-semibold mx-auto transition-colors"
              >
                <RotateCcw size={16} />
                Play Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
