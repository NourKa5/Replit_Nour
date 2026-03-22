import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useCounter } from "@/hooks/useCounter";

const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, "");

function SplitText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: char === " " ? "inline" : "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

const STATS = [
  { num: 2.5, decimals: 1, suffix: " Yrs", label: "R&D Experience" },
  { num: 7,   decimals: 0, suffix: "",     label: "Projects Completed" },
  { num: 1,   decimals: 0, suffix: "",     label: "Paper Under Review" },
  { num: 80,  decimals: 0, suffix: "+",    label: "GPA / BGU Negev" },
];

function StatCard({ num, decimals, suffix, label }: { num: number; decimals: number; suffix: string; label: string }) {
  const { value, ref } = useCounter(num, 1600, decimals);
  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      whileHover={{ y: -3, borderColor: "rgba(234,179,8,0.4)" }}
      className="bg-[#141410] border border-[#2A2A1E] rounded-xl p-4 transition-colors"
    >
      <div className="text-amber-400 font-extrabold text-xl mb-1 tabular-nums">
        {value}{suffix}
      </div>
      <div className="text-[#9A9A80] text-xs uppercase tracking-wider">{label}</div>
    </motion.div>
  );
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.8,
  dur: Math.random() * 8 + 5,
  delay: Math.random() * 5,
}));

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0B0B08]">
      {/* Background */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0B0B08]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#2A2A1E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Animated floating orbs */}
        <motion.div animate={{ y: [0, -40, 0], x: [0, 25, 0], scale: [1, 1.1, 1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-500/8 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 50, 0], x: [0, -35, 0], scale: [1, 1.15, 1] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-lime-500/8 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, -25, 0], x: [0, 15, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-400/5 rounded-full blur-2xl" />
        <motion.div animate={{ y: [0, 30, 0], x: [0, -20, 0] }} transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-10 left-10 w-48 h-48 bg-lime-400/6 rounded-full blur-2xl" />

        {/* Floating particles */}
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-400/30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}

        {/* Rainbow top line */}
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #10B981, #EAB308, #F97316, #EF4444)' }} />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 max-w-3xl pt-10 lg:pt-0">
          {/* Available badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            {t("hero_available")}
          </motion.div>

          {/* Animated title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold leading-[1.1] tracking-tight mb-6">
            <span className="block">
              <SplitText text="Nour Karawani" className="text-[#F5F0E0]" delay={0.1} />
            </span>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="block text-3xl sm:text-4xl md:text-5xl mt-2 text-[#9A9A80]">
              {t("hero_tagline1")}
            </motion.span>
            <motion.span initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.9 }}
              className="block text-3xl sm:text-4xl md:text-5xl mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-lime-400">
              {t("hero_tagline2")}
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.0 }}
            className="text-lg sm:text-xl text-[#9A9A80] mb-8 max-w-2xl leading-relaxed">
            {t("hero_desc")}
          </motion.p>

          {/* CTAs + Social links in one row */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4 mb-8">
            <a href="#projects" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-amber-400 text-[#0B0B08] font-bold shadow-lg shadow-amber-400/20 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30 hover:-translate-y-1 transition-all duration-300">
              {t("hero_cta_projects")} <ArrowRight size={18} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-transparent text-[#F5F0E0] font-semibold border border-[#2A2A1E] hover:bg-[#141410] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300">
              {t("hero_cta_contact")}
            </a>

            {/* Divider */}
            <div className="h-8 w-px bg-[#2A2A1E] hidden sm:block" />

            {/* Find me on */}
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9A9A80] hidden sm:block">{t("hero_find")}</span>
            {[
              { href: "https://github.com/NourKa5", Icon: Github, hover: "hover:bg-[#F5F0E0] hover:border-[#F5F0E0] hover:text-[#0B0B08]", title: "GitHub" },
              { href: "https://linkedin.com/in/nour-karawani", Icon: Linkedin, hover: "hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white", title: "LinkedIn" },
              { href: "mailto:noormich@post.bgu.ac.il", Icon: Mail, hover: "hover:bg-amber-400 hover:border-amber-400 hover:text-[#0B0B08]", title: "Email" },
            ].map(({ href, Icon, hover, title }, i) => (
              <motion.a key={i} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" title={title}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 1.3 + i * 0.1 }}
                whileHover={{ scale: 1.15 }}
                className={`w-10 h-10 flex items-center justify-center rounded-full bg-[#141410] border border-[#2A2A1E] text-[#9A9A80] ${hover} transition-all duration-300`}>
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <StatCard key={s.label} num={s.num} decimals={s.decimals} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>

        {/* Code card */}
        <motion.div initial={{ opacity: 0, x: 40, rotateY: -15 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hidden lg:block flex-1 w-full max-w-md">
          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="bg-[#0D0D0A] border border-[#2A2A1E] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 hover:shadow-amber-400/10 hover:border-amber-400/20 transition-all duration-500">
            <div className="flex items-center px-4 py-3 bg-[#141410] border-b border-[#2A2A1E]">
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" />
                <motion.div whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full bg-amber-400/80 cursor-pointer" />
                <motion.div whileHover={{ scale: 1.3 }} className="w-3 h-3 rounded-full bg-lime-500/80 cursor-pointer" />
              </div>
              <div className="ml-4 text-xs font-mono text-[#9A9A80]">profile_data.json</div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto" dir="ltr">
              {[
                { key: "name", val: "Nour Karawani", d: 0.6 },
                { key: "degree", val: "B.Sc. Chemical Eng.", d: 0.75 },
                { key: "university", val: "BGU Negev", d: 0.9 },
                { key: "gpa", val: "80.65 / 100", d: 1.05 },
                { key: "location", val: "Israel", d: 1.2 },
                { key: "open_to", val: "Global relocation", d: 1.35 },
              ].map(({ key, val, d }) => (
                <motion.div key={key} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: d, duration: 0.4 }}>
                  <span className="text-lime-400">"{key}"</span>: <span className="text-amber-300">"{val}"</span>,<br />
                </motion.div>
              ))}
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.5, duration: 0.4 }}>
                <span className="text-lime-400">"status"</span>: <span className="text-amber-400">
                  <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>●</motion.span>
                  {" available"}
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
