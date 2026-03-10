'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/types';
import { X } from 'lucide-react';

interface ImageModalProps {
  item: GalleryItem;
  onClose: () => void;
}

export default function ImageModal({ item, onClose }: ImageModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div 
        className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 transition-colors"
          aria-label="Kapat"
        >
          <X className="w-6 h-6 text-dark-800" />
        </button>

        {/* Image Container */}
        <div className="relative w-full" style={{ minHeight: '400px' }}>
          {item.before_image_url && item.after_image_url ? (
            // Before/After Layout
            <div className="grid md:grid-cols-2 gap-4 p-4">
              <div className="relative aspect-square">
                <div className="absolute top-2 left-2 bg-red-500 text-white text-sm px-3 py-1 rounded font-semibold z-10">
                  Önce
                </div>
                <Image
                  src={item.before_image_url}
                  alt="Önce"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="relative aspect-square">
                <div className="absolute top-2 left-2 bg-green-500 text-white text-sm px-3 py-1 rounded font-semibold z-10">
                  Sonra
                </div>
                <Image
                  src={item.after_image_url}
                  alt="Sonra"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ) : (
            // Single Image Layout
            <div className="relative w-full h-[70vh]">
              <Image
                src={item.image_url}
                alt={item.description || 'Galeri görseli'}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
          )}
        </div>

        {/* Image Info */}
        {(item.description || item.category) && (
          <div className="p-6 border-t border-gray-200">
            {item.description && (
              <p className="text-dark-800 font-medium mb-2">{item.description}</p>
            )}
            {item.category && (
              <span className="inline-block bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded capitalize">
                {item.category}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
