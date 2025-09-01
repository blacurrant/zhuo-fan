'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
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
    <motion.div
      // style={{ y, opacity }}
      className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 pt-20"
    >
      {/* Hero Section */}
      <main className="flex-1 px-6 py-4">
        <div className="container mx-auto">
          {/* Main Content Area */}
          <div className="relative">
            {/* Profile Image - Positioned absolutely in top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-0 right-0 hidden md:block"
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

            {/* Large Name Typography */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mb-16"
            >
              <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="uppercase text-6xl font-semibold md:font-medium md:text-8xl lg:text-9xl xl:text-[12rem] text-gray-900 dark:text-white leading-none tracking-tighter"
              >
                Nishant
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="uppercase text-6xl font-semibold md:font-medium md:text-8xl lg:text-9xl xl:text-[12rem] text-gray-900 dark:text-white leading-none tracking-tighter"
              >
                Choudhary
              </motion.h1>
            </motion.div>

            {/* Bottom Section - Email and Description */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
            >
              {/* Email */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={copyEmailToClipboard}
                className="cursor-pointer flex items-center space-x-2 text-black dark:text-gray-400"
              >
                <span className="text-lg font-medium">nishantchoudhary.dev@gmail.com</span>
                <Copy size={16} />
              </motion.div>

              {/* Description */}
              <div>
                {/* <p className="max-w-2xl text-xl lg:text-2xl text-black font-medium dark:text-gray-300 leading-relaxed">
                  Hello, I am a Fullstack Developer with 2 years of experience crafting responsive web apps using React.js, Next.js and
                  TailwindCSS. Expert in blending UI design with REST API integration to deliver seamless web solutions
                </p> */}
                {/* <p className="max-w-2xl text-xl lg:text-2xl text-black font-medium dark:text-gray-300 leading-relaxed"> */}
                <p className="max-w-2xl text-xl lg:text-2xl text-black font-medium dark:text-gray-300 leading-relaxed">
                  Hello, I'm a Creative Developer specializing in minimal design and optimised
                  development with 2+ years of expertise — based in India, working remote. Let’s
                  create!{' '}
                </p>
              </div>
            </motion.div>

            {/* Mobile Profile Image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="md:hidden flex justify-center mt-12"
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
  );
};

export default HeroSection;
