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
import { ReviewsAndGallery } from './components/ReviewsAndGallery';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { FullMenuModal } from './components/FullMenuModal';
import { AboutModal } from './components/AboutModal';
import { GalleryModal } from './components/GalleryModal';
import { ContactModal } from './components/ContactModal';
import { AdminDashboard } from './components/AdminDashboard';
import { DishDetailModal } from './components/DishDetailModal';
import { NotificationToast } from './components/NotificationToast';
import { storageService } from './services/storageService';
import { INITIAL_REVIEWS, INITIAL_GALLERY } from './data/initialData';
import { FoodItem, CartItem, GalleryPhoto } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [dishes, setDishes] = useState<FoodItem[]>(() => storageService.getMenuItems());
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
  const [adminOpen, setAdminOpen] = useState(false);

  // Toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync state when storage updates
  useEffect(() => {
    const handleStorageUpdate = () => {
      setDishes(storageService.getMenuItems());
      setCart(storageService.getCart());
      setFavorites(storageService.getFavorites());
    };

    window.addEventListener('royal_bites_db_update', handleStorageUpdate);
    return () => window.removeEventListener('royal_bites_db_update', handleStorageUpdate);
  }, []);

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

  // Navigation router / handler
  const handleNavigate = (sectionId: string) => {
    setActiveTab(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (sectionId === 'about') {
      const el = document.getElementById('about-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setAboutOpen(true);
    } else if (sectionId === 'menu') {
      const el = document.getElementById('menu-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setFullMenuOpen(true);
    } else if (sectionId === 'gallery') {
      const el = document.getElementById('gallery-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setGalleryOpen(true);
    } else if (sectionId === 'reservations') {
      setReservationOpen(true);
    } else if (sectionId === 'contact') {
      const el = document.getElementById('footer-contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else setContactOpen(true);
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
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section id="home-section">
          <Hero
            onExploreMenu={() => setFullMenuOpen(true)}
            onBookTable={() => setReservationOpen(true)}
          />
        </section>

        {/* 3. Featured Dishes Section with new Premium Food Cards */}
        <section id="featured-dishes-section">
          <FeaturedDishes
            dishes={dishes}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenDetails={handleOpenDetails}
            onAddToCart={handleAddToCart}
          />
        </section>

        {/* 4. About Us Section */}
        <section id="about-section">
          <AboutSection onLearnMore={() => setAboutOpen(true)} />
        </section>

        {/* 5. Menu & Special Offer Section with new Premium Food Cards */}
        <section id="menu-section">
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

        {/* 6. Customer Reviews & Gallery Section */}
        <section id="gallery-section">
          <ReviewsAndGallery
            reviews={INITIAL_REVIEWS}
            gallery={INITIAL_GALLERY}
            onViewMoreGallery={() => {
              setSelectedPhoto(null);
              setGalleryOpen(true);
            }}
            onPhotoClick={(photo) => {
              setSelectedPhoto(photo);
              setGalleryOpen(true);
            }}
          />
        </section>
      </main>

      {/* 7. Footer Section */}
      <div id="footer-contact">
        <Footer
          onNavigate={handleNavigate}
          onOpenAdmin={() => setAdminOpen(true)}
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
        gallery={INITIAL_GALLERY}
        selectedPhoto={selectedPhoto}
      />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onShowToast={showToast}
      />

      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        dishes={dishes}
        onDishesUpdated={() => setDishes(storageService.getMenuItems())}
        onShowToast={showToast}
      />

      <NotificationToast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
