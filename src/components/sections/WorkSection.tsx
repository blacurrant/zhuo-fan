'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, Link, Link2, X } from 'lucide-react';

const works = [
  {
    slug: 'melloup',
    title: 'MELLOUP',
    year: '2024',
    description:
      'a comprehensive social platform designed to connect music enthusiasts through collaborative playlists and real-time music discovery. Built with modern web technologies, featuring seamless integration with streaming services and innovative social features that revolutionize how people share and discover music together.',
    images: ['/mello1.png', '/mello2.png'],
    href: '/works/melloup',
  },
  {
    slug: 'ibasho',
    title: 'IBASHO',
    year: '2024',
    description:
      'an immersive digital experience platform that bridges physical and virtual spaces. This project explores the intersection of architecture, technology, and human interaction, creating meaningful connections through carefully crafted digital environments that respond to user behavior and emotional states.',
    images: ['/ibasho1.png', '/ibasho2.png'],
    href: '/works/ibasho',
  },
  {
    slug: 'portfolio',
    title: 'PORTFOLIO',
    year: '2024',
    description:
      'a brutalist approach to personal branding through digital craftsmanship. This portfolio represents a bold statement in contemporary web design, emphasizing raw functionality over decoration while maintaining sophisticated user experience principles and cutting-edge technical implementation.',
    images: ['/portofolio.png', '/portfolio2.png'],
    href: '/home',
  },
];

const WorkSection: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const router = useRouter();

  const toggleAccordion = (slug: string) => {
    setOpenAccordion(openAccordion === slug ? null : slug);
  };

  return (
    <section className="min-h-screen bg-white dark:bg-gray-950 py-16">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-gray-700 px-6"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">work.</h2>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-0 border-t border-gray-950 dark:border-white ">
          {works.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="border-b border-gray-950 dark:border-white"
            >
              {/* Accordion Header */}
              <motion.button
                onClick={() => toggleAccordion(project.slug)}
                className="w-full py-2 md:p-4 px-0 text-left hover:bg-gray-950 hover:text-white dark:hover:bg-white dark:hover:text-gray-950 transition-colors duration-300 group"
                whileHover={{ scale: 1.001 }}
                whileTap={{ scale: 0.999 }}
              >
                <div className="flex items-center justify-between px-6 py-10">
                  {/* <div className="flex items-baseline gap-8 md:gap-16"> */}
                  {/* <span className="text-2xl md:text-3xl lg:text-4xl font-gray-950 text-gray-950 dark:text-white group-hover:text-white dark:group-hover:text-gray-950 uppercase tracking-tight">
                      {project.year}
                    </span> */}
                  {/* <h3 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-gray-950 text-gray-950 dark:text-white group-hover:text-white dark:group-hover:text-gray-950 uppercase tracking-tight"> */}
                  <h3 className="uppercase text-3xl font-semibold md:font-bold lg:text-5xl text-gray-900 dark:text-white leading-none tracking-widest group-hover:text-white dark:group-hover:text-gray-950">
                    {project.title}
                  </h3>
                  {/* </div> */}
                  <motion.div
                    animate={{ rotate: openAccordion === project.slug ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-5xl md:text-9xl font-thin text-gray-950 dark:text-white group-hover:text-white dark:group-hover:text-gray-950"
                  >
                    <X size={64} />
                  </motion.div>
                </div>
              </motion.button>

              {/* Accordion Content */}
              <AnimatePresence>
                {openAccordion === project.slug && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: '70vh', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-gray-950 dark:bg-white p-8"
                  >
                    <div className="flex w-full items-center justify-between">
                      <h4 className="text-3xl md:text-4xl lg:text-5xl font-medium text-white dark:text-gray-950  tracking-tight mb-4">
                        about.
                      </h4>
                      <ArrowRight className="text-white dark:text-gray-950" size={32} />
                    </div>
                    <div className="h-fit w-[100%] pb-8 md:pb-16 grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
                      {/* Left Side - Description */}
                      <div className="col-span-1 justify-center">
                        <motion.div
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <p className="text-lg md:text-xl text-white dark:text-gray-950 leading-relaxed font-light">
                            {project.description}
                          </p>

                          {/* <motion.button
                            onClick={() => router.push(project.href)}
                            className="mt-12 px-12 py-6 bg-white dark:bg-gray-950 text-gray-950 dark:text-white text-xl md:text-2xl font-gray-950 uppercase tracking-tight border-4 border-white dark:border-gray-950 hover:bg-transparent hover:text-white dark:hover:bg-transparent dark:hover:text-gray-950 transition-colors duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            VIEW PROJECT
                          </motion.button> */}
                        </motion.div>
                      </div>

                      {/* Right Side - Images */}
                      <div className="col-span-2 grid grid-cols-2 gap-4 items-end">
                        {project.images.map((image, imageIndex) => (
                          <motion.div
                            key={imageIndex}
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 + imageIndex * 0.1 }}
                            className="aspect-square overflow-hidden border border-white dark:border-gray-950"
                          >
                            <Image
                              src={image}
                              alt={`${project.title} ${imageIndex + 1}`}
                              width={1000}
                              height={1000}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
