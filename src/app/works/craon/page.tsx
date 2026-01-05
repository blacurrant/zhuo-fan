'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Cloud, Users, Film, Code, TrendingUp, Award, GitBranch, Sparkles, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CraonCaseStudy: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-950 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5" />
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
            
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-gray-900 dark:text-white mb-6">
              Craon
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
              Next-Generation Web-Based Video Editor
            </p>
            
            <p className="text-lg text-gray-500 dark:text-gray-500 mb-12 max-w-2xl mx-auto">
              Combining AI automation with professional editing tools to democratize video production
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base mb-12">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Role</span>
                <span className="font-semibold text-gray-900 dark:text-white">Lead Frontend Engineer</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Duration</span>
                <span className="font-semibold text-gray-900 dark:text-white">6 months (ongoing)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Industry</span>
                <span className="font-semibold text-gray-900 dark:text-white">Creative Software</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Status</span>
                <span className="font-semibold text-green-600 dark:text-green-400">Active Development</span>
              </div>
            </div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">50K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Videos Processed</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">70%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Time Saved</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">60 FPS</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Timeline Performance</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Upload Success</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Project Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              A web-based video editing platform combining AI automation with professional editing tools. Craon delivers desktop-class performance in the browser, making professional video editing accessible while reducing editing time by 70%.
            </p>
          </motion.div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              The Challenge
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Modern video creators face a significant productivity barrier:
            </p>
            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="text-purple-500 font-bold">•</span>
                <span><strong>Too Complex:</strong> Steep learning curves with overwhelming interfaces requiring extensive technical knowledge</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 font-bold">•</span>
                <span><strong>Time-Consuming:</strong> Manual subtitle creation, timeline editing, and repetitive tasks consume hours</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 font-bold">•</span>
                <span><strong>Hardware-Intensive:</strong> Requiring powerful local machines, expensive licenses, and massive storage</span>
              </li>
              <li className="flex gap-3">
                <span className="text-purple-500 font-bold">•</span>
                <span><strong>Collaboration-Limited:</strong> Difficult to share and work on projects in real-time across teams</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* The Solution */}
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
              Craon leverages modern web technologies and AI to deliver a browser-based video editor that rivals desktop applications in capability while offering superior accessibility and collaboration features.
            </p>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-6 rounded-r-lg mb-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="text-purple-500" size={20} />
                Core Innovation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                AI-first approach combined with professional editing tools, delivering 70% time savings while maintaining broadcast-quality output.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Features */}
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
              Core Features
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Zap className="text-purple-500" size={32} />,
                title: 'AI Subtitle Generation',
                description: 'Automatic transcription with 30+ language support and frame-accurate synchronization.',
              },
              {
                icon: <Film className="text-blue-500" size={32} />,
                title: 'Professional Timeline',
                description: 'Multi-track editing with 60 FPS GPU-accelerated scrubbing and visual filmstrip preview.',
              },
              {
                icon: <Cloud className="text-green-500" size={32} />,
                title: 'Resumable Uploads',
                description: 'Chunked multipart uploads with automatic resume and 99.9% success rate for large files.',
              },
              {
                icon: <Users className="text-orange-500" size={32} />,
                title: 'Real-Time Collaboration',
                description: 'Multiple users editing simultaneously with live sync and conflict resolution.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="mb-4">{feature.icon}</div>
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

      {/* Technical Architecture */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Tech Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Frontend</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Next.js 16</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Redux Toolkit</li>
                <li>• Tailwind CSS 4</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Video Processing</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• HLS.js</li>
                <li>• FFmpeg.wasm</li>
                <li>• Canvas API</li>
                <li>• Web Workers</li>
                <li>• react-moveable</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Backend</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• REST API</li>
                <li>• WebSocket SSE</li>
                <li>• Cloudflare R2</li>
                <li>• Axios</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Storage</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• IndexedDB</li>
                <li>• R2 Storage</li>
                <li>• HLS Streaming</li>
              </ul>
            </div>
          </div>


        </div>
      </section>

      {/* Key Challenges */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Key Challenges Solved
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Large File Uploads',
                solution: 'Chunked multipart upload system with automatic resume and IndexedDB persistence',
                result: '99.9% success rate',
              },
              {
                title: 'Real-Time Performance',
                solution: 'Canvas-based timeline with HLS streaming and Web Workers for background processing',
                result: '60 FPS scrubbing',
              },
              {
                title: 'Complex State Management',
                solution: 'Redux Toolkit with normalized slices and optimized selectors',
                result: '120+ components',
              },
              {
                title: 'Frame-Accurate Sync',
                solution: 'Centralized time management with event-driven architecture',
                result: 'Sub-second updates',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{item.solution}</p>
                <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                  ✓ {item.result}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
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
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              {[
                { metric: '70%', label: 'Time saved', color: 'purple' },
                { metric: '60 FPS', label: 'Timeline performance', color: 'green' },
                { metric: '99.9%', label: 'Upload success', color: 'blue' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className={`text-4xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}>
                    {stat.metric}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>


          </motion.div>
        </div>
      </section>



      {/* Key Learnings */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Key Takeaways
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Modern web APIs enable desktop-class performance',
                'Complex state requires intentional architecture',
                'Progressive enhancement enables rapid iteration',
                'Performance optimization is non-negotiable',
              ].map((learning, index) => (
                <motion.div
                  key={learning}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-3 items-start p-4 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <span className="text-purple-500 text-xl flex-shrink-0">💡</span>
                  <span className="text-gray-700 dark:text-gray-300">{learning}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>



      {/* Conclusion */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Conclusion
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              Craon demonstrates how modern web technologies can deliver professional-grade tools with desktop-class performance. The project showcases full-stack development, real-time performance optimization, and robust engineering for complex video editing workflows.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(CraonCaseStudy);
