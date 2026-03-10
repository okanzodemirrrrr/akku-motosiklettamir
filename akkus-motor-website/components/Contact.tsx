'use client';

import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useInView } from '@/lib/useInView';

export default function Contact() {
  const { ref, isInView } = useInView();

  const businessInfo = {
    phone: '+905348798755',
    whatsapp: '905348798755',
    address: 'Samsun, Türkiye',
    workingHours: 'Haftanın her günü 07.00-21.00'
  };

  const whatsappMessage = encodeURIComponent('Merhaba, motor/bisiklet tamiri hakkında bilgi almak istiyorum.');

  return (
    <section id="iletisim" className="py-32 bg-asphalt-900 relative overflow-hidden" ref={ref}>
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className={`mb-20 text-center ${isInView ? 'animate-in' : 'opacity-0'}`}>
          <div className="inline-block mb-4 px-4 py-2 border border-grease-600/30 bg-grease-600/5">
            <span className="text-grease-500 uppercase tracking-widest text-sm font-bold">
              Bize Ulaşın
            </span>
          </div>
          <h2 className="text-asphalt-50 mb-6">
            İletişim
          </h2>
          <div className={`w-24 h-1 bg-gradient-to-r from-burnt-600 to-transparent mx-auto ${isInView ? 'draw-line' : ''}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className={`space-y-8 ${isInView ? 'animate-slide-left' : 'opacity-0'}`}>
            {/* Phone */}
            <div className="card p-8 hover-lift">
              <div className="flex items-start gap-6">
                <div
                  className="w-14 h-14 bg-gradient-to-br from-burnt-600 to-burnt-700 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-300"
                  style={{
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                  }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-asphalt-50 mb-2">Telefon</h3>
                  <a
                    href={`tel:${businessInfo.phone}`}
                    className="text-burnt-500 hover:text-burnt-400 text-lg font-semibold transition-colors"
                  >
                    {businessInfo.phone}
                  </a>
                  <p className="text-asphalt-400 text-sm mt-1">Hemen arayın, size yardımcı olalım</p>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="card p-8 hover-lift">
              <div className="flex items-start gap-6">
                <div
                  className="w-14 h-14 bg-gradient-to-br from-grease-600 to-grease-700 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-300"
                  style={{
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                  }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-asphalt-50 mb-2">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${businessInfo.whatsapp}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-grease-500 hover:text-grease-400 text-lg font-semibold transition-colors"
                  >
                    Mesaj Gönder
                  </a>
                  <p className="text-asphalt-400 text-sm mt-1">7/24 mesaj atabilirsiniz</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="card p-8 hover-lift">
              <div className="flex items-start gap-6">
                <div
                  className="w-14 h-14 bg-gradient-to-br from-burnt-600 to-burnt-700 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-300"
                  style={{
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                  }}
                >
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-asphalt-50 mb-2">Adres</h3>
                  <p className="text-asphalt-300">{businessInfo.address}</p>
                  <p className="text-asphalt-400 text-sm mt-1">Samsunun her bölgesine hizmet</p>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="card p-8 hover-lift">
              <div className="flex items-start gap-6">
                <div
                  className="w-14 h-14 bg-gradient-to-br from-grease-600 to-grease-700 flex items-center justify-center flex-shrink-0 hover:scale-110 transition-transform duration-300"
                  style={{
                    clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                  }}
                >
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-asphalt-50 mb-3">Çalışma Saatleri</h3>
                  <p className="text-asphalt-300">{businessInfo.workingHours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className={`card p-0 overflow-hidden h-[600px] ${isInView ? 'animate-slide-right' : 'opacity-0'}`}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3019.8!2d36.083815!3d41.492721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDI5JzMzLjgiTiAzNsKwMDUnMDEuNyJF!5e0!3m2!1str!2str!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Akkuş Motor Konum"
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="card p-12 bg-gradient-to-br from-asphalt-800 to-asphalt-900 border-burnt-600/20">
            <h3 className="text-3xl md:text-4xl font-bold text-asphalt-50 mb-4">
              Motorunuz için <span className="text-burnt-500">en iyi bakım</span>
            </h3>
            <p className="text-asphalt-300 text-lg mb-8 max-w-2xl mx-auto">
              20 yıllık tecrübemizle motorunuza ve bisikletinize güvenle emanet edebilirsiniz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`tel:${businessInfo.phone}`} className="btn-primary">
                <Phone className="w-5 h-5 inline mr-2" />
                Hemen Ara
              </a>
              <a
                href={`https://wa.me/${businessInfo.whatsapp}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="w-5 h-5 inline mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
