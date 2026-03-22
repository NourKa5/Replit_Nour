import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen, FileText } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-24 bg-[#0E0E0B] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.5 }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0] mb-4">{t("about_title")}</h2>
          <div className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:col-span-5 relative">
            <div className="relative z-10 w-72 h-96 sm:w-80 sm:h-[420px] mx-auto">
              <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-amber-400/15 to-lime-500/10 blur-2xl -z-10"></div>
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-amber-400/20 to-lime-500/10 -z-10"></div>
              <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[#2A2A1E]">
                <img src={`${import.meta.env.BASE_URL}images/avatar.jpg`} alt="Nour Karawani" className="w-full h-full object-cover object-top" style={{ objectPosition: "center 5%" }} />
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:col-span-7 space-y-6">
            <h3 className="text-2xl font-bold text-[#F5F0E0]">{t("about_h3")}</h3>
            <p className="text-lg text-[#9A9A80] leading-relaxed">{t("about_p1")}</p>
            <p className="text-lg text-[#9A9A80] leading-relaxed">{t("about_p2")}</p>
            <p className="text-lg text-[#9A9A80] leading-relaxed">{t("about_p3")}</p>

            <div className="flex flex-wrap gap-2 py-4">
              {["Raman Spectroscopy", "Machine Learning", "PLC Programming", "Python", "FastAPI", "Docker", "Robotics", "MATLAB"].map(tag => (
                <span key={tag} className="px-3 py-1 bg-amber-400/10 text-amber-400 text-sm font-semibold rounded-full border border-amber-400/20">{tag}</span>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-4 pt-6 border-t border-[#2A2A1E]">
              {([
                { icon: GraduationCap, color: "amber", title: "about_edu1", sub: "about_edu1_sub" },
                { icon: Award, color: "amber", title: "about_edu2", sub: "about_edu2_sub" },
                { icon: BookOpen, color: "lime", title: "about_edu3", sub: "about_edu3_sub" },
                { icon: FileText, color: "lime", title: "about_edu4", sub: "about_edu4_sub" },
              ] as const).map(({ icon: Icon, color, title, sub }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className={`mt-1 p-2 rounded-lg ${color === "amber" ? "bg-amber-400/10 text-amber-400" : "bg-lime-400/10 text-lime-400"}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#F5F0E0]">{t(title)}</h4>
                    <p className="text-sm text-[#9A9A80]">{t(sub)}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
