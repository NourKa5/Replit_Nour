import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Engineering & Technology Instructor",
      company: "Alrowad for Science and Technology",
      period: "Nov 2025 — Present",
      bullets: [
        "Teaching engineering and technology, elementary through high school",
        "Designing hands-on experiences that build real technical skills"
      ]
    },
    {
      title: "R&D Algorithm Developer & Data Analyst",
      company: "Atiko Labs, Israel",
      period: "Jun 2023 — Nov 2025",
      bullets: [
        "SERS signal processing, pattern recognition, and analytics pipeline in Python",
        "SNR <2% enabling trace-level detection to 1µM in complex media",
        "Applied PCA, PLS, PCR for dimensionality reduction and spectral analysis",
        "Contributed to peer-reviewed publication (under review)"
      ]
    },
    {
      title: "Industry 4.0 Automation Trainee",
      company: "Moona – A Space for Change, Israel",
      period: "Nov 2024 — Feb 2025",
      bullets: [
        "Automated sorting system: PLC, Yaskawa robotics, Cognex machine vision",
        "Optimized pneumatic motion control and RPA; prototyped with SolidWorks"
      ]
    },
    {
      title: "Research Assistant — Water Treatment",
      company: "Jacob Blaustein Institutes for Desert Research",
      period: "Oct 2022 — Jun 2023",
      bullets: [
        "Column experiments with zeolite and membranes for ammonium removal",
        "Optimized adsorption parameters under Prof. Oded Nir"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Experience</h2>
          <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-slate-200"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Center dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary/10 border-4 border-white items-center justify-center z-10 text-primary">
                  <Briefcase size={16} />
                </div>

                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}
                >
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 text-sm text-primary font-semibold mb-2">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{exp.title}</h3>
                    <div className="text-slate-500 font-medium mb-4">{exp.company}</div>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start text-slate-600 text-sm">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary/60"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
