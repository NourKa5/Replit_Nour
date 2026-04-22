import { motion } from "framer-motion";
import { Brain, FlaskConical, MapPin, Maximize2, Play, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useLanguage, type TranslationKey } from "@/lib/i18n";

export function LookingFor() {
  const { t, isRTL } = useLanguage();
  const [reelLoaded, setReelLoaded] = useState(false);

  const dataRoleKeys: TranslationKey[] = [
    "looking_col1_role1",
    "looking_col1_role2",
    "looking_col1_role3",
    "looking_col1_role4",
    "looking_col1_role5",
  ];

  const engRoleKeys: TranslationKey[] = [
    "looking_col2_role1",
    "looking_col2_role2",
    "looking_col2_role3",
    "looking_col2_role4",
    "looking_col2_role5",
    "looking_col2_role6",
    "looking_col2_role7",
    "looking_col2_role8",
    "looking_col2_role9",
  ];

  return (
    <section
      id="looking-for"
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#0B0B08] border-t border-[#2A2A1E] overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(#2A2A1E 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.06] rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-lime-500/[0.06] rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-sm font-semibold mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
            </span>
            {t("looking_badge")}
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[#F5F0E0] mb-4 tracking-tight">
            {t("looking_title")}
          </h2>
          <p className="text-base sm:text-lg text-[#9A9A80] max-w-2xl mx-auto leading-relaxed">
            {t("looking_subtitle")}
          </p>
        </motion.div>

        {/* Two role columns */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-12 sm:mb-16">
          {/* Data / ML / AI */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="relative bg-gradient-to-br from-[#141410] to-[#0F0F0B] border border-[#2A2A1E] rounded-2xl p-6 sm:p-8 hover:border-lime-400/40 transition-all duration-300 group"
          >
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-lime-400/60 to-transparent" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-lime-400/10 border border-lime-400/30 flex items-center justify-center text-lime-400 group-hover:scale-110 transition-transform">
                <Brain size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F5F0E0]">{t("looking_col1_title")}</h3>
                <p className="text-xs uppercase tracking-wider text-lime-400/70 font-mono mt-0.5">
                  {t("looking_col1_sub")}
                </p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {dataRoleKeys.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: isRTL ? 10 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  className="flex items-start gap-2.5 text-[#F5F0E0] text-sm sm:text-base"
                >
                  <span className="text-lime-400 mt-1 flex-shrink-0">▸</span>
                  <span>{t(key)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Chemical / Engineering */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative bg-gradient-to-br from-[#141410] to-[#0F0F0B] border border-[#2A2A1E] rounded-2xl p-6 sm:p-8 hover:border-amber-400/40 transition-all duration-300 group"
          >
            <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <FlaskConical size={22} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#F5F0E0]">{t("looking_col2_title")}</h3>
                <p className="text-xs uppercase tracking-wider text-amber-400/70 font-mono mt-0.5">
                  {t("looking_col2_sub")}
                </p>
              </div>
            </div>
            <ul className="space-y-2.5">
              {engRoleKeys.map((key, i) => (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: isRTL ? -10 : 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.04, duration: 0.3 }}
                  className="flex items-start gap-2.5 text-[#F5F0E0] text-sm sm:text-base"
                >
                  <span className="text-amber-400 mt-1 flex-shrink-0">▸</span>
                  <span>{t(key)}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Relocation badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#141410] border border-[#2A2A1E] text-[#F5F0E0]">
            <MapPin size={16} className="text-amber-400" />
            <span className="text-sm font-medium">{t("looking_relocation")}</span>
          </div>
        </motion.div>

        {/* Pitch reel embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#F5F0E0] mb-2">
              {t("looking_pitch_title")}
            </h3>
            <p className="text-sm sm:text-base text-[#9A9A80]">{t("looking_pitch_subtitle")}</p>
          </div>

          <div
            className="relative rounded-2xl overflow-hidden border border-[#2A2A1E] bg-[#0D0D0A] shadow-2xl shadow-black/50 group"
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* Rainbow accent */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 z-20"
              style={{
                background:
                  "linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #10B981, #EAB308, #F97316, #EF4444)",
              }}
            />

            {/* Loading state */}
            {!reelLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0D0D0A] gap-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  className="w-14 h-14 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400"
                >
                  <Play size={22} fill="currentColor" />
                </motion.div>
                <p className="text-[#9A9A80] text-sm font-mono">Loading reel…</p>
              </div>
            )}

            <iframe
              src="/pitch-reel/"
              title="Nour Karawani — 30-Second Pitch Reel"
              className="w-full h-full border-0"
              loading="lazy"
              allow="autoplay"
              onLoad={() => setReelLoaded(true)}
            />

            {/* Fullscreen link overlay */}
            <a
              href="/pitch-reel/"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-white/90 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            >
              <Maximize2 size={12} />
              {t("looking_open_full")}
            </a>
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-amber-400 text-[#0B0B08] font-bold text-sm sm:text-base shadow-lg shadow-amber-400/20 hover:bg-amber-300 hover:-translate-y-1 transition-all duration-300"
            >
              {t("looking_cta")}
              <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
