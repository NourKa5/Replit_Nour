import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, FlaskConical, Network, MapPin, Mail, Github, Linkedin, Award, Activity, Brain, Target } from 'lucide-react';

const SCENE_DURATIONS = [4000, 5000, 5000, 5000, 5000, 6500, 5500];

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
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
    <div className="w-full h-screen bg-[#0B0B08] text-white overflow-hidden relative flex items-center justify-center">
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #10B981, #EAB308, #F97316, #EF4444)' }} />
      <PersistentBackground currentScene={currentScene} />

      <AnimatePresence mode="wait">
        {currentScene === 0 && <Scene0 key="scene0" />}
        {currentScene === 1 && <Scene1 key="scene1" />}
        {currentScene === 2 && <Scene2 key="scene2" />}
        {currentScene === 3 && <Scene3 key="scene3" />}
        {currentScene === 4 && <Scene4 key="scene4" />}
        {currentScene === 5 && <SceneOpenTo key="sceneOpenTo" />}
        {currentScene === 6 && <Scene5 key="scene5" />}
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SCENE_DURATIONS.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full transition-all"
            animate={{
              width: i === currentScene ? 24 : 6,
              backgroundColor: i === currentScene ? '#EAB308' : '#2A2A1E',
              height: 6,
            }}
          />
        ))}
      </div>
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
        className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full blur-[120px] opacity-15"
        animate={{
          backgroundColor: currentScene % 2 === 0 ? '#EAB308' : '#A3E635',
          scale: currentScene === 6 ? 1.5 : 1,
          x: currentScene === 1 ? '30vw' : currentScene === 3 ? '-20vw' : '0vw',
          y: currentScene === 2 ? '20vh' : '0vh'
        }}
        transition={{ duration: 3, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[100px] opacity-10"
        animate={{
          backgroundColor: currentScene % 2 === 1 ? '#EAB308' : '#A3E635',
          scale: currentScene === 0 ? 1.2 : 1,
          x: currentScene === 2 ? '-40vw' : currentScene === 4 ? '10vw' : '0vw',
        }}
        transition={{ duration: 4, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2A2A1E 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-amber-400 opacity-10"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [`${p.y}%`, `${p.y - 10}%`, `${p.y}%`],
            opacity: [0.05, 0.2, 0.05]
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
        <h1 className="text-[8vw] font-bold tracking-tighter leading-none m-0 text-[#F5F0E0]">NOUR KARAWANI</h1>
        <motion.div className="absolute -inset-10 border border-amber-400/20 rounded-full" initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.5, 2], opacity: [0, 1, 0] }} transition={{ duration: 2, ease: "easeOut", delay: 0.5 }} />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-6 flex items-center space-x-4 text-amber-400 font-mono text-xl">
        <Sparkles size={24} />
        <span>Chemical Engineer · Data &amp; AI · Open to Hire</span>
        <Sparkles size={24} />
      </motion.div>
    </motion.div>
  );
}

function Scene1() {
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full px-20" initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, y: -100 }} transition={{ duration: 0.8, ease: "circOut" }}>
      <div className="flex w-full items-center justify-center gap-16">
        <motion.div className="flex flex-col items-center p-12 bg-[#141410] rounded-3xl border border-[#2A2A1E] w-[400px]" initial={{ scale: 0.8, rotateY: 90, opacity: 0 }} animate={{ scale: 1, rotateY: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.3, type: 'spring' }}>
          <FlaskConical size={80} className="text-amber-400 mb-6" />
          <h2 className="text-3xl font-bold mb-2 text-center text-[#F5F0E0]">Chemical Engineer</h2>
          <p className="text-[#9A9A80] font-mono text-center">Matter &amp; Molecules</p>
          <div className="mt-8 font-mono text-sm text-amber-400/70">B.Sc. · BGU · GPA 80.65</div>
        </motion.div>
        <motion.div className="text-5xl font-bold text-lime-400" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, type: 'spring' }}>+</motion.div>
        <motion.div className="flex flex-col items-center p-12 bg-[#141410] rounded-3xl border border-[#2A2A1E] w-[400px]" initial={{ scale: 0.8, rotateY: -90, opacity: 0 }} animate={{ scale: 1, rotateY: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.6, type: 'spring' }}>
          <Brain size={80} className="text-lime-400 mb-6" />
          <h2 className="text-3xl font-bold mb-2 text-center text-[#F5F0E0]">Data &amp; AI</h2>
          <p className="text-[#9A9A80] font-mono text-center">Python · ML · Models</p>
          <div className="mt-8 font-mono text-sm text-lime-400/70">AI Developer Cert · 2026</div>
        </motion.div>
      </div>
      <motion.div className="mt-16 text-3xl font-light text-[#9A9A80] text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
        Two disciplines, one engineer — <span className="text-amber-400 font-bold">ready to ship from day one.</span>
      </motion.div>
    </motion.div>
  );
}

