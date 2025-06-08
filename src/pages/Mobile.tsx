import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Smartphone, Download, Star, Globe } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  stack: string[];
  platforms: string[];
  github?: string;
  appStore?: string;
  playStore?: string;
  featured?: boolean;
  downloads?: string;
}

const stats = [
  { label: 'Apps Published', value: '12+', icon: Smartphone },
  { label: 'Total Downloads', value: '50K+', icon: Download },
  { label: 'App Store Rating', value: '4.8★', icon: Star },
  { label: 'Platforms', value: '3', icon: Globe }
];

const mobileExpertise = [
  {
    title: 'React Native',
    description: 'Cross-platform development with native performance and feel'
  },
  {
    title: 'Flutter',
    description: 'Beautiful, fast apps with a single codebase'
  },
  {
    title: 'Native iOS',
    description: 'Swift development for platform-specific features'
  },
  {
    title: 'Performance',
    description: 'Optimized apps with smooth animations and fast load times'
  }
];

const projects: Project[] = [
  {
    title: 'Fitness Tracker Pro',
    description: 'Comprehensive fitness tracking app with personalized workout plans, progress analytics, social challenges, and AI-powered coaching.',
    stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'Firebase', 'ML Kit'],
    platforms: ['iOS', 'Android'],
    github: 'https://github.com/calanco/fitness-tracker',
    appStore: 'https://apps.apple.com/app/fitness-tracker-pro',
    playStore: 'https://play.google.com/store/apps/details?id=dev.calanco.fitnesstracker',
    featured: true,
    downloads: '25K+'
  },
  {
    title: 'Recipe Manager',
    description: 'Smart recipe management app with meal planning, grocery lists, nutritional analysis, and offline support for cooking enthusiasts.',
    stack: ['Flutter', 'Dart', 'SQLite', 'Provider', 'Camera API'],
    platforms: ['iOS', 'Android'],
    github: 'https://github.com/calanco/recipe-manager',
    featured: true,
    downloads: '15K+'
  },
  {
    title: 'Travel Companion',
    description: 'Complete travel planning app with itinerary management, expense tracking, photo journaling, and offline maps.',
    stack: ['React Native', 'TypeScript', 'Expo', 'AsyncStorage'],
    platforms: ['iOS', 'Android'],
    github: 'https://github.com/calanco/travel-companion',
    downloads: '8K+'
  },
  {
    title: 'Language Learning',
    description: 'Interactive language learning app with spaced repetition, pronunciation practice, and gamified lessons.',
    stack: ['Flutter', 'Dart', 'Hive', 'Speech Recognition'],
    platforms: ['iOS', 'Android'],
    github: 'https://github.com/calanco/language-learning',
    appStore: 'https://apps.apple.com/app/language-learning',
    downloads: '12K+'
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
      {/* Hero Section */}
      <section className="py-24 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Mobile <span className="text-accent">Development</span>
            </h1>
            <p className="text-xl text-text-dark mb-8 max-w-3xl mx-auto">
              Building <span className="text-cta font-semibold">native-quality</span> mobile applications 
              with React Native and Flutter that deliver exceptional user experiences across platforms.
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

          {/* Mobile Expertise */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              Mobile <span className="text-accent2">Expertise</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mobileExpertise.map((expertise, index) => (
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
              Featured <span className="text-cta">Apps</span>
            </h2>
            <p className="text-lg text-text-dark max-w-2xl mx-auto">
              A showcase of mobile applications that have delighted users and achieved success in app stores.
            </p>
          </motion.div>          <div className="space-y-8">
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
                      Featured App
                    </span>
                  </div>
                )}
                
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                          {project.title}
                        </h3>
                        {project.downloads && (
                          <span className="px-2 py-1 bg-cta/10 text-cta text-xs font-medium rounded-full">
                            {project.downloads} downloads
                          </span>
                        )}
                      </div>
                      
                      <p className="text-text-dark mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
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
                      
                      <div className="flex gap-2 mb-6">
                        {project.platforms.map(platform => (
                          <span
                            key={platform}
                            className="px-3 py-1 bg-accent2/10 text-accent2 rounded-full text-sm font-medium border border-accent2/20"
                          >
                            {platform}
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
                      {project.appStore && (
                        <a
                          href={project.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-cta text-white hover:bg-cta/90 rounded-lg text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          App Store
                        </a>
                      )}
                      {project.playStore && (
                        <a
                          href={project.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white hover:bg-accent/90 rounded-lg text-sm font-medium transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Play Store
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
                Ready to Launch Your <span className="text-accent">Mobile App</span>?
              </h3>
              <p className="text-text-dark mb-8 max-w-2xl mx-auto">
                Let's bring your mobile app idea to life. I specialize in creating engaging, 
                performant apps that users love and app stores approve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cta text-white hover:bg-cta/90 rounded-lg font-semibold transition-colors"
                >
                  Start Your App
                </a>
                <a
                  href="https://github.com/calanco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg font-semibold transition-colors border border-separator-dark"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Mobile;


