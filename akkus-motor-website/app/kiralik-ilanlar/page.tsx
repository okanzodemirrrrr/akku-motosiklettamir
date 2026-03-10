import type { Metadata } from 'next';
import { getListings } from '@/lib/supabase';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Kiralık Motosikletler | Akkuş Motosiklet ve Bisiklet Tamir Servisi',
    description:
        'Samsun bölgesinde günlük ve haftalık kiralık motosiklet ve scooter ilanları. Uygun fiyatlarla güvenilir kiralama.',
};

export const revalidate = 60;

export default async function KiralikIlanlarPage() {
    const { data: listings, error } = await getListings('kiralik');

    return (
        <main className="min-h-screen bg-asphalt-900 pt-28 pb-16">
            <div className="container-custom">
                {/* Geri Butonu */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-asphalt-300 hover:text-burnt-500 transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm uppercase tracking-wider font-semibold">Ana Sayfa</span>
                </Link>

                {/* Başlık */}
                <div className="mb-14">
                    <div className="inline-block mb-4 px-4 py-2 border border-grease-600/30 bg-grease-600/5">
                        <span className="text-grease-500 uppercase tracking-widest text-sm font-bold">
                            Kiralık Araçlar
                        </span>
                    </div>
                    <h1 className="text-asphalt-50 mb-4">Kiralık İlanlar</h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-grease-600 to-transparent" />
                </div>

                {/* İlan Grid */}
                {error && (
                    <div className="text-center py-16">
                        <p className="text-asphalt-400">{error}</p>
                    </div>
                )}

                {!error && (!listings || listings.length === 0) && (
                    <div className="text-center py-16">
                        <p className="text-asphalt-400 text-lg">Henüz kiralık ilan bulunmamaktadır.</p>
                        <p className="text-asphalt-500 text-sm mt-2">
                            Kiralama koşulları ve fiyatlar için bizi arayın:{' '}
                            <a href="tel:+905348798755" className="text-burnt-500 hover:text-burnt-400 font-semibold">
                                +90 534 879 87 55
                            </a>
                        </p>
                    </div>
                )}

                {!error && listings && listings.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing, index) => (
                            <ListingCard key={listing.id} listing={listing} index={index} />
                        ))}
                    </div>
                )}

                {/* Alt Bilgi */}
                <div className="mt-16 text-center">
                    <p className="text-asphalt-400">
                        Kiralama koşulları ve fiyatlar için bizi arayın:{' '}
                        <a
                            href="tel:+905348798755"
                            className="text-burnt-500 hover:text-burnt-400 font-semibold"
                        >
                            +90 534 879 87 55
                        </a>
                    </p>
                </div>
            </div>
        </main>
    );
}
