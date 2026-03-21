import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">About Me</h2>
          <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-100 aspect-square max-w-md mx-auto">
              <img
                src={`${import.meta.env.BASE_URL}images/avatar.png`}
                alt="Alex Avatar"
                className="w-full h-full object-cover bg-slate-50"
              />
            </div>
            {/* Decorative blob behind image */}
            <div className="absolute -inset-4 -z-10 bg-gradient-to-br from-primary/20 to-accent rounded-[3rem] blur-2xl opacity-70"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 space-y-6"
          >
            <h3 className="text-2xl font-bold text-slate-800">
              Transforming complex problems into elegant solutions.
            </h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              I'm a recent Computer Science graduate with a relentless curiosity for how things work. During my academic journey, I've cultivated a deep understanding of modern web technologies, systems architecture, and agile development methodologies.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              When I'm not writing code or debugging, you can find me contributing to open-source projects, participating in hackathons, or exploring the latest trends in cloud infrastructure and AI.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-primary/10 text-primary rounded-lg">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">B.S. Computer Science</h4>
                  <p className="text-sm text-slate-500">State University, 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-primary/10 text-primary rounded-lg">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">3.9 GPA</h4>
                  <p className="text-sm text-slate-500">Summa Cum Laude</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 p-2 bg-primary/10 text-primary rounded-lg">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Tech Lead</h4>
                  <p className="text-sm text-slate-500">University Coding Club</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
