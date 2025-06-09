import { motion } from 'framer-motion';
import { ArrowRight, Layout as LayoutIcon, Server, Calendar, Code2, Users, Coffee, Star, Shield, Zap } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  const stats = [
    { icon: <Calendar className="h-5 w-5" />, label: "Years Experience", value: "5+" },
    { icon: <Code2 className="h-5 w-5" />, label: "Technologies", value: "10+" },
    { icon: <Users className="h-5 w-5" />, label: "Projects Delivered", value: "15+" },
    { icon: <Coffee className="h-5 w-5" />, label: "Tea Consumed", value: "∞" }
  ];

  const highlights = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security First",
      description: "Built-in security practices and authentication systems"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "High Performance",
      description: "Optimized APIs handling thousands of requests per second"
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality Code",
      description: "Clean architecture, comprehensive testing, and documentation"
    }
  ];

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
            className="max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* Header */}
            <div className="text-center mb-16">
              <motion.div variants={item} className="inline-block mb-6 py-1 px-4 bg-accent/10 rounded-full">
                <span className="text-accent font-medium">Full-Stack Developer</span>
              </motion.div>              <motion.h1 
                variants={item}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
              >
                Crafting <span className="text-accent">robust APIs</span> for real-world needs
              </motion.h1>
                <motion.p 
                variants={item}
                className="text-lg sm:text-xl mb-8 text-text-dark max-w-3xl mx-auto leading-relaxed"
              >
                Specialized in building <span className="text-cta font-semibold">high-performance</span>, 
                <span className="text-accent font-semibold"> secure</span>, and 
                <span className="text-accent2 font-semibold"> scalable solutions</span> across backend and frontend platforms.
              </motion.p>
            </div>

            {/* Stats Section */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-neutral-800 rounded-lg border border-gray-700">
                  <div className="flex justify-center text-accent mb-2">
                    {stat.icon}
                  </div>                  <div className="text-2xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-dark">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Navigation Cards */}            <motion.div variants={item} className="mb-16">              <h2 className="text-2xl font-display font-bold text-center mb-8">
                Explore My Work
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <Link 
                  to="/backend"
                  className="group bg-neutral-800 p-6 rounded-lg border border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-accent"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-accent text-white p-4 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                      <Server className="h-8 w-8" />
                    </div>                    <h3 className="text-lg font-semibold mb-2">Backend</h3>
                    <p className="text-text-dark text-sm mb-4">APIs, microservices, and server-side solutions</p>
                    <div className="flex items-center text-accent font-medium">
                      <span>View Projects</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
                
                <Link 
                  to="/frontend"
                  className="group bg-neutral-800 p-6 rounded-lg border border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-cta"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-cta text-white p-4 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                      <LayoutIcon className="h-8 w-8" />
                    </div>                    <h3 className="text-lg font-semibold mb-2">Frontend</h3>
                    <p className="text-text-dark text-sm mb-4">React interfaces and modern web applications</p>
                    <div className="flex items-center text-cta font-medium">
                      <span>View Projects</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
                
                {/* <Link 
                  to="/mobile"
                  className="group bg-neutral-800 p-6 rounded-lg border border-gray-700 hover:shadow-lg transition-all duration-300 hover:border-accent2"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-accent2 text-white p-4 rounded-lg mb-4 group-hover:scale-110 transition-transform">
                      <Smartphone className="h-8 w-8" />
                    </div>                    <h3 className="text-lg font-semibold mb-2">Mobile</h3>
                    <p className="text-text-dark text-sm mb-4">Cross-platform apps and mobile solutions</p>
                    <div className="flex items-center text-accent2 font-medium">
                      <span>View Projects</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link> */}
              </div>
            </motion.div>

            {/* Highlights Section */}
            <motion.div variants={item} className="mb-16">              <h2 className="text-2xl font-display font-bold text-center mb-8">
                What Sets Me Apart
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={index}
                    variants={item}
                    className="text-center p-6 bg-neutral-800 rounded-lg border border-gray-700"
                  >
                    <div className="flex justify-center text-accent mb-4">
                      {highlight.icon}
                    </div>                    <h3 className="text-lg font-semibold mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-text-dark">
                      {highlight.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div variants={item} className="text-center">
              <div className="space-y-4">
                <Link 
                  to="/about" 
                  className="inline-block text-accent hover:text-accent/80 text-lg font-medium transition-colors"
                >
                  Learn more about my journey →
                </Link>
                <div>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-cta hover:bg-cta/90 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
                  >
                    Let's Work Together
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </motion.div>          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;


