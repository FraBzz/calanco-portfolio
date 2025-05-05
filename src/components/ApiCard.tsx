import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { ApiProject } from '../types';
import AuthDemo from '../demos/AuthDemo';
import EcommerceDemo from '../demos/EcommerceDemo';
import WeatherDemo from '../demos/WeatherDemo';
import NotificationDemo from '../demos/NotificationDemo';
import TextSummarizerDemo from '../demos/TextSummarizerDemo';

interface ApiCardProps {
  project: ApiProject;
  index: number;
}

const ApiCard: React.FC<ApiCardProps> = ({ project, index }) => {
  const [isDocOpen, setIsDocOpen] = useState(false);

  const renderDemo = () => {
    switch (project.id) {
      case 'auth':
        return <AuthDemo />;
      case 'ecommerce':
        return <EcommerceDemo />;
      case 'weather':
        return <WeatherDemo />;
      case 'notification':
        return <NotificationDemo />;
      case 'text-summarizer':
        return <TextSummarizerDemo />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-separator-light dark:border-separator-dark overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400">{project.description}</p>
          </div>
          <motion.button
            onClick={() => setIsDocOpen(!isDocOpen)}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              isDocOpen 
                ? 'bg-gray-200 dark:bg-gray-700 text-text-light dark:text-text-dark' 
                : 'bg-accent/10 text-accent'
            }`}
          >
            {isDocOpen ? 'Hide Documentation' : 'Show Documentation'}
            {isDocOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </motion.button>
        </div>

        <div className="mb-8">
          {renderDemo()}
        </div>

        <AnimatePresence>
          {isDocOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-separator-light dark:border-separator-dark pt-6"
            >
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h4 className="text-lg font-semibold mb-4">API Documentation</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-base font-medium mb-2">Technology Stack</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.stack.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-base font-medium mb-2">Key Features</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h5 className="text-base font-medium mb-2">Sample Endpoints</h5>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      {project.endpoints.map((endpoint, i) => (
                        <div key={i} className="mb-2">
                          <span className="text-accent font-medium">{endpoint.method}</span> {endpoint.path}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h5 className="text-base font-medium mb-2">Example Response</h5>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
                    <pre className="text-sm">
                      {JSON.stringify(project.exampleResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ApiCard;