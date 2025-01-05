"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUpVariant, staggerContainerVariant } from '@/hooks/useScrollAnimation';
import Link from 'next/link';

const CourseSection: FC = () => {
  const { ref, controls } = useScrollAnimation();

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainerVariant}
      className="relative py-24 bg-[#0a0a0a]"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUpVariant} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Tailored Return Programs
          </h2>
          <div className="h-px w-24 bg-white/20 mx-auto mb-8"></div>
          <p className="text-white/70 mt-4 text-lg max-w-2xl mx-auto">
            Customized pathways designed for professionals returning to work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Skill Refresh",
              desc: "Update your technical skills and stay current with industry trends",
              link: "/assessment"
            },
            {
              title: "Confidence Building",
              desc: "Workshops and mentoring to rebuild your professional confidence",
              link: "/learning"
            },
            {
              title: "Return Strategy",
              desc: "Personalized guidance for your transition back to work",
              link: "/progress"
            }
          ].map(({ title, desc, link }) => (
            <motion.div
              key={title}
              variants={fadeInUpVariant}
              className="group p-8 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
              <p className="text-white/60 mb-6">{desc}</p>
              <Link 
                href={link}
                className="inline-flex items-center text-white/70 hover:text-white group-hover:translate-x-1 transition-all duration-300"
              >
                Learn More 
                <span className="ml-2">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default CourseSection; 