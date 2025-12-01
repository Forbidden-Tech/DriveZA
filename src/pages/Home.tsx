import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import HeroSearch from '@/components/home/HeroSearch';
import FeaturedCars from '@/components/home/FeaturedCars';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import BrowseByType from '@/components/home/BrowseByType';
import CTASection from '@/components/home/CTASection';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  const { data: featuredCars = [], isLoading } = useQuery({
    queryKey: ['featuredCars'],
    queryFn: async () => {
      const cars = await base44.entities.Car.filter({ status: 'approved', featured: true }, '-created_date', 8);
      if (cars.length < 8) {
        const moreCars = await base44.entities.Car.filter({ status: 'approved' }, '-created_date', 8 - cars.length);
        return [...cars, ...moreCars];
      }
      return cars;
    }
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <HeroSearch />
      <FeaturedCars cars={featuredCars} isLoading={isLoading} />
      <BrowseByType />
      <WhyChooseUs />
      <Testimonials />
      <CTASection />
    </div>
  );
}