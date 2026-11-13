import React from 'react';
import {
  UtensilsCrossed,
  Sparkles,
  Images,
  Plus,
  ArrowUpRight,
  Clock,
  ShieldCheck,
  Activity,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { AdminAuditLog } from '../../types';
import { AdminTab } from './AdminSidebar';

interface AdminOverviewProps {
  menuCount: number;
  featuredCount: number;
  galleryCount: number;
  auditLogs: AdminAuditLog[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddMenu: () => void;
  onOpenAddFeatured: () => void;
  onOpenAddGallery: () => void;
  onViewWebsite: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  menuCount,
  featuredCount,
  galleryCount,
  auditLogs,
  onNavigateTab,
  onOpenAddMenu,
  onOpenAddFeatured,
  onOpenAddGallery,
  onViewWebsite,
}) => {
  const getActionBadge = (action: AdminAuditLog['action']) => {
    switch (action) {
      case 'CREATE':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'UPDATE':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'DELETE':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'REORDER':
        return 'bg-amber-500/10 text-[#d4af37] border-[#d4af37]/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  const formatTimestamp = (iso: string) => {
    try {
      const date = new Date(iso);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#14141c] via-[#101017] to-[#0c0c10] border border-[#d4af37]/25 p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Real-Time Database Connected</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight mb-2">
              Welcome back, <span className="text-[#d4af37]">Executive Admin</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 max-w-2xl leading-relaxed">
              Manage culinary offerings, front-page signature dishes, and gallery photography in real time.
              All updates sync instantly with the customer-facing website.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onViewWebsite}
              className="px-4 py-2.5 rounded-xl bg-[#1b1b26] hover:bg-[#252535] text-gray-200 text-xs font-semibold border border-gray-700/60 hover:border-[#d4af37]/50 transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>View Public Site</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={onOpenAddMenu}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5be82] hover:brightness-110 active:scale-95 text-black text-xs font-bold transition-all shadow-[0_4px_15px_rgba(212,175,55,0.3)] cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4 text-black stroke-[3]" />
              <span>Add Dish</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Counters + Live Sync Indicator */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Counter 1: Total Menu Items */}
        <div
          onClick={() => onNavigateTab('menu')}
          className="relative group p-5 sm:p-6 rounded-2xl bg-[#0f0f15]/90 border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.12)] cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#181824] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Active Menu
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">
            {menuCount}
          </div>
          <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
            Total Menu Items
          </div>
          <div className="text-[11px] text-gray-500 flex items-center justify-between pt-2 border-t border-gray-800/60">
            <span>Starters, Mains, Biryani & more</span>
            <span className="text-[#d4af37] group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Counter 2: Total Featured Dishes */}
        <div
          onClick={() => onNavigateTab('featured')}
          className="relative group p-5 sm:p-6 rounded-2xl bg-[#0f0f15]/90 border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.12)] cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#181824] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30">
              Homepage Carousel
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">
            {featuredCount}
          </div>
          <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
            Featured Dishes
          </div>
          <div className="text-[11px] text-gray-500 flex items-center justify-between pt-2 border-t border-gray-800/60">
            <span>Reorder & badge badges</span>
            <span className="text-[#d4af37] group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Counter 3: Total Gallery Images */}
        <div
          onClick={() => onNavigateTab('gallery')}
          className="relative group p-5 sm:p-6 rounded-2xl bg-[#0f0f15]/90 border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,175,55,0.12)] cursor-pointer overflow-hidden"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#181824] border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] group-hover:scale-105 transition-transform">
              <Images className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Media Assets
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-serif font-bold text-white mb-1 group-hover:text-[#d4af37] transition-colors">
            {galleryCount}
          </div>
          <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">
            Total Gallery Images
          </div>
          <div className="text-[11px] text-gray-500 flex items-center justify-between pt-2 border-t border-gray-800/60">
            <span>Dining hall & ambiance</span>
            <span className="text-[#d4af37] group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Counter 4: Real-Time Sync Status */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0f0f15]/90 border border-emerald-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Sync
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-serif font-bold text-emerald-400 mb-1">
              Synchronized
            </div>
            <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Instant Website Updates
            </div>
          </div>
          <div className="text-[11px] text-gray-500 pt-3 border-t border-gray-800/60 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Zero build delay on edits</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons Grid */}
      <div className="rounded-2xl bg-[#0f0f15]/80 border border-gray-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#d4af37]" />
            Quick Action Panel
          </h2>
          <span className="text-xs text-gray-500">1-click restaurant operations</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={onOpenAddMenu}
            className="p-3.5 rounded-xl bg-[#151520] hover:bg-[#1c1c2b] border border-gray-700/60 hover:border-[#d4af37]/50 text-left transition-all cursor-pointer group flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-[#d4af37]">
                Add Menu Dish
              </div>
              <div className="text-[11px] text-gray-500">Create new culinary item</div>
            </div>
          </button>

          <button
            onClick={onOpenAddFeatured}
            className="p-3.5 rounded-xl bg-[#151520] hover:bg-[#1c1c2b] border border-gray-700/60 hover:border-[#d4af37]/50 text-left transition-all cursor-pointer group flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-[#d4af37]">
                Add Featured Item
              </div>
              <div className="text-[11px] text-gray-500">Highlight on homepage</div>
            </div>
          </button>

          <button
            onClick={onOpenAddGallery}
            className="p-3.5 rounded-xl bg-[#151520] hover:bg-[#1c1c2b] border border-gray-700/60 hover:border-[#d4af37]/50 text-left transition-all cursor-pointer group flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Images className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-[#d4af37]">
                Upload Photo
              </div>
              <div className="text-[11px] text-gray-500">Add ambiance or dish shot</div>
            </div>
          </button>

          <button
            onClick={onViewWebsite}
            className="p-3.5 rounded-xl bg-[#151520] hover:bg-[#1c1c2b] border border-gray-700/60 hover:border-emerald-500/50 text-left transition-all cursor-pointer group flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-white group-hover:text-emerald-300">
                Preview Live Site
              </div>
              <div className="text-[11px] text-gray-500">Test visitor experience</div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Updates Section */}
      <div className="rounded-2xl bg-[#0f0f15]/90 border border-[#d4af37]/20 p-6 shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div>
            <h2 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4af37]" />
              Recent Updates &amp; Database Activity
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Live audit trail of administrative modifications to menu, featured items, and gallery
            </p>
          </div>
          <span className="text-[11px] font-mono text-[#d4af37]/80 px-2.5 py-1 rounded-lg bg-[#181824] border border-[#d4af37]/20">
            {auditLogs.length} Records Logged
          </span>
        </div>

        {auditLogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-xs">
            No administrative updates recorded yet. Any change you make will appear here automatically.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 text-[11px] uppercase tracking-wider font-mono">
                  <th className="pb-3 font-semibold">Action</th>
                  <th className="pb-3 font-semibold">Section</th>
                  <th className="pb-3 font-semibold">Target Entity</th>
                  <th className="pb-3 font-semibold hidden md:table-cell">Modification Details</th>
                  <th className="pb-3 font-semibold text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {auditLogs.slice(0, 8).map((log) => (
                  <tr key={log.id} className="hover:bg-[#14141e] transition-colors">
                    <td className="py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${getActionBadge(
                          log.action
                        )}`}
                      >
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 text-gray-300 font-medium">
                      {log.entity}
                    </td>
                    <td className="py-3 text-white font-semibold">
                      {log.targetTitle}
                    </td>
                    <td className="py-3 text-gray-400 hidden md:table-cell max-w-xs truncate">
                      {log.details || 'Database record updated'}
                    </td>
                    <td className="py-3 text-right text-gray-500 font-mono text-[11px]">
                      {formatTimestamp(log.timestamp)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
