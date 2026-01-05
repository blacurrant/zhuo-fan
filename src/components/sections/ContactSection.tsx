'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  return (
    <section className="min-h-fit bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute bottom-32 left-16 w-1.5 h-1.5 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-2 h-2 bg-white rounded-full"></div>
        <div className="absolute top-60 left-1/2 w-1 h-1 bg-white rounded-full"></div>
      </div> */}

      <div className="relative z-1 px-6 py-8">
        <div className="container mx-auto">
          {/* Social Links - Top Right */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0 }}
            className="flex justify-end space-x-8 mb-16"
          >
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              href="https://www.linkedin.com/in/nishant-choudhary-dev/"
              className="text-white hover:text-gray-300 transition-colors"
            >
              LinkedIn
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              href="https://x.com/nishantcy"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Twitter
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.05 }}
              href="https://github.com/blacurrant"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Github
            </motion.a>
          </motion.div>

          {/* Main Content */}
          <div className="flex flex-col justify-center py-24 space-y-12">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                Curious about what we can create <span className="bg-gradient-to-r from-white to-transparent bg-clip-text text-transparent">together?</span>
              </h2>
              {/* <h3 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
                Let's bring something extraordinary <span className="text-gray-400">to life!</span>
              </h3> */}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#ffffff', color: '#000000' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open('mailto:nishantchoudhary.dev@gmail.com', '_blank')}
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium transition-all duration-300 cursor-pointer"
              >
                Get In Touch
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-lg">Available For Work</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.footer
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-20 pt-8 border-t border-gray-800"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">
              {/* Contact Info */}
              <div>
                <p>+91 9417801998</p>
                <p>nishantchoudhary.dev@gmail.com</p>
              </div>

              {/* Credits */}
              <div>
                <p>Designed & Developed</p>
                <p>by Nishant Choudhary</p>
              </div>

              {/* Copyright */}
              <div className="md:text-right">
                <p>All rights reserved,</p>
                <p>NC ©2025</p>
              </div>
            </div>
          </motion.footer>
        </div>
      </div>
    </section>
  );
};

export default React.memo(ContactSection);
