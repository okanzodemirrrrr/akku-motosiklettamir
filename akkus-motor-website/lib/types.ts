// TypeScript Type Definitions for Akkuş Motor ve Bisiklet Tamir

export interface Service {
  id: string;
  name: string;
  description: string;
  icon: string;
  price_range: string;
  category: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  category: string;
  description: string;
  before_image_url?: string;
  after_image_url?: string;
  created_at: string;
}

export interface FutureProduct {
  id: string;
  part_name: string;
  stock_status: 'in_stock' | 'out_of_stock' | 'coming_soon';
  price: number;
  category: string;
  is_visible: boolean;
  created_at: string;
}

export interface ContactInfo {
  phone: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  googleMapsUrl: string;
}

// Helper types for API responses
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export interface Listing {
  id: string;
  type: 'satilik' | 'kiralik';
  title: string;
  brand: string;
  model: string;
  year: number;
  km?: number;
  engine_cc?: number;
  cylinder_count?: number;
  gearbox?: string;
  damage_record?: string;
  description: string;
  price: number;
  daily_price?: number;
  weekly_price?: number;
  images: string[];
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface ServiceWork {
  id: string;
  image_url: string;
  description: string;
  is_visible: boolean;
  created_at: string;
}

export type ServicesResponse = ApiResponse<Service[]>;
export type GalleryResponse = ApiResponse<GalleryItem[]>;
export type ProductsResponse = ApiResponse<FutureProduct[]>;
export type ListingsResponse = ApiResponse<Listing[]>;
export type ServiceWorksResponse = ApiResponse<ServiceWork[]>;
