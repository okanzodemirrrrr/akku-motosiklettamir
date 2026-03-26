-- ============================================
-- Listings Tablosuna Category Kolonu Ekleme
-- Supabase SQL Editor'a yapıştır ve çalıştır
-- ============================================

-- 1. Category kolonu ekle
ALTER TABLE listings ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'motosiklet' CHECK (category IN ('motosiklet', 'bisiklet'));

-- 2. Index oluştur
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);

-- 3. Mevcut kayıtları güncelle
UPDATE listings SET category = 'motosiklet' WHERE category IS NULL OR category = 'motosiklet';

-- 4. Yorum ekle
COMMENT ON COLUMN listings.category IS 'Vehicle category: motosiklet or bisiklet';

-- ============================================
-- Kontrol sorgusu - çalıştıktan sonra test et
-- ============================================
SELECT id, type, category, title, brand, model FROM listings ORDER BY created_at DESC;
