import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

const MAKES = [
  "Toyota", "Volkswagen", "Ford", "BMW", "Mercedes-Benz", "Audi", "Honda", 
  "Nissan", "Hyundai", "Kia", "Mazda", "Suzuki", "Renault", "Chevrolet",
  "Jeep", "Land Rover", "Porsche", "Volvo", "Isuzu", "Mitsubishi"
];

const PROVINCES = [
  "Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State",
  "Limpopo", "Mpumalanga", "North West", "Northern Cape"
];

const BODY_TYPES = [
  "Sedan", "Hatchback", "SUV", "Bakkie", "Coupe", "Convertible", 
  "Station Wagon", "Van", "Crossover"
];

interface FilterState {
  make: string;
  model: string;
  minPrice: number;
  maxPrice: number;
  yearFrom: number | null;
  yearTo: number | null;
  bodyType: string;
  transmission: string;
  fuelType: string;
  province: string;
}

interface CarFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState | ((prev: FilterState) => FilterState)) => void;
  onReset: () => void;
}

export default function CarFilters({ filters, setFilters, onReset }: CarFiltersProps) {
  const formatPrice = (val: number) => `R${(val / 1000).toFixed(0)}k`;
  
  const FilterContent = () => (
    <div className="space-y-6">
      {/* Make */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Make</Label>
          <Select value={filters.make || ''} onValueChange={(val: string) => setFilters({...filters, make: val})}>
          <SelectTrigger className="bg-gray-50 border-0 rounded-xl h-11">
            <SelectValue placeholder="All Makes" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Makes</SelectItem>
            {MAKES.map(make => (
              <SelectItem key={make} value={make}>{make}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Model */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Model</Label>
        <Input 
          placeholder="Any Model"
          value={filters.model || ''}
          onChange={(e) => setFilters({...filters, model: e.target.value})}
          className="bg-gray-50 border-0 rounded-xl h-11"
        />
      </div>
      
      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium text-gray-700">Price Range</Label>
          <span className="text-sm text-emerald-600 font-medium">
            {formatPrice(filters.minPrice || 0)} - {formatPrice(filters.maxPrice || 2000000)}
          </span>
        </div>
        <div className="px-2">
          <Slider
            value={[filters.minPrice || 0, filters.maxPrice || 2000000]}
            min={0}
            max={2000000}
            step={25000}
            onValueChange={([min, max]: number[]) => setFilters({...filters, minPrice: min, maxPrice: max})}
            className="[&_[role=slider]]:bg-emerald-500 [&_[role=slider]]:border-emerald-500 [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
          />
        </div>
      </div>
      
      {/* Year Range */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Year From</Label>
          <Select value={filters.yearFrom?.toString() || ''} onValueChange={(val: string) => setFilters({...filters, yearFrom: val === 'any' ? null : parseInt(val)})}>
            <SelectTrigger className="bg-gray-50 border-0 rounded-xl h-11">
              <SelectValue placeholder="From" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Year To</Label>
          <Select value={filters.yearTo?.toString() || ''} onValueChange={(val: string) => setFilters({...filters, yearTo: val === 'any' ? null : parseInt(val)})}>
            <SelectTrigger className="bg-gray-50 border-0 rounded-xl h-11">
              <SelectValue placeholder="To" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any</SelectItem>
              {Array.from({length: 25}, (_, i) => 2024 - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Body Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Body Type</Label>
        <Select value={filters.bodyType || ''} onValueChange={(val: string) => setFilters({...filters, bodyType: val})}>
          <SelectTrigger className="bg-gray-50 border-0 rounded-xl h-11">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {BODY_TYPES.map(type => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Transmission */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Transmission</Label>
        <Select value={filters.transmission || ''} onValueChange={(val: string) => setFilters({...filters, transmission: val})}>
          <SelectTrigger className="bg-gray-50 border-0 rounded-xl h-11">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Automatic">Automatic</SelectItem>
            <SelectItem value="Manual">Manual</SelectItem>
            <SelectItem value="Semi-Automatic">Semi-Automatic</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Fuel Type */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Fuel Type</Label>
        <Select value={filters.fuelType || ''} onValueChange={(val: string) => setFilters({...filters, fuelType: val})}>
          <SelectTrigger className="bg-gray-50 border-0 rounded-xl h-11">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="Petrol">Petrol</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Province */}
      <div className="space-y-2">
        <Label className="text-sm font-medium text-gray-700">Province</Label>
        <Select value={filters.province || ''} onValueChange={(val: string) => setFilters({...filters, province: val})}>
          <SelectTrigger className="bg-gray-50 border-0 rounded-xl h-11">
            <SelectValue placeholder="All Provinces" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Provinces</SelectItem>
            {PROVINCES.map(prov => (
              <SelectItem key={prov} value={prov}>{prov}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Reset Button */}
      <Button 
        variant="outline" 
        className="w-full mt-4 rounded-xl border-gray-200 hover:bg-gray-50"
        onClick={onReset}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Reset Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
          <Button variant="ghost" size="sm" onClick={onReset} className="text-gray-500 hover:text-gray-700">
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
        <FilterContent />
      </div>
      
      {/* Mobile Filter Sheet */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full rounded-xl">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}