import React from 'react';
import { motion } from 'framer-motion';
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
  Headphones
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

      {/* Benefits Section */}
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
    </motion.div>
  );
};

export default Business;
