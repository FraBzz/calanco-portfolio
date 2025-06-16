import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import ApiCard from './ApiCard';
import { createTranslatedApiProjects } from '../data/translatedApiProjects';
import { Server, Database, Shield, Zap, Github } from 'lucide-react';

const ApiProjects: React.FC = () => {
  const { t } = useTranslation('common');
  const apiProjects = createTranslatedApiProjects(t);
  
  const stats = [
    { label: t('backend.stats.apis'), value: '8+', icon: Server },
    { label: t('backend.stats.databases'), value: '5+', icon: Database },
    { label: t('backend.stats.learning'), value: '5+', icon: Shield },
    { label: t('backend.stats.projects'), value: '10+', icon: Zap }
  ];

  const backendExpertise = [
    {
      title: t('backend.expertise.api_dev.title'),
      description: t('backend.expertise.api_dev.description')
    },
    {
      title: t('backend.expertise.database.title'),
      description: t('backend.expertise.database.description')
    },
    {
      title: t('backend.expertise.agency.title'),
      description: t('backend.expertise.agency.description')
    },
    {
      title: t('backend.expertise.integration.title'),
      description: t('backend.expertise.integration.description')
    }
  ];
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
              <Trans 
                i18nKey="backend.title"
                components={{ 1: <span className="text-accent" /> }}
              />
            </h1>
            <p className="text-xl text-text-dark mb-8 max-w-3xl mx-auto">
              <Trans 
                i18nKey="backend.description"
                components={{ 1: <span className="text-cta" /> }}
              />
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

          {/* Backend Expertise */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >            <h2 className="text-3xl font-bold text-center mb-12">
              <Trans 
                i18nKey="backend.expertise.title"
                components={{ 1: <span className="text-accent2" /> }}
              />
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {backendExpertise.map((expertise, index) => (
                <motion.div
                  key={expertise.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-neutral-800 rounded-xl border border-separator-dark hover:border-accent/50 transition-colors group"
                >
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
                    {expertise.title}
                  </h3>
                  <p className="text-text-dark text-sm">
                    {expertise.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* API Projects Section */}
      <section className="py-16 border-t border-separator-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <Trans 
                i18nKey="backend.api_showcase"
                components={{ 1: <span className="text-cta" /> }}
              />
            </h2>
            <p className="text-lg text-text-dark">
              {t('backend.demo_description')}
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

          {/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-accent/10 to-accent2/10 rounded-2xl p-8 sm:p-12 border border-accent/20">              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                <Trans 
                  i18nKey="backend.cta.title"
                  components={{ 1: <span className="text-accent" /> }}
                />
              </h3>
              <p className="text-text-dark mb-8 max-w-2xl mx-auto">
                {t('backend.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cta text-white hover:bg-cta/90 rounded-lg font-semibold transition-colors"
                >
                  {t('backend.cta.start_project')}
                </a>
                <a
                  href="https://github.com/FraBzz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg font-semibold transition-colors border border-separator-dark"
                >
                  <Github className="h-4 w-4" />
                  {t('backend.cta.view_github')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ApiProjects;


