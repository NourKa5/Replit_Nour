import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function SpectrumLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="19,2 35,10.5 35,27.5 19,36 3,27.5 3,10.5"
        fill="#141410"
        stroke="#EAB308"
        strokeWidth="1.5"
      />
      <text
        x="19"
        y="24"
        textAnchor="middle"
        fontSize="12"
        fontWeight="700"
        fontFamily="system-ui, sans-serif"
        fill="#EAB308"
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
