"use client";

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MelloupCase() {

    const router = useRouter();
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="px-6 py-20 container mx-auto">
      <div onClick={() => router.push('/landing')} className='text-lg flex items-center gap-1 border-b border-black/50 dark:border-white/50 w-full my-8 cursor-pointer dark:text-white'>
            <ArrowLeft size={20} />
            <p>back.</p>
        </div>
        <div className="text-start mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6">Melloup</h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
            An AI-powered SaaS platform that helps businesses measure and optimize the ROI of their
            event marketing through intelligent data insights.
          </p>
        </div>

        <div className="w-full h-96 md:h-full bg-gray-100 rounded-lg mb-20">
          <Image
            src="/melloup/melloup.png"
            alt="Melloup MVP dashboard showing ROI metrics, lead quality insights, and engagement tracking"
            width={1200}
            height={1000}
            className="w-full h-full object-cover rounded-lg brightness-125"
          />
        </div>
      </section>

      {/* My Role */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12">My Role</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            I was responsible for end-to-end design and development of Melloup's MVP, working
            closely with the founders to bring their vision to life in a short timeframe.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Frontend Development</h3>
              <p className="text-gray-700 dark:text-gray-300">Next.js + Tailwind CSS implementation</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">UI/UX Design</h3>
              <p className="text-gray-700 dark:text-gray-300">Clean, modern, and scalable interface design</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Product Translation</h3>
              <p className="text-gray-700 dark:text-gray-300">Translating founders' vision into functional web app</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12">The Challenge</h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
            Melloup needed a fully functional MVP built in a short timeframe to demonstrate their
            product vision to early customers and investors in the competitive SaaS market.
          </p>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-6">
              <p className="text-gray-700 dark:text-gray-300">
                Complex data visualization requirements for ROI, lead quality, and engagement
                metrics
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-6">
              <p className="text-gray-700 dark:text-gray-300">
                UI had to be simple for non-technical users while remaining powerful and
                comprehensive
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <p className="text-gray-700 dark:text-gray-300">
                Marketing website and product needed to build credibility with enterprise clients
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12">The Process</h2>
        <div className='flex gap-8'>

          <div className="space-y-16 max">
            <div className="w-full flex justify-between gap-8">
              <div>
                {' '}
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Discovery</h3>
                <p className="text-gray-700 dark:text-gray-300 max-w-5xl leading-relaxed mb-6">
                  Conducted intensive sessions with Melloup's founders to define core MVP features
                  and identify must-haves: dashboard, lead insights, and engagement tracking.
                </p>
              </div>
              {/* <div className="w-full h-64 bg-gray-100 rounded-lg">
                <Image
                  src=""
                  alt="Discovery session wireframes and feature prioritization for Melloup MVP"
                  width={800}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div> */}
            </div>

            <div className="w-full/50 flex justify-between gap-8">
              <div>
                {' '}
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Design</h3>
                <p className="text-gray-700 dark:text-gray-300 max-w-5xl leading-relaxed mb-6">
                  Created wireframes and UI flows to visualize the user journey. Designed a minimal,
                  professional interface to communicate trust and focused on responsive layouts for
                  event marketers using multiple devices.
                </p>
              </div>
              {/* <div className="w-full h-64 bg-gray-100 rounded-lg">
                <Image
                  src=""
                  alt="Melloup UI wireframes and design system showing responsive layouts"
                  width={800}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div> */}
            </div>

            <div className="w-full flex justify-between gap-8">
              <div>
                {' '}
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Development</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  Built the MVP in Next.js for performance and scalability. Styled with Tailwind CSS
                  for design consistency and fast iteration. Created reusable components and
                  integrated placeholder APIs for early demos.
                </p>
              </div>
              {/* <div className="w-full h-64 bg-gray-100 rounded-lg">
                <Image
                  src=""
                  alt="Melloup development process showing Next.js and Tailwind CSS implementation"
                  width={800}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div> */}
            </div>

            <div className="w-full flex justify-between gap-8">
              <div>
                {' '}
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  4. Testing & Iteration
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Shared builds frequently with the Melloup team for feedback. Iterated on UX by
                  simplifying dashboard navigation and improving readability of metrics based on
                  user testing sessions.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full h-full bg-gray-100 rounded-lg">
            <Image
              src=""
              alt="Melloup development process showing Next.js and Tailwind CSS implementation"
              width={1000}
              height={1000}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-16 text-start">
            The Solution
          </h2>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">🌐 Marketing Website</h3>
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-6">
                <Image
                  src=""
                  alt="Melloup marketing website with modern landing page and clear storytelling"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Modern, clean landing page design</li>
                <li>• Clear storytelling explaining AI-powered ROI tracking</li>
                <li>• Optimized for speed & SEO performance</li>
                <li>• Enterprise-focused credibility building</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                📊 Web Application (MVP)
              </h3>
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-6">
                <Image
                  src=""
                  alt="Melloup MVP dashboard with real-time ROI metrics and lead quality insights"
                  width={500}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <ul className="text-gray-700 dark:text-gray-300 space-y-2">
                <li>• Real-time dashboard with ROI metrics</li>
                <li>• Lead quality and engagement insights</li>
                <li>• Scalable component-based architecture</li>
                <li>• Responsive design for all devices</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12">Impact</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Business Results</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                <li>• Successfully launched MVP to early customers and investors</li>
                <li>• Secured early traction and credibility in the SaaS market</li>
                <li>• Created strong foundation for future feature development</li>
                <li>• Enabled rapid iteration based on user feedback</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Technical Achievements</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                <li>• Reduced development complexity with scalable Next.js stack</li>
                <li>• Achieved fast load times and responsive performance</li>
                <li>• Built reusable component library for future scaling</li>
                <li>• Implemented clean architecture for easy maintenance</li>
              </ul>
            </div>
          </div>

          <div className="w-full h-80 md:h-96 bg-gray-100 rounded-lg">
            <Image
              src=""
              alt="Melloup MVP success metrics and early customer feedback dashboard"
              width={1000}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-12">Key Learnings</h2>

          <div className="space-y-8">
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Speed vs Scalability Balance
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Building an MVP requires carefully balancing development speed with long-term
                scalability. The Next.js + Tailwind stack proved perfect for this balance.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Founder Collaboration is Crucial
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Early and frequent collaboration with founders is essential for prioritizing
                features and ensuring the product vision translates effectively to users.
              </p>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Modern Stack Advantages</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Tailwind CSS + Next.js proved to be a powerful combination for shipping MVPs quickly
                without compromising on design quality or performance.
              </p>
            </div>
          </div>

          <div className="w-full h-80 md:h-96 bg-gray-100 rounded-lg mt-12">
            <Image
              src=""
              alt="Before and after comparison showing wireframes vs final Melloup UI implementation"
              width={1000}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto text-start">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
            Ready to Build Your MVP?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-12">
            Let's work together to bring your product vision to life with modern technology and
            thoughtful design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <a
              href="https://www.melloup.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Melloup.io
            </a>
            <button onClick={() => router.push('/')} className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              See More Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
