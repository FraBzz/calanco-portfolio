import React from 'react';
import { motion } from 'framer-motion';
import ApiCard from './ApiCard';
import { apiProjects } from '../data/apiProjects';

const ApiProjects: React.FC = () => {
  return (
    <section id="projects" className="py-24 sm:py-32 border-b border-separator-light dark:border-separator-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">API Projects</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Explore my API projects with interactive demos. Each showcases different backend capabilities and architecture patterns.
          </p>
        </motion.div>
        
        <div className="space-y-24">
          {apiProjects.map((project, index) => (
            <ApiCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ApiProjects;