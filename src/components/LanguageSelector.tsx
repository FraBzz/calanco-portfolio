import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  useEffect(() => {
    const detectBrowserLanguage = () => {
      const browserLang = navigator.language || navigator.languages?.[0] || 'en';

      const isItalian = browserLang.toLowerCase().startsWith('it');

      const targetLanguage = isItalian ? 'it' : 'en';

      if (i18n.language !== targetLanguage) {
        i18n.changeLanguage(targetLanguage);
      }
    };

    //controllo la lingua e la setto solo se non ancora settata
    if (!i18n.language || i18n.language === 'cimode') {
      detectBrowserLanguage();
    }
  }, [i18n]);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800 border border-gray-700 hover:border-accent transition-colors"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm">{currentLanguage.flag}</span>
        <span className="text-sm hidden sm:inline">{currentLanguage.name}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-neutral-800 border border-gray-700 rounded-lg shadow-lg z-50">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-neutral-700 first:rounded-t-lg last:rounded-b-lg transition-colors ${i18n.language === language.code ? 'text-accent' : 'text-white'
                }`}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </button>
          ))}
        </div>)}
    </div>
  );
};

export default LanguageSelector;
