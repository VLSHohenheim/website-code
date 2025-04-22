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
  const slides = [{ src: ritter1 }, { src: ritter2 }, { src: ritter3 }, { src: ritter4 }];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (!open) {
      const timer = setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [open, slides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      setIndex((i) => (i + 1) % slides.length);
    } else if (touchEndX.current - touchStartX.current > 50) {
      setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div className="text-center">
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
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((i) => (i - 1 + slides.length) % slides.length);
          }}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIndex((i) => (i + 1) % slides.length);
          }}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition"
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

  // Ref fürs Video
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play / pause via Intersection Observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) video.play();
          else video.pause();
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode((m) => !m);
  const toggleLanguage = () => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en');

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} toggleLanguage={toggleLanguage} />

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
            <h2 className="text-4xl font-bold mb-8 text-[#003865] dark:text-white">{t('about.title')}</h2>
            <p className="text-lg text-[#003865] dark:text-white">
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
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12 text-[#003865] dark:text-white">
              {t('aktuelles.title')}
            </h2>

            {/* Zwei Blöcke nebeneinander auf Desktop, untereinander auf Mobile */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              {/* Block 1: Stadtradeln */}
              <div className="flex-1 mb-8 lg:mb-0 text-left">
                <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white">
                  {t('aktuelles.stadtradeln.title')}
                </h3>
                <p className="text-lg mb-4 text-[#003865] dark:text-white">
                  <Trans
                    i18nKey="aktuelles.stadtradeln.content"
                    components={{ strong: <strong />, br: <br /> }}
                  />
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

              {/* Block 2: Ritter-Exkursion */}
              <div className="flex-1 text-left">
                <h3 className="text-2xl font-semibold mb-4 text-[#003865] dark:text-white">
                  {t('aktuelles.excursion.title')}
                </h3>
                <p className="text-lg mb-6 text-[#003865] dark:text-white">
                  <Trans
                    i18nKey="aktuelles.excursion.content"
                    components={{ br: <br />, strong: <strong /> }}
                  />
                </p>
                <RitterGallery />
              </div>
            </div>

            {/* Video unter den beiden Blöcken */}
            <div className="mt-12">
              <div className="w-full rounded-lg shadow-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src="https://i.imgur.com/JfMZUre.mp4"
                  controls
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg"
                  style={{ aspectRatio: '9 / 16' }}
                  title="Stadtradeln Announcement Video"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram-Posts */}
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
            <h2 className="text-4xl font-bold text-[#003865] dark:text-white mb-8">
              {t('posts.title')}
            </h2>
            <InstagramEmbed url="https://www.instagram.com/p/DEALUtoIrXZ/" width="100%" maxWidth={600} />
          </div>
        </div>
      </section>

      {/* Kontaktformular */}
      <section
        id="contact"
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/774448/pexels-photo-774448.jpeg')",
        }}
      >
        <div className="h-full py-20 flex items-center justify-center bg-white bg-opacity-90 dark:bg-gray-900 dark:bg-opacity-90">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8 text-center text-[#003865] dark:text-white">
              {t('contact.title')}
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#003865] text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2025 Rittergruppe. {t('footer.rights')}</p>
          <div className="flex justify-center mt-4 space-x-6">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="mailto:contact@domain.com">
              <Mail className="w-6 h-6" />
            </a>
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
