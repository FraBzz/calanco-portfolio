import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code, Users, Zap, Star } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
  featured?: boolean;
}

const stats = [
  { label: 'Projects Built', value: '25+', icon: Code },
  { label: 'React Components', value: '200+', icon: Zap },
  { label: 'Happy Clients', value: '15+', icon: Users },
  { label: 'GitHub Stars', value: '150+', icon: Star }
];

const techHighlights = [
  {
    title: 'React Expertise',
    description: 'Building scalable applications with hooks, context, and modern patterns'
  },
  {
    title: 'TypeScript Focus',
    description: 'Type-safe development for better maintainability and developer experience'
  },
  {
    title: 'Performance First',
    description: 'Optimized bundles, lazy loading, and efficient state management'
  },
  {
    title: 'Modern Tooling',
    description: 'Vite, Next.js, and cutting-edge development tools'
  }
];

const projects: Project[] = [
  {
    title: 'E-commerce Dashboard',
    description: 'A comprehensive dashboard for managing products, orders, and customer data with real-time analytics and beautiful visualizations.',
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'React Query', 'Chart.js'],
    github: 'https://github.com/calanco/ecommerce-dashboard',
    demo: 'https://dashboard.calanco.dev',
    featured: true
  },
  {
    title: 'Task Management System',
    description: 'Collaborative task management platform with real-time updates, team features, and advanced project planning capabilities.',
    stack: ['Next.js', 'TypeScript', 'Prisma', 'tRPC', 'TailwindCSS'],
    github: 'https://github.com/calanco/task-manager',
    demo: 'https://tasks.calanco.dev',
    featured: true
  },
  {
    title: 'Portfolio Builder',
    description: 'Dynamic portfolio builder allowing designers and developers to create stunning portfolio websites with drag-and-drop functionality.',
    stack: ['React', 'TypeScript', 'Framer Motion', 'Zustand'],
    github: 'https://github.com/calanco/portfolio-builder'
  },
  {
    title: 'Weather Analytics',
    description: 'Weather tracking application with detailed analytics, forecasts, and beautiful data visualizations.',
    stack: ['Vue.js', 'TypeScript', 'D3.js', 'OpenWeather API'],
    github: 'https://github.com/calanco/weather-analytics',
    demo: 'https://weather.calanco.dev'
  }
];

const Frontend: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Frontend <span className="text-accent">Excellence</span>
            </h1>
            <p className="text-xl text-text-dark mb-8 max-w-3xl mx-auto">
              Crafting modern, <span className="text-cta font-semibold">performant</span> web applications 
              with React, TypeScript, and cutting-edge tools that deliver exceptional user experiences.
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="text-center p-6 bg-neutral-800 rounded-xl border border-separator-dark"
              >
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-text-dark">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Technical <span className="text-accent2">Expertise</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-neutral-800 rounded-xl border border-separator-dark hover:border-accent/50 transition-colors group"
                >
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-text-dark text-sm">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Featured <span className="text-cta">Projects</span>
            </h2>
            <p className="text-lg text-text-dark max-w-2xl mx-auto">
              A selection of my best frontend work, showcasing modern React development and innovative solutions.
            </p>
          </motion.div>
            <div className="space-y-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                className={`bg-neutral-800 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                  project.featured 
                    ? 'border-accent/30 dark:border-accent/30' 
                    : 'border-separator-dark hover:border-accent/50'
                }`}
              >
                {project.featured && (
                  <div className="bg-gradient-to-r from-accent to-accent2 px-4 py-2">
                    <span className="text-white text-sm font-medium flex items-center gap-2">
                      <Star className="h-4 w-4" />
                      Featured Project
                    </span>
                  </div>
                )}
                
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-text-dark mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech, techIndex) => (
                          <span
                            key={tech}
                            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                              techIndex === 0 
                                ? 'bg-accent/10 text-accent border border-accent/20' 
                                : 'bg-background-dark text-text-dark border border-separator-dark'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 lg:flex-col lg:w-auto w-full">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-background-dark hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors border border-separator-dark"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-cta text-white hover:bg-cta/90 rounded-lg text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-accent/10 to-accent2/10 rounded-2xl p-8 sm:p-12 border border-accent/20">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to Build Something <span className="text-accent">Amazing</span>?
              </h3>
              <p className="text-text-dark mb-8 max-w-2xl mx-auto">
                Let's collaborate on your next frontend project. I bring expertise in modern React development 
                and a passion for creating exceptional user experiences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cta text-white hover:bg-cta/90 rounded-lg font-semibold transition-colors"
                >
                  Start a Project
                </a>
                <a
                  href="https://github.com/calanco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg font-semibold transition-colors border border-separator-dark"
                >
                  <Github className="h-4 w-4" />
                  View GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Frontend;


