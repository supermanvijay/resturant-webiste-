import React from 'react';
import { Heart, ArrowRight, Star } from 'lucide-react';
import { FoodItem } from '../types';

interface FoodCardProps {
  dish: FoodItem;
  isFavorite?: boolean;
  onToggleFavorite?: (dishId: string) => void;
  onOpenDetails: (dish: FoodItem) => void;
  onAddToCart?: (dish: FoodItem) => void;
  className?: string;
  compactOnMobile?: boolean;
  textSizeBoost?: boolean;
  compact?: boolean;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  dish,
  isFavorite = false,
  onToggleFavorite,
  onOpenDetails,
  className = '',
  compactOnMobile = false,
  textSizeBoost = false,
  compact = false,
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
      className={`group relative bg-[#0d0d0f] border border-white/10 ${
        compact ? 'rounded-[18px]' : compactOnMobile ? 'rounded-[16px] sm:rounded-[24px]' : 'rounded-[24px]'
      } overflow-hidden shadow-[0_12px_32px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_44px_rgba(0,0,0,0.7)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer ${className}`}
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

        {/* Top-left Rating Badge */}
        {dish.rating ? (
          <div
            className={`absolute ${
              compact || compactOnMobile ? 'top-2 left-2 px-2 py-0.5' : 'top-3 left-3 px-2.5 py-1'
            } z-10 bg-black/65 backdrop-blur-xs border border-white/20 rounded-full flex items-center gap-1 shadow-sm text-white`}
          >
            <Star className="w-3 h-3 fill-[#ebb340] text-[#ebb340]" />
            <span className="text-[11px] font-bold font-sans tracking-tight">{dish.rating.toFixed(1)}</span>
          </div>
        ) : (
          <div
            className={`absolute ${
              compact || compactOnMobile ? 'top-2 left-2' : 'top-3 left-3'
            } z-10 pointer-events-none opacity-40`}
          >
            <svg
              width={compact || compactOnMobile ? '16' : '22'}
              height={compact || compactOnMobile ? '16' : '22'}
              className={!compact && compactOnMobile ? 'sm:w-[22px] sm:h-[22px]' : ''}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ebb340"
              strokeWidth="1.5"
            >
              <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" fill="#ebb340" fillOpacity="0.3" />
            </svg>
          </div>
        )}

        {/* Top-right Heart / Favorite Icon */}
        <button
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute ${
            compact || compactOnMobile
              ? 'top-2 right-2 w-7 h-7'
              : 'top-3 right-3 w-8 h-8'
          } z-10 rounded-full flex items-center justify-center transition-transform active:scale-90 hover:scale-110 cursor-pointer`}
        >
          <Heart
            className={`${
              compact || compactOnMobile ? 'w-4 h-4' : 'w-5 h-5'
            } drop-shadow-md transition-colors ${
              isFavorite
                ? 'fill-rose-500 text-rose-500'
                : 'stroke-white text-white fill-transparent hover:text-rose-300'
            }`}
          />
        </button>
      </div>

      {/* Card Content Body */}
      <div
        className={`${
          compact
            ? 'p-3.5 pt-2.5'
            : compactOnMobile
            ? 'p-2.5 pt-2 sm:p-4 sm:pt-3'
            : textSizeBoost
            ? 'p-4 sm:p-5 pt-3 sm:pt-4'
            : 'p-4 pt-3'
        } flex-1 flex flex-col justify-between`}
      >
        <div>
          {/* Food Name in Elegant White Serif Typography (+10% in compact) */}
          <h3
            className={`font-serif font-semibold text-white ${
              compact
                ? 'text-[15px] sm:text-[16.5px]'
                : textSizeBoost
                ? 'text-lg sm:text-[21px]'
                : compactOnMobile
                ? 'text-xs min-[360px]:text-sm sm:text-lg'
                : 'text-base sm:text-lg'
            } tracking-normal leading-snug line-clamp-1 group-hover:text-[#f2ce9d] transition-colors`}
          >
            {dish.name}
          </h3>

          {/* Short Food Description (+10% in compact) */}
          <p
            className={`text-[#a1a1aa] ${
              compact
                ? 'text-xs sm:text-[13px] line-clamp-2 min-h-[30px] mt-1'
                : textSizeBoost
                ? 'text-[13px] sm:text-[14.5px] line-clamp-2 min-h-[38px] mt-1'
                : compactOnMobile
                ? 'text-[10px] min-[360px]:text-[11px] sm:text-[13px] line-clamp-2 min-h-[26px] sm:min-h-[34px] mt-0.5 sm:mt-1'
                : 'text-xs sm:text-[13px] line-clamp-2 min-h-[34px] mt-1'
            } leading-relaxed font-sans`}
          >
            {dish.subtitle || dish.description}
          </p>
        </div>

        {/* Bottom Row: Price & Pill Button "View →" */}
        <div
          className={`flex items-center justify-between ${
            compact
              ? 'mt-3 pt-1'
              : compactOnMobile
              ? 'mt-2 sm:mt-3.5 pt-0.5 sm:pt-1'
              : textSizeBoost
              ? 'mt-4 pt-1.5'
              : 'mt-3.5 pt-1'
          }`}
        >
          {/* Price with professional tabular numerals and currency hierarchy */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-xs sm:text-sm font-semibold text-[#ebb340]/85 font-sans">₹</span>
            <span
              className={`text-[#f5d59f] font-sans font-bold tabular-nums ${
                compact
                  ? 'text-lg sm:text-xl'
                  : textSizeBoost
                  ? 'text-xl sm:text-2xl'
                  : compactOnMobile
                  ? 'text-base sm:text-xl'
                  : 'text-lg sm:text-xl'
              } tracking-tight`}
            >
              {dish.price}
            </span>
          </div>

          {/* Pill Button "View →" with golden outline (+10% in compact) */}
          <button
            onClick={handleViewClick}
            aria-label={`View details for ${dish.name}`}
            className={`border border-[#c49a5b]/80 bg-[#181512] text-[#e5be82] hover:bg-[#e5be82] hover:text-black font-sans ${
              compact
                ? 'text-xs px-3.5 py-1.5 gap-1.5'
                : textSizeBoost
                ? 'text-[13px] sm:text-sm px-4.5 sm:px-5 py-2 gap-1.5'
                : compactOnMobile
                ? 'text-[10px] sm:text-xs px-2.5 py-1 sm:px-4 sm:py-1.5 gap-1 sm:gap-1.5'
                : 'text-xs px-4 py-1.5 gap-1.5'
            } rounded-full flex items-center font-medium transition-all shadow-xs active:scale-95 cursor-pointer`}
          >
            <span>View</span>
            <ArrowRight
              className={`${
                compact
                  ? 'w-3.5 h-3.5'
                  : textSizeBoost
                  ? 'w-4 h-4'
                  : compactOnMobile
                  ? 'w-3 h-3 sm:w-3.5 sm:h-3.5'
                  : 'w-3.5 h-3.5'
              } stroke-[2.5]`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
