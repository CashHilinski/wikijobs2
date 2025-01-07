"use client";

import { FC } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const partners = [
  {
    name: 'Harvard University',
    logo: '/logos/harvard-logo.png',
    url: 'https://www.harvard.edu'
  },
  {
    name: 'Google for Nonprofits',
    logo: '/logos/google-nonprofits-logo.png',
    url: 'https://www.google.com/nonprofits'
  },
  {
    name: 'Oliver Wyman',
    logo: '/logos/oliver-wyman-logo.png',
    url: 'https://www.oliverwyman.com'
  },
  {
    name: 'University of Oxford',
    logo: '/logos/oxford-logo.png',
    url: 'https://www.ox.ac.uk'
  },
  {
    name: 'Activote',
    logo: '/logos/activote-logo.png',
    url: 'https://www.activote.net'
  },
  {
    name: 'Stanford University',
    logo: '/logos/stanford-logo.png',
    url: 'https://www.stanford.edu'
  },
  {
    name: 'Charity Navigator',
    logo: '/logos/charity-navigator-logo.png',
    url: 'https://www.charitynavigator.org'
  },
  {
    name: 'MIT Innovation',
    logo: '/logos/mit-innovation-logo.png',
    url: 'https://innovation.mit.edu'
  },
  {
    name: 'JSA Be The People',
    logo: '/logos/jsa-logo.png',
    url: 'https://www.jsa.org'
  },
  {
    name: 'University of Pennsylvania',
    logo: '/logos/upenn-logo.png',
    url: 'https://www.upenn.edu'
  },
  {
    name: 'CIVxNow',
    logo: '/logos/civxnow-logo.png',
    url: 'https://www.civxnow.org'
  },
  {
    name: 'Asian American Forward',
    logo: '/logos/aaf-logo.webp',
    url: 'https://www.asianamericanforward.org'
  },
  {
    name: 'Brown University',
    logo: '/logos/brown-logo.png',
    url: 'https://www.brown.edu'
  },
  {
    name: 'University of Cambridge',
    logo: '/logos/cambridge-logo.png',
    url: 'https://www.cam.ac.uk'
  },
  {
    name: 'College Board',
    logo: '/logos/collegeboard-logo.png',
    url: 'https://www.collegeboard.org'
  }
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
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4"
          >
            Cross-Sector Partners
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Backed by leading institutions committed to fair-chance employment and career reentry
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-12"
        >
          {partners.map((partner) => (
            <motion.div
              key={partner.name}
              variants={item}
              className="flex items-center justify-center h-32"
            >
              <a
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center w-full h-full transform transition-transform duration-200 hover:-translate-y-1"
              >
                <div className={`relative w-[220px] h-[100px] ${
                  partner.name === 'University of Oxford' ? 'scale-150' : 
                  partner.name === 'University of Cambridge' || partner.name === 'Brown University' ? 'scale-125' : 
                  ''
                }`}>
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    fill
                    className="opacity-100 group-hover:opacity-100 transition-all duration-200 filter brightness-100"
                    style={{ 
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: '100%'
                    }}
                    sizes="(max-width: 768px) 180px, 220px"
                  />
                </div>
              </a>
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
          <p className="text-gray-500 text-sm">
            And many more fair-chance employers from our 10M+ job catalog
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection; 