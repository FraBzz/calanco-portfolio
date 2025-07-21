import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { 
  ArrowRight, 
  CheckCircle, 
  Smartphone, 
  Search, 
  Edit3, 
  Clock, 
  Users, 
  TrendingUp, 
  DollarSign,
  ChevronDown,
  ChevronRight,
  Calendar,
  Zap,
  Headphones,
  X
} from 'lucide-react';

const Business: React.FC = () => {
  const { t } = useTranslation('business');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const [openFaq, setOpenFaq] = React.useState<number | null>(null);
  const [lightboxImage, setLightboxImage] = React.useState<{src: string, alt: string, title: string} | null>(null);

  // Portfolio projects from translations
  const portfolioProjects = t('portfolio.projects', { returnObjects: true }) as any[];

  const openLightbox = (src: string, alt: string, title: string) => {
    setLightboxImage({ src, alt, title });
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  // Gestione tasti ESC per chiudere lightbox
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && lightboxImage) {
        closeLightbox();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [lightboxImage]);

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
            className="max-w-4xl mx-auto text-center"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={item} className="inline-block mb-6 py-1 px-4 bg-accent/10 rounded-full">
              <span className="text-accent font-medium">{t('hero.badge')}</span>
            </motion.div>

            <motion.h1 
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
            >
              <Trans 
                i18nKey="hero.title"
                ns="business"
                components={{
                  1: <span className="text-accent" />
                }}
              />
            </motion.h1>

            <motion.p 
              variants={item}
              className="text-lg sm:text-xl mb-8 text-text-dark max-w-3xl mx-auto leading-relaxed"
            >
              {/* {t('hero.subtitle')} */}
              <Trans 
                              i18nKey="hero.subtitle"
                              ns="business"
                              components={{ 1: <span className="text-cta" /> }}
                            />
            </motion.p>

            <motion.div variants={item} className="mb-12">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
              >
                {t('hero.cta')}
                <ArrowRight className="h-5 w-5" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(t('hero.stats', { returnObjects: true }) as any[]).map((stat: any, index: number) => (
                <div key={index} className="text-center p-4 bg-neutral-800 rounded-lg border border-gray-700">
                  <div className="flex justify-center text-accent mb-2">
                    {index === 0 && <Calendar className="h-5 w-5" />}
                    {index === 1 && <Smartphone className="h-5 w-5" />}
                    {index === 2 && <Zap className="h-5 w-5" />}
                    {index === 3 && <Headphones className="h-5 w-5" />}
                  </div>
                  <div className="text-2xl font-bold mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-text-dark">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">
                {t('services.title')}
              </h2>
              <p className="text-lg text-text-dark max-w-2xl mx-auto">
                {t('services.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {(t('services.items', { returnObjects: true }) as any[]).map((service: any, index: number) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-neutral-800 p-8 rounded-lg border border-gray-700"
                >
                  <div className="flex justify-center text-accent mb-6">
                    {index === 0 && <Smartphone className="h-8 w-8" />}
                    {index === 1 && <Search className="h-8 w-8" />}
                    {index === 2 && <Edit3 className="h-8 w-8" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">
                    {service.title}
                  </h3>
                  <p className="text-text-dark mb-6 text-center">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">
                {t('process.title')}
              </h2>
              <p className="text-lg text-text-dark">
                {t('process.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8">
              {(t('process.steps', { returnObjects: true }) as any[]).map((step: any, index: number) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {step.title}
                  </h3>
                  <p className="text-text-dark text-sm">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">
                {t('showcase.title')}
              </h2>
              <p className="text-lg text-text-dark">
                {t('showcase.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(t('showcase.types', { returnObjects: true }) as any[]).map((type: any, index: number) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-neutral-800 p-6 rounded-lg border border-gray-700 hover:border-accent transition-colors"
                >
                  <div className="text-4xl mb-4 text-center">{type.icon}</div>
                  <h3 className="text-lg font-semibold mb-2 text-center">
                    {type.title}
                  </h3>
                  <p className="text-text-dark text-sm mb-4 text-center">
                    {type.description}
                  </p>
                  <ul className="space-y-1">
                    {type.features.map((feature: string, featureIndex: number) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-xs">
                        <ChevronRight className="h-3 w-3 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-6xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">
                {t('portfolio.title')}
              </h2>
              <p className="text-lg text-text-dark max-w-2xl mx-auto">
                {t('portfolio.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioProjects.map((project: any) => (
                <motion.div
                  key={project.id}
                  variants={item}
                  className="group bg-neutral-800 rounded-xl border border-gray-700 overflow-hidden hover:border-accent transition-all duration-300 hover:shadow-2xl hover:shadow-accent/10"
                >
                  <div 
                    className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-neutral-700 to-neutral-900 cursor-pointer" 
                    onClick={() => openLightbox(project.image, project.alt, project.title)}
                  >
                    <img 
                      src={project.image}
                      alt={project.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-accent text-white text-xs font-medium rounded-full">
                        {project.type}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-neutral-900/80 text-white text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                    <p className="text-text-dark text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag: string, tagIndex: number) => (
                        <span key={tagIndex} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={item} className="text-center mt-12">
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent border border-accent/20 hover:border-accent/40 font-medium rounded-lg transition-colors"
              >
                {t('portfolio.cta')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">
                {t('benefits.title')}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {(t('benefits.items', { returnObjects: true }) as any[]).map((benefit: any, index: number) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      {index === 0 && <Clock className="h-6 w-6 text-accent" />}
                      {index === 1 && <Users className="h-6 w-6 text-accent" />}
                      {index === 2 && <TrendingUp className="h-6 w-6 text-accent" />}
                      {index === 3 && <DollarSign className="h-6 w-6 text-accent" />}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-text-dark">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} className="text-center mb-16">
              <h2 className="text-3xl font-display font-bold mb-4">
                {t('faq.title')}
              </h2>
            </motion.div>

            <div className="space-y-4">
              {(t('faq.items', { returnObjects: true }) as any[]).map((faq: any, index: number) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="bg-neutral-800 rounded-lg border border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-neutral-700 transition-colors"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaq === index ? 'auto' : 0,
                      opacity: openFaq === index ? 1 : 0
                    }}
                    transition={{
                      duration: 0.3,
                      ease: 'easeInOut'
                    }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-text-dark">{faq.answer}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-3xl mx-auto"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={item} className="text-center">
              <div className="bg-gradient-to-r from-accent/10 to-accent2/10 rounded-2xl p-8 sm:p-12 border border-accent/20">
                <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                  {t('cta.title')}
                </h3>
                <p className="text-text-dark mb-8 max-w-2xl mx-auto">
                  {t('cta.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link 
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-semibold rounded-lg transition-colors"
                  >
                    {t('cta.button')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={closeLightbox}
          >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ 
              type: "spring", 
              damping: 25, 
              stiffness: 300,
              duration: 0.3
            }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Pulsante chiudi */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-accent transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>
            
            {/* Immagine */}
            <div className="relative bg-neutral-900 rounded-lg overflow-hidden shadow-2xl">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              {/* Titolo sovrapposto */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 className="text-white text-xl font-semibold">
                  {lightboxImage.title}
                </h3>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Business;
