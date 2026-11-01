import React from 'react';
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
  // Grab the featured dishes in reference order
  const featured = dishes.filter((d) => d.isFeatured).slice(0, 5);

  return (
    <section className="bg-[#faf8f3] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc4]/60">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 px-2">
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-1.5 max-w-full">
            <span className="h-[1px] w-5 sm:w-16 md:w-20 bg-[#ebb340] shrink-0" />
            <h2 className="text-base min-[360px]:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-serif font-bold text-[#1b2b23] whitespace-nowrap tracking-tight sm:tracking-normal">
              Our <span className="text-[#0e5836]">Featured Dishes</span>
            </h2>
            <span className="h-[1px] w-5 sm:w-16 md:w-20 bg-[#ebb340] shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-normal">
            A perfect blend of tradition and taste
          </p>
        </div>

        {/* Mobile: horizontal side scroll with reduced card size (<30% of original mobile full width); Desktop: unchanged 5-column grid */}
        <div className="relative -mx-4 sm:mx-0 px-4 sm:px-0">
          <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 overflow-x-auto sm:overflow-visible pb-3 sm:pb-0 pt-1 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {featured.map((dish) => (
              <div
                key={dish.id}
                className="w-[190px] min-w-[190px] max-w-[190px] sm:w-auto sm:min-w-0 sm:max-w-none shrink-0 snap-start"
              >
                <FoodCard
                  dish={dish}
                  isFavorite={favorites.includes(dish.id)}
                  onToggleFavorite={onToggleFavorite}
                  onOpenDetails={onOpenDetails}
                  onAddToCart={onAddToCart}
                  compactOnMobile={true}
                />
              </div>
            ))}
          </div>

          {/* Mobile subtle swipe indicator */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 text-[11px] text-[#0e5836] font-medium mt-2">
            <span>Scroll horizontally to view all dishes</span>
            <span className="text-[#ebb340]">→</span>
          </div>
        </div>
      </div>
    </section>
  );
};
