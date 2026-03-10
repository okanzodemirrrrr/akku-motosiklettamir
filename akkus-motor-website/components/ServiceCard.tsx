import { Service } from '@/lib/types';
import { 
  Wrench, 
  Settings, 
  Zap, 
  Bike, 
  Gauge, 
  Cog,
  Hammer,
  Sparkles,
  LucideIcon
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  wrench: Wrench,
  settings: Settings,
  zap: Zap,
  bike: Bike,
  gauge: Gauge,
  cog: Cog,
  hammer: Hammer,
  sparkles: Sparkles,
};

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Wrench;

  return (
    <div className="card p-8 relative overflow-hidden hover:shadow-burnt-600/20 hover:border-burnt-600/50 hover:-translate-y-2">
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-burnt-600/0 via-burnt-600/0 to-burnt-600/0 hover:from-burnt-600/5 hover:via-burnt-600/10 hover:to-burnt-600/5 transition-all duration-500" />
      
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-burnt-600 to-burnt-700 flex items-center justify-center hover:scale-110 transition-transform duration-300"
          style={{
            clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
          }}
        >
          <Icon className="w-8 h-8 text-white" />
        </div>
        {/* Decorative Line */}
        <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-burnt-600 hover:w-full transition-all duration-500" />
      </div>

      {/* Content */}
      <div className="relative">
        <h3 className="text-xl font-bold text-asphalt-50 mb-3 hover:text-burnt-500 transition-colors duration-300">
          {service.name}
        </h3>
        
        <p className="text-asphalt-300 mb-6 leading-relaxed">
          {service.description}
        </p>

        {/* Price Range */}
        <div className="flex items-center justify-between pt-4 border-t border-asphalt-700">
          <span className="text-sm text-asphalt-400 uppercase tracking-wider">Fiyat Aralığı</span>
          <span className="text-burnt-500 font-bold text-lg">{service.price_range}</span>
        </div>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-burnt-600/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}
