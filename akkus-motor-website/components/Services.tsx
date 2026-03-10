'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/lib/types';
import { getSupabaseClient } from '@/lib/supabase';
import ServiceCard from './ServiceCard';
import { useInView } from '@/lib/useInView';

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { ref, isInView } = useInView();

  useEffect(() => {
    async function fetchServices() {
      try {
        const supabase = getSupabaseClient();
        
        if (!supabase) {
          setServices([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from('services')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setServices(data || []);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Hizmetler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section id="hizmetler" className="py-24 bg-asphalt-900 relative">
        <div className="container-custom">
          <div className="text-center text-asphalt-400">Yükleniyor...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="hizmetler" className="py-32 bg-asphalt-900 relative overflow-hidden" ref={ref}>
      {/* Watermark Letter */}
      <div className="watermark-letter top-0 right-0 select-none pointer-events-none">A</div>
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`mb-20 ${isInView ? 'animate-slide-left' : 'opacity-0'}`}>
          <div className="inline-block mb-4 px-4 py-2 border border-grease-600/30 bg-grease-600/5">
            <span className="text-grease-500 uppercase tracking-widest text-sm font-bold">
              Uzmanlık Alanlarımız
            </span>
          </div>
          <h2 className="text-asphalt-50 mb-6">
            Hizmetlerimiz
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-burnt-600 to-transparent ${isInView ? 'draw-line' : ''}`} />
        </div>

        {error && (
          <div className="text-center py-12">
            <p className="text-asphalt-400">{error}</p>
          </div>
        )}

        {!error && services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-asphalt-400">Henüz hizmet eklenmemiş.</p>
          </div>
        )}

        {!error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={`${isInView ? 'stagger-item' : 'opacity-0'}`}
                style={{
                  animationDelay: isInView ? `${index * 0.1}s` : '0s',
                  // Asimetrik yerleşim için bazı kartları yukarı kaydır
                  marginTop: index % 3 === 1 ? '2rem' : '0',
                }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom Accent */}
        <div className="mt-20 flex justify-center">
          <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-burnt-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}