function Scene2() {
  return (
    <motion.div className="z-10 flex w-full h-full px-20 items-center" initial={{ opacity: 0, scale: 1.2 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, x: 100 }} transition={{ duration: 0.8 }}>
      <div className="flex-1 pr-10">
        <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} transition={{ duration: 0.5, delay: 0.2 }} className="h-1 bg-amber-400 mb-8" />
        <motion.h2 className="text-6xl font-bold mb-6 leading-tight text-[#F5F0E0]" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          2.5 Years R&amp;D <br /><span className="text-amber-400">@ Atiko Labs</span>
        </motion.h2>
        <motion.ul className="space-y-6 text-2xl font-mono text-[#9A9A80]">
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="flex items-center gap-4"><Activity className="text-amber-400" /> SERS / Raman signal processing</motion.li>
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.3 }} className="flex items-center gap-4"><Network className="text-lime-400" /> Python · PCA · PLS · PCR</motion.li>
          <motion.li initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }} className="flex items-center gap-4"><Award className="text-amber-400" /> Co-author · paper under review</motion.li>
        </motion.ul>
      </div>
      <div className="flex-1 h-[60%] relative">
        <div className="absolute inset-0 flex items-end justify-between px-10 pb-10 border-b-2 border-l-2 border-[#2A2A1E]">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div key={i} className="w-4 bg-gradient-to-t from-amber-500 to-lime-400 rounded-t-sm" initial={{ height: 0 }} animate={{ height: [`${Math.random() * 30 + 10}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 50 + 20}%`] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', delay: i * 0.05 }} />
          ))}
          <motion.div className="absolute -left-2 top-0 bottom-0 w-1 bg-amber-400/50" initial={{ top: '100%' }} animate={{ top: '0%' }} transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror' }} />
        </div>
      </div>
    </motion.div>
  );
}

function Scene3() {
  const projects = [
    { title: "RamanSense", tech: "Python · PCA/PLS · SERS", delay: 0.4, color: "from-amber-500/20 to-transparent" },
    { title: "ShopAI Platform", tech: "FastAPI · Redis · OpenAI · ML", delay: 0.6, color: "from-lime-500/20 to-transparent" },
    { title: "Box-Sorting System", tech: "PLC · Yaskawa · Cognex Vision", delay: 0.8, color: "from-amber-400/20 to-transparent" }
  ];
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full" initial={{ opacity: 0, rotateX: -90 }} animate={{ opacity: 1, rotateX: 0 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.8 }} style={{ perspective: 1000 }}>
      <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-block px-6 py-2 rounded-full border border-amber-400 text-amber-400 font-mono text-xl mb-12">8 Projects Built · Lab to Production</motion.div>
      <div className="flex gap-8 px-10">
        {projects.map((p, i) => (
          <motion.div key={i} className={`w-[350px] h-[450px] rounded-2xl border border-[#2A2A1E] bg-gradient-to-br ${p.color} p-8 flex flex-col justify-end relative overflow-hidden backdrop-blur-md`} initial={{ opacity: 0, y: 100, rotateY: 30 }} animate={{ opacity: 1, y: 0, rotateY: 0 }} transition={{ duration: 0.8, delay: p.delay, type: 'spring' }}>
            <div className="absolute top-0 right-0 p-6 opacity-20"><Github size={40} /></div>
            <h3 className="text-3xl font-bold mb-4 text-[#F5F0E0]">{p.title}</h3>
            <p className="font-mono text-[#9A9A80]">{p.tech}</p>
            <motion.div className="mt-6 h-1 bg-[#2A2A1E] rounded-full overflow-hidden" initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: p.delay + 0.5, duration: 1 }}><div className="h-full bg-amber-400 w-2/3" /></motion.div>
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
    { label: "AI Cert", value: "Done", detail: "Jan 2025 – Mar 2026", delay: 0.8 },
  ];
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full" initial={{ opacity: 0, clipPath: "circle(0% at 50% 50%)" }} animate={{ opacity: 1, clipPath: "circle(150% at 50% 50%)" }} exit={{ opacity: 0, filter: "blur(20px)" }} transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}>
      <div className="grid grid-cols-3 gap-16 mb-20">
        {stats.map((s, i) => (
          <motion.div key={i} className="flex flex-col items-center" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: s.delay, type: 'spring', bounce: 0.5 }}>
            <div className="text-xl font-mono text-amber-400 mb-4 uppercase tracking-widest">{s.label}</div>
            <div className="text-8xl font-bold tracking-tighter mb-2 text-[#F5F0E0]">{s.value}</div>
            <div className="text-2xl text-[#9A9A80] text-center">{s.detail}</div>
          </motion.div>
        ))}
      </div>
      <motion.div className="flex items-center gap-4 text-3xl font-bold bg-amber-400/10 px-10 py-6 rounded-full border border-amber-400/30" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, type: 'spring' }}>
        <MapPin className="text-amber-400" size={36} /> Open to Global Relocation
      </motion.div>
    </motion.div>
  );
}

