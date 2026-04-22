import { useState, useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, FlaskConical, Network, MapPin, Mail, Linkedin, Award, Activity, Brain, Target, Pause, Play, RotateCcw } from 'lucide-react';

const SCENE_DURATIONS = [6000, 7500, 7500, 7500, 7500, 9500, 7000];

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(performance.now());
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) return;

    startTimeRef.current = performance.now() - progress * SCENE_DURATIONS[currentScene];

    const tick = () => {
      const elapsed = performance.now() - startTimeRef.current;
      const duration = SCENE_DURATIONS[currentScene];
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p >= 1) {
        const next = (currentScene + 1) % SCENE_DURATIONS.length;
        setCurrentScene(next);
        setProgress(0);
        startTimeRef.current = performance.now();
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentScene, isPaused]);

  const handleRestart = () => {
    setCurrentScene(0);
    setProgress(0);
    startTimeRef.current = performance.now();
  };

  return (
    <div className="w-full h-screen bg-[#0B0B08] text-white overflow-hidden relative flex items-center justify-center">
      <div
        className="absolute top-0 left-0 right-0 h-1 z-30"
        style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #10B981, #EAB308, #F97316, #EF4444)' }}
      />
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

      {/* Bottom controls + progress dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30">
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="w-8 h-8 rounded-full bg-[#141410]/80 border border-[#2A2A1E] hover:border-amber-400/40 flex items-center justify-center text-amber-400 transition-colors"
          aria-label={isPaused ? 'Play' : 'Pause'}
        >
          {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
        </button>

        <div className="flex gap-2 items-center">
          {SCENE_DURATIONS.map((_, i) => {
            const isActive = i === currentScene;
            const fill = isActive ? progress : i < currentScene ? 1 : 0;
            return (
              <div
                key={i}
                className="relative h-1.5 rounded-full overflow-hidden bg-[#2A2A1E]"
                style={{ width: isActive ? 32 : 8 }}
              >
                <div
                  className="absolute inset-y-0 left-0 bg-amber-400 rounded-full"
                  style={{ width: `${fill * 100}%` }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="w-8 h-8 rounded-full bg-[#141410]/80 border border-[#2A2A1E] hover:border-amber-400/40 flex items-center justify-center text-amber-400 transition-colors"
          aria-label="Restart"
        >
          <RotateCcw size={12} />
        </button>
      </div>
    </div>
  );
}

function PersistentBackground({ currentScene }: { currentScene: number }) {
  const isEven = currentScene % 2 === 0;
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-[-25%] left-[-15%] w-[60vw] h-[60vw] rounded-full blur-[120px]"
        animate={{ backgroundColor: isEven ? 'rgba(234,179,8,0.08)' : 'rgba(163,230,53,0.07)' }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-25%] right-[-15%] w-[55vw] h-[55vw] rounded-full blur-[120px]"
        animate={{ backgroundColor: isEven ? 'rgba(163,230,53,0.06)' : 'rgba(234,179,8,0.07)' }}
        transition={{ duration: 2.5, ease: 'easeInOut' }}
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#3A3A2E 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}

function Scene0() {
  return (
    <motion.div
      className="z-10 flex flex-col items-center justify-center w-full h-full px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 18, stiffness: 90, delay: 0.15 }}
        className="relative"
      >
        <h1 className="text-[7vw] md:text-[6vw] font-bold tracking-tighter leading-none m-0 text-[#F5F0E0] text-center">
          NOUR KARAWANI
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="mt-8 flex items-center gap-4 text-amber-400 font-mono text-base md:text-xl text-center"
      >
        <Sparkles size={20} />
        <span>Chemical Engineer · Data &amp; AI · Open to Hire</span>
        <Sparkles size={20} />
      </motion.div>
    </motion.div>
  );
}

function Scene1() {
  return (
    <motion.div
      className="z-10 flex flex-col items-center justify-center w-full h-full px-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex w-full items-center justify-center gap-10 md:gap-16 max-w-5xl">
        <motion.div
          className="flex flex-col items-center p-8 md:p-12 bg-[#141410] rounded-3xl border border-[#2A2A1E] w-[300px] md:w-[360px]"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <FlaskConical size={64} className="text-amber-400 mb-5" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-[#F5F0E0]">Chemical Engineer</h2>
          <p className="text-[#9A9A80] font-mono text-sm md:text-base text-center">Matter &amp; Molecules</p>
          <div className="mt-6 font-mono text-xs md:text-sm text-amber-400/70">B.Sc. · BGU · GPA 80.65</div>
        </motion.div>

        <motion.div
          className="text-4xl md:text-5xl font-bold text-lime-400"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5, ease: 'backOut' }}
        >
          +
        </motion.div>

        <motion.div
          className="flex flex-col items-center p-8 md:p-12 bg-[#141410] rounded-3xl border border-[#2A2A1E] w-[300px] md:w-[360px]"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Brain size={64} className="text-lime-400 mb-5" />
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center text-[#F5F0E0]">Data &amp; AI</h2>
          <p className="text-[#9A9A80] font-mono text-sm md:text-base text-center">Python · ML · Models</p>
          <div className="mt-6 font-mono text-xs md:text-sm text-lime-400/70">AI Developer Cert · 2026</div>
        </motion.div>
      </div>
      <motion.div
        className="mt-12 md:mt-16 text-xl md:text-2xl font-light text-[#9A9A80] text-center max-w-3xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        Two disciplines, one engineer — <span className="text-amber-400 font-bold">ready to ship from day one.</span>
      </motion.div>
    </motion.div>
  );
}

function Scene2() {
  // Pre-compute static bar heights once so they don't re-render every frame
  const bars = useMemo(
    () => Array.from({ length: 16 }).map(() => 30 + Math.random() * 60),
    []
  );

  return (
    <motion.div
      className="z-10 flex w-full h-full px-10 md:px-20 items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 pr-6 md:pr-10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1 bg-amber-400 mb-6"
        />
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-[#F5F0E0]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          2.5 Years R&amp;D <br />
          <span className="text-amber-400">@ Atiko Labs</span>
        </motion.h2>
        <ul className="space-y-4 md:space-y-5 text-lg md:text-2xl font-mono text-[#9A9A80]">
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Activity className="text-amber-400 flex-shrink-0" size={24} /> SERS / Raman signal processing
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Network className="text-lime-400 flex-shrink-0" size={24} /> Python · PCA · PLS · PCR
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Award className="text-amber-400 flex-shrink-0" size={24} /> Co-author · paper under review
          </motion.li>
        </ul>
      </div>
      <div className="hidden md:block flex-1 h-[55%] relative">
        <div className="absolute inset-0 flex items-end justify-between px-8 pb-8 border-b-2 border-l-2 border-[#2A2A1E]">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="w-3 bg-gradient-to-t from-amber-500 to-lime-400 rounded-t-sm"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.8, delay: 0.5 + i * 0.04, ease: 'easeOut' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Scene3() {
  const projects = [
    { title: 'RamanSense', tech: 'Python · PCA/PLS · SERS', delay: 0.3, accent: 'amber' },
    { title: 'ShopAI Platform', tech: 'FastAPI · Redis · OpenAI · ML', delay: 0.5, accent: 'lime' },
    { title: 'Box-Sorting System', tech: 'PLC · Yaskawa · Cognex Vision', delay: 0.7, accent: 'amber' },
  ];
  return (
    <motion.div
      className="z-10 flex flex-col items-center justify-center w-full h-full px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="inline-block px-5 py-2 rounded-full border border-amber-400 text-amber-400 font-mono text-base md:text-xl mb-10 md:mb-12"
      >
        8 Projects Built · Lab to Production
      </motion.div>
      <div className="flex gap-5 md:gap-8 px-4 flex-wrap justify-center">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            className={`w-[260px] md:w-[320px] h-[340px] md:h-[400px] rounded-2xl border border-[#2A2A1E] bg-[#141410] p-6 md:p-8 flex flex-col justify-end relative overflow-hidden`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ background: p.accent === 'amber' ? '#EAB308' : '#A3E635' }}
            />
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#F5F0E0]">{p.title}</h3>
            <p className="font-mono text-sm md:text-base text-[#9A9A80]">{p.tech}</p>
            <motion.div
              className="mt-5 h-1 bg-[#2A2A1E] rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: p.delay + 0.4 }}
            >
              <motion.div
                className={p.accent === 'amber' ? 'h-full bg-amber-400' : 'h-full bg-lime-400'}
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ delay: p.delay + 0.5, duration: 0.8 }}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function Scene4() {
  const stats = [
    { label: 'GPA', value: '80.65', detail: '/ 100', delay: 0.2 },
    { label: 'University', value: 'BGU', detail: 'Ben-Gurion Univ.', delay: 0.45 },
    { label: 'AI Cert', value: 'Done', detail: 'Jan 2025 – Mar 2026', delay: 0.7 },
  ];
  return (
    <motion.div
      className="z-10 flex flex-col items-center justify-center w-full h-full px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="grid grid-cols-3 gap-10 md:gap-16 mb-12 md:mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: s.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-sm md:text-lg font-mono text-amber-400 mb-3 uppercase tracking-widest">
              {s.label}
            </div>
            <div className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 text-[#F5F0E0]">
              {s.value}
            </div>
            <div className="text-base md:text-xl text-[#9A9A80] text-center">{s.detail}</div>
          </motion.div>
        ))}
      </div>
      <motion.div
        className="flex items-center gap-3 text-xl md:text-2xl font-bold bg-amber-400/10 px-7 py-4 rounded-full border border-amber-400/30"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        <MapPin className="text-amber-400" size={28} /> Open to Global Relocation
      </motion.div>
    </motion.div>
  );
}

function SceneOpenTo() {
  const dataRoles = [
    'Junior Data Scientist',
    'Junior Machine Learning Engineer',
    'Data Analyst',
    'AI / ML Analyst',
    'AI Engineer / AI Developer',
  ];
  const engRoles = [
    'Chemical Engineer',
    'R&D Process Engineer',
    'Process Engineer',
    'R&D Engineer',
    'V&V Engineer',
    'Application Engineer',
    'GPS Engineer',
    'Industrial Automation Engineer',
    'System / Integration Engineer',
  ];

  return (
    <motion.div
      className="z-10 flex flex-col items-center justify-center w-full h-full px-8 md:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex items-center gap-3 mb-3 px-4 py-2 rounded-full border border-amber-400/40 bg-amber-400/10"
      >
        <Target className="text-amber-400" size={18} />
        <span className="text-amber-400 font-mono text-xs md:text-sm uppercase tracking-widest">
          Looking For — Entry Level
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl md:text-5xl font-bold text-[#F5F0E0] mb-8 md:mb-10 tracking-tight text-center"
      >
        Two Tracks, <span className="text-amber-400">Equally Open.</span>
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-[#141410] border border-lime-400/30 rounded-2xl p-6 md:p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-lime-400" size={24} />
            <h3 className="text-xl md:text-2xl font-bold text-[#F5F0E0]">Data, ML &amp; AI</h3>
          </div>
          <ul className="space-y-2">
            {dataRoles.map((r, i) => (
              <motion.li
                key={r}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + i * 0.12, duration: 0.4 }}
                className="flex items-center gap-3 text-base md:text-lg text-[#F5F0E0] font-mono"
              >
                <span className="text-lime-400">▸</span>
                {r}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-[#141410] border border-amber-400/30 rounded-2xl p-6 md:p-7"
        >
          <div className="flex items-center gap-3 mb-4">
            <FlaskConical className="text-amber-400" size={24} />
            <h3 className="text-xl md:text-2xl font-bold text-[#F5F0E0]">Chemical &amp; Engineering</h3>
          </div>
          <ul className="space-y-2 text-sm md:text-base">
            {engRoles.map((r, i) => (
              <motion.li
                key={r}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.08, duration: 0.4 }}
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
    <motion.div
      className="z-10 flex flex-col items-center justify-center w-full h-full px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold mb-5 text-[#F5F0E0]">Let's Talk.</h2>
        <p className="text-xl md:text-3xl text-[#9A9A80] font-light mb-12 md:mb-16">
          Available immediately · Ready for day one.
        </p>
      </motion.div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-10">
        <motion.div
          className="flex items-center gap-4 bg-[#141410] px-6 md:px-8 py-4 md:py-5 rounded-2xl border border-amber-400/30"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Mail className="text-amber-400 flex-shrink-0" size={28} />
          <span className="text-base md:text-2xl font-mono text-[#F5F0E0]">noormich@post.bgu.ac.il</span>
        </motion.div>
        <motion.div
          className="flex items-center gap-4 bg-[#141410] px-6 md:px-8 py-4 md:py-5 rounded-2xl border border-lime-400/30"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.5 }}
        >
          <Linkedin className="text-lime-400 flex-shrink-0" size={28} />
          <span className="text-base md:text-2xl font-mono text-[#F5F0E0]">nour-karawani</span>
        </motion.div>
      </div>
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#9A9A80] font-mono text-xs md:text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        github.com/NourKa5
      </motion.div>
    </motion.div>
  );
}
