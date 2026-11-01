import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Calendar } from 'lucide-react';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onBookTable }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      kicker: 'WELCOME TO ROYAL BITES',
      titleLine1: 'Experience the',
      titleLine2: 'Taste of',
      titleHighlight: 'Perfection.',
      description:
        'Delicious food, great ambience and unforgettable moments await you at Royal Bites.',
      image: '/extracted/hero_biryani_clean.png',
      alt: 'Royal Handi Chicken Biryani with roasted drumstick and fresh mint',
    },
    {
      kicker: 'MUGHLAI HERITAGE',
      titleLine1: 'Authentic Indian',
      titleLine2: 'Royal',
      titleHighlight: 'Tradition.',
      description:
        'Slow-cooked handi gravies and aromatic wood-fired tandoori specialties prepared by master chefs.',
      image: '/extracted/hero_biryani_clean.png',
      alt: 'Royal Indian cuisine',
    },
    {
      kicker: 'MEMORABLE MOMENTS',
      titleLine1: 'Dine in Grandeur &',
      titleLine2: 'Pure',
      titleHighlight: 'Luxury.',
      description:
        'Indulge your senses in a warm, sophisticated setting designed for family dinners and celebrations.',
      image: '/extracted/hero_biryani_clean.png',
      alt: 'Dining experience',
    },
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const current = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-[#071912] min-h-[440px] md:min-h-[480px] flex items-center border-b border-[#0f3426]">
      {/* Clean ambient dark background with warm bokeh lighting - NO baked-in ghost text! */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#061811] via-[#071d15] to-[#0a2319]" />
        {/* Warm golden bokeh lights */}
        <div className="absolute top-10 left-1/4 w-72 h-72 bg-[#ebb340]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-1/4 w-96 h-96 bg-[#ebb340]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-80 h-80 bg-emerald-900/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Left Slider Arrow */}
      <button
        onClick={handlePrev}
        aria-label="Previous slide"
        className="absolute left-2.5 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Slider Arrow */}
      <button
        onClick={handleNext}
        aria-label="Next slide"
        className="absolute right-2.5 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-10 md:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            {/* Kicker with horizontal line */}
            <div className="flex items-center gap-3">
              <span className="text-[#ebb340] text-xs font-bold tracking-[0.2em] uppercase">
                {current.kicker}
              </span>
              <span className="h-[1.5px] w-12 bg-[#ebb340]" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white font-bold leading-[1.15]">
              <span className="block">{current.titleLine1}</span>
              <span className="inline font-serif">{current.titleLine2} </span>
              <span className="font-script text-[#ebb340] text-5xl sm:text-6xl lg:text-7xl font-normal ml-1 inline-block drop-shadow-md">
                {current.titleHighlight}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-[#d8deda] text-sm sm:text-base max-w-xl leading-relaxed font-normal">
              {current.description}
            </p>

            {/* Action Buttons - Always in one line across mobile and desktop */}
            <div className="flex flex-row items-center gap-2.5 sm:gap-4 pt-1 sm:pt-2 flex-nowrap">
              {/* Book a Table Button */}
              <button
                onClick={onBookTable}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#ebb340] hover:bg-[#dfa732] active:scale-95 text-[#111111] font-semibold text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-full shadow-lg transition-all duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111111]" />
                <span>Book a Table</span>
              </button>

              {/* Explore Menu Button */}
              <button
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 border border-[#ebb340] hover:bg-[#ebb340]/15 active:scale-95 text-white font-medium text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-full transition-all duration-200 cursor-pointer backdrop-blur-xs whitespace-nowrap flex-shrink-0"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ebb340] stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Image Column - Biryani Handi */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[480px]">
              {/* Ambient backlight glow */}
              <div className="absolute -inset-4 bg-[#ebb340]/25 rounded-full blur-2xl pointer-events-none" />

              {/* Biryani Handi Dish with right alignment */}
              <img
                src={current.image}
                alt={current.alt}
                className="relative z-10 w-full h-auto object-contain rounded-2xl drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>
          </div>
        </div>

        {/* Slider Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-6 md:mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === index
                  ? 'w-3 h-3 bg-[#ebb340]'
                  : 'w-2.5 h-2.5 bg-white/70 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
