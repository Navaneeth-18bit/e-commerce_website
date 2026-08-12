export type Category =
  | 'new-arrivals'
  | 'oversized'
  | 'casual'
  | 'formal'
  | 'linen'
  | 'premium'
  | 'sale';

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category;
  description: string;
  images: string[];
  price: number;
  discountPrice: number;
  discountPercentage: number;
  colors: { name: string; hex: string }[];
  sizes: string[];
  unavailableSizes?: string[];
  material: string;
  fit: string;
  pattern: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isFeatured: boolean;
  isNewArrival: boolean;
  care: string[];
}

export interface CartItem {
  productId: string;
  size: string;
  color: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
  helpful: number;
}

export type OrderStatus =
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: Address;
  paymentMethod: string;
  estimatedDelivery: string;
}

export interface Address {
  fullName: string;
  phone: string;
  pincode: string;
  addressLine: string;
  city: string;
  state: string;
  type: 'Home' | 'Work' | 'Other';
}

export interface User {
  name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  minOrder: number;
  description: string;
}

export type SortOption =
  | 'recommended'
  | 'newest'
  | 'price-asc'
  | 'price-desc'
  | 'rating'
  | 'discount';

export interface Filters {
  categories: Category[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
  fits: string[];
  patterns: string[];
  minRating: number;
  minDiscount: number;
}
