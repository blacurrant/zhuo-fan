'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { Building2, Globe2, Linkedin, MapPin, Phone, Star } from 'lucide-react';
import LinkedInLogo from '@/utils/linkedinLogo';
import GitHubLogo from '@/utils/githubLogo';
import LightRays from '@/components/ui/LightRays';
// import {toast} from '@react-toastify'

interface WorkExperience {
  id: number;
  title: string;
  period: string;
  company: string;
  location: string;
  description: string[];
  isActive?: boolean;
}

interface Project {
  id: number;
  title: string;
  description: string;
  period: string;
  technologies: string[];
  image?: string;
  type: 'fullstack' | 'frontend' | 'backend' | 'mobile';
}

interface Skill {
  id: number;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tools';
}

const HomePage: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Nishant's Work Experience
  const workExperience: WorkExperience[] = [
    {
      id: 1,
      title: 'Frontend Developer',
      period: 'Jan 2024 – August 2025',
      company: 'Sunfocus Solutions',
      location: 'Mohali',
      description: [
        'Built 40+ reusable UI components using TailwindCSS + Storybook, adopted across 5+ client projects',
        'Implemented SSR, dynamic routing, and performance optimizations in Next.js, improving page speed by 45%',
        'Integrated OAuth2 + JWT auth with RBAC using NextAuth and CASL',
        'Developed a modular drag-and-drop page builder in Next.js for non-technical content teams',
        'Led frontend monitoring setup with Sentry, Mixpanel, and Web Vitals, improving Lighthouse accessibility score by 20%',
      ],
      isActive: true,
    },
  ];

  // Nishant's Projects
  const projects: Project[] = [
    {
      id: 1,
      title: 'MelloUp – Event Lead Generation Platform',
      description:
        'Built MVP frontend from scratch using Next.js, TailwindCSS, and Vite, reducing page load time by 20%. Led end-to-end frontend development for web and mobile app, integrating Firebase for real-time data.',
      period: 'Oct 2024 – April 2025',
      technologies: ['Next.js', 'JavaScript', 'Vite', 'TailwindCSS', 'Python', 'Flask', 'Firebase'],
      type: 'fullstack',
      image: '/mello1.png',
    },
    {
      id: 2,
      title: 'Ibasho – Social Journal App',
      description:
        'Created MVP from scratch using Next.js, TailwindCSS, Typescript, Supabase. Features include image capture, journaling, social feed, and chat integration.',
      period: 'Oct 2024 – April 2025',
      technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase'],
      type: 'fullstack',
      image: '/ibasho1.png',
    },
    {
      id: 3,
      title: 'Kanban Task Management',
      description:
        'Developed Task Management board with drag-and-drop functionality, task allocation, CRUD operations, and real-time chat integration.',
      period: '2024',
      technologies: [
        'TypeScript',
        'Next.js',
        'TailwindCSS',
        'Shadcn/UI',
        'Python',
        'Flask',
        'Supabase',
      ],
      type: 'fullstack',
      image: '/kanban.png',
    },
  ];

  // Nishant's Skills
  const skills: Skill[] = [
    // Frontend
    { id: 1, name: 'HTML', category: 'frontend' },
    { id: 2, name: 'CSS', category: 'frontend' },
    { id: 3, name: 'JavaScript', category: 'frontend' },
    { id: 4, name: 'TypeScript', category: 'frontend' },
    { id: 5, name: 'React.js', category: 'frontend' },
    { id: 6, name: 'Next.js', category: 'frontend' },
    { id: 7, name: 'Angular', category: 'frontend' },
    { id: 8, name: 'TailwindCSS', category: 'frontend' },
    { id: 9, name: 'Bootstrap', category: 'frontend' },
    { id: 10, name: 'Ant Design', category: 'frontend' },
    { id: 11, name: 'Shadcn/UI', category: 'frontend' },
    { id: 12, name: 'Material-UI', category: 'frontend' },

    // Backend
    { id: 13, name: 'Node.js', category: 'backend' },
    { id: 14, name: 'Python', category: 'backend' },
    { id: 15, name: 'Flask', category: 'backend' },
    { id: 16, name: 'REST APIs', category: 'backend' },
    { id: 17, name: 'GraphQL', category: 'backend' },

    // Database
    { id: 18, name: 'MySQL', category: 'database' },
    { id: 19, name: 'Supabase', category: 'database' },
    { id: 20, name: 'MongoDB', category: 'database' },

    // Tools
    { id: 21, name: 'Git', category: 'tools' },
    { id: 22, name: 'Vercel', category: 'tools' },
    { id: 23, name: 'Figma', category: 'tools' },
    { id: 24, name: 'Firebase', category: 'tools' },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('nishantchoudhary.dev@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      // toast.success('email copied to your clipboard!');
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleHireMe = () => {
    window.open('mailto:nishantchoudhary.dev@gmail.com', '_blank');
  };

  const handleProjectClick = (projectId: number) => {
    console.log(`Project ${projectId} clicked`);
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Nishant_Frontend_Resume.pdf';
    link.download = 'Nishant_Frontend_Resume.pdf';
    link.click();
  };

  const skillsByCategory = {
    frontend: skills.filter((skill) => skill.category === 'frontend'),
    backend: skills.filter((skill) => skill.category === 'backend'),
    database: skills.filter((skill) => skill.category === 'database'),
    tools: skills.filter((skill) => skill.category === 'tools'),
  };

  return (
    <div className="relative w-full bg-white dark:bg-black min-h-screen transition-colors duration-300 font-mono">
      {/* Theme Toggle */}
      <div className='hidden dark:flex' style={{ width: '100%', height: '1000px', position: 'absolute', background:"transparent" }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0}
          noiseAmount={0.1}
          distortion={0.05}
          // className="custom-rays"
        />
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-start items-center w-full gap-[20px] pt-[24px] pb-[32px] sm:pb-[48px] lg:pb-[64px] px-[56px] sm:px-[84px] lg:px-[112px]">
          {/* Header Section */}
          {/* <Header /> */}

          {/* Main Content */}
          <div className="flex flex-col gap-[20px] justify-start items-center w-full">
            {/* Hero Section */}
            <div className="flex flex-col gap-[32px] sm:gap-[48px] lg:gap-[64px] justify-start items-center w-full">
              {/* Status and Profile Row */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-4 lg:gap-0">
                {/* <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400"></div>
                  <p className="font-mono text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-[22px] sm:leading-[25px] lg:leading-[30px] text-gray-700 dark:text-[#c0c0c0] self-center lg:self-auto">
                    Fullstack Developer
                  </p>
                </div> */}
                <div className="w-full flex justify-end gap-2">
                  <div className="w-fit flex gap-2 p-2 justify-center items-center bg-green-50 dark:bg-[#161616] border border-green-200 dark:border-[#262626] px-[8px] py-[4px] self-end lg:self-auto">
                    {/* <div className="flex flex-row gap-[10px] justify-center items-center"> */}
                    <div className="w-[10px] h-[10px] bg-green-500 rounded-full"></div>
                    <p className="font-mono text-[11px] sm:text-[13px] font-medium leading-[14px] sm:leading-[16px] text-green-700 dark:text-[#c0c0c0] uppercase tracking-wide">
                      Available for Work
                    </p>
                    {/* </div> */}
                  </div>
                  {/* <div>
                    <ThemeToggle />
                  </div> */}
                </div>
              </div>

              {/* Main Hero Content */}
              <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-8 lg:gap-16">
                {/* Left Content */}
                <div className="flex flex-col gap-[20px] sm:gap-[24px] lg:gap-[28px] justify-start items-center lg:items-start w-full lg:flex-1 order-2 lg:order-1">
                  <div className="flex flex-col gap-[10px] sm:gap-[12px] lg:gap-[14px] justify-start items-start w-full">
                    <h1 className="font-mono text-[28px] sm:text-[32px] lg:text-[36px] font-semibold leading-[34px] sm:leading-[38px] lg:leading-[44px] text-gray-900 dark:text-white text-center lg:text-left">
                      Hi, I'm Nishant Choudhary
                    </h1>
                    <p className="font-mono text-[16px] sm:text-[18px] lg:text-[20px] font-extralight leading-[24px] sm:leading-[27px] lg:leading-[30px] text-gray-600 dark:text-[#c0c0c0] text-center lg:text-left">
                      Fullstack Developer with 2 years of experience crafting responsive web apps
                      using{' '}
                      <span className="text-blue-600 dark:text-orange-400 font-medium">
                        React.js, Next.js and TailwindCSS
                      </span>
                    </p>
                    <div className="flex flex-col gap-2 mt-2">
                      <div className="flex gap-2 items-center">
                        <Building2 size={20} />
                        <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-orange-900/30 text-purple-800 dark:text-orange-300 border border-purple-200 dark:border-orange-700">
                          2+ Years Experience
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Star size={20} />
                        <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-orange-900/30 text-purple-800 dark:text-orange-300 border border-purple-200 dark:border-orange-700">
                          Founder @Ibasho
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <MapPin size={20} />
                        <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-orange-900/30 text-blue-800 dark:text-orange-300 border border-blue-200 dark:border-orange-700">
                          Nangal, Punjab, India
                        </span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Phone size={20} />
                        <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-orange-900/30 text-purple-800 dark:text-orange-300 border border-purple-200 dark:border-orange-700">
                          +91 9417801998
                        </span>
                      </div>
                      <div onClick={handleCopyEmail} className="flex gap-2 items-center">
                        <Globe2 size={20} />
                        <span className="px-3 py-1 text-xs font-medium bg-purple-100 dark:bg-orange-900/30 text-purple-800 dark:text-orange-300 border border-purple-200 dark:border-orange-700">
                          nishantchoudhary.dev@gmail.com
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-start items-center w-full gap-3 sm:gap-4">
                    <Button
                      variant="primary"
                      size="md"
                      onClick={handleHireMe}
                      className="bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-br dark:from-orange-700 dark:via-orange-400 dark:to-orange-700 dark:hover:bg-[#d63520] text-white border-t border-blue-700 dark:border-[#e4643f] px-[6px] py-[8px] w-full sm:w-auto transition-all duration-200"
                      rightIcon={
                        <Image
                          src="/images/img_ic_round_plus.svg"
                          alt="plus icon"
                          width={24}
                          height={24}
                          className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                        />
                      }
                    >
                      Hire me
                    </Button>
                    {/* <Button
                      variant="secondary"
                      size="md"
                      onClick={handleCopyEmail}
                      className="bg-gray-100 dark:bg-[#161616] border border-gray-300 dark:border-[#262626] text-gray-700 dark:text-[#c0c0c0] hover:bg-gray-200 dark:hover:bg-[#2c2c2c] px-[8px] py-[8px] w-full sm:w-auto transition-all duration-200"
                      rightIcon={
                        <Image
                          src="/images/img_phcopy.svg"
                          alt="copy icon"
                          width={24}
                          height={24}
                          className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                        />
                      }
                    >
                      {copiedEmail ? 'Copied!' : 'Copy Email'}
                    </Button> */}
                    <Button
                      variant="outline"
                      size="md"
                      onClick={handleDownloadCV}
                      className="border border-gray-300 dark:border-[#262626] text-gray-700 dark:text-[#c0c0c0] hover:bg-gray-50 dark:hover:bg-[#1b1b1b] px-[8px] py-[8px] w-full sm:w-auto transition-all duration-200"
                      rightIcon={
                        <svg
                          className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      }
                    >
                      Download CV
                    </Button>
                  </div>
                </div>

                {/* Right Profile Image */}
                {/* <div className="flex flex-col justify-start items-center w-auto order-1 lg:order-2">
                  <div className="bg-gray-100 dark:bg-[#2c2c2c] border-2 border-gray-200 dark:border-[#3f3e3e] p-[10px] relative">
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-[#2c2c2c]"></div>
                    <Image
                      src="/images/img_ellipse_61.png"
                      alt="Nishant Choudhary Profile"
                      width={156}
                      height={156}
                      className="w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] lg:w-[156px] lg:h-[156px] object-cover"
                    />
                  </div>
                </div> */}
              </div>
            </div>

            {/* Work Experience and Projects Section */}
            <div className="flex flex-col lg:flex-row gap-[20px] justify-start items-start w-full">
              {/* Left Column - Experience & Skills */}
              <div className="flex flex-col gap-[20px] justify-start items-center w-full">
                {/* Recent Work Section */}
                <div className="flex flex-col gap-[50px] sm:gap-[58px] lg:gap-[66px] justify-start items-center w-full bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#1b1b1b] dark:to-black  border-2 border-gray-200 dark:border-[#262626] px-[16px] lg:px-[20px] py-[24px] lg:py-[28px] rounded-md">
                  {/* Section Header */}
                  <div className="flex flex-row justify-start items-center w-full">
                    <div className="w-[8px] h-[8px] bg-blue-500 dark:bg-[#c0c0c0] mr-3"></div>
                    <h2 className="font-mono text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-[25px] sm:leading-[27px] lg:leading-[30px] text-gray-900 dark:text-[#c0c0c0]">
                      Work Experience
                    </h2>
                  </div>

                  {/* Work Experience List */}
                  <div className="flex flex-col gap-[28px] sm:gap-[31px] lg:gap-[34px] w-full">
                    {workExperience.map((work) => (
                      <div key={work.id} className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-0">
                          <div className="flex flex-col gap-[4px] justify-start items-start w-full sm:flex-1">
                            <h3
                              className={`font-mono text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-[25px] sm:leading-[27px] lg:leading-[30px] ${work.isActive ? 'text-blue-600 dark:text-[#f25034]' : 'text-gray-900 dark:text-white'}`}
                            >
                              {work.title}
                            </h3>
                            <p className="font-mono text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[25px] text-gray-600 dark:text-[#c0c0c0]">
                              {work.company} • {work.location}
                            </p>
                            <p className="font-mono text-[14px] font-medium text-gray-500 dark:text-[#c0c0c0] bg-gray-200 dark:bg-[#262626] px-2 py-1 inline-block">
                              {work.period}
                            </p>
                          </div>
                        </div>
                        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-[#c0c0c0] ml-4">
                          {work.description.map((desc, index) => (
                            <li key={index} className="leading-relaxed">
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Section */}
                <div className="flex flex-col gap-[20px] justify-start items-center w-full">
                  {/* Frontend Skills */}
                  <div className="flex flex-col gap-4 w-full bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#1b1b1b] dark:to-black  border-2 border-gray-200 dark:border-[#262626] px-[16px] lg:px-[20px] py-[24px] lg:py-[28px] rounded-md">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-[8px] h-[8px] bg-green-500 dark:bg-green-400"></div>
                      <h3 className="font-mono text-[18px] sm:text-[20px] lg:text-[22px] font-medium text-gray-900 dark:text-[#c0c0c0]">
                        Frontend Technologies
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skillsByCategory.frontend.map((skill) => (
                        <span
                          key={skill.id}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-700"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Backend & Database Skills Row */}
                  <div className="grid grid-cols-2 gap-[20px] justify-center items-center w-full">
                    <div className="h-[32vh] flex flex-col gap-4 w-full sm:w-auto bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#1b1b1b] dark:to-black  border-2 border-gray-200 dark:border-[#262626] px-[16px] lg:px-[20px] py-[24px] lg:py-[28px] rounded-md">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="mt-2 w-[8px] h-[8px] bg-purple-500 dark:bg-purple-400"></div>
                        <h3 className="font-mono text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-gray-900 dark:text-[#c0c0c0]">
                          Backend & APIs
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillsByCategory.backend.map((skill) => (
                          <span
                            key={skill.id}
                            className="px-2 py-1 text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-orange-700"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="h-[32vh] flex flex-col gap-4 w-full sm:w-auto bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#1b1b1b] dark:to-black  border-2 border-gray-200 dark:border-[#262626] px-[16px] lg:px-[20px] py-[24px] lg:py-[28px] rounded-md">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="mt-2 w-[8px] h-[8px] bg-orange-500 dark:bg-orange-400"></div>
                        <h3 className="font-mono text-[16px] sm:text-[18px] lg:text-[20px] font-medium text-gray-900 dark:text-[#c0c0c0]">
                          Database & Tools
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[...skillsByCategory.database, ...skillsByCategory.tools].map((skill) => (
                          <span
                            key={skill.id}
                            className="px-2 py-1 text-xs font-medium bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-700"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Projects */}
              <div className="flex flex-col gap-[20px] justify-start items-center w-full">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="flex flex-col justify-start items-center w-full bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#1b1b1b] dark:to-black  border-2 border-gray-200 dark:border-[#262626] px-[16px] lg:px-[20px] py-[24px] lg:py-[28px] rounded-md"
                  >
                    <div className="flex flex-col gap-[35px] sm:gap-[39px] lg:gap-[44px] justify-start items-center w-full">
                      {/* Project Header */}
                      <div className="flex flex-col sm:flex-row justify-center items-start sm:items-center w-full gap-4 sm:gap-0">
                        <div className="flex flex-col gap-[10px] justify-start items-start w-full sm:flex-1">
                          <h3 className="font-mono text-[18px] sm:text-[20px] lg:text-[22px] font-semibold leading-[22px] sm:leading-[24px] lg:leading-[26px] text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          <p className="font-mono text-[14px] sm:text-[16px] lg:text-[18px] font-normal leading-[18px] sm:leading-[20px] lg:leading-[22px] text-gray-600 dark:text-[#c0c0c0]">
                            {project.period}
                          </p>
                          <p className="font-mono text-[14px] sm:text-[15px] lg:text-[16px] font-normal leading-[20px] sm:leading-[22px] lg:leading-[24px] text-gray-600 dark:text-[#c0c0c0] mt-2">
                            {project.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleProjectClick(project.id)}
                          className="w-[56px] h-[56px] bg-blue-600 dark:bg-[#e63e21] border border-blue-700 dark:border-black p-[14px] shadow-[0px_3px_1px_rgba(59,130,246,0.5)] dark:shadow-[0px_3px_1px_#e4643f] hover:scale-105 transition-transform duration-200 self-end sm:self-auto"
                          aria-label={`View ${project.title} project`}
                        >
                          <Image
                            src={'/images/img_arrow_up.svg'}
                            alt="arrow up"
                            width={28}
                            height={28}
                            className="w-full h-full filter brightness-0 invert"
                          />
                        </button>
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 w-full">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-[#262626] text-gray-700 dark:text-[#c0c0c0] border border-gray-300 dark:border-[#3f3e3e]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Project Image Placeholder */}
                      <div className="w-full h-[200px] sm:h-[250px] lg:h-[300px] bg-gray-200 dark:bg-[#2c2c2c] border border-gray-300 dark:border-[#3f3e3e] flex items-center justify-center">
                        <div className="text-center text-gray-500 dark:text-gray-400">
                          <Image
                            src={project.image || ''}
                            alt="arrow up"
                            width={500}
                            height={300}
                            className="object-cover"
                          />
                          {/* <svg
                            className="w-16 h-16 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg> */}
                          <p className="text-sm font-medium">{project.title}</p>
                          <p className="text-xs">Project Preview</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex flex-row justify-start items-center w-full bg-gray-50 dark:bg-gradient-to-br dark:from-black dark:via-[#1b1b1b] dark:to-black  border-2 border-gray-200 dark:border-[#262626] px-[16px] lg:px-[20px] py-[24px] lg:py-[28px] rounded-md">
              <div className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-6 lg:gap-0">
                {/* <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
                  <p className="font-mono text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-[25px] sm:leading-[27px] lg:leading-[30px] text-gray-900 dark:text-[#c0c0c0] lg:w-auto">
                    Portfolio 2024
                  </p>
                </div> */}
                <div className="flex flex-col gap-8 sm:flex-row justify-evenly items-center flex-1 px-0 sm:px-[28px] lg:px-[56px]">
                  <div className="flex gap-2 items-center">
                    <a
                      href="https://www.linkedin.com/in/nishant-choudhary-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[16px] sm:text-[18px] lg:text-[20px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[25px] text-blue-600 dark:text-white hover:text-blue-800 dark:hover:text-[#e63e21] transition-colors duration-200"
                    >
                      <LinkedInLogo className="text-blue-600 dark:text-white" size={80} />
                    </a>
                  </div>
                  <div className="flex gap-2 items-center justify-center">
                    <GitHubLogo className="text-white" size={20} />
                    <a
                      href="https://github.com/blacurrant"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[14px] sm:text-[18px] lg:text-[20px] font-medium leading-[20px] sm:leading-[22px] lg:leading-[25px] text-blue-600 dark:text-white hover:text-blue-800 dark:hover:text-[#e63e21] transition-colors duration-200"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
