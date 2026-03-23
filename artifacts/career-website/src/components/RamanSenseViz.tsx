import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

function buildPath(noisy: boolean): string {
  const pts: string[] = [];
  for (let i = 0; i <= 100; i++) {
    const wn = 800 + i * 10;
    const p1 = Math.exp(-Math.pow(wn - 1080, 2) / 600) * 58;
    const p2 = Math.exp(-Math.pow(wn - 1590, 2) / 500) * 78;
    const p3 = Math.exp(-Math.pow(wn - 1390, 2) / 350) * 40;
    const signal = p1 + p2 + p3;
    const base = noisy ? 8 + Math.sin(i * 0.3) * 4 : 3;
    const noise = noisy
      ? Math.sin(i * 7.3) * 13 + Math.sin(i * 3.1) * 7 + Math.sin(i * 17.9) * 4 + Math.sin(i * 0.7) * 6
      : 0;
    const y = 88 - signal - base - noise;
    pts.push(`${i * 4},${Math.max(4, Math.min(86, y)).toFixed(1)}`);
  }
  return "M " + pts.join(" L ");
}

const NOISY_PATH = buildPath(true);
const CLEAN_PATH = buildPath(false);

const PEAK_LABELS = [
  { x: 112, label: "1080 cm⁻¹" },
  { x: 236, label: "1390 cm⁻¹" },
  { x: 316, label: "1590 cm⁻¹" },
];

