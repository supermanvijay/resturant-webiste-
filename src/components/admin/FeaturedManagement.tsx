import React, { useState } from 'react';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Edit2,
  Trash2,
  Sparkles,
  Upload,
  X,
  AlertTriangle,
} from 'lucide-react';
import { FeaturedDish } from '../../types';

interface FeaturedManagementProps {
  featuredDishes: FeaturedDish[];
  onAddFeaturedDish: (dish: Omit<FeaturedDish, 'id' | 'order' | 'updatedAt'>) => void;
  onUpdateFeaturedDish: (dish: FeaturedDish) => void;
  onDeleteFeaturedDish: (id: string, title: string) => void;
  onReorderFeaturedDish: (fromIndex: number, toIndex: number) => void;
  isAddModalOpenInitially?: boolean;
  onCloseInitialModal?: () => void;
}

const BADGE_OPTIONS = [
  "Chef's Pick",
  'Popular',
  'Vegetarian',
  'Signature',
  'House Special',
  'Award Winning',
  'Seasonal',
];

const PRESET_IMAGES = [
  { label: 'Gourmet Cheeseburger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85' },
  { label: 'Creamy Herb Pasta', url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281081?auto=format&fit=crop&w=1000&q=85' },
  { label: 'Roasted Veg Bowl', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85' },
  { label: 'Thai Green Curry', url: '/extracted/dish_thai_green_curry.png' },
  { label: 'Chicken Biryani', url: '/extracted/dish_biryani.png' },
  { label: 'Grilled Salmon', url: '/extracted/dish_grilled_salmon.png' },
  { label: 'Paneer Butter Masala', url: '/extracted/dish_paneer.png' },
];

export const FeaturedManagement: React.FC<FeaturedManagementProps> = ({
  featuredDishes,
  onAddFeaturedDish,
  onUpdateFeaturedDish,
  onDeleteFeaturedDish,
  onReorderFeaturedDish,
  isAddModalOpenInitially = false,
  onCloseInitialModal,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(isAddModalOpenInitially);
  const [editingDish, setEditingDish] = useState<FeaturedDish | null>(null);

  // In-app Delete Confirmation Modal
  const [dishToDelete, setDishToDelete] = useState<FeaturedDish | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPrice, setFormPrice] = useState<number>(349);
  const [formBadge, setFormBadge] = useState<string>("Chef's Pick");
  const [formImage, setFormImage] = useState('');
  const [formIsVeg, setFormIsVeg] = useState(false);
  const [formRating, setFormRating] = useState<number>(5.0);
  const [formError, setFormError] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingDish(null);
    setFormTitle('');
    setFormDescription('');
    setFormPrice(349);
    setFormBadge("Chef's Pick");
    setFormImage(PRESET_IMAGES[0].url);
    setFormIsVeg(false);
    setFormRating(5.0);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (dish: FeaturedDish) => {
    setEditingDish(dish);
    setFormTitle(dish.title);
    setFormDescription(dish.description);
    setFormPrice(dish.price);
    setFormBadge(dish.badge || "Chef's Pick");
    setFormImage(dish.image);
    setFormIsVeg(!!dish.isVeg);
    setFormRating(dish.rating || 4.9);
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDish(null);
    setFormError(null);
    if (onCloseInitialModal) onCloseInitialModal();
  };

  // Image Upload handler (File Reader to Base64)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFormError('File size exceeds 5MB limit.');
        return;
      }
      setFormError(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setFormImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      setFormError('Featured dish title is required');
      return;
    }
    if (formPrice <= 0) {
      setFormError('Price must be greater than 0');
      return;
    }

    if (editingDish) {
      onUpdateFeaturedDish({
        ...editingDish,
        title: formTitle.trim(),
        name: formTitle.trim(),
        description: formDescription.trim(),
        price: Number(formPrice),
        badge: formBadge,
        image: formImage || PRESET_IMAGES[0].url,
        isVeg: formIsVeg,
        rating: Number(formRating),
      });
    } else {
      onAddFeaturedDish({
        title: formTitle.trim(),
        name: formTitle.trim(),
        description: formDescription.trim(),
        price: Number(formPrice),
        badge: formBadge,
        image: formImage || PRESET_IMAGES[0].url,
        isVeg: formIsVeg,
        isPopular: formBadge === 'Popular',
        rating: Number(formRating),
      });
    }

    closeModal();
  };

  const handleConfirmDelete = () => {
    if (dishToDelete) {
      onDeleteFeaturedDish(dishToDelete.id, dishToDelete.title);
      setDishToDelete(null);
      if (editingDish && editingDish.id === dishToDelete.id) {
        closeModal();
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0f0f15]/90 border border-[#d4af37]/20 shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span>Featured Dishes Management</span>
            <span className="text-xs font-mono font-normal text-[#d4af37] px-2.5 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
              {featuredDishes.length} Featured
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Admin can add, reorder, edit, and delete featured dishes. Updates sync instantly with the homepage carousel.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5be82] hover:brightness-110 active:scale-95 text-black font-semibold text-xs shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add Featured Dish</span>
        </button>
      </div>

      {/* Featured Dishes List / Cards with Reordering */}
      {featuredDishes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0f0f15]/80 border border-gray-800 text-gray-400 text-xs">
          No featured dishes in showcase. Click &quot;Add Featured Dish&quot; to populate your homepage carousel.
        </div>
      ) : (
        <div className="space-y-3">
          {featuredDishes.map((dish, index) => {
            const isFirst = index === 0;
            const isLast = index === featuredDishes.length - 1;

            return (
              <div
                key={dish.id}
                className="p-4 rounded-2xl bg-[#0f0f15]/95 border border-gray-800/80 hover:border-[#d4af37]/40 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
              >
                {/* Left: Reorder Controls + Image + Title Info */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {/* Reorder Buttons */}
                  <div className="flex flex-col items-center gap-1 shrink-0 bg-[#14141e] p-1 rounded-xl border border-gray-800">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => onReorderFeaturedDish(index, index - 1)}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        isFirst
                          ? 'text-gray-600 cursor-not-allowed opacity-30'
                          : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#1f1f2e]'
                      }`}
                      title="Move Up in Showcase Order"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] font-mono font-bold text-[#d4af37] px-1">
                      #{index + 1}
                    </span>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => onReorderFeaturedDish(index, index + 1)}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        isLast
                          ? 'text-gray-600 cursor-not-allowed opacity-30'
                          : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#1f1f2e]'
                      }`}
                      title="Move Down in Showcase Order"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Dish Thumbnail with Quick Delete overlay */}
                  <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden bg-black shrink-0 border border-gray-800 relative">
                    <img
                      src={dish.image}
                      alt={dish.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {dish.badge && (
                      <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-center px-1 py-0.5 rounded bg-black/80 text-[#d4af37] truncate border border-[#d4af37]/30">
                        {dish.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors truncate">
                        {dish.title}
                      </h3>
                      {dish.isVeg && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
                          VEG
                        </span>
                      )}
                      {dish.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 font-semibold">
                          {dish.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1 max-w-xl">
                      {dish.description}
                    </p>
                  </div>
                </div>

                {/* Right: Price & Edit/Delete actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-800">
                  <div className="text-right">
                    <div className="text-base font-bold font-mono text-[#d4af37] tabular-nums">
                      ₹{dish.price}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      Rating: ★ {dish.rating || 5.0}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(dish)}
                      className="p-2 rounded-xl bg-[#181824] hover:bg-[#d4af37] text-gray-300 hover:text-black transition cursor-pointer"
                      title="Edit Featured Dish"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDishToDelete(dish)}
                      className="p-2 rounded-xl bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition cursor-pointer flex items-center gap-1"
                      title="Delete from Featured Showcase"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="text-[10px] hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* IN-APP CONFIRMATION MODAL TO DELETE FEATURED DISH */}
      {dishToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-[#111118] border border-red-500/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif font-bold text-white mb-1">
                  Remove Featured Dish?
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to remove <span className="text-white font-semibold">&quot;{dishToDelete.title}&quot;</span> from the homepage showcase?
                </p>
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="mb-5 rounded-xl overflow-hidden border border-gray-800 bg-black aspect-[16/9] relative">
              <img
                src={dishToDelete.image}
                alt={dishToDelete.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-[#d4af37]">
                ₹{dishToDelete.price} • {dishToDelete.badge || 'Featured'}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDishToDelete(null)}
                className="px-4 py-2 rounded-xl text-gray-300 hover:text-white bg-[#1a1a24] hover:bg-[#252535] text-xs font-medium transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 active:scale-95 text-white font-semibold text-xs shadow-[0_4px_15px_rgba(239,68,68,0.35)] transition cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Dish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Featured Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg my-8 rounded-3xl bg-[#101017] border border-[#d4af37]/30 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  {editingDish ? 'Edit Featured Dish' : 'Add to Featured Showcase'}
                </h3>
                <p className="text-xs text-gray-400">
                  Featured dishes highlight the pinnacle of Royal Bites culinary excellence.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-[#1b1b26] text-gray-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Title */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Dish Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Gourmet Cheeseburger with Fries"
                  required
                  className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition"
                />
              </div>

              {/* Price & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    required
                    className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition font-mono"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Showcase Badge
                  </label>
                  <select
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition"
                  >
                    {BADGE_OPTIONS.map((b) => (
                      <option key={b} value={b} className="bg-[#101017] text-white">
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Description *
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detailed description of flavors, prime ingredients, and presentation..."
                  required
                  className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2 outline-none transition"
                />
              </div>

              {/* Image URL & Upload */}
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium">
                  Dish Photography *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="Image URL or upload a file"
                    className="flex-1 bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2 outline-none transition"
                  />
                  <label className="px-3 py-2 rounded-xl bg-[#1e1e2d] hover:bg-[#28283d] text-gray-300 hover:text-white border border-gray-700 cursor-pointer flex items-center gap-1.5 shrink-0 transition">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Presets */}
                <div>
                  <span className="text-[11px] text-gray-500 block mb-1">
                    Featured Photography Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((p) => (
                      <button
                        type="button"
                        key={p.label}
                        onClick={() => setFormImage(p.url)}
                        className={`text-[10px] px-2.5 py-1 rounded-md transition cursor-pointer ${
                          formImage === p.url
                            ? 'bg-[#d4af37] text-black font-bold'
                            : 'bg-[#181826] text-gray-300 hover:text-white hover:bg-[#222234]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Preview */}
                {formImage && (
                  <div className="mt-2 relative w-full h-28 rounded-xl overflow-hidden border border-[#d4af37]/30 bg-black">
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-[#d4af37] font-semibold">
                      {formBadge}
                    </div>
                  </div>
                )}
              </div>

              {/* Vegetarian Checkbox */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer bg-[#151520] p-2.5 rounded-xl border border-gray-800 hover:border-gray-700">
                  <input
                    type="checkbox"
                    checked={formIsVeg}
                    onChange={(e) => setFormIsVeg(e.target.checked)}
                    className="accent-[#0e5836] w-4 h-4 rounded"
                  />
                  <span className="text-xs text-gray-200">Vegetarian Specialty</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-gray-800">
                {editingDish ? (
                  <button
                    type="button"
                    onClick={() => setDishToDelete(editingDish)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/50 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-medium transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Item</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-[#1a1a26] transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5be82] hover:brightness-110 active:scale-95 text-black font-bold transition shadow-[0_4px_15px_rgba(212,175,55,0.3)] cursor-pointer"
                  >
                    {editingDish ? 'Update Featured Dish' : 'Publish to Showcase'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
