// src/pages/About.tsx

import React from "react";
import { motion } from "framer-motion";
import AboutMe from "../components/AboutMe";

const About: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AboutMe />
    </motion.div>
  );
};

export default About;



