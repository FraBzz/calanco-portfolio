import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { Github, Code, Users, Zap, Star, Sun, Moon, Palette, Move3D, Copy, Check } from 'lucide-react';

// Interactive Demos Components
const ThemeToggleDemo: React.FC = () => {
  const [isDark, setIsDark] = useState(true);
  const { t } = useTranslation('common');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{t('frontend.demos.theme_mode')}</span>
        <motion.button
          onClick={() => setIsDark(!isDark)}
          className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
            isDark ? 'bg-accent' : 'bg-gray-300'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md flex items-center justify-center"
            animate={{ x: isDark ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            {isDark ? (
              <Moon className="h-3 w-3 text-accent" />
            ) : (
              <Sun className="h-3 w-3 text-yellow-500" />
            )}
          </motion.div>
        </motion.button>
      </div>
      
      <motion.div 
        className={`p-4 rounded-lg border transition-all duration-300 ${
          isDark 
            ? 'bg-neutral-800 border-separator-dark text-white' 
            : 'bg-white border-gray-200 text-gray-900'
        }`}
        animate={{ 
          backgroundColor: isDark ? '#262626' : '#ffffff',
          borderColor: isDark ? '#404040' : '#e5e7eb'
        }}
      >
        <h4 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {t('frontend.demos.sample_component')}
        </h4>
        <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('frontend.demos.sample_description')}
        </p>
      </motion.div>
    </div>
  );
};

