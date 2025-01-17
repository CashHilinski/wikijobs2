"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Create Your Profile',
    description: 'Enter your background information, skills, education, and career break details to help us understand your journey.',
  },
  {
    number: '02',
    title: 'Get Matched',
    description: 'Our AI analyzes your profile and matches you with relevant opportunities from our extensive job catalog.',
  },
  {
    number: '03',
    title: 'Receive Your Plan',
    description: 'Get a personalized timeline with recommended upskilling activities and resources to prepare for your target roles.',
  },
  {
    number: '04',
    title: 'Access Fair-Chance Network',
    description: 'Eligible candidates are added to our exclusive database of partner companies committed to fair-chance employment.',
  },
  {
    number: '05',
    title: 'Tell Your Story',
    description: 'Receive a professionally formatted PDF that validates your career gap experience and highlights your unique journey.',
  }
];

const TimelineSection: FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4"
          >
            Your Journey Back
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            A clear path to restart your career with confidence
          </motion.p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 border-4 border-blue-600" />

                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} pl-12`}>
                  <div className="relative p-6 rounded-2xl bg-white shadow-sm border border-gray-200">
                    <div className="absolute -inset-px bg-gradient-to-b from-gray-50 to-transparent rounded-2xl pointer-events-none" />
                    <div className="relative">
                      <div className="text-sm font-medium text-gray-500 mb-1">
                        Step {step.number}
                      </div>
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-500 text-sm">
            Each step is designed to maximize your chances of successful career reentry
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineSection; 