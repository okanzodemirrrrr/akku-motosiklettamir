import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';

export default function YedekParca() {
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

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-asphalt-50 mb-4">
            Yedek Parça
          </h1>
          <p className="text-xl text-burnt-500">
            Ürünler Çok Yakında...
          </p>
        </div>
      </div>
    </main>
  );
}
