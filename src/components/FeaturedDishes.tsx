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
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-1.5">
            <span className="h-[1px] w-12 sm:w-20 bg-[#ebb340]" />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#1b2b23]">
              Our <span className="text-[#0e5836]">Featured Dishes</span>
            </h2>
            <span className="h-[1px] w-12 sm:w-20 bg-[#ebb340]" />
          </div>
          <p className="text-xs sm:text-sm text-gray-600 font-normal">
            A perfect blend of tradition and taste
          </p>
        </div>

        {/* 5 Premium Black and Gold Food Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
          {featured.map((dish) => (
            <FoodCard
              key={dish.id}
              dish={dish}
              isFavorite={favorites.includes(dish.id)}
              onToggleFavorite={onToggleFavorite}
              onOpenDetails={onOpenDetails}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
