import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { FoodCard } from './FoodCard';
import { FoodItem } from '../types';

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: FoodItem[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onOpenDetails: (dish: FoodItem) => void;
  onAddToCart: (dish: FoodItem) => void;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  dishes,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);

  if (!isOpen) return null;

  const categories = [
    'All',
    'Biryani',
    'Starters',
    'Main Course',
    'Indian Cuisine',
    'Chinese Cuisine',
    'Desserts',
    'Beverages',
  ];

  const filteredDishes = dishes.filter((dish) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      dish.category === selectedCategory ||
      (selectedCategory === 'Biryani' && dish.name.toLowerCase().includes('biryani'));

    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesVeg = !vegOnly || dish.isVeg;

    return matchesCategory && matchesSearch && matchesVeg;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#faf8f3] text-gray-900 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#ebdcc4] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#051810] text-white p-5 flex items-center justify-between border-b border-[#0f3627]">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-[#ebb340] text-xs font-bold tracking-widest uppercase">
                ROYAL BITES
              </span>
              <span className="h-[1px] w-8 bg-[#ebb340]" />
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
              Full Food & Beverage Menu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search, Veg Toggle and Category Filter Controls */}
        <div className="p-4 bg-white border-b border-[#ebdcc4] space-y-3">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search dishes (e.g. Salmon, Biryani, Paneer, Dosa, Tikka)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#ebb340]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-xs cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Veg Only Switch */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex-shrink-0 ${
                vegOnly
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="w-3.5 h-3.5 border border-emerald-600 flex items-center justify-center rounded-[2px]">
                <div className="w-2 h-2 rounded-full bg-emerald-600" />
              </div>
              <span>Veg Only</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? 'bg-[#0d4f32] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grid using Premium FoodCards */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredDishes.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-sm">No dishes found matching your search.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setVegOnly(false);
                }}
                className="mt-3 text-xs font-bold text-[#0d4f32] underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredDishes.map((dish) => (
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
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-[#f0ebe0] px-5 py-3 border-t border-[#ebdcc4] flex items-center justify-between text-xs text-gray-600">
          <span>Showing {filteredDishes.length} royal gourmet selections</span>
          <button
            onClick={onClose}
            className="font-bold text-[#0d4f32] hover:underline cursor-pointer"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
};
