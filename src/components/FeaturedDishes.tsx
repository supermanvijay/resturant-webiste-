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

  // Card dimensions: increased by 10%
  const isMobile = containerWidth < 640;
  const cardWidth = isMobile ? 238 : 265;
  const gap = isMobile ? 14 : 18;

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
        {/* Section Header with 20% larger heading */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <div className="flex items-center justify-center gap-3 sm:gap-5 mb-2 max-w-full">
            <span className="h-[1.5px] w-8 sm:w-20 md:w-28 bg-[#ebb340] shrink-0" />
            <h2 className="text-xl min-[360px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#1b2b23] whitespace-nowrap tracking-tight sm:tracking-normal">
              Our <span className="text-[#0e5836]">Featured Dishes</span>
            </h2>
            <span className="h-[1.5px] w-8 sm:w-20 md:w-28 bg-[#ebb340] shrink-0" />
          </div>
          {/* Subtitle with & symbol */}
          <p className="text-sm sm:text-base text-gray-600 font-normal">
            A perfect blend of tradition &amp; taste
          </p>
        </div>
      </div>

      {/* Full-width Carousel Attached to Corners without white covers */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left Arrow Button Attached to the Left Corner */}
        <button
          onClick={handlePrev}
          aria-label="Previous featured dish"
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0d0d0f]/90 hover:bg-[#0e5836] text-[#e5be82] hover:text-white border border-[#ebb340]/80 shadow-[0_4px_18px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all cursor-pointer active:scale-90 backdrop-blur-xs"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {/* Carousel Track Container (Attached to Corners, White Covers Removed) */}
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
                      : 'transform scale-[0.92] opacity-80 hover:opacity-100 cursor-pointer'
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

        {/* Right Arrow Button Attached to the Right Corner */}
        <button
          onClick={handleNext}
          aria-label="Next featured dish"
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0d0d0f]/90 hover:bg-[#0e5836] text-[#e5be82] hover:text-white border border-[#ebb340]/80 shadow-[0_4px_18px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all cursor-pointer active:scale-90 backdrop-blur-xs"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Pagination Dots (Dishes count and dish names removed as requested) */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 max-w-7xl mx-auto px-4">
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
    </section>
  );
};
