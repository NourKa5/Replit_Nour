import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      
      <footer className="bg-slate-950 border-t border-white/10 py-8 text-center">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} AlexDev. Designed and built with React & Tailwind.
        </p>
      </footer>
    </div>
  );
}
