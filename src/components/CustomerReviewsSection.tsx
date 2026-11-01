import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Review } from '../types';

interface CustomerReviewsSectionProps {
  reviews: Review[];
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({ reviews }) => {
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
          ? 'w-[230px] min-h-[220px] p-5 mx-auto'
          : 'w-full min-h-[200px] p-4 sm:p-5'
      }`}
    >
      {/* Avatar with circular frame */}
      <div
        className={`${
          isMobileSingle ? 'w-14 h-14' : 'w-14 h-14'
        } rounded-full p-[1.5px] border border-gray-200 mb-2 overflow-hidden bg-gray-100 flex-shrink-0 shadow-xs`}
      >
        <img
          src={rev.avatar}
          alt={rev.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Gold horizontal underline accent */}
      <div className="w-8 h-[1.5px] bg-[#ebb340] mb-2" />

      <h4
        className={`font-bold ${
          isMobileSingle ? 'text-sm' : 'text-sm sm:text-base'
        } text-gray-900 truncate w-full mb-1`}
      >
        {rev.name}
      </h4>

      {/* 5 Gold Stars */}
      <div className="flex items-center justify-center gap-0.5 mb-2.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`${
              isMobileSingle ? 'w-3.5 h-3.5' : 'w-3.5 h-3.5'
            } fill-[#ebb340] text-[#ebb340]`}
          />
        ))}
      </div>

      {/* Customer Comment */}
      <p
        className={`${
          isMobileSingle ? 'text-xs' : 'text-xs sm:text-sm'
        } text-gray-600 italic line-clamp-3 leading-relaxed`}
      >
        "{rev.comment}"
      </p>
    </div>
  );

  return (
    <section id="reviews-section" className="scroll-mt-20 sm:scroll-mt-24 bg-[#faf8f3] py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc4]/60">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-1">
            <span className="h-[1px] w-8 sm:w-16 bg-[#ebb340]" />
            <h3 className="text-[24px] sm:text-[30px] font-serif font-bold text-[#b8860b] whitespace-nowrap">
              Customer Reviews
            </h3>
            <span className="h-[1px] w-8 sm:w-16 bg-[#ebb340]" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-normal">
            What our cherished guests say about their experience
          </p>
        </div>

        {/* MOBILE VIEW: Exactly ONE Review Card matching desktop card size */}
        <div className="block sm:hidden">
          <div className="relative flex items-center justify-center gap-3">
            {/* Left Arrow Button */}
            <button
              onClick={prevReview}
              aria-label="Previous review"
              className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5" />
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
              className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-sm hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* DESKTOP VIEW: 3 Review Cards in Row */}
        <div className="hidden sm:flex items-center justify-center gap-4">
          {/* Left Arrow */}
          <button
            onClick={prevReview}
            aria-label="Previous review"
            className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-xs hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* 3 Review Cards in Row */}
          <div className="grid grid-cols-3 gap-4 sm:gap-5 flex-1">
            {desktopReviews.map((rev) => renderReviewCard(rev, false))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextReview}
            aria-label="Next review"
            className="w-9 h-9 rounded-full bg-white border border-gray-300 shadow-xs hover:bg-gray-100 flex items-center justify-center text-gray-700 flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slider Dots */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {reviews.map((_, dot) => (
            <button
              key={dot}
              onClick={() => setReviewIndex(dot)}
              aria-label={`Go to review ${dot + 1}`}
              className={`rounded-full transition-all cursor-pointer ${
                dot === reviewIndex
                  ? 'w-5 h-2 bg-[#ebb340]'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
