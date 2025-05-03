'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

function LoadingPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <div className="relative flex flex-col items-center gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0.8, 1, 0.8], // Opacity pulse
            scale: [1, 1.05, 1], // Gentle scale pulse
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/vertical-logo.png"
            alt="Loading"
            width={300}
            height={300}
            className="object-contain "
            priority
          />
        </motion.div>

        {/* Animated loading line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-32 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full"
        />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default LoadingPage;
