import React from 'react';

interface ImpressumModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ImpressumModal: React.FC<ImpressumModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-[#003865] dark:text-white">Impressum</h2>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>Vereinigung Lebensmittelwissenschaftlicher Studierender n.e.V.</p>
          <p>Vorstandsvorsitzender: Constantin von Conradi</p>
          <p>Egilolfstr. 7</p>
          <p>70599 Stuttgart</p>
          <p>Deutschland</p>
          <p>E-Mail: vls.hohenheim@gmail.com</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 bg-[#003865] text-white px-4 py-2 rounded hover:bg-[#002845] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImpressumModal;