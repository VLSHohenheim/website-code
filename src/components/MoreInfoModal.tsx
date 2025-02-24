import React, { useEffect } from 'react';

const MoreInfoModal = ({ isOpen, onClose }) => {
  // Deaktiviere das Scrollen im Hintergrund, wenn das Modal geöffnet ist.
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
          Invitation to the upcoming company excursion to Ritter Sport
        </h2>
        
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          <strong>Dear Students,</strong><br />
          We are pleased to offer you the opportunity to participate in an exclusive company excursion to Alfred Ritter GmbH & Co. KG. This excursion provides fascinating insights into the Ritter Sport company, its production processes, and career opportunities.
        </p>

        <ul className="list-none space-y-2 text-gray-800 dark:text-gray-300">
          <li>📅 <strong>Date:</strong> Wednesday, April 9th</li>
          <li>🕘 <strong>Time:</strong> 9:30 AM – approx. 12:00 PM (Meeting point: 9:20 AM)</li>
          <li>📍 <strong>Location:</strong> Ritter Sport, Administration Reception Area</li>
          <li>🇬🇧 <strong>Language:</strong> English</li>
          <li>💰 <strong>Cost:</strong> 3€</li>
        </ul>

        <h3 className="text-xl font-semibold text-[#003865] dark:text-white mt-6">Excursion Schedule:</h3>
        <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-2">
          <li><strong>9:30 – 11:00 AM:</strong> Company tour (including company presentation and production visit)</li>
          <li><strong>11:00 – 11:30 AM:</strong> Discussion with the Head of Research & Development, Mr. Bernard Rocklage</li>
          <li><strong>11:30 AM – ~12:00 PM:</strong> Introduction to the HR department with insights into career opportunities</li>
        </ul>

        <p className="mt-6 text-gray-700 dark:text-gray-300">
          This excursion is a great opportunity to gain firsthand experience of a leading chocolate manufacturer, get exclusive insights into production processes, and build valuable connections for your future career.
        </p>

        <h3 className="text-xl font-semibold text-[#003865] dark:text-white mt-6">🔹 Registration:</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Please sign up as soon as possible via this 
          <a href="https://forms.gle/ng9m2FUAiRC57jfT8" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline"> Google Form</a>.
          Spaces are limited, so we recommend early registration.
        </p>

        <h3 className="text-xl font-semibold text-[#003865] dark:text-white mt-6">🔹 Travel Arrangements:</h3>
        <p className="text-gray-700 dark:text-gray-300">
          Participants are responsible for their own travel arrangements. We recommend a group trip starting from the University of Hohenheim bus station.<br />
          <strong>🚌 Meeting point:</strong> Bus stop Universität Hohenheim, 8:15 AM<br />
          <span className="italic">Public transport ticket price is not included in the registration fee.</span>
        </p>

        <p className="mt-6 text-gray-700 dark:text-gray-300">
          If you have any questions, feel free to contact us on Instagram or by mail 
          (<a href="mailto:vls.hohenheim@gmail.com" className="text-blue-500 underline">vls.hohenheim@gmail.com</a>).
        </p>

        <p className="mt-6 text-gray-700 dark:text-gray-300">
          <strong>Best regards and see you there,</strong><br />
          Constantin von Conradi<br />
          Chairman of the Board, VLS Hohenheim
        </p>
      </div>
    </div>
  );
};

export default MoreInfoModal;
