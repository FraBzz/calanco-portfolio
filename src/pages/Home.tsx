import { motion } from 'framer-motion';
import { ArrowRight, Layout as LayoutIcon, Server, Smartphone } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
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
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section className="py-24 sm:py-32 border-b border-separator-light dark:border-separator-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="inline-block mb-6 py-1 px-4 bg-accent/10 rounded-full">
              <span className="text-accent font-medium">Full-Stack Developer</span>
            </motion.div>
            
            <motion.h1 
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
            >
              Crafting robust APIs for real-world needs
            </motion.h1>
            
            <motion.p 
              variants={item}
              className="text-lg sm:text-xl mb-12 text-gray-700 dark:text-gray-300"
            >
              Specialized in building high-performance, secure, and scalable solutions across backend, frontend, and mobile platforms.
            </motion.p>
            
            <motion.div 
              variants={item}
              className="grid sm:grid-cols-3 gap-4"
            >
              <Link 
                to="/backend"
                className="flex items-center justify-between gap-2 bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                <Server className="h-5 w-5" />
                <span>Backend</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/frontend"
                className="flex items-center justify-between gap-2 bg-cta hover:bg-cta/90 text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                <LayoutIcon className="h-5 w-5" />
                <span>Frontend</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link 
                to="/mobile"
                className="flex items-center justify-between gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
              >
                <Smartphone className="h-5 w-5" />
                <span>Mobile</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div variants={item} className="mt-8 text-center">
  <Link 
    to="/about" 
    className="inline-block text-accent hover:underline text-base sm:text-lg font-medium transition-colors"
  >
    Learn more about me
  </Link>
</motion.div>

{/* <motion.div variants={item} className="mt-12 flex justify-center">
<Link 
  to="/about"
  className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-medium px-6 py-3 rounded-md transition-colors"
>
  Learn more about me
  <ArrowRight className="h-5 w-5" />
</Link>
</motion.div> */}
      </section>
      
      {/* <AboutMe /> */}
      
    </motion.div>






</>

  );
};

export default Home;