import React, { useState } from 'react';
import { ArrowRight, Utensils, Flame, Soup, CookingPot, Cake, Coffee } from 'lucide-react';
import { FoodCard } from './FoodCard';
import { FoodItem } from '../types';

interface MenuAndOfferProps {
  dishes: FoodItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (dish: FoodItem) => void;
  onAddToCart: (dish: FoodItem) => void;
  onViewFullMenu: () => void;
  onOrderNow: () => void;
}

export const MenuAndOffer: React.FC<MenuAndOfferProps> = ({
  dishes,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onAddToCart,
  onViewFullMenu,
  onOrderNow,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');

  const categories = [
    { name: 'All Items', icon: Utensils },
    { name: 'Starters', icon: Flame },
    { name: 'Main Course', icon: Soup },
    { name: 'Biryani', icon: CookingPot },
    { name: 'Desserts', icon: Cake },
    { name: 'Beverages', icon: Coffee },
  ];

  // Specific dishes shown in reference image or category filter
  const referenceGridIds = ['dish-thai-curry', 'dish-7', 'dish-8', 'dish-9'];
  const gridDishes = dishes
    .filter((d) => {
      if (selectedCategory === 'All Items') {
        return referenceGridIds.includes(d.id);
      }
      return (
        d.category === selectedCategory ||
        (selectedCategory === 'Biryani' && d.name.toLowerCase().includes('biryani'))
      );
    })
    .slice(0, 4);

  const displayDishes = gridDishes.length > 0 ? gridDishes : dishes.slice(0, 4);

  return (
    <section className="bg-[#faf8f3] py-14 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc4]/60">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Our Menu Showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Header */}
            <div className="mb-5">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1a2b23]">
                  Our Menu
                </h2>
                <span className="h-[1.5px] w-12 bg-[#ebb340]" />
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Explore our wide range of delicious dishes
              </p>
            </div>

            {/* Menu Layout: Decreased category tabs + 2x2 grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-6">
              {/* Decreased compact category filter list */}
              <div className="sm:col-span-3 space-y-1.5">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#0d4f32] text-white shadow-xs font-semibold'
                          : 'bg-[#f0ebe0] hover:bg-[#e7e0d3] text-gray-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="truncate">{cat.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* 2x2 Food Grid with New Thai Green Curry Style FoodCards */}
              <div className="sm:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {displayDishes.map((dish) => (
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

            {/* View Full Menu Button */}
            <div className="flex justify-center pt-1">
              <button
                onClick={onViewFullMenu}
                className="inline-flex items-center gap-2 bg-[#0d4f32] hover:bg-[#083823] text-white text-xs font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <span>View Full Menu</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Special Offer Banner (5 cols) */}
          <div className="lg:col-span-5 flex items-center">
            <div
              onClick={onOrderNow}
              className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#092218] border border-[#134934] group cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              <img
                src="/extracted/special_offer_banner.png"
                alt="Special Offer Get 20% OFF on All Orders - Order Now"
                className="w-full h-auto object-contain group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-[#ebb340]/0 group-hover:bg-[#ebb340]/5 transition-colors pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
