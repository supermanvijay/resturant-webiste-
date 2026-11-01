import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Check,
  Facebook,
  Instagram,
  Twitter,
} from 'lucide-react';
import { Logo } from './Logo';
import { storageService } from '../services/storageService';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenAdmin?: () => void;
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid email address');
      return;
    }
    storageService.addSubscriber(email);
    setSubscribed(true);
    setEmail('');
    onShowToast('🎉 Thank you for subscribing to Royal Bites offers!');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent('Hello Royal Bites! I would like to make an inquiry.');
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <footer className="bg-[#051a11] text-gray-300 pt-12 pb-7 border-t border-[#0e3926]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 border-b border-[#123e2b]">
          {/* Col 1: Brand & Social (4 cols on desktop) */}
          <div className="lg:col-span-4 space-y-3.5">
            <div onClick={() => onNavigate('home')} className="cursor-pointer">
              <Logo size="md" />
            </div>
            <p className="text-sm font-medium text-[#d0ded7]">
              Good Food. Good Mood.
            </p>

            {/* Social Media Icons with official logos */}
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="#facebook"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Royal Bites Facebook');
                }}
                className="w-8 h-8 rounded-full border border-gray-600 hover:border-[#ebb340] text-gray-300 hover:text-[#ebb340] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 fill-current stroke-none" />
              </a>
              <a
                href="#instagram"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Royal Bites Instagram');
                }}
                className="w-8 h-8 rounded-full border border-gray-600 hover:border-[#ebb340] text-gray-300 hover:text-[#ebb340] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 stroke-[2]" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Royal Bites YouTube');
                }}
                className="w-8 h-8 rounded-full border border-gray-600 hover:border-[#ebb340] text-gray-300 hover:text-[#ebb340] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="YouTube"
              >
                {/* Authentic YouTube logo with clearly visible center play triangle */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-1.01 1.76-1.97 2.02C17.82 20 12 20 12 20s-5.82 0-7.573-.478c-.96-.26-1.716-1.035-1.97-2.02C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985 1.01-1.76 1.97-2.02C6.18 4 12 4 12 4s5.82 0 7.573.478c.96.26 1.716 1.035 1.97 2.02Z"
                    fill="currentColor"
                  />
                  <polygon points="10,8.5 16,12 10,15.5" fill="#051a11" />
                </svg>
              </a>
              <a
                href="#twitter"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Royal Bites Twitter / X');
                }}
                className="w-8 h-8 rounded-full border border-gray-600 hover:border-[#ebb340] text-gray-300 hover:text-[#ebb340] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                title="Twitter / X"
              >
                <Twitter className="w-4 h-4 fill-current stroke-none" />
              </a>
            </div>
          </div>

          {/* Col 2: Contact Us (3 cols on desktop) - REMOVED IN MOBILE VIEW ONLY */}
          <div className="hidden md:block lg:col-span-3 space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">
              Contact Us
            </h4>
            <div className="space-y-2 text-xs text-[#b8c9c0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ebb340] flex-shrink-0 mt-0.5" />
                <span>123 Food Street, Hyderabad, TS</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ebb340] flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ebb340] flex-shrink-0" />
                <a href="mailto:info@royalbites.in" className="hover:text-white transition">
                  info@royalbites.in
                </a>
              </div>
            </div>

            {/* WhatsApp Chat Button */}
            <div className="pt-1">
              <button
                onClick={openWhatsApp}
                className="inline-flex items-center gap-2 bg-[#25d366] hover:bg-[#20bd5a] text-white text-xs font-semibold px-4 py-2 rounded-full shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>WhatsApp Chat</span>
              </button>
            </div>
          </div>

          {/* Col 3: Quick Links - LINE BY LINE without Reservations (2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">
              Quick Links
            </h4>
            <div className="space-y-2 flex flex-col text-xs">
              <button
                onClick={() => onNavigate('home')}
                className="text-left text-[#b8c9c0] hover:text-[#ebb340] transition cursor-pointer"
              >
                Home
              </button>
              <button
                onClick={() => onNavigate('featured')}
                className="text-left text-[#b8c9c0] hover:text-[#ebb340] transition cursor-pointer"
              >
                Featured Dishes
              </button>
              <button
                onClick={() => onNavigate('gallery')}
                className="text-left text-[#b8c9c0] hover:text-[#ebb340] transition cursor-pointer"
              >
                Our Gallery
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left text-[#b8c9c0] hover:text-[#ebb340] transition cursor-pointer"
              >
                About Us
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="text-left text-[#b8c9c0] hover:text-[#ebb340] transition cursor-pointer"
              >
                Our Menu
              </button>
              <button
                onClick={() => onNavigate('reviews')}
                className="text-left text-[#b8c9c0] hover:text-[#ebb340] transition cursor-pointer"
              >
                Customer Reviews
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left text-[#b8c9c0] hover:text-[#ebb340] transition cursor-pointer"
              >
                Visit &amp; Contact
              </button>
            </div>
          </div>

          {/* Col 4: Newsletter (3 cols on desktop) - REMOVED IN MOBILE VIEW ONLY */}
          <div className="hidden md:block lg:col-span-3 space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide">
              Newsletter
            </h4>
            <p className="text-xs text-[#b8c9c0]">Get the latest offers!</p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full bg-white text-gray-900 placeholder-gray-400 text-xs px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ebb340]"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#ebb340] hover:bg-[#dfa732] active:scale-95 text-black font-semibold text-xs py-2 rounded-md transition shadow-xs cursor-pointer flex items-center justify-center gap-1"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Copyright Bar - ADMIN PORTAL REMOVED */}
        <div className="pt-5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 Royal Bites Restaurant. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onShowToast('Royal Bites Privacy Policy: Your data is secure with us.')}
              className="hover:text-white transition cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>|</span>
            <button
              onClick={() => onShowToast('Royal Bites Terms & Conditions: Best culinary quality guaranteed.')}
              className="hover:text-white transition cursor-pointer"
            >
              Terms & Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
