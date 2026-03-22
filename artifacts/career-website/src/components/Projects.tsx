import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function Projects() {
  const { t } = useLanguage();

  const projects = [
    {
      titleKey: "proj1_title" as const,
      descKey: "proj1_desc" as const,
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop",
      tags: ["Python", "PCA/PLS", "Signal Processing", "SERS"],
      github: "https://github.com/NourKa5",
      live: null,
      categoryLabel: "R&D · Under Review",
    },
    {
      titleKey: "proj2_title" as const,
      descKey: "proj2_desc" as const,
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
      tags: ["PLC/VisiLogic", "Yaskawa", "Cognex", "SolidWorks"],
      github: null,
      live: "https://www.linkedin.com/feed/update/urn:li:activity:7295779986119008259/",
      categoryLabel: "Automation · Industry 4.0",
    },
    {
      titleKey: "proj3_title" as const,
      descKey: "proj3_desc" as const,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      tags: ["JavaScript", "OpenAI API", "Vercel", "Arabic RTL"],
      github: "https://github.com/NourKa5/Artboxnat",
      live: null,
      categoryLabel: "Full-Stack · AI",
    },
    {
      titleKey: "proj4_title" as const,
      descKey: "proj4_desc" as const,
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
      tags: ["FastAPI", "MySQL", "Redis", "OpenAI GPT", "Docker"],
      github: "https://github.com/NourKa5",
      live: null,
      categoryLabel: "Full-Stack · AI · Ecom School",
    },
    {
      titleKey: "proj5_title" as const,
      descKey: "proj5_desc" as const,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
      tags: ["FastAPI", "Microservices", "MySQL", "Docker", "httpx"],
      github: "https://github.com/NourKa5",
      live: null,
      categoryLabel: "Backend · Microservices",
    },
    {
      titleKey: "proj6_title" as const,
      descKey: "proj6_desc" as const,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      tags: ["Scikit-learn", "GridSearchCV", "KFold CV", "Random Forest", "SVM"],
      github: "https://github.com/NourKa5",
      live: null,
      categoryLabel: "Machine Learning · Top-tier",
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#0E0E0B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0] mb-4">{t("proj_title")}</h2>
          <div className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-[#9A9A80] max-w-2xl mx-auto">{t("proj_subtitle")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-[#141410] rounded-2xl overflow-hidden border border-[#2A2A1E] hover:border-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/5 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                <div className="absolute top-4 start-4 z-20">
                  <span className="px-3 py-1 bg-[#0B0B08]/90 backdrop-blur-sm text-amber-400 text-xs font-bold rounded-full border border-amber-400/20">
                    {project.categoryLabel}
                  </span>
                </div>
                <img src={project.image} alt={t(project.titleKey)}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-80" />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#F5F0E0] mb-2 group-hover:text-amber-400 transition-colors">{t(project.titleKey)}</h3>
                <p className="text-[#9A9A80] mb-6 flex-grow text-sm leading-relaxed">{t(project.descKey)}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-semibold text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-md border border-lime-400/20">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-[#2A2A1E]">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-[#9A9A80] hover:text-[#F5F0E0] transition-colors">
                      <Github size={16} /> {t("proj_code")}
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors ms-auto">
                      {t("proj_demo")} <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
