import React from 'react';
import { X, Award, Utensils, HeartHandshake, ShieldCheck, Clock, Sparkles } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookTable: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onBookTable,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-[#faf8f3] text-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border border-[#ebdcc4] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#051810] text-white p-5 flex items-center justify-between border-b border-[#0f3627]">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ebb340]" />
              <span className="text-[#ebb340] text-xs font-bold tracking-widest uppercase">
                HERITAGE & PASSION
              </span>
            </div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-white">
              About Royal Bites Restaurant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Hero Banner with Interior Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[21/9] border-2 border-[#ebb340]/40 shadow-lg">
            <img
              src="/extracted/about_interior.png"
              alt="Royal Bites Grand Dining Room"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="bg-[#ebb340] text-black text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Since 2012
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  A Decade of Culinary Excellence
                </h3>
              </div>
            </div>
          </div>

          {/* Our Story & Philosophy */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-[#0d4f32]">
              Our Story & Philosophy
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Royal Bites was born out of a profound admiration for the rich royal kitchens of the Nizams
              and the diverse spice heritage of India. Founded with a single mission: to craft unforgettable
              meals where every grain of basmati rice and every hand-ground masala speaks of authenticity,
              love, and precision.
            </p>
            <p className="text-sm text-gray-700 leading-relaxed">
              We slow-cook our handi curries on gentle wood embers (Dum pukht technique), ensuring juices
              remain locked in while creating velvety gravies rich with saffron, cardamom, and pure ghee.
            </p>
          </div>

          {/* Pillars of Royal Bites */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#eae0d0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#0d4f32]/10 text-[#0d4f32] flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">Fresh Ingredients</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Farm-fresh poultry, daily delivered organic greens, and stone-ground spices with zero artificial colors.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#eae0d0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#0d4f32]/10 text-[#0d4f32] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">Master Chefs</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Led by Executive Chef Farooq Siddiqui with 25+ years refining Mughlai and Hyderabadi masterpieces.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#eae0d0] shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-lg bg-[#0d4f32]/10 text-[#0d4f32] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-gray-900">Award Winning</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Recognized as "Best Authentic Hyderabadi Dum Biryani" by the Regional Culinary Guild 2024 & 2025.
              </p>
            </div>
          </div>

          {/* Gallery Snapshot */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-lg text-gray-900">
              Restaurant Highlights
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <img
                src="/extracted/gallery_1.png"
                alt="Ambiance"
                className="rounded-lg aspect-[4/3] object-cover border border-[#e5ded0]"
              />
              <img
                src="/extracted/gallery_2.png"
                alt="Wok Noodles"
                className="rounded-lg aspect-[4/3] object-cover border border-[#e5ded0]"
              />
              <img
                src="/extracted/gallery_3.png"
                alt="Cocktails"
                className="rounded-lg aspect-[4/3] object-cover border border-[#e5ded0]"
              />
              <img
                src="/extracted/gallery_4.png"
                alt="Banquets"
                className="rounded-lg aspect-[4/3] object-cover border border-[#e5ded0]"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f0ebe0] p-4 border-t border-[#ebdcc4] flex items-center justify-between">
          <span className="text-xs text-gray-600">
            Open daily 11:00 AM – 11:00 PM
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => {
                onClose();
                onBookTable();
              }}
              className="bg-[#ebb340] hover:bg-[#dfa732] text-black font-bold text-xs px-5 py-2.5 rounded-full transition cursor-pointer"
            >
              Book a Table Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
