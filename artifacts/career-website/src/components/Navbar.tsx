import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Lang } from "@/lib/i18n";

function SpectrumLogo() {
  return (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="19,2 35,10.5 35,27.5 19,36 3,27.5 3,10.5" fill="#141410" stroke="#EAB308" strokeWidth="1.5" />
      <text x="19" y="24" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif" fill="#EAB308" letterSpacing="-0.5">NK</text>
    </svg>
  );
}

const LANG_OPTIONS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "EN", flag: "🇬🇧" },
  { code: "ar", label: "AR", flag: "🇸🇦" },
  { code: "he", label: "HE", flag: "🇮🇱" },
];

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = LANG_OPTIONS.find((o) => o.code === lang)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#141410] border border-[#2A2A1E] text-[#9A9A80] hover:border-amber-400/40 hover:text-amber-400 transition-all text-xs font-semibold"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="text-[10px] opacity-50">▾</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 end-0 bg-[#141410] border border-[#2A2A1E] rounded-xl overflow-hidden shadow-xl shadow-black/50 min-w-[90px] z-50"
          >
            {LANG_OPTIONS.map((opt) => (
              <button
                key={opt.code}
                onClick={() => { setLang(opt.code); setOpen(false); }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors ${
                  lang === opt.code
                    ? "bg-amber-400/10 text-amber-400"
                    : "text-[#9A9A80] hover:bg-[#1E1E18] hover:text-[#F5F0E0]"
                }`}
              >
                <span>{opt.flag}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { key: "nav_about" as const, href: "#about" },
    { key: "nav_skills" as const, href: "#skills" },
    { key: "nav_projects" as const, href: "#projects" },
    { key: "nav_experience" as const, href: "#experience" },
    { key: "nav_challenge" as const, href: "#challenge" },
    { key: "nav_contact" as const, href: "#contact" },
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
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="group-hover:scale-110 transition-transform duration-200 drop-shadow-lg">
              <SpectrumLogo />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              <span className="text-amber-400">Nour</span><span className="text-[#F5F0E0]"> Karawani</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {isHome ? (
              navLinks.map((link) => (
                <a key={link.key} href={link.href} className="text-sm font-medium text-[#9A9A80] hover:text-amber-400 transition-colors">
                  {t(link.key)}
                </a>
              ))
            ) : (
              <Link href="/" className="text-sm font-medium text-[#9A9A80] hover:text-amber-400 transition-colors">
                {t("nav_back")}
              </Link>
            )}
            <Link href="/messages" className="text-sm font-medium text-[#9A9A80] hover:text-amber-400 transition-colors">
              {t("nav_admin")}
            </Link>
            <LanguageSwitcher />
            <a
              href="#contact"
              className="px-5 py-2.5 text-sm font-semibold rounded-full bg-amber-400 text-[#0B0B08] hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("nav_hire")}
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-3">
            <LanguageSwitcher />
            <button className="p-2 text-[#9A9A80] hover:text-amber-400 transition-colors" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
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
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#9A9A80] hover:text-amber-400 px-2 transition-colors"
                >
                  {t(link.key)}
                </a>
              ))}
              <Link href="/messages" onClick={() => setMobileMenuOpen(false)} className="text-base font-medium text-[#9A9A80] hover:text-amber-400 px-2 transition-colors">
                {t("nav_admin")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
