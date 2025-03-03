import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const MoreInfoModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(); // useTranslation Hook verwenden

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl overflow-y-auto max-h-[90vh] modal-scroll relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-[#003865] dark:text-white mb-4 text-center">
          {t('modal.title')}
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <strong>{t('modal.greeting')}</strong><br />
          {t('modal.description')}
        </p>

        <ul className="list-none space-y-2 text-gray-800 dark:text-gray-300">
          <li>📅 <strong>{t('modal.date')}:</strong> {t('modal.dateDetail')}</li>
          <li>🕘 <strong>{t('modal.time')}:</strong> {t('modal.timeDetail')}</li>
          <li>📍 <strong>{t('modal.location')}:</strong> {t('modal.locationDetail')}</li>
          <li>🇬🇧 <strong>{t('modal.language')}:</strong> {t('modal.languageDetail')}</li>
          <li>💰 <strong>{t('modal.cost')}:</strong> {t('modal.costDetail')}</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#003865] dark:text-white mt-6">{t('modal.scheduleTitle')}</h3>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li>{t('modal.schedule1')}</li>
          <li>{t('modal.schedule2')}</li>
          <li>{t('modal.schedule3')}</li>
        </ul>

        <p className="mt-6 text-gray-700 dark:text-gray-300">{t('modal.closing')}</p>

        <h3 className="text-xl font-semibold text-[#003865] dark:text-white mt-6">{t('modal.registrationTitle')}</h3>
        <p className="text-gray-700 dark:text-gray-300">
          {t('modal.registrationDescription')}
          <a href="https://forms.gle/ng9m2FUAiRC57jfT8" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
            {t('modal.registrationLink')}
          </a>
        </p>

        <h3 className="text-xl font-semibold text-[#003865] dark:text-white mt-6">{t('modal.travelTitle')}</h3>
        <p className="text-gray-700 dark:text-gray-300">{t('modal.travelDescription')}</p>

        <p className="mt-6 text-gray-700 dark:text-gray-300">
          {t('modal.contact')}
          <a href="mailto:vls.hohenheim@gmail.com" className="text-blue-500 underline"> vls.hohenheim@gmail.com</a>.
        </p>

        <p className="mt-6 text-gray-700 dark:text-gray-300">
          <strong>{t('modal.greetings')}</strong><br />
          Constantin von Conradi<br />
          {t('modal.signature')}
        </p>
      </div>
    </div>
  );
};

export default MoreInfoModal;
