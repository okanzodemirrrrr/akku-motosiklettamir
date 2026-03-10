import Link from 'next/link';
import Image from 'next/image';
import { Listing } from '@/lib/types';
import { Calendar, Gauge, Phone } from 'lucide-react';

interface ListingCardProps {
    listing: Listing;
    index?: number;
}

export default function ListingCard({ listing, index = 0 }: ListingCardProps) {
    const isRental = listing.type === 'kiralik';
    const heroImage = listing.images?.[0];

    return (
        <Link
            href={`/ilan/${listing.id}`}
            className="card p-0 overflow-hidden hover-lift block group"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            {/* Görsel */}
            <div className="relative h-56 bg-asphalt-700 overflow-hidden">
                {heroImage ? (
                    <Image
                        src={heroImage}
                        alt={listing.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Gauge className="w-16 h-16 text-asphalt-600" />
                    </div>
                )}

                {/* Durum Etiketi */}
                <div
                    className={`absolute top-4 right-4 px-3 py-1 text-white text-xs font-bold uppercase tracking-wider ${isRental ? 'bg-grease-600' : 'bg-burnt-600'
                        }`}
                    style={{
                        clipPath:
                            'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
                    }}
                >
                    {isRental ? 'Kiralık' : 'Satılık'}
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt-900/60 via-transparent to-transparent" />
            </div>

            {/* İçerik */}
            <div className="p-6">
                {/* Marka / Model Başlık */}
                <h3 className="text-lg font-bold text-asphalt-50 mb-1 line-clamp-1">
                    {listing.brand} {listing.model}
                </h3>
                <p className="text-asphalt-400 text-sm mb-4 line-clamp-1">{listing.title}</p>

                {/* Teknik Bilgiler */}
                <div className="flex items-center gap-4 text-sm text-asphalt-300 mb-5">
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-burnt-500" />
                        <span>{listing.year}</span>
                    </div>
                    {listing.km != null && (
                        <div className="flex items-center gap-1.5">
                            <Gauge className="w-4 h-4 text-burnt-500" />
                            <span>{listing.km.toLocaleString('tr-TR')} km</span>
                        </div>
                    )}
                    {listing.engine_cc != null && (
                        <div className="text-asphalt-400">{listing.engine_cc} cc</div>
                    )}
                </div>

                {/* Fiyat ve CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-asphalt-700">
                    {isRental ? (
                        <div>
                            {listing.daily_price != null && (
                                <span className="text-burnt-500 font-bold text-xl">
                                    {listing.daily_price.toLocaleString('tr-TR')} ₺
                                    <span className="text-sm font-normal text-asphalt-400"> / gün</span>
                                </span>
                            )}
                        </div>
                    ) : (
                        <span className="text-burnt-500 font-bold text-xl">
                            {listing.price.toLocaleString('tr-TR')} ₺
                        </span>
                    )}

                    <div className="flex items-center gap-2 text-grease-500 group-hover:text-grease-400 transition-colors">
                        <Phone className="w-4 h-4" />
                        <span className="text-sm font-semibold">Detay</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
