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
      className="bg-white dark:bg-gray-950 py-16 px-6"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            about.
          </h2>
          {/* <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Show More
          </motion.button> */}
        </motion.div>

        {/* About Content */}
        <div className="space-y-8">
          {/* Top Description */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-5xl p-6 lg:p-8"
          >
            <p className="text-xl lg:text-4xl font-medium text-gray-900 dark:text-white leading-relaxed tracking-wide">
            I am a Fullstack Developer with 2 years of experience crafting responsive web apps using React.js, Next.js and
                  TailwindCSS. Expert in blending UI design with REST API integration to deliver seamless web solutions
                
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
                    me and milo (Say Hi!) are dedicated to crafting beautiful and highly functional designs that
                    seamlessly align with our clients' unique needs and long-term goals.
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