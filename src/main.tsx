import './i18n/translations'; // oder wo auch immer du i18n initialisierst
import React from 'react';
import { createRoot } from 'react-dom/client';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from './i18n/translations';
import App from './App';
import './index.css';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translations.en },
      de: { translation: translations.de },
    },
    lng: 'de',
    fallbackLng: 'de',
    interpolation: {
      escapeValue: false,
    },
  });

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
