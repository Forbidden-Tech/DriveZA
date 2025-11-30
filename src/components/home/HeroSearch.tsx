import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const MAKES = [
  "Toyota", "Volkswagen", "Ford", "BMW", "Mercedes-Benz", "Audi", "Honda", 
  "Nissan", "Hyundai", "Kia", "Mazda", "Suzuki", "Renault"
];

export default function HeroSearch() {
  const [searchType, setSearchType] = useState('buy');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const buildSearchUrl = () => {
    const params = new URLSearchParams();
    if (make && make !== 'all') params.set('make', make);
    if (model) params.set('model', model);
    if (maxPrice) params.set('maxPrice', maxPrice);
    return createPageUrl('Browse') + (params.toString() ? `?${params.toString()}` : '');
  };

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 via-transparent to-teal-500/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/30 rounded-full blur-[128px] animate-pulse delay-1000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-8"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-gray-300">AI-Powered Car Matching</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-xs rounded-full">New</span>
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              The Future of
              <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Car Shopping
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Discover your perfect ride with South Africa's most intelligent car marketplace. 
              No hassle, no haggling, just great deals.
            </p>
          </motion.div>
          
          {/* Search Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-20" />
            <div className="relative bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10">
              {/* Tabs */}
              <Tabs value={searchType} onValueChange={setSearchType} className="mb-6">
                <TabsList className="bg-white/5 border border-white/10 p-1">
                  <TabsTrigger 
                    value="buy" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white text-gray-400"
                  >
                    Buy a Car
                  </TabsTrigger>
                  <TabsTrigger 
                    value="sell"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white text-gray-400"
                  >
                    Sell Your Car
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              {searchType === 'buy' ? (
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <Select value={make} onValueChange={setMake}>
                    <SelectTrigger className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500">
                      <SelectValue placeholder="Any Make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Make</SelectItem>
                      {MAKES.map(m => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input 
                    placeholder="Model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="h-14 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
                  />
                  
                  <Select value={maxPrice} onValueChange={setMaxPrice}>
                    <SelectTrigger className="h-14 bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Max Price" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Price</SelectItem>
                      <SelectItem value="100000">Up to R100,000</SelectItem>
                      <SelectItem value="250000">Up to R250,000</SelectItem>
                      <SelectItem value="500000">Up to R500,000</SelectItem>
                      <SelectItem value="750000">Up to R750,000</SelectItem>
                      <SelectItem value="1000000">Up to R1,000,000</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Link to={buildSearchUrl()}>
                    <Button className="w-full h-14 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg border-0">
                      <Search className="w-5 h-5 mr-2" />
                      Search
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-400 mb-4">Get an instant valuation for your car</p>
                  <Link to={createPageUrl('SellCar')}>
                    <Button className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold text-lg">
                      Get Your Free Valuation
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
          
          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: TrendingUp, label: '10,000+', sub: 'Cars Listed', color: 'text-emerald-400' },
              { icon: Shield, label: '100%', sub: 'Verified Sellers', color: 'text-emerald-400' },
              { icon: Zap, label: '24hrs', sub: 'Average Sale Time', color: 'text-teal-400' },
              { icon: Sparkles, label: 'R0', sub: 'Listing Fee', color: 'text-amber-400' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-white">{stat.label}</p>
                <p className="text-sm text-gray-500">{stat.sub}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/40 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}