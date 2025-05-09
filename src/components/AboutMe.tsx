import { motion } from "framer-motion";
import { Send } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AboutMe: React.FC = () => {
  return (
    <motion.section
      id="about"
      className="py-24 sm:py-32 border-t border-separator-light dark:border-separator-dark bg-white dark:bg-neutral-900"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
        <div className="inline-block mb-6 py-1 px-4 bg-accent/10 rounded-full">
          <span className="text-accent font-medium">About Me</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6 leading-tight text-gray-900 dark:text-white">
          Meet the Developer
        </h2>

        <p className="text-lg sm:text-xl mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          I'm <strong>Francesca Bozzoli</strong>, a backend developer with <strong>4.5 years of experience</strong> focused on building secure, high-performance APIs and backend systems.
        </p>

        <p className="text-lg sm:text-xl mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
          While backend is my specialty, I've also worked on:
        </p>

        <ul className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed list-disc list-inside text-left max-w-2xl mx-auto space-y-2">
          <li>Desktop apps using <strong>Electron</strong></li>
          <li>Mobile apps with <strong>React Native</strong></li>
          <li>Frontend interfaces with <strong>React</strong> + Tailwind</li>
          <li>APIs with <strong>.NET</strong>, <strong>Express</strong>, and currently learning <strong>NestJS</strong></li>
          <li>SQL: <strong>PostgreSQL</strong>, <strong>SQL Server</strong>; NoSQL: <strong>MongoDB</strong></li>
        </ul>

        <p className="text-lg sm:text-xl mt-8 text-gray-700 dark:text-gray-300 leading-relaxed">
          I'm driven by clean architecture, developer experience, and solving real-world problems with reliable software.
        </p>
      </div>
      <div className="mt-12 text-center">
  {/* <p className="text-lg text-gray-700 dark:text-gray-300">
    Want to work together or have a question?{" "}
    <Link 
      to="/contact" 
      className="text-accent hover:underline font-medium"
    >
      Get in touch here
    </Link>.
  </p> */}

  <div className="mt-12 flex justify-center">
  <Link 
    to="/contact"
    className="inline-flex items-center gap-2 px-6 py-3 bg-cta hover:bg-cta/90 text-white font-medium rounded-md transition-colors"
  >
    Contact Me
    <Send className="h-4 w-4" />
  </Link>
</div>

</div>

    </motion.section>
  );
};

export default AboutMe;
