"use client"

import React from 'react';
import { Mail, Phone, Globe, MapPin, Calendar } from 'lucide-react';

export default function CoverLetterComponent() {
  return (
    <div className="max-w-4xl mx-auto py-32 px-8 bg-white shadow-lg">
      {/* Header Section */}
      <div className="border-b border-gray-200 pb-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
          {/* Personal Info */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">Nishant Choudhary</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Nangal, Punjab, India</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>nishantchoudhary.dev@gmail.com</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>+91 94178 01998</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="https://zhuo-fan.vercel.app" className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                <Globe className="w-4 h-4" />
                <span>Portfolio</span>
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">LinkedIn</a>
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">GitHub</a>
            </div>
          </div>
          
          {/* Date */}
          <div className="flex items-center gap-2 text-sm text-gray-600 lg:text-right">
            <Calendar className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      {/* Recipient Info */}
      <div className="mb-8">
        <div className="space-y-1">
          <p className="font-semibold text-gray-900">Hiring Manager</p>
          <p className="text-gray-700">Navan</p>
        </div>
      </div>

      {/* Cover Letter Content */}
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p className="text-gray-900 font-medium">Dear Hiring Manager,</p>
        
        <p>
          I'm excited to apply for the <strong className="text-gray-900">Software Engineer II (Frontend)</strong> role at Navan. 
          What drew me to this role is the chance to work on products that thousands of people rely on every day. 
          I've always enjoyed building interfaces that feel simple, accessible, and seamless for users—and Navan's 
          mission of making travel and expense management effortless really resonates with me.
        </p>

        <p>
          In my current role at <strong className="text-gray-900">Sunfocus Solutions</strong>, I've built reusable UI component libraries, 
          optimized performance in Next.js (cutting load times nearly in half), and developed a drag-and-drop page 
          builder that made life easier for non-technical content teams. I also introduced monitoring with tools like 
          Sentry and Mixpanel, which improved our accessibility scores and helped the team catch issues early.
        </p>

        <p>
          Outside of client work, I've led projects like <strong className="text-gray-900">MelloUp</strong> and <strong className="text-gray-900">Ibasho</strong>, 
          where I handled everything from responsive design and real-time integrations to accessibility and localization. 
          These experiences taught me the value of owning features end-to-end, collaborating closely with designers and 
          backend engineers, and making sure the end product works well for <em>everyone</em>—no matter where they are.
        </p>

        <p>
          I also enjoy experimenting with AI tools like Cursor and GitHub Copilot, which help me move faster while 
          keeping code clean and reliable. More than anything, I value being part of a team that shares ideas openly 
          and pushes each other to raise the bar.
        </p>

        <p>
          I'd love the chance to bring my experience with <strong className="text-gray-900">React, Next.js, and accessibility-first design</strong> to 
          Navan and help shape the next generation of your platform. Thanks for considering my application—I'd be 
          happy to share more about how I can contribute.
        </p>

        <div className="pt-4">
          <p className="mb-4">Best regards,</p>
          <p className="font-bold text-gray-900 text-lg">Nishant Choudhary</p>
        </div>
      </div>

      {/* Optional: Print styles */}
      <style jsx>{`
        @media print {
          .max-w-4xl {
            max-width: none;
            margin: 0;
            padding: 1rem;
            box-shadow: none;
          }
          
          .shadow-lg {
            box-shadow: none;
          }
          
          a {
            color: inherit;
            text-decoration: none;
          }
          
          .text-blue-600 {
            color: #374151;
          }
        }
      `}</style>
    </div>
  );
}