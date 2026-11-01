import React from 'react';
import { ArrowRight } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface OurGallerySectionProps {
  gallery: GalleryPhoto[];
  onViewMoreGallery: () => void;
  onPhotoClick: (photo: GalleryPhoto) => void;
}

export const OurGallerySection: React.FC<OurGallerySectionProps> = ({
  gallery,
  onViewMoreGallery,
  onPhotoClick,
}) => {
  return (
    <section id="gallery-section" className="scroll-mt-20 sm:scroll-mt-24 bg-[#faf8f3] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc4]/60">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="h-[1px] w-8 sm:w-16 bg-[#ebb340]" />
            <h3 className="text-[24px] sm:text-[30px] font-serif font-bold text-[#1b2b23] whitespace-nowrap">
              Our Gallery
            </h3>
            <span className="h-[1px] w-8 sm:w-16 bg-[#ebb340]" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-normal">
            A glimpse of our restaurant & dining atmosphere
          </p>
        </div>

        {/* Gallery Grid (4 items on desktop & 2x2 on mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 mb-8">
          {gallery.slice(0, 4).map((photo) => (
            <div
              key={photo.id}
              onClick={() => onPhotoClick(photo)}
              className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#161618] border border-[#e5decb] shadow-xs hover:shadow-lg cursor-pointer group transition-all duration-300 relative"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
              />
              {/* Dark gradient overlay with photo title on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <p className="text-white text-xs sm:text-sm font-serif font-medium truncate drop-shadow-sm">
                  {photo.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center">
          <button
            onClick={onViewMoreGallery}
            className="inline-flex items-center gap-2 bg-[#0d4f32] hover:bg-[#083823] active:scale-95 text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <span>View More</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
};
