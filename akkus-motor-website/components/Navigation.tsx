'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mobil menü açıkken scroll'u kilitle
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: '/satilik-motosikletler', label: 'SATILIK MOTOSİKLETLER' },
    { href: '/kiralik-motosikletler', label: 'KİRALIK MOTOSİKLETLER' },
    { href: '/satilik-bisikletler', label: 'SATILIK BİSİKLETLER' },
    { href: '/yedek-parca', label: 'YEDEK PARÇA' },
    { href: '/#yorumlariniz', label: 'YORUMLARINIZ' },
    { href: '/#iletisim', label: 'İLETİŞİM' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-asphalt-900/95 backdrop-blur-md border-b border-asphalt-800 shadow-lg'
          : 'bg-transparent'
          }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Brand Text */}
            <Link href="/" className="flex flex-row items-center gap-3">
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Akkuş Motor Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-asphalt-50 font-bold text-sm whitespace-nowrap uppercase tracking-tight leading-tight">
                  AKKUŞ MOTOR & BİSİKLET
                </span>
                <span className="text-asphalt-300 font-medium text-xs whitespace-nowrap uppercase tracking-wide leading-tight">
                  TAMİR SERVİSİ
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-asphalt-200 hover:text-burnt-500 uppercase text-xs font-semibold tracking-wide whitespace-nowrap transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-burnt-600 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}

              <a
                href="tel:+905348798755"
                className="btn-primary !py-2 !px-6 text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Ara</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-asphalt-50 hover:text-burnt-500 transition-colors z-[60]"
              aria-label="Menü"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] max-w-[80vw] bg-asphalt-900 border-l border-asphalt-800 z-[60] lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-asphalt-800">
          <span className="text-asphalt-50 font-bold text-sm uppercase tracking-wider">Menü</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-10 h-10 flex items-center justify-center text-asphalt-300 hover:text-burnt-500 transition-colors"
            aria-label="Menüyü Kapat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Panel Links */}
        <div className="px-6 py-6 space-y-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 text-asphalt-200 hover:text-burnt-500 hover:bg-asphalt-800/50 uppercase text-sm font-semibold tracking-wider transition-all duration-200 py-3 px-3 rounded-lg"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Panel CTA */}
        <div className="px-6 mt-4">
          <a
            href="tel:+905348798755"
            className="btn-primary w-full flex items-center justify-center gap-2 !py-3"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Phone className="w-4 h-4" />
            <span>Hemen Ara</span>
          </a>
        </div>

        {/* Panel Footer Info */}
        <div className="absolute bottom-8 left-6 right-6">
          <div className="text-asphalt-500 text-xs space-y-1">
            <p>Haftanın her günü 07.00-21.00</p>
            <p>Samsun, Türkiye</p>
          </div>
        </div>
      </div>
    </>
  );
}
