'use client';
import React, { useState } from 'react';
import ThemeToggle from '../ui/ThemeToggle';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className={`sticky top-5 w-full ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 backdrop-blur-sm dark:bg-opacity-30  lg:bg-transparent border-2 border-gray-300 dark:border-[#262626] mt-2 lg:mt-0 p-4 lg:p-0 z-50 shadow-lg lg:shadow-none rounded-md">
        <div className="flex flex-row justify-between items-center py-4">
          {/* Logo/Brand Section */}
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] bg-blue-600 dark:bg-gradient-to-br dark:from-orange-700 dark:via-orange-400 dark:to-orange-700 border-2 border-blue-700 dark:border-[#262626] flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-mono text-lg font-bold text-gray-900 dark:text-white">
                Nishant Choudhary
              </h1>
              <p className="font-mono text-sm text-gray-600 dark:text-gray-400">
                Fullstack Developer
              </p>
            </div>
          </div>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button
            className="block lg:hidden p-2 text-gray-700 dark:text-white hover:text-gray-900 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <div>
            <ThemeToggle />
          </div>

          {/* Navigation Menu */}
          {/* <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full lg:top-auto left-0 lg:left-auto w-full lg:w-auto bg-white lg:bg-transparent border-2 lg:border-0 border-gray-200 dark:border-[#262626] mt-2 lg:mt-0 p-4 lg:p-0 z-50 shadow-lg lg:shadow-none`}>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-4 lg:gap-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="font-mono text-base sm:text-lg md:text-xl font-bold leading-[25px] text-center uppercase text-blue-600 dark:text-[#f35034] hover:text-blue-800 dark:hover:text-[#e63e21] transition-colors duration-200 py-2 lg:py-0 w-full lg:w-auto"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('experience')}
                className="font-mono text-base sm:text-lg md:text-xl font-normal leading-[25px] text-center uppercase text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-[#f35034] transition-colors duration-200 py-2 lg:py-0 w-full lg:w-auto"
              >
                Experience
              </button>
              <button 
                onClick={() => scrollToSection('projects')}
                className="font-mono text-base sm:text-lg md:text-xl font-normal leading-[25px] text-center uppercase text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-[#f35034] transition-colors duration-200 py-2 lg:py-0 w-full lg:w-auto"
              >
                Projects
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="font-mono text-base sm:text-lg md:text-xl font-normal leading-[25px] text-center uppercase text-gray-700 dark:text-white hover:text-blue-600 dark:hover:text-[#f35034] transition-colors duration-200 py-2 lg:py-0 w-full lg:w-auto"
              >
                Contact
              </button>
            </div>
          </nav> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
