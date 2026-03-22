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
      skills: ["Python", "SQL / MySQL", "MATLAB", "Excel Advanced", "PCA / PLS / PCR", "Signal Processing"]
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
      skills: ["Scikit-learn", "Random Forest / SVM / KNN", "GridSearchCV / KFold", "OpenAI API Integration", "Deep Learning"]
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
      skills: ["SolidWorks / 3D Printing", "Scientific Writing", "SQLAlchemy / Pydantic", "Streamlit", "Visio / ChemCAD"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-[#0B0B08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0] mb-4">{t("skills_title")}</h2>
          <div className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-[#9A9A80] max-w-2xl mx-auto">{t("skills_subtitle")}</p>
        </motion.div>

        <motion.div
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, i) => (
            <motion.div key={i}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } } }}
              className="bg-[#141410] rounded-2xl p-8 border border-[#2A2A1E] hover:border-amber-400/30 hover:shadow-xl hover:shadow-amber-400/5 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                category.color === "amber" ? "bg-amber-400/10 text-amber-400 group-hover:bg-amber-400/20" : "bg-lime-400/10 text-lime-400 group-hover:bg-lime-400/20"
              } transition-colors`}>
                <category.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#F5F0E0] mb-6">{t(category.titleKey)}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <span key={j} className="px-3 py-1.5 bg-[#1E1E18] text-[#9A9A80] text-sm font-medium rounded-lg border border-[#2A2A1E] hover:bg-amber-400 hover:text-[#0B0B08] hover:border-amber-400 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
