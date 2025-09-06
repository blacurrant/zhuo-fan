'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy } from 'lucide-react';

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const [showCopied, setShowCopied] = useState(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('nishantchoudhary.dev@gmail.com');
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-fit overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300 pt-32"
    >
      <motion.div style={{ opacity: fade }} className="h-full w-full">
        {/* Hero Section */}
        <main className="flex-1 px-4 sm:px-8 py-4 w-full">
          <div className="container mx-auto ">
            {/* Main Content Area */}
            <div className="relative w-full">
              {/* Profile Image - Top right on desktop, top left on mobile */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-0 right-0 md:block hidden z-10"
              >
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-lg">
                  <Image
                    src="/pfp.jpg"
                    alt="Profile"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Mobile Profile Image - Top Left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:hidden mb-8"
              >
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden shadow-lg">
                  <Image
                    src="/pfp.jpg"
                    alt="Profile"
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Large Name Typography */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="w-full overflow-hidden"
              >
                <motion.h1
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="uppercase text-6xl font-bold md:font-medium md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] text-gray-900 dark:text-white leading-none tracking-tight text-balance break-words"
                >
                  Nishant
                </motion.h1>
                <motion.h1
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="py-2 md:py-0 uppercase text-6xl font-bold md:font-medium md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[12rem] text-gray-900 dark:text-white leading-none tracking-tight text-balance break-words"
                >
                  Choudhary
                </motion.h1>
              </motion.div>

              {/* Bottom Section - Email and Description */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0 mt-16 w-full"
              >
                {/* Email */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  onClick={copyEmailToClipboard}
                  className="cursor-pointer flex items-center space-x-2 text-black dark:text-gray-400 w-full min-w-0"
                >
                  <span className="text-base sm:text-lg font-medium truncate">nishantchoudhary.dev@gmail.com</span>
                  <Copy size={16} className="flex-shrink-0" />
                </motion.div>

                {/* Description */}
                <div className='w-full flex flex-col items-end'>
                  <p className="w-full text-2xl text-black font-light md:font-medium dark:text-gray-300 leading-tight tracking-tight">
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>                    
                    Hello,  I'm a Developer/Designer who loves the idea of creating and has been doing so for over 2 years professionally,  based in India,  working remote;;
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Copy Notification */}
        {showCopied && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            Email copied to clipboard!
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default HeroSection;