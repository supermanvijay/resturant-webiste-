import {
  FoodItem,
  Order,
  Reservation,
  ContactMessage,
  CartItem,
  FeaturedDish,
  GalleryItem,
  AdminAuditLog,
} from '../types';
import { INITIAL_FOOD_ITEMS, INITIAL_GALLERY } from '../data/initialData';

// Database Table Keys
const TABLE_MENU_ITEMS = 'royal_bites_db_menu_items_v5';
const TABLE_FEATURED_DISHES = 'royal_bites_db_featured_dishes_v1';
const TABLE_GALLERY_IMAGES = 'royal_bites_db_gallery_images_v1';
const TABLE_AUDIT_LOGS = 'royal_bites_db_audit_logs_v1';

// Other App State Keys
const ORDERS_KEY = 'royal_bites_orders_v1';
const RESERVATIONS_KEY = 'royal_bites_reservations_v1';
const MESSAGES_KEY = 'royal_bites_messages_v1';
const SUBSCRIBERS_KEY = 'royal_bites_subscribers_v1';
const CART_KEY = 'royal_bites_cart_v1';
const FAVORITES_KEY = 'royal_bites_favorites_v1';

// Safe localStorage helpers
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultValue;
  } catch (e) {
    console.error('Error reading from localStorage', e);
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for real-time reactive sync across components
    window.dispatchEvent(new CustomEvent('royal_bites_db_update', { detail: { key } }));
  } catch (e) {
    console.error('Error writing to localStorage', e);
  }
}

// Initial seed for Featured Dishes
const INITIAL_FEATURED_DISHES: FeaturedDish[] = INITIAL_FOOD_ITEMS
  .filter((item) => item.isFeatured)
  .map((item, idx) => ({
    id: `feat-${item.id}`,
    title: item.name,
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    category: item.category,
    badge: idx === 0 ? "Popular" : idx === 1 ? "Chef's Pick" : item.isVeg ? "Vegetarian" : "Signature",
    isVeg: item.isVeg,
    isPopular: !!item.isPopular,
    rating: item.rating || 4.9,
    order: idx + 1,
    updatedAt: new Date().toISOString(),
  }));

// Initial seed for Gallery Images
const INITIAL_GALLERY_ITEMS: GalleryItem[] = INITIAL_GALLERY.map((g, idx) => ({
  id: g.id,
  title: g.title,
  category: g.category,
  image: g.image,
  caption: `${g.title} at Royal Bites Fine Dining`,
  order: idx + 1,
  createdAt: new Date().toISOString(),
}));

// Initial audit logs
const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'log-1',
    action: 'UPDATE',
    entity: 'Menu Item',
    targetTitle: 'Gourmet Cheeseburger with Fries',
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    details: 'Price updated and chef description enhanced',
  },
  {
    id: 'log-2',
    action: 'REORDER',
    entity: 'Featured Dish',
    targetTitle: 'Featured Dishes Showcase',
    timestamp: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
    details: 'Curated dish ranking updated for evening service',
  },
  {
    id: 'log-3',
    action: 'CREATE',
    entity: 'Gallery Image',
    targetTitle: 'Royal Fine Dining Ambience',
    timestamp: new Date(Date.now() - 180 * 60 * 1000).toISOString(),
    details: 'High-resolution interior photography added to public gallery',
  },
];

