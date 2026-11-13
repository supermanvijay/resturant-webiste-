import React, { useState, useEffect } from 'react';
import {
  Menu as MenuIcon,
  Globe,
  LogOut,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { adminAuthService } from '../../services/adminAuth';
import { storageService } from '../../services/storageService';
import { FoodItem, FeaturedDish, GalleryItem, AdminAuditLog } from '../../types';
import { AdminLogin } from './AdminLogin';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminOverview } from './AdminOverview';
import { MenuManagement } from './MenuManagement';
import { FeaturedManagement } from './FeaturedManagement';
import { GalleryManagement } from './GalleryManagement';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (message: string) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  onShowToast,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    adminAuthService.isAuthenticated()
  );
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Database Data States
  const [menuItems, setMenuItems] = useState<FoodItem[]>(() =>
    storageService.getMenuItems()
  );
  const [featuredDishes, setFeaturedDishes] = useState<FeaturedDish[]>(() =>
    storageService.getFeaturedDishes()
  );
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(() =>
    storageService.getGalleryImages()
  );
  const [auditLogs, setAuditLogs] = useState<AdminAuditLog[]>(() =>
    storageService.getAuditLogs()
  );

  // Quick Action Modal openers
  const [openAddMenuInitially, setOpenAddMenuInitially] = useState(false);
  const [openAddFeaturedInitially, setOpenAddFeaturedInitially] = useState(false);
  const [openAddGalleryInitially, setOpenAddGalleryInitially] = useState(false);

  // Reload data from database tables
  const reloadData = () => {
    setMenuItems(storageService.getMenuItems());
    setFeaturedDishes(storageService.getFeaturedDishes());
    setGalleryItems(storageService.getGalleryImages());
    setAuditLogs(storageService.getAuditLogs());
  };

  // Sync when database updates
  useEffect(() => {
    const handleDbUpdate = () => {
      reloadData();
    };
    window.addEventListener('royal_bites_db_update', handleDbUpdate);
    return () => window.removeEventListener('royal_bites_db_update', handleDbUpdate);
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const handleAuthChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ authenticated: boolean }>;
      setIsAuthenticated(customEvent.detail.authenticated);
    };
    window.addEventListener('royal_bites_admin_auth_change', handleAuthChange);
    return () =>
      window.removeEventListener('royal_bites_admin_auth_change', handleAuthChange);
  }, []);

  if (!isOpen) return null;

  // Unauthenticated: Render Luxury Login Page
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <AdminLogin
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            onShowToast('👑 Authenticated as Executive Administrator');
          }}
          onBackToWebsite={onClose}
        />
      </div>
    );
  }

  // Handle Logout
  const handleLogout = () => {
    adminAuthService.logout();
    setIsAuthenticated(false);
    onShowToast('Signed out of Admin Console');
  };

  // Menu Handlers
  const handleAddDish = (dish: Omit<FoodItem, 'id'>) => {
    storageService.addMenuItem(dish);
    reloadData();
    onShowToast(`Dish "${dish.name}" added to menu database!`);
  };

  const handleUpdateDish = (dish: FoodItem) => {
    storageService.updateMenuItem(dish);
    reloadData();
    onShowToast(`Dish "${dish.name}" updated successfully!`);
  };

  const handleDeleteDish = (id: string, name: string) => {
    storageService.deleteMenuItem(id);
    reloadData();
    onShowToast(`"${name}" removed from menu.`);
  };

  // Featured Dishes Handlers
  const handleAddFeaturedDish = (
    dish: Omit<FeaturedDish, 'id' | 'order' | 'updatedAt'>
  ) => {
    storageService.addFeaturedDish(dish);
    reloadData();
    onShowToast(`Featured dish "${dish.title}" added to showcase!`);
  };

  const handleUpdateFeaturedDish = (dish: FeaturedDish) => {
    storageService.updateFeaturedDish(dish);
    reloadData();
    onShowToast(`Featured dish "${dish.title}" updated!`);
  };

  const handleDeleteFeaturedDish = (id: string, title: string) => {
    storageService.deleteFeaturedDish(id);
    reloadData();
    onShowToast(`"${title}" removed from featured showcase.`);
  };

  const handleReorderFeaturedDish = (fromIndex: number, toIndex: number) => {
    storageService.reorderFeaturedDishes(fromIndex, toIndex);
    reloadData();
    onShowToast('Featured dishes showcase order updated!');
  };

  // Gallery Handlers
  const handleAddGalleryItem = (
    item: Omit<GalleryItem, 'id' | 'order' | 'createdAt'>
  ) => {
    storageService.addGalleryImage(item);
    reloadData();
    onShowToast(`Gallery photo "${item.title}" uploaded!`);
  };

  const handleUpdateGalleryItem = (item: GalleryItem) => {
    storageService.updateGalleryImage(item);
    reloadData();
    onShowToast(`Gallery photo "${item.title}" updated!`);
  };

  const handleDeleteGalleryItem = (id: string, title: string) => {
    storageService.deleteGalleryImage(id);
    reloadData();
    onShowToast(`Photo "${title}" deleted from gallery.`);
  };

  const handleReorderGalleryItem = (fromIndex: number, toIndex: number) => {
    storageService.reorderGalleryImages(fromIndex, toIndex);
    reloadData();
    onShowToast('Gallery display order updated!');
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-[#07070a] text-gray-100 overflow-hidden font-sans selection:bg-[#d4af37] selection:text-black">
      {/* 1. Luxury Admin Sidebar */}
      <AdminSidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={handleLogout}
        onViewWebsite={onClose}
        menuCount={menuItems.length}
        featuredCount={featuredDishes.length}
        galleryCount={galleryItems.length}
      />

      {/* 2. Main Content Canvas */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-16 px-4 sm:px-8 border-b border-gray-800/80 bg-[#0b0b10]/95 backdrop-blur-md flex items-center justify-between shrink-0 z-10">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#14141e] text-gray-300 hover:text-white"
            >
              <MenuIcon className="w-5 h-5" />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-400 hidden sm:inline">Admin Console</span>
              <ChevronRight className="w-3.5 h-3.5 text-gray-600 hidden sm:inline" />
              <span className="text-[#d4af37] font-semibold capitalize font-mono">
                {activeTab === 'overview'
                  ? 'Dashboard Overview'
                  : activeTab === 'menu'
                  ? 'Menu Items'
                  : activeTab === 'featured'
                  ? 'Featured Dishes'
                  : 'Gallery & Media'}
              </span>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#151520] hover:bg-[#1e1e2d] text-gray-300 hover:text-white border border-gray-700/60 text-xs font-medium transition cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>Live Website</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-[#151520] hover:bg-red-950/40 text-gray-400 hover:text-red-400 border border-gray-800 transition cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Scrollable Workspace Container */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <AdminOverview
              menuCount={menuItems.length}
              featuredCount={featuredDishes.length}
              galleryCount={galleryItems.length}
              auditLogs={auditLogs}
              onNavigateTab={setActiveTab}
              onOpenAddMenu={() => {
                setActiveTab('menu');
                setOpenAddMenuInitially(true);
              }}
              onOpenAddFeatured={() => {
                setActiveTab('featured');
                setOpenAddFeaturedInitially(true);
              }}
              onOpenAddGallery={() => {
                setActiveTab('gallery');
                setOpenAddGalleryInitially(true);
              }}
              onViewWebsite={onClose}
            />
          )}

          {activeTab === 'menu' && (
            <MenuManagement
              dishes={menuItems}
              onAddDish={handleAddDish}
              onUpdateDish={handleUpdateDish}
              onDeleteDish={handleDeleteDish}
              isAddModalOpenInitially={openAddMenuInitially}
              onCloseInitialModal={() => setOpenAddMenuInitially(false)}
            />
          )}

          {activeTab === 'featured' && (
            <FeaturedManagement
              featuredDishes={featuredDishes}
              onAddFeaturedDish={handleAddFeaturedDish}
              onUpdateFeaturedDish={handleUpdateFeaturedDish}
              onDeleteFeaturedDish={handleDeleteFeaturedDish}
              onReorderFeaturedDish={handleReorderFeaturedDish}
              isAddModalOpenInitially={openAddFeaturedInitially}
              onCloseInitialModal={() => setOpenAddFeaturedInitially(false)}
            />
          )}

          {activeTab === 'gallery' && (
            <GalleryManagement
              galleryItems={galleryItems}
              onAddGalleryItem={handleAddGalleryItem}
              onUpdateGalleryItem={handleUpdateGalleryItem}
              onDeleteGalleryItem={handleDeleteGalleryItem}
              onReorderGalleryItem={handleReorderGalleryItem}
              isAddModalOpenInitially={openAddGalleryInitially}
              onCloseInitialModal={() => setOpenAddGalleryInitially(false)}
            />
          )}
        </main>
      </div>
    </div>
  );
};
