-- RLS Politikalarını Kontrol Et ve Düzelt

-- Önce mevcut politikaları kontrol et
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'listings';

-- Eğer politika yoksa, ekle:
-- RLS'i etkinleştir
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Mevcut politikaları sil (varsa)
DROP POLICY IF EXISTS "Public can view listings" ON listings;
DROP POLICY IF EXISTS "Enable read access for all users" ON listings;

-- Yeni politika ekle
CREATE POLICY "Public can view active listings" 
ON listings 
FOR SELECT 
USING (is_visible = true);

-- Test sorgusu - bu çalışmalı
SELECT id, title, type, price, brand, model, year 
FROM listings 
WHERE is_visible = true 
ORDER BY created_at DESC;
