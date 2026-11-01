import { FoodItem, Order, Reservation, ContactMessage, CartItem } from '../types';
import { INITIAL_FOOD_ITEMS } from '../data/initialData';

const MENU_KEY = 'royal_bites_menu_items_v3';
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
    // Dispatch custom event for reactive sync across components
    window.dispatchEvent(new CustomEvent('royal_bites_db_update', { detail: { key } }));
  } catch (e) {
    console.error('Error writing to localStorage', e);
  }
}

// Initial sample orders and reservations so admin dashboard is already lively!
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
  // Menu items
  getMenuItems(): FoodItem[] {
    return getStored<FoodItem[]>(MENU_KEY, INITIAL_FOOD_ITEMS);
  },
  saveMenuItems(items: FoodItem[]): void {
    setStored(MENU_KEY, items);
  },
  addMenuItem(item: Omit<FoodItem, 'id'>): FoodItem {
    const items = this.getMenuItems();
    const newItem: FoodItem = {
      ...item,
      id: `dish-${Date.now()}`,
    };
    items.unshift(newItem);
    this.saveMenuItems(items);
    return newItem;
  },
  updateMenuItem(item: FoodItem): void {
    const items = this.getMenuItems();
    const idx = items.findIndex((i) => i.id === item.id);
    if (idx !== -1) {
      items[idx] = item;
      this.saveMenuItems(items);
    }
  },
  deleteMenuItem(id: string): void {
    const items = this.getMenuItems().filter((i) => i.id !== id);
    this.saveMenuItems(items);
  },

  // Favorites
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
  isFavorite(dishId: string): boolean {
    return this.getFavorites().includes(dishId);
  },

  // Cart
  getCart(): CartItem[] {
    // Initial cart with 2 items to match reference image (which shows badge "2")
    const defaultCart: CartItem[] = [
      { item: INITIAL_FOOD_ITEMS[0], quantity: 1 }, // Chicken Biryani
      { item: INITIAL_FOOD_ITEMS[1], quantity: 1 }, // Paneer Butter Masala
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

  // Orders
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

  // Reservations
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

  // Messages
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

  // Newsletter
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
