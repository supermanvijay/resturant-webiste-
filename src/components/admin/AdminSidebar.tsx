import React from 'react';
import {
  LayoutDashboard,
  UtensilsCrossed,
  Sparkles,
  Images,
  Globe,
  LogOut,
  X,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

export type AdminTab = 'overview' | 'menu' | 'featured' | 'gallery';

interface AdminSidebarProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  onViewWebsite: () => void;
  menuCount: number;
  featuredCount: number;
  galleryCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpen,
  onClose,
  onLogout,
  onViewWebsite,
  menuCount,
  featuredCount,
  galleryCount,
}) => {
  const navItems = [
    {
      id: 'overview' as AdminTab,
      label: 'Dashboard Overview',
      icon: LayoutDashboard,
      badge: null,
      desc: 'Metrics & Quick Actions',
    },
    {
      id: 'menu' as AdminTab,
      label: 'Menu Management',
      icon: UtensilsCrossed,
      badge: menuCount,
      desc: 'All Categories & Pricing',
    },
    {
      id: 'featured' as AdminTab,
      label: 'Featured Dishes',
      icon: Sparkles,
      badge: featuredCount,
      desc: 'Showcase & Reordering',
    },
    {
      id: 'gallery' as AdminTab,
      label: 'Gallery Management',
      icon: Images,
      badge: galleryCount,
      desc: 'Photos & Captions',
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0c0c10] border-r border-[#d4af37]/20 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c1b18] to-[#0a0a09] border border-[#d4af37]/50 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              <span className="text-xl">👑</span>
            </div>
            <div>
              <h2 className="text-base font-serif font-bold text-white tracking-wide">
                Royal Bites
              </h2>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] font-semibold block">
                Admin Console
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-gray-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3.5 py-6 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-semibold">
            Core Modules
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all cursor-pointer text-left group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#d4af37]/20 to-transparent border border-[#d4af37]/40 text-white shadow-[0_2px_15px_rgba(212,175,55,0.15)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-[#14141c]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-[#d4af37] text-black shadow-[0_0_10px_rgba(212,175,55,0.4)]'
                        : 'bg-[#161622] text-gray-400 group-hover:text-[#d4af37]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div
                      className={`text-xs font-medium tracking-wide ${
                        isActive ? 'text-white font-semibold' : 'text-gray-300'
                      }`}
                    >
                      {item.label}
                    </div>
                    <div className="text-[10px] text-gray-500 truncate max-w-[120px]">
                      {item.desc}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge !== null && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-[#d4af37] text-black'
                          : 'bg-[#1b1b26] text-[#d4af37] border border-[#d4af37]/20'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#d4af37]" />}
                </div>
              </button>
            );
          })}

          <div className="pt-6 px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-gray-500 font-semibold">
            Live Preview
          </div>

          <button
            onClick={onViewWebsite}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#14141c] transition-colors cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#161622] flex items-center justify-center text-gray-400 group-hover:text-emerald-400">
              <Globe className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-medium text-gray-300 group-hover:text-white">
                View Live Website
              </div>
              <div className="text-[10px] text-gray-500">Public Restaurant View</div>
            </div>
          </button>
        </div>

        {/* Footer / User Profile & Logout */}
        <div className="p-4 border-t border-gray-800/80 bg-[#08080c]">
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#f5d59f] text-black font-bold text-xs flex items-center justify-center">
                RB
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Administrator</div>
                <div className="text-[10px] font-mono text-[#d4af37]/80">ID: 123456789</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </span>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-950/60 border border-red-500/20 py-2.5 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
};
