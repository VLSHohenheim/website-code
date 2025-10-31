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

// Sommerfest Bilder

import sommerfest from './assets/sommerfest.jpg';
import mitgliedskarten from './assets/mitgliedskarten.jpg';

// Galerie-Komponente
export function RitterGallery() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const slides = [{ src: ritter1 }, { src: ritter2 }, { src: ritter3 }, { src: ritter4 }];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!open) {
      const timer = setInterval(() => setIndex(i => (i + 1) % slides.length), 5000);
      return () => clearInterval(timer);
    }
  }, [open, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setIndex(i => (i + 1) % slides.length);
    }
    if (touchEndX.current - touchStartX.current > 50) {
      setIndex(i => (i - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className="text-center flex flex-col h-full">
      <div
        className="relative max-w-3xl mx-auto cursor-pointer flex-1"
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
        <button
          onClick={e => {
            e.stopPropagation();
            setIndex((index - 1 + slides.length) % slides.length);
          }}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={e => {
            e.stopPropagation();
            setIndex((index + 1) % slides.length);
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
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
      <Lightbox open={open} close={() => setOpen(false)} slides={slides} plugins={[Thumbnails]} />
    </div>
  );
}

function App() {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Intersection Observer für automatisches Abspielen und Pausieren
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!videoRef.current) return;
          if (entry.isIntersecting) {
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Navbar */}
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(m => !m)}
        toggleLanguage={() => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')}
      />

      {/* Willkommen */}
      <section
        id="welcome"
        className="h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/29465326/pexels-photo-29465326/free-photo-of-dark-food-photography-with-berries-and-nuts.jpeg')",
        }}
      >
        <div className="h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">{t('welcome.title')}</h1>
            <p className="text-xl">{t('welcome.subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Über uns */}
      <section
        id="about"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.imgur.com/OrpB8Oj.jpeg')" }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#003865] dark:text-white">
              {t('about.title')}
            </h2>
            <p className="text-lg text-justify text-[#003865] dark:text-white">
              <Trans i18nKey="about.content" components={{ strong: <strong />, br: <br /> }} />
            </p>
          </div>
        </div>
      </section>

      {/* Aktuelles */}
      <section
        id="aktuelles"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/918328/pexels-photo-918328.jpeg')",
        }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
            <h2 className="text-4xl font-bold mb-12 text-[#003865] dark:text-white">
              {t('aktuelles.title')}
            </h2>
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-20">

              {/* 🚆 Tages-Exkursion nach Ulm */}
<div className="flex-1 flex flex-col mb-12 text-left">
  <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white min-h-[3rem]">
    🚆 Tages-Exkursion nach Ulm: Teva & Molkerei in Neu-Ulm
  </h3>
  <p className="text-lg text-justify mt-0 mb-6 text-[#003865] dark:text-white">
    📅 <strong>Dienstag, 25. November 2025 | 06:45 – ca. 19:00 Uhr</strong><br />
    📍 Treffpunkt: Bushaltestelle Universität Hohenheim<br />
    💬 Sprache: Deutsch
    <br /><br />
    Wir laden euch herzlich zu unserer nächsten Kombi-Exkursion ein!<br />
    Bald besuchen wir <strong>Teva (ratiopharm)</strong> in Ulm und anschließend eine
    <strong> Molkerei</strong> in Neu-Ulm. Euch erwarten spannende Einblicke in Produktion,
    Forschung und Karrierewege – von Pharma bis Lebensmitteltechnologie.
    <br /><br />
    Weitere Informationen zur Exkursion findet ihr im {' '}
    <a
      href="https://docs.google.com/document/d/1NP7MwyIEZbD-eG2Pm7jkE-KVzjpsKpOZO5yIBPkCYMA/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#003865] font-semibold underline hover:text-[#002845]"
    >
      Einladungsschreiben
    </a>!
    <br /><br />
    💰 <strong>Teilnahmebeitrag</strong><br />
    5 € Exkursionsbeitrag + optional 0–7 € für den Gruppentransfer<br />
    (Fördervereinsneumitglieder fahren kostenlos 🚆)
    <br /><br />
    🧭 <strong>Ablauf (Kurzüberblick)</strong><br />
    06:45 Uhr: Abfahrt in Hohenheim<br />
    Vormittag: Unternehmensbesuch bei Teva (ratiopharm)<br />
    Nachmittag: Führung durch eine große Molkerei in Neu-Ulm<br />
    ca. 19:00 Uhr: Ankunft zurück in Hohenheim
    <br /><br />
    🍱 <strong>Hinweis</strong><br />
    Bitte bringt ein Lunchpaket mit – ein Mittagsstopp ist nicht eingeplant.
    <br /><br />
    📝 <strong>Anmeldung</strong><br />
    👉 Jetzt anmelden über das{' '}
    <a
      href="https://forms.gle/ZFUvR6eWpuKcor1T7"
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#003865] font-semibold underline hover:text-[#002845]"
    >
      Google-Formular
    </a>.
  </p>
</div>
              
              {/* Stadtradeln */}
              <div className="flex-1 flex flex-col mb-12 text-left">
                <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white min-h-[3rem]">
                  {t('aktuelles.stadtradeln.title')}
                </h3>
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 flex-1">
                  <div className="flex-1">
                    <p className="text-lg text-justify mt-0 mb-4 text-[#003865] dark:text-white">
                      <Trans
                        i18nKey="aktuelles.stadtradeln.content"
                        components={{ strong: <strong />, br: <br /> }}
                      />
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center mt-8 lg:mt-0">
                    <div className="h-[500px] w-full max-w-[400px] rounded-lg shadow-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        src="https://i.imgur.com/JfMZUre.mp4"
                        controls
                        className="w-full h-full object-contain rounded-lg"
                        title="Stadtradeln Announcement Video"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Ritter-Exkursion */}
              <div className="flex-1 flex flex-col text-left">
                <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white min-h-[3rem]">
                  {t('aktuelles.excursion.title')}
                </h3>
                <p className="text-lg text-justify mt-0 mb-6 text-[#003865] dark:text-white">
                  <Trans
                    i18nKey="aktuelles.excursion.content"
                    components={{ br: <br />, strong: <strong /> }}
                  />
                </p>
                <div className="flex-1 flex flex-col">
                  <RitterGallery />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section
        id="posts"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cdn.pixabay.com/photo/2020/07/01/21/31/pelmeni-5361081_960_720.jpg')",
        }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#003865] dark:text-white">
              {t('posts.title')}
            </h2>
            <InstagramEmbed
              url="https://www.instagram.com/p/DEALUtoIrXZ/"
              width="100%"
              maxWidth={600}
            />
          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section
        id="contact"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/774448/pexels-photo-774448.jpeg')",
        }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8 text-[#003865] dark:text-white">
              {t('contact.title')}
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
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

      {/* Modale */}
      <ImpressumModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} />
      <MoreInfoModal isOpen={isMoreInfoOpen} onClose={() => setIsMoreInfoOpen(false)} />
    </div>
  );
}

export default App;
