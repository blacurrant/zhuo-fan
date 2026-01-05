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
                <span className="font-semibold text-gray-900 dark:text-white">Full-Stack Developer</span>
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
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              Craon is a next-generation web-based video editing platform that combines the power of AI with professional-grade editing tools to transform the way creators produce video content. Built with cutting-edge web technologies, Craon makes professional video editing accessible to everyone—from social media creators to marketing professionals.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              The platform leverages modern web APIs, cloud infrastructure, and machine learning to deliver desktop-class performance entirely in the browser, eliminating the need for expensive software licenses and powerful hardware.
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
                description: 'Automatic transcription with 30+ language support, frame-accurate synchronization, and customizable styling templates for social media.',
                tech: 'Speech-to-text AI • Canvas API • Live Preview',
              },
              {
                icon: <Film className="text-blue-500" size={32} />,
                title: 'Professional Timeline Editor',
                description: 'Multi-track editing with GPU-accelerated 60 FPS scrubbing, visual filmstrip preview, and complete undo/redo history.',
                tech: '13KB Canvas Renderer • Virtual Scrolling',
              },
              {
                icon: <Cloud className="text-green-500" size={32} />,
                title: 'Cloud-Native Architecture',
                description: 'Resumable uploads with 51KB multipart system, IndexedDB persistence, and automatic project saves. 99.9% success rate.',
                tech: 'Cloudflare R2 • WebSocket SSE • IndexedDB',
              },
              {
                icon: <Users className="text-orange-500" size={32} />,
                title: 'Real-Time Collaboration',
                description: 'Multiple users editing simultaneously with live cursors, conflict resolution, and built-in team chat.',
                tech: 'WebSocket • Server-Sent Events • Live Sync',
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
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <div className="text-sm text-purple-600 dark:text-purple-400 font-mono">
                  {feature.tech}
                </div>
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Code size={32} className="text-purple-500" />
              Technical Architecture
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

          {/* State Management */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              State Management Architecture
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              7 specialized Redux slices managing ~50,000 LOC with 100% TypeScript coverage:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {['videoSlice.ts', 'timelineSlice.ts', 'chatSlice.ts', 'uploadSlice.ts', 'historySlice.ts', 'subtitleSlice.ts', 'projectSlice.ts'].map((slice) => (
                <div key={slice} className="bg-white dark:bg-gray-800 p-3 rounded font-mono text-purple-600 dark:text-purple-400">
                  {slice}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Challenges */}
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
              Technical Challenges & Solutions
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                challenge: 'Upload Reliability for Large Files (>1GB)',
                problem: 'Network instability causing failed uploads and lost progress',
                solution: '51KB multipart upload system with chunked uploads, IndexedDB persistence, automatic resume, and backend sync verification',
                result: '99.9% success rate with exponential backoff retry',
              },
              {
                challenge: 'Video Playback Performance',
                problem: 'Smooth 60 FPS scrubbing with 4K video in browser',
                solution: 'HLS adaptive bitrate streaming, Canvas-based filmstrip (13KB renderer), Web Workers for thumbnails, RAF for playhead updates',
                result: '60 FPS timeline scrubbing even with high-res video',
              },
              {
                challenge: 'State Management Complexity',
                problem: 'Interconnected states across video, timeline, subtitles, chat, and upload',
                solution: 'Redux Toolkit with 7 normalized slices, optimized selectors with reselect, middleware for async operations',
                result: 'Consistent state management across 120+ components',
              },
              {
                challenge: 'Subtitle Synchronization',
                problem: 'Frame-accurate subtitle sync across playback, seek, and trim',
                solution: 'Centralized time management in Redux, event-driven architecture, Canvas rendering, React.memo optimization',
                result: 'Sub-second subtitle rendering updates',
              },
            ].map((item, index) => (
              <motion.div
                key={item.challenge}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Challenge {index + 1}: {item.challenge}
                </h3>
                <div className="space-y-3 text-gray-600 dark:text-gray-400">
                  <p><strong className="text-red-600 dark:text-red-400">Problem:</strong> {item.problem}</p>
                  <p><strong className="text-blue-600 dark:text-blue-400">Solution:</strong> {item.solution}</p>
                  <p><strong className="text-green-600 dark:text-green-400">Result:</strong> {item.result}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Measurable Impact */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <TrendingUp size={32} className="text-green-500" />
              Impact & Results
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { metric: '70%', label: 'Reduction in editing time vs traditional tools', color: 'purple' },
                { metric: '99.9%', label: 'Upload success rate for large files', color: 'blue' },
                { metric: '60 FPS', label: 'Timeline scrubbing performance', color: 'green' },
                { metric: '50,000+', label: 'Videos processed in Q1', color: 'orange' },
                { metric: '90%', label: 'User satisfaction rating', color: 'pink' },
                { metric: '<3s', label: 'Initial load time', color: 'yellow' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800"
                >
                  <div className={`text-4xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400`}>
                    {stat.metric}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Business Impact</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <strong>3x faster</strong> time-to-market for content creators</li>
                <li>• <strong>Same resources,</strong> more output for marketing teams</li>
                <li>• <strong>Non-technical users</strong> can create professional videos</li>
                <li>• <strong>Zero hardware/license costs</strong> for users</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Achievements */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Award size={32} className="text-yellow-500" />
              Technical Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                '100% TypeScript coverage across 50,000+ LOC',
                '120+ React components with optimized rendering',
                'Sub-second subtitle rendering updates',
                '< 3s initial load time with code splitting',
                'Web Workers for background processing',
                'Frame-accurate synchronization',
                'Resumable uploads with chunk-level retry',
                'GPU-accelerated Canvas timeline',
                'Virtual scrolling for large projects',
                'Full undo/redo system with history',
              ].map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex gap-3 items-start p-4 bg-white dark:bg-gray-800 rounded-lg"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={20} />
                  <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Learnings */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Key Learnings
            </h2>
            <div className="space-y-6">
              {[
                {
                  title: 'Browser Capabilities Have Advanced Significantly',
                  description: 'Modern web APIs (Canvas, WebAssembly, Workers) enable desktop-class applications that previously required native development.',
                },
                {
                  title: 'State Management is Critical for Complex UIs',
                  description: 'Managing interconnected video editing state required careful architecture—Redux Toolkit with normalized state proved essential.',
                },
                {
                  title: 'Progressive Enhancement Matters',
                  description: 'Building features incrementally (simple upload → resume → multipart chunking) enabled continuous user feedback and rapid iteration.',
                },
                {
                  title: 'Real-World Testing Reveals Hidden Complexity',
                  description: 'Edge cases like "refresh during upload" and "backend eventual consistency" only emerged through actual usage and monitoring.',
                },
                {
                  title: 'Performance Requires Intentional Design',
                  description: 'Every animation, state update, and render must be optimized. React DevTools Profiler and Chrome Performance tab were instrumental.',
                },
              ].map((learning, index) => (
                <motion.div
                  key={learning.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                    <span className="text-purple-500">💡</span>
                    {learning.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 pl-7">
                    {learning.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Future Roadmap */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <GitBranch size={32} className="text-blue-500" />
              Future Roadmap
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: '🚀', title: 'AI-Powered Editing Suggestions', desc: 'Scene detection and smart recommendations' },
                { icon: '🎨', title: 'Advanced Effects Library', desc: 'Transitions, filters, and motion graphics' },
                { icon: '📱', title: 'Native Mobile Apps', desc: 'iOS and Android with mobile-optimized UX' },
                { icon: '🔄', title: 'Version Control System', desc: 'Git-like branching for video projects' },
                { icon: '🌐', title: 'Plugin Ecosystem', desc: 'Third-party integrations and extensions' },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
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
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-8">
              Craon represents the convergence of modern web technologies and AI to solve real-world creative challenges. By building a sophisticated video editor entirely in the browser, we've demonstrated that web applications can deliver professional-grade tools with superior accessibility and collaboration features.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto">
              The project showcases <strong className="text-purple-600 dark:text-purple-400">full-stack development expertise</strong>, <strong className="text-blue-600 dark:text-blue-400">performance optimization</strong> for demanding real-time applications, <strong className="text-green-600 dark:text-green-400">user-centric design</strong>, and <strong className="text-orange-600 dark:text-orange-400">robust engineering</strong> handling complex state management and error scenarios.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(CraonCaseStudy);
