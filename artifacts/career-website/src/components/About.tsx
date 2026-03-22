import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, FileText } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-[#0E0E0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0] mb-4">About Me</h2>
          <div className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 relative"
          >
            <div className="relative z-10 w-72 h-96 sm:w-80 sm:h-[420px] mx-auto">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-400/15 to-lime-500/10 blur-2xl -z-10"></div>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-400/20 to-lime-500/10 -z-10"></div>
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#2A2A1E]">
                <img
                  src={`${import.meta.env.BASE_URL}images/avatar.jpg`}
                  alt="Nour Karawani"
                  className="w-full h-full object-cover object-top"
                  style={{ objectPosition: "center 5%" }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold text-[#F5F0E0]">
              Transforming complex problems into elegant solutions.
            </h3>
            <p className="text-lg text-[#9A9A80] leading-relaxed">
              I'm a Chemical Engineering graduate from Ben-Gurion University of the Negev (Energy, Water & Advanced Technologies track). For 2.5 years at Atiko Labs, I developed AI-powered algorithms for Surface-Enhanced Raman Spectroscopy — enabling non-invasive diagnostics headed for peer-reviewed publication.
            </p>
            <p className="text-lg text-[#9A9A80] leading-relaxed">
              Equally at home in the spectrometer lab, on the PLC factory floor, and shipping production Docker containers. My range is unusual: Python signal-processing, Siemens PLC programming, SolidWorks prototyping, FastAPI microservices, and full-stack AI deployment — all from first principles.
            </p>
            <p className="text-lg text-[#9A9A80] leading-relaxed">
              Completing an AI Developer certification and seeking a first full-time role where this hybrid profile creates measurable impact.
            </p>

            <div className="flex flex-wrap gap-2 py-4">
              {["Raman Spectroscopy", "Machine Learning", "PLC Programming", "Python", "FastAPI", "Docker", "Robotics", "MATLAB"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-amber-400/10 text-amber-400 text-sm font-semibold rounded-full border border-amber-400/20">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-4 pt-6 border-t border-[#2A2A1E]">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-amber-400/10 text-amber-400 rounded-lg">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#F5F0E0]">B.Sc. Chemical Engineering</h4>
                  <p className="text-sm text-[#9A9A80]">Ben-Gurion University, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-amber-400/10 text-amber-400 rounded-lg">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#F5F0E0]">GPA: 80.65 / 100</h4>
                  <p className="text-sm text-[#9A9A80]">Energy, Water & Advanced Tech</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-lime-400/10 text-lime-400 rounded-lg">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#F5F0E0]">AI Developer Certification</h4>
                  <p className="text-sm text-[#9A9A80]">Ecom School, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-lime-400/10 text-lime-400 rounded-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#F5F0E0]">1 Research Paper</h4>
                  <p className="text-sm text-[#9A9A80]">Under Peer Review</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
