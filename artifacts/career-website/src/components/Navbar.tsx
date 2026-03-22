import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function HexLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="19,2 35,10.5 35,27.5 19,36 3,27.5 3,10.5"
        fill="url(#hexGrad)"
        stroke="url(#hexStroke)"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient id="hexGrad" x1="3" y1="2" x2="35" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d9488" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="hexStroke" x1="3" y1="2" x2="35" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14b8a6" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <text
        x="19"
        y="24"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="white"
        letterSpacing="-0.5"
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
          ? "bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm py-3"
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
              <HexLogo />
            </div>
            <span className="font-display font-bold text-xl text-slate-900 tracking-tight">
              Nour<span className="text-teal-600"> Karawani</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {isHome ? (
              navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
                >
                  {link.name}
                </a>
              ))
            ) : (
              <Link href="/" className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors">
                Back to Portfolio
              </Link>
            )}
            <Link
              href="/messages"
              className="text-sm font-medium text-slate-600 hover:text-teal-600 transition-colors"
            >
              Admin
            </Link>
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold rounded-full bg-slate-900 text-white hover:bg-teal-600 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600 hover:text-teal-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {isHome && navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-600 hover:text-teal-600 px-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Link
                href="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-600 hover:text-teal-600 px-2 transition-colors"
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
