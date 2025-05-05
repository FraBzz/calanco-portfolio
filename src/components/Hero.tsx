import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownCircle } from 'lucide-react';

const Hero: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 sm:py-32 border-b border-separator-light dark:border-separator-dark">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item} className="inline-block mb-6 py-1 px-4 bg-accent/10 rounded-full">
            <span className="text-accent font-medium">Backend Developer</span>
          </motion.div>
          
          <motion.h1 
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
          >
            Crafting robust APIs for real-world needs
          </motion.h1>
          
          <motion.p 
            variants={item}
            className="text-lg sm:text-xl mb-10 text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Specialized in building high-performance, secure, and scalable backend solutions that power modern applications.
          </motion.p>
          
          <motion.div variants={item}>
            <a 
              href="#projects"
              className="inline-flex items-center gap-2 bg-cta hover:bg-cta/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
            >
              Explore My Work
              <ArrowDownCircle className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;