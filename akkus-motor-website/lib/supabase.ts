// Supabase Client and Helper Functions

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Service, GalleryItem, FutureProduct, Listing, ServiceWork, ServicesResponse, GalleryResponse, ProductsResponse, ListingsResponse, ServiceWorksResponse } from './types';

let supabaseInstance: SupabaseClient | null = null;

export function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your-supabase-url') {
    return null;
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  return supabaseInstance;
}

export async function getServices(): Promise<ServicesResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      data: [],
      error: 'Veritabanı bağlantısı yapılandırılmamış.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching services:', error);
      return {
        data: [],
        error: 'Hizmetler şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.'
      };
    }

    return { data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching services:', error);
    return {
      data: [],
      error: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    };
  }
}

export async function getGalleryItems(): Promise<GalleryResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      data: [],
      error: 'Veritabanı bağlantısı yapılandırılmamış.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery items:', error);
      return {
        data: [],
        error: 'Galeri görselleri şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.'
      };
    }

    return { data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching gallery items:', error);
    return {
      data: [],
      error: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    };
  }
}

export async function getVisibleProducts(): Promise<ProductsResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      data: [],
      error: 'Veritabanı bağlantısı yapılandırılmamış.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('future_products')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error);
      return {
        data: [],
        error: 'Ürünler şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.'
      };
    }

    return { data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching products:', error);
    return {
      data: [],
      error: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    };
  }
}

export async function getServicesByCategory(category: string): Promise<ServicesResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      data: [],
      error: 'Veritabanı bağlantısı yapılandırılmamış.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching services by category:', error);
      return {
        data: [],
        error: 'Hizmetler şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.'
      };
    }

    return { data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching services by category:', error);
    return {
      data: [],
      error: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    };
  }
}

export async function getGalleryItemsByCategory(category: string): Promise<GalleryResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return {
      data: [],
      error: 'Veritabanı bağlantısı yapılandırılmamış.'
    };
  }

  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching gallery items by category:', error);
      return {
        data: [],
        error: 'Galeri görselleri şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.'
      };
    }

    return { data: data || [] };
  } catch (error) {
    console.error('Unexpected error fetching gallery items by category:', error);
    return {
      data: [],
      error: 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.'
    };
  }
}

// ── Listings ──────────────────────────────────────────────

export async function getListings(type: 'satilik' | 'kiralik'): Promise<ListingsResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { data: [], error: 'Veritabanı bağlantısı yapılandırılmamış.' };
  }

  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('type', type)
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching listings:', error);
      return { data: [], error: 'İlanlar yüklenirken hata oluştu.' };
    }

    return { data: (data as Listing[]) || [] };
  } catch (err) {
    console.error('Unexpected error fetching listings:', err);
    return { data: [], error: 'Beklenmeyen bir hata oluştu.' };
  }
}

export async function getListingById(id: string): Promise<Listing | null> {
  const supabase = getSupabaseClient();

  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('id', id)
      .eq('is_visible', true)
      .single();

    if (error || !data) return null;
    return data as Listing;
  } catch {
    return null;
  }
}
// ── Service Works (Yapılan İşler) ─────────────────────────

export async function getServiceWorks(): Promise<ServiceWorksResponse> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return { data: [], error: 'Veritabanı bağlantısı yapılandırılmamış.' };
  }

  try {
    const { data, error } = await supabase
      .from('service_works')
      .select('*')
      .eq('is_visible', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching service works:', error);
      return { data: [], error: 'Yapılan işler yüklenirken hata oluştu.' };
    }

    return { data: (data as ServiceWork[]) || [] };
  } catch (err) {
    console.error('Unexpected error fetching service works:', err);
    return { data: [], error: 'Beklenmeyen bir hata oluştu.' };
  }
}
