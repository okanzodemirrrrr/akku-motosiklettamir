'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin } from 'lucide-react';


/* ── SVG Dişli (Gear) Bileşeni (Gerçekçi/Endüstriyel Tema) ── */
function Gear({ size, teeth, className, style }: { size: number; teeth: number; className?: string; style?: React.CSSProperties; }) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.48;
  const rootR = size * 0.42;
  const innerR = size * 0.35;
  const hubR = size * 0.15;
  const holeR = size * 0.08;

  // Dış Dişliler
  let path = '';
  for (let i = 0; i < teeth; i++) {
    const a1 = (i / teeth) * Math.PI * 2;
    const a2 = ((i + 0.3) / teeth) * Math.PI * 2;
    const a3 = ((i + 0.5) / teeth) * Math.PI * 2;
    const a4 = ((i + 0.8) / teeth) * Math.PI * 2;

    const p0 = [cx + Math.cos(a1) * rootR, cy + Math.sin(a1) * rootR];
    const p1 = [cx + Math.cos(a2) * outerR, cy + Math.sin(a2) * outerR];
    const p2 = [cx + Math.cos(a3) * outerR, cy + Math.sin(a3) * outerR];
    const p3 = [cx + Math.cos(a4) * rootR, cy + Math.sin(a4) * rootR];

    if (i === 0) path += `M ${p0[0]} ${p0[1]} `;
    path += `L ${p1[0]} ${p1[1]} L ${p2[0]} ${p2[1]} L ${p3[0]} ${p3[1]} `;
  }
  path += 'Z';

  // İç boşlukları oluşturan kollar (Spokes) için maske veya stroke kullanabiliriz.
  // Daha modern durması için iç boşluklu yapı:
  const spokes = 5;
  let cutouts = '';
  for (let i = 0; i < spokes; i++) {
    const angle = (i / spokes) * Math.PI * 2;
    const cxCut = cx + Math.cos(angle) * (size * 0.25);
    const cyCut = cy + Math.sin(angle) * (size * 0.25);
    cutouts += `M ${cxCut} ${cyCut} A ${size * 0.08} ${size * 0.08} 0 1 0 ${cxCut + 0.1} ${cyCut} `;
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} style={style}>
      {/* Ana Çark Gövdesi ve Dişler */}
      <path fillRule="evenodd" clipRule="evenodd" fill="currentColor"
        d={`${path} M ${cx} ${cy} A ${hubR} ${hubR} 0 1 0 ${cx + 0.1} ${cy} ${cutouts}`} />
      {/* Merkez Delik */}
      <circle cx={cx} cy={cy} r={holeR} fill="var(--color-asphalt-900, #1a1b1e)" />
      {/* İç Göbek Vurgusu */}
      <circle cx={cx} cy={cy} r={hubR} fill="none" stroke="var(--color-asphalt-900, #1a1b1e)" strokeWidth={size * 0.02} opacity={0.5} />
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="var(--color-asphalt-900, #1a1b1e)" strokeWidth={size * 0.015} opacity={0.3} />
    </svg>
  );
}

/* ── Piston SVG ── */
function Piston({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg width="40" height="80" viewBox="0 0 40 80" className={className} style={style}>
      <rect x="8" y="0" width="24" height="35" rx="2" fill="currentColor" />
      <rect x="14" y="35" width="12" height="30" rx="2" fill="currentColor" />
      <circle cx="20" cy="70" r="10" fill="currentColor" />
      <circle cx="20" cy="70" r="5" fill="var(--color-asphalt-900, #1a1b1e)" />
      {/* Piston Çizgileri */}
      <line x1="10" y1="10" x2="30" y2="10" stroke="var(--color-asphalt-900, #1a1b1e)" strokeWidth="2" opacity={0.5} />
      <line x1="10" y1="18" x2="30" y2="18" stroke="var(--color-asphalt-900, #1a1b1e)" strokeWidth="2" opacity={0.5} />
      <line x1="10" y1="26" x2="30" y2="26" stroke="var(--color-asphalt-900, #1a1b1e)" strokeWidth="2" opacity={0.5} />
    </svg>
  );
}

