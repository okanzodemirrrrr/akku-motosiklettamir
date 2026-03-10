// Supabase Storage Helper Functions

import { compressImage, needsCompression } from './imageCompression';

// Storage bucket names
export const STORAGE_BUCKETS = {
  SERVICE_ICONS: 'service-icons',
  GALLERY_IMAGES: 'gallery-images',
  HERO_IMAGES: 'hero-images',
} as const;

export type StorageBucket = typeof STORAGE_BUCKETS[keyof typeof STORAGE_BUCKETS];

interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Upload an image to Supabase Storage with automatic compression
 * @param file - The image file to upload
 * @param bucket - The storage bucket name
 * @param path - Optional path within the bucket
 * @returns Upload result with URL or error
 */
export async function uploadImage(
  file: File,
  bucket: StorageBucket,
  path?: string
): Promise<UploadResult> {
  try {
    // Import supabase client dynamically to avoid build-time errors
    const { createClient } = await import('@supabase/supabase-js');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your-supabase-url') {
      return {
        success: false,
        error: 'Supabase yapılandırması eksik'
      };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Compress image if needed
    let fileToUpload = file;
    if (needsCompression(file, 1)) {
      console.log('Compressing image before upload...');
      fileToUpload = await compressImage(file);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(7);
    const fileExt = fileToUpload.name.split('.').pop();
    const fileName = `${timestamp}-${randomString}.${fileExt}`;
    const filePath = path ? `${path}/${fileName}` : fileName;

    // Upload to Supabase Storage
    const { error } = await supabase.storage
      .from(bucket)
      .upload(filePath, fileToUpload, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: `Yükleme hatası: ${error.message}`
      };
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return {
      success: true,
      url: publicUrl
    };
  } catch (error) {
    console.error('Unexpected upload error:', error);
    return {
      success: false,
      error: 'Beklenmeyen bir hata oluştu'
    };
  }
}

/**
 * Delete an image from Supabase Storage
 * @param bucket - The storage bucket name
 * @param filePath - The file path within the bucket
 * @returns Success status
 */
export async function deleteImage(
  bucket: StorageBucket,
  filePath: string
): Promise<UploadResult> {
  try {
    // Import supabase client dynamically
    const { createClient } = await import('@supabase/supabase-js');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your-supabase-url') {
      return {
        success: false,
        error: 'Supabase yapılandırması eksik'
      };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { error } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return {
        success: false,
        error: `Silme hatası: ${error.message}`
      };
    }

    return {
      success: true
    };
  } catch (error) {
    console.error('Unexpected delete error:', error);
    return {
      success: false,
      error: 'Beklenmeyen bir hata oluştu'
    };
  }
}

/**
 * Upload multiple images
 * @param files - Array of image files
 * @param bucket - The storage bucket name
 * @param path - Optional path within the bucket
 * @returns Array of upload results
 */
export async function uploadImages(
  files: File[],
  bucket: StorageBucket,
  path?: string
): Promise<UploadResult[]> {
  const uploadPromises = files.map(file => uploadImage(file, bucket, path));
  return Promise.all(uploadPromises);
}
