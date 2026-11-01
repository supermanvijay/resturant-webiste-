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

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const prevReview = () => {
    setReviewIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setReviewIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      nextReview();
    } else if (distance < -40) {
      prevReview();
    }
  };

  const activeMobileReview = reviews[reviewIndex % reviews.length] || reviews[0];

  const desktopReviews = reviews.length > 0
    ? [
        reviews[reviewIndex % reviews.length],
        reviews[(reviewIndex + 1) % reviews.length],
        reviews[(reviewIndex + 2) % reviews.length],
      ].filter(Boolean)
    : [];

  const renderReviewCard = (rev: Review, isMobileSingle: boolean = false) => (
    <div
      key={rev.id}
      className={`bg-white rounded-2xl border border-[#ede5d6] shadow-xs hover:shadow-md transition-all duration-300 text-center flex flex-col items-center justify-between ${
        isMobileSingle
          ? 'w-[220px] min-h-[210px] p-4 mx-auto'
          : 'w-full min-h-[190px] p-3 sm:p-3.5'
      }`}
    >
      {/* Avatar with circular frame */}
      <div
        className={`${
          isMobileSingle ? 'w-14 h-14' : 'w-12 h-12'
        } rounded-full p-[1.5px] border border-gray-200 mb-1.5 overflow-hidden bg-gray-100 flex-shrink-0 shadow-xs`}
      >
        <img
          src={rev.avatar}
          alt={rev.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Gold horizontal underline accent */}
      <div className="w-8 h-[1.5px] bg-[#ebb340] mb-1.5" />

      <h4
        className={`font-bold ${
          isMobileSingle ? 'text-sm' : 'text-xs'
        } text-gray-900 truncate w-full mb-1`}
      >
        {rev.name}
      </h4>

      {/* 5 Gold Stars */}
      <div className="flex items-center justify-center gap-0.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${
              isMobileSingle ? 'w-3.5 h-3.5' : 'w-3 h-3'
            } fill-[#ebb340] text-[#ebb340]`}
          />
        ))}
      </div>

      {/* Customer Comment */}
      <p
        className={`${
          isMobileSingle ? 'text-xs' : 'text-[11px]'
        } text-gray-600 italic line-clamp-3 leading-relaxed`}
      >
        "{rev.comment}"
      </p>
    </div>
  );

  return (
    <section className="bg-[#faf8f3] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc4]/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Our Gallery (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="h-[1px] w-8 sm:w-16 bg-[#ebb340]" />
                <h3 className="text-[22px] sm:text-[27px] font-serif font-bold text-[#1b2b23] whitespace-nowrap">
                  Our Gallery
                </h3>
                <span className="h-[1px] w-8 sm:w-16 bg-[#ebb340]" />
              </div>
              <p className="text-xs text-gray-600 font-normal">
                A glimpse of our restaurant
              </p>
            </div>

            {/* 4 Gallery Photos in 2 rows x 2 cols (larger image display) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
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
                  {/* Subtle dark gradient overlay with photo title on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5 sm:p-3.5">
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
                className="inline-flex items-center gap-2 bg-[#0d4f32] hover:bg-[#083823] text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95"
              >
                <span>View More</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Customer Reviews (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="h-[1px] w-8 sm:w-16 bg-[#ebb340]" />
                <h3 className="text-[22px] sm:text-[27px] font-serif font-bold text-[#b8860b] whitespace-nowrap">
                  Customer Reviews
                </h3>
                <span className="h-[1px] w-8 sm:w-16 bg-[#ebb340]" />
              </div>
              <p className="text-xs text-gray-600 font-normal">
                What our customers say
              </p>
            </div>

            {/* MOBILE VIEW: Exactly ONE Review Card matching desktop card size */}
            <div className="block sm:hidden">
              <div className="relative flex items-center justify-center gap-3">
                {/* Left Arrow Button */}
                <button
                  onClick={prevReview}
                  aria-label="Previous review"
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Single desktop-sized card with touch swipe */}
                <div
                  className="flex-1 flex justify-center touch-pan-y"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {activeMobileReview && renderReviewCard(activeMobileReview, true)}
                </div>

                {/* Right Arrow Button */}
                <button
                  onClick={nextReview}
                  aria-label="Next review"
                  className="w-8 h-8 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* DESKTOP VIEW: 3 Review Cards in Row */}
            <div className="hidden sm:flex items-center justify-center gap-2.5">
              {/* Left Arrow */}
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="w-7 h-7 rounded-full bg-white border border-gray-300 shadow-xs hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* 3 Review Cards in Row */}
              <div className="grid grid-cols-3 gap-2.5 sm:gap-3 flex-1">
                {desktopReviews.map((rev) => renderReviewCard(rev, false))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextReview}
                aria-label="Next review"
                className="w-7 h-7 rounded-full bg-white border border-gray-300 shadow-xs hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Slider Dots */}
            <div className="flex items-center justify-center gap-2 mt-5">
              {reviews.map((_, dot) => (
                <button
                  key={dot}
                  onClick={() => setReviewIndex(dot)}
                  aria-label={`Go to review ${dot + 1}`}
                  className={`rounded-full transition-all cursor-pointer ${
                    dot === reviewIndex
                      ? 'w-4 h-2 bg-[#ebb340]'
                      : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
