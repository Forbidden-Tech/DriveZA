import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Badge } from "@/components/ui/badge";
import { MapPin, Gauge, Settings2, Heart, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  variant?: string;
  price: number;
  mileage: number;
  transmission: string;
  body_type: string;
  province?: string;
  images?: string[];
  featured?: boolean;
  seller_type?: string;
}

interface CarCardProps {
  car: Car;
  index?: number;
  variant?: 'default' | 'dark';
}

export default function CarCard({ car, index = 0, variant = 'default' }: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatMileage = (km: number) => {
    return (km / 1000).toFixed(0) + 'k km';
  };

  const isDark = variant === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={createPageUrl(`CarDetails?id=${car.id}`)}>
        <div className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${
          isDark 
            ? 'bg-white/5 border border-white/5 hover:border-emerald-500/30' 
            : 'bg-white hover:shadow-2xl border border-gray-100'
        }`}>
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={car.images?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600'}
              alt={`${car.year} ${car.make} ${car.model}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#0a0a0a]' : 'from-black/50'} via-transparent to-transparent`} />
            
            {car.featured && (
              <Badge className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                ✨ Featured
              </Badge>
            )}
            
            {car.seller_type === 'Dealer' && !car.featured && (
              <Badge className={`absolute top-4 left-4 ${isDark ? 'bg-white/10 text-white border-white/20' : 'bg-black/60 text-white border-0'}`}>
                Dealer
              </Badge>
            )}
            
            <button 
              className={`absolute top-4 right-4 p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                isDark ? 'bg-white/10 backdrop-blur-sm hover:bg-emerald-500' : 'bg-white/90 hover:bg-emerald-500 hover:text-white'
              }`}
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
          
          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{car.year}</span>
              <span className={isDark ? 'text-gray-700' : 'text-gray-300'}>•</span>
              <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{car.body_type}</span>
            </div>
            
            <h3 className={`font-semibold text-lg leading-tight mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {car.make} {car.model}
            </h3>
            
            {car.variant && (
              <p className={`text-sm mb-4 line-clamp-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {car.variant}
              </p>
            )}
            
            <div className="flex flex-wrap gap-3 mb-4">
              <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Gauge className="w-4 h-4" />
                <span>{formatMileage(car.mileage)}</span>
              </div>
              <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Settings2 className="w-4 h-4" />
                <span>{car.transmission}</span>
              </div>
              <div className={`flex items-center gap-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <MapPin className="w-4 h-4" />
                <span>{car.province}</span>
              </div>
            </div>
            
            <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <p className={`text-xl font-bold ${isDark ? 'bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent' : 'text-emerald-600'}`}>
                {formatPrice(car.price)}
              </p>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isDark 
                  ? 'bg-white/5 group-hover:bg-emerald-500' 
                  : 'bg-gray-100 group-hover:bg-emerald-500 group-hover:text-white'
              }`}>
                <ArrowUpRight className={`w-5 h-5 ${isDark ? 'text-white' : ''}`} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}