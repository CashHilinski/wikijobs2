"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariant, staggerContainerVariant } from '@/hooks/useScrollAnimation';

const StatsSection: FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainerVariant}
      className="relative py-32 bg-white"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:150px_150px]"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          variants={fadeInUpVariant}
          className="text-4xl font-medium text-center mb-24 text-black tracking-tight"
        >
          Your path back to professional success
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { 
              number: "01",
              title: "Skills Assessment", 
              desc: "Evaluate your existing skills and identify areas for refreshing your expertise" 
            },
            { 
              number: "02",
              title: "Market Alignment", 
              desc: "Match your experience with current market demands and opportunities" 
            },
            { 
              number: "03",
              title: "Return Strategy", 
              desc: "Create a personalized plan for your successful return to the workforce" 
            }
          ].map(({ number, title, desc }) => (
            <motion.div
              key={title}
              variants={fadeInUpVariant}
              className="group relative"
            >
              <div className="absolute -top-10 left-0 text-black/30 text-5xl font-medium tracking-tight">
                {number}
              </div>
              <h3 className="text-2xl font-semibold text-black mb-4 tracking-tight">{title}</h3>
              <p className="text-black/75 text-lg font-normal tracking-wide leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection; 