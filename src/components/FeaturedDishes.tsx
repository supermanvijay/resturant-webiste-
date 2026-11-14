import React, { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FoodCard } from './FoodCard';
import { Reveal } from './Reveal';
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

  // Repeated list for seamless infinite circular scrolling without rewinding
  const baseIndex = count > 1 ? count * 2 : 0;

  const displayDishes = useMemo(() => {
    if (count === 0) return [];
    if (count === 1) return activeDishes;
    return [
      ...activeDishes,
      ...activeDishes,
      ...activeDishes,
      ...activeDishes,
      ...activeDishes,
    ];
  }, [activeDishes, count]);

  // Start in the center set
  const [displayIndex, setDisplayIndex] = useState(baseIndex);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const didDragRef = useRef(false);
  const touchStartYRef = useRef(0);
  const touchIntentRef = useRef<'horizontal' | 'vertical' | null>(null);

  // Container width measurement (sync + ResizeObserver for exact mobile centering)
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 390
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        updateWidth();
      });
      ro.observe(el);
    }
    window.addEventListener('resize', updateWidth);

    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Keep index centered when count changes
  useEffect(() => {
    setIsTransitionEnabled(false);
    setDisplayIndex(count > 1 ? count * 2 : 0);
  }, [count]);

  // Re-enable CSS transition smoothly after mount or silent loop reset
  useEffect(() => {
    if (!isTransitionEnabled) {
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => {
          setIsTransitionEnabled(true);
        });
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
  }, [isTransitionEnabled]);

  // Fallback normalization if transitionend is skipped on mobile
  useEffect(() => {
    if (count <= 1) return;
    if (displayIndex < baseIndex || displayIndex >= baseIndex + count) {
      const timer = setTimeout(() => {
        const normalized = baseIndex + (((displayIndex % count) + count) % count);
        setIsTransitionEnabled(false);
        setDisplayIndex(normalized);
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [displayIndex, baseIndex, count]);

  // Card dimensions
  const isMobile = containerWidth < 640;
  const cardWidth = isMobile ? 238 : 265;
  const gap = isMobile ? 14 : 18;

  // Navigation handlers: continue smoothly in the same direction
  const handlePrev = () => {
    if (count <= 1) return;
    setIsTransitionEnabled(true);
    setDisplayIndex((prev) => (prev <= 1 ? baseIndex + count - 1 : prev - 1));
  };

  const handleNext = () => {
    if (count <= 1) return;
    setIsTransitionEnabled(true);
    setDisplayIndex((prev) => (prev >= displayDishes.length - 2 ? baseIndex : prev + 1));
  };

  // Silently snap back to the center set after an outer-copy transition finishes
  const handleTrackTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return;
    if (count <= 1) return;
    if (displayIndex < baseIndex || displayIndex >= baseIndex + count) {
      const normalized = baseIndex + (((displayIndex % count) + count) % count);
      setIsTransitionEnabled(false);
      setDisplayIndex(normalized);
    }
  };

  // Drag & Swipe support (mouse and touch)
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    didDragRef.current = false;
    touchIntentRef.current = null;
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    touchStartYRef.current = e.touches[0].clientY;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - dragStartX;
    const dy = e.touches[0].clientY - touchStartYRef.current;

    if (!touchIntentRef.current) {
      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        touchIntentRef.current = Math.abs(dx) >= Math.abs(dy) ? 'horizontal' : 'vertical';
      } else {
        return;
      }
    }

    if (touchIntentRef.current === 'vertical') {
      return;
    }

    if (Math.abs(dx) > 6) didDragRef.current = true;
    setDragOffset(dx);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const wasHorizontal = touchIntentRef.current === 'horizontal';
    touchIntentRef.current = null;

    const threshold = 35;
    if (wasHorizontal) {
      if (dragOffset < -threshold) {
        handleNext();
      } else if (dragOffset > threshold) {
        handlePrev();
      }
    }
    setDragOffset(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    didDragRef.current = false;
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const offset = e.clientX - dragStartX;
    if (Math.abs(offset) > 6) didDragRef.current = true;
    setDragOffset(offset);
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
  }, [count, displayDishes.length]);

  // Center active card in container
  const activeCenter = displayIndex * (cardWidth + gap) + cardWidth / 2;
  const translateX = (containerWidth / 2) - activeCenter + dragOffset;

  return (
    <section className="bg-[#faf8f3] py-12 sm:py-14 border-b border-[#ebdcc4]/60 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <Reveal direction="up">
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
        </Reveal>
      </div>

      {/* Full-width Carousel with Smooth Luxury Side Fades */}
      <Reveal direction="scale" delay={120}>
        <div className="relative w-full overflow-hidden py-3">
          {/* Left Side Fade Gradient */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 md:w-36 bg-gradient-to-r from-[#faf8f3] via-[#faf8f3]/75 to-transparent z-20" />
          {/* Right Side Fade Gradient */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 md:w-36 bg-gradient-to-l from-[#faf8f3] via-[#faf8f3]/75 to-transparent z-20" />

          {/* Left Arrow Button Attached to the Left Corner */}
          <button
            onClick={handlePrev}
            aria-label="Previous featured dish"
            className="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#0d0d0f]/90 hover:bg-[#0e5836] text-[#e5be82] hover:text-white border border-[#ebb340]/80 shadow-[0_4px_18px_rgba(0,0,0,0.4)] flex items-center justify-center transition-all cursor-pointer active:scale-90 backdrop-blur-xs"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Carousel Track Container */}
          <div
            ref={containerRef}
            className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing py-3 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
          <div
            ref={trackRef}
            onTransitionEnd={handleTrackTransitionEnd}
            style={{
              transform: `translateX(${translateX}px)`,
              transition:
                isDragging || !isTransitionEnabled
                  ? 'none'
                  : 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)',
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
                    if (didDragRef.current) return;
                    if (!isActive) {
                      setIsTransitionEnabled(true);
                      setDisplayIndex(idx);
                    }
                  }}
                  style={{ width: `${cardWidth}px` }}
                  className={`flex-shrink-0 select-none ${
                    isTransitionEnabled ? 'transition-all duration-300' : 'transition-none'
                  } ${
                    isActive
                      ? 'transform scale-100 opacity-100 z-10 ring-1 ring-[#ebb340]/40 rounded-[18px]'
                      : 'transform scale-[0.92] opacity-80 hover:opacity-100 cursor-pointer'
                  }`}
                >
                  <FoodCard
                    dish={dish}
                    isFavorite={favorites.includes(dish.id)}
                    onToggleFavorite={onToggleFavorite}
                    onOpenDetails={(d) => {
                      if (didDragRef.current) return;
                      onOpenDetails(d);
                    }}
                    onAddToCart={onAddToCart}
                    compact={true}
                    noShadow={true}
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
      </Reveal>

      {/* Pagination Dots (Dishes count and dish names removed as requested) */}
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 max-w-7xl mx-auto px-4">
        {activeDishes.map((d, idx) => {
          const currentMod = count > 0 ? ((displayIndex % count) + count) % count : 0;
          const isDotActive = currentMod === idx;
          return (
            <button
              key={d.id}
              onClick={() => {
                if (count <= 1) return;
                let diff = idx - currentMod;
                if (diff > count / 2) diff -= count;
                if (diff < -count / 2) diff += count;
                setIsTransitionEnabled(true);
                setDisplayIndex((prev) => prev + diff);
              }}
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
