import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { GameChallenge } from "@/components/GameChallenge";
import { Contact } from "@/components/Contact";
import { AiAssistant } from "@/components/AiAssistant";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GameChallenge />
        <Contact />
      </main>
      
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-center">
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Nour Karawani. Chemical Engineering × AI × Automation.
        </p>
      </footer>

      <AiAssistant />
    </div>
  );
}
