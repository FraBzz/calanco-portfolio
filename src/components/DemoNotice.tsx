import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X } from 'lucide-react';

interface DemoNoticeProps {
  demoName: string;
  limits: string[];
}

const DemoNotice: React.FC<DemoNoticeProps> = ({ demoName, limits }) => {
  const [isVisible, setIsVisible] = useState(false);
  const noticeKey = `demo_notice_${demoName}`;

  useEffect(() => {
    // Check if user has already seen this notice
    const hasSeenNotice = localStorage.getItem(noticeKey);
    if (!hasSeenNotice) {
      setIsVisible(true);
    }
  }, [noticeKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(noticeKey, 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h5 className="font-medium text-blue-100 mb-2">
                Demo Environment
              </h5>
              <p className="text-sm text-blue-200 mb-2">
                This is a portfolio demonstration with the following limitations:
              </p>
              <ul className="text-sm text-blue-300 space-y-1">
                {limits.map((limit, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                    {limit}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleDismiss}
              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-200 p-1"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoNotice;



