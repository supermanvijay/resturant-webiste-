import React, { useState } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit,
  Utensils,
  ShoppingBag,
  Calendar,
  MessageSquare,
  DollarSign,
  TrendingUp,
  Check,
  RefreshCw,
  Search,
} from 'lucide-react';
import { FoodItem, FoodCategory, Order, Reservation, ContactMessage } from '../types';
import { storageService } from '../services/storageService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  dishes: FoodItem[];
  onDishesUpdated: () => void;
  onShowToast: (msg: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  dishes,
  onDishesUpdated,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'orders' | 'reservations' | 'messages' | 'offers'>('menu');
  const [orders, setOrders] = useState<Order[]>(() => storageService.getOrders());
  const [reservations, setReservations] = useState<Reservation[]>(() => storageService.getReservations());
  const [messages, setMessages] = useState<ContactMessage[]>(() => storageService.getMessages());

  // Edit / Add Item state
  const [editingItem, setEditingItem] = useState<FoodItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<FoodCategory>('Biryani');
  const [formPrice, setFormPrice] = useState<number>(299);
  const [formDesc, setFormDesc] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formIsVeg, setFormIsVeg] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsPopular, setFormIsPopular] = useState(false);

  // Search filter
  const [searchItem, setSearchItem] = useState('');

  if (!isOpen) return null;

  const refreshAll = () => {
    setOrders(storageService.getOrders());
    setReservations(storageService.getReservations());
    setMessages(storageService.getMessages());
  };

  const handleStartAdd = () => {
    setEditingItem(null);
    setFormName('');
    setFormCategory('Biryani');
    setFormPrice(299);
    setFormDesc('');
    setFormImage('/extracted/dish_biryani.png');
    setFormIsVeg(false);
    setFormIsFeatured(false);
    setFormIsPopular(true);
    setIsAddingNew(true);
  };

  const handleStartEdit = (item: FoodItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPrice(item.price);
    setFormDesc(item.description);
    setFormImage(item.image);
    setFormIsVeg(item.isVeg);
    setFormIsFeatured(!!item.isFeatured);
    setFormIsPopular(!!item.isPopular);
    setIsAddingNew(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formPrice) {
      alert('Dish name and price are required.');
      return;
    }

    if (editingItem) {
      storageService.updateMenuItem({
        ...editingItem,
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        description: formDesc,
        image: formImage || '/extracted/dish_biryani.png',
        isVeg: formIsVeg,
        isFeatured: formIsFeatured,
        isPopular: formIsPopular,
      });
      onShowToast(`Dish "${formName}" updated successfully!`);
    } else {
      storageService.addMenuItem({
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        description: formDesc,
        image: formImage || '/extracted/dish_biryani.png',
        isVeg: formIsVeg,
        isFeatured: formIsFeatured,
        isPopular: formIsPopular,
      });
      onShowToast(`Dish "${formName}" added to the menu!`);
    }

    setIsAddingNew(false);
    setEditingItem(null);
    onDishesUpdated();
  };

  const handleDeleteItem = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the menu?`)) {
      storageService.deleteMenuItem(id);
      onDishesUpdated();
      onShowToast(`Dish "${name}" removed from menu.`);
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    storageService.updateOrderStatus(orderId, status);
    setOrders(storageService.getOrders());
    onShowToast(`Order #${orderId} marked as ${status}`);
  };

  const handleUpdateReservationStatus = (resId: string, status: Reservation['status']) => {
    storageService.updateReservationStatus(resId, status);
    setReservations(storageService.getReservations());
    onShowToast(`Reservation #${resId} updated to ${status}`);
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const activeOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Preparing' || o.status === 'Out for Delivery').length;
  const activeReservationsCount = reservations.filter((r) => r.status === 'Confirmed' || r.status === 'Pending').length;

  const filteredDishes = dishes.filter(
    (d) =>
      d.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      d.category.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5">
      <div className="bg-[#fcfbf9] text-gray-900 rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-[#ebdcc4] animate-in fade-in zoom-in-95 duration-200">
        {/* Top Navbar */}
        <div className="bg-[#051810] text-white px-6 py-4 flex items-center justify-between border-b border-[#0f3627]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#ebb340] text-black font-serif font-black flex items-center justify-center text-lg">
              RB
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-white">
                Royal Bites Admin Management Portal
              </h2>
              <p className="text-xs text-[#a7b8ae]">
                Live synchronization with storefront, orders & reservations
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={refreshAll}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Analytics KPI Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white border-b border-[#ebdcc4] text-xs">
          <div className="bg-[#faf8f3] p-3 rounded-xl border border-[#ebdcc4]">
            <span className="text-gray-500 font-medium">Total Orders</span>
            <div className="text-xl font-bold text-gray-900 mt-0.5">{orders.length}</div>
            <span className="text-[10px] text-emerald-700 font-semibold">{activeOrdersCount} in progress</span>
          </div>
          <div className="bg-[#faf8f3] p-3 rounded-xl border border-[#ebdcc4]">
            <span className="text-gray-500 font-medium">Gross Revenue</span>
            <div className="text-xl font-bold text-[#0d4f32] mt-0.5">₹{totalRevenue}</div>
            <span className="text-[10px] text-gray-500">From delivered/confirmed</span>
          </div>
          <div className="bg-[#faf8f3] p-3 rounded-xl border border-[#ebdcc4]">
            <span className="text-gray-500 font-medium">Table Bookings</span>
            <div className="text-xl font-bold text-gray-900 mt-0.5">{reservations.length}</div>
            <span className="text-[10px] text-amber-700 font-semibold">{activeReservationsCount} upcoming</span>
          </div>
          <div className="bg-[#faf8f3] p-3 rounded-xl border border-[#ebdcc4]">
            <span className="text-gray-500 font-medium">Active Menu Items</span>
            <div className="text-xl font-bold text-gray-900 mt-0.5">{dishes.length}</div>
            <span className="text-[10px] text-[#0d4f32] font-semibold">Live in storefront</span>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="px-6 pt-3 bg-white border-b border-[#ebdcc4] flex gap-2 overflow-x-auto">
          {[
            { id: 'menu', label: `Food Menu (${dishes.length})`, icon: Utensils },
            { id: 'orders', label: `Customer Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'reservations', label: `Reservations (${reservations.length})`, icon: Calendar },
            { id: 'messages', label: `Customer Inquiries (${messages.length})`, icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsAddingNew(false);
                }}
                className={`flex items-center gap-2 pb-3 px-3 text-xs font-semibold border-b-2 transition cursor-pointer whitespace-nowrap ${
                  active
                    ? 'border-[#0d4f32] text-[#0d4f32]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: FOOD MENU MANAGEMENT */}
          {activeTab === 'menu' && (
            <div className="space-y-4">
              {/* Actions Header */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search menu items..."
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#ebb340]"
                  />
                </div>

                <button
                  onClick={handleStartAdd}
                  className="bg-[#0d4f32] hover:bg-[#083823] active:scale-95 text-white font-semibold text-xs px-4 py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-sm transition cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Dish</span>
                </button>
              </div>

              {/* Add/Edit Modal Inline Form */}
              {isAddingNew && (
                <form
                  onSubmit={handleSaveItem}
                  className="bg-white p-5 rounded-xl border-2 border-[#ebb340] shadow-md space-y-4 animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between border-b pb-2">
                    <h3 className="font-bold text-sm text-gray-900">
                      {editingItem ? 'Edit Dish Details' : 'Add New Dish to Live Menu'}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Dish Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Mutton Rogan Josh"
                        className="w-full px-3 py-1.5 bg-gray-50 border rounded-lg text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value as FoodCategory)}
                        className="w-full px-3 py-1.5 bg-gray-50 border rounded-lg text-xs"
                      >
                        {[
                          'Biryani',
                          'Starters',
                          'Main Course',
                          'Indian Cuisine',
                          'Chinese Cuisine',
                          'Desserts',
                          'Beverages',
                        ].map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-gray-50 border rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Image URL or Path
                      </label>
                      <input
                        type="text"
                        value={formImage}
                        onChange={(e) => setFormImage(e.target.value)}
                        placeholder="/extracted/dish_biryani.png or https://..."
                        className="w-full px-3 py-1.5 bg-gray-50 border rounded-lg text-xs"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-5">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          checked={formIsVeg}
                          onChange={(e) => setFormIsVeg(e.target.checked)}
                          className="w-4 h-4 accent-emerald-600 rounded"
                        />
                        <span>Vegetarian (Green mark)</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          checked={formIsFeatured}
                          onChange={(e) => setFormIsFeatured(e.target.checked)}
                          className="w-4 h-4 accent-[#ebb340] rounded"
                        />
                        <span>Featured on Homepage</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-gray-700">
                        <input
                          type="checkbox"
                          checked={formIsPopular}
                          onChange={(e) => setFormIsPopular(e.target.checked)}
                          className="w-4 h-4 accent-[#e2b467] rounded"
                        />
                        <span>Popular Dish (Gold Badge)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Short Flavor Description
                    </label>
                    <textarea
                      rows={2}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Aromatic spices, slow-cooked gravy..."
                      className="w-full px-3 py-1.5 bg-gray-50 border rounded-lg text-xs resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingNew(false)}
                      className="px-4 py-2 border rounded-lg text-xs text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#0d4f32] text-white rounded-lg text-xs font-bold hover:bg-[#083823]"
                    >
                      {editingItem ? 'Save Updates' : 'Add Dish'}
                    </button>
                  </div>
                </form>
              )}

              {/* Items List Table */}
              <div className="bg-white rounded-xl border border-[#ebdcc4] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf8f3] border-b border-[#ebdcc4] text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Dish</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Diet</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDishes.map((dish) => (
                      <tr key={dish.id} className="hover:bg-gray-50/70 transition">
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={dish.image}
                              alt={dish.name}
                              className="w-10 h-10 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                            />
                            <div>
                              <div className="font-bold text-gray-900">{dish.name}</div>
                              <div className="text-[10px] text-gray-500 truncate max-w-xs">
                                {dish.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3 font-medium text-gray-700">{dish.category}</td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              dish.isVeg
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {dish.isVeg ? 'VEG' : 'NON-VEG'}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-gray-900">₹{dish.price}</td>
                        <td className="p-3 text-right space-x-1">
                          <button
                            onClick={() => handleStartEdit(dish)}
                            className="p-1.5 hover:bg-gray-200 text-gray-600 rounded cursor-pointer"
                            title="Edit dish"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(dish.id, dish.name)}
                            className="p-1.5 hover:bg-red-50 text-red-500 rounded cursor-pointer"
                            title="Delete dish"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-gray-900">
                  Real-time Customer Orders
                </h3>
                <span className="text-xs text-gray-500">
                  {orders.length} total orders recorded
                </span>
              </div>

              <div className="space-y-3">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    className="bg-white p-4 rounded-xl border border-[#ebdcc4] shadow-xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#0d4f32]">#{ord.id}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(ord.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#ebb340]/20 text-[#966b0a]">
                          {ord.paymentMethod}
                        </span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-gray-600">Status:</span>
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border cursor-pointer ${
                            ord.status === 'Delivered'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : ord.status === 'Preparing'
                              ? 'bg-amber-50 text-amber-800 border-amber-300'
                              : ord.status === 'Out for Delivery'
                              ? 'bg-blue-50 text-blue-800 border-blue-300'
                              : 'bg-gray-100 text-gray-800 border-gray-300'
                          }`}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Preparing">Preparing</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <p className="text-gray-500">Customer & Address:</p>
                        <p className="font-bold text-gray-900">{ord.customerName} ({ord.phone})</p>
                        <p className="text-gray-600 mt-0.5">{ord.deliveryAddress}</p>
                      </div>

                      <div className="bg-[#faf8f3] p-2.5 rounded-lg border border-[#eee4d5]">
                        <p className="text-gray-500 mb-1 font-semibold">Ordered Dishes:</p>
                        {ord.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between py-0.5">
                            <span>{it.quantity}x {it.name}</span>
                            <span className="font-medium">₹{it.price * it.quantity}</span>
                          </div>
                        ))}
                        <div className="flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-1 mt-1">
                          <span>Total Amount:</span>
                          <span className="text-[#0d4f32]">₹{ord.total}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: RESERVATIONS MANAGEMENT */}
          {activeTab === 'reservations' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-gray-900">
                  Guest Table Bookings
                </h3>
                <span className="text-xs text-gray-500">
                  {reservations.length} total bookings
                </span>
              </div>

              <div className="bg-white rounded-xl border border-[#ebdcc4] overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#faf8f3] border-b border-[#ebdcc4] text-gray-600 font-semibold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Ref ID</th>
                      <th className="p-3">Guest Details</th>
                      <th className="p-3">Date & Time</th>
                      <th className="p-3">Party</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-gray-50/70">
                        <td className="p-3 font-bold text-[#0d4f32]">#{res.id}</td>
                        <td className="p-3">
                          <div className="font-bold text-gray-900">{res.customerName}</div>
                          <div className="text-[10px] text-gray-500">{res.phone} · {res.email}</div>
                          {res.specialRequests && (
                            <div className="text-[10px] text-amber-700 italic mt-0.5">
                              "{res.specialRequests}"
                            </div>
                          )}
                        </td>
                        <td className="p-3 font-medium text-gray-800">
                          <div>{res.date}</div>
                          <div className="text-[10px] text-gray-500">{res.time}</div>
                        </td>
                        <td className="p-3 font-bold text-gray-900">{res.guests} Guests</td>
                        <td className="p-3">
                          <select
                            value={res.status}
                            onChange={(e) => handleUpdateReservationStatus(res.id, e.target.value as any)}
                            className="text-xs font-bold px-2 py-1 rounded border bg-gray-50 cursor-pointer"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: CUSTOMER MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-gray-900">
                Customer Inquiries & Feedback
              </h3>
              <div className="space-y-3">
                {messages.map((m) => (
                  <div key={m.id} className="bg-white p-4 rounded-xl border border-[#ebdcc4] shadow-xs space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gray-900 text-sm">{m.name}</span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(m.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="text-gray-500 text-[11px]">
                      {m.email} {m.phone ? `· ${m.phone}` : ''}
                    </div>
                    <div className="font-semibold text-gray-800 pt-1">{m.subject}</div>
                    <p className="text-gray-700 leading-relaxed bg-[#faf8f3] p-2.5 rounded-lg border border-[#eee4d5]">
                      {m.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
