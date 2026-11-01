export type FoodCategory =
  | 'All Items'
  | 'Starters'
  | 'Main Course'
  | 'Biryani'
  | 'Indian Cuisine'
  | 'Chinese Cuisine'
  | 'Desserts'
  | 'Beverages';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  price: number;
  subtitle?: string;
  description: string;
  image: string;
  isVeg: boolean;
  isFeatured?: boolean;
  isPopular?: boolean;
  rating?: number;
}

export interface CartItem {
  item: FoodItem;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  deliveryAddress: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'Cash on Delivery' | 'UPI / Online' | 'Credit/Debit Card';
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  createdAt: string;
}

export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  guests: number;
  date: string;
  time: string;
  specialRequests?: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}
