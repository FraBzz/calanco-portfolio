import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  stack: string[];
  platforms: string[];
  github?: string;
  appStore?: string;
  playStore?: string;
}

const projects: Project[] = [
  {
    title: 'Fitness Tracker Pro',
    description: 'Cross-platform fitness tracking app with workout plans, progress tracking, and social features.',
    stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'Firebase'],
    platforms: ['iOS', 'Android'],
    github: 'https://github.com/calanco/fitness-tracker',
    appStore: 'https://apps.apple.com/app/fitness-tracker-pro',
    playStore: 'https://play.google.com/store/apps/details?id=dev.calanco.fitnesstracker'
  },
  {
    title: 'Recipe Manager',
    description: 'Mobile app for managing recipes, meal planning, and grocery lists with offline support.',
    stack: ['Flutter', 'Dart', 'SQLite', 'Provider'],
    platforms: ['iOS', 'Android'],
    github: 'https://github.com/calanco/recipe-manager'
  }
];

const Mobile: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Mobile Projects</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Native and cross-platform mobile applications built with React Native and Flutter.
            </p>
          </motion.div>
          
          <div className="space-y-12">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-separator-light dark:border-separator-dark overflow-hidden"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md text-sm font-medium transition-colors"
                        >
                          <Github className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                      {(project.appStore || project.playStore) && (
                        <a
                          href={project.appStore || project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white hover:bg-accent/90 rounded-md text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map(tech => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    {project.platforms.map(platform => (
                      <span
                        key={platform}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium"
                      >
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Mobile;