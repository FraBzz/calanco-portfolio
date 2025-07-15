import { motion } from "framer-motion";
import { Send, Code2, Database, Smartphone, Monitor, Server, Calendar, Coffee, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const AboutMe: React.FC = () => {
  const { t } = useTranslation('about');
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
      title: t('expertise.backend.title'),
      description: t('expertise.backend.description'),
      technologies: [".NET", "Express.js", "NestJS"],
      color: "bg-accent"
    },
    {
      icon: <Monitor className="h-8 w-8" />,
      title: t('expertise.frontend.title'),
      description: t('expertise.frontend.description'),
      technologies: ["React", "Tailwind CSS", "TypeScript"],
      color: "bg-cta"
    },
    {
      icon: <Smartphone className="h-8 w-8" />,
      title: t('expertise.mobile.title'),
      description: t('expertise.mobile.description'),
      technologies: ["React Native", "Electron"],
      color: "bg-accent2"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: t('expertise.database.title'),
      description: t('expertise.database.description'),
      technologies: ["PostgreSQL", "SQL Server", "MongoDB"],
      color: "bg-green-600"
    }
  ];

  const stats = [
    { icon: <Calendar className="h-5 w-5" />, label: t('stats.experience'), value: "5+" },
    { icon: <Code2 className="h-5 w-5" />, label: t('stats.technologies'), value: "10+" },
    { icon: <Users className="h-5 w-5" />, label: t('stats.projects'), value: "3+" },
    { icon: <Coffee className="h-5 w-5" />, label: t('stats.tea'), value: "∞" }
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
        >          {/* Header Section */}
          <div className="text-center mb-16">
            <motion.div variants={item} className="inline-block mb-6 py-1 px-4 bg-accent/10 rounded-full">
              <span className="text-accent font-medium">{t('intro.badge')}</span>
            </motion.div>
            <motion.h2 variants={item} className="text-4xl sm:text-5xl font-display font-bold mb-6 leading-tight">
              <Trans
                i18nKey="intro.title"
                ns="about"
                components={{ 1: <span className="text-accent" /> }}
              />
            </motion.h2>
            <motion.p variants={item} className="text-lg sm:text-xl mb-8 text-text-dark leading-relaxed max-w-3xl mx-auto">
              <Trans
                i18nKey="intro.description"
                ns="about"
                components={{
                  1: <span className="text-accent font-semibold" />,
                  2: <span className="text-cta font-semibold" />
                }}
              />
            </motion.p>
          </div>

          {/* Stats Section */}
          <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-neutral-800 rounded-lg border border-gray-700">
                <div className="flex justify-center text-accent mb-2">
                  {stat.icon}
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

          {/* Skills Grid */}
          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-display font-bold text-center mb-8">
              {t('expertise.title')}
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
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-1">
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
          <motion.div variants={item} className="text-center mb-16">
            <h3 className="text-2xl font-display font-bold mb-6">
              {t('philosophy.title')}
            </h3>
            <p className="text-lg sm:text-xl text-text-dark leading-relaxed max-w-3xl mx-auto">
              <Trans
                i18nKey="philosophy.description"
                ns="about"
                components={{
                  1: <span className="text-accent font-semibold" />,
                  2: <span className="text-cta font-semibold" />,
                  3: <span className="text-accent2 font-semibold" />
                }}
              />
            </p>
          </motion.div>          {/* CTA Section */}
          <motion.div variants={item} className="text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-cta hover:bg-cta/90 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl"
            >
              {t('work_together')}
              <Send className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;



