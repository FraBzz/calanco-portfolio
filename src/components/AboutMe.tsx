import { motion } from "framer-motion";
import { Send, Code2, Database, Smartphone, Monitor, Server, Calendar, Coffee, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AboutMe: React.FC = () => {
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

  const skillAreas = [
    {
      icon: <Server className="h-8 w-8" />,
      title: "Backend Development",
      description: "APIs & Microservices",
      technologies: [".NET", "Express.js", "NestJS"],
      color: "bg-accent"
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: "Frontend Development", 
      description: "Modern Web Interfaces",
      technologies: ["React", "Tailwind CSS", "TypeScript"],
      color: "bg-cta"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: "Mobile & Desktop",
      description: "Cross-platform Apps",
      technologies: ["React Native", "Electron"],
      color: "bg-accent2"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Database Management",
      description: "SQL & NoSQL Solutions",
      technologies: ["PostgreSQL", "SQL Server", "MongoDB"],
      color: "bg-green-600"
    }
  ];

  const stats = [
    { icon: <Calendar className="h-5 w-5" />, label: "Years Experience", value: "5+" },
    { icon: <Code2 className="h-5 w-5" />, label: "Technologies", value: "10+" },
    { icon: <Users className="h-5 w-5" />, label: "Projects", value: "3+" },
    { icon: <Coffee className="h-5 w-5" />, label: "Tea Cups", value: "∞" }
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div variants={item} className="inline-block mb-6 py-1 px-4 bg-accent/10 rounded-full">
              <span className="text-accent font-medium">About Me</span>
            </motion.div>            <motion.h2 variants={item} className="text-4xl sm:text-5xl font-display font-bold mb-6 leading-tight">
              Meet the <span className="text-accent">Developer</span>
            </motion.h2>            <motion.p variants={item} className="text-lg sm:text-xl mb-8 text-text-dark leading-relaxed max-w-3xl mx-auto">
              I'm <span className="text-accent font-semibold">Francesca Bozzoli</span>, a backend developer with <span className="text-cta font-semibold">5 years of experience</span> focused on building secure, high-performance APIs and backend systems.
            </motion.p>
          </div>

          {/* Stats Section */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-neutral-800 rounded-lg border border-gray-700">
                <div className="flex justify-center text-accent mb-2">
                  {stat.icon}
                </div>                <div className="text-2xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-text-dark">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <motion.div variants={item} className="mb-16">            <h3 className="text-2xl font-display font-bold text-center mb-8">
              Areas of Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-neutral-800 p-6 rounded-lg border border-gray-700 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`${area.color} text-white p-3 rounded-lg flex-shrink-0`}>
                      {area.icon}
                    </div>
                    <div className="flex-1">                      <h4 className="text-lg font-semibold mb-1">
                        {area.title}
                      </h4>
                      <p className="text-text-dark mb-3">
                        {area.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {area.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-neutral-700 text-sm rounded-md text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Philosophy Section */}
          <motion.div variants={item} className="text-center mb-16">            <h3 className="text-2xl font-display font-bold mb-6">
              My Development Philosophy
            </h3>
            <p className="text-lg sm:text-xl text-text-dark leading-relaxed max-w-3xl mx-auto">
              I'm driven by <span className="text-accent font-semibold">clean architecture</span>, excellent <span className="text-cta font-semibold">developer experience</span>, and solving real-world problems with <span className="text-accent2 font-semibold">reliable software</span>. Every line of code should serve a purpose and contribute to a maintainable, scalable solution.
            </p>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={item} className="text-center">
            <Link 
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cta hover:bg-cta/90 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              Let's Work Together
              <Send className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;



