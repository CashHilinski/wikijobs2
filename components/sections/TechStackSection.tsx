"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariant, staggerContainerVariant } from '@/hooks/useScrollAnimation';

const TechStackSection: FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainerVariant}
      className="relative py-24 bg-white"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          variants={fadeInUpVariant}
          className="text-4xl font-bold text-center mb-4 text-black/90"
        >
          In-Demand Technologies
        </motion.h2>
        <motion.div className="h-px w-24 bg-black/20 mx-auto mb-8"></motion.div>
        <motion.p 
          variants={fadeInUpVariant}
          className="text-center text-black/60 mb-16 text-lg max-w-2xl mx-auto"
        >
          Market analysis of the most sought-after technical skills
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: "Cloud Architecture", trend: "+45%" },
            { name: "AI Development", trend: "+62%" },
            { name: "Data Engineering", trend: "+38%" },
            { name: "DevOps", trend: "+41%" },
            { name: "Cybersecurity", trend: "+55%" },
            { name: "Machine Learning", trend: "+48%" },
            { name: "Full-Stack Dev", trend: "+35%" },
            { name: "Product Design", trend: "+32%" }
          ].map(({ name, trend }) => (
            <motion.div
              key={name}
              variants={fadeInUpVariant}
              className="group p-6 rounded-xl bg-black/[0.02] hover:bg-black/[0.04] transition-all duration-300"
            >
              <div className="flex flex-col items-start">
                <p className="text-black/90 font-medium mb-2">{name}</p>
                <span className="text-green-600 text-sm font-medium">{trend}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechStackSection; 