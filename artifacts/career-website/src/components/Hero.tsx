import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-950">
      {/* Background Gradient & Pattern Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/80 to-slate-900" />
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ backgroundImage: 'radial-gradient(#818cf8 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />
        
        {/* Animated Floating Elements */}
        <motion.div 
          animate={{ y: [0, -30, 0], x: [0, 20, 0] }} 
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ y: [0, 40, 0], x: [0, -30, 0] }} 
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 max-w-3xl pt-10 lg:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-semibold mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Available for full-time roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6"
          >
            <span className="block text-slate-200">Nour Karawani</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl mt-2 text-slate-400">Bridging molecular science</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mt-1">
              with intelligent systems.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed"
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
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:bg-indigo-400 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              View Projects
              <ArrowRight size={18} />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-800 text-white font-semibold shadow-sm border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-1 transition-all duration-300"
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
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                <div className="text-white font-bold mb-1">{stat.label}</div>
                <div className="text-slate-400 text-xs uppercase tracking-wider">{stat.val}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex items-center gap-6"
          >
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Connect</p>
            <div className="h-px w-12 bg-slate-700"></div>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: "https://github.com/NourKa5" },
                { icon: Linkedin, href: "https://linkedin.com/in/nour-karawani" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-indigo-400 hover:border-indigo-400 hover:shadow-md transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
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
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden shadow-2xl shadow-indigo-900/20">
            <div className="flex items-center px-4 py-3 bg-slate-900 border-b border-slate-800">
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
                <span className="text-green-400">"status"</span>: <span className="text-indigo-400">"● available"</span>
              </div>
              <span className="text-slate-400">{`}`}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
