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
      setIndex((prev - 1 + slides.length) % slides.length); // rechts
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
      {/* Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        toggleLanguage={toggleLanguage}
      />

      {/* Willkommen-Sektion */}
      <section id="welcome">
        {/* Inhalt */}
      </section>

      {/* Über-uns-Sektion */}
      <section id="about">
        {/* Inhalt */}
      </section>

      {/* Aktuelles-Sektion */}
      <section id="aktuelles">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-12">{t('aktuelles.title')}</h2>

          <div className="flex flex-col lg:flex-row lg:space-x-12">
            <div className="flex-1">
              {/* Stadtradeln */}
            </div>
            <div className="flex-1">
              {/* Ritter Exkursion */}
            </div>
          </div>
        </div>
      </section>

      <footer>{/* Footer-Inhalt */}</footer>
    </div>
  );
}

export default App;
