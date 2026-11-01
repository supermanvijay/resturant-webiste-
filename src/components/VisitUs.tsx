import React from 'react';
import { MapPin, Phone, Mail, Navigation } from 'lucide-react';

interface VisitUsProps {
  onOpenContact?: () => void;
}

export const VisitUs: React.FC<VisitUsProps> = ({ onOpenContact }) => {
  const addressLine1 = '123 Culinary Lane';
  const addressLine2 = 'San Francisco, CA 94107';
  const phone = '+1 (555) 248-1234';
  const hours = 'Mon – Sun, 9:00 AM – 10:00 PM';
  const email = 'hello@theolive.com';
  const responseTime = 'We reply within 24 hours';

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${addressLine1}, ${addressLine2}`
  )}`;

  return (
    <section
      id="contact-section"
      className="scroll-mt-20 sm:scroll-mt-24 relative bg-[#faf8f5] py-8 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#ebdcc4]/60 overflow-hidden"
    >
      {/* Decorative leaf branch in top right corner matching reference */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-40 sm:opacity-75 select-none z-0">
        <svg
          width="130"
          height="115"
          viewBox="0 0 160 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform translate-x-2 -translate-y-2 sm:translate-x-4 sm:-translate-y-4 sm:w-[170px] sm:h-[150px]"
        >
          <path
            d="M160 0C130 30 110 70 120 110C100 80 100 40 130 10"
            stroke="#657b6d"
            strokeWidth="1.8"
            fill="none"
          />
          <path
            d="M135 25C115 15 95 30 105 50C125 50 140 35 135 25Z"
            fill="#799182"
            fillOpacity="0.75"
          />
          <path
            d="M118 62C98 52 85 70 98 88C116 86 128 72 118 62Z"
            fill="#8aa092"
            fillOpacity="0.7"
          />
          <path
            d="M142 80C125 72 118 92 130 106C146 102 152 88 142 80Z"
            fill="#799182"
            fillOpacity="0.65"
          />
          <path
            d="M85 30C70 20 60 40 72 55C88 52 95 38 85 30Z"
            fill="#9cb0a3"
            fillOpacity="0.6"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-14 items-center">
          {/* Left Column: Contact details (compact by ~30% on mobile) */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div>
              {/* Clean Kicker */}
              <span className="inline-block text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#3f5043] mb-1.5 sm:mb-2">
                CONTACT US
              </span>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1a2b21] mt-1 sm:mt-1.5 mb-2 sm:mb-3 tracking-tight">
                Visit Us
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-base text-[#526056] leading-relaxed max-w-md">
                Find us at our cozy location, or get in touch via phone or email. We'd love to welcome you soon!
              </p>
            </div>

            {/* 3 Contact Info Rows */}
            <div className="space-y-2.5 sm:space-y-3.5 pt-1 sm:pt-2">
              {/* Address */}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-xl hover:bg-black/[0.02] transition-colors duration-200 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#16271e] text-white flex items-center justify-center flex-shrink-0 shadow-xs transition-transform group-hover:scale-105">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a2b21] text-xs sm:text-base">
                    {addressLine1}
                  </h4>
                  <p className="text-[11px] sm:text-sm text-[#5f6d63]">
                    {addressLine2}
                  </p>
                </div>
              </a>

              {/* Phone & Timings */}
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-xl hover:bg-black/[0.02] transition-colors duration-200 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#16271e] text-white flex items-center justify-center flex-shrink-0 shadow-xs transition-transform group-hover:scale-105">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a2b21] text-xs sm:text-base">
                    {phone}
                  </h4>
                  <p className="text-[11px] sm:text-sm text-[#5f6d63]">
                    {hours}
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 sm:gap-4 p-2 sm:p-2.5 rounded-xl hover:bg-black/[0.02] transition-colors duration-200 group cursor-pointer"
              >
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#16271e] text-white flex items-center justify-center flex-shrink-0 shadow-xs transition-transform group-hover:scale-105">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#1a2b21] text-xs sm:text-base">
                    {email}
                  </h4>
                  <p className="text-[11px] sm:text-sm text-[#5f6d63]">
                    {responseTime}
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Rectangular Our Location Box matching reference photo */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-[460px] rounded-2xl sm:rounded-3xl p-3 sm:p-5 bg-white border border-[#e8dfd1] shadow-md transition-all">
              {/* Map Canvas - Rectangular aspect on mobile: h-[160px] sm:h-[300px] */}
              <div className="relative w-full h-[160px] sm:h-[300px] rounded-xl sm:rounded-2xl overflow-hidden bg-[#eef0eb] border border-[#e4dbce]">
                {/* Stylized vector map pattern */}
                <div className="absolute inset-0 opacity-90">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 500 340"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Background tint */}
                    <rect width="500" height="340" fill="#f2efe9" />

                    {/* Parks & green spaces */}
                    <path
                      d="M20 180 L160 160 L180 280 L40 290 Z"
                      fill="#d0e2d3"
                      stroke="#bdd0c1"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M420 220 L490 220 L490 280 L430 270 Z"
                      fill="#d5e5d8"
                      stroke="#c1d3c4"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M220 20 L270 20 L280 70 L230 65 Z"
                      fill="#dbe8de"
                    />

                    {/* City Grid Roads */}
                    <path
                      d="M-10 60 L510 60 M-10 120 L510 120 M-10 200 L510 200 M-10 260 L510 260"
                      stroke="#ffffff"
                      strokeWidth="6"
                    />
                    <path
                      d="M80 -10 L80 350 M170 -10 L170 350 M250 -10 L250 350 M330 -10 L330 350 M410 -10 L410 350"
                      stroke="#ffffff"
                      strokeWidth="6"
                    />

                    {/* Diagonal Avenue */}
                    <path
                      d="M-20 290 L320 20 L520 20"
                      stroke="#ffffff"
                      strokeWidth="9"
                    />
                    <path
                      d="M-20 290 L320 20 L520 20"
                      stroke="#ebdcc4"
                      strokeWidth="3"
                    />

                    {/* Secondary roads */}
                    <path
                      d="M20 10 L20 340 M120 10 L120 340 M210 10 L210 340 M290 10 L290 340 M370 10 L370 340 M460 10 L460 340"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M0 30 L500 30 M0 90 L500 90 M0 160 L500 160 M0 230 L500 230 M0 300 L500 300"
                      stroke="#ffffff"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M170 80 L350 240 M60 210 L220 350"
                      stroke="#fbf8f3"
                      strokeWidth="4"
                    />
                  </svg>
                </div>

                {/* Pin + "Our Location" Callout Bubble */}
                <div className="absolute top-[28%] left-[52%] -translate-x-1/2 -translate-y-full flex flex-col items-center pointer-events-none drop-shadow-md">
                  {/* Black pill bubble */}
                  <div className="bg-[#111613] text-white text-[10px] sm:text-[13px] font-semibold px-2.5 py-1 sm:px-4 sm:py-2 rounded-full whitespace-nowrap shadow-lg flex items-center gap-1 border border-white/10">
                    <span>Our Location</span>
                  </div>
                  {/* Bubble pointer triangle */}
                  <div className="w-0 h-0 border-l-[4px] sm:border-l-[6px] border-l-transparent border-r-[4px] sm:border-r-[6px] border-r-transparent border-t-[5px] sm:border-t-[7px] border-t-[#111613]" />

                  {/* Pin Circle with Map Marker */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#111613] border-[1.5px] sm:border-2 border-white text-white flex items-center justify-center -mt-0.5 sm:-mt-1 shadow-md">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#ebb340] fill-[#ebb340]" />
                  </div>
                </div>
              </div>

              {/* "Get Directions →" Button below map matching reference photo beige pill */}
              <div className="mt-2.5 sm:mt-4">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 active:scale-[0.99] font-medium text-xs sm:text-base py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-full bg-[#ebdcc4] hover:bg-[#dfcdb1] text-[#29221b] transition-all duration-200 cursor-pointer shadow-xs group"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#29221b] group-hover:translate-x-0.5 transition-transform" />
                  <span>Get Directions</span>
                  <span className="font-normal">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
