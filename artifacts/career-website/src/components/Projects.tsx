import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "RamanSense — Adaptive SERS Algorithm",
      description: "Semi-automated spectroscopy algorithm enabling trace-level detection to 1µM in biological media. SNR <2% via peak detection and pattern recognition. Headed for peer-reviewed publication.",
      image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=500&fit=crop",
      tags: ["Python", "PCA/PLS", "Signal Processing", "SERS"],
      github: "https://github.com/NourKa5",
      live: null,
      categoryLabel: "R&D · Under Review"
    },
    {
      title: "Automated Box-Sorting System",
      description: "Industrial sorting with PLC ladder logic, Yaskawa robotics, laser sensors, and Cognex machine vision. Optimized RPA and pneumatics for energy efficiency.",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=500&fit=crop",
      tags: ["PLC/VisiLogic", "Yaskawa", "Cognex", "SolidWorks"],
      github: null,
      live: "https://www.linkedin.com/feed/update/urn:li:activity:7295779986119008259/",
      categoryLabel: "Automation · Industry 4.0"
    },
    {
      title: "artboxnat — AI Sales Assistant",
      description: "Arabic RTL e-commerce with serverless OpenAI chat assistant. Deployed on Vercel with GitHub CI/CD pipeline.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      tags: ["JavaScript", "OpenAI API", "Vercel", "Arabic RTL"],
      github: "https://github.com/NourKa5/Artboxnat",
      live: null,
      categoryLabel: "Full-Stack · AI"
    },
    {
      title: "ShopAI — AI Shopping Platform",
      description: "Full-stack e-commerce with GPT chat, Redis caching, JWT auth, order management, stock control, and Random Forest churn prediction ML model.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=500&fit=crop",
      tags: ["FastAPI", "MySQL", "Redis", "OpenAI GPT", "Docker"],
      github: "https://github.com/NourKa5",
      live: null,
      categoryLabel: "Full-Stack · AI · Ecom School"
    },
    {
      title: "Polls System — Microservices Backend",
      description: "Two-service platform (User + Poll) with FastAPI, MySQL, Docker. Clean MVC, inter-service HTTP via httpx, analytics, cascade deletions.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
      tags: ["FastAPI", "Microservices", "MySQL", "Docker", "httpx"],
      github: "https://github.com/NourKa5",
      live: null,
      categoryLabel: "Backend · Microservices"
    },
    {
      title: "Supervised Learning — Regression & Classification",
      description: "End-to-end ML: GDP regression (Ridge/Lasso/Polynomial KFold) + churn classification (LR, KNN, SVM, Random Forest, GridSearchCV). Graded 'one of the best seen.'",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      tags: ["Scikit-learn", "GridSearchCV", "KFold CV", "Random Forest", "SVM"],
      github: "https://github.com/NourKa5",
      live: null,
      categoryLabel: "Machine Learning · Top-tier"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Featured Projects</h2>
          <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            A selection of my recent work spanning R&D signal processing, industrial automation, and full-stack software development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:border-teal-200 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                <div className="absolute top-4 left-4 z-20">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold rounded-full shadow-sm">
                    {project.categoryLabel}
                  </span>
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6 flex-grow text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                      <Github size={16} /> Code
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors ml-auto">
                      Demo <ExternalLink size={16} />
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
