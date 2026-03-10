// Seed Script for Akkuş Motor ve Bisiklet Tamir
// This script populates the database with sample data

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'your-supabase-url') {
  console.error('❌ Supabase credentials not configured');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Sample services data
const sampleServices = [
  {
    name: 'Motor Periyodik Bakım',
    description: 'Motorunuzun düzenli bakımı için kapsamlı servis hizmeti. Yağ değişimi, filtre değişimi ve genel kontrol.',
    icon: 'settings',
    price_range: '500₺ - 1.500₺',
    category: 'Motor Bakım',
  },
  {
    name: 'Motor Rektefiye',
    description: 'Motor bloğu ve silindir kafası rektefiye işlemleri. Profesyonel ekipman ile hassas işçilik.',
    icon: 'wrench',
    price_range: '3.000₺ - 8.000₺',
    category: 'Motor Tamir',
  },
  {
    name: 'Elektrik Arıza Tespiti',
    description: 'Motor elektrik sistemlerinde arıza tespiti ve onarımı. Kablo, sigorta ve elektronik kontrol.',
    icon: 'zap',
    price_range: '300₺ - 1.000₺',
    category: 'Elektrik',
  },
  {
    name: 'Bisiklet Genel Bakım',
    description: 'Bisikletinizin tüm mekanik parçalarının kontrolü ve bakımı. Fren, vites ve zincir ayarı.',
    icon: 'bike',
    price_range: '200₺ - 500₺',
    category: 'Bisiklet',
  },
  {
    name: 'Fren Sistemi Tamiri',
    description: 'Ön ve arka fren sistemlerinin tamiri ve yenilenmesi. Disk ve kampana fren servisi.',
    icon: 'check',
    price_range: '400₺ - 1.200₺',
    category: 'Motor Tamir',
  },
  {
    name: 'Bisiklet Lastik Değişimi',
    description: 'Bisiklet iç ve dış lastik değişimi. Tüm bisiklet tiplerine uygun servis.',
    icon: 'bike',
    price_range: '100₺ - 300₺',
    category: 'Bisiklet',
  },
];

// Sample gallery items
const sampleGalleryItems = [
  {
    image_url: '/images/gallery/motor-bakim-1.jpg',
    category: 'Motor Bakım',
    description: 'Honda CBR 600 periyodik bakım işlemi',
  },
  {
    image_url: '/images/gallery/motor-rektefiye-1.jpg',
    category: 'Motor Tamir',
    description: 'Yamaha R6 motor rektefiye çalışması',
  },
  {
    image_url: '/images/gallery/bisiklet-bakim-1.jpg',
    category: 'Bisiklet',
    description: 'Dağ bisikleti genel bakım ve ayar',
  },
  {
    image_url: '/images/gallery/elektrik-tamir-1.jpg',
    category: 'Elektrik',
    description: 'Kawasaki Ninja elektrik arıza tespiti',
  },
];

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Seed services
    console.log('📝 Inserting services...');
    const { data: services, error: servicesError } = await supabase
      .from('services')
      .insert(sampleServices)
      .select();

    if (servicesError) {
      console.error('❌ Error inserting services:', servicesError);
    } else {
      console.log(`✅ Successfully inserted ${services?.length || 0} services`);
    }

    // Seed gallery items
    console.log('\n📸 Inserting gallery items...');
    const { data: gallery, error: galleryError } = await supabase
      .from('gallery')
      .insert(sampleGalleryItems)
      .select();

    if (galleryError) {
      console.error('❌ Error inserting gallery items:', galleryError);
    } else {
      console.log(`✅ Successfully inserted ${gallery?.length || 0} gallery items`);
    }

    console.log('\n✨ Database seeding completed!');
    console.log('\n📌 Note: Gallery images are placeholders. Please upload actual images to Supabase Storage.');
    
  } catch (error) {
    console.error('\n❌ Unexpected error during seeding:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
