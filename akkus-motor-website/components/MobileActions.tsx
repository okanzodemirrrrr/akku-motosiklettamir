import { Phone, Navigation } from 'lucide-react';

export default function MobileActions() {
  const phone = '+905348798755';
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Samsun';

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden">
      <div className="flex gap-2 p-4 bg-gradient-to-t from-asphalt-900 via-asphalt-900 to-transparent">
        <a
          href={`tel:${phone}`}
          className="flex-1 bg-burnt-600 hover:bg-burnt-700 text-white py-4 px-6 font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 min-h-[56px] active:scale-95"
          style={{
            clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
          }}
        >
          <Phone className="w-5 h-5" />
          <span>Ara</span>
        </a>
        
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-grease-600 hover:bg-grease-700 text-white py-4 px-6 font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 min-h-[56px] active:scale-95"
          style={{
            clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
          }}
        >
          <Navigation className="w-5 h-5" />
          <span>Yol Tarifi</span>
        </a>
      </div>
    </div>
  );
}
