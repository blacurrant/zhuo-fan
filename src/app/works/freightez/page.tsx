'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

const FreightEZCaseStudy: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <button
              onClick={() => router.push('/landing')}
              className="mb-8 inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Work
            </button>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6">
              FreightEZ
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
              Transportation Management System for Small to Medium Fleets
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Role</span>
                <span className="font-semibold text-gray-900 dark:text-white">Lead Frontend Engineer</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Timeline</span>
                <span className="font-semibold text-gray-900 dark:text-white">2024-2025</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Platform</span>
                <span className="font-semibold text-gray-900 dark:text-white">Web App (B2B SaaS)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              FreightEZ is a comprehensive Transportation Management System (TMS) designed specifically for small to medium-sized North American freight fleets. The platform replaces traditional spreadsheets with smart, automated tools that streamline every aspect of fleet operations.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              From dispatch management and invoice automation to real-time fleet tracking and compliance handling, FreightEZ provides an all-in-one solution that helps smaller fleets compete with larger operations while maintaining operational efficiency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              The Problem
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Small and medium-sized freight fleets face unique challenges in managing their operations:
            </p>
            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Reliance on outdated spreadsheets leading to errors and inefficiencies</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Time-consuming manual invoicing and payment tracking</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Lack of real-time visibility into fleet operations and driver locations</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Scattered documents and compliance paperwork across multiple platforms</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span>Communication gaps between dispatchers, drivers, and office staff</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              The Solution
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              FreightEZ provides an integrated platform that brings all fleet management operations under one roof, with role-specific interfaces for different team members.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Key Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Streamlined Dispatch',
                description: 'Easily assign drivers, track progress, and reduce delays with zero confusion. Real-time updates keep everyone informed.',
              },
              {
                title: 'Automatic Invoicing',
                description: 'Generate professional invoices in seconds, track payment status in real-time, and stay on top of all billing without jumping between tools.',
              },
              {
                title: 'Centralized Documents',
                description: 'All your documents in one place. Upload, organize, and access critical paperwork from anywhere, anytime.',
              },
              {
                title: 'Real-Time Trip Updates',
                description: 'Track every trip as it happens with live updates across Confirmed, Dispatched, In Transit, and Delivered stages.',
              },
              {
                title: 'Mobile Driver App',
                description: 'Drivers can view assigned loads, upload documents, track progress, and get updates from a mobile app built for the road.',
              },
              {
                title: 'Fleet Analytics',
                description: 'Monitor trends, improve efficiency, and stay ahead of costly issues with insights built right into the TMS.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Technology Stack
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'PostgreSQL', 'Node.js'].map((tech) => (
                <div
                  key={tech}
                  className="bg-gray-50 dark:bg-gray-900 px-4 py-3 rounded-lg text-center font-semibold text-gray-900 dark:text-white"
                >
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Impact
            </h2>
            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">✓</span>
                <span>Reduced invoice generation time from hours to seconds</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">✓</span>
                <span>Improved dispatch efficiency with real-time load tracking</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">✓</span>
                <span>Eliminated spreadsheet errors</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">✓</span>
                <span>Centralized compliance and documentation management</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">✓</span>
                <span>Enhanced driver-dispatcher communication</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Visit FreightEZ
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Simplifying operations for North American logistics, one load at a time.
            </p>
            <a
              href="https://www.freightez.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors"
            >
              View Live Site
              <ExternalLink size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(FreightEZCaseStudy);
