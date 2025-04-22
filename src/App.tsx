import React, { useState, useEffect, useRef } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { Instagram, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import { InstagramEmbed } from 'react-social-media-embed';
import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// Eigene Komponenten
import Navbar from './components/Navbar';
import ContactForm from './components/ContactForm';
import ImpressumModal from './components/ImpressumModal';
import MoreInfoModal from './components/MoreInfoModal';

// Bilder für die Galerie
import ritter1 from './assets/ritter-exkursion-gruppenbild.jpeg';
import ritter2 from './assets/ritter-exkursion-bild2.jpg';
import ritter3 from './assets/ritter-exkursion-bild3.jpeg';
import ritter4 from './assets/ritter-exkursion-bild4.jpg';


// ✅ Bild-Galerie mit Slideshow, Touch-Swipe und Lightbox
export function RitterGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = [
    { src: ritter1 },
    { src: ritter2 },
    { src: ritter3 },
    { src: ritter4 },
  ];

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Automatischer Bildwechsel alle 5 Sekunden
  useEffect(() => {
    if (!open) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [open, slides.length]);

  // Swipe-Gesten-Erkennung für Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setIndex((prev) => (prev + 1) % slides.length); // links
    }
    if (touchEndX.current - touchStartX.current > 50) {
      setIndex((prev) => (prev - 1 + slides.length) % slides.length); // rechts
    }
  };

  return (
    <div className="text-center">
      {/* Galerie mit animiertem Slidewechsel */}
      <div
        className="relative max-w-3xl mx-auto cursor-pointer"
        onClick={() => setOpen(true)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="h-[500px] w-full bg-black bg-opacity-10 rounded-lg shadow-lg overflow-hidden relative">
          <div
            className="flex h-full w-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <img
                key={i}
                src={slide.src}
                alt={`Exkursionsbild ${i + 1}`}
                className="object-contain h-full w-full flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Navigationspfeile */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((index - 1 + slides.length) % slides.length);
          }}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((index + 1) % slides.length);
          }}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Punkte zur aktuellen Bildanzeige */}
      <div className="flex justify-center mt-3 space-x-2">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === index ? 'bg-[#003865]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Lightbox (vergrößerte Ansicht beim Klick) */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        plugins={[Thumbnails]}
      />
    </div>
  );
}


// ✅ Haupt-App-Komponente
function App() {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  // Theme Toggle (Dark/Light Mode)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navbar mit Theme- & Sprachumschaltung */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
      />

      {/* Willkommen-Sektion */}
      <section id="welcome" className="h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/29465326/pexels-photo-29465326/free-photo-of-dark-food-photography-with-berries-and-nuts.jpeg')" }}>
        <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{t('welcome.title')}</h1>
            <p className="text-xl">{t('welcome.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Über-uns-Sektion */}
      <section id="about" className="min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.imgur.com/OrpB8Oj.jpeg')" }}>
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#003865] dark:text-white">{t('about.title')}</h2>
            <p className="text-lg text-[#003865] dark:text-white">
              <Trans i18nKey="about.content" components={{ strong: <strong />, br: <br /> }} />
            </p>
          </div>
        </div>
      </section>

      {/* Aktuelles-Sektion mit Galerie */}
      <section id="aktuelles" className="min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/918328/pexels-photo-918328.jpeg')" }}>
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12 text-[#003865] dark:text-white">{t('aktuelles.title')}</h2>

              {/* Beitrag: Stadtradeln mit responsive Video */}
              <div className="mb-12 text-left">
                <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white">
                  {t('aktuelles.stadtradeln.title')}
                </h3>
              
                {/* Responsive Layout: Stack on mobile, side-by-side on desktop */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                  
                  {/* Text & Button */}
                  <div className="flex-1 mb-6 lg:mb-0">
                    <p className="text-lg mb-4 text-[#003865] dark:text-white">
                      <Trans i18nKey="aktuelles.stadtradeln.content" components={{ strong: <strong />, br: <br /> }} />
                    </p>
                    <a
                      href="https://www.stadtradeln.de/index.php?id=171&L=0&team_preselect=1796&subteam_preselect=7443"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-[#003865] text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-[#002845] transition"
                    >
                      {t('aktuelles.stadtradeln.button')}
                    </a>
                  </div>
              
                  {/* Video (responsive & schön eingebettet) */}
                  <div className="flex-1">
                    <div className="w-full aspect-video rounded-lg shadow-lg overflow-hidden">
                      <video
                        src="https://i.imgur.com/JfMZUre.mp4"
                        controls
                        className="w-full h-full object-cover rounded-lg"
                        title="Stadtradeln Announcement Video"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>


            {/* Beitrag: Ritter-Exkursion mit Galerie */}
            <div className="text-left">
              <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white">
                {t('aktuelles.excursion.title')}
              </h3>
              <p className="text-lg mb-6 text-[#003865] dark:text-white">
                <Trans i18nKey="aktuelles.excursion.content" components={{ br: <br />, strong: <strong /> }} />
              </p>
              <RitterGallery />
            </div>
          </div>
        </div>

      {/* Instagram-Einbindung in der Posts-Sektion */}
      <section id="posts" className="min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2020/07/01/21/31/pelmeni-5361081_960_720.jpg')" }}>
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-[#003865] dark:text-white mb-8">{t('posts.title')}</h2>
            <InstagramEmbed
              url="https://www.instagram.com/p/DEALUtoIrXZ/"
              width="100%"
              maxWidth={600}
            />
          </div>
        </div>
      </section>

      {/* Kontaktformular */}
      <section id="contact" className="min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.pexels.com/photos/774448/pexels-photo-774448.jpeg')" }}>
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#003865] dark:text-white">{t('contact.title')}</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer mit Impressum, Datenschutz und Social Links */}
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
                className="text-[#003865] dark:text-white hover:text-[#002845]"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="mailto:vls.hohenheim@gmail.com"
                className="text-[#003865] dark:text-white hover:text-[#002845]"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modale Fenster */}
      <ImpressumModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} />
      <MoreInfoModal isOpen={isMoreInfoOpen} onClose={() => setIsMoreInfoOpen(false)} />
    </div>
  );
}

export default App;
