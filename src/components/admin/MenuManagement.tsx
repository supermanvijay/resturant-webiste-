import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  X,
  Sparkles,
  Filter,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import { FoodItem, FoodCategory } from '../../types';

interface MenuManagementProps {
  dishes: FoodItem[];
  onAddDish: (dish: Omit<FoodItem, 'id'>) => void;
  onUpdateDish: (dish: FoodItem) => void;
  onDeleteDish: (id: string, name: string) => void;
  isAddModalOpenInitially?: boolean;
  onCloseInitialModal?: () => void;
}

const CATEGORIES: FoodCategory[] = [
  'All Items',
  'Starters',
  'Main Course',
  'Biryani',
  'Indian Cuisine',
  'Chinese Cuisine',
  'Desserts',
  'Beverages',
];

const PRESET_IMAGES = [
  { label: 'Gourmet Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85' },
  { label: 'Herb Pasta', url: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281081?auto=format&fit=crop&w=1000&q=85' },
  { label: 'Roasted Bowl', url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85' },
  { label: 'Chicken Biryani', url: '/extracted/dish_biryani.png' },
  { label: 'Grilled Salmon', url: '/extracted/dish_grilled_salmon.png' },
  { label: 'Paneer Masala', url: '/extracted/dish_paneer.png' },
  { label: 'Chicken 65', url: '/extracted/dish_chicken65.png' },
  { label: 'Gulab Jamun', url: '/extracted/dish_gulabjamun.png' },
];

export const MenuManagement: React.FC<MenuManagementProps> = ({
  dishes,
  onAddDish,
  onUpdateDish,
  onDeleteDish,
  isAddModalOpenInitially = false,
  onCloseInitialModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('All Items');
  const [isModalOpen, setIsModalOpen] = useState(isAddModalOpenInitially);
  const [editingDish, setEditingDish] = useState<FoodItem | null>(null);

  // In-app Delete Confirmation Modal
  const [dishToDelete, setDishToDelete] = useState<FoodItem | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<FoodCategory>('Main Course');
  const [formPrice, setFormPrice] = useState<number>(299);
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formIsVeg, setFormIsVeg] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsPopular, setFormIsPopular] = useState(false);
  const [formRating, setFormRating] = useState<number>(4.9);
  const [formError, setFormError] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingDish(null);
    setFormName('');
    setFormCategory('Main Course');
    setFormPrice(299);
    setFormSubtitle('');
    setFormDescription('');
    setFormImage(PRESET_IMAGES[0].url);
    setFormIsVeg(false);
    setFormIsFeatured(false);
    setFormIsPopular(false);
    setFormRating(4.9);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (dish: FoodItem) => {
    setEditingDish(dish);
    setFormName(dish.name);
    setFormCategory(dish.category);
    setFormPrice(dish.price);
    setFormSubtitle(dish.subtitle || '');
    setFormDescription(dish.description);
    setFormImage(dish.image);
    setFormIsVeg(dish.isVeg);
    setFormIsFeatured(!!dish.isFeatured);
    setFormIsPopular(!!dish.isPopular);
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
        setFormError('File size exceeds 5MB limit. Please choose a smaller image.');
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
    if (!formName.trim()) {
      setFormError('Dish name is required');
      return;
    }
    if (formPrice <= 0) {
      setFormError('Price must be greater than 0');
      return;
    }

    if (editingDish) {
      onUpdateDish({
        ...editingDish,
        name: formName.trim(),
        category: formCategory,
        price: Number(formPrice),
        subtitle: formSubtitle.trim() || undefined,
        description: formDescription.trim(),
        image: formImage || PRESET_IMAGES[0].url,
        isVeg: formIsVeg,
        isFeatured: formIsFeatured,
        isPopular: formIsPopular,
        rating: Number(formRating),
      });
    } else {
      onAddDish({
        name: formName.trim(),
        category: formCategory,
        price: Number(formPrice),
        subtitle: formSubtitle.trim() || undefined,
        description: formDescription.trim(),
        image: formImage || PRESET_IMAGES[0].url,
        isVeg: formIsVeg,
        isFeatured: formIsFeatured,
        isPopular: formIsPopular,
        rating: Number(formRating),
      });
    }

    closeModal();
  };

  const handleConfirmDelete = () => {
    if (dishToDelete) {
      onDeleteDish(dishToDelete.id, dishToDelete.name);
      setDishToDelete(null);
      if (editingDish && editingDish.id === dishToDelete.id) {
        closeModal();
      }
    }
  };

  // Filter dishes
  const filteredDishes = dishes.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Items' ? true : d.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0f0f15]/90 border border-[#d4af37]/20 shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <span>Menu Items Management</span>
            <span className="text-xs font-mono font-normal text-[#d4af37] px-2.5 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
              {filteredDishes.length} Items
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Admin can add, edit, change pricing, and delete menu items and imagery in real time.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5be82] hover:brightness-110 active:scale-95 text-black font-semibold text-xs shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search dish name, description, or category..."
            className="w-full bg-[#12121a] border border-gray-800 focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] text-white text-xs rounded-xl pl-10 pr-4 py-2.5 outline-none transition placeholder-gray-500"
          />
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter className="w-3.5 h-3.5 text-gray-500 shrink-0 ml-1 mr-0.5 hidden sm:inline" />
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#d4af37] text-black font-semibold shadow-xs'
                  : 'bg-[#151520] text-gray-400 hover:text-white hover:bg-[#1f1f2e]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredDishes.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0f0f15]/80 border border-gray-800 text-gray-400 text-xs">
          No menu dishes match your search criteria. Try modifying your filter or click &quot;Add New Dish&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="rounded-2xl bg-[#0f0f15]/95 border border-gray-800/80 hover:border-[#d4af37]/50 p-4 transition-all duration-300 hover:shadow-[0_8px_25px_rgba(0,0,0,0.6)] flex flex-col justify-between group"
            >
              <div>
                {/* Image and Badges */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black mb-3.5 border border-gray-800">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    {/* Veg indicator */}
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold border ${
                        dish.isVeg
                          ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                          : 'bg-red-950/90 text-red-300 border-red-500/40'
                      }`}
                    >
                      {dish.isVeg ? '🌱 VEG' : '🥩 NON-VEG'}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/75 text-gray-200 border border-gray-700/60 backdrop-blur-xs">
                      {dish.category}
                    </span>
                  </div>

                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
                    {dish.isFeatured && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#d4af37] text-black shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-black" />
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-1 mb-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#d4af37] transition-colors line-clamp-1">
                      {dish.name}
                    </h3>
                    <div className="text-sm font-bold font-mono text-[#d4af37] shrink-0 tabular-nums">
                      ₹{dish.price}
                    </div>
                  </div>
                  {dish.subtitle && (
                    <p className="text-[11px] text-amber-200/80 line-clamp-1 italic">
                      {dish.subtitle}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-800/80 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 font-mono">
                  Rating: ★ {dish.rating || 4.9}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openEditModal(dish)}
                    className="p-1.5 rounded-lg bg-[#1a1a24] hover:bg-[#d4af37] text-gray-300 hover:text-black transition-colors cursor-pointer"
                    title="Edit dish details"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDishToDelete(dish)}
                    className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition-colors cursor-pointer flex items-center gap-1"
                    title="Delete dish from menu"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="text-[10px] hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* IN-APP CONFIRMATION MODAL TO DELETE MENU DISH */}
      {dishToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-[#111118] border border-red-500/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif font-bold text-white mb-1">
                  Delete Menu Item?
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to permanently delete <span className="text-white font-semibold">&quot;{dishToDelete.name}&quot;</span>? This will remove the item from all menus and ordering.
                </p>
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="mb-5 rounded-xl overflow-hidden border border-gray-800 bg-black aspect-[16/9] relative">
              <img
                src={dishToDelete.image}
                alt={dishToDelete.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-[#d4af37]">
                ₹{dishToDelete.price} • {dishToDelete.category}
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
                <span>Delete Dish</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-xl my-8 rounded-3xl bg-[#101017] border border-[#d4af37]/30 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  {editingDish ? 'Edit Menu Dish' : 'Add New Menu Item'}
                </h3>
                <p className="text-xs text-gray-400">
                  Fill in culinary details. Changes update the live restaurant website instantly.
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

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Dish Name */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Dish Title / Name *
                </label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Royal Mughlai Dum Biryani"
                  required
                  className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition"
                />
              </div>

              {/* Category & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-medium mb-1">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as FoodCategory)}
                    className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition"
                  >
                    {CATEGORIES.filter((c) => c !== 'All Items').map((c) => (
                      <option key={c} value={c} className="bg-[#101017] text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

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
              </div>

              {/* Subtitle / Flavor Note */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Subtitle / Highlight Note
                </label>
                <input
                  type="text"
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="e.g. Slow cooked basmati with saffron & kewra essence"
                  className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Full Dish Description *
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe ingredients, cooking technique, and aromatic highlights..."
                  required
                  className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2 outline-none transition"
                />
              </div>

              {/* Image Upload & Presets */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-gray-300 font-medium">
                    Dish Image (URL or Upload File) *
                  </label>
                  {formImage && (
                    <button
                      type="button"
                      onClick={() => setFormImage('')}
                      className="text-[11px] text-red-400 hover:text-red-300 transition cursor-pointer flex items-center gap-1"
                      title="Clear image"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Clear Image</span>
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... or file data"
                    className="flex-1 bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2 outline-none transition"
                  />
                  <label className="px-3 py-2 rounded-xl bg-[#1e1e2d] hover:bg-[#28283d] text-gray-300 hover:text-white border border-gray-700 cursor-pointer flex items-center gap-1.5 shrink-0 transition">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Quick Presets */}
                <div>
                  <span className="text-[11px] text-gray-500 block mb-1.5">
                    Or select a curated dish photo preset:
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

                {/* Image Live Preview */}
                {formImage && (
                  <div className="mt-2 relative w-full h-28 rounded-xl overflow-hidden border border-[#d4af37]/30 bg-black">
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded bg-black/80 text-[10px] text-gray-300 font-mono">
                      Preview Active
                    </div>
                  </div>
                )}
              </div>

              {/* Dietary & Flags */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-2 cursor-pointer bg-[#151520] p-2.5 rounded-xl border border-gray-800 hover:border-gray-700">
                  <input
                    type="checkbox"
                    checked={formIsVeg}
                    onChange={(e) => setFormIsVeg(e.target.checked)}
                    className="accent-[#0e5836] w-4 h-4 rounded"
                  />
                  <span className="text-xs text-gray-200">Vegetarian Dish</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-[#151520] p-2.5 rounded-xl border border-gray-800 hover:border-gray-700">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={(e) => setFormIsFeatured(e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4 rounded"
                  />
                  <span className="text-xs text-gray-200">Featured Dish</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer bg-[#151520] p-2.5 rounded-xl border border-gray-800 hover:border-gray-700">
                  <input
                    type="checkbox"
                    checked={formIsPopular}
                    onChange={(e) => setFormIsPopular(e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4 rounded"
                  />
                  <span className="text-xs text-gray-200">Popular Badge</span>
                </label>
              </div>

              {/* Submit / Cancel Buttons + Delete if editing */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-gray-800">
                {editingDish ? (
                  <button
                    type="button"
                    onClick={() => setDishToDelete(editingDish)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/50 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-medium transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Dish</span>
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
                    {editingDish ? 'Save Changes' : 'Add to Menu Database'}
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
