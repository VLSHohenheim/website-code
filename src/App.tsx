import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, Mail } from 'lucide-react';
import { InstagramEmbed } from 'react-social-media-embed';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import ImpressumModal from './components/ImpressumModal';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
      />

      {/* Welcome Section */}
      <section
        id="welcome"
        className="h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/29465326/pexels-photo-29465326/free-photo-of-dark-food-photography-with-berries-and-nuts.jpeg')"
        }}
      >
        <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{t('welcome.title')}</h1>
            <p className="text-xl">{t('welcome.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.imgur.com/OrpB8Oj.jpeg')"
        }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#003865] dark:text-white">{t('about.title')}</h2>
            <p className="text-lg text-[#003865] dark:text-white">{t('about.content')}</p>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/918328/pexels-photo-918328.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
        }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#003865] dark:text-white">{t('events.title')}</h2>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
              <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white">{t('events.nextEvent')}</h3>
              <div className="space-y-2 text-[#003865] dark:text-white">
                <p><strong>{t('events.date')}:</strong> {t('events.dateDetail')}</p>
                <p><strong>{t('events.time')}:</strong> {t('events.timeDetail')}</p>
                <p><strong>{t('events.location')}:</strong> {t('events.locationDetail')}</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <a
                href="https://forms.gle/ng9m2FUAiRC57jfT8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#003865] text-white px-6 py-3 rounded-lg hover:bg-[#002845] transition-colors"
              >
                {t('events.register')}
              </a>
              <a
                href="https://docs.google.com/document/d/1K9ykelhGJONQ-dLcMoFBoYEalLivJEUDxvEMkhWBAww/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#003865] text-white px-6 py-3 rounded-lg hover:bg-[#002845] transition-colors"
              >
                {t('events.moreInfo')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section
        id="posts"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
        }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center space-x-4 mb-8">
              <h2 className="text-4xl font-bold text-[#003865] dark:text-white">{t('posts.title')}</h2>
            </div>
            <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <div className="flex items-center justify-center space-x-4 mb-8">
                  <h2 className="text-4xl font-bold text-[#003865] dark:text-white">{t('posts.title')}</h2>
                </div>
                <div className="instagram-embed-container dark:bg-gray-800 p-2 rounded-lg">
                  <InstagramEmbed url="https://www.instagram.com/p/DEALUtoIrXZ/" width={400} />
               </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/774448/pexels-photo-774448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')"
        }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#003865] dark:text-white">{t('contact.title')}</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              <button
                onClick={() => setIsImpressumOpen(true)}
                className="text-[#003865] dark:text-white hover:underline"
              >
                {t('footer.impressum')}
              </button>
              <a
                href="https://docs.google.com/document/d/1VtiFevXyGDk-Z3xxuCAyxYLnHza5sPklfeHdjMgli2c/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003865] dark:text-white hover:underline"
              >
                {t('footer.privacy')}
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="https://www.instagram.com/vls_hohenheim/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#003865] dark:text-white hover:text-[#002845] dark:hover:text-gray-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="mailto:vls.hohenheim@gmail.com"
                className="text-[#003865] dark:text-white hover:text-[#002845] dark:hover:text-gray-300"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ImpressumModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} />
    </div>
  );
}

export default App;
