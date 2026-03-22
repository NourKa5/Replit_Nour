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
    <section id="experience" className="py-24 bg-[#0B0B08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0] mb-4">Experience</h2>
          <div className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#2A2A1E]"></div>

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-amber-400 ring-4 ring-amber-400/20 border-4 border-[#0B0B08] items-center justify-center z-10 text-[#0B0B08]">
                  <Briefcase size={16} />
                </div>

                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30, y: 20 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pl-8' : 'md:pr-8'}`}
                >
                  <div className="bg-[#141410] p-6 rounded-2xl border border-[#2A2A1E] hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-400/5 transition-all">
                    <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/10 w-fit px-3 py-1 rounded-full font-semibold mb-3 border border-amber-400/20">
                      <Calendar size={14} />
                      {exp.period}
                    </div>
                    <h3 className="text-xl font-bold text-[#F5F0E0] mb-1">{exp.title}</h3>
                    <div className="text-[#9A9A80] font-medium mb-4">{exp.company}</div>
                    <ul className="space-y-2">
                      {exp.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start text-[#9A9A80] text-sm">
                          <span className="mr-2 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400/60"></span>
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
