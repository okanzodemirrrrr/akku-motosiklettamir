// Site Constants - Centralized configuration

// Business Information
export const BUSINESS_INFO = {
  name: 'Akkuş Motor ve Bisiklet Tamir',
  owner: 'Yunus Emre Akkuş',
  phone: '+905348798755',
  whatsappNumber: '905348798755',
  address: 'Samsun, Türkiye',
  city: 'Samsun',
  districts: ['Atakum', 'Canik', 'İlkadım'],
  workingHours: {
    weekdays: '09:00 - 18:00',
    saturday: '09:00 - 15:00',
    sunday: 'Kapalı'
  }
} as const;

// Site URLs
export const SITE_CONFIG = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  title: 'Akkuş Motor ve Bisiklet Tamir - Samsun',
  description: 'Samsun\'da motor ve bisiklet tamiri, bakımı ve yedek parça hizmetleri. Atakum, Canik, İlkadım bölgelerinde güvenilir tamir hizmeti.',
  keywords: [
    'motor tamiri samsun',
    'bisiklet tamiri samsun',
    'motor bakımı atakum',
    'bisiklet bakımı canik',
    'motor rektefiye ilkadım',
    'motosiklet tamiri samsun',
    'akkuş motor'
  ]
} as const;

// Supabase Configuration
export const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!url || !key || url === 'your-supabase-url') {
    return null;
  }
  
  return { url, key };
};

// WhatsApp Configuration
export const getWhatsAppUrl = (message?: string) => {
  const defaultMessage = 'Merhaba, motor/bisiklet tamiri hakkında bilgi almak istiyorum.';
  const encodedMessage = encodeURIComponent(message || defaultMessage);
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encodedMessage}`;
};

// Phone URL
export const getPhoneUrl = () => {
  return `tel:${BUSINESS_INFO.phone}`;
};

// Google Maps URL
export const getGoogleMapsUrl = () => {
  const address = encodeURIComponent(BUSINESS_INFO.address);
  return `https://www.google.com/maps/search/?api=1&query=${address}`;
};
