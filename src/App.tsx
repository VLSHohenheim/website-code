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

export function RitterGallery() {
  // ... unverändert
}

function App() {
  const { t, i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isImpressumOpen, setIsImpressumOpen] = useState(false);
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(m => !m)}
        toggleLanguage={() => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')}
      />

      {/* alle anderen Sektionen hier wie gehabt, z.B. Willkommen, Über uns ... */}

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
          {/* Nur hier großzügiges Padding */}
          <div className="max-w-8xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center">
            <h2 className="text-4xl font-bold mb-12 text-[#003865] dark:text-white">
              {t('aktuelles.title')}
            </h2>

            <div className="flex flex-col lg:flex-row lg:items-stretch lg:space-x-20">
              {/* Stadtradeln */}
              <div className="flex-1 flex flex-col mb-12 lg:mb-0 text-left lg:-mt-6">
                {/* Einheitliche Überschriftshöhe */}
                <h3 className="text-2xl font-semibold text-[#003865] dark:text-white mb-0 min-h-[3rem]">
                  {t('aktuelles.stadtradeln.title')}
                </h3>
                {/* Abstand auf ein Minimum reduziert */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8 flex-1">
                  <div className="flex-1">
                    <p className="text-lg mt-0 mb-4 text-[#003865] dark:text-white">
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
                  <div className="flex-1 flex justify-center">
                    <div className="h-[500px] w-full max-w-[400px] rounded-lg shadow-lg overflow-hidden">
                      <video
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
              <div className="flex-1 flex flex-col text-left lg:pt-6">
                {/* Einheitliche Überschriftshöhe */}
                <h3 className="text-2xl font-semibold text-[#003865] dark:text-white mb-0 min-h-[3rem]">
                  {t('aktuelles.excursion.title')}
                </h3>
                <p className="text-lg mb-6 text-[#003865] dark:text-white">
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

      {/* alle weiteren Sektionen wie Posts, Kontakt, Footer ... */}

      <ImpressumModal isOpen={isImpressumOpen} onClose={() => setIsImpressumOpen(false)} />
      <MoreInfoModal isOpen={isMoreInfoOpen} onClose={() => setIsMoreInfoOpen(false)} />
    </div>
  );
}

export default App;
