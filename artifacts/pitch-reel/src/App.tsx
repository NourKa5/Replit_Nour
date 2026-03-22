import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Code, FlaskConical, Network, MapPin, Mail, Github, Linkedin, Award, Activity } from 'lucide-react';

const SCENE_DURATIONS = [4000, 5000, 5000, 5000, 6000, 5000];

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let isRunning = true;
    let sceneIndex = 0;

    const playLoop = () => {
      if (!isRunning) return;
      const duration = SCENE_DURATIONS[sceneIndex];
      timeout = setTimeout(() => {
        sceneIndex = (sceneIndex + 1) % SCENE_DURATIONS.length;
        setCurrentScene(sceneIndex);
        playLoop();
      }, duration);
    };

    playLoop();
    return () => {
      isRunning = false;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-[#0f172a] text-white overflow-hidden relative flex items-center justify-center">
      <PersistentBackground currentScene={currentScene} />
      
      <AnimatePresence mode="wait">
        {currentScene === 0 && <Scene0 key="scene0" />}
        {currentScene === 1 && <Scene1 key="scene1" />}
        {currentScene === 2 && <Scene2 key="scene2" />}
        {currentScene === 3 && <Scene3 key="scene3" />}
        {currentScene === 4 && <Scene4 key="scene4" />}
        {currentScene === 5 && <Scene5 key="scene5" />}
      </AnimatePresence>
    </div>
  );
}

function PersistentBackground({ currentScene }: { currentScene: number }) {
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-20"
        animate={{
          backgroundColor: currentScene % 2 === 0 ? '#0d9488' : '#10b981',
          scale: currentScene === 5 ? 1.5 : 1,
          x: currentScene === 1 ? '30vw' : currentScene === 3 ? '-20vw' : '0vw',
          y: currentScene === 2 ? '20vh' : '0vh'
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] opacity-20"
        animate={{
          backgroundColor: currentScene % 2 === 1 ? '#0d9488' : '#10b981',
          scale: currentScene === 0 ? 1.2 : 1,
          x: currentScene === 2 ? '-40vw' : currentScene === 4 ? '10vw' : '0vw',
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#0d9488 1px, transparent 1px), linear-gradient(90deg, #0d9488 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white opacity-20"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [`${p.y}%`, `${p.y - 10}%`, `${p.y}%`],
            x: [`${p.x}%`, `${p.x + (Math.random() * 5 - 2.5)}%`, `${p.x}%`],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function Scene0() {
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }} transition={{ duration: 0.8 }}>
      <motion.div initial={{ scale: 0.5, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 0.2 }} className="relative">
        <h1 className="text-[8vw] font-bold tracking-tighter leading-none m-0 glitch-text" data-text="NOUR KARAWANI">NOUR KARAWANI</h1>
        <motion.div className="absolute -inset-10 border border-[#0d9488]/30 rounded-full" initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 0] }} transition={{ duration: 2, ease: "easeOut", delay: 0.5 }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-6 flex items-center space-x-4 text-[#10b981] font-mono text-xl">
        <Sparkles size={24} />
        <span>BGU Chemical Engineering → Full-Stack AI</span>
        <Sparkles size={24} />
      </motion.div>
    </motion.div>
  );
}

function Scene1() {
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full px-20" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.8, ease: "circOut" }}>
      <div className="flex w-full items-center justify-center gap-16">
        <motion.div className="flex flex-col items-center p-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md w-[400px]" initial={{ scale: 0.8, rotateY: 90, opacity: 0 }} animate={{ scale: 1, rotateY: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3, type: 'spring' }}>
          <FlaskConical size={80} className="text-[#0d9488] mb-6" />
          <h2 className="text-3xl font-bold mb-2 text-center">Chemical Engineer</h2>
          <p className="text-white/60 font-mono text-center">Matter &amp; Molecules</p>
          <div className="mt-8 font-mono text-sm text-[#0d9488]/70">C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O</div>
        </motion.div>
        <motion.div className="text-5xl font-bold text-[#10b981]" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, type: 'spring' }}>×</motion.div>
        <motion.div className="flex flex-col items-center p-12 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md w-[400px]" initial={{ scale: 0.8, rotateY: -90, opacity: 0 }} animate={{ scale: 1, rotateY: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.6, type: 'spring' }}>
          <Code size={80} className="text-[#10b981] mb-6" />
          <h2 className="text-3xl font-bold mb-2 text-center">AI Developer</h2>
          <p className="text-white/60 font-mono text-center">Logic &amp; Systems</p>
          <div className="mt-8 font-mono text-sm text-[#10b981]/70">def optimize(system): return AI()</div>
        </motion.div>
      </div>
      <motion.div className="mt-16 text-3xl font-light text-white/80" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
        Bridging the physical world with <span className="text-[#0d9488] font-bold">intelligent code.</span>
      </motion.div>
    </motion.div>
  );
}

