import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Car } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-24 bg-[#f8f9fa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Sell Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[32px] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[32px] p-10 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  Sell Your Car<br />in 24 Hours
                </h3>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  Get an instant AI valuation and connect with serious buyers.
                  No listing fees, no hassle.
                </p>

                <Link to={createPageUrl('SellCar')}>
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold group/btn">
                    Get Free Valuation
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Browse Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[32px] blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 rounded-[32px] p-10 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center mb-6">
                  <Car className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-3xl font-bold text-white mb-4">
                  Find Your<br />Dream Ride
                </h3>
                <p className="text-white/80 mb-8 text-lg leading-relaxed">
                  Browse thousands of verified vehicles. Filter by make, model,
                  price, and more.
                </p>

                <Link to={createPageUrl('Browse')}>
                  <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 font-semibold group/btn">
                    Browse Cars
                    <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
