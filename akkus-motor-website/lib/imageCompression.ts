// Client-Side Image Compression Utility

import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string;
}

/**
 * Compress an image file to reduce its size
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Compressed file
 */
export async function compressImage(
  file: File,
  options?: CompressionOptions
): Promise<File> {
  const defaultOptions: CompressionOptions = {
    maxSizeMB: 0.8, // Maksimum 800KB
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg',
    ...options,
  };

  try {
    // Check if file is already small enough
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB <= (defaultOptions.maxSizeMB || 0.8)) {
      console.log('File is already small enough, skipping compression');
      return file;
    }

    console.log(`Compressing image from ${fileSizeMB.toFixed(2)}MB...`);
    
    const compressedFile = await imageCompression(file, defaultOptions);
    
    const compressedSizeMB = compressedFile.size / 1024 / 1024;
    console.log(`Image compressed to ${compressedSizeMB.toFixed(2)}MB`);
    
    return compressedFile;
  } catch (error) {
    console.error('Görsel sıkıştırma hatası:', error);
    // Hata durumunda orijinal dosyayı döndür
    return file;
  }
}

/**
 * Compress multiple image files
 * @param files - Array of image files to compress
 * @param options - Compression options
 * @returns Array of compressed files
 */
export async function compressImages(
  files: File[],
  options?: CompressionOptions
): Promise<File[]> {
  const compressionPromises = files.map(file => compressImage(file, options));
  return Promise.all(compressionPromises);
}

/**
 * Check if a file needs compression
 * @param file - The file to check
 * @param maxSizeMB - Maximum size in MB
 * @returns True if file needs compression
 */
export function needsCompression(file: File, maxSizeMB: number = 1): boolean {
  const fileSizeMB = file.size / 1024 / 1024;
  return fileSizeMB > maxSizeMB;
}

/**
 * Get file size in human-readable format
 * @param bytes - File size in bytes
 * @returns Formatted file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}
