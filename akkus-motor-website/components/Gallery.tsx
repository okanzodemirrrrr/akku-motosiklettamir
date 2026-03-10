'use client';

import { useEffect, useState } from 'react';
import { GalleryItem } from '@/lib/types';
import { getSupabaseClient } from '@/lib/supabase';
import GalleryCard from './GalleryCard';
import ImageModal from './ImageModal';
import { useInView } from '@/lib/useInView';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const { ref, isInView } = useInView();

  useEffect(() => {
    async function fetchGallery() {
      try {
        const supabase = getSupabaseClient();
        
        if (!supabase) {
          setItems([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setItems(data || []);
      } catch (err) {
        console.error('Error fetching gallery:', err);
        setError('Galeri yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  const categories = ['all', ...Array.from(new Set(items.map(item => item.category)))];
  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <section id="galeri" className="py-24 bg-asphalt-800 relative">
        <div className="container-custom">
          <div className="text-center text-asphalt-400">Yükleniyor...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="galeri" className="py-32 bg-asphalt-800 relative overflow-hidden" ref={ref}>
      {/* Watermark Letter */}
      <div className="watermark-letter bottom-0 left-0 select-none pointer-events-none">M</div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`mb-20 ${isInView ? 'animate-slide-right' : 'opacity-0'}`}>
          <div className="inline-block mb-4 px-4 py-2 border border-burnt-600/30 bg-burnt-600/5">
            <span className="text-burnt-500 uppercase tracking-widest text-sm font-bold">
              İşlerimizden Örnekler
            </span>
          </div>
          <h2 className="text-asphalt-50 mb-6">
            Galeri
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-burnt-600 to-transparent ${isInView ? 'draw-line' : ''}`} />
        </div>

        {/* Category Filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 uppercase text-sm font-bold tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-burnt-600 text-white'
                    : 'bg-asphalt-700 text-asphalt-300 hover:bg-asphalt-600'
                }`}
                style={{
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                }}
              >
                {category === 'all' ? 'Tümü' : category}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-asphalt-400">{error}</p>
          </div>
        )}

        {!error && filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-asphalt-400">Henüz galeri öğesi eklenmemiş.</p>
          </div>
        )}

        {!error && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`${isInView ? 'stagger-item' : 'opacity-0'}`}
                style={{
                  animationDelay: isInView ? `${index * 0.1}s` : '0s',
                  // Asimetrik yerleşim
                  marginTop: index % 4 === 2 ? '3rem' : '0',
                }}
              >
                <GalleryCard 
                  item={item} 
                  onClick={() => setSelectedImage(item)}
                />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Accent */}
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-burnt-600 to-transparent" />
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          item={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  );
}
