import React from 'react';
import { Plus, Heart, Sparkles, ChefHat, Leaf, ArrowRight, Star } from 'lucide-react';
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

interface CuratedMenuCard {
  id: string;
  name: string;
  badge: 'Popular' | "Chef's Pick" | 'Vegetarian';
  description: string;
  numericPrice: number;
  usdPrice: string;
  rating: number;
  reviewsCount: number;
  image: string;
  isVeg: boolean;
  category: 'Main Course';
}

const THREE_FEATURED_DISHES: CuratedMenuCard[] = [
  {
    id: 'dish-gourmet-cheeseburger',
    name: 'Gourmet Cheeseburger with Fries',
    badge: 'Popular',
    description:
      'Prime Angus beef patty, aged cheddar, crisp lettuce, heirloom tomato, and house aioli on toasted brioche with golden seasoned fries.',
    numericPrice: 349,
    usdPrice: '$16.50',
    rating: 4.9,
    reviewsCount: 168,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85',
    isVeg: false,
    category: 'Main Course',
  },
  {
    id: 'dish-creamy-herb-pasta',
    name: 'Creamy Pasta Dish with Fresh Herbs',
    badge: "Chef's Pick",
    description:
      'Handcrafted fettuccine in a velvety garlic cream reduction with fresh basil, thyme, cracked black pepper, and shaved Parmigiano-Reggiano.',
    numericPrice: 389,
    usdPrice: '$18.00',
    rating: 5.0,
    reviewsCount: 142,
    image:
      'https://images.unsplash.com/photo-1621996346565-e3d5d6281081?auto=format&fit=crop&w=1000&q=85',
    isVeg: true,
    category: 'Main Course',
  },
  {
    id: 'dish-roasted-vegetable-bowl',
    name: 'Colorful Roasted Vegetable Bowl',
    badge: 'Vegetarian',
    description:
      'Caramelized sweet potatoes, charred broccoli, creamy avocado, crisp radishes, and fluffy organic quinoa drizzled with citrus tahini.',
    numericPrice: 299,
    usdPrice: '$14.50',
    rating: 4.8,
    reviewsCount: 95,
    image:
      'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85',
    isVeg: true,
    category: 'Main Course',
  },
];

