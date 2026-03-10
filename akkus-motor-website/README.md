# Akkuş Motor ve Bisiklet Tamir - Web Sitesi

Samsun'da faaliyet gösteren Akkuş Motor ve Bisiklet Tamir (Yunus Abi) için modern tanıtım web sitesi.

## Teknoloji Stack

- **Framework**: Next.js 14 (App Router)
- **Dil**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Supabase
- **Deployment**: Vercel
- **Görsel Optimizasyonu**: browser-image-compression

## Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Supabase Kurulumu

1. Supabase Dashboard'a git: https://supabase.com/dashboard
2. SQL Editor'ü aç
3. `SUPABASE_SETUP.sql` dosyasındaki SQL kodunu yapıştır ve çalıştır
4. Bu işlem şu tabloları oluşturacak:
   - `services` - Hizmet listesi
   - `gallery` - Galeri görselleri
   - `future_products` - Gelecekteki yedek parça satışı için

### 3. Environment Variables

`.env.local` dosyasını düzenle:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Yunus Abi'nin iletişim bilgileri
NEXT_PUBLIC_PHONE=+905XXXXXXXXX
NEXT_PUBLIC_WHATSAPP=905XXXXXXXXX
```

### 4. Development Server

```bash
npm run dev
```

Tarayıcıda http://localhost:3000 adresini aç.

### 5. Örnek Veri Ekleme (Opsiyonel)

```bash
npx tsx scripts/seed.ts
```

## Özellikler

- ✅ Responsive tasarım (mobil öncelikli)
- ✅ SEO optimizasyonu (Samsun yerel anahtar kelimeler)
- ✅ Otomatik görsel sıkıştırma (>1MB görseller 800KB'a düşürülür)
- ✅ WhatsApp entegrasyonu
- ✅ Google Maps entegrasyonu
- ✅ Hizmet listesi (Supabase'den dinamik)
- ✅ Galeri (önce/sonra görselleri)
- ✅ Mobil sabit butonlar (Ara/Yol Tarifi)

## Proje Yapısı

```
akkus-motor-website/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout + SEO
│   ├── page.tsx           # Ana sayfa
│   ├── sitemap.ts         # Sitemap
│   └── robots.ts          # Robots.txt
├── components/            # React bileşenleri
│   ├── Hero.tsx
│   ├── Services.tsx
│   ├── Gallery.tsx
│   ├── Contact.tsx
│   ├── Navigation.tsx
│   └── MobileActions.tsx
├── lib/                   # Utility fonksiyonlar
│   ├── supabase.ts       # Supabase client
│   ├── types.ts          # TypeScript tipleri
│   ├── constants.ts      # Site sabitleri
│   ├── storage.ts        # Görsel yükleme
│   └── imageCompression.ts
├── public/images/         # Statik görseller
├── scripts/               # Yardımcı scriptler
│   └── seed.ts           # Örnek veri
└── supabase/
    └── migrations/        # Database migrations

```

## Build ve Deploy

### Production Build

```bash
npm run build
```

### Vercel'e Deploy

1. GitHub'a push yap
2. Vercel Dashboard'da projeyi import et
3. Environment variables'ı ekle
4. Deploy!

## Gelecek Özellikler

- [ ] Admin paneli (hizmet/galeri yönetimi)
- [ ] Yedek parça e-ticaret modülü
- [ ] Müşteri yorumları
- [ ] Online randevu sistemi

## Lisans

Bu proje Akkuş Motor ve Bisiklet Tamir için özel olarak geliştirilmiştir.
