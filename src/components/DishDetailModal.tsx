import React, { useState } from 'react';
import { X, Heart, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';
import { FoodItem } from '../types';

interface DishDetailModalProps {
  dish: FoodItem | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (dish: FoodItem, quantity: number) => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !dish) return null;

  const isPopular = dish.isPopular ?? dish.isFeatured ?? false;

  const handleAdd = () => {
    onAddToCart(dish, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#0d0d0f] border border-white/10 text-white rounded-[24px] max-w-md w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Top Image Banner */}
        <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#161618]">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 flex items-center justify-center transition cursor-pointer backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Popular Badge */}
          {isPopular && (
            <div className="absolute top-3.5 left-3.5 z-10 bg-[#e2b467] text-[#111111] text-xs font-bold px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Popular</span>
            </div>
          )}

          {/* Heart Button */}
          <button
            onClick={() => onToggleFavorite(dish.id)}
            className="absolute bottom-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition backdrop-blur-xs cursor-pointer"
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                isFavorite
                  ? 'fill-rose-500 text-rose-500'
                  : 'text-white fill-transparent hover:text-rose-400'
              }`}
            />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[11px] font-semibold text-[#e2b467] uppercase tracking-wider">
                  {dish.category}
                </span>
                <span className="text-gray-500">•</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    dish.isVeg
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {dish.isVeg ? 'VEGETARIAN' : 'NON-VEGETARIAN'}
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl text-white">
                {dish.name}
              </h2>
            </div>

            <div className="text-right flex-shrink-0">
              <span className="font-serif font-bold text-2xl text-[#e2b467]">
                ₹{dish.price}
              </span>
            </div>
          </div>

          <p className="text-sm text-[#a5a5a7] leading-relaxed">
            {dish.description}
          </p>

          {/* Quantity Selector & Add to Cart Button */}
          <div className="pt-4 border-t border-[#222225] flex items-center gap-4">
            {/* Quantity */}
            <div className="flex items-center border border-[#333336] rounded-xl bg-[#141416] p-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-300 flex items-center justify-center transition cursor-pointer"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-sm text-white">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-gray-300 flex items-center justify-center transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart CTA */}
            <button
              onClick={handleAdd}
              className="flex-1 bg-[#e2b467] hover:bg-[#d4a353] active:scale-95 text-[#111111] font-bold text-sm py-3 px-5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 stroke-[2.5]" />
              <span>Add to Cart (₹{dish.price * quantity})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
