import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ApiProject } from '../types';
import AuthDemo from '../demos/AuthDemo';
import EcommerceDemo from '../demos/EcommerceDemo';
import ProductManagementDemo from '../demos/ProductManagementDemo';
import WeatherDemo from '../demos/WeatherDemo';
import NotificationDemo from '../demos/NotificationDemo';
import TextSummarizerDemo from '../demos/TextSummarizerDemo';

interface ApiCardProps {
  project: ApiProject;
  index: number;
}

const ApiCard: React.FC<ApiCardProps> = ({ project, index }) => {
  const { t } = useTranslation('backend');
  const [isDocOpen, setIsDocOpen] = useState(false);
  const renderDemo = () => {
    switch (project.id) {
      case 'auth':
        return <AuthDemo />;
      case 'ecommerce':
        return <EcommerceDemo />;
      case 'product-management':
        return <ProductManagementDemo />;
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
      className="bg-neutral-800 rounded-lg shadow-sm border border-separator-dark overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-400">{project.description}</p>
          </div>          <motion.button
            onClick={() => setIsDocOpen(!isDocOpen)}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent2 transition-all duration-200 cursor-pointer border border-accent/30 hover:border-accent/50 rounded-md px-3 py-2 hover:bg-accent/5"
          >
            {isDocOpen ? t('hide_documentation') : t('show_documentation')}
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
              className="border-t border-separator-dark pt-6"
            >              <div className="prose prose-slate dark:prose-invert max-w-none">
                <h4 className="text-lg font-semibold mb-4">{t('api_documentation')}</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-base font-medium mb-2">{t('technologies_used')}</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.stack.map((tech, i) => (
                        <li key={i}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="text-base font-medium mb-2">{t('features')}</h5>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h5 className="text-base font-medium mb-2">{t('sample_endpoints')}</h5>
                  <div className="bg-gray-100 dark:bg-background-dark p-4 rounded-md overflow-x-auto">
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
                  <h5 className="text-base font-medium mb-2">{t('example_response')}</h5>
                  <div className="bg-gray-100 dark:bg-background-dark p-4 rounded-md overflow-x-auto">
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


