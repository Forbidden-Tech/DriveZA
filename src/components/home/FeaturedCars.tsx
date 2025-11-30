import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2, Gauge, Fuel, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  variant?: string;
  price: number;
  mileage: number;
  fuel_type: string;
  body_type: string;
  province?: string;
  images?: string[];
  featured?: boolean;
}

interface FeaturedCarsProps {
  cars: Car[];
  isLoading: boolean;
}

export default function FeaturedCars({ cars, isLoading }: FeaturedCarsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: 'ZAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12"
        >
          <div>
            <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 mb-4">
              Hot Deals
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-2">Featured Vehicles</h2>
            <p className="text-gray-500">Handpicked gems from our collection</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
          </div>
        ) : cars.length > 0 ? (
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[350px] snap-start"
              >
                <Link to={createPageUrl(`CarDetails?id=${car.id}`)}>
                  <div className="group relative bg-gradient-to-b from-white/5 to-transparent rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all duration-500">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={car.images?.[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600'}
                        alt={`${car.year} ${car.make} ${car.model}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                      
                      {car.featured && (
                        <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full text-white text-xs font-medium">
                          Featured
                        </div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-6 -mt-16 relative">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500">{car.year}</span>
                        <span className="text-gray-700">•</span>
                        <span className="text-xs text-gray-500">{car.body_type}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-1">
                        {car.make} {car.model}
                      </h3>
                      {car.variant && (
                        <p className="text-sm text-gray-500 mb-4">{car.variant}</p>
                      )}
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Gauge className="w-4 h-4" />
                          <span>{(car.mileage / 1000).toFixed(0)}k km</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <Fuel className="w-4 h-4" />
                          <span>{car.fuel_type}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{car.province}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                          {formatPrice(car.price)}
                        </p>
                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10">
            <p className="text-gray-500 mb-4">No featured cars available yet</p>
            <Link to={createPageUrl('SellCar')}>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500">
                List Your Car
              </Button>
            </Link>
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to={createPageUrl('Browse')}>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 group">
              View All Vehicles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}