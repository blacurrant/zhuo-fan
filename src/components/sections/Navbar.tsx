'use client';
import React from 'react';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Nishant_fullstack_cv.pdf';
    link.download = 'Nishant_Fullstack_CV.pdf';
    link.click();
  };

  const router = useRouter();

  return (
    <nav className="z-50 fixed top-0 left-0 right-0 h-fit flex justify-between items-center px-8 py-4 bg-white dark:bg-gray-950 shadow ">
      <div onClick={() => router.push('/')} className="font-mono text-3xl font-bold text-gray-900 dark:text-white">NC</div>
      {/* <div onClick={() => router.push('/')} className="w-12 h-12 font-bold text-gray-900 dark:text-white">
        <Image src="/logo.png" alt='logo' width={300} height={300} className='object-cover' />
      </div> */}
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
          onClick={() => setIsPreviewOpen(true)}
          className="hover:border hover:border-gray-300 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1b1b1b] py-[8px] w-full sm:w-auto transition-all duration-200"
        >
          Preview CV
        </Button>
        {isPreviewOpen && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60"
            role="dialog"
            aria-modal="true"
          >
            <div className="w-full max-w-5xl h-[80vh] bg-white dark:bg-gray-950 rounded-lg shadow-xl overflow-hidden flex flex-col">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Nishant Fullstack CV</h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 dark:text-gray-300"
                    onClick={handleDownloadCV}
                  >
                    Download
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-700 dark:text-gray-300"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
              <div className="flex-1 bg-gray-50 dark:bg-[#0f0f10]">
                <iframe
                  title="CV Preview"
                  src="/Nishant_fullstack_cv.pdf#toolbar=0&navpanes=0&scrollbar=1"
                  className="w-full h-full"
                />
              </div>
              <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
                If the preview does not load, use the Download button above.
              </div>
            </div>
          </div>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
