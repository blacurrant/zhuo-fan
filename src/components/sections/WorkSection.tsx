'use client';
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import { CircleArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const WorkSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const router = useRouter();

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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">work.</h2>
          {/* <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Show More
          </motion.button> */}
        </motion.div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* First Project - Mello */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => router.push('/works/melloup')}
            // whileHover={{ scale: 1.02, y: -5 }}
            className="group cursor-pointer bg-black hover:bg-opacity-50 rounded-lg"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-b from-black to-black overflow-hidden shadow-lg">
              <Image
                src="/mello1.png"
                alt="Mello Project"
                width={1000}
                height={1000}
                className="w-full h-full object-cover hover:opacity-50 transform ease-in-out duration-500 hover:scale-105"
              />

              {/* cta button */}
              <div
                onClick={() => router.push('/works/melloup')}
                className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <button className="bg-white px-6 py-2">
                  <CircleArrowOutUpRight />
                </button>
              </div>

              {/* Project Title */}
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">MelloUp</h3>
              </div>
            </div>
          </motion.div>

          {/* Second Project - Violet Orbit */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            onClick={() => router.push('/works/ibasho')}
            // whileHover={{ scale: 1.02, y: -5 }}
            className="group cursor-pointer"
          >
            {/* <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden"> */}
            {/* Violet Orbit Design */}
            <div className="relative aspect-[4/3] bg-gradient-to-b from-transparent to-black overflow-hidden shadow-lg">
              <Image
                src="/ibasho1.png"
                alt="Mello Project"
                width={1000}
                height={1000}
                className="w-full h-full object-cover hover:opacity-50 transform ease-in-out duration-500 hover:scale-105"
              />

              {/* cta button */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={() => router.push('/works/ibasho')}
                  className="bg-white px-6 py-2 "
                >
                  <CircleArrowOutUpRight />
                </button>
              </div>

              {/* Project Title */}
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">Ibasho</h3>
              </div>
            </div>
            {/* </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            onClick={() => router.push('/home')}
            className="group cursor-pointer"
          >
            {/* <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden"> */}
            {/* Violet Orbit Design */}
            <div className="relative aspect-[4/3] bg-gradient-to-b from-transparent to-black overflow-hidden shadow-lg">
              <Image
                src="/portofolio.png"
                alt="Mello Project"
                width={1000}
                height={1000}
                className="w-full h-full object-cover hover:opacity-70 transform ease-in-out duration-500 hover:scale-105"
              />

              {/* cta button */}
              <div
                onClick={() => router.push('/home')}
                className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <button className="bg-white px-6 py-2">
                  <CircleArrowOutUpRight />
                </button>
              </div>

              {/* Project Title */}
              <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl lg:text-3xl font-bold text-white">Portfolio</h3>
              </div>
            </div>
            {/* </div> */}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WorkSection;