// Sample orders & reservations for dashboard stats
const INITIAL_ORDERS: Order[] = [
  {
    id: 'RB-9821',
    customerName: 'Aditya Varma',
    phone: '+91 98490 12345',
    email: 'aditya.v@example.com',
    deliveryAddress: 'Flat 402, Royal Palms, Jubilee Hills, Hyderabad',
    items: [
      { id: 'dish-1', name: 'Chicken Biryani', price: 299, quantity: 2 },
      { id: 'dish-4', name: 'Chicken 65', price: 249, quantity: 1 },
      { id: 'dish-5', name: 'Gulab Jamun', price: 99, quantity: 2 },
    ],
    subtotal: 1045,
    discount: 209,
    deliveryFee: 40,
    total: 876,
    paymentMethod: 'UPI / Online',
    status: 'Preparing',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
  },
  {
    id: 'RB-9820',
    customerName: 'Sneha Rao',
    phone: '+91 97012 34567',
    email: 'sneha.rao@example.com',
    deliveryAddress: 'Villa 18, Green Meadows, Madhapur, Hyderabad',
    items: [
      { id: 'dish-2', name: 'Paneer Butter Masala', price: 249, quantity: 1 },
      { id: 'dish-6', name: 'Veg Fried Rice', price: 149, quantity: 2 },
      { id: 'dish-7', name: 'Paneer Tikka', price: 219, quantity: 1 },
    ],
    subtotal: 766,
    discount: 153,
    deliveryFee: 40,
    total: 653,
    paymentMethod: 'Cash on Delivery',
    status: 'Out for Delivery',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
];

const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'RES-401',
    customerName: 'Kavita Reddy',
    phone: '+91 98765 11223',
    email: 'kavita.reddy@example.com',
    guests: 4,
    date: '2026-11-02',
    time: '20:00',
    specialRequests: 'Window seat preference for anniversary dinner',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'RES-402',
    customerName: 'Suresh Kumar',
    phone: '+91 99887 76655',
    email: 'suresh.k@example.com',
    guests: 6,
    date: '2026-11-03',
    time: '19:30',
    specialRequests: 'Family gathering, high chair needed',
    status: 'Pending',
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
  },
];

