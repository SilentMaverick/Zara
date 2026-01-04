
export interface Product {
  id: string;
  name: string;
  category: string;
  subCategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: string[];
  sizes: string[];
  colors: string[];
  description: string;
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  selectedSize: string;
  quantity: number;
}

export type SortOption = 'newest' | 'price-low-high' | 'price-high-low' | 'discount';

export type ViewState = 'home' | 'catalog' | 'product' | 'checkout' | 'success' | 'wishlist';

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  priceRange: [number, number];
}

export interface NavigationState {
  mainCategory: string | null;
  subCategory: string | null;
  searchTerm: string;
}

export interface OrderTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}
