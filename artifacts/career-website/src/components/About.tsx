import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, FileText } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">About Me</h2>
          <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 relative"
          >
            <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-primary/20 scale-[1.15] animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-0 rounded-full border border-indigo-400/30 scale-[1.3] animate-[spin_15s_linear_infinite_reverse]"></div>
              
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 shadow-2xl flex items-center justify-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
                <span className="text-7xl sm:text-8xl font-display font-bold tracking-tighter shadow-sm z-10">NK</span>
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
            <h3 className="text-2xl font-bold text-slate-800">
              Transforming complex problems into elegant solutions.
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              I'm a Chemical Engineering graduate from Ben-Gurion University of the Negev (Energy, Water & Advanced Technologies track). For 2.5 years at Atiko Labs, I developed AI-powered algorithms for Surface-Enhanced Raman Spectroscopy — enabling non-invasive diagnostics headed for peer-reviewed publication.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Equally at home in the spectrometer lab, on the PLC factory floor, and shipping production Docker containers. My range is unusual: Python signal-processing, Siemens PLC programming, SolidWorks prototyping, FastAPI microservices, and full-stack AI deployment — all from first principles.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Completing an AI Developer certification and seeking a first full-time role where this hybrid profile creates measurable impact.
            </p>

            <div className="flex flex-wrap gap-2 py-4">
              {["Raman Spectroscopy", "Machine Learning", "PLC Programming", "Python", "FastAPI", "Docker", "Robotics", "MATLAB"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-100">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-4 pt-6 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-primary/10 text-primary rounded-lg">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">B.Sc. Chemical Engineering</h4>
                  <p className="text-sm text-slate-500">Ben-Gurion University, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-primary/10 text-primary rounded-lg">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">GPA: 80.65 / 100</h4>
                  <p className="text-sm text-slate-500">Energy, Water & Advanced Tech</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-primary/10 text-primary rounded-lg">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">AI Developer Certification</h4>
                  <p className="text-sm text-slate-500">Ecom School, 2026</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-primary/10 text-primary rounded-lg">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">1 Research Paper</h4>
                  <p className="text-sm text-slate-500">Under Peer Review</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
