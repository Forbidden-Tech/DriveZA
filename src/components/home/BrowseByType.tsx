import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';

const bodyTypes = [
  {
    name: 'SUV',
    icon: '🚙',
    gradient: 'from-emerald-500 to-teal-600',
    count: '2,340'
  },
  {
    name: 'Sedan',
    icon: '🚗',
    gradient: 'from-blue-500 to-cyan-500',
    count: '3,120'
  },
  {
    name: 'Hatchback',
    icon: '🚘',
    gradient: 'from-emerald-500 to-teal-500',
    count: '1,850'
  },
  {
    name: 'Bakkie',
    icon: '🛻',
    gradient: 'from-orange-500 to-amber-500',
    count: '1,560'
  },
  {
    name: 'Coupe',
    icon: '🏎️',
    gradient: 'from-pink-500 to-rose-500',
    count: '890'
  },
  {
    name: 'Crossover',
    icon: '🚐',
    gradient: 'from-teal-500 to-cyan-500',
    count: '1,230'
  }
];

export default function BrowseByType() {
  return (
    <section className="py-24 bg-[#f8f9fa]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Style</h2>
          <p className="text-gray-600 text-lg">Find the perfect body type for your lifestyle</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {bodyTypes.map((type, index) => (
            <motion.div
              key={type.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={createPageUrl(`Browse?bodyType=${type.name}`)}
                className="group block"
              >
                <div className="relative bg-white rounded-3xl p-6 text-center hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${type.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {type.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-white transition-colors mb-1">
                      {type.name}
                    </h3>
                    <p className="text-sm text-gray-500 group-hover:text-white/70 transition-colors">
                      {type.count} cars
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
