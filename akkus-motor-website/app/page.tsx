import Hero from '@/components/Hero';
import ServiceWorksSlider from '@/components/ServiceWorksSlider';
import Reviews from '@/components/Reviews';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ServiceWorksSlider />
      <Reviews />
      <Contact />
    </main>
  );
}
