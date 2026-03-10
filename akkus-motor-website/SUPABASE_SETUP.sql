-- ============================================
-- Akkuş Motor ve Bisiklet Tamir
-- Supabase SQL Editor'e Yapıştırılacak Migration
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- SERVICES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  price_range TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for sorting
CREATE INDEX IF NOT EXISTS idx_services_created_at ON services(created_at DESC);

COMMENT ON TABLE services IS 'Stores repair and maintenance services offered';

-- ============================================
-- GALLERY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);

COMMENT ON TABLE gallery IS 'Stores before/after images of completed work';

-- ============================================
-- FUTURE_PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS future_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  part_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_status TEXT NOT NULL CHECK (stock_status IN ('in_stock', 'out_of_stock', 'coming_soon')),
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for future_products
CREATE INDEX IF NOT EXISTS idx_future_products_stock_status ON future_products(stock_status);
CREATE INDEX IF NOT EXISTS idx_future_products_visible ON future_products(is_visible);

COMMENT ON TABLE future_products IS 'Stores spare parts inventory for future e-commerce features';
COMMENT ON COLUMN future_products.is_visible IS 'Controls whether product is displayed on frontend';


-- ============================================
-- SERVICE_WORKS TABLE (Yapılan İşler / Slider)
-- ============================================
CREATE TABLE IF NOT EXISTS service_works (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_service_works_visible ON service_works(is_visible);
CREATE INDEX IF NOT EXISTS idx_service_works_created_at ON service_works(created_at DESC);

COMMENT ON TABLE service_works IS 'Ana sayfada gösterilecek yapılan işler / hizmet vitrini slider verileri';

-- ============================================
-- SEED DATA — Service Works
-- ============================================
INSERT INTO service_works (image_url, description) VALUES 
('https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80', 'Honda CBR 250R Ağır Bakım ve Komple Motor Revizyonu'),
('https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80', 'Yamaha MT-07 Periyodik Bakım ve Zincir Dişli Seti Değişimi'),
('https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80', 'Scooter Varyatör Bakımı ve Debriyaj Balatası Yenileme');

-- ============================================

-- LISTINGS TABLE (Satılık / Kiralık İlanlar)
-- ============================================
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('satilik', 'kiralik')),
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  km INTEGER,
  engine_cc INTEGER,
  cylinder_count INTEGER,
  gearbox TEXT,
  damage_record TEXT DEFAULT 'Yok',
  description TEXT NOT NULL,
  price INTEGER NOT NULL,
  daily_price INTEGER,
  weekly_price INTEGER,
  images TEXT[] DEFAULT '{}',
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_listings_type ON listings(type);
CREATE INDEX IF NOT EXISTS idx_listings_visible ON listings(is_visible);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);

COMMENT ON TABLE listings IS 'Motosiklet satılık ve kiralık ilanları';

-- ============================================
-- SEED DATA — Satılık İlan
-- ============================================
INSERT INTO listings (
  type, title, brand, model, year, km, engine_cc, cylinder_count,
  gearbox, damage_record, description, price, images, is_visible
) VALUES (
  'satilik',
  'Honda CBR 250R — Garaj Çıkışlı, Hasar Kayıtsız',
  'Honda',
  'CBR 250R',
  2021,
  14500,
  250,
  1,
  'Manuel 6 İleri',
  'Yok',
  'İlk sahibinden, garaj çıkışlı Honda CBR 250R. Tüm periyodik bakımları zamanında yetkili serviste yaptırılmıştır. Orjinal boya, değişen parça yoktur. Lastikler 2024 yılında yenilenmiştir.

Öne Çıkan Detaylar:
• Tek elden, özenle kullanılmış
• Yetkili servis bakım geçmişi mevcut
• Orjinal anahtar ve yedek anahtar
• Tüm bakımları yapılı, binip kullanılır durumda
• Takas düşünülmemektedir, fiyat az pazarlıklıdır

Motor son derece sağlıklı çalışmakta, herhangi bir mekanik sorun bulunmamaktadır. Görmeden karar vermeyin, yerinde inceleme yapabilirsiniz.',
  89000,
  ARRAY[
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'
  ],
  true
);

-- ============================================
-- SEED DATA — Kiralık İlan
-- ============================================
INSERT INTO listings (
  type, title, brand, model, year, km, engine_cc, cylinder_count,
  gearbox, damage_record, description, price, daily_price, weekly_price,
  images, is_visible
) VALUES (
  'kiralik',
  'Yamaha NMAX 155 — Günlük / Haftalık Kiralık',
  'Yamaha',
  'NMAX 155',
  2023,
  6200,
  155,
  1,
  'Otomatik (CVT)',
  'Yok',
  'Şehir içi ulaşım ve kısa mesafe geziler için ideal, son derece ekonomik ve konforlu Yamaha NMAX 155. Düzenli bakımları yapılmış, temiz ve bakımlı durumdadır.

Kiralama Koşulları:
• Geçerli ehliyet ve kimlik fotokopisi zorunludur
• Depozito: 3.000 ₺ (iade edilir)
• Yakıt dolu teslim edilir, dolu iade beklenir
• Kasko poliçesi dahildir
• Günlük 120 km limiti (aşım km başı 3 ₺)

Teknik Özellikler:
• Otomatik vites, kolay kullanım
• Blue Core motor teknolojisi
• LED aydınlatma sistemi
• Geniş bagaj altı depolama alanı
• ABS fren sistemi',
  350,
  350,
  2000,
  ARRAY[
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&q=80',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80'
  ],
  true
);

