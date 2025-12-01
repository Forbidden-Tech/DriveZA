import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Loader2, LayoutGrid, List, X, Search } from 'lucide-react';
import CarCard from '@/components/cars/CarCard';
import CarFilters from '@/components/cars/CarFilters';
import { motion } from 'framer-motion';

export default function Browse() {
  const urlParams = new URLSearchParams(window.location.search);

  const [filters, setFilters] = useState({
    make: urlParams.get('make') || '',
    model: urlParams.get('model') || '',
    minPrice: parseInt(urlParams.get('minPrice') || '0') || 0,
    maxPrice: parseInt(urlParams.get('maxPrice') || '2000000') || 2000000,
    yearFrom: null as number | null,
    yearTo: null as number | null,
    bodyType: urlParams.get('bodyType') || '',
    transmission: '',
    fuelType: '',
    province: ''
  });

  const [sortBy, setSortBy] = useState('-created_date');
  const [viewMode, setViewMode] = useState('grid');

  const { data: cars = [], isLoading } = useQuery({
    queryKey: ['cars', 'browse'],
    queryFn: () => base44.entities.Car.filter({ status: 'approved' }, '-created_date', 100)
  });

  const filteredCars = cars.filter(car => {
    if (filters.make && filters.make !== 'all' && car.make !== filters.make) return false;
    if (filters.model && !car.model?.toLowerCase().includes(filters.model.toLowerCase())) return false;
    if (car.price < filters.minPrice || car.price > filters.maxPrice) return false;
    if (filters.yearFrom && car.year < filters.yearFrom) return false;
    if (filters.yearTo && car.year > filters.yearTo) return false;
    if (filters.bodyType && filters.bodyType !== 'all' && car.body_type !== filters.bodyType) return false;
    if (filters.transmission && filters.transmission !== 'all' && car.transmission !== filters.transmission) return false;
    if (filters.fuelType && filters.fuelType !== 'all' && car.fuel_type !== filters.fuelType) return false;
    if (filters.province && filters.province !== 'all' && car.province !== filters.province) return false;
    return true;
  });

  const sortedCars = [...filteredCars].sort((a, b) => {
    switch (sortBy) {
      case '-created_date': return (b as any).created_date ? new Date((b as any).created_date).getTime() - new Date((a as any).created_date).getTime() : 0;
      case 'price': return a.price - b.price;
      case '-price': return b.price - a.price;
      case '-year': return b.year - a.year;
      case 'mileage': return a.mileage - b.mileage;
      default: return 0;
    }
  });

  const resetFilters = () => {
    setFilters({
      make: '', model: '', minPrice: 0, maxPrice: 2000000,
      yearFrom: null, yearTo: null, bodyType: '',
      transmission: '', fuelType: '', province: ''
    });
  };

  const activeFiltersCount = [
    filters.make && filters.make !== 'all',
    filters.model,
    filters.minPrice > 0 || filters.maxPrice < 2000000,
    filters.bodyType && filters.bodyType !== 'all',
    filters.transmission && filters.transmission !== 'all',
    filters.fuelType && filters.fuelType !== 'all',
    filters.province && filters.province !== 'all',
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-[#0a0a0a] pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold text-white mb-2">Browse Cars</h1>
            <p className="text-gray-400">
              {isLoading ? 'Loading...' : `${sortedCars.length} vehicles found`}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-3xl shadow-xl p-6 sticky top-28">
              <CarFilters
                filters={filters}
                setFilters={setFilters}
                onReset={resetFilters}
              />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 pb-12">
            {/* Toolbar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm"
            >
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-900">{sortedCars.length}</span> results
                </span>

                {activeFiltersCount > 0 && (
                  <Badge
                    variant="secondary"
                    className="bg-emerald-100 text-emerald-600 hover:bg-emerald-200 cursor-pointer"
                    onClick={resetFilters}
                  >
                    {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-gray-50 border-0">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="-created_date">Newest First</SelectItem>
                    <SelectItem value="price">Price: Low to High</SelectItem>
                    <SelectItem value="-price">Price: High to Low</SelectItem>
                    <SelectItem value="-year">Year: Newest</SelectItem>
                    <SelectItem value="mileage">Mileage: Lowest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="hidden sm:flex border rounded-xl overflow-hidden bg-gray-50">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Car Grid */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mx-auto mb-4" />
                  <p className="text-gray-500">Loading vehicles...</p>
                </div>
              </div>
            ) : sortedCars.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {sortedCars.map((car, index) => (
                  <CarCard key={car.id} car={car} index={index} />
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-white rounded-3xl shadow-sm"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No cars found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters to see more results</p>
                <Button onClick={resetFilters} className="bg-emerald-500 hover:bg-emerald-600">
                  Reset All Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
