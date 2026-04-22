import { useState, useEffect, useMemo, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, FlaskConical, MapPin, Mail, Linkedin, Award, Brain, Target, Pause, Play, RotateCcw, Zap } from 'lucide-react';
import ramanImg from './assets/raman-sense.png';
import shopaiImg from './assets/shopai.png';
import boxSortImg from './assets/box-sorting.png';

const SCENE_DURATIONS = [6000, 7500, 8500, 8500, 7500, 9500, 7000];

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
  // Raman spectrum: realistic peak positions (cm^-1 normalized to 0-100 across x)
  // Each peak: { x position %, peak height %, width }
  const peaks = useMemo(
    () => [
      { x: 12, h: 45, w: 2.2, color: '#A3E635' },
      { x: 22, h: 78, w: 1.8, color: '#EAB308' },
      { x: 31, h: 35, w: 2.0, color: '#A3E635' },
      { x: 44, h: 92, w: 1.6, color: '#EAB308' }, // dominant peak
      { x: 52, h: 55, w: 1.9, color: '#A3E635' },
      { x: 63, h: 70, w: 1.7, color: '#EAB308' },
      { x: 74, h: 40, w: 2.1, color: '#A3E635' },
      { x: 85, h: 60, w: 1.8, color: '#EAB308' },
    ],
    []
  );

  // Build spectrum SVG path: baseline + gaussian bumps at peak positions
  const spectrumPath = useMemo(() => {
    const W = 100;
    const H = 100;
    const samples = 200;
    const points: string[] = [];
    for (let i = 0; i <= samples; i++) {
      const x = (i / samples) * W;
      let y = H - 8; // baseline near bottom
      // small noise
      y -= (Math.sin(i * 0.7) + Math.cos(i * 1.3)) * 1.2;
      // peaks (gaussian)
      for (const p of peaks) {
        const d = (x - p.x) / p.w;
        y -= p.h * Math.exp(-d * d * 0.5);
      }
      points.push(`${x.toFixed(2)},${Math.max(2, y).toFixed(2)}`);
    }
    return `M ${points.join(' L ')}`;
  }, [peaks]);

  // Nano-particles (SERS hotspots) at fixed positions
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        cx: 15 + (i * 13) % 70 + (i % 3) * 4,
        cy: 30 + ((i * 17) % 40),
        r: 2 + (i % 3),
        delay: i * 0.08,
      })),
    []
  );

  return (
    <motion.div
      className="z-10 flex w-full h-full px-8 md:px-16 items-center gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* LEFT: copy */}
      <div className="flex-1 max-w-[42%]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '80px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-1 bg-amber-400 mb-5"
        />
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-5 leading-tight text-[#F5F0E0]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          2.5 Years R&amp;D <br />
          <span className="text-amber-400">@ Atiko Labs</span>
        </motion.h2>
        <motion.p
          className="text-sm md:text-base text-[#9A9A80] mb-5 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Building <span className="text-lime-400 font-bold">SERS nano-optic sensors</span> — gold
          nanoparticle substrates that amplify Raman scattering by orders of magnitude.
        </motion.p>
        <ul className="space-y-2.5 text-sm md:text-base font-mono text-[#9A9A80]">
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.95, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Zap className="text-amber-400 flex-shrink-0" size={18} /> Raman / SERS spectral processing
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Brain className="text-lime-400 flex-shrink-0" size={18} /> Python · PCA · PLS · PCR
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.35, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <Award className="text-amber-400 flex-shrink-0" size={18} /> Co-author · paper under review
          </motion.li>
        </ul>
      </div>

      {/* RIGHT: SERS substrate + animated spectrum */}
      <div className="flex-1 h-[80%] relative flex flex-col gap-3">
        {/* Top: SERS nanoparticle substrate with laser */}
        <motion.div
          className="relative h-[42%] rounded-xl border border-[#2A2A1E] bg-gradient-to-br from-[#0F0F0A] to-[#1A1A12] overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="absolute top-2 left-3 text-[10px] font-mono text-amber-400/70 uppercase tracking-widest z-10">
            SERS Substrate · Au nanoparticles
          </div>

          {/* Incoming laser beam (green, top-left → center) */}
          <motion.div
            className="absolute top-0 left-1/4 w-0.5 origin-top z-10"
            style={{
              background: 'linear-gradient(to bottom, transparent, #A3E635, #A3E635)',
              boxShadow: '0 0 8px #A3E635, 0 0 16px #A3E635',
              transform: 'rotate(-20deg)',
            }}
            initial={{ height: 0 }}
            animate={{ height: '60%' }}
            transition={{ delay: 0.7, duration: 0.5 }}
          />

          {/* Outgoing scattered light (amber, center → top-right) */}
          <motion.div
            className="absolute top-0 right-1/4 w-0.5 origin-top z-10"
            style={{
              background: 'linear-gradient(to bottom, transparent, #EAB308)',
              boxShadow: '0 0 6px #EAB308',
              transform: 'rotate(20deg)',
            }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '55%', opacity: [0, 1, 0.7, 1] }}
            transition={{ delay: 1.3, duration: 1.2, opacity: { delay: 1.3, duration: 1.2 } }}
          />

          {/* Nanoparticles (SVG) */}
          <svg viewBox="0 0 100 60" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            {/* substrate base line */}
            <line x1="0" y1="55" x2="100" y2="55" stroke="#2A2A1E" strokeWidth="0.4" />
            {particles.map((p, i) => (
              <g key={i}>
                <motion.circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r * 1.6}
                  fill="#EAB308"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.35, 0.15, 0.35] }}
                  transition={{
                    delay: 0.8 + p.delay,
                    duration: 2.5,
                    times: [0, 0.3, 0.6, 1],
                  }}
                  style={{ filter: 'blur(1.2px)' }}
                />
                <motion.circle
                  cx={p.cx}
                  cy={p.cy}
                  r={p.r}
                  fill="url(#nanoGrad)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + p.delay, duration: 0.4, ease: 'backOut' }}
                />
              </g>
            ))}
            <defs>
              <radialGradient id="nanoGrad">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="60%" stopColor="#D97706" />
                <stop offset="100%" stopColor="#78350F" />
              </radialGradient>
            </defs>
          </svg>

          {/* Hot-spot glow at laser impact point */}
          <motion.div
            className="absolute"
            style={{
              left: 'calc(25% + 22%)',
              top: '52%',
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(234,179,8,0.6) 0%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0.5, 1], scale: [0, 1.4, 1, 1.2] }}
            transition={{ delay: 1.1, duration: 2 }}
          />
        </motion.div>

        {/* Bottom: Raman spectrum */}
        <motion.div
          className="relative flex-1 rounded-xl border border-[#2A2A1E] bg-[#0A0A06] overflow-hidden p-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="absolute top-2 left-3 text-[10px] font-mono text-lime-400/70 uppercase tracking-widest z-10">
            Raman Shift (cm⁻¹) → Intensity
          </div>

          <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
            {/* Grid */}
            {[20, 40, 60, 80].map((y) => (
              <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#1A1A12" strokeWidth="0.2" />
            ))}
            {[20, 40, 60, 80].map((x) => (
              <line key={x} x1={x} y1="0" x2={x} y2="100" stroke="#1A1A12" strokeWidth="0.2" />
            ))}

            {/* Glow underline */}
            <motion.path
              d={spectrumPath}
              fill="none"
              stroke="#EAB308"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={{ delay: 1.5, duration: 2.5, ease: 'easeInOut' }}
              style={{ filter: 'blur(2px)' }}
            />
            {/* Main spectrum line */}
            <motion.path
              d={spectrumPath}
              fill="none"
              stroke="#A3E635"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.5, duration: 2.5, ease: 'easeInOut' }}
            />

            {/* Peak labels (small dots at peaks) */}
            {peaks.map((p, i) => (
              <motion.circle
                key={i}
                cx={p.x}
                cy={92 - p.h}
                r="0.8"
                fill={p.color}
                initial={{ opacity: 0, r: 0 }}
                animate={{ opacity: 1, r: 1.2 }}
                transition={{ delay: 2 + i * 0.15, duration: 0.4 }}
              />
            ))}
          </svg>

          {/* Scanning line */}
          <motion.div
            className="absolute top-0 bottom-0 w-px bg-amber-400/60"
            style={{ boxShadow: '0 0 6px #EAB308' }}
            initial={{ left: '0%', opacity: 0 }}
            animate={{ left: '100%', opacity: [0, 1, 1, 0] }}
            transition={{ delay: 1.5, duration: 2.5, ease: 'linear' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function Scene3() {
  const projects = [
    {
      title: 'RamanSense',
      tech: 'Python · PCA/PLS · SERS',
      img: ramanImg,
      delay: 0.3,
      accent: 'amber' as const,
    },
    {
      title: 'ShopAI Platform',
      tech: 'FastAPI · Redis · OpenAI · ML',
      img: shopaiImg,
      delay: 0.5,
      accent: 'lime' as const,
    },
    {
      title: 'Box-Sorting System',
      tech: 'PLC · Yaskawa · Cognex Vision',
      img: boxSortImg,
      delay: 0.7,
      accent: 'amber' as const,
    },
  ];
  return (
    <motion.div
      className="z-10 flex flex-col items-center justify-center w-full h-full px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="inline-block px-5 py-2 rounded-full border border-amber-400 text-amber-400 font-mono text-sm md:text-lg mb-6 md:mb-8"
      >
        8 Projects Built · Lab to Production
      </motion.div>
      <div className="flex gap-4 md:gap-6 px-2 flex-wrap justify-center">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            className="w-[260px] md:w-[300px] h-[380px] md:h-[440px] rounded-2xl border border-[#2A2A1E] bg-[#141410] flex flex-col relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: p.delay, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Top accent bar */}
            <div
              className="absolute top-0 left-0 right-0 h-1 z-10"
              style={{ background: p.accent === 'amber' ? '#EAB308' : '#A3E635' }}
            />

            {/* Image */}
            <div className="relative h-[55%] overflow-hidden">
              <motion.img
                src={p.img}
                alt={p.title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.4, delay: p.delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Vignette overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(11,11,8,0.1) 0%, rgba(11,11,8,0.3) 60%, rgba(20,20,16,1) 100%)',
                }}
              />
              {/* Color tint */}
              <motion.div
                className="absolute inset-0 mix-blend-overlay pointer-events-none"
                style={{ backgroundColor: p.accent === 'amber' ? '#EAB308' : '#A3E635' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.12 }}
                transition={{ delay: p.delay + 0.3, duration: 0.8 }}
              />
            </div>

            {/* Card body */}
            <div className="flex-1 p-5 md:p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#F5F0E0]">{p.title}</h3>
                <p className="font-mono text-xs md:text-sm text-[#9A9A80]">{p.tech}</p>
              </div>
              <motion.div
                className="mt-4 h-1 bg-[#2A2A1E] rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: p.delay + 0.5 }}
              >
                <motion.div
                  className={p.accent === 'amber' ? 'h-full bg-amber-400' : 'h-full bg-lime-400'}
                  initial={{ width: 0 }}
                  animate={{ width: '70%' }}
                  transition={{ delay: p.delay + 0.6, duration: 0.9 }}
                />
              </motion.div>
            </div>
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
