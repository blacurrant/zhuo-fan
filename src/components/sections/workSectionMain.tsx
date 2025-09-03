'use client';
import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import { CircleArrowOutUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

// 1. Your JSON data (this could be imported from a file instead)
const projects = [
  {
    title: 'MelloUp',
    sub: "MVP, Saas, Website, Landing, PWA",
    role: '@Founding Engineer',
    image: '/melloup/melloup.png',
    alt: 'Mello Project',
    route: '/works/melloup',
    gradient: 'brightness-125',
    ctaBg: 'bg-white',
  },
  {
    title: 'Ibasho',
    sub: 'Brand Design, UI/UX, Website, Landing, MVP ',
    role: '@Founder',
    image: '/ibasho/ibashoo.png',
    alt: 'Ibasho Project',
    route: '/works/ibasho',
    gradient: '',
    ctaBg: 'bg-white',
  },
  {
    title: 'Portfolio',
    sub: 'Landing Page',
    role: '',
    image: '/portfolio/portfolio.png',
    alt: 'Portfolio Project',
    route: '/home',
    gradient: '',
    ctaBg: 'bg-white',
  },
  // Add more projects as needed
];

const WorkSection: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const fade = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const router = useRouter();

  return (
    <motion.section className="bg-white dark:bg-gray-950 py-16 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200 dark:border-gray-700"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">work.</h2>
        </motion.div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
              onClick={() => router.push(project.route)}
              className="group cursor-pointer bg-white"
            >
              <div className={`h-full relative rounded-sm flex flex-col gap-2 bg-white dark:bg-gray-950`}>
                <div className='rounded-sm'>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={1000}
                    height={1000}
                    className={`w-full h-[40vh] lg:h-[60vh] object-cover filter rounded-sm ${project.gradient}`}
                  />
                </div>

                <div className="w-full h-fit flex justify-between items-center bg:white dark:bg-gray-950 py-1 text-black dark:text-white">
                  {/* Project Title */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg lg:text-2xl font-bold text-black dark:text-white">{project.title} <span className='text-md lg:text-lg font-light text-black/50 dark:text-white/60'>{project.role && ','+project.role}</span> </h3>
                    <p className='text-md lg:text-lg font-light text-black/50 dark:text-white/60'>{project.sub}</p>
                  </div>

                  {/* cta button */}
                  {/* <div
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(project.route);
                    }}
                    className="flex"
                  >
                    <button className={`${project.ctaBg} px-6 py-2 text-black`}>
                      <CircleArrowOutUpRight />
                    </button>
                  </div> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default WorkSection;
