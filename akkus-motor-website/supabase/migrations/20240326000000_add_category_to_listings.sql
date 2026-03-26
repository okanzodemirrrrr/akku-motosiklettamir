-- Add category column to listings table to distinguish between motorcycles and bicycles
ALTER TABLE listings ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT 'motosiklet' CHECK (category IN ('motosiklet', 'bisiklet'));

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);

-- Update existing records to be motorcycles
UPDATE listings SET category = 'motosiklet' WHERE category IS NULL OR category = 'motosiklet';

-- Add comment
COMMENT ON COLUMN listings.category IS 'Vehicle category: motosiklet or bisiklet';
