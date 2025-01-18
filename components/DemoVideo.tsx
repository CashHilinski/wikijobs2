"use client";

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DemoVideo: FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Add a slight delay before showing the video to ensure loading state is visible
    const timer = setTimeout(() => setShowVideo(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
  };

  if (!isMounted) {
    return (
      <div className="aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-gray-100" />
    );
  }

  return (
    <>
      <motion.div
        onClick={handleZoomToggle}
        className={`relative cursor-pointer overflow-hidden rounded-2xl ${
          isZoomed ? 'fixed inset-0 z-50' : 'aspect-video w-full max-w-4xl mx-auto'
        }`}
        layout
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"
          initial={false}
          animate={{ opacity: isZoomed ? 0 : 1 }}
        />
        
        <motion.div
          className="w-full h-full relative"
          initial={false}
          animate={{
            scale: isZoomed ? 1 : 0.99,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30
          }}
        >
          <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 transition-opacity duration-500 ${!isLoading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-600 font-medium"
              >
                Loading video...
              </motion.div>
            </div>
          </div>

          {showVideo && (
            <iframe
              className="w-full h-full"
              src="https://player.vimeo.com/video/1048057062?autoplay=1&loop=1&background=1&muted=1&h=734d834f21"
              title="WikiJobs Demo"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              onLoad={() => setIsLoading(false)}
            />
          )}
        </motion.div>

        {isZoomed && (
          <motion.button
            className="absolute top-4 right-4 z-30 text-white/70 hover:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              handleZoomToggle();
            }}
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleZoomToggle}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default DemoVideo;