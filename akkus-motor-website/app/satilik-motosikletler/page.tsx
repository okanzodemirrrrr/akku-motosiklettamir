import { getListings } from '@/lib/supabase';
import ListingCard from '@/components/ListingCard';
import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default async function SatilikMotosikletler() {
  const { data: listings, error } = await getListings('satilik', 'motosiklet');

  return (
    <main className="min-h-screen bg-asphalt-900 pt-32 pb-16">
      <div className="container-custom">
        {/* Geri Butonu */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-asphalt-300 hover:text-burnt-500 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <Home className="w-4 h-4" />
          <span className="text-sm uppercase tracking-wider font-semibold">
            Ana Sayfa
          </span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-asphalt-50 mb-4">
            Satılık Motosikletler
          </h1>
          <p className="text-lg text-asphalt-300">
            İkinci el motosiklet ilanlarımıza göz atın
          </p>
        </div>

        {error && (
          <div className="text-center text-burnt-500 mb-8">
            {error}
          </div>
        )}

        {listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="text-center text-asphalt-400 py-16">
            <p className="text-xl">Şu anda satılık motosiklet ilanı bulunmamaktadır.</p>
          </div>
        )}
      </div>
    </main>
  );
}

