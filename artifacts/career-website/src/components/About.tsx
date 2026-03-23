import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function About() {
  const { t } = useLanguage();

  const tags = ["Raman Spectroscopy", "Machine Learning", "PLC Programming", "Python", "FastAPI", "Docker", "Robotics", "MATLAB"];

  return (
    <section id="about" className="py-16 sm:py-24 bg-[#0E0E0B] relative overflow-hidden">
      {/* Background orbs */}
      <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-0 w-72 h-72 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <motion.div animate={{ x: [0, 30, 0], y: [0, -30, 0] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/4 right-0 w-64 h-64 bg-lime-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title with slide-up */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0]"
            >
              {t("about_title")}
            </motion.h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full origin-left"
          />
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Floating photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-5 relative"
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-56 h-72 sm:w-72 sm:h-96 md:w-72 md:h-96 mx-auto"
            >
              {/* Glow rings */}
              <motion.div
                animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-amber-400/20 to-lime-500/10 blur-2xl -z-10"
              />
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-400/20 to-lime-500/10 -z-10" />
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#2A2A1E]">
                <img
                  src={`${import.meta.env.BASE_URL}images/avatar.jpg`}
                  alt="Nour Karawani"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 5%" }}
                />
              </div>
              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                animate={{ y: [0, -6, 0] }}
                className="absolute -bottom-4 -right-4 bg-[#141410] border border-amber-400/30 rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="text-amber-400 font-bold text-lg">80.65</div>
                <div className="text-[#9A9A80] text-xs">GPA / 100</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.7 }}
                animate={{ y: [0, 6, 0] }}
                className="absolute -top-4 -left-4 bg-[#141410] border border-lime-400/30 rounded-2xl px-4 py-3 shadow-xl"
              >
                <div className="text-lime-400 font-bold text-lg">2.5yr</div>
                <div className="text-[#9A9A80] text-xs">R&D Exp.</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#F5F0E0]">{t("about_h3")}</h3>
            <p className="text-lg text-[#9A9A80] leading-relaxed">{t("about_p1")}</p>

            {/* Research mission callout */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="flex items-start gap-3 border-s-2 border-amber-400 bg-amber-400/5 rounded-e-xl px-4 py-3"
            >
              <span className="text-amber-400 text-lg mt-0.5 flex-shrink-0">🎯</span>
              <p className="text-sm text-[#F5F0E0] font-medium leading-relaxed">{t("about_mission")}</p>
            </motion.div>

            <p className="text-lg text-[#9A9A80] leading-relaxed">{t("about_p2")}</p>
            <p className="text-lg text-[#9A9A80] leading-relaxed">{t("about_p3")}</p>

            {/* Animated tags */}
            <motion.div
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 py-4"
            >
              {tags.map(tag => (
                <motion.span
                  key={tag}
                  variants={{ hidden: { opacity: 0, scale: 0.7, y: 10 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200 } } }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  className="px-3 py-1 bg-amber-400/10 text-amber-400 text-sm font-semibold rounded-full border border-amber-400/20 cursor-default"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6 mt-4 pt-6 border-t border-[#2A2A1E]">
              {([
                { icon: GraduationCap, color: "amber", title: "about_edu1", sub: "about_edu1_sub" },
                { icon: Award, color: "amber", title: "about_edu2", sub: "about_edu2_sub" },
                { icon: BookOpen, color: "lime", title: "about_edu3", sub: "about_edu3_sub" },
                { icon: FileText, color: "lime", title: "about_edu4", sub: "about_edu4_sub" },
              ] as const).map(({ icon: Icon, color, title, sub }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-3"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`mt-1 p-2 rounded-lg ${color === "amber" ? "bg-amber-400/10 text-amber-400" : "bg-lime-400/10 text-lime-400"}`}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <div>
                    <h4 className="font-bold text-[#F5F0E0]">{t(title)}</h4>
                    <p className="text-sm text-[#9A9A80]">{t(sub)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
