'use client';
import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Nishant_fullstack_cv.pdf';
    link.download = 'Nishant_Fullstack_CV.pdf';
    link.click();
  };

  const router = useRouter();

  return (
    <nav className="z-50 fixed top-0 left-0 right-0 h-fit flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-950 shadow ">
      <div onClick={() => router.push('/')} className="text-2xl font-bold text-gray-900 dark:text-white">NC</div>
      <div className="flex items-center space-x-8">
        {/* <a
          href="#"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Works
        </a>
        <a
          href="#"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          About
        </a>
        <a
          href="#"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Contact
        </a> */}
        <Button
          variant="ghost"
          size="md"
          onClick={handleDownloadCV}
          className="hover:border hover:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1b1b1b] py-[8px] w-full sm:w-auto transition-all duration-200"
          // rightIcon={
          //   <svg
          //     className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
          //     fill="none"
          //     stroke="currentColor"
          //     viewBox="0 0 24 24"
          //   >
          //     <path
          //       strokeLinecap="round"
          //       strokeLinejoin="round"
          //       strokeWidth={2}
          //       d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          //     />
          //   </svg>
          // }
        >
          Download CV
        </Button> 
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