export function RamanSenseViz() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const PIPELINE = [
    { icon: "🩸", label: t("viz_step1_label"), sub: t("viz_step1_sub") },
    { icon: "⚡", label: t("viz_step2_label"), sub: t("viz_step2_sub") },
    { icon: "📡", label: t("viz_step3_label"), sub: t("viz_step3_sub") },
    { icon: "🧠", label: t("viz_step4_label"), sub: t("viz_step4_sub") },
    { icon: "✅", label: t("viz_step5_label"), sub: t("viz_step5_sub") },
  ];

  const ALGO_STEPS = [
    t("viz_algo_1"),
    t("viz_algo_2"),
    t("viz_algo_3"),
    t("viz_algo_4"),
    t("viz_algo_5"),
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="col-span-full bg-[#141410] rounded-2xl border border-amber-400/30 overflow-hidden mb-2"
    >
      {/* Top badge bar */}
      <div className="flex items-center gap-3 px-6 py-3 bg-amber-400/5 border-b border-amber-400/15">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">{t("viz_badge")}</span>
        <span className="text-[#9A9A80] text-xs">· {t("viz_badge_sub")}</span>
      </div>

      <div className="p-6 grid lg:grid-cols-5 gap-8">
        {/* ── LEFT: Text ── */}
        <div className="lg:col-span-2 flex flex-col justify-center gap-5">
          <div>
            <h3 className="text-2xl font-bold text-[#F5F0E0] mb-1">RamanSense</h3>
            <p className="text-amber-400 text-sm font-semibold">{t("viz_algo_title")}</p>
          </div>

          <p className="text-[#9A9A80] text-sm leading-relaxed">
            Imagine trying to hear <span className="text-[#F5F0E0] font-semibold">one person whispering</span> in a stadium full of noise. That's the challenge of detecting a single molecule in blood. I built a pattern recognition system that takes a chaotic sensor signal, strips away noise and interference layer by layer, and{" "}
            <span className="text-[#F5F0E0] font-semibold">identifies the molecule's unique chemical fingerprint</span> — even at concentrations invisible to conventional methods.
          </p>

          {/* Mission callout */}
          <div className="flex items-start gap-2 border-s-2 border-amber-400 bg-amber-400/5 rounded-e-lg px-3 py-2.5">
            <span className="text-amber-400 flex-shrink-0 mt-0.5">🎯</span>
            <p className="text-xs text-[#F5F0E0] font-medium leading-relaxed">{t("viz_mission")}</p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[#0B0B08] rounded-xl p-3 border border-[#2A2A1E] text-center">
              <div className="text-amber-400 font-bold text-xl">&lt;2%</div>
              <div className="text-[#9A9A80] text-xs mt-0.5">NSR</div>
            </div>
            <div className="bg-[#0B0B08] rounded-xl p-3 border border-[#2A2A1E] text-center">
              <div className="text-lime-400 font-bold text-xl">1 µM</div>
              <div className="text-[#9A9A80] text-xs mt-0.5">{t("viz_step1_sub")}</div>
            </div>
            <div className="bg-[#0B0B08] rounded-xl p-3 border border-[#2A2A1E] text-center">
              <div className="text-lime-400 font-bold text-xl">PCA</div>
              <div className="text-[#9A9A80] text-xs mt-0.5">PLS · PCR</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Pattern Recognition", "Signal Processing", "SERS", "Python", "PCA/PLS/PCR"].map((tag) => (
              <span key={tag} className="text-xs font-semibold text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-md border border-lime-400/20">
                {tag}
              </span>
            ))}
          </div>

          <a
            href="https://github.com/NourKa5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-[#9A9A80] hover:text-[#F5F0E0] transition-colors w-fit"
          >
            <Github size={15} /> View on GitHub
          </a>
        </div>

        {/* ── RIGHT: Visual ── */}
        <div className="lg:col-span-3 flex flex-col gap-5">

          {/* Pipeline flow */}
          <div>
            <p className="text-[#9A9A80] text-xs font-semibold uppercase tracking-widest mb-3">{t("viz_pipeline_title")}</p>
            <div className="flex items-start gap-1 sm:gap-2 flex-wrap sm:flex-nowrap">
              {PIPELINE.map((step, i) => (
                <div key={i} className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.15 + i * 0.15, type: "spring", stiffness: 200 }}
                    className="flex flex-col items-center text-center flex-1"
                  >
                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-base sm:text-xl border mb-1.5 ${
                        i === 3
                          ? "bg-amber-400/15 border-amber-400/40"
                          : i === 4
                          ? "bg-lime-400/15 border-lime-400/40"
                          : "bg-[#0B0B08] border-[#2A2A1E]"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <p className="text-[#F5F0E0] text-xs font-semibold leading-tight hidden sm:block">{step.label}</p>
                    <p className="text-[#9A9A80] text-xs leading-tight hidden md:block">{step.sub}</p>
                  </motion.div>
                  {i < PIPELINE.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.3 + i * 0.15, duration: 0.25 }}
                      className="h-px w-4 sm:w-6 bg-gradient-to-r from-amber-400/40 to-amber-400/20 origin-left flex-shrink-0 mt-[-10px]"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Spectrum charts: before & after */}
          <div className="grid grid-cols-2 gap-3">
            {/* Before */}
            <div className="bg-[#0B0B08] rounded-xl p-3 border border-[#2A2A1E]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-red-500/70" />
                <span className="text-[#9A9A80] text-xs font-semibold">{t("viz_raw_title")}</span>
              </div>
              <svg viewBox="0 0 400 95" className="w-full h-24" preserveAspectRatio="none">
                <motion.path
                  d={NOISY_PATH}
                  fill="none"
                  stroke="#6B6B50"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
                />
                <line x1="0" y1="88" x2="400" y2="88" stroke="#2A2A1E" strokeWidth="1" />
              </svg>
              <p className="text-center text-[#9A9A80] text-xs mt-1">{t("viz_raw_sub")}</p>
            </div>

            {/* After */}
            <div className="bg-[#0B0B08] rounded-xl p-3 border border-lime-400/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-lime-400" />
                <span className="text-[#9A9A80] text-xs font-semibold">{t("viz_clean_title")}</span>
              </div>
              <svg viewBox="0 0 400 95" className="w-full h-24" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="cleanGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A3E635" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#A3E635" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  d={CLEAN_PATH + " L400,88 L0,88 Z"}
                  fill="url(#cleanGrad)"
                  stroke="none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 2.0 }}
                />
                <motion.path
                  d={CLEAN_PATH}
                  fill="none"
                  stroke="#A3E635"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.1, delay: 1.6, ease: "easeInOut" }}
                />
                {PEAK_LABELS.map(({ x, label }, i) => (
                  <motion.g
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 2.4 + i * 0.2 }}
                  >
                    <line x1={x} y1="4" x2={x} y2="84" stroke="#A3E635" strokeWidth="0.6" strokeDasharray="3,3" />
                    <rect x={x - 18} y="84" width="36" height="10" rx="2" fill="#0B0B08" />
                    <text x={x} y="92" textAnchor="middle" fill="#A3E635" fontSize="7.5" fontFamily="monospace">
                      {label}
                    </text>
                  </motion.g>
                ))}
                <line x1="0" y1="88" x2="400" y2="88" stroke="#2A2A1E" strokeWidth="1" />
              </svg>
              <p className="text-center text-lime-400 text-xs font-semibold mt-1">{t("viz_clean_sub")}</p>
            </div>
          </div>

          {/* Algorithm steps */}
          <div>
            <p className="text-[#9A9A80] text-xs font-semibold uppercase tracking-widest mb-2">{t("viz_algo_steps")}</p>
            <div className="flex flex-wrap gap-2">
              {ALGO_STEPS.map((step, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
                  className="text-xs text-[#9A9A80] bg-[#0B0B08] border border-[#2A2A1E] px-2.5 py-1 rounded-lg"
                >
                  {step}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
