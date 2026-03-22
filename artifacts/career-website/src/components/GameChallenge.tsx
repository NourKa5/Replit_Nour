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
      ? { label: "Lab Genius", emoji: "🏆", color: "text-yellow-500" }
      : score >= 400
      ? { label: "AI Researcher", emoji: "🤖", color: "text-teal-600" }
      : score >= 200
      ? { label: "Chem Grad", emoji: "⚗️", color: "text-emerald-600" }
      : { label: "Keep Learning", emoji: "📚", color: "text-slate-500" };

  return (
    <section id="challenge" className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Background molecules */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {["H₂O", "CO₂", "NH₃", "C₆H₆", "NaCl", "SERS"].map((mol, i) => (
          <motion.span
            key={mol}
            className="absolute text-slate-200 font-mono text-sm font-bold"
            style={{ left: `${10 + i * 16}%`, top: `${15 + (i % 3) * 30}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
          >
            {mol}
          </motion.span>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-sm font-semibold mb-4">
            <Beaker size={15} />
            Recruiter Challenge
          </div>
          <h2 className="text-4xl font-bold text-slate-900 mb-3">
            Nour's Lab Challenge
          </h2>
          <p className="text-slate-500 text-lg">
            5 questions on chemistry, AI & dev. Can you score 500+?
          </p>
        </motion.div>

        {/* Game Card */}
        <AnimatePresence mode="wait">
          {/* IDLE STATE */}
          {gameState === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl p-10 text-center"
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-teal-500 to-emerald-400 rounded-3xl flex items-center justify-center text-white text-4xl mb-6 shadow-lg shadow-teal-200">
                🧬
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Ready to test your knowledge?
              </h3>
              <p className="text-slate-500 mb-8">
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
                    className="bg-slate-50 rounded-2xl p-4 text-center"
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-semibold text-slate-500">{cat.label}</div>
                  </div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={startGame}
                className="px-10 py-4 bg-teal-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-teal-200 hover:bg-teal-500 transition-colors"
              >
                Start Challenge →
              </motion.button>
            </motion.div>
          )}

          {/* PLAYING / ANSWER STATE */}
          {(gameState === "playing" || gameState === "answer") && (
            <motion.div
              key={`q-${currentQ}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden"
            >
              {/* Top bar */}
              <div className="px-6 pt-6 pb-4 border-b border-slate-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {QUESTIONS.map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          i < currentQ
                            ? answers[i]
                              ? "bg-teal-400"
                              : "bg-red-300"
                            : i === currentQ
                            ? "bg-teal-600"
                            : "bg-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 text-sm font-semibold text-teal-600">
                      <Zap size={14} />
                      {score} pts
                    </span>
                    <div
                      className={`flex items-center gap-1 text-sm font-bold ${
                        timeLeft <= 5 ? "text-red-500" : "text-slate-600"
                      }`}
                    >
                      <Clock size={14} />
                      {timeLeft}s
                    </div>
                  </div>
                </div>
                {/* Timer bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full transition-colors ${
                      timeLeft <= 5 ? "bg-red-400" : "bg-teal-400"
                    }`}
                    animate={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="px-6 py-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{question.icon}</span>
                  <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">
                    {question.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 leading-snug">
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
                        classes += "border-teal-400 bg-teal-50 text-teal-800";
                      else if (isSelected && !isCorrect)
                        classes += "border-red-300 bg-red-50 text-red-700";
                      else
                        classes += "border-slate-100 bg-slate-50 text-slate-400";
                    } else {
                      classes +=
                        "border-slate-100 bg-slate-50 text-slate-700 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 cursor-pointer";
                    }
                    return (
                      <motion.button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        className={classes}
                        whileHover={gameState === "playing" ? { scale: 1.01 } : {}}
                        whileTap={gameState === "playing" ? { scale: 0.99 } : {}}
                      >
                        <span className="font-bold mr-3 text-slate-400">
                          {["A", "B", "C", "D"][idx]}
                        </span>
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Answer feedback */}
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
                          ? "bg-teal-50 border border-teal-100"
                          : "bg-slate-50 border border-slate-100"
                      }`}
                    >
                      <p className="text-sm text-slate-600">
                        <span className="font-semibold text-slate-800">Fun fact: </span>
                        {question.fact}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={nextQuestion}
                      className="w-full py-3.5 bg-teal-600 text-white font-bold rounded-2xl hover:bg-teal-500 transition-colors flex items-center justify-center gap-2"
                    >
                      {currentQ + 1 >= QUESTIONS.length ? "See Results" : "Next Question"}
                      <ChevronRight size={18} />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Confetti particles */}
              {particles.map((p) => (
                <motion.div
                  key={p.id}
                  className="absolute w-2 h-2 rounded-full bg-teal-400 pointer-events-none"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0], y: -60 }}
                  transition={{ duration: 0.8 }}
                />
              ))}
            </motion.div>
          )}

          {/* FINISHED STATE */}
          {gameState === "finished" && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl p-10 text-center"
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
              <div className="text-5xl font-black text-slate-900 my-4">{score}</div>
              <p className="text-slate-500 mb-6">
                {correctCount} / {QUESTIONS.length} correct
              </p>

              <div className="flex justify-center gap-3 mb-8">
                {answers.map((correct, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                      correct ? "bg-teal-400" : "bg-red-300"
                    }`}
                  >
                    {correct ? "✓" : "✗"}
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-6 text-white mb-6">
                <Brain className="mx-auto mb-2" size={28} />
                <p className="font-bold text-lg mb-1">Impressed?</p>
                <p className="text-teal-100 text-sm">
                  Nour built this site, created AI algorithms for SERS, and is ready to bring this energy to your team.
                </p>
                <a
                  href="mailto:noormich@post.bgu.ac.il"
                  className="inline-block mt-4 px-6 py-2.5 bg-white text-teal-700 font-bold rounded-xl hover:bg-teal-50 transition-colors text-sm"
                >
                  Hire Nour →
                </a>
              </div>

              <button
                onClick={startGame}
                className="flex items-center gap-2 text-slate-500 hover:text-teal-600 font-semibold mx-auto transition-colors"
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
