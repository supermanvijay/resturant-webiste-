import React from 'react';
import { ArrowRight, Leaf, ChefHat, Star } from 'lucide-react';

interface AboutSectionProps {
  onLearnMore: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onLearnMore }) => {
  return (
    <section className="bg-[#062117] py-12 px-4 sm:px-6 lg:px-8 border-b border-[#0d3626] relative overflow-hidden">
      {/* Decorative mint leaves on bottom right */}
      <div className="absolute right-0 bottom-0 pointer-events-none opacity-40 lg:opacity-75 translate-x-4 translate-y-4">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Framed Interior Image (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative p-1.5 rounded-2xl border-2 border-[#ebb340]/60 bg-[#0a291e] shadow-2xl group">
              <div className="overflow-hidden rounded-xl aspect-[16/10]">
                <img
                  src="/extracted/about_interior.png"
                  alt="Royal Bites Luxury Dining Interior"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Center Column: Our Story (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            {/* Kicker */}
            <div className="flex items-center gap-3">
              <span className="text-[#ebb340] text-xs font-bold tracking-[0.2em] uppercase">
                ABOUT US
              </span>
              <span className="h-[1.5px] w-12 bg-[#ebb340]" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              Our Story
            </h2>

            {/* Description */}
            <p className="text-[#cad5cf] text-sm leading-relaxed font-normal">
              Royal Bites was founded with a simple dream – to bring the finest food, warm hospitality
              and a memorable dining experience to every guest.
            </p>

            {/* Learn More Button */}
            <div className="pt-1">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 bg-[#ebb340] hover:bg-[#dfa732] active:scale-95 text-[#111111] font-semibold text-xs px-5 py-2.5 rounded-full shadow-md transition-all cursor-pointer"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Features with Gold Icons (3 cols) */}
          <div className="lg:col-span-3 lg:border-l lg:border-[#123e2d] lg:pl-8 space-y-6">
            {/* Feature 1 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0a2e20] border border-[#ebb340]/30 flex items-center justify-center flex-shrink-0 text-[#ebb340]">
                <Leaf className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm leading-snug">
                  Fresh Ingredients
                </h4>
                <p className="text-xs text-[#a0b5ab]">Always</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0a2e20] border border-[#ebb340]/30 flex items-center justify-center flex-shrink-0 text-[#ebb340]">
                <ChefHat className="w-6 h-6 stroke-[2]" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm leading-snug">
                  Expert Chefs
                </h4>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0a2e20] border border-[#ebb340]/30 flex items-center justify-center flex-shrink-0 text-[#ebb340]">
                <Star className="w-6 h-6 fill-[#ebb340] stroke-none" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm leading-snug">
                  A Memorable
                </h4>
                <p className="text-xs text-[#a0b5ab]">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
