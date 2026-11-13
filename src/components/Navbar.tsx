import React, { useState } from 'react';
import { ShoppingCart, ArrowRight, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
  activeTab: string;
  onNavigate: (sectionId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOrderModal: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  cartCount,
  onOpenCart,
  onOpenOrderModal,
  onOpenAdmin,
}) => {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Dishes', id: 'featured' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'About', id: 'about' },
    { name: 'Menu', id: 'menu' },
    { name: 'Reviews', id: 'reviews' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setMobileMenuOpen(false);
    // Give mobile menu a tiny frame to close before scroll coordinate calculation
    setTimeout(() => {
      onNavigate(id);
    }, 15);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#051710] border-b border-[#0f2e21] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => handleLinkClick('home')} className="cursor-pointer">
          <Logo size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-7">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-xs lg:text-sm font-medium transition-all duration-200 cursor-pointer relative py-2 ${
                  isActive
                    ? 'text-[#ebb340] font-semibold'
                    : 'text-[#e5ece8] hover:text-[#ebb340]'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ebb340] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon with Red Badge */}
          <button
            onClick={onOpenCart}
            aria-label="View shopping cart"
            className="relative p-2 text-white hover:text-[#ebb340] transition cursor-pointer"
          >
            <ShoppingCart className="w-6 h-6 stroke-[2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ef4444] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#051710] shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Admin Portal Button */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              aria-label="Open Admin Panel"
              className="p-2 text-[#ebb340]/80 hover:text-[#ebb340] hover:bg-[#0b281d] rounded-full transition cursor-pointer"
              title="Admin Portal (Username: 123456789)"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-[2]"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </button>
          )}

          {/* Golden Order Online Button */}
          <button
            onClick={onOpenOrderModal}
            className="hidden sm:inline-flex items-center gap-1.5 bg-[#ebb340] hover:bg-[#dfa732] active:scale-95 text-[#111111] font-semibold text-sm px-5 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <span>Order Online</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#ebb340] transition cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#071d14] border-b border-[#0f3426] px-5 py-4 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`block w-full text-left py-2 text-base font-medium transition ${
                activeTab === link.id ? 'text-[#ebb340] font-bold pl-2 border-l-2 border-[#ebb340]' : 'text-gray-200 hover:text-white'
              }`}
            >
              {link.name}
            </button>
          ))}
          {onOpenAdmin && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="block w-full text-left py-2 text-sm text-[#ebb340] font-medium transition flex items-center gap-2 border-t border-[#0f3426] pt-3"
            >
              <span>👑 Admin Management Console</span>
            </button>
          )}
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#ebb340] hover:bg-[#dfa732] text-black font-semibold text-sm py-2.5 rounded-full"
            >
              <span>Order Online</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      )}
    </header>
  );
};
