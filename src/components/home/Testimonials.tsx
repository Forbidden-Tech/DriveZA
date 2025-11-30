import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Sarah Johnson',
    location: 'Cape Town',
    rating: 5,
    text: 'Found my dream car in just 2 days! The process was so smooth and the seller was verified. Highly recommend DriveZA.',
    car: '2020 BMW 3 Series',
  },
  {
    name: 'Michael Chen',
    location: 'Johannesburg',
    rating: 5,
    text: 'Sold my car within 24 hours. The platform is intuitive and the support team was incredibly helpful throughout.',
    car: '2018 Toyota Corolla',
  },
  {
    name: 'Priya Patel',
    location: 'Durban',
    rating: 5,
    text: 'Best car marketplace in South Africa! The AI matching helped me find exactly what I was looking for.',
    car: '2021 Volkswagen Polo',
  },
  {
    name: 'David Williams',
    location: 'Pretoria',
    rating: 5,
    text: 'As a dealer, this platform has been a game-changer. More qualified leads and faster sales.',
    car: '2019 Mercedes-Benz C-Class',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[128px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">What Our Customers Say</h2>
          <p className="text-gray-400 text-lg">Real stories from real people</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 hover:border-emerald-500/30 transition-all duration-500"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-emerald-500/20" />
              
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Purchased</p>
                  <p className="text-sm font-medium text-emerald-400">{testimonial.car}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

