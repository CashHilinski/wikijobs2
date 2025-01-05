"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';

const partners = [
  { name: 'MIT', logo: '/partners/mit-logo.svg' },
  { name: 'College Board', logo: '/partners/college-board-logo.svg' },
  { name: 'Harvard', logo: '/partners/harvard-logo.svg' },
  { name: 'Stanford', logo: '/partners/stanford-logo.svg' },
  { name: 'Oxford', logo: '/partners/oxford-logo.svg' },
  { name: 'Cambridge', logo: '/partners/cambridge-logo.svg' },
  { name: 'YIP', logo: '/partners/yip-logo.svg' },
  { name: 'Perrin Center', logo: '/partners/perrin-logo.svg' },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const PartnersSection: FC = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-semibold text-white mb-4"
          >
            Cross-Sector Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Backed by leading institutions committed to fair-chance employment and career reentry
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={item}
              className="flex items-center justify-center"
            >
              <div className="relative w-full aspect-[3/2] filter grayscale hover:grayscale-0 transition-all duration-300">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="w-full h-full object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-sm">
            And many more fair-chance employers from our 10M+ job catalog
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection; 