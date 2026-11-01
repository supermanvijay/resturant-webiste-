import React from 'react';
import { ArrowRight, Leaf, ChefHat, Star } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  return (
    <section className="bg-[#04150e] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#0d3626] relative overflow-hidden">
      {/* Decorative mint leaves on bottom right */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-20 sm:opacity-40 lg:opacity-60 translate-x-4 translate-y-4 z-10">
        <svg width="180" height="180" viewBox="0 0 100 100" fill="none">
          <path
            d="M30 90 C45 65 60 70 85 45 C75 35 60 30 45 40 C35 50 30 70 30 90 Z"
            fill="#105b38"
            opacity="0.8"
          />
          <path
            d="M50 95 C65 75 75 70 95 60 C90 50 80 45 68 52 C58 60 52 75 50 95 Z"
            fill="#157347"
            opacity="0.9"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: About Us & Our Story (7 cols) */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Kicker */}
            <div className="flex items-center gap-3">
              <span className="text-[#ebb340] text-xs font-bold tracking-[0.2em] uppercase">
                ABOUT US
              </span>
              <span className="h-[1.5px] w-12 bg-[#ebb340]" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Our Story
            </h2>

            {/* Description */}
            <p className="text-[#a8b8b0] text-sm sm:text-base leading-relaxed font-normal max-w-xl">
              Royal Bites was founded with a simple dream – to bring the finest food, warm hospitality
              and a memorable dining experience to every guest.
            </p>

            {/* 3 Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {/* Feature 1 */}
              <div className="flex items-center gap-3 bg-[#0a2318] p-3 rounded-2xl border border-[#0f3b2a] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#0e3b2a] border border-[#ebb340]/30 flex items-center justify-center flex-shrink-0 text-[#ebb340]">
                  <Leaf className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs sm:text-sm leading-snug">
                    Fresh Ingredients
                  </h4>
                  <p className="text-[11px] text-[#a0b5ab]">Always</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 bg-[#0a2318] p-3 rounded-2xl border border-[#0f3b2a] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#0e3b2a] border border-[#ebb340]/30 flex items-center justify-center flex-shrink-0 text-[#ebb340]">
                  <ChefHat className="w-5 h-5 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs sm:text-sm leading-snug">
                    Expert Chefs
                  </h4>
                  <p className="text-[11px] text-[#a0b5ab]">Master Artisans</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 bg-[#0a2318] p-3 rounded-2xl border border-[#0f3b2a] shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#0e3b2a] border border-[#ebb340]/30 flex items-center justify-center flex-shrink-0 text-[#ebb340]">
                  <Star className="w-5 h-5 fill-[#ebb340] stroke-none" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-xs sm:text-sm leading-snug">
                    A Memorable
                  </h4>
                  <p className="text-[11px] text-[#a0b5ab]">Experience</p>
                </div>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-2">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 bg-[#ebb340] hover:bg-[#dfa732] active:scale-95 text-[#111111] font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg transition-all cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Framed Interior Photo (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-[480px]">
              {/* Ambient backlight glow */}
              <div className="absolute -inset-3 bg-[#ebb340]/15 rounded-3xl blur-2xl pointer-events-none" />

              {/* Framed Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#ebb340]/40 shadow-2xl bg-[#062117] group">
                <img
                  src="/extracted/about_interior.png"
                  alt="Royal Bites Luxury Dining Interior"
                  className="w-full h-auto object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="bg-[#051710]/80 backdrop-blur-xs px-3 py-1 rounded-full border border-[#ebb340]/30 font-medium">
                    Grand Dining Hall
                  </span>
                  <span className="text-[#ebb340] font-semibold">
                    Est. 2012
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
