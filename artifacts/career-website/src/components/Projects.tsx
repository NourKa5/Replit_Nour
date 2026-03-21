import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

export function Projects() {
  const projects = [
    {
      title: "TaskFlow AI",
      description: "An intelligent task management application that uses natural language processing to auto-categorize and prioritize daily to-dos.",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=500&fit=crop",
      tags: ["React", "TypeScript", "Node.js", "OpenAI API"],
      github: "#",
      live: "#"
    },
    {
      title: "EcoCommerce",
      description: "A full-stack e-commerce platform dedicated to sustainable products, featuring a custom shopping cart, Stripe integration, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=500&fit=crop",
      tags: ["Next.js", "PostgreSQL", "Prisma", "Stripe"],
      github: "#",
      live: "#"
    },
    {
      title: "SyncChat",
      description: "Real-time communication tool built with WebSockets, supporting multiple rooms, typing indicators, and end-to-end message encryption.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=500&fit=crop",
      tags: ["React", "Socket.io", "Express", "Redis"],
      github: "#",
      live: "#"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">Featured Projects</h2>
          <div className="w-16 h-1.5 bg-primary mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto">
            A selection of my recent work showcasing my ability to build robust, full-stack applications from scratch.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                {/* Unsplash project screenshot */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, j) => (
                    <span key={j} className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                  <a href={project.github} className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                    <Github size={16} /> Code
                  </a>
                  <a href={project.live} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors ml-auto">
                    Live Demo <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