function SceneOpenTo() {
  const dataRoles = [
    "Junior Data Scientist",
    "Junior Machine Learning Engineer",
    "Data Analyst",
    "AI / ML Analyst",
    "AI Engineer / AI Developer",
  ];
  const engRoles = [
    "Chemical Engineer",
    "R&D Process Engineer",
    "Process Engineer",
    "R&D Engineer",
    "V&V Engineer",
    "Application Engineer",
    "GPS (Global Product Support) Engineer",
    "Industrial Automation Engineer",
    "System / Integration Engineer",
  ];

  return (
    <motion.div
      className="z-10 flex flex-col items-center justify-center w-full h-full px-16"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60, filter: "blur(8px)" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex items-center gap-3 mb-3 px-5 py-2 rounded-full border border-amber-400/40 bg-amber-400/10"
      >
        <Target className="text-amber-400" size={20} />
        <span className="text-amber-400 font-mono text-sm uppercase tracking-widest">Looking For — Entry-Level</span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-5xl font-bold text-[#F5F0E0] mb-10 tracking-tight text-center"
      >
        Two Tracks, <span className="text-amber-400">Equally Open.</span>
      </motion.h2>

      <div className="grid grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Data / ML / AI */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-[#141410] border border-lime-400/30 rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <Brain className="text-lime-400" size={28} />
            <h3 className="text-2xl font-bold text-[#F5F0E0]">Data, ML & AI</h3>
          </div>
          <ul className="space-y-2.5">
            {dataRoles.map((r, i) => (
              <motion.li
                key={r}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.08, duration: 0.4 }}
                className="flex items-center gap-3 text-lg text-[#F5F0E0] font-mono"
              >
                <span className="text-lime-400">▸</span>
                {r}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Chemical / Engineering */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-[#141410] border border-amber-400/30 rounded-2xl p-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <FlaskConical className="text-amber-400" size={28} />
            <h3 className="text-2xl font-bold text-[#F5F0E0]">Chemical & Engineering</h3>
          </div>
          <ul className="space-y-2 text-base">
            {engRoles.map((r, i) => (
              <motion.li
                key={r}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.05, duration: 0.4 }}
                className="flex items-center gap-3 text-[#F5F0E0] font-mono"
              >
                <span className="text-amber-400">▸</span>
                {r}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Scene5() {
  return (
    <motion.div className="z-10 flex flex-col items-center justify-center w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, duration: 1, type: "spring" }} className="text-center">
        <h2 className="text-7xl font-bold mb-6 text-[#F5F0E0]">Let's Talk.</h2>
        <p className="text-3xl text-[#9A9A80] font-light mb-16">Available immediately · Ready for day one.</p>
      </motion.div>
      <div className="flex gap-12">
        <motion.div className="flex items-center gap-4 bg-[#141410] px-8 py-5 rounded-2xl border border-amber-400/20" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          <Mail className="text-amber-400" size={32} />
          <span className="text-2xl font-mono text-[#F5F0E0]">noormich@post.bgu.ac.il</span>
        </motion.div>
        <motion.div className="flex items-center gap-4 bg-[#141410] px-8 py-5 rounded-2xl border border-lime-400/20" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}>
          <Linkedin className="text-lime-400" size={32} />
          <span className="text-2xl font-mono text-[#F5F0E0]">nour-karawani</span>
        </motion.div>
      </div>
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#9A9A80] font-mono text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
        github.com/NourKa5
      </motion.div>
    </motion.div>
  );
}
