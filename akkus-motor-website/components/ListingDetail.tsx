'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Listing } from '@/lib/types';
import {
    Phone,
    ArrowLeft,
    Calendar,
    Gauge,
    Cog,
    ShieldCheck,
    Cylinder,
    Bike,
} from 'lucide-react';

interface ListingDetailProps {
    listing: Listing;
}

export default function ListingDetail({ listing }: ListingDetailProps) {
    const [selectedImage, setSelectedImage] = useState(0);
    const isRental = listing.type === 'kiralik';
    const isBicycle = listing.category === 'bisiklet';
    const images = listing.images ?? [];

    // Teknik özellik satırları - category'ye göre dinamik
    const specs: { label: string; value: string | number | undefined; icon: React.ReactNode }[] = isBicycle
        ? [
            // Bisiklet için sadece temel özellikler
            { label: 'Marka', value: listing.brand, icon: <Bike className="w-4 h-4" /> },
            { label: 'Model', value: listing.model, icon: <Bike className="w-4 h-4" /> },
            { label: 'Yıl', value: listing.year, icon: <Calendar className="w-4 h-4" /> },
            { label: 'Vites', value: listing.gearbox ?? undefined, icon: <Cog className="w-4 h-4" /> },
        ].filter((s) => s.value != null && s.value !== '')
        : [
            // Motosiklet için tüm özellikler
            { label: 'Marka', value: listing.brand, icon: <Bike className="w-4 h-4" /> },
            { label: 'Model', value: listing.model, icon: <Bike className="w-4 h-4" /> },
            { label: 'Yıl', value: listing.year, icon: <Calendar className="w-4 h-4" /> },
            {
                label: 'Kilometre',
                value: listing.km != null ? `${listing.km.toLocaleString('tr-TR')} km` : undefined,
                icon: <Gauge className="w-4 h-4" />,
            },
            {
                label: 'Motor Hacmi',
                value: listing.engine_cc != null ? `${listing.engine_cc} cc` : undefined,
                icon: <Cog className="w-4 h-4" />,
            },
            {
                label: 'Silindir Sayısı',
                value: listing.cylinder_count ?? undefined,
                icon: <Cylinder className="w-4 h-4" />,
            },
            { label: 'Vites', value: listing.gearbox ?? undefined, icon: <Cog className="w-4 h-4" /> },
            {
                label: 'Hasar Kaydı',
                value: listing.damage_record ?? 'Yok',
                icon: <ShieldCheck className="w-4 h-4" />,
            },
        ].filter((s) => s.value != null && s.value !== '');

    const backUrl = isRental 
        ? `/kiralik-motosikletler` 
        : listing.category === 'bisiklet' 
            ? `/satilik-bisikletler` 
            : `/satilik-motosikletler`;
    
    const backLabel = isRental 
        ? 'Kiralık Motosikletler' 
        : listing.category === 'bisiklet' 
            ? 'Satılık Bisikletler' 
            : 'Satılık Motosikletler';

    return (
        <div className="min-h-screen bg-asphalt-900 pt-24 pb-16">
            <div className="container-custom">
                {/* Geri Butonu */}
                <Link
                    href={backUrl}
                    className="inline-flex items-center gap-2 text-asphalt-300 hover:text-burnt-500 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-wider font-semibold">
                        {backLabel}
                    </span>
                </Link>

                {/* ── Ana İçerik: Sol Galeri + Sağ Bilgiler ── */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* SOL — Galeri (3/5) */}
                    <div className="lg:col-span-3">
                        {/* Ana Görsel */}
                        <div className="relative w-full aspect-[4/3] bg-asphalt-800 overflow-hidden mb-3">
                            {images.length > 0 ? (
                                <Image
                                    src={images[selectedImage]}
                                    alt={`${listing.title} — Görsel ${selectedImage + 1}`}
                                    fill
                                    className="object-cover"
                                    priority
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Gauge className="w-20 h-20 text-asphalt-600" />
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border-2 transition-all duration-200 ${i === selectedImage
                                                ? 'border-burnt-500 opacity-100'
                                                : 'border-asphalt-700 opacity-60 hover:opacity-100'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`Küçük görsel ${i + 1}`}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SAĞ — Bilgiler (2/5) */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Başlık + Fiyat */}
                        <div className="card p-6">
                            <div
                                className={`inline-block mb-3 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white ${isRental ? 'bg-grease-600' : 'bg-burnt-600'
                                    }`}
                                style={{
                                    clipPath:
                                        'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
                                }}
                            >
                                {isRental ? 'Kiralık' : 'Satılık'}
                            </div>

                            <h1 className="!text-2xl md:!text-3xl text-asphalt-50 mb-2 !normal-case !tracking-normal"
                                style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
                                {listing.title}
                            </h1>

                            <p className="text-asphalt-400 text-sm mb-6">
                                {listing.brand} {listing.model} — {listing.year} Model
                            </p>

                            {/* Fiyat */}
                            <div className="border-t border-asphalt-700 pt-4">
                                {isRental ? (
                                    <div className="space-y-2">
                                        {listing.daily_price != null && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-asphalt-300">Günlük</span>
                                                <span className="text-burnt-500 font-bold text-2xl">
                                                    {listing.daily_price.toLocaleString('tr-TR')} ₺
                                                </span>
                                            </div>
                                        )}
                                        {listing.weekly_price != null && (
                                            <div className="flex justify-between items-center">
                                                <span className="text-asphalt-300">Haftalık</span>
                                                <span className="text-burnt-500 font-bold text-xl">
                                                    {listing.weekly_price.toLocaleString('tr-TR')} ₺
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <span className="text-asphalt-300">Fiyat</span>
                                        <span className="text-burnt-500 font-bold text-3xl">
                                            {listing.price.toLocaleString('tr-TR')} ₺
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Teknik Özellikler Tablosu */}
                        <div className="card p-6">
                            <h2 className="!text-lg font-bold text-asphalt-50 mb-4 uppercase tracking-wider !normal-case"
                                style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1rem', textTransform: 'uppercase' }}>
                                Teknik Özellikler
                            </h2>
                            <div className="divide-y divide-asphalt-700">
                                {specs.map((spec, i) => (
                                    <div key={i} className="flex items-center justify-between py-3">
                                        <div className="flex items-center gap-3 text-asphalt-400">
                                            <span className="text-burnt-500">{spec.icon}</span>
                                            <span className="text-sm">{spec.label}</span>
                                        </div>
                                        <span className="text-asphalt-100 font-medium text-sm">{String(spec.value)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* İletişim CTA */}
                        <div className="space-y-3">
                            <a
                                href="tel:+905348798755"
                                className="btn-primary w-full flex items-center justify-center gap-3"
                            >
                                <Phone className="w-5 h-5" />
                                <span>Hemen Ara</span>
                            </a>
                            <a
                                href={`https://wa.me/905348798755?text=${encodeURIComponent(
                                    `Merhaba, "${listing.title}" ilanı hakkında bilgi almak istiyorum.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary w-full flex items-center justify-center gap-3"
                            >
                                <span>WhatsApp ile Yaz</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* ── Alt Alan: Açıklama ── */}
                <div className="mt-10">
                    <div className="card p-8">
                        <h2
                            className="!text-lg font-bold text-asphalt-50 mb-6 uppercase tracking-wider"
                            style={{ fontFamily: 'var(--font-inter), sans-serif', fontSize: '1rem', textTransform: 'uppercase' }}
                        >
                            İlan Açıklaması
                        </h2>
                        <div className="text-asphalt-200 leading-relaxed whitespace-pre-line text-[15px]">
                            {listing.description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
