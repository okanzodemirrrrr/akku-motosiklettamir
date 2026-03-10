import Image from 'next/image';
import { getServiceWorks } from '@/lib/supabase';
import { Camera } from 'lucide-react';

export default async function ServiceWorksSlider() {
    const { data: works, error } = await getServiceWorks();

    if (error || !works) {
        return null;
    }

    return (
        <section id="hizmetlerimiz" className="py-24 bg-asphalt-900 border-y border-asphalt-800 overflow-hidden">
            <div className="container-custom">
                {/* Section Header */}
                <div className="mb-14 text-center">
                    <div className="inline-block mb-4 px-4 py-2 border border-burnt-600/30 bg-burnt-600/5">
                        <span className="text-burnt-500 uppercase tracking-widest text-sm font-bold">
                            PORTFÖYÜMÜZ
                        </span>
                    </div>
                    <h2 className="text-asphalt-50 mb-6">Hizmetlerimiz</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-burnt-600 to-transparent mx-auto" />
                    <p className="mt-6 text-asphalt-300 max-w-2xl mx-auto">
                        Atölyemizde özenle gerçekleştirdiğimiz tamir, bakım ve rektefiye işlemlerinden kareler.
                    </p>
                </div>
            </div>

            {/* Snap Scroll Slider Container */}
            <div className="w-full relative px-4 sm:px-8">
                {works.length > 0 ? (
                    <div
                        className="flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-6 pb-6 
                       [&::-webkit-scrollbar]:h-2 
                       [&::-webkit-scrollbar-track]:bg-asphalt-900 
                       [&::-webkit-scrollbar-thumb]:bg-burnt-600/80 
                       [&::-webkit-scrollbar-thumb]:rounded-full 
                       hover:[&::-webkit-scrollbar-thumb]:bg-burnt-500"
                    >
                        {works.map((work) => (
                            <div
                                key={work.id}
                                className="flex-none w-[85vw] md:w-[400px] snap-center bg-asphalt-800 border border-asphalt-700/50 hover:border-burnt-500/50 transition-colors group"
                                style={{
                                    clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
                                }}
                            >
                                <div className="relative aspect-video w-full overflow-hidden bg-asphalt-900">
                                    <Image
                                        src={work.image_url}
                                        alt={work.description}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-asphalt-900 via-transparent to-transparent opacity-60" />
                                </div>
                                <div className="p-6">
                                    <p className="text-sm text-asphalt-200 leading-relaxed">
                                        {work.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-asphalt-800 border border-asphalt-700 rounded-lg max-w-4xl mx-auto text-center px-4">
                        <Camera className="w-12 h-12 text-asphalt-500 mb-4" />
                        <h3 className="text-xl font-semibold text-asphalt-100 mb-2">Henüz İş Eklenmedi</h3>
                        <p className="text-asphalt-400">Yapılan işler yakında bu alanda sergilenecektir.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
