import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Experience() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end end"] });
  const lineHeight = useSpring(useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]), { stiffness: 80, damping: 20 });

  const experiences = [
    { title: t("exp_job1_title"), company: t("exp_job1_company"), period: t("exp_job1_period"), bullets: [t("exp_job1_b1"), t("exp_job1_b2")] },
    { title: t("exp_job2_title"), company: t("exp_job2_company"), period: t("exp_job2_period"), bullets: [t("exp_job2_b1"), t("exp_job2_b2"), t("exp_job2_b3"), t("exp_job2_b4")] },
    { title: t("exp_job3_title"), company: t("exp_job3_company"), period: t("exp_job3_period"), bullets: [t("exp_job3_b1"), t("exp_job3_b2")] },
    { title: t("exp_job4_title"), company: t("exp_job4_company"), period: t("exp_job4_period"), bullets: [t("exp_job4_b1"), t("exp_job4_b2")] },
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-16 sm:py-24 bg-[#0B0B08] relative overflow-hidden">
      {/* Ambient background glow */}
      <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/3 w-96 h-96 bg-amber-400/4 rounded-full blur-3xl pointer-events-none" />
      <motion.div animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute left-0 bottom-1/3 w-80 h-80 bg-lime-400/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0] mb-4 overflow-hidden">
            <motion.span
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {t("exp_title")}
            </motion.span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full origin-left"
          />
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Animated timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#2A2A1E]">
            <motion.div style={{ height: lineHeight }} className="w-full bg-gradient-to-b from-amber-400 to-lime-400 rounded-full origin-top" />
          </div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 ring-4 ring-amber-400/20 border-4 border-[#0B0B08] items-center justify-center z-10 text-[#0B0B08]"
                >
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                    <Briefcase size={16} />
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:ps-8' : 'md:pe-8'}`}
                >
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(234,179,8,0.1)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-[#141410] p-6 rounded-2xl border border-[#2A2A1E] hover:border-amber-400/30 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/10 w-fit px-3 py-1 rounded-full font-semibold mb-3 border border-amber-400/20">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <h3 className="text-xl font-bold text-[#F5F0E0] mb-1">{exp.title}</h3>
                    <div className="text-[#9A9A80] font-medium mb-4">{exp.company}</div>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.3 }}
                          className="flex items-start text-[#9A9A80] text-sm"
                        >
                          <motion.span
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                            className="me-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400/60"
                          />
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
