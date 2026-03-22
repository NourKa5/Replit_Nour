import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Background Gradient & Pattern Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white" />
        <div 
          className="absolute inset-0 opacity-100" 
          style={{ backgroundImage: 'radial-gradient(#d1faf3 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
        />
        
        {/* Animated Floating Elements */}
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/60 to-emerald-100/40 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-br from-teal-100/50 to-emerald-200/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 max-w-3xl pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 text-sm font-semibold mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            Available for full-time roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6"
          >
            <span className="block text-slate-900">Nour Karawani</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 text-slate-600">Bridging molecular science</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 mt-1">
              with intelligent systems.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed"
          >
            Chemical Engineering graduate from Ben-Gurion University. 2.5 years R&D at Atiko Labs developing AI-powered SERS/Raman algorithms. Now building full-stack AI systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-teal-600 text-white font-semibold shadow-lg shadow-teal-500/25 hover:bg-teal-500 hover:shadow-xl hover:shadow-teal-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              View Projects
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-slate-700 font-semibold shadow-sm border border-slate-200 hover:bg-teal-50 hover:border-teal-300 hover:-translate-y-1 transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12"
          >
            {[
              { label: "2.5 Yrs R&D", val: "Experience" },
              { label: "7 Projects", val: "Completed" },
              { label: "1 Paper", val: "Under Review" },
              { label: "80+ GPA", val: "BGU Negev" },
            ].map((stat, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                <div className="text-slate-900 font-bold mb-1">{stat.label}</div>
                <div className="text-slate-500 text-xs uppercase tracking-wider">{stat.val}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-4"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Find me on</span>
            <div className="h-px w-8 bg-slate-300" />
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/NourKa5"
                target="_blank"
                rel="noopener noreferrer"
                title="GitHub"
                className="group w-11 h-11 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-black hover:border-black hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/nour-karawani"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
                className="group w-11 h-11 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-[#0A66C2] hover:border-[#0A66C2] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#0A66C2]/30"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:noormich@post.bgu.ac.il"
                title="Email"
                className="group w-11 h-11 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-teal-600 hover:border-teal-600 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-teal-500/30"
              >
                <Mail size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Floating Right Side Panel - JSON Code Card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="hidden lg:block flex-1 w-full max-w-md"
        >
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/10">
            <div className="flex items-center px-4 py-3 bg-slate-950 border-b border-slate-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="ml-4 text-xs font-mono text-slate-400">profile_data.json</div>
            </div>
            <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto">
              <span className="text-slate-400">{`{`}</span><br />
              <div className="pl-4">
                <span className="text-green-400">"name"</span>: <span className="text-amber-300">"Nour Karawani"</span>,<br />
                <span className="text-green-400">"degree"</span>: <span className="text-amber-300">"B.Sc. Chemical Eng."</span>,<br />
                <span className="text-green-400">"university"</span>: <span className="text-amber-300">"BGU Negev"</span>,<br />
                <span className="text-green-400">"gpa"</span>: <span className="text-amber-300">"80.65 / 100"</span>,<br />
                <span className="text-green-400">"location"</span>: <span className="text-amber-300">"Israel"</span>,<br />
                <span className="text-green-400">"open_to"</span>: <span className="text-amber-300">"Global relocation"</span>,<br />
                <span className="text-green-400">"status"</span>: <span className="text-teal-400">"● available"</span>
              </div>
              <span className="text-slate-400">{`}`}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
