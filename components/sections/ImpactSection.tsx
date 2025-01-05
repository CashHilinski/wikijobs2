"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';

const metrics = [
  {
    label: 'Jobs Available',
    value: '10M+',
    description: 'Open positions from our global catalog'
  },
  {
    label: 'Monthly Users',
    value: '1.5M+',
    description: 'Active job seekers using our platform'
  },
  {
    label: 'Success Stories',
    value: '10k+',
    description: 'Career returners placed in new roles'
  },
  {
    label: 'Partner Companies',
    value: '500+',
    description: 'Fair-chance employers in our network'
  }
];

const ImpactSection: FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-[#0a0a0a] relative overflow-hidden">
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
            Our Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            Transforming career gaps into opportunities for millions
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="relative p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/5"
            >
              <div className="absolute -inset-px bg-gradient-to-b from-white/[0.08] to-transparent rounded-2xl pointer-events-none" />
              <div className="relative">
                <div className="text-4xl font-bold text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-lg font-medium text-white/90 mb-2">
                  {metric.label}
                </div>
                <div className="text-sm text-white/60">
                  {metric.description}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-sm">
            Data updated in real-time from our global job matching system
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection; 