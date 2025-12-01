import { Shield, Zap, HeartHandshake, Banknote, Sparkles, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: Shield,
    title: 'Verified & Trusted',
    description: 'Every listing goes through our rigorous verification process. What you see is what you get.',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'List your car in under 5 minutes. Our AI fills in the details, you just approve.',
    gradient: 'from-amber-500 to-orange-500'
  },
  {
    icon: HeartHandshake,
    title: 'Fair Pricing',
    description: 'Our market analysis ensures you get the best deal, whether buying or selling.',
    gradient: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Banknote,
    title: 'Secure Payments',
    description: 'Protected transactions with escrow service. Your money is safe with us.',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Sparkles,
    title: 'AI Matching',
    description: 'Our smart algorithm finds you the perfect car based on your preferences.',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Our team is always here to help. Chat, call, or email anytime.',
    gradient: 'from-teal-500 to-cyan-500'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Why DriveZA?</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're not just another car marketplace. We're building the future of automotive commerce in South Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/5 hover:border-white/20 transition-all duration-500">
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
