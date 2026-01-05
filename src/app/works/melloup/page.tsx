'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Users, TrendingUp, Award, CheckCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const MelloupCaseStudy: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-gray-900 dark:via-blue-900/20 dark:to-gray-950 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
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
              MelloUp
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
              AI-Powered Event Marketing ROI Platform
            </p>
            
            <p className="text-lg text-gray-500 dark:text-gray-500 mb-12 max-w-2xl mx-auto">
              Helping businesses measure and optimize event marketing ROI through intelligent data insights
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base mb-12">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Role</span>
                <span className="font-semibold text-gray-900 dark:text-white">Founding Engineer</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Duration</span>
                <span className="font-semibold text-gray-900 dark:text-white">3 months</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Industry</span>
                <span className="font-semibold text-gray-900 dark:text-white">B2B SaaS</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Type</span>
                <span className="font-semibold text-gray-900 dark:text-white">MVP · Web App</span>
              </div>
            </div>

            {/* Key Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto"
            >
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">3mo</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">MVP Delivery</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">100%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Next.js Stack</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">Fast</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Iteration Speed</div>
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
              MelloUp is an AI-powered SaaS platform designed to help businesses measure and optimize the ROI of their event marketing campaigns. As the founding engineer, I was responsible for translating the founders' vision into a functional MVP within a tight 3-month timeframe.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              The platform provides real-time dashboards, lead quality insights, and engagement tracking—empowering marketing teams to make data-driven decisions and demonstrate clear ROI to stakeholders.
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
              MelloUp needed a fully functional MVP in a short timeframe to demonstrate product vision to early customers and investors:
            </p>
            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>Complex Data Visualization:</strong> ROI metrics, lead quality tracking, and engagement analytics required intuitive visual design</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>Enterprise Credibility:</strong> Marketing website and product needed to build trust with enterprise clients from day one</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>User Experience:</strong> Interface had to be simple for non-technical users while remaining powerful and comprehensive</span>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 font-bold">•</span>
                <span><strong>Time Constraints:</strong> Tight 3-month deadline to deliver both marketing site and functional MVP</span>
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
              Built a modern, scalable MVP using Next.js and Tailwind CSS that delivered both a credible marketing presence and a functional product dashboard. The solution balanced rapid development with long-term maintainability.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="text-blue-500" size={20} />
                Core Innovation
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Component-based architecture with reusable design system enabled rapid feature iteration while maintaining visual consistency and professional appearance.
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
              Key Deliverables
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: <Zap className="text-blue-500" size={32} />,
                title: 'Marketing Website',
                description: 'Modern landing page with clear storytelling, SEO optimization, and enterprise-focused credibility building.',
                tech: 'Next.js · TailwindCSS · Fast Loading',
              },
              {
                icon: <Users className="text-purple-500" size={32} />,
                title: 'Web Application MVP',
                description: 'Real-time dashboard with ROI metrics, lead quality insights, engagement tracking, and responsive design.',
                tech: 'React Components · Data Visualization',
              },
              {
                icon: <TrendingUp className="text-green-500" size={32} />,
                title: 'Analytics Dashboard',
                description: 'Comprehensive metrics visualization including event performance, lead conversion funnel, and engagement trends.',
                tech: 'Real-time Updates · Clean UI',
              },
              {
                icon: <Award className="text-orange-500" size={32} />,
                title: 'Component Library',
                description: 'Scalable, reusable component system for rapid future development and consistent design language.',
                tech: 'Modular Architecture · Design System',
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
                <div className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                  {feature.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Stack */}
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
              Technical Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Frontend</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Next.js 14</li>
                <li>• React</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Development</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Component-based</li>
                <li>• Responsive Design</li>
                <li>• SEO Optimized</li>
                <li>• Fast Iteration</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Deployment</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Vercel</li>
                <li>• CI/CD Pipeline</li>
                <li>• Performance Monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Results */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
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
                { metric: '3 months', label: 'MVP delivery from concept to launch' },
                { metric: '100%', label: 'On-time delivery within budget' },
                { metric: 'Early traction', label: 'Secured with investors and customers' },
                { metric: 'Scalable', label: 'Foundation for future development' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-800"
                >
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    {stat.metric}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Business Impact</h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>• <strong>Successfully launched</strong> MVP to early customers and investors</li>
                <li>• <strong>Secured credibility</strong> in competitive B2B SaaS market</li>
                <li>• <strong>Created foundation</strong> for rapid feature iteration</li>
                <li>• <strong>Enabled data-driven</strong> product decisions through user feedback</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical Achievements */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
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
                'Fast load times with optimized Next.js',
                'Reusable component library for scaling',
                'Clean architecture for easy maintenance',
                'Responsive design across all devices',
                'SEO-optimized marketing pages',
                'Scalable Next.js + Tailwind stack',
              ].map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex gap-3 items-start p-4 bg-gray-50 dark:bg-gray-900 rounded-lg"
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
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
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
                  title: 'Speed vs Scalability Balance',
                  description: 'Building MVPs requires carefully balancing development speed with long-term scalability. Next.js + Tailwind proved perfect for this balance.',
                },
                {
                  title: 'Founder Collaboration is Crucial',
                  description: 'Early and frequent collaboration with founders is essential for prioritizing features and ensuring product vision translates effectively to users.',
                },
                {
                  title: 'Modern Stack Advantages',
                  description: 'Tailwind CSS + Next.js enabled rapid MVP shipping without compromising design quality or performance, proving invaluable for tight deadlines.',
                },
                {
                  title: 'Component-Based Thinking',
                  description: 'Building reusable components from day one accelerates development and ensures consistency as the product scales.',
                },
              ].map((learning, index) => (
                <motion.div
                  key={learning.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                    <span className="text-blue-500">💡</span>
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
              MelloUp demonstrates how modern web technologies enable rapid MVP development without sacrificing quality. By choosing a scalable tech stack and maintaining close collaboration with founders, we delivered a product that successfully launched to customers and investors on schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.melloup.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Visit MelloUp.io
              </a>
              <button
                onClick={() => router.push('/landing')}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                See More Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(MelloupCaseStudy);
