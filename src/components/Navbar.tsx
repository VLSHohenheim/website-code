import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Moon, Sun, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from "../assets/LogoUnifarbeInside.png";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode, toggleLanguage }) => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLanguageOpen(false);
  };

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="welcome" smooth={true} duration={500} className="cursor-pointer flex items-center space-x-3">
              <img
                src={logo}
                alt="VLS Logo"
                className="h-10 w-10 rounded-full"
              />
              <span className="text-gray-800 dark:text-white font-semibold">VLS Hohenheim</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="about" smooth={true} duration={500} className="cursor-pointer text-gray-800 dark:text-white hover:text-[#003865] dark:hover:text-gray-300">
              {t('nav.about')}
            </Link>
            <Link to="events" smooth={true} duration={500} className="cursor-pointer text-gray-800 dark:text-white hover:text-[#003865] dark:hover:text-gray-300">
              {t('nav.events')}
            </Link>
            <Link to="posts" smooth={true} duration={500} className="cursor-pointer text-gray-800 dark:text-white hover:text-[#003865] dark:hover:text-gray-300">
              {t('nav.posts')}
            </Link>
            <Link to="contact" smooth={true} duration={500} className="cursor-pointer text-gray-800 dark:text-white hover:text-[#003865] dark:hover:text-gray-300">
              {t('nav.contact')}
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2"
              >
                <Globe className="h-5 w-5 text-gray-800 dark:text-white" />
                <span className="text-sm text-gray-800 dark:text-white">{i18n.language.toUpperCase()}</span>
              </button>

              {isLanguageOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`${
                        i18n.language === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                      role="menuitem"
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('de')}
                      className={`${
                        i18n.language === 'de' ? 'bg-gray-100 dark:bg-gray-700' : ''
                      } w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
                      role="menuitem"
                    >
                      Deutsch
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-white" />
              ) : (
                <Moon className="h-5 w-5 text-gray-800" />
              )}
              <span className="sr-only">Toggle Dark Mode</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
