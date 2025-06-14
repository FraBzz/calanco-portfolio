import React from 'react';
import { motion } from 'framer-motion';
import ApiProjects from '../components/ApiProjects';

const Backend: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <ApiProjects />
    </motion.div>
  );
};

export default Backend;


