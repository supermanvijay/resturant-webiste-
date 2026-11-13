/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedDishes } from './components/FeaturedDishes';
import { AboutSection } from './components/AboutSection';
import { MenuAndOffer } from './components/MenuAndOffer';
import { OurGallerySection } from './components/OurGallerySection';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { VisitUs } from './components/VisitUs';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { FullMenuModal } from './components/FullMenuModal';
import { AboutModal } from './components/AboutModal';
import { GalleryModal } from './components/GalleryModal';
import { ContactModal } from './components/ContactModal';
import { AdminPanel } from './components/admin/AdminPanel';
import { DishDetailModal } from './components/DishDetailModal';
import { NotificationToast } from './components/NotificationToast';
import { storageService } from './services/storageService';
import { INITIAL_REVIEWS } from './data/initialData';
import { FoodItem, CartItem, GalleryPhoto, FeaturedDish, GalleryItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [dishes, setDishes] = useState<FoodItem[]>(() => storageService.getMenuItems());
  const [featuredDishes, setFeaturedDishes] = useState<FeaturedDish[]>(() => storageService.getFeaturedDishes());
  const [gallery, setGallery] = useState<GalleryItem[]>(() => storageService.getGalleryImages());
  const [cart, setCart] = useState<CartItem[]>(() => storageService.getCart());
  const [favorites, setFavorites] = useState<string[]>(() => storageService.getFavorites());

  // Modals state
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [fullMenuOpen, setFullMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedDishForDetails, setSelectedDishForDetails] = useState<FoodItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(() => window.location.hash === '#admin');

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync state when database storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setDishes(storageService.getMenuItems());
      setFeaturedDishes(storageService.getFeaturedDishes());
      setGallery(storageService.getGalleryImages());
      setCart(storageService.getCart());
      setFavorites(storageService.getFavorites());
    };

    window.addEventListener('royal_bites_db_update', handleStorageUpdate);
    return () => window.removeEventListener('royal_bites_db_update', handleStorageUpdate);
  }, []);

  // Listen for hashchange to open Admin Panel via #admin
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setAdminOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Compute live featured dishes formatted for FoodCard / FeaturedDishes carousel
  const featuredFoodItems: FoodItem[] = featuredDishes.map((f) => ({
    id: f.id,
    name: f.title,
    category: (f.category as any) || 'Main Course',
    price: f.price,
    subtitle: f.badge || f.description.slice(0, 45),
    description: f.description,
    image: f.image,
    isVeg: !!f.isVeg,
    isFeatured: true,
    isPopular: f.badge === 'Popular' || !!f.isPopular,
    rating: f.rating || 5.0,
  }));


  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cart operations
  const handleAddToCart = (dish: FoodItem, quantity: number = 1) => {
    const updated = storageService.addToCart(dish, quantity);
    setCart([...updated]);
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${dish.name} to basket!`);
  };

  const handleUpdateQuantity = (itemId: string, qty: number) => {
    const updated = storageService.updateCartQuantity(itemId, qty);
    setCart([...updated]);
  };

  const handleRemoveItem = (itemId: string) => {
    const updated = storageService.removeFromCart(itemId);
    setCart([...updated]);
  };

  const handleToggleFavorite = (dishId: string) => {
    const isFav = favorites.includes(dishId);
    const updated = storageService.toggleFavorite(dishId);
    setFavorites([...updated]);
    showToast(isFav ? 'Removed from favorites' : 'Saved to favorites ❤️');
  };

  const handleOpenDetails = (dish: FoodItem) => {
    setSelectedDishForDetails(dish);
  };

  // Precise scroll-to-start helper that aligns section top right below sticky header
  const scrollToElementStart = (id: string): boolean => {
    const el = document.getElementById(id);
    if (!el) return false;

    // Sticky navbar height (default 80px)
    const header = document.querySelector('header');
    const headerHeight = header ? header.getBoundingClientRect().height : 80;

    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    // Exactly at start of section beneath navbar
    const offsetPosition = Math.max(0, Math.round(elementPosition - headerHeight));

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
    return true;
  };

  // Keep activeTab in sync with current viewport section when scrolling
  useEffect(() => {
    const sections = [
      { id: 'home-section', tab: 'home' },
      { id: 'featured-dishes-section', tab: 'featured' },
      { id: 'gallery-section', tab: 'gallery' },
      { id: 'about-section', tab: 'about' },
      { id: 'menu-section', tab: 'menu' },
      { id: 'reviews-section', tab: 'reviews' },
      { id: 'contact-section', tab: 'contact' },
    ];

    const handleScroll = () => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.getBoundingClientRect().height : 80;
      const scrollPosition = window.pageYOffset + headerHeight + 80;

      for (let i = sections.length - 1; i >= 0; i--) {
        const item = sections[i];
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveTab(item.tab);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation router / handler
  const handleNavigate = (sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'featured' || sectionId === 'dishes' || sectionId === 'featured-dishes') {
      scrollToElementStart('featured-dishes-section');
    } else if (sectionId === 'about') {
      const scrolled = scrollToElementStart('about-section');
      if (!scrolled) setAboutOpen(true);
    } else if (sectionId === 'menu') {
      const scrolled = scrollToElementStart('menu-section');
      if (!scrolled) setFullMenuOpen(true);
    } else if (sectionId === 'gallery') {
      const scrolled = scrollToElementStart('gallery-section');
      if (!scrolled) setGalleryOpen(true);
    } else if (sectionId === 'reservations' || sectionId === 'reservation') {
      setReservationOpen(true);
    } else if (sectionId === 'reviews' || sectionId === 'review') {
      scrollToElementStart('reviews-section');
    } else if (sectionId === 'contact' || sectionId === 'location') {
      const scrolled = scrollToElementStart('contact-section') || scrollToElementStart('footer-contact');
      if (!scrolled) setContactOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f3] text-gray-900 flex flex-col font-sans">
      {/* 1. Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenOrderModal={() => setCheckoutOpen(true)}
        onOpenAdmin={() => {
          setAdminOpen(true);
          window.location.hash = '#admin';
        }}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home-section" className="scroll-mt-20">
          <Hero
            onExploreMenu={() => {
              const scrolled = scrollToElementStart('menu-section');
              if (!scrolled) setFullMenuOpen(true);
            }}
            onBookTable={() => setReservationOpen(true)}
          />
        </section>

        {/* 1. Our Featured Dishes (Connected to Live Database Table & Reordering) */}
        <section id="featured-dishes-section" className="scroll-mt-20 sm:scroll-mt-24">
          <FeaturedDishes
            dishes={featuredFoodItems}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetails={handleOpenDetails}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* 2. Our Gallery (Connected to Live Media Database Table) */}
        <OurGallerySection
          gallery={gallery}
          onViewMoreGallery={() => {
            setSelectedPhoto(null);
            setGalleryOpen(true);
          }}
          onPhotoClick={(photo) => {
            setSelectedPhoto(photo);
            setGalleryOpen(true);
          }}
        />

        {/* 3. About Section */}
        <section id="about-section" className="scroll-mt-20 sm:scroll-mt-24">
          <AboutSection onLearnMore={() => setAboutOpen(true)} />
        </section>

        {/* 4. Our Menu & Offers (Connected to Live Menu Database Table) */}
        <section id="menu-section" className="scroll-mt-20 sm:scroll-mt-24">
          <MenuAndOffer
            dishes={dishes}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetails={handleOpenDetails}
            onAddToCart={handleAddToCart}
            onViewFullMenu={() => setFullMenuOpen(true)}
            onOrderNow={() => {
              showToast('20% discount coupon applied automatically!');
              setCheckoutOpen(true);
            }}
          />
        </section>

        {/* 5. Customer Reviews */}
        <CustomerReviewsSection reviews={INITIAL_REVIEWS} />

        {/* 6. Contact / Visit Us */}
        <VisitUs onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* 7. Footer Section */}
      <div id="footer-contact">
        <Footer
          onNavigate={handleNavigate}
          onOpenAdmin={() => {
            setAdminOpen(true);
            window.location.hash = '#admin';
          }}
          onShowToast={showToast}
        />
      </div>

      {/* Dish Detail Modal (Triggered by Circular Arrow / Card click) */}
      <DishDetailModal
        dish={selectedDishForDetails}
        isOpen={!!selectedDishForDetails}
        onClose={() => setSelectedDishForDetails(null)}
        isFavorite={selectedDishForDetails ? favorites.includes(selectedDishForDetails.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onAddToCart={handleAddToCart}
      />

      {/* Interactive Modals & Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={(order) => {
          setCart(storageService.getCart());
          showToast(`Order #${order.id} confirmed! Kitchen has started preparation.`);
        }}
      />

      <ReservationModal
        isOpen={reservationOpen}
        onClose={() => setReservationOpen(false)}
        onSuccess={(res) => {
          showToast(`Table reserved for ${res.guests} guests on ${res.date} at ${res.time}!`);
        }}
      />

      <FullMenuModal
        isOpen={fullMenuOpen}
        onClose={() => setFullMenuOpen(false)}
        dishes={dishes}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onOpenDetails={handleOpenDetails}
        onAddToCart={handleAddToCart}
      />

      <AboutModal
        isOpen={aboutOpen}
        onClose={() => setAboutOpen(false)}
        onBookTable={() => {
          setAboutOpen(false);
          setReservationOpen(true);
        }}
      />

      <GalleryModal
        isOpen={galleryOpen}
        onClose={() => {
          setGalleryOpen(false);
          setSelectedPhoto(null);
        }}
        gallery={gallery}
        selectedPhoto={selectedPhoto}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onShowToast={showToast}
      />

      {/* Luxury Admin Panel (Protected, Session Authenticated, Credentials: 123456789 / 123456789) */}
      <AdminPanel
        isOpen={adminOpen}
        onClose={() => {
          setAdminOpen(false);
          if (window.location.hash === '#admin') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        onShowToast={showToast}
      />

      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
