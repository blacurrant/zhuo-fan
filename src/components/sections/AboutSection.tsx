'use client';
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

  return (
    <motion.section 
      // style={{ y }}
      className="bg-white dark:bg-gray-950 py-16"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8 pb-4 border-b border-gray-950 dark:border-gray-300  px-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            about.
          </h2>
        </motion.div>

        {/* About Content */}
        <div className="space-y-8">
          {/* Top Description */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl p-6 lg:p-8"
          >
            <p className="text-xl lg:text-4xl font-medium text-gray-900 dark:text-white leading-relaxed tracking-wide">
            Fullstack Developer with 2+ years of experience crafting beautiful & responsive web apps using React.js, Next.js and
                  TailwindCSS.
                
            </p>
          </motion.div>

          <div className="flex items-center w-full justify-center">
            {/* Bottom Grid - Image and Description */}
            <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left - Image */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-4"
              >
                <motion.div
                  // whileHover={{ scale: 1.02 }}
                  className="overflow-hidden shadow-lg"
                >
                  <Image 
                    src="/cat.jpg" 
                    alt="About image" 
                    width={1000} 
                    height={1000} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>

              {/* Right - Description */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="p-6 lg:p-8 flex items-center"
              >
                <div>
                  <p className="text-lg lg:text-xl text-gray-900 dark:text-white leading-relaxed">
                  ✨ Hi from me and Daisy! (Say hi! 👋)
We pour our hearts into creating designs that aren't just pretty — it should be something people enjoy using, remember, and come back to.
                  </p>
                  
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;