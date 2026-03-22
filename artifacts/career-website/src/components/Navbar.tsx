import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SpectrumLogo() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="specFill" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1a0533" />
          <stop offset="100%" stopColor="#0a1a0a" />
        </linearGradient>
        <linearGradient id="specStroke" x1="0" y1="0" x2="40" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="16%" stopColor="#3B82F6" />
          <stop offset="33%" stopColor="#06B6D4" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="67%" stopColor="#EAB308" />
          <stop offset="83%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EF4444" />
        </linearGradient>
        <linearGradient id="specWave" x1="4" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
          <stop offset="20%" stopColor="#3B82F6" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#10B981" stopOpacity="0.8" />
          <stop offset="60%" stopColor="#EAB308" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#F97316" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      <polygon
        points="20,2 37,11 37,29 20,38 3,29 3,11"
        fill="url(#specFill)"
        stroke="url(#specStroke)"
        strokeWidth="1.8"
      />
      <path
        d="M6,23 L9,19 L12,22 L14,17 L17,21 L20,15 L23,20 L26,18 L28,21 L31,16 L34,20"
        stroke="url(#specWave)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x="20"
        y="15"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
        fill="#EAB308"
        letterSpacing="0.5"
      >
        NK
      </text>
    </svg>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Challenge", href: "#challenge" },
    { name: "Contact", href: "#contact" },
  ];

  const isHome = location === "/";

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled || !isHome
          ? "bg-[#0B0B08]/95 backdrop-blur-md border-b border-[#2A2A1E] shadow-lg shadow-black/50 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
          >
            <div className="group-hover:scale-110 transition-transform duration-200 drop-shadow-lg">
              <SpectrumLogo />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-amber-400">Nour</span><span className="text-[#F5F0E0]"> Karawani</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {isHome ? (
              navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-[#9A9A80] hover:text-amber-400 transition-colors"
                >
                  {link.name}
                </a>
              ))
            ) : (
              <Link href="/" className="text-sm font-medium text-[#9A9A80] hover:text-amber-400 transition-colors">
                Back to Portfolio
              </Link>
            )}
            <Link
              href="/messages"
              className="text-sm font-medium text-[#9A9A80] hover:text-amber-400 transition-colors"
            >
              Admin
            </Link>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold rounded-full bg-amber-400 text-[#0B0B08] hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Hire Me
            </a>
          </nav>

          <button
            className="md:hidden p-2 text-[#9A9A80] hover:text-amber-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0B08] border-b border-[#2A2A1E] overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {isHome && navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#9A9A80] hover:text-amber-400 px-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-[#9A9A80] hover:text-amber-400 px-2 transition-colors"
              >
                Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