export const MenuAndOffer: React.FC<MenuAndOfferProps> = ({
  dishes,
  favorites,
  onToggleFavorite,
  onOpenDetails,
  onAddToCart,
  onViewFullMenu,
}) => {
  // Helper to convert our card definition into a full FoodItem for cart / modal operations
  const getFoodItem = (card: CuratedMenuCard): FoodItem => {
    const existing = dishes.find((d) => d.id === card.id);
    if (existing) return existing;
    return {
      id: card.id,
      name: card.name,
      category: card.category,
      price: card.numericPrice,
      subtitle: card.description,
      description: card.description,
      image: card.image,
      isVeg: card.isVeg,
      isFeatured: true,
      isPopular: card.badge === 'Popular',
      rating: card.rating,
    };
  };

  const getBadgeStyle = (badge: CuratedMenuCard['badge']) => {
    switch (badge) {
      case 'Popular':
        return {
          bg: 'bg-[#d99b26] text-white',
          icon: Sparkles,
        };
      case "Chef's Pick":
        return {
          bg: 'bg-[#0f3d24] text-white',
          icon: ChefHat,
        };
      case 'Vegetarian':
        return {
          bg: 'bg-[#1b5e20] text-white',
          icon: Leaf,
        };
    }
  };

  return (
    <section
      id="menu-section"
      className="scroll-mt-20 sm:scroll-mt-24 bg-[#faf8f3] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc4]/60"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header: Clean, balanced, elegant */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#0f3d24] mb-2 sm:mb-3">
            OUR MENU
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1a2b21] tracking-tight">
            Taste the Extraordinary
          </h2>
          <div className="w-16 h-0.5 bg-[#ebb340] mx-auto my-3.5 sm:my-4 rounded-full" />
          <p className="text-xs sm:text-base text-[#56645a] leading-relaxed">
            Freshly prepared with artisanal ingredients, culinary passion, and timeless taste.
          </p>
        </div>

        {/* The 3 Food Cards: horizontal side scroll on mobile, clean 3-col grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 overflow-x-auto md:overflow-visible pb-4 pt-1 px-4 -mx-4 sm:px-6 sm:-mx-6 md:px-0 md:mx-0 snap-x snap-mandatory scroll-smooth no-scrollbar items-stretch">
          {THREE_FEATURED_DISHES.map((card) => {
            const foodItem = getFoodItem(card);
            const badgeMeta = getBadgeStyle(card.badge);
            const BadgeIcon = badgeMeta.icon;
            const isFav = favorites.includes(card.id);

            return (
              <div
                key={card.id}
                className="w-[82vw] max-w-[320px] sm:w-[350px] flex-shrink-0 snap-center md:w-auto md:max-w-none md:flex-shrink group bg-white rounded-2xl sm:rounded-3xl border border-[#ebe2d5] shadow-[0_8px_24px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden"
              >
                {/* Large Realistic Food Photograph at the Top */}
                <div
                  onClick={() => onOpenDetails(foodItem)}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-[#eeebe5] cursor-pointer"
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />

                  {/* Subtle top gradient for badge contrast */}
                  <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Small Label Badge: Popular / Chef's Pick / Vegetarian */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase px-3 py-1 rounded-full shadow-md backdrop-blur-xs ${badgeMeta.bg}`}
                    >
                      <BadgeIcon className="w-3 h-3" />
                      <span>{card.badge}</span>
                    </span>
                  </div>

                  {/* Favorite Heart Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(card.id);
                    }}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    className="absolute top-3.5 right-3.5 z-10 w-8 h-8 rounded-full bg-white/85 hover:bg-white text-gray-700 hover:text-rose-500 shadow-sm flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        isFav
                          ? 'fill-rose-500 text-rose-500'
                          : 'stroke-current hover:fill-rose-100'
                      }`}
                    />
                  </button>
                </div>

                {/* Card Body: Dish Name, Rating/Rate, Short Description, Professional Price, Add to Order Button */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Dish Name */}
                    <h3
                      onClick={() => onOpenDetails(foodItem)}
                      className="font-serif font-bold text-xl sm:text-2xl text-[#1a2b21] group-hover:text-[#0f3d24] transition-colors cursor-pointer leading-snug line-clamp-1 tracking-tight"
                    >
                      {card.name}
                    </h3>

                    {/* Professional Rating / Rate Badge */}
                    <div className="flex items-center gap-2 mt-2 mb-2.5">
                      <div className="inline-flex items-center gap-1 bg-[#fdf9ef] border border-[#f1dfbe] px-2 py-0.5 rounded-full shadow-2xs">
                        <Star className="w-3.5 h-3.5 text-[#d99b26] fill-[#d99b26]" />
                        <span className="text-[12px] font-bold text-[#68470a] font-sans tracking-tight">
                          {card.rating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-[11px] font-medium text-[#738277] tracking-tight">
                        ({card.reviewsCount} reviews)
                      </span>
                    </div>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-[#5d6b61] leading-relaxed line-clamp-3 font-normal">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Row: Professional Price & Simple "Add to Order" Button */}
                  <div className="mt-5 pt-4 border-t border-[#f0e8dc] flex items-center justify-between gap-3">
                    {/* Professional Price Typography */}
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-[#809185]">
                        Price
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-sm font-semibold text-[#0f3d24]/75 font-sans">₹</span>
                        <span className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-[#0f3d24] font-sans tabular-nums">
                          {card.numericPrice}
                        </span>
                        <span className="text-xs font-medium text-[#78887e] ml-0.5 tracking-tight font-sans">
                          • {card.usdPrice}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onAddToCart(foodItem)}
                      className="inline-flex items-center gap-1.5 bg-[#0f3d24] hover:bg-[#165633] active:scale-95 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Add to Order</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Swipe Cue (visible only on mobile) */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-4 text-[#728275]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#0f3d24]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#d5cbbe]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#d5cbbe]" />
          <span className="ml-1.5 text-[11px] font-medium tracking-wide">Swipe to view more dishes →</span>
        </div>

        {/* View Full Menu link at the bottom of the section */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onViewFullMenu}
            className="inline-flex items-center gap-2 bg-[#f0ebe0] hover:bg-[#0f3d24] text-[#1a2b21] hover:text-white font-medium text-xs sm:text-sm px-6 py-3 rounded-full transition-all duration-200 cursor-pointer shadow-xs"
          >
            <span>Explore Complete Restaurant Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