const ComponentShowcase: React.FC = () => {
  const [activeVariant, setActiveVariant] = useState('primary');
  const { t } = useTranslation('common');
  
  const variants = [
    { name: 'primary', label: t('frontend.demos.primary'), class: 'bg-accent text-white hover:bg-accent/90' },
    { name: 'secondary', label: t('frontend.demos.secondary'), class: 'bg-neutral-800 text-white hover:bg-neutral-700 border border-separator-dark' },
    { name: 'outline', label: t('frontend.demos.outline'), class: 'border-2 border-accent text-accent hover:bg-accent hover:text-white' },
    { name: 'ghost', label: t('frontend.demos.ghost'), class: 'text-accent hover:bg-accent/10' }
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {variants.map((variant) => (
          <motion.button
            key={variant.name}
            onClick={() => setActiveVariant(variant.name)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeVariant === variant.name 
                ? 'bg-accent text-white' 
                : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {variant.label}
          </motion.button>
        ))}
      </div>
      
      <div className="flex flex-col gap-3">
        <motion.button
          key={activeVariant}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            variants.find(v => v.name === activeVariant)?.class
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {variants.find(v => v.name === activeVariant)?.label} Button
        </motion.button>
        
        <motion.div 
          className="p-3 bg-neutral-800 rounded-lg border border-separator-dark"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Palette className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">{t('frontend.demos.component_variant')}</span>
          </div>
          <code className="text-xs text-gray-300">
            className="{variants.find(v => v.name === activeVariant)?.class}"
          </code>
        </motion.div>
      </div>
    </div>
  );
};

const DragDropDemo: React.FC = () => {
  const { t } = useTranslation('common');
  const [items, setItems] = useState([
    { id: 1, text: t('frontend.demos.design_system'), status: 'todo' },
    { id: 2, text: t('frontend.demos.component_library'), status: 'in-progress' },
    { id: 3, text: t('frontend.demos.performance_optimization'), status: 'done' }
  ]);
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  const columns = [
    { id: 'todo', title: t('frontend.demos.todo'), color: 'border-gray-500' },
    { id: 'in-progress', title: t('frontend.demos.in_progress'), color: 'border-yellow-500' },
    { id: 'done', title: t('frontend.demos.done'), color: 'border-green-500' }
  ];

  const handleDragStart = (itemId: number) => {
    setDraggedItem(itemId);
  };

  const handleDrop = (newStatus: string) => {
    if (draggedItem) {
      setItems(items.map(item => 
        item.id === draggedItem ? { ...item, status: newStatus } : item
      ));
      setDraggedItem(null);
    }
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-gray-300">
        <Move3D className="h-4 w-4" />
        <span>{t('frontend.demos.drag_items')}</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`p-2 sm:p-3 rounded-lg border-2 border-dashed transition-colors ${
              column.color
            } bg-neutral-800/50 min-h-[100px]`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
          >
            <h4 className="text-xs font-semibold mb-2 sm:mb-3 text-center">
              {column.title}
            </h4>
            <div className="space-y-2">
              {items
                .filter(item => item.status === column.id)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(item.id)}
                    className="p-2 bg-neutral-700 rounded-md text-xs cursor-move hover:bg-neutral-600 transition-colors break-words leading-tight"
                    whileHover={{ scale: 1.02 }}
                    whileDrag={{ scale: 0.95, rotate: 5 }}
                  >
                    {item.text}
                  </motion.div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CopyToClipboardDemo: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);
  const { t } = useTranslation('common');
  
  const codeSnippets = [
    { 
      id: 'react-hook', 
      title: t('frontend.demos.react_hook'), 
      code: `const [state, setState] = useState(null);`
    },
    { 
      id: 'api-call', 
      title: t('frontend.demos.api_call'), 
      code: `const data = await fetch('/api/data').then(r => r.json());`
    }
  ];

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="space-y-3">
      {codeSnippets.map((snippet) => (
        <div key={snippet.id} className="relative">
          <div className="bg-neutral-900 rounded-lg p-3 border border-separator-dark">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-300">{snippet.title}</span>
              <motion.button
                onClick={() => copyToClipboard(snippet.code, snippet.id)}
                className="p-1 rounded hover:bg-neutral-700 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {copied === snippet.id ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </motion.button>
            </div>
            <code className="text-xs text-gray-300 font-mono block overflow-x-auto">
              {snippet.code}
            </code>
          </div>
          {copied === snippet.id && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -top-8 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded"
            >
              {t('frontend.demos.copied')}
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
};

const Frontend: React.FC = () => {
  const { t } = useTranslation('common');

  const stats = [
    { label: t('frontend.stats.projects_built'), value: '10+', icon: Code },
    { label: t('frontend.stats.react_components'), value: '50+', icon: Zap },
    { label: t('frontend.stats.hours_coding'), value: '100+', icon: Users },
    { label: t('frontend.stats.technologies_used'), value: '10+', icon: Star }
  ];

  const techHighlights = [
    {
      title: t('frontend.expertise.react.title'),
      description: t('frontend.expertise.react.description')
    },
    {
      title: t('frontend.expertise.typescript.title'),
      description: t('frontend.expertise.typescript.description')
    },
    {
      title: t('frontend.expertise.performance.title'),
      description: t('frontend.expertise.performance.description')
    },
    {
      title: t('frontend.expertise.tooling.title'),
      description: t('frontend.expertise.tooling.description')
    }
  ];

  const frontendDemos = [
    {
      title: t('frontend.demos.theme_system.title'),
      description: t('frontend.demos.theme_system.description'),
      component: ThemeToggleDemo,
      stack: ['React Hooks', 'Framer Motion', 'CSS Variables'],
      featured: true
    },
    {
      title: t('frontend.demos.component_variants.title'),
      description: t('frontend.demos.component_variants.description'),
      component: ComponentShowcase,
      stack: ['Design Systems', 'Tailwind CSS', 'Component API'],
      featured: true
    },
    {
      title: t('frontend.demos.drag_drop.title'),
      description: t('frontend.demos.drag_drop.description'),
      component: DragDropDemo,
      stack: ['Drag & Drop API', 'State Management', 'Framer Motion']
    },
    {
      title: t('frontend.demos.copy_clipboard.title'),
      description: t('frontend.demos.copy_clipboard.description'),
      component: CopyToClipboardDemo,
      stack: ['Clipboard API', 'User Feedback', 'Micro-interactions']
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <Trans
                i18nKey="frontend.hero.title"
                components={{ 1: <span className="text-accent" /> }}
              />
            </h1>
            <p className="text-xl text-text-dark mb-8 max-w-3xl mx-auto">
              <Trans
                i18nKey="frontend.hero.description"
                components={{ 1: <span className="text-cta font-semibold" /> }}
              />
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + index * 0.1 }}
                className="text-center p-6 bg-neutral-800 rounded-xl border border-separator-dark"
              >
                <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                <div className="text-2xl sm:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                <div className="text-sm text-text-dark">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tech Highlights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">
              <Trans
                i18nKey="frontend.expertise.title"
                components={{ 1: <span className="text-accent2" /> }}
              />
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 bg-neutral-800 rounded-xl border border-separator-dark hover:border-accent/50 transition-colors group"
                >
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-text-dark text-sm">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>      {/* Interactive Demos Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              <Trans
                i18nKey="frontend.demos.title"
                components={{ 1: <span className="text-cta" /> }}
              />
            </h2>
            <p className="text-lg text-text-dark max-w-2xl mx-auto">
              {t('frontend.demos.description')}
            </p>
          </motion.div>
            <div className="grid lg:grid-cols-2 gap-8">
            {frontendDemos.map((demo, index) => {
              const DemoComponent = demo.component;
              return (
                <motion.div
                  key={demo.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                  className={`bg-neutral-800 rounded-xl shadow-sm border hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                    demo.featured 
                      ? 'border-accent/30' 
                      : 'border-separator-dark hover:border-accent/50'
                  }`}
                >
                  <div className="p-6">
                    <div className="mb-6">                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold">
                          {demo.title}
                        </h3>
                        {demo.featured && (
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full border border-accent/20">
                            {t('frontend.demos.featured')}
                          </span>
                        )}
                      </div>
                      <p className="text-text-dark mb-4 text-sm leading-relaxed">
                        {demo.description}
                      </p>                      <div className="flex flex-wrap gap-2 mb-4">
                        {demo.stack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-full text-xs font-medium bg-background-dark text-text-dark border border-separator-dark"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Interactive Demo Area */}
                    <div className="bg-neutral-900 rounded-lg p-4 border border-separator-dark">
                      <DemoComponent />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>{/* CTA Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="bg-gradient-to-r from-accent/10 to-accent2/10 rounded-2xl p-8 sm:p-12 border border-accent/20">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                <Trans
                  i18nKey="frontend.cta.title"
                  components={{ 1: <span className="text-accent" /> }}
                />
              </h3>
              <p className="text-text-dark mb-8 max-w-2xl mx-auto">
                {t('frontend.cta.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-cta text-white hover:bg-cta/90 rounded-lg font-semibold transition-colors"
                >
                  {t('frontend.cta.start_project')}
                </a>
                <a
                  href="https://github.com/FraBzz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg font-semibold transition-colors border border-separator-dark"
                >
                  <Github className="h-4 w-4" />
                  {t('frontend.cta.view_github')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Frontend;


