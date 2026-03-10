'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/lib/types';
import { ArrowLeftRight } from 'lucide-react';

interface GalleryCardProps {
  item: GalleryItem;
  onClick: () => void;
}

export default function GalleryCard({ item, onClick }: GalleryCardProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const hasBeforeAfter = item.before_image_url && item.after_image_url;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !hasBeforeAfter) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!hasBeforeAfter) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  return (
    <div 
      className="card p-0 cursor-pointer overflow-hidden aspect-[4/3] relative hover:shadow-burnt-600/20"
      onClick={onClick}
    >
      {hasBeforeAfter ? (
        // Before/After Slider
        <div
          className="relative w-full h-full"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
        >
          {/* After Image (Background) */}
          <div className="absolute inset-0">
            <Image
              src={item.after_image_url!}
              alt={`${item.description} - Sonra`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Before Image (Overlay with clip) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src={item.before_image_url!}
              alt={`${item.description} - Önce`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Slider Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-burnt-500 cursor-ew-resize z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-burnt-500 rounded-full flex items-center justify-center shadow-lg">
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute top-4 left-4 px-3 py-1 bg-asphalt-900/80 backdrop-blur-sm text-xs text-asphalt-200 uppercase tracking-wider">
            Önce
          </div>
          <div className="absolute top-4 right-4 px-3 py-1 bg-asphalt-900/80 backdrop-blur-sm text-xs text-asphalt-200 uppercase tracking-wider">
            Sonra
          </div>
        </div>
      ) : (
        // Single Image
        <div className="relative w-full h-full">
          <Image
            src={item.image_url}
            alt={item.description || 'Galeri görseli'}
            fill
            className="object-cover hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt-900/90 via-asphalt-900/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />

      {/* Description */}
      {item.description && (
        <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full hover:translate-y-0 transition-transform duration-300">
          <p className="text-asphalt-50 font-semibold">{item.description}</p>
          {item.category && (
            <span className="inline-block mt-2 px-3 py-1 bg-burnt-600 text-white text-xs uppercase tracking-wider">
              {item.category}
            </span>
          )}
        </div>
      )}

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-burnt-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
