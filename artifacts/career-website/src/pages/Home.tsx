import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { LookingFor } from "@/components/LookingFor";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { GameChallenge } from "@/components/GameChallenge";
import { Contact } from "@/components/Contact";
import { AiAssistant } from "@/components/AiAssistant";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0B0B08]">
      <Navbar />
      <main>
        <Hero />
        <About />
        <LookingFor />
        <Skills />
        <Projects />
        <Experience />
        <GameChallenge />
        <Contact />
      </main>

      <footer className="bg-[#0B0B08] border-t border-[#2A2A1E] py-8 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-px w-24 mx-auto mb-6" style={{ background: 'linear-gradient(90deg, #8B5CF6, #3B82F6, #06B6D4, #10B981, #EAB308, #F97316, #EF4444)' }} />
          <p className="text-[#9A9A80] text-sm">
            © {new Date().getFullYear()} Nour Karawani. Chemical Engineering × AI × Automation.
          </p>
        </div>
      </footer>

      <AiAssistant />
    </div>
  );
}
