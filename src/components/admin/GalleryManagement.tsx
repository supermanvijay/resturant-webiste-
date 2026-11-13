import React, { useState } from 'react';
import {
  Plus,
  Upload,
  ArrowLeft,
  ArrowRight,
  Edit2,
  Trash2,
  RefreshCw,
  Images,
  X,
  AlertTriangle,
} from 'lucide-react';
import { GalleryItem } from '../../types';

interface GalleryManagementProps {
  galleryItems: GalleryItem[];
  onAddGalleryItem: (item: Omit<GalleryItem, 'id' | 'order' | 'createdAt'>) => void;
  onUpdateGalleryItem: (item: GalleryItem) => void;
  onDeleteGalleryItem: (id: string, title: string) => void;
  onReorderGalleryItem: (fromIndex: number, toIndex: number) => void;
  isAddModalOpenInitially?: boolean;
  onCloseInitialModal?: () => void;
}

const GALLERY_CATEGORIES = [
  'All',
  'Ambiance',
  'Special Dishes',
  'Beverages',
  'Interior',
  'Private Dining',
];

const PRESET_GALLERY = [
  { title: 'Warm & Cozy Dining Hall', category: 'Ambiance', url: '/extracted/gallery_1.png' },
  { title: 'Sizzling Wok Noodles', category: 'Special Dishes', url: '/extracted/gallery_2.png' },
  { title: 'Signature Mocktails & Drinks', category: 'Beverages', url: '/extracted/gallery_3.png' },
  { title: 'Royal Fine Dining Ambience', category: 'Interior', url: '/extracted/gallery_4.png' },
  { title: 'Romantic Candlelight Booth', category: 'Ambiance', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80' },
  { title: 'Master Chef Finishing Plate', category: 'Special Dishes', url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80' },
];

export const GalleryManagement: React.FC<GalleryManagementProps> = ({
  galleryItems,
  onAddGalleryItem,
  onUpdateGalleryItem,
  onDeleteGalleryItem,
  onReorderGalleryItem,
  isAddModalOpenInitially = false,
  onCloseInitialModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(isAddModalOpenInitially);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  // In-app Delete Confirmation Modal State
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Ambiance');
  const [formCaption, setFormCaption] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormCategory('Ambiance');
    setFormCaption('');
    setFormImage(PRESET_GALLERY[0].url);
    setFormErrorMessage(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormCaption(item.caption || '');
    setFormImage(item.image);
    setFormErrorMessage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormErrorMessage(null);
    if (onCloseInitialModal) onCloseInitialModal();
  };

  // Image File Reader (Base64)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setFormErrorMessage('File size exceeds 8MB limit. Please choose a smaller photo.');
        return;
      }
      setFormErrorMessage(null);
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
      setFormErrorMessage('Photo title is required');
      return;
    }
    if (!formImage.trim()) {
      setFormErrorMessage('Please provide an image URL or upload a photo');
      return;
    }

    if (editingItem) {
      onUpdateGalleryItem({
        ...editingItem,
        title: formTitle.trim(),
        category: formCategory,
        caption: formCaption.trim(),
        image: formImage,
      });
    } else {
      onAddGalleryItem({
        title: formTitle.trim(),
        category: formCategory,
        caption: formCaption.trim(),
        image: formImage,
      });
    }

    closeModal();
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      onDeleteGalleryItem(itemToDelete.id, itemToDelete.title);
      setItemToDelete(null);
      // If we were editing the same item, close edit modal too
      if (editingItem && editingItem.id === itemToDelete.id) {
        closeModal();
      }
    }
  };

  const filteredItems = galleryItems.filter((item) =>
    selectedCategory === 'All' ? true : item.category === selectedCategory
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#0f0f15]/90 border border-[#d4af37]/20 shadow-[0_4px_25px_rgba(0,0,0,0.4)]">
        <div>
          <h2 className="text-xl font-serif font-bold text-white flex items-center gap-2">
            <Images className="w-5 h-5 text-[#d4af37]" />
            <span>Gallery &amp; Media Management</span>
            <span className="text-xs font-mono font-normal text-[#d4af37] px-2.5 py-0.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30">
              {galleryItems.length} Photos
            </span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Admin can upload, replace, reorder, and permanently delete images. All updates sync instantly with the website gallery.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#e5be82] hover:brightness-110 active:scale-95 text-black font-semibold text-xs shadow-[0_4px_15px_rgba(212,175,55,0.3)] transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Upload New Photo</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#d4af37] text-black font-bold'
                : 'bg-[#14141e] text-gray-400 hover:text-white hover:bg-[#1f1f2e]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-[#0f0f15]/80 border border-gray-800 text-gray-400 text-xs space-y-3">
          <Images className="w-10 h-10 text-gray-600 mx-auto" />
          <p>No gallery images found in this category.</p>
          <button
            onClick={openAddModal}
            className="px-4 py-2 rounded-xl bg-[#d4af37] text-black font-semibold text-xs transition hover:brightness-110"
          >
            Upload Photo Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map((item, index) => {
            const isFirst = index === 0;
            const isLast = index === filteredItems.length - 1;

            return (
              <div
                key={item.id}
                className="rounded-2xl bg-[#0f0f15]/95 border border-gray-800/80 hover:border-[#d4af37]/50 overflow-hidden transition-all duration-300 flex flex-col justify-between group hover:shadow-[0_8px_30px_rgba(0,0,0,0.6)]"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-[4/3] bg-black overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Order Badge & Category */}
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-black/80 text-[#d4af37] border border-[#d4af37]/30 backdrop-blur-xs">
                        #{index + 1}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/80 text-gray-200 border border-gray-700/60 backdrop-blur-xs">
                        {item.category}
                      </span>
                    </div>

                    {/* TOP-RIGHT DIRECT QUICK DELETE BUTTON ON IMAGE */}
                    <button
                      onClick={() => setItemToDelete(item)}
                      className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-red-950/85 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 shadow-md transition-all cursor-pointer z-10 flex items-center gap-1 text-[10px] group/del"
                      title="Delete this image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden group-hover/del:inline pr-0.5 font-medium">Delete</span>
                    </button>

                    {/* Quick Replace Overlay Button */}
                    <button
                      onClick={() => openEditModal(item)}
                      className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-black/80 hover:bg-[#d4af37] text-gray-300 hover:text-black border border-gray-700 transition cursor-pointer flex items-center gap-1 text-[10px] z-10"
                      title="Replace photo"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Replace</span>
                    </button>
                  </div>

                  {/* Photo Info */}
                  <div className="p-3.5 space-y-1">
                    <h3 className="text-xs font-semibold text-white group-hover:text-[#d4af37] transition-colors truncate">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed">
                      {item.caption || 'Royal Bites culinary & dining photography'}
                    </p>
                  </div>
                </div>

                {/* Reorder and Action Bar */}
                <div className="p-3 bg-[#0a0a0f] border-t border-gray-800/80 flex items-center justify-between">
                  {/* Reorder Left/Right Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={isFirst}
                      onClick={() => onReorderGalleryItem(index, index - 1)}
                      className={`p-1.5 rounded-lg bg-[#151520] transition cursor-pointer ${
                        isFirst
                          ? 'text-gray-600 opacity-30 cursor-not-allowed'
                          : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#1f1f2e]'
                      }`}
                      title="Move photo earlier"
                    >
                      <ArrowLeft className="w-3 h-3" />
                    </button>
                    <button
                      type="button"
                      disabled={isLast}
                      onClick={() => onReorderGalleryItem(index, index + 1)}
                      className={`p-1.5 rounded-lg bg-[#151520] transition cursor-pointer ${
                        isLast
                          ? 'text-gray-600 opacity-30 cursor-not-allowed'
                          : 'text-gray-300 hover:text-[#d4af37] hover:bg-[#1f1f2e]'
                      }`}
                      title="Move photo later"
                    >
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Edit & Delete Actions */}
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg bg-[#151520] hover:bg-[#d4af37] text-gray-300 hover:text-black transition cursor-pointer"
                      title="Edit Caption & Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setItemToDelete(item)}
                      className="p-1.5 rounded-lg bg-red-950/40 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition cursor-pointer flex items-center gap-1"
                      title="Delete Image"
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

      {/* IN-APP CONFIRMATION MODAL TO DELETE IMAGE */}
      {itemToDelete && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md rounded-2xl bg-[#111118] border border-red-500/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-serif font-bold text-white mb-1">
                  Delete Gallery Image?
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Are you sure you want to delete <span className="text-white font-semibold">&quot;{itemToDelete.title}&quot;</span>? This image will be permanently removed from the website gallery.
                </p>
              </div>
            </div>

            {/* Thumbnail Preview of the Image being deleted */}
            <div className="mb-5 rounded-xl overflow-hidden border border-gray-800 bg-black aspect-[16/9] relative">
              <img
                src={itemToDelete.image}
                alt={itemToDelete.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-gray-300">
                {itemToDelete.category}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setItemToDelete(null)}
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
                <span>Delete Image</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit / Replace Photo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg my-8 rounded-3xl bg-[#101017] border border-[#d4af37]/30 p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
              <div>
                <h3 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <Images className="w-4 h-4 text-[#d4af37]" />
                  {editingItem ? 'Edit / Replace Gallery Image' : 'Upload New Gallery Photo'}
                </h3>
                <p className="text-xs text-gray-400">
                  Captions and images appear instantly on the public gallery section.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-8 h-8 rounded-full bg-[#1b1b26] text-gray-400 hover:text-white flex items-center justify-center transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formErrorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                {formErrorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Photo Title */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Photo Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Royal Fine Dining Ambience"
                  required
                  className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2.5 outline-none transition"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Category *
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3 py-2.5 outline-none transition"
                >
                  {GALLERY_CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                    <option key={cat} value={cat} className="bg-[#101017] text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-gray-300 font-medium mb-1">
                  Image Caption / Story
                </label>
                <textarea
                  rows={2}
                  value={formCaption}
                  onChange={(e) => setFormCaption(e.target.value)}
                  placeholder="Atmospheric note or context about this scene..."
                  className="w-full bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2 outline-none transition"
                />
              </div>

              {/* Image Source & File Upload */}
              <div className="space-y-2">
                <label className="block text-gray-300 font-medium">
                  Image URL or Device Upload *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://... or upload below"
                    required
                    className="flex-1 bg-[#161622] border border-gray-700 focus:border-[#d4af37] text-white text-xs rounded-xl px-3.5 py-2 outline-none transition"
                  />
                  <label className="px-3 py-2 rounded-xl bg-[#1e1e2d] hover:bg-[#28283d] text-gray-300 hover:text-white border border-gray-700 cursor-pointer flex items-center gap-1.5 shrink-0 transition">
                    <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Presets */}
                <div>
                  <span className="text-[11px] text-gray-500 block mb-1">
                    Luxury Restaurant Ambiance Presets:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_GALLERY.map((p) => (
                      <button
                        type="button"
                        key={p.title}
                        onClick={() => {
                          setFormImage(p.url);
                          if (!formTitle) setFormTitle(p.title);
                          setFormCategory(p.category);
                        }}
                        className={`text-[10px] px-2.5 py-1 rounded-md transition cursor-pointer ${
                          formImage === p.url
                            ? 'bg-[#d4af37] text-black font-bold'
                            : 'bg-[#181826] text-gray-300 hover:text-white hover:bg-[#222234]'
                        }`}
                      >
                        {p.title}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                {formImage && (
                  <div className="mt-2 relative w-full h-32 rounded-xl overflow-hidden border border-[#d4af37]/30 bg-black">
                    <img
                      src={formImage}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-gray-200">
                      {formCategory}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons + Delete Button if Editing */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-gray-800">
                {editingItem ? (
                  <button
                    type="button"
                    onClick={() => setItemToDelete(editingItem)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/50 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-medium transition cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Photo</span>
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
                    {editingItem ? 'Save Updates' : 'Add to Gallery'}
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
