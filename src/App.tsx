import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Instagram, Mail } from 'lucide-react';
import { InstagramEmbed } from 'react-social-media-embed';
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import ImpressumModal from './components/ImpressumModal';
import MoreInfoModal from './components/MoreInfoModal';
import { Trans } from 'react-i18next';
import ritter1 from './assets/ritter-exkursion-gruppenbild.jpeg';
import ritter2 from './assets/ritter-exkursion-bild2.jpg';
import ritter3 from './assets/ritter-exkursion-bild3.jpeg';
import ritter4 from './assets/ritter-exkursion-bild4.jpg';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

export default function RitterGallery() {
  const [open, setOpen] = useState(false);

  const slides = [
    { src: ritter1 },
    { src: ritter2 },
    { src: ritter3 },
    { src: ritter4 },
  ];

  return (
    <div className="text-center">
      <img
        src={ritter1}
        alt="Gruppenbild VLS Hohenheim"
        onClick={() => setOpen(true)}
        className="cursor-pointer rounded-lg shadow-lg max-w-full mx-auto"
      />
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Thumbnails]}
      />
    </div>
  );
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  
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
            <p className="text-lg text-[#003865] dark:text-white">
              <Trans i18nKey="about.content" components={{ strong: <strong /> }} />
            </p>
          </div>
        </div>
      </section>

      {/* Aktuelles Section */}
<section
  id="aktuelles"
  className="py-20 bg-white dark:bg-gray-900"
>
    <div className="max-w-4xl mx-auto px-4 text-center">
      {/* Titel */}
      <h2 className="text-4xl font-bold mb-12 text-[#003865] dark:text-white">
        {t('aktuelles.title')}
      </h2>

      {/* 1. Beitrag: Stadtradeln */}
      <div className="mb-12 text-left">
        <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white">
          {t('aktuelles.stadtradeln.title')}
        </h3>
        <p className="text-lg mb-4 text-[#003865] dark:text-white">
          <Trans i18nKey="aktuelles.stadtradeln.content" components={{ strong: <strong /> }} />
        </p>
        {/* Optional: kleines Icon oder Figur */}
      </div>

        {/* 2. Beitrag: Ritter Sport Exkursion */}
        <div className="text-left">
          <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white">
            {t('aktuelles.excursion.title')}
          </h3>
            <p className="text-lg mb-6 text-[#003865] dark:text-white">
              {t('aktuelles.excursion.content')}
            </p>
              <RitterGallery />
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
            <button
              onClick={() => setIsMoreInfoOpen(true)}
              className="inline-block bg-[#003865] text-white px-6 py-3 rounded-lg hover:bg-[#002845] transition-colors"
              >
              {t('events.moreInfo')}
            </button>
              <MoreInfoModal isOpen={isMoreInfoOpen} onClose={() => setIsMoreInfoOpen(false)} />

            </div>
          </div>
        </div>
      </section>

      {/* Posts Section */}
      <section
              id="posts"
              className="min-h-screen bg-fixed bg-cover bg-center"
              style={{
                backgroundImage: "url('https://cdn.pixabay.com/photo/2020/07/01/21/31/pelmeni-5361081_960_720.jpg')"
              }}
            >
              <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
                <div className="max-w-4xl mx-auto px-4 text-center">
                  <div className="flex items-center justify-center space-x-4 mb-8">
                    <h2 className="text-4xl font-bold text-[#003865] dark:text-white">{t('posts.title')}</h2>
                  </div>
                    <InstagramEmbed
                      url="https://www.instagram.com/p/DEALUtoIrXZ/"
                      width="100%" // Breite auf 100% setzen
                      maxWidth={600} // Optional: maxWidth für größere Bildschirme, um das Reel nicht zu groß zu machen
                    />                  
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
