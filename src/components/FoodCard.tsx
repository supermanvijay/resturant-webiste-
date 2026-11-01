import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { FoodItem } from '../types';

interface FoodCardProps {
  dish: FoodItem;
  isFavorite?: boolean;
  onToggleFavorite?: (dishId: string) => void;
  onOpenDetails: (dish: FoodItem) => void;
  onAddToCart?: (dish: FoodItem) => void;
  className?: string;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  dish,
  isFavorite = false,
  onToggleFavorite,
  onOpenDetails,
  className = '',
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(dish.id);
    }
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenDetails(dish);
  };

  return (
    <div
      onClick={() => onOpenDetails(dish)}
      className={`group relative bg-[#0d0d0f] border border-white/10 rounded-[24px] overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.7)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer ${className}`}
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#161618]">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
        />

        {/* Smooth dark vignette fading to card body */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#0d0d0f]/20 to-transparent pointer-events-none" />

        {/* Top-left subtle watermark emblem */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none opacity-40">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ebb340" strokeWidth="1.5">
            <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" fill="#ebb340" fillOpacity="0.3" />
          </svg>
        </div>

        {/* Top-right Heart / Favorite Icon */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90 hover:scale-110 cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 drop-shadow-md transition-colors ${
              isFavorite
                ? 'fill-rose-500 text-rose-500'
                : 'stroke-white text-white fill-transparent hover:text-rose-300'
            }`}
          />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-4 pt-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Food Name in Elegant White Serif Typography */}
          <h3 className="font-serif font-semibold text-white text-base sm:text-lg tracking-normal leading-snug line-clamp-1 group-hover:text-[#f2ce9d] transition-colors">
            {dish.name}
          </h3>

          {/* Short Food Description */}
          <p className="text-[#a1a1aa] text-xs sm:text-[13px] leading-relaxed mt-1 font-sans line-clamp-2 min-h-[34px]">
            {dish.subtitle || dish.description}
          </p>
        </div>

        {/* Bottom Row: Price & Pill Button "View →" */}
        <div className="flex items-center justify-between mt-3.5 pt-1">
          {/* Price in Golden Yellow Serif */}
          <div className="text-[#e5be82] font-serif font-bold text-lg sm:text-xl tracking-tight">
            ₹{dish.price}
          </div>

          {/* Pill Button "View →" with golden outline */}
          <button
            onClick={handleViewClick}
            aria-label={`View details for ${dish.name}`}
            className="border border-[#c49a5b]/80 bg-[#181512] text-[#e5be82] hover:bg-[#e5be82] hover:text-black font-sans text-xs font-medium px-4 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <span>View</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
