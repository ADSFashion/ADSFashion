export type Category = 'men' | 'women' | 'kids' | 'accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  compareAt?: number;
  category: Category;
  subcategory: string;
  images: string[];
  colors: string[];
  sizes: string[];
  rating: number;
  reviewsCount: number;
  tags: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  inventory: number;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
}

export interface Coupon {
  id: string;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  minOrder: number;
  active: boolean;
  expiresAt?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  address: string;
  paymentMethod: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  orders: number;
  spent: number;
  joinedAt: string;
  avatar?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}
