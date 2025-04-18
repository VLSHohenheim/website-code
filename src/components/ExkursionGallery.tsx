import React, { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import gruppenbild from '../assets/ritter-exkursion-gruppenbild.jpeg';
import bild2 from '../assets/ritter-exkursion-bild2.jpg';
import bild3 from '../assets/ritter-exkursion-bild3.jpeg';
import bild4 from '../assets/ritter-exkursion-bild4.jpg';

const images = [gruppenbild, bild2, bild3, bild4];

export default function ExkursionGallery() {
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const nextIndex = (index + 1) % images.length;
  const prevIndex = (index + images.length - 1) % images.length;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Bild-Container */}
      <div className="relative">
        <img
          src={images[index]}
          alt={`Exkursion Bild ${index + 1}`}
          className="w-full h-auto object-contain rounded-lg shadow-lg cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        />

        <button
          onClick={() => setIndex(prevIndex)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setIndex(nextIndex)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-60 hover:bg-opacity-90 rounded-full p-2"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Pagination-Punkte */}
      <div className="flex justify-center space-x-2 mt-4">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === index ? 'bg-[#003865]' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          mainSrc={images[index]}
          nextSrc={images[nextIndex]}
          prevSrc={images[prevIndex]}
          onCloseRequest={() => setLightboxOpen(false)}
          onMovePrevRequest={() => setIndex(prevIndex)}
          onMoveNextRequest={() => setIndex(nextIndex)}
          reactModalStyle={{ overlay: { zIndex: 2000 } }}
          toolbarButtons={[
            <button key="close" onClick={() => setLightboxOpen(false)}>
              <X size={24} color="white" />
            </button>
          ]}
        />
      )}
    </div>
  );
}
