import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Review, GalleryPhoto } from '../types';

interface ReviewsAndGalleryProps {
  reviews: Review[];
  gallery: GalleryPhoto[];
  onViewMoreGallery: () => void;
  onPhotoClick: (photo: GalleryPhoto) => void;
}

export const ReviewsAndGallery: React.FC<ReviewsAndGalleryProps> = ({
  reviews,
  gallery,
  onViewMoreGallery,
  onPhotoClick,
}) => {
  const [reviewIndex, setReviewIndex] = useState(0);

  const prevReview = () => {
    setReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="bg-[#faf8f3] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc4]/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Customer Reviews (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="h-[1px] w-10 sm:w-16 bg-[#ebb340]" />
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1b2b23]">
                  Customer Reviews
                </h3>
                <span className="h-[1px] w-10 sm:w-16 bg-[#ebb340]" />
              </div>
              <p className="text-xs text-gray-600 font-normal">
                What our customers say
              </p>
            </div>

            {/* Slider with arrows and review cards */}
            <div className="relative flex items-center justify-center gap-2">
              {/* Left Arrow */}
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="w-7 h-7 rounded-full bg-white border border-gray-300 shadow-xs hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* 3 Review Cards in Row */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 flex-1">
                {reviews.slice(0, 3).map((rev, idx) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-xl p-3 border border-[#ede5d6] shadow-xs hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-between"
                  >
                    {/* Avatar with circular frame */}
                    <div className="w-12 h-12 rounded-full p-[1.5px] border border-gray-200 mb-1.5 overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={rev.avatar}
                        alt={rev.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    {/* Green horizontal underline accent */}
                    <div className="w-8 h-[1.5px] bg-[#0d4f32] mb-1.5" />

                    <h4 className="font-bold text-xs text-gray-900 truncate w-full mb-1">
                      {rev.name}
                    </h4>

                    {/* 5 Gold Stars */}
                    <div className="flex items-center justify-center gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-[#ebb340] text-[#ebb340]"
                        />
                      ))}
                    </div>

                    {/* Customer Comment */}
                    <p className="text-[11px] text-gray-600 italic line-clamp-3 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextReview}
                aria-label="Next review"
                className="w-7 h-7 rounded-full bg-white border border-gray-300 shadow-xs hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className={`rounded-full transition-all ${
                    dot === reviewIndex
                      ? 'w-2.5 h-2.5 bg-[#ebb340]'
                      : 'w-2 h-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Our Gallery (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="h-[1px] w-10 sm:w-16 bg-[#ebb340]" />
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1b2b23]">
                  Our Gallery
                </h3>
                <span className="h-[1px] w-10 sm:w-16 bg-[#ebb340]" />
              </div>
              <p className="text-xs text-gray-600 font-normal">
                A glimpse of our restaurant
              </p>
            </div>

            {/* 4 Gallery Photos Row */}
            <div className="grid grid-cols-4 gap-2.5 mb-6">
              {gallery.slice(0, 4).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => onPhotoClick(photo)}
                  className="aspect-[4/3] rounded-xl overflow-hidden bg-gray-200 border border-[#e5decb] shadow-xs hover:shadow-md cursor-pointer group transition-all duration-300"
                >
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>

            {/* View More Button */}
            <div className="flex justify-center">
              <button
                onClick={onViewMoreGallery}
                className="inline-flex items-center gap-2 bg-[#0d4f32] hover:bg-[#083823] text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>View More</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
