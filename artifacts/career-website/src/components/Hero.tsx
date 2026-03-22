import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0B0B08]">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#0B0B08]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#2A2A1E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <motion.div animate={{ y: [0, -30, 0], x: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 40, 0], x: [0, -30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-lime-500/8 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #10B981, #EAB308, #F97316, #EF4444)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 max-w-3xl pt-10 lg:pt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            {t("hero_available")}
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold leading-[1.1] tracking-tight mb-6">
            <span className="block text-[#F5F0E0]">Nour Karawani</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 text-[#9A9A80]">{t("hero_tagline1")}</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-1 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-lime-400">
              {t("hero_tagline2")}
            </span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-[#9A9A80] mb-10 max-w-2xl leading-relaxed">
            {t("hero_desc")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12">
            <a href="#projects" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-[#0B0B08] font-bold shadow-lg shadow-amber-400/20 hover:bg-amber-300 hover:shadow-xl hover:shadow-amber-400/30 hover:-translate-y-1 transition-all duration-300">
              {t("hero_cta_projects")}
              <ArrowRight size={18} />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent text-[#F5F0E0] font-semibold border border-[#2A2A1E] hover:bg-[#141410] hover:border-amber-400/40 hover:-translate-y-1 transition-all duration-300">
              {t("hero_cta_contact")}
            </a>
            <a href="/pitch-reel" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-lime-400/10 text-lime-400 font-semibold border border-lime-400/20 hover:bg-lime-400/20 hover:-translate-y-1 transition-all duration-300 text-sm">
              {t("hero_cta_reel")}
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            {([
              { label: "hero_stat1_label", val: "hero_stat1_val" },
              { label: "hero_stat2_label", val: "hero_stat2_val" },
              { label: "hero_stat3_label", val: "hero_stat3_val" },
              { label: "hero_stat4_label", val: "hero_stat4_val" },
            ] as const).map((stat, i) => (
              <div key={i} className="bg-[#141410] border border-[#2A2A1E] rounded-xl p-4">
                <div className="text-amber-400 font-bold mb-1">{t(stat.label)}</div>
                <div className="text-[#9A9A80] text-xs uppercase tracking-wider">{t(stat.val)}</div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9A9A80]">{t("hero_find")}</span>
            <div className="h-px w-8 bg-[#2A2A1E]" />
            <div className="flex items-center gap-3">
              <a href="https://github.com/NourKa5" target="_blank" rel="noopener noreferrer" title="GitHub"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#141410] border border-[#2A2A1E] text-[#9A9A80] hover:bg-[#F5F0E0] hover:border-[#F5F0E0] hover:text-[#0B0B08] transition-all duration-300 hover:scale-110">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/nour-karawani" target="_blank" rel="noopener noreferrer" title="LinkedIn"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#141410] border border-[#2A2A1E] text-[#9A9A80] hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300 hover:scale-110">
                <Linkedin size={20} />
              </a>
              <a href="mailto:noormich@post.bgu.ac.il" title="Email"
                className="w-11 h-11 flex items-center justify-center rounded-full bg-[#141410] border border-[#2A2A1E] text-[#9A9A80] hover:bg-amber-400 hover:border-amber-400 hover:text-[#0B0B08] transition-all duration-300 hover:scale-110">
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:block flex-1 w-full max-w-md">
          <div className="bg-[#0D0D0A] border border-[#2A2A1E] rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            <div className="flex items-center px-4 py-3 bg-[#141410] border-b border-[#2A2A1E]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-lime-500/80"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-[#9A9A80]">profile_data.json</div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto" dir="ltr">
              <span className="text-[#9A9A80]">{`{`}</span><br />
              <div className="pl-4">
                <span className="text-lime-400">"name"</span>: <span className="text-amber-300">"Nour Karawani"</span>,<br />
                <span className="text-lime-400">"degree"</span>: <span className="text-amber-300">"B.Sc. Chemical Eng."</span>,<br />
                <span className="text-lime-400">"university"</span>: <span className="text-amber-300">"BGU Negev"</span>,<br />
                <span className="text-lime-400">"gpa"</span>: <span className="text-amber-300">"80.65 / 100"</span>,<br />
                <span className="text-lime-400">"location"</span>: <span className="text-amber-300">"Israel"</span>,<br />
                <span className="text-lime-400">"open_to"</span>: <span className="text-amber-300">"Global relocation"</span>,<br />
                <span className="text-lime-400">"status"</span>: <span className="text-amber-400">"● available"</span>
              </div>
              <span className="text-[#9A9A80]">{`}`}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