export default function Hero() {
  const scrollY = useSyncExternalStore(
    (cb) => {
      window.addEventListener('scroll', cb, { passive: true });
      return () => window.removeEventListener('scroll', cb);
    },
    () => window.scrollY,
    () => 0
  );
  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* ── Koyu Gradient Arka Plan ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(217,69,21,0.08) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(6,71,134,0.06) 0%, transparent 50%), linear-gradient(180deg, #141416 0%, #1a1b1e 50%, #141416 100%)',
        }}
      />

      {/* ── Animasyonlu Mekanik Arka Plan ── */}
      {typeof window !== 'undefined' && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          {/* Büyük Ana Dişli — Sağ Üst */}
          <Gear
            size={400}
            teeth={16}
            className="absolute -right-24 -top-24 text-burnt-600/[0.12] animate-[spin_40s_linear_infinite]"
          />

          {/* Orta Dişli — Sağ (Ana dişliye bağlı, ters yön) */}
          <Gear
            size={220}
            teeth={12}
            className="absolute right-[140px] top-[240px] text-burnt-500/[0.10] animate-[spin_25s_linear_infinite_reverse]"
          />

          {/* Küçük Dişli — Sağ Alt */}
          <Gear
            size={120}
            teeth={8}
            className="absolute right-[60px] top-[420px] text-grease-500/[0.12] animate-[spin_15s_linear_infinite]"
          />

          {/* Sol Alt Büyük Dişli */}
          <Gear
            size={300}
            teeth={14}
            className="absolute -left-20 bottom-[10%] text-asphalt-500/[0.15] animate-[spin_35s_linear_infinite_reverse]"
          />

          {/* Sol Üst Mini Dişli */}
          <Gear
            size={100}
            teeth={8}
            className="absolute left-[200px] top-[15%] text-burnt-600/[0.10] animate-[spin_20s_linear_infinite]"
          />

          {/* Merkez Dekoratif Dişli */}
          <Gear
            size={160}
            teeth={10}
            className="absolute left-[45%] bottom-[20%] text-grease-600/[0.10] animate-[spin_30s_linear_infinite_reverse]"
          />

          {/* Piston — Sağ Alt */}
          <Piston
            className="absolute right-[15%] bottom-[25%] text-burnt-600/[0.12] animate-[bounce_3s_ease-in-out_infinite]"
          />

          {/* Piston — Sol */}
          <Piston
            className="absolute left-[8%] top-[40%] text-asphalt-400/[0.10] animate-[bounce_4s_ease-in-out_infinite_0.5s]"
            style={{ transform: 'rotate(15deg)' }}
          />

          {/* Zincir Çizgisi — Yatay */}
          <div className="absolute top-[60%] left-0 right-0 h-[2px] overflow-hidden opacity-[0.10]">
            <div
              className="h-full animate-[slideChain_8s_linear_infinite]"
              style={{
                width: '200%',
                background:
                  'repeating-linear-gradient(90deg, var(--color-burnt-500) 0px, var(--color-burnt-500) 12px, transparent 12px, transparent 20px)',
              }}
            />
          </div>

          {/* Zincir Çizgisi — Çapraz */}
          <div
            className="absolute top-[30%] -left-[10%] w-[120%] h-[2px] overflow-hidden opacity-[0.08]"
            style={{ transform: 'rotate(-12deg)' }}
          >
            <div
              className="h-full animate-[slideChain_12s_linear_infinite_reverse]"
              style={{
                width: '200%',
                background:
                  'repeating-linear-gradient(90deg, var(--color-grease-500) 0px, var(--color-grease-500) 8px, transparent 8px, transparent 16px)',
              }}
            />
          </div>

          {/* Parlayan Parçacıklar */}
          {[
            { left: '20%', top: '25%', delay: '0s', dur: '4s' },
            { left: '75%', top: '35%', delay: '1s', dur: '5s' },
            { left: '60%', top: '70%', delay: '2s', dur: '6s' },
            { left: '35%', top: '80%', delay: '0.5s', dur: '4.5s' },
            { left: '85%', top: '55%', delay: '3s', dur: '5.5s' },
            { left: '10%', top: '60%', delay: '1.5s', dur: '3.5s' },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-burnt-500/30"
              style={{
                left: p.left,
                top: p.top,
                animation: `pulse ${p.dur} ease-in-out ${p.delay} infinite`,
                boxShadow: '0 0 6px 2px rgba(239,95,43,0.15)',
              }}
            />
          ))}
        </div>
      )}

      {/* ── Vignette Overlay ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(20,20,22,0.85)_100%)] pointer-events-none" />

      {/* ── Noise Texture ── */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ── İçerik ── */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto flex flex-col items-center text-center">

            {/* Devasa Merkez Logo */}
            <div
              className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mb-8"
              style={{
                animation: 'fadeInUp 0.6s ease-out',
                filter: 'drop-shadow(0 0 40px rgba(217,69,21,0.25)) drop-shadow(0 0 80px rgba(217,69,21,0.10))',
              }}
            >
              <Image
                src="/images/logo.png"
                alt="Akkuş Motor ve Bisiklet Tamir Servisi Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Eyebrow */}
            <div
              className="inline-block mb-6 px-4 py-2 border border-burnt-600/50 bg-burnt-600/10 backdrop-blur-sm"
              style={{
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
                animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
              }}
            >
              <span className="text-burnt-500 uppercase tracking-widest text-sm font-bold">
                Samsunun her bölgesine her an hizmet
              </span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-asphalt-50 mb-6 leading-[0.9]"
              style={{
                animation: 'fadeInUp 1s ease-out 0.4s backwards',
                textShadow: '0 4px 20px rgba(0,0,0,0.8)',
              }}
            >
              <span className="text-white">SÜRÜŞÜNÜZÜ</span>
              <br />
              <span className="text-burnt-500">ŞANSA BIRAKMAYIN</span>
            </h1>

            {/* Subheading */}
            <p
              className="text-lg md:text-xl text-asphalt-200 mb-12 max-w-2xl leading-relaxed"
              style={{ animation: 'fadeInUp 1s ease-out 0.6s backwards' }}
            >
              Akkuş Motor &amp; Bisiklet Tamir Servisi olarak motosiklet, bisiklet ve elektrikli araçların bakım ve onarım hizmetlerini güvenilir ve hızlı şekilde sunuyoruz. Motosiklet, elektrikli bisiklet, elektrikli moped, akülü araba, ot kesim motoru ve odun motoru bakım ve onarımlarını da titizlikle yapıyoruz. İkinci el satışlarımızda mevcuttur.{' '}
              <span className="text-burnt-500 font-semibold">Kaliteli işçilik ve müşteri memnuniyeti önceliğimizdir.</span>
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4"
              style={{ animation: 'fadeInUp 1s ease-out 0.8s backwards' }}
            >
              <a href="tel:+905348798755" className="btn-primary flex items-center justify-center gap-3">
                <Phone className="w-5 h-5" />
                <span>Hemen Ara</span>
              </a>
              <Link href="#hizmetler" className="btn-outline flex items-center justify-center gap-3">
                <span>Hizmetlerimiz</span>
              </Link>
            </div>

            {/* Quick Info */}
            <div
              className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-asphalt-300"
              style={{ animation: 'fadeInUp 1s ease-out 1s backwards' }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-burnt-500 rounded-full animate-pulse" />
                <span>Haftanın her günü 07.00-21.00 arası hizmetinizdeyiz</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-burnt-500" />
                <span>Samsun, Türkiye</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ animation: 'fadeInUp 1s ease-out 1s backwards' }}
      >
        <div className="flex flex-col items-center gap-2 text-asphalt-400">
          <span className="text-xs uppercase tracking-widest">Keşfet</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-burnt-500 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