export const storageService = {
  // ==========================================
  // TABLE 1: MENU ITEMS DATABASE
  // ==========================================
  getMenuItems(): FoodItem[] {
    return getStored<FoodItem[]>(TABLE_MENU_ITEMS, INITIAL_FOOD_ITEMS);
  },
  saveMenuItems(items: FoodItem[]): void {
    setStored(TABLE_MENU_ITEMS, items);
  },
  addMenuItem(itemData: Omit<FoodItem, 'id'>): FoodItem {
    const items = this.getMenuItems();
    const newItem: FoodItem = {
      ...itemData,
      id: `dish-${Date.now()}`,
    };
    items.unshift(newItem);
    this.saveMenuItems(items);
    this.logAudit('CREATE', 'Menu Item', newItem.name, `Added to category ${newItem.category} at ₹${newItem.price}`);
    return newItem;
  },
  updateMenuItem(item: FoodItem): void {
    const items = this.getMenuItems();
    const idx = items.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      items[idx] = item;
      this.saveMenuItems(items);
      this.logAudit('UPDATE', 'Menu Item', item.name, `Updated details & price (₹${item.price})`);
    }
  },
  deleteMenuItem(id: string): void {
    const items = this.getMenuItems();
    const target = items.find((i) => i.id === id);
    const updated = items.filter((i) => i.id !== id);
    this.saveMenuItems(updated);
    if (target) {
      this.logAudit('DELETE', 'Menu Item', target.name, 'Dish removed from menu database');
    }
  },

  // ==========================================
  // TABLE 2: FEATURED DISHES DATABASE
  // ==========================================
  getFeaturedDishes(): FeaturedDish[] {
    const dishes = getStored<FeaturedDish[]>(TABLE_FEATURED_DISHES, INITIAL_FEATURED_DISHES);
    // Sort by order ascending
    return dishes.sort((a, b) => a.order - b.order);
  },
  saveFeaturedDishes(dishes: FeaturedDish[]): void {
    // Re-index orders cleanly 1..n
    const ordered = dishes.map((d, idx) => ({ ...d, order: idx + 1 }));
    setStored(TABLE_FEATURED_DISHES, ordered);
  },
  addFeaturedDish(data: Omit<FeaturedDish, 'id' | 'order' | 'updatedAt'>): FeaturedDish {
    const list = this.getFeaturedDishes();
    const newDish: FeaturedDish = {
      ...data,
      id: `feat-${Date.now()}`,
      order: list.length + 1,
      updatedAt: new Date().toISOString(),
    };
    list.push(newDish);
    this.saveFeaturedDishes(list);
    this.logAudit('CREATE', 'Featured Dish', newDish.title, `Added to featured dishes showcase with badge "${newDish.badge || 'Chef\'s Pick'}"`);
    return newDish;
  },
  updateFeaturedDish(dish: FeaturedDish): void {
    const list = this.getFeaturedDishes();
    const idx = list.findIndex((d) => d.id === dish.id);
    if (idx !== -1) {
      list[idx] = {
        ...dish,
        name: dish.title,
        updatedAt: new Date().toISOString(),
      };
      this.saveFeaturedDishes(list);
      this.logAudit('UPDATE', 'Featured Dish', dish.title, `Featured dish details updated`);
    }
  },
  deleteFeaturedDish(id: string): void {
    const list = this.getFeaturedDishes();
    const target = list.find((d) => d.id === id);
    const updated = list.filter((d) => d.id !== id);
    this.saveFeaturedDishes(updated);
    if (target) {
      this.logAudit('DELETE', 'Featured Dish', target.title, 'Featured dish removed from showcase');
    }
  },
  reorderFeaturedDishes(fromIndex: number, toIndex: number): FeaturedDish[] {
    const list = [...this.getFeaturedDishes()];
    if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) {
      return list;
    }
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);
    this.saveFeaturedDishes(list);
    this.logAudit('REORDER', 'Featured Dish', moved.title, `Repositioned from slot #${fromIndex + 1} to #${toIndex + 1}`);
    return this.getFeaturedDishes();
  },

  // ==========================================
  // TABLE 3: GALLERY IMAGES DATABASE
  // ==========================================
  getGalleryImages(): GalleryItem[] {
    const items = getStored<GalleryItem[]>(TABLE_GALLERY_IMAGES, INITIAL_GALLERY_ITEMS);
    return items.sort((a, b) => a.order - b.order);
  },
  saveGalleryImages(items: GalleryItem[]): void {
    const ordered = items.map((g, idx) => ({ ...g, order: idx + 1 }));
    setStored(TABLE_GALLERY_IMAGES, ordered);
  },
  addGalleryImage(data: Omit<GalleryItem, 'id' | 'order' | 'createdAt'>): GalleryItem {
    const list = this.getGalleryImages();
    const newItem: GalleryItem = {
      ...data,
      id: `gal-${Date.now()}`,
      order: list.length + 1,
      createdAt: new Date().toISOString(),
    };
    list.push(newItem);
    this.saveGalleryImages(list);
    this.logAudit('CREATE', 'Gallery Image', newItem.title, `Added new photo in category ${newItem.category}`);
    return newItem;
  },
  updateGalleryImage(item: GalleryItem): void {
    const list = this.getGalleryImages();
    const idx = list.findIndex((g) => g.id === item.id);
    if (idx !== -1) {
      list[idx] = item;
      this.saveGalleryImages(list);
      this.logAudit('UPDATE', 'Gallery Image', item.title, 'Image details and caption updated');
    }
  },
  deleteGalleryImage(id: string): void {
    const list = this.getGalleryImages();
    const target = list.find((g) => g.id === id);
    const updated = list.filter((g) => g.id !== id);
    this.saveGalleryImages(updated);
    if (target) {
      this.logAudit('DELETE', 'Gallery Image', target.title, 'Gallery image removed');
    }
  },
  reorderGalleryImages(fromIndex: number, toIndex: number): GalleryItem[] {
    const list = [...this.getGalleryImages()];
    if (fromIndex < 0 || fromIndex >= list.length || toIndex < 0 || toIndex >= list.length) {
      return list;
    }
    const [moved] = list.splice(fromIndex, 1);
    list.splice(toIndex, 0, moved);
    this.saveGalleryImages(list);
    this.logAudit('REORDER', 'Gallery Image', moved.title, `Repositioned in gallery`);
    return this.getGalleryImages();
  },

  // ==========================================
  // AUDIT LOGS & ACTIVITY TRACKING
  // ==========================================
  getAuditLogs(): AdminAuditLog[] {
    return getStored<AdminAuditLog[]>(TABLE_AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  },
  logAudit(
    action: AdminAuditLog['action'],
    entity: AdminAuditLog['entity'],
    targetTitle: string,
    details?: string
  ): void {
    const logs = this.getAuditLogs();
    const newLog: AdminAuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      entity,
      targetTitle,
      details,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newLog);
    // Keep last 40 logs
    setStored(TABLE_AUDIT_LOGS, logs.slice(0, 40));
  },

  // ==========================================
  // FAVORITES, CART, ORDERS, RESERVATIONS
  // ==========================================
  getFavorites(): string[] {
    return getStored<string[]>(FAVORITES_KEY, ['dish-salmon', 'dish-1']);
  },
  toggleFavorite(dishId: string): string[] {
    let favs = this.getFavorites();
    if (favs.includes(dishId)) {
      favs = favs.filter((id) => id !== dishId);
    } else {
      favs.push(dishId);
    }
    setStored(FAVORITES_KEY, favs);
    return favs;
  },

  getCart(): CartItem[] {
    const defaultCart: CartItem[] = [
      { item: INITIAL_FOOD_ITEMS[0], quantity: 1 },
      { item: INITIAL_FOOD_ITEMS[1], quantity: 1 },
    ];
    return getStored<CartItem[]>(CART_KEY, defaultCart);
  },
  saveCart(cart: CartItem[]): void {
    setStored(CART_KEY, cart);
  },
  addToCart(item: FoodItem, quantity: number = 1): CartItem[] {
    const cart = this.getCart();
    const existing = cart.find((c) => c.item.id === item.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ item, quantity });
    }
    this.saveCart(cart);
    return cart;
  },
  updateCartQuantity(itemId: string, quantity: number): CartItem[] {
    let cart = this.getCart();
    if (quantity <= 0) {
      cart = cart.filter((c) => c.item.id !== itemId);
    } else {
      const existing = cart.find((c) => c.item.id === itemId);
      if (existing) {
        existing.quantity = quantity;
      }
    }
    this.saveCart(cart);
    return cart;
  },
  removeFromCart(itemId: string): CartItem[] {
    const cart = this.getCart().filter((c) => c.item.id !== itemId);
    this.saveCart(cart);
    return cart;
  },
  clearCart(): void {
    this.saveCart([]);
  },

  getOrders(): Order[] {
    return getStored<Order[]>(ORDERS_KEY, INITIAL_ORDERS);
  },
  saveOrders(orders: Order[]): void {
    setStored(ORDERS_KEY, orders);
  },
  createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      ...orderData,
      id: `RB-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };
    orders.unshift(newOrder);
    this.saveOrders(orders);
    this.clearCart();
    return newOrder;
  },
  updateOrderStatus(orderId: string, status: Order['status']): void {
    const orders = this.getOrders();
    const order = orders.find((o) => o.id === orderId);
    if (order) {
      order.status = status;
      this.saveOrders(orders);
    }
  },

  getReservations(): Reservation[] {
    return getStored<Reservation[]>(RESERVATIONS_KEY, INITIAL_RESERVATIONS);
  },
  saveReservations(reservations: Reservation[]): void {
    setStored(RESERVATIONS_KEY, reservations);
  },
  createReservation(resData: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation {
    const reservations = this.getReservations();
    const newRes: Reservation = {
      ...resData,
      id: `RES-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'Confirmed',
    };
    reservations.unshift(newRes);
    this.saveReservations(reservations);
    return newRes;
  },
  updateReservationStatus(resId: string, status: Reservation['status']): void {
    const reservations = this.getReservations();
    const r = reservations.find((item) => item.id === resId);
    if (r) {
      r.status = status;
      this.saveReservations(reservations);
    }
  },

  getMessages(): ContactMessage[] {
    return getStored<ContactMessage[]>(MESSAGES_KEY, [
      {
        id: 'msg-1',
        name: 'Harish Rao',
        email: 'harish.rao@example.com',
        phone: '+91 99881 22334',
        subject: 'Catering for Birthday Party',
        message: 'Looking for Mughlai catering for 50 people next Saturday.',
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      },
    ]);
  },
  addMessage(msg: Omit<ContactMessage, 'id' | 'createdAt'>): ContactMessage {
    const messages = this.getMessages();
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    messages.unshift(newMsg);
    setStored(MESSAGES_KEY, messages);
    return newMsg;
  },

  getSubscribers(): string[] {
    return getStored<string[]>(SUBSCRIBERS_KEY, ['vip.foodie@gmail.com', 'hyderabad.taste@yahoo.com']);
  },
  addSubscriber(email: string): boolean {
    const list = this.getSubscribers();
    if (!list.includes(email.toLowerCase())) {
      list.push(email.toLowerCase());
      setStored(SUBSCRIBERS_KEY, list);
      return true;
    }
    return false;
  },
};
