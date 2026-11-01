import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FoodCard } from './FoodCard';
import { FoodItem } from '../types';

interface FeaturedDishesProps {
  dishes: FoodItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (dish: FoodItem) => void;
  onAddToCart: (dish: FoodItem) => void;
}

export const FeaturedDishes: React.FC<FeaturedDishesProps> = ({
  dishes,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onAddToCart,
}) => {
  const featured = dishes.filter((d) => d.isFeatured);
  const activeDishes = featured.length > 0 ? featured : dishes.slice(0, 5);
  const count = activeDishes.length;

  // Tripled list for seamless infinite circular scrolling that reaches both corners
  const displayDishes = useMemo(() => {
    return [...activeDishes, ...activeDishes, ...activeDishes];
  }, [activeDishes]);

  // Start in the center set
  const [displayIndex, setDisplayIndex] = useState(count);

  // Container width measurement
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1000);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Card dimensions: ~30% smaller than original
  const isMobile = containerWidth < 640;
  const cardWidth = isMobile ? 215 : 240;
  const gap = isMobile ? 12 : 16;

  // Navigation handlers
  const handlePrev = () => {
    setDisplayIndex((prev) => {
      const next = prev - 1;
      return next < count ? next + count : next;
    });
  };

  const handleNext = () => {
    setDisplayIndex((prev) => {
      const next = prev + 1;
      return next >= count * 2 ? next - count : next;
    });
  };

  // Drag & Swipe support (mouse and touch)
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    setDragOffset(currentX - dragStartX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 35;
    if (dragOffset < -threshold) {
      handleNext();
    } else if (dragOffset > threshold) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 35;
    if (dragOffset < -threshold) {
      handleNext();
    } else if (dragOffset > threshold) {
      handlePrev();
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Center active card in container
  const activeCenter = displayIndex * (cardWidth + gap) + cardWidth / 2;
  const translateX = (containerWidth / 2) - activeCenter + dragOffset;

  const currentDish = activeDishes[displayIndex % count] || activeDishes[0];

  return (
    <section className="bg-[#faf8f3] py-14 border-b border-[#ebdcc4]/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 px-2">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-1.5 max-w-full">
            <span className="h-[1px] w-5 sm:w-16 md:w-20 bg-[#ebb340] shrink-0" />
            <h2 className="text-base min-[360px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1b2b23] whitespace-nowrap tracking-tight sm:tracking-normal">
              Our <span className="text-[#0e5836]">Featured Dishes</span>
            </h2>
            <span className="h-[1px] w-5 sm:w-16 md:w-20 bg-[#ebb340] shrink-0" />
          </div>
          {/* Subtitle with & symbol */}
          <p className="text-xs sm:text-sm text-gray-600 font-normal">
            A perfect blend of tradition &amp; taste
          </p>
        </div>
      </div>

      {/* Full-width Carousel Attached to the Left and Right Corners */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left Arrow Button Attached to the Left Corner */}
        <button
          onClick={handlePrev}
          aria-label="Previous featured dish"
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0d0d0f]/90 hover:bg-[#0e5836] text-[#e5be82] hover:text-white border border-[#ebb340]/80 shadow-[0_4px_18px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all cursor-pointer active:scale-90 backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Left Corner Subtle Soft Vignette */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-r from-[#faf8f3] via-[#faf8f3]/80 to-transparent pointer-events-none z-20" />

        {/* Carousel Track Container (Attached to Corners) */}
        <div
          ref={containerRef}
          className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing py-3"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)',
              gap: `${gap}px`,
            }}
            className="flex items-center flex-nowrap"
          >
            {displayDishes.map((dish, idx) => {
              const isActive = idx === displayIndex;
              return (
                <div
                  key={`${dish.id}-${idx}`}
                  onClick={() => {
                    if (!isActive) {
                      setDisplayIndex(idx);
                    }
                  }}
                  style={{ width: `${cardWidth}px` }}
                  className={`flex-shrink-0 transition-all duration-300 select-none ${
                    isActive
                      ? 'transform scale-100 opacity-100 z-10 shadow-[0_16px_36px_rgba(0,0,0,0.65)] ring-1 ring-[#ebb340]/40 rounded-[18px]'
                      : 'transform scale-[0.88] opacity-50 hover:opacity-80 cursor-pointer filter brightness-90'
                  }`}
                >
                  <FoodCard
                    dish={dish}
                    isFavorite={favorites.includes(dish.id)}
                    onToggleFavorite={onToggleFavorite}
                    onOpenDetails={onOpenDetails}
                    onAddToCart={onAddToCart}
                    compact={true}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Corner Subtle Soft Vignette */}
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 lg:w-24 bg-gradient-to-l from-[#faf8f3] via-[#faf8f3]/80 to-transparent pointer-events-none z-20" />

        {/* Right Arrow Button Attached to the Right Corner */}
        <button
          onClick={handleNext}
          aria-label="Next featured dish"
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0d0d0f]/90 hover:bg-[#0e5836] text-[#e5be82] hover:text-white border border-[#ebb340]/80 shadow-[0_4px_18px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all cursor-pointer active:scale-90 backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Pagination Dots & Dish Status Counter */}
      <div className="flex flex-col items-center justify-center gap-2 mt-4 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center gap-1.5 sm:gap-2">
          {activeDishes.map((d, idx) => {
            const isDotActive = (displayIndex % count) === idx;
            return (
              <button
                key={d.id}
                onClick={() => setDisplayIndex(count + idx)}
                aria-label={`View ${d.name}`}
                className={`rounded-full transition-all cursor-pointer ${
                  isDotActive
                    ? 'w-6 h-2 bg-[#0e5836]'
                    : 'w-2 h-2 bg-[#ebdcc4] hover:bg-[#ebb340]'
                }`}
              />
            );
          })}
        </div>
        <p className="text-[11px] sm:text-xs text-gray-500 font-medium">
          Dish <span className="font-bold text-[#0e5836]">{(displayIndex % count) + 1}</span> of {count}
          <span className="mx-1.5 text-gray-300">•</span>
          <span className="text-[#0e5836] font-semibold">{currentDish?.name}</span>
        </p>
      </div>
    </section>
  );
};
