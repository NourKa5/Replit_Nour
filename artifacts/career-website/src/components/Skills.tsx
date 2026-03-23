import { motion } from "framer-motion";
import { FlaskConical, Code2, Cog, Bot, Rocket, PenTool } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Skills() {
  const { t } = useLanguage();

  const skillCategories = [
    {
      titleKey: "skill_cat1" as const,
      icon: FlaskConical,
      color: "amber",
      skills: ["PFD / P&ID Design", "Mass & Energy Balances", "ChemCAD", "SERS / Raman Analysis", "Water Treatment"]
    },
    {
      titleKey: "skill_cat2" as const,
      icon: Code2,
      color: "lime",
      skills: ["Python", "NumPy / Pandas", "Matplotlib / Seaborn", "SQL / MySQL", "MATLAB", "Excel Advanced", "PCA / PLS / PCR", "Signal Processing", "Pattern Recognition"]
    },
    {
      titleKey: "skill_cat3" as const,
      icon: Cog,
      color: "amber",
      skills: ["Siemens / Allen-Bradley PLC", "Ladder Logic / VisiLogic", "Yaskawa / UR Robotics", "Cognex Machine Vision", "Arduino / IIoT"]
    },
    {
      titleKey: "skill_cat4" as const,
      icon: Bot,
      color: "lime",
      skills: ["Scikit-learn", "Random Forest / SVM / KNN", "GridSearchCV / KFold", "TensorFlow / Keras", "NLP / Text Processing", "OpenAI API Integration"]
    },
    {
      titleKey: "skill_cat5" as const,
      icon: Rocket,
      color: "amber",
      skills: ["FastAPI / REST APIs", "Redis Caching", "Docker / Compose", "Microservices", "GitHub / Vercel CI/CD"]
    },
    {
      titleKey: "skill_cat6" as const,
      icon: PenTool,
      color: "lime",
      skills: ["SolidWorks / 3D Printing", "Scientific Writing", "Streamlit", "Visio / ChemCAD"]
    }
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 bg-[#0B0B08] overflow-hidden relative">
      {/* Ambient orb */}
      <motion.div animate={{ y: [0, -40, 0], x: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-0 w-80 h-80 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0]"
            >
              {t("skills_title")}
            </motion.h2>
          </div>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-[#9A9A80] max-w-2xl mx-auto"
          >
            {t("skills_subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } } }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300 } }}
              className="bg-[#141410] rounded-2xl p-8 border border-[#2A2A1E] hover:border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/5 transition-colors duration-300 group"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  category.color === "amber" ? "bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20" : "bg-lime-400/10 text-lime-400 group-hover:bg-lime-400/20"
                } transition-colors`}
              >
                <category.icon size={24} />
              </motion.div>
              <h3 className="text-xl font-bold text-[#F5F0E0] mb-6">{t(category.titleKey)}</h3>
              <motion.div
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
                className="flex flex-wrap gap-2"
              >
                {category.skills.map((skill, j) => (
                  <motion.span
                    key={j}
                    variants={{ hidden: { opacity: 0, scale: 0.8, y: 8 }, visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 200 } } }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    transition={{ duration: 0.15 }}
                    className="px-3 py-1.5 bg-[#1E1E18] text-[#9A9A80] text-sm font-medium rounded-lg border border-[#2A2A1E] hover:bg-amber-400 hover:text-[#0B0B08] hover:border-amber-400 cursor-default select-none"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
