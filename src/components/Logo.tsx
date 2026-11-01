import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  return (
    <div className={`flex items-center gap-2.5 cursor-pointer select-none bg-transparent ${className}`}>
      {/* 100% Transparent Chef Hat & Cutlery Vector Emblem in Rich Gold */}
      <div className="relative flex-shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 80"
          className={
            size === 'sm'
              ? 'w-8 h-7'
              : size === 'lg'
              ? 'w-14 h-11'
              : 'w-10 h-8 md:w-11 md:h-9'
          }
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Chef Hat Puffs in Royal Gold */}
          <path
            d="M50 10 C38 10 32 20 30 28 C22 28 15 36 17 46 C18 51 22 55 27 56 L27 64 C27 66 29 68 32 68 L68 68 C71 68 73 66 73 64 L73 56 C78 55 82 51 83 46 C85 36 78 28 70 28 C68 20 62 10 50 10 Z"
            fill="#ebb340"
            stroke="#f5cf6d"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Hat base band in dark green cutout */}
          <path
            d="M32 63 L68 63"
            stroke="#08231a"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Cutlery silhouettes: Fork on left, Knife in middle, Spoon on right */}
          <path
            d="M42 38 L42 54 M40 38 L40 46 M44 38 L44 46"
            stroke="#08231a"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M50 36 L50 54"
            stroke="#08231a"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M58 38 C55 38 54 42 56 48 L58 54 M58 48 C60 48 61 44 59 39 Z"
            fill="#08231a"
          />
        </svg>
      </div>

      {/* Typography: Royal in white, Bites in gold, RESTAURANT below */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center">
          <span className="font-serif italic font-bold text-white text-xl md:text-2xl tracking-tight drop-shadow-sm">
            Royal
          </span>
          <span className="font-serif font-bold text-[#ebb340] text-xl md:text-2xl ml-1 tracking-tight drop-shadow-sm">
            Bites
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="h-[1px] w-3 bg-[#ebb340]/70" />
          <span className="text-[8.5px] md:text-[9px] tracking-[0.25em] font-bold text-[#ebb340] uppercase">
            RESTAURANT
          </span>
          <span className="h-[1px] w-3 bg-[#ebb340]/70" />
        </div>
      </div>
    </div>
  );
};
