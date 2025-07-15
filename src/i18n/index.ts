import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en/common.json';
import itTranslations from './locales/it/common.json';
import enFrontend from './locales/en/frontend.json';
import itFrontend from './locales/it/frontend.json';
import enBackend from './locales/en/backend.json';
import itBackend from './locales/it/backend.json';
import enAbout from './locales/en/about.json';
import itAbout from './locales/it/about.json';
import enHome from './locales/en/home.json';
import itHome from './locales/it/home.json';
import enContact from './locales/en/contact.json';
import itContact from './locales/it/contact.json';

const resources = {
  en: {
    common: enTranslations,
    frontend: enFrontend,
    backend: enBackend,
    about: enAbout,
    home: enHome,
    contact: enContact
  },
  it: {
    common: itTranslations,
    frontend: itFrontend,
    backend: itBackend,
    about: itAbout,
    home: itHome,
    contact: itContact
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'frontend', 'backend', 'about', 'home', 'contact'],
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
