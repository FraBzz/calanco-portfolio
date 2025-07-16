import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import ApiCard from './ApiCard';
import { createTranslatedApiProjects } from '../data/translatedApiProjects';
import { Server, Database, Shield, Zap, Github } from 'lucide-react';

const ApiProjects: React.FC = () => {
  const { t } = useTranslation('backend');
  const apiProjects = createTranslatedApiProjects(t);
  
  const stats = [
    { label: t('stats.apis'), value: '8+', icon: Server },
    { label: t('stats.databases'), value: '5+', icon: Database },
    { label: t('stats.learning'), value: '5+', icon: Shield },
    { label: t('stats.projects'), value: '10+', icon: Zap }
  ];

  const backendExpertise = [
    {
      title: t('expertise.api_dev.title'),
      description: t('expertise.api_dev.description')
    },
    {
      title: t('expertise.database.title'),
      description: t('expertise.database.description')
    },
    {
      title: t('expertise.agency.title'),
      description: t('expertise.agency.description')
    },
    {
      title: t('expertise.integration.title'),
      description: t('expertise.integration.description')
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
                i18nKey="title"
                ns="backend"
                components={{ 1: <span className="text-accent" /> }}
              />
            </h1>
            <p className="text-xl text-text-dark mb-8 max-w-3xl mx-auto">
              <Trans 
                i18nKey="description"
                ns="backend"
                components={{ 1: <span className="text-cta" /> }}
              />
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="text-center p-4 bg-neutral-800 rounded-lg border border-gray-700"
              >
                <div className="flex justify-center text-accent mb-2">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-text-dark">{stat.label}</div>
              </motion.div>
            ))}
            </div>
          </motion.div>

          {/* Backend Expertise */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-6xl mx-auto mb-16"
          >            <h2 className="text-3xl font-bold text-center mb-12">
              <Trans 
                i18nKey="expertise.title"
                ns="backend"
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
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <Trans 
                i18nKey="api_showcase"
                ns="backend"
                components={{ 1: <span className="text-cta" /> }}
              />
            </h2>
            <p className="text-lg text-text-dark">
              {t('demo_description')}
            </p>
          </motion.div>
            <div className="space-y-16">
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-r from-accent/10 to-accent2/10 rounded-2xl p-8 sm:p-12 border border-accent/20">              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                <Trans 
                  i18nKey="cta.title"
                  ns="backend"
                  components={{ 1: <span className="text-accent" /> }}
                />
              </h3>
              <p className="text-text-dark mb-8 max-w-2xl mx-auto">
                {t('cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cta text-white hover:bg-cta/90 rounded-lg font-semibold transition-colors"
                >
                  {t('cta.start_project')}
                </a>
                <a
                  href="https://github.com/FraBzz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg font-semibold transition-colors border border-separator-dark"
                >
                  <Github className="h-4 w-4" />
                  {t('cta.view_github')}
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


