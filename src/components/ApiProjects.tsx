import React from 'react';
import { motion } from 'framer-motion';
import ApiCard from './ApiCard';
import { apiProjects } from '../data/apiProjects';
import { Server, Database, Shield, Zap } from 'lucide-react';

const stats = [
  { label: 'APIs Built', value: '20+', icon: Server },
  { label: 'Databases', value: '8+', icon: Database },
  { label: 'Security Features', value: '15+', icon: Shield },
  { label: 'Uptime', value: '99.9%', icon: Zap }
];

const backendExpertise = [
  {
    title: 'API Design',
    description: 'RESTful and GraphQL APIs with proper documentation and versioning'
  },
  {
    title: 'Database Management',
    description: 'SQL and NoSQL databases with optimized queries and migrations'
  },
  {
    title: 'Security',
    description: 'Authentication, authorization, encryption, and security best practices'
  },
  {
    title: 'Scalability',
    description: 'Microservices, caching, load balancing, and performance optimization'
  }
];

const ApiProjects: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Backend <span className="text-accent">Architecture</span>
            </h1>
            <p className="text-xl text-text-secondary dark:text-text-secondary-dark mb-8 max-w-3xl mx-auto">
              Building <span className="text-cta font-semibold">robust</span>, scalable APIs 
              and backend systems that power modern applications with security and performance at the core.
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
                className="text-center p-6 bg-white dark:bg-neutral-800 rounded-xl border border-separator-light dark:border-separator-dark"
              >
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-text-secondary dark:text-text-secondary-dark">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Backend Expertise */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Backend <span className="text-accent2">Expertise</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {backendExpertise.map((expertise, index) => (
                <motion.div
                  key={expertise.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-white dark:bg-neutral-800 rounded-xl border border-separator-light dark:border-separator-dark hover:border-accent/50 transition-colors group"
                >
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
                    {expertise.title}
                  </h3>
                  <p className="text-text-secondary dark:text-text-secondary-dark text-sm">
                    {expertise.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Projects Section */}
      <section className="py-16 border-t border-separator-light dark:border-separator-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Interactive <span className="text-cta">API Demos</span>
            </h2>
            <p className="text-lg text-text-secondary dark:text-text-secondary-dark">
              Explore my API projects with live, interactive demos. Each showcases different backend capabilities and architecture patterns.
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
    </>
  );
};

export default ApiProjects;