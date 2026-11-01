import React, { useState } from 'react';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  gallery: GalleryPhoto[];
  selectedPhoto?: GalleryPhoto | null;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  gallery,
  selectedPhoto: initialSelected,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeImage, setActiveImage] = useState<GalleryPhoto | null>(initialSelected || null);

  if (!isOpen) return null;

  const categories = ['All', 'Ambiance', 'Special Dishes', 'Beverages', 'Interior'];

  const filteredPhotos = gallery.filter(
    (photo) => activeCategory === 'All' || photo.category === activeCategory
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#faf8f3] text-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#ebdcc4] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#051810] text-white p-5 flex items-center justify-between border-b border-[#0f3627]">
          <div className="flex items-center gap-2.5">
            <ImageIcon className="w-5 h-5 text-[#ebb340]" />
            <h3 className="font-serif font-bold text-xl text-white">
              Royal Bites Visual Gallery
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="p-4 bg-white border-b border-[#ebdcc4] flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#0d4f32] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActiveImage(photo)}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-gray-200 border border-[#e5ded0] cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-center">
                  <div className="text-white space-y-1">
                    <ZoomIn className="w-6 h-6 mx-auto text-[#ebb340]" />
                    <p className="font-semibold text-xs">{photo.title}</p>
                    <span className="text-[10px] text-gray-300">{photo.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Overlay for Enlarged Photo */}
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <div className="relative max-w-3xl max-h-[85vh] bg-black rounded-2xl overflow-hidden border border-white/20 p-2">
              <img
                src={activeImage.image}
                alt={activeImage.title}
                className="w-full h-auto max-h-[75vh] object-contain rounded-xl"
              />
              <div className="p-3 text-white flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">{activeImage.title}</h4>
                  <p className="text-xs text-gray-400">{activeImage.category}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveImage(null);
                  }}
                  className="px-3 py-1 bg-white/20 hover:bg-white/30 text-xs rounded-full cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