function Scene2() {
  return (
    <motion.div className="z-10 flex w-full h-full px-20 items-center" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.8 }}>
      <div className="flex-1 pr-10">
        <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} transition={{ duration: 0.5, delay: 0.2 }} className="h-1 bg-[#10b981] mb-8" />
        <motion.h2 className="text-6xl font-bold mb-6 leading-tight" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          2.5 Years R&amp;D <br /><span className="text-[#0d9488]">@ Atiko Labs</span>
        </motion.h2>
        <motion.ul className="space-y-6 text-2xl font-mono text-white/80">
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="flex items-center gap-4"><Activity className="text-[#10b981]" /> AI-powered SERS/Raman spectroscopy</motion.li>
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }} className="flex items-center gap-4"><Network className="text-[#10b981]" /> Advanced data analysis &amp; models</motion.li>
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }} className="flex items-center gap-4"><Award className="text-[#10b981]" /> Cross-disciplinary problem solving</motion.li>
        </motion.ul>
      </div>
      <div className="flex-1 h-[60%] relative">
        <div className="absolute inset-0 flex items-end justify-between px-10 pb-10 border-b-2 border-l-2 border-white/20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div key={i} className="w-4 bg-gradient-to-t from-[#0d9488] to-[#10b981] rounded-t-sm" initial={{ height: 0 }} animate={{ height: [`${Math.random() * 30 + 10}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 50 + 20}%`] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', delay: i * 0.05 }} />
          ))}
          <motion.div className="absolute -left-2 top-0 bottom-0 w-1 bg-white/50" initial={{ top: '100%' }} animate={{ top: '0%' }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }} />
        </div>
      </div>
    </motion.div>
  );
}

function Scene3() {
  const projects = [
    { title: "AI Image Gen UI", tech: "React + Fastify + AI", delay: 0.4, color: "from-[#0d9488]/40 to-transparent" },
    { title: "Spectra Analyzer", tech: "Python + Pandas", delay: 0.6, color: "from-[#10b981]/40 to-transparent" },
    { title: "Full-Stack Dashboard", tech: "Next.js + Postgres", delay: 0.8, color: "from-blue-500/40 to-transparent" }
  ];
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full" initial={{ opacity: 0, rotateX: -90 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.8 }} style={{ perspective: 1000 }}>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block px-6 py-2 rounded-full border border-[#0d9488] text-[#0d9488] font-mono text-xl mb-12">7 Projects Built</motion.div>
      <div className="flex gap-8 px-10">
        {projects.map((p, i) => (
          <motion.div key={i} className={`w-[350px] h-[450px] rounded-2xl border border-white/20 bg-gradient-to-br ${p.color} p-8 flex flex-col justify-end relative overflow-hidden backdrop-blur-md`} initial={{ opacity: 0, y: 100, rotateY: 30 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 0.8, delay: p.delay, type: 'spring' }}>
            <div className="absolute top-0 right-0 p-6 opacity-30"><Github size={40} /></div>
            <h3 className="text-3xl font-bold mb-4">{p.title}</h3>
            <p className="font-mono text-white/60">{p.tech}</p>
            <motion.div className="mt-6 h-1 bg-white/30 rounded-full overflow-hidden" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: p.delay + 0.5, duration: 1 }}><div className="h-full bg-white w-2/3" /></motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Scene4() {
  const stats = [
    { label: "GPA", value: "80.65", detail: "/ 100", delay: 0.2 },
    { label: "University", value: "BGU", detail: "Ben-Gurion Univ.", delay: 0.5 },
    { label: "Certification", value: "AI Dev", detail: "Full-Stack", delay: 0.8 },
  ];
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full" initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }} animate={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }} exit={{ opacity: 0, filter: "blur(20px)" }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
      <div className="grid grid-cols-3 gap-16 mb-20">
        {stats.map((s, i) => (
          <motion.div key={i} className="flex flex-col items-center" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: s.delay, type: 'spring', bounce: 0.5 }}>
            <div className="text-xl font-mono text-[#10b981] mb-4 uppercase tracking-widest">{s.label}</div>
            <div className="text-8xl font-bold tracking-tighter mb-2">{s.value}</div>
            <div className="text-2xl text-white/50">{s.detail}</div>
          </motion.div>
        ))}
      </div>
      <motion.div className="flex items-center gap-4 text-3xl font-bold bg-[#0d9488]/20 px-10 py-6 rounded-full border border-[#0d9488]" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, type: 'spring' }}>
        <MapPin className="text-[#10b981]" size={36} /> Open to Global Relocation
      </motion.div>
    </motion.div>
  );
}

function Scene5() {
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-transparent via-[#0f172a]/80 to-[#0d9488]/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 1, type: "spring" }} className="text-center">
        <h2 className="text-7xl font-bold mb-6">Ready to Hire?</h2>
        <p className="text-3xl text-white/70 font-light mb-16">Exceptional talent, ready for day one.</p>
      </motion.div>
      <div className="flex gap-12">
        <motion.div className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors px-8 py-5 rounded-2xl border border-white/20 backdrop-blur-md" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <Mail className="text-[#0d9488]" size={32} />
          <span className="text-2xl font-mono">noormich@post.bgu.ac.il</span>
        </motion.div>
        <motion.div className="flex items-center gap-4 bg-white/10 hover:bg-white/20 transition-colors px-8 py-5 rounded-2xl border border-white/20 backdrop-blur-md" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
          <Linkedin className="text-[#0d9488]" size={32} />
          <span className="text-2xl font-mono">nour-karawani</span>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 font-mono text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        github.com/NourKa5
      </motion.div>
    </motion.div>
  );
}
