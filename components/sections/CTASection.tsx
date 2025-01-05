"use client";

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariant } from '@/hooks/useScrollAnimation';

const CTASection: FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      className="relative py-32 bg-[#0a0a0a] overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:150px_150px]"></div>

      <motion.div 
        variants={fadeInUpVariant}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="flex flex-col gap-2 mb-8"
            >
              <span className="text-2xl font-light tracking-wide text-white/40">
                Ready to return stronger?
              </span>
              <div className="h-px w-12 bg-white/10 mx-auto"></div>
            </motion.div>

            <motion.div 
              variants={fadeInUpVariant}
              className="space-y-6 mb-16"
            >
              <h2 className="text-6xl md:text-7xl font-semibold text-white tracking-tight leading-tight">
                Your comeback<br />
                starts here.
              </h2>
              <p className="text-xl text-white/60 font-light tracking-wide max-w-xl mx-auto">
                Whether you've taken a break for family, health, or personal growth, our AI creates your personalized path back to professional success.
              </p>
            </motion.div>

            <motion.div 
              variants={fadeInUpVariant}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                href="/get-started"
                className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300"
              >
                <span>Start Your Return</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                href="/success-stories"
                className="group relative inline-flex items-center gap-3 text-white/80 hover:text-white px-8 py-4 text-lg font-light tracking-wide transition-all duration-300"
              >
                <span>See Success Stories</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { 
                number: "94%", 
                label: "Return Success", 
                desc: "Of our users successfully return to their careers"
              },
              { 
                number: "45 Days", 
                label: "Average Time", 
                desc: "From program start to job placement"
              },
              { 
                number: "86%", 
                label: "Skill Match", 
                desc: "Find roles aligned with their experience and goals"
              }
            ].map(({ number, label, desc }) => (
              <motion.div
                key={label}
                variants={fadeInUpVariant}
                className="group text-center"
              >
                <div className="text-5xl font-medium text-white mb-2 tracking-tight">{number}</div>
                <p className="text-lg font-medium text-white/80 mb-2 tracking-tight">{label}</p>
                <p className="text-sm text-white/60 font-light tracking-wide">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"
      />
    </motion.section>
  );
};

export default CTASection; 