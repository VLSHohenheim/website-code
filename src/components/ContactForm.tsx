import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:vls.hohenheim@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFormValid = Object.values(formData).every(value => value);

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[#003865] dark:text-white">
          {t('contact.name')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003865] focus:ring-[#003865] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#003865] dark:text-white">
          {t('contact.email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003865] focus:ring-[#003865] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-[#003865] dark:text-white">
          {t('contact.subject')}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003865] focus:ring-[#003865] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[#003865] dark:text-white">
          {t('contact.message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#003865] focus:ring-[#003865] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.message}
          onChange={handleChange}
        />
      </div>

      {/* Button immer anzeigen, aber deaktiviert, wenn Formular nicht vollständig ist */}
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full py-2 px-4 rounded-md transition-colors ${
          isFormValid
            ? 'bg-[#003865] text-white hover:bg-[#002845]' // Wenn alle Felder ausgefüllt sind
            : 'bg-[#A0AEC0] text-gray-700 cursor-not-allowed' // Wenn nicht alle Felder ausgefüllt sind
        }`}
      >
        {t('contact.send')}
      </button>
    </form>
  );
};

export default ContactForm;
