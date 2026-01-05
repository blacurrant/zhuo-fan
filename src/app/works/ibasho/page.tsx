'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Lock, Users, TrendingUp, Award, CheckCircle, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const IbashoCaseStudy: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-purple-50 to-white dark:from-gray-900 dark:via-rose-900/20 dark:to-gray-950 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-purple-500/5 to-orange-500/5" />
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
              Ibasho
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto">
              Digital Sanctuary for Authentic Emotional Expression
            </p>
            
            <p className="text-lg text-gray-500 dark:text-gray-500 mb-12 max-w-2xl mx-auto">
              居場所 — "A place where one belongs" · Privacy-first journaling meets gentle connection
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base mb-12">
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Role</span>
                <span className="font-semibold text-gray-900 dark:text-white">Lead Designer & Developer</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Duration</span>
                <span className="font-semibold text-gray-900 dark:text-white">4 months</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Industry</span>
                <span className="font-semibold text-gray-900 dark:text-white">Digital Wellness</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 dark:text-gray-500">Type</span>
                <span className="font-semibold text-gray-900 dark:text-white">Web App · PWA</span>
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
                <div className="text-3xl md:text-4xl font-bold text-rose-600 dark:text-rose-400">Private</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Privacy First</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 dark:text-purple-400">Consent</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Based Connection</div>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6 rounded-lg">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">Gentle</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Safe Interactions</div>
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
              Ibasho (居場所) is a digital sanctuary designed for authentic emotional expression and gentle human connection. In a world of performative social media, Ibasho creates a safe space where reflection comes before sharing, and genuine emotions are celebrated over curated highlights.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              The platform combines Polaroid-style private journaling with consent-based community features, fostering emotional authenticity while respecting user privacy and boundaries. Every interaction is designed to feel warm, intentional, and human.
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
              In our hyper-connected world, authentic emotional expression has become increasingly rare:
            </p>
            <ul className="space-y-4 text-lg text-gray-600 dark:text-gray-400">
              <li className="flex gap-3">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Performative Culture:</strong> Social media platforms prioritize performance over presence, leaving users feeling isolated despite constant connectivity</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Privacy Concerns:</strong> Users want to express emotions authentically but fear judgment from public sharing</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Unwanted Engagement:</strong> Traditional social platforms create pressure through unsolicited interactions and constant notifications</span>
              </li>
              <li className="flex gap-3">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Emotional Fatigue:</strong> Need for a space that fosters reflection and genuine connection without overwhelming users</span>
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
              Ibasho creates a private-first environment where users can journal authentically, then optionally share with a consent-based community. The design philosophy emphasizes warmth, safety, and intentional connection over viral engagement.
            </p>
            
            <div className="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <Sparkles className="text-rose-500" size={20} />
                Core Philosophy
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Every entry begins as private, ensuring authentic reflection without performative pressure. Community features are opt-in, consent-based, and designed to foster empathy over validation.
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
                icon: <Lock className="text-rose-500" size={32} />,
                title: 'Private-First Journaling',
                description: 'Polaroid-style visual entries with photos, captions, and mood metadata. Every entry begins private, allowing authentic reflection without pressure.',
                tech: 'Privacy-Focused · Visual Journaling',
              },
              {
                icon: <Heart className="text-purple-500" size={32} />,
                title: 'Community Postcards',
                description: 'Optional sharing of entries as community postcards with empathic reactions. Users choose what, when, and how to share.',
                tech: 'Consent-Based · Gentle Reactions',
              },
              {
                icon: <Users className="text-orange-500" size={32} />,
                title: 'Anonymous Connections',
                description: 'Mutual acceptance creates safe spaces for deeper conversations. All interactions are wanted and welcomed, never intrusive.',
                tech: 'Anonymous · Mutual Consent',
              },
              {
                icon: <TrendingUp className="text-green-500" size={32} />,
                title: 'Weekly Emotional Wrapped',
                description: 'Spotify-style reflection summarizing moods, growth, and emotional patterns. Helps users track their emotional journey.',
                tech: 'Insights · Growth Tracking',
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
                <div className="text-sm text-rose-600 dark:text-rose-400 font-mono">
                  {feature.tech}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Philosophy */}
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
              Design Philosophy
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              The visual identity reflects core values of gentle, authentic connection. Warm earth tones create safety, while Polaroid-style cards evoke nostalgia and intimacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Typography</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• <strong>Headings:</strong> Warm serif (Cormorant Garamond)</li>
                <li>• <strong>Body:</strong> Clean sans-serif (Inter)</li>
                <li>• <strong>Accent:</strong> Handwritten for prompts</li>
              </ul>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Color Palette</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Oatmeal Beige · Dusty Rose</li>
                <li>• Sage Green · Midnight Blue</li>
                <li>• Terracotta · Lavender Mist</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Stack */}
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
              Technical Stack
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Frontend</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Next.js & React for UI</li>
                <li>• Tailwind CSS responsive design</li>
                <li>• Framer Motion & GSAP animations</li>
                <li>• Privacy-first architecture</li>
                <li>• PWA capabilities</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Backend & Security</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Supabase database & auth</li>
                <li>• Encrypted storage for privacy</li>
                <li>• GDPR-compliant data handling</li>
                <li>• Anonymous chat system</li>
                <li>• Secure user authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact & Results */}
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
              Design Impact
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { title: 'Private First', description: 'Every interaction begins with personal reflection' },
                { title: 'Consent Based', description: 'All connections require mutual acceptance' },
                { title: 'Authenticity', description: 'Genuine expression over social performance' },
              ].map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg"
                >
                  <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mb-2">
                    {principle.title}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gray-900 dark:text-white mb-3">Platform Values</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Ibasho represents a new paradigm in digital wellness—prioritizing authentic emotional expression over performative social media interactions, creating a safe haven for genuine human connection.
              </p>
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
                'Privacy-first architecture with encryption',
                'GDPR-compliant data handling',
                'Anonymous chat system implementation',
                'Polaroid-style visual journal UI',
                'Smooth animations with Framer Motion',
                'Responsive PWA across all devices',
                'Warm, accessible design system',
                'Consent-based interaction flows',
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
                  title: 'Privacy as Foundation',
                  description: 'Building privacy-first from the ground up creates user trust and enables authentic expression in ways that added-on privacy features cannot.',
                },
                {
                  title: 'Design for Emotion',
                  description: 'Every color, animation, and interaction should evoke the right emotional response. Warm tones and gentle transitions create psychological safety.',
                },
                {
                  title: 'Consent is Key',
                  description: 'Making all social features opt-in with clear consent reduces anxiety and empowers users to control their experience and boundaries.',
                },
                {
                  title: 'Slow Social is Better',
                  description: 'Counter to viral engagement metrics, intentional and slow social interactions create deeper, more meaningful connections.',
                },
              ].map((learning, index) => (
                <motion.div
                  key={learning.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-gradient-to-r from-rose-50 to-purple-50 dark:from-rose-900/20 dark:to-purple-900/20 rounded-lg"
                >
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 flex items-start gap-2">
                    <span className="text-rose-500">💡</span>
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
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What's Next
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl mx-auto mb-12">
              Ibasho continues to evolve as a sanctuary for authentic emotional expression, with upcoming features including guided audio journaling, therapist reflections, and seasonal wellness packs—all designed with the same gentle, privacy-first philosophy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="https://ibasho.vercel.app/login">
                <button className="px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors">
                  View Live Project
                </button>
              </Link>
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

export default React.memo(IbashoCaseStudy);
