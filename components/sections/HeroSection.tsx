"use client";

import { FC } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { backgroundVariant } from '@/hooks/useScrollAnimation';
import dynamic from 'next/dynamic';

// Dynamically import DemoVideo with no SSR
const DemoVideo = dynamic(() => import('@/components/DemoVideo'), {
  ssr: false,
  loading: () => (
    <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-white/5" />
  ),
});

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0a0a0a]">
    <motion.div
      variants={backgroundVariant}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent"
    />
    <motion.div
      variants={backgroundVariant}
      initial="hidden"
      animate="visible"
      className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:150px_150px]"
    />
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
      <div className="text-center">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="text-6xl md:text-8xl font-semibold mb-8 text-white tracking-tight"
        >
          Reentry for<br />
          Career Gaps
        </motion.h1>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="text-xl md:text-2xl mb-16 text-white/70 max-w-3xl mx-auto font-light tracking-wide"
        >
          Your career break is your strength. Get matched with fair-chance employers, receive personalized upskilling plans, and return to work with confidence.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16"
        >
          <DemoVideo />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link 
            href="/find-jobs"
            className="group relative inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-white/90 transition-all duration-300"
          >
            <span>Find Your Match</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
          <Link 
            href="/about"
            className="group relative inline-flex items-center gap-3 text-white/90 hover:text-white px-8 py-4 text-lg font-light tracking-wide transition-all duration-300"
          >
            <span>Learn More</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </motion.div>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"
    />
  </section>
);

export default HeroSection; 