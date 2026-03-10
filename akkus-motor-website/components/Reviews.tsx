import { Star, MessageSquare } from 'lucide-react';

const REVIEWS_DATA = [
    {
        id: 1,
        name: 'Çağdaş Babacanoglu',
        rating: 5,
        text: 'Bisikletimin kadrosunun orta göbek dişleri aşınmıştı çöp deyip başından atmadılar çözüm ürettiler memnunum tavsiye ederim aynı zamanda çok iyi ilgilendi. Güzelde shimano marka ayna kol taktılar.'
    },
    {
        id: 2,
        name: 'Mehmet Tuna',
        rating: 5,
        text: 'Tek anlamıyla mükemmel bir işçilik sunuyorlar hem güzel işçilik hem de fiyat açısından çok uygun bir tamir servisi ellerinize sağlık yunus ustam'
    },
    {
        id: 3,
        name: 'Can SUSAMAN',
        rating: 5,
        text: 'Başarılı satıcı.ilginiz için teşekkür ederim.cok memnun kaldım'
    }
];

export default function Reviews() {
    return (
        <section id="yorumlariniz" className="py-24 bg-asphalt-950 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-burnt-900/10 to-transparent pointer-events-none" />

            <div className="container-custom relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-block mb-4 px-4 py-2 border border-asphalt-700 bg-asphalt-900/50">
                        <span className="text-asphalt-300 uppercase tracking-widest text-sm font-bold flex items-center justify-center gap-2">
                            <MessageSquare className="w-4 h-4 text-burnt-500" />
                            SİZDEN GELENLER
                        </span>
                    </div>
                    <h2 className="text-asphalt-50 mb-6">Google Müşteri Yorumları</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-burnt-600 to-transparent mx-auto" />
                    <p className="mt-6 text-asphalt-300 max-w-2xl mx-auto">
                        Hizmet verdiğimiz değerlerimiz müşterilerimizin bizim hakkımızda düşündükleri.
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {REVIEWS_DATA.map((review) => (
                        <div
                            key={review.id}
                            className="bg-asphalt-900 border border-asphalt-800 p-8 hover:border-burnt-500/30 transition-colors flex flex-col h-full"
                            style={{
                                clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)'
                            }}
                        >
                            {/* Stars */}
                            <div className="flex items-center gap-1 mb-6 text-burnt-500">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-current" />
                                ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-asphalt-300 leading-relaxed mb-8 italic flex-grow">
                                &quot;{review.text}&quot;
                            </p>

                            {/* Reviewer Profile */}
                            <div className="flex items-center gap-4 border-t border-asphalt-800 pt-6 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-asphalt-800 flex items-center justify-center text-asphalt-400 font-bold uppercase">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <div className="text-asphalt-100 font-medium">
                                        {review.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
