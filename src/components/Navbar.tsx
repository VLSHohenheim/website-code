import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { Moon, Sun, Globe, Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import logo from "../assets/LogoUnifarbeInside.png";

interface NavbarProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  toggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleDarkMode, toggleLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language === 'en' ? 'DE' : 'EN';

  return (
    <nav className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Link to="welcome" smooth={true} duration={500} className="cursor-pointer flex items-center space-x-3">
              <img src={logo} alt="VLS Logo" className="h-10 w-10 rounded-full" />
              <span className="text-gray-800 dark:text-white font-semibold">VLS Hohenheim</span>
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-4">
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
          
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleLanguage} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-1">
              <Globe className="h-5 w-5 text-gray-800 dark:text-white" />
              <span className="text-sm text-gray-800 dark:text-white">{currentLanguage}</span>
            </button>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {isDarkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-gray-800" />}
            </button>
          </div>
          
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {isMenuOpen ? <X className="h-6 w-6 text-gray-800 dark:text-white" /> : <Menu className="h-6 w-6 text-gray-800 dark:text-white" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-white dark:bg-gray-900 shadow-lg rounded-lg w-fit p-4 flex flex-col space-y-4">
          <Link to="about" smooth={true} duration={500} className="cursor-pointer text-gray-800 dark:text-white hover:text-[#003865] dark:hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
            {t('nav.about')}
          </Link>
          <Link to="events" smooth={true} duration={500} className="cursor-pointer text-gray-800 dark:text-white hover:text-[#003865] dark:hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
            {t('nav.events')}
          </Link>
          <Link to="posts" smooth={true} duration={500} className="cursor-pointer text-gray-800 dark:text-white hover:text-[#003865] dark:hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
            {t('nav.posts')}
          </Link>
          <Link to="contact" smooth={true} duration={500} className="cursor-pointer text-gray-800 dark:text-white hover:text-[#003865] dark:hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>
            {t('nav.contact')}
          </Link>
          <div className="flex items-center space-x-1">
            <button onClick={toggleLanguage} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-800 dark:text-white" />
              <span className="text-sm text-gray-800 dark:text-white">{currentLanguage}</span>
            </button>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {isDarkMode ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-gray-800" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
