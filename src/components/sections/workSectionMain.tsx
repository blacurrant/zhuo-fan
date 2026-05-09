'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

const projects = [
  {
    title: 'Craon',
    sub: "AI Video Editor, Web App, SaaS Platform, Full-Stack",
    role: '@Full-Stack Developer',
    image: '/craon/craon-hero.png',
    alt: 'Craon AI Video Editor',
    route: '/works/craon',
  },
  {
    title: 'MelloUp',
    sub: "MVP, Saas, Website, Landing, PWA",
    role: '@Founding Engineer',
    image: '/melloup/melloup.png',
    alt: 'Mello Project',
    route: '/works/melloup',
  },
  {
    title: 'Ibasho',
    sub: 'Brand Design, UI/UX, Website, Landing, MVP ',
    role: '@Founder',
    image: '/ibasho/ibashoo.png',
    alt: 'Ibasho Project',
    route: '/works/ibasho',
  },
  {
    title: 'FreightEZ',
    sub: 'B2B SaaS, TMS Platform, Fleet Management, Web App',
    role: '@Lead Frontend Engineer',
    image: '/freightez/freightez-hero.png',
    alt: 'FreightEZ Project',
    route: '/works/freightez',
  },
];

const WorkSection: React.FC = () => {
  const router = useRouter();

  return (
    <motion.section className="bg-replicate-canvas py-16 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center mb-8 pb-4 border-b border-replicate-hairline"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-replicate-ink font-display">work.</h2>
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
              className="group cursor-pointer"
            >
              <div className="h-full relative rounded-md flex flex-col gap-2 bg-replicate-surface-card border border-replicate-hairline">
                <div className="group w-full h-[40vh] lg:h-[60vh] overflow-hidden rounded-t-md">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    width={1000}
                    height={1000}
                    className="w-full h-[40vh] lg:h-[60vh] object-cover rounded-t-md group-hover:scale-105 group-hover:opacity-90 transform ease-in-out duration-500"
                  />
                  <div className="absolute top-3 right-3 group-hover:translate-x-2 group-hover:-translate-y-2 transform ease-in-out duration-300">
                    <ArrowUpRight className="text-replicate-ink" size={20} />
                  </div>
                </div>

                <div className="w-full h-fit flex flex-col gap-2 bg-replicate-surface-card py-4 px-4 text-replicate-ink">
                  {/* Project Title */}
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg lg:text-2xl font-bold text-replicate-ink font-display">
                      {project.title}{' '}
                      <span className="text-md lg:text-lg font-light text-replicate-charcoal">
                        {project.role && ',' + project.role}
                      </span>
                    </h3>
                    <p className="text-md lg:text-lg font-light text-replicate-charcoal font-body">{project.sub}</p>
                  </div>
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
