import { motion } from "framer-motion";
import { FlaskConical, Code2, Cog, Bot, Rocket, PenTool } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      title: "R&D & Process Engineering",
      icon: FlaskConical,
      skills: ["PFD / P&ID Design", "Mass & Energy Balances", "ChemCAD", "SERS / Raman Analysis", "Water Treatment"]
    },
    {
      title: "Programming & Data",
      icon: Code2,
      skills: ["Python", "SQL / MySQL", "MATLAB", "PCA / PLS / PCR", "Signal Processing"]
    },
    {
      title: "Automation & Industry 4.0",
      icon: Cog,
      skills: ["Siemens / Allen-Bradley PLC", "Ladder Logic / VisiLogic", "Yaskawa / UR Robotics", "Cognex Machine Vision", "Arduino / IIoT"]
    },
    {
      title: "AI & Machine Learning",
      icon: Bot,
      skills: ["Scikit-learn", "Random Forest / SVM / KNN", "GridSearchCV / KFold", "OpenAI API Integration", "Deep Learning"]
    },
    {
      title: "Backend & DevOps",
      icon: Rocket,
      skills: ["FastAPI / REST APIs", "Redis Caching", "Docker / Compose", "Microservices", "GitHub / Vercel CI/CD"]
    },
    {
      title: "Engineering Tools",
      icon: PenTool,
      skills: ["SolidWorks / 3D Printing", "Scientific Writing", "SQLAlchemy / Pydantic", "Streamlit", "Excel Advanced"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Technical Skills</h2>
          <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            A comprehensive toolkit combining chemical engineering, industrial automation, and modern software development.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <category.icon size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-6">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 bg-slate-50 text-slate-700 text-sm font-medium rounded-lg border border-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-colors cursor-default"
                  >
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
