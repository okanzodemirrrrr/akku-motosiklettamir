-- Akkuş Motor ve Bisiklet Tamir - Initial Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  price_range TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for created_at sorting
CREATE INDEX idx_services_created_at ON services(created_at DESC);

-- Gallery Table
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for category filtering
CREATE INDEX idx_gallery_category ON gallery(category);

-- Future Products Table (for e-commerce expansion)
CREATE TABLE future_products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  part_name TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  stock_status TEXT NOT NULL CHECK (stock_status IN ('in_stock', 'out_of_stock', 'coming_soon')),
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for future_products
CREATE INDEX idx_future_products_stock_status ON future_products(stock_status);
CREATE INDEX idx_future_products_visible ON future_products(is_visible);

-- Comments for documentation
COMMENT ON TABLE services IS 'Stores repair and maintenance services offered';
COMMENT ON TABLE gallery IS 'Stores before/after images of completed work';
COMMENT ON TABLE future_products IS 'Stores spare parts inventory for future e-commerce features';
COMMENT ON COLUMN future_products.is_visible IS 'Controls whether product is displayed on frontend';
