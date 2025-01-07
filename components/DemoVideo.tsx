"use client";

import { FC, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DemoVideo: FC = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed);
    if (videoRef.current) {
      if (!isZoomed) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

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
        
        <motion.video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/wikijobs_demovideo.mp4"
          loop
          muted
          playsInline
          initial={false}
          animate={{
            scale: isZoomed ? 1 : 0.99,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 30
          }}
        />

        {!isZoomed && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-full p-4">
              <svg
                className="w-8 h-8 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
              </svg>
            </div>
          </motion.div>
        )}

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