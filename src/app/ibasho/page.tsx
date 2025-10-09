"use client"

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Heart, Mail, X, Eye, MessageCircle, Shield, Users, Sparkles, Clock, CheckCircle, Star, Stars } from 'lucide-react';
import { toast } from "react-toastify";

// Type definitions
type Post = {
  id: number;
  image: string;
  caption: string;
  mood: string;
  author: string;
};

// Memoized components for better performance
const MemoizedIcon = React.memo(({ icon: Icon, className, ...props }: { icon: React.ComponentType<any>, className?: string }) => (
  <Icon className={className} {...props} aria-hidden="true" />
));

const MemoizedTestimonialCard = React.memo(({ testimonial, index }: { testimonial: Post, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay: index * 0.1 }}
    className="bg-white rounded-lg shadow-lg p-6 space-y-4"
    role="article"
    aria-label={`Testimonial from ${testimonial.author}`}
  >
    <div 
      className="w-full h-32 rounded-md"
      style={{ background: testimonial.image }}
      role="img"
      aria-label="Decorative gradient background"
    />
    <blockquote className="text-[#2B2B2B]/80 font-light italic">
      "{testimonial.caption}"
    </blockquote>
    <footer className="flex items-center justify-between">
      <span className="text-sm text-[#C8A2C8] font-medium" aria-label="Mood tag">{testimonial.mood}</span>
      <cite className="text-xs text-[#2B2B2B]/60 not-italic">— {testimonial.author}</cite>
    </footer>
  </motion.div>
));

const MemoizedFeatureCard = React.memo(({ feature, delay }: { 
  feature: { icon: React.ComponentType<any>, title: string, description: string, colors: string }, 
  delay: number 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ delay }}
    className="bg-white/70 backdrop-blur rounded-2xl p-8 shadow-lg"
    role="article"
  >
    <div className={`w-16 h-16 bg-gradient-to-br ${feature.colors} rounded-full flex items-center justify-center mb-6`}>
      <MemoizedIcon icon={feature.icon} className="w-8 h-8 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-[#2B2B2B] mb-4">{feature.title}</h3>
    <p className="text-[#2B2B2B]/70 leading-relaxed">
      {feature.description}
    </p>
  </motion.div>
));

const IbashoLanding = () => {
  // State management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [waitlistCount, setWaitlistCount] = useState(2847);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    setLoading(true)
    setMessage('')

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    if (res.ok) {
      toast.success(`You’re on the waitlist! ${<Stars />}`)
      setEmail('')
    } else {
        toast.error('Something went wrong!')
      setMessage(data.error || 'Something went wrong')
    }
    setLoading(false)
  }

  // Refs
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLDivElement>(null);

  // Memoized data
  const testimonials = useMemo<Post[]>(() => [
    { id: 1, image: 'linear-gradient(135deg, #F7DAD9 0%, #AFCBFF 100%)', caption: 'Finally, a space where I can be real without performing.', mood: '#authentic', author: 'Sarah M.' },
    { id: 2, image: 'linear-gradient(135deg, #C1D7AE 0%, #F9F9F9 100%)', caption: 'The weekly wrapped helped me see my growth patterns.', mood: '#healing', author: 'Alex K.' },
    { id: 3, image: 'linear-gradient(135deg, #F9F9F9 0%, #F7DAD9 100%)', caption: 'Privacy first means I can actually process my feelings.', mood: '#safe', author: 'Jordan L.' },
    { id: 4, image: 'linear-gradient(135deg, #F7DAD9 0%, #C8A2C8 100%)', caption: 'Connection without pressure - exactly what I needed.', mood: '#belonging', author: 'River T.' },
  ], []);

  const features = useMemo(() => [
    {
      icon: Shield,
      title: "Private first",
      description: "Every journal entry starts private. Reflect authentically without pressure to share or perform.",
      colors: "from-[#D9822B] to-[#C8A2C8]"
    },
    {
      icon: Heart,
      title: "Consent-based connection",
      description: "Anonymous invitations and mutual acceptance create safe spaces for deeper conversations.",
      colors: "from-[#C1D7AE] to-[#AFCBFF]"
    },
    {
      icon: Sparkles,
      title: "Gentle insights",
      description: "Weekly emotional patterns and growth insights that celebrate your journey, not judge it.",
      colors: "from-[#F7DAD9] to-[#C8A2C8]"
    }
  ], []);

  const problems = useMemo(() => [
    {
      icon: Eye,
      title: "Performance pressure",
      description: "Every post becomes a performance, making authentic expression impossible.",
      color: "red"
    },
    {
      icon: MessageCircle,
      title: "Shallow connections", 
      description: "Likes and comments replace genuine emotional support and understanding.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "No privacy",
      description: "Your most vulnerable moments become data points for algorithmic engagement.",
      color: "purple"
    }
  ], []);

  // Optimized parallax transforms with reduced calculations
  const heroY = useTransform(scrollY, [0, 1000], [0, -200]);
  const fogY = useTransform(scrollY, [0, 1000], [0, -300]);

  // Debounced mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth - 0.5) * 20,
      y: (e.clientY / window.innerHeight - 0.5) * 20
    });
  }, []);

  // Effect hooks with cleanup
  useEffect(() => {
    const debouncedHandler = debounce(handleMouseMove, 16); // ~60fps
    window.addEventListener('mousemove', debouncedHandler, { passive: true });
    return () => window.removeEventListener('mousemove', debouncedHandler);
  }, [handleMouseMove]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaitlistCount(prev => prev + Math.floor(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleEmailSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmitted) {
      setIsSubmitted(true);
      setWaitlistCount(prev => prev + 1);
      setTimeout(() => setIsSubmitted(false), 4000);
      setEmail('');
    }
  }, [email, isSubmitted]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const scrollToWaitlist = useCallback(() => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleJoinFromModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => scrollToWaitlist(), 100);
  }, [scrollToWaitlist]);

  return (
    <>
      {/* SEO Head content would go in a Head component in Next.js */}
      <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-[#F3E9DC] via-[#F7DAD9] to-[#F3E9DC] overflow-hidden">
        {/* Skip link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>

        {/* Minimal Navbar */}
        <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/40 border-b border-black/5" role="navigation" aria-label="Main navigation">
          <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-gradient-to-br from-[#D9822B] to-[#C8A2C8] rounded-lg flex items-center justify-center" role="img" aria-label="Ibasho logo">
                <MemoizedIcon icon={Heart} className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-lg font-semibold text-[#2B2B2B]">ibasho</h1>
              <span className="text-xs text-[#2B2B2B]/50 font-light" aria-label="Japanese translation">居場所</span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-sm text-[#2B2B2B]/70" aria-live="polite">
                <span className="font-medium text-[#D9822B]">{waitlistCount.toLocaleString()}</span> souls waiting
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleModalOpen}
                className="px-4 py-2 text-sm rounded-full border border-[#2B2B2B]/10 text-[#2B2B2B] hover:bg-[#2B2B2B]/5 transition-all focus:outline-none focus:ring-2 focus:ring-[#D9822B] focus:ring-offset-2"
                aria-label="Learn more about Ibasho"
              >
                Learn more
              </button>
              <button
                onClick={scrollToWaitlist}
                className="px-4 py-2 text-sm rounded-full bg-gradient-to-r from-[#D9822B] to-[#C8A2C8] text-white shadow-sm hover:opacity-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#D9822B] focus:ring-offset-2"
                aria-label="Join the waitlist"
              >
                Join waitlist
              </button>
            </div>
          </div>
        </nav>

        {/* Animated Background Fog - Optimized with reduced motion */}
        <motion.div 
          style={{ y: fogY }}
          className="fixed inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute inset-0 opacity-60">
            <motion.div
              animate={{ 
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(247, 218, 217, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 30%, rgba(175, 203, 255, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 40% 70%, rgba(247, 218, 217, 0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 60% 20%, rgba(175, 203, 255, 0.3) 0%, transparent 50%)',
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Main Content */}
        <main id="main-content">
          {/* Hero Section */}
          <motion.section 
            style={{ y: heroY }} 
            className="relative min-h-screen flex items-center justify-center px-4 pt-24"
            aria-labelledby="hero-heading"
          >
            <div className="text-center space-y-8 max-w-5xl mx-auto">
              {/* Floating Polaroid - Optimized animations */}
              <motion.div
                style={{
                  x: mousePosition.x,
                  y: mousePosition.y,
                  rotateX: mousePosition.y * 0.5,
                  rotateY: mousePosition.x * 0.5,
                }}
                animate={{ 
                  y: [-10, 10, -10],
                  rotateZ: [-2, 2, -2]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-64 h-80 mx-auto mb-8 bg-white rounded-lg shadow-2xl p-4 transform perspective-1000"
                role="img"
                aria-label="Decorative polaroid image representing a place to belong"
              >
                <div className="w-full h-3/4 bg-gradient-to-br from-pink-100 via-blue-100 to-gray-100 rounded-md mb-4 relative overflow-hidden">
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-br from-pink-200 to-blue-200"
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MemoizedIcon icon={Heart} className="w-8 h-8 text-gray-400 opacity-60" />
                  </div>
                </div>
                <p className="text-sm text-[#2B2B2B]/70 font-light text-center">A place where you belong</p>
              </motion.div>

              {/* Hero Text */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="space-y-6"
              >
                <h2 id="hero-heading" className="text-5xl md:text-7xl font-bold text-[#2B2B2B] leading-tight">
                  Your emotions deserve a{' '}
                  <span className="bg-gradient-to-r from-[#D9822B] to-[#C8A2C8] bg-clip-text text-transparent">
                    home
                  </span>
                </h2>
                <p className="text-xl md:text-2xl text-[#2B2B2B]/70 font-light max-w-3xl mx-auto leading-relaxed">
                  Private-first journaling meets gentle community. 
                  Share when ready, connect with consent, grow in safety.
                </p>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center justify-center space-x-6 text-[#2B2B2B]/60"
                role="group"
                aria-label="Social proof"
              >
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2" role="img" aria-label="User avatars">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 bg-gradient-to-br from-pink-200 to-blue-200 rounded-full border-2 border-white" />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{waitlistCount.toLocaleString()}+ waiting</span>
                </div>
                <div className="flex items-center space-x-1" role="img" aria-label="5 star rating">
                  {[1,2,3,4,5].map(i => (
                    <MemoizedIcon key={i} icon={Star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm ml-2">Early testers</span>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToWaitlist}
                className="relative px-8 py-4 bg-gradient-to-r from-[#D9822B]/90 to-[#C8A2C8]/90 text-white rounded-full font-medium text-lg shadow-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#D9822B] focus:ring-offset-2"
                aria-label="Reserve your space on the waitlist"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#D9822B] to-[#C8A2C8] opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                  aria-hidden="true"
                />
                <span className="relative z-10">Reserve your space</span>
              </motion.button>
            </div>
          </motion.section>

          {/* Problem Statement */}
          <section className="py-20 px-4 bg-gradient-to-br from-white/50 to-[#F3E9DC]/50" aria-labelledby="problems-heading">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.h2
                id="problems-heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-[#2B2B2B]"
              >
                Social media broke emotional authenticity
              </motion.h2>
              <div className="grid md:grid-cols-3 gap-8">
                {problems.map((problem, index) => (
                  <motion.div
                    key={problem.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index + 1) * 0.1 }}
                    className="space-y-4"
                    role="article"
                  >
                    <div className={`w-16 h-16 bg-${problem.color}-100 rounded-full flex items-center justify-center mx-auto`}>
                      <MemoizedIcon icon={problem.icon} className={`w-8 h-8 text-${problem.color}-500`} />
                    </div>
                    <h3 className="text-xl font-semibold text-[#2B2B2B]">{problem.title}</h3>
                    <p className="text-[#2B2B2B]/70">{problem.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Solution Features */}
          <section className="py-20 px-4" aria-labelledby="features-heading">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                id="features-heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-center text-[#2B2B2B] mb-16"
              >
                A different kind of digital space
              </motion.h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                  <MemoizedFeatureCard 
                    key={feature.title}
                    feature={feature} 
                    delay={index * 0.1} 
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="py-20 px-4 bg-gradient-to-br from-[#F7DAD9]/30 to-[#C1D7AE]/30" aria-labelledby="testimonials-heading">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                id="testimonials-heading"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-center text-[#2B2B2B] mb-16"
              >
                Early souls finding their place
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.map((testimonial, index) => (
                  <MemoizedTestimonialCard 
                    key={testimonial.id}
                    testimonial={testimonial} 
                    index={index} 
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Waitlist Section */}
          <section id="waitlist" className="py-20 px-4 bg-gradient-to-br from-[#2B2B2B] to-[#1f1f1f]" aria-labelledby="waitlist-heading">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 id="waitlist-heading" className="text-4xl md:text-5xl font-bold text-white leading-tight">
                  You don't need to perform.
                  <br />
                  <span className="text-pink-300">You just need a place to land.</span>
                </h2>
                
                <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto">
                  Join {waitlistCount.toLocaleString()} souls waiting for their emotional sanctuary.
                </p>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-3 gap-6 mb-12"
                role="list"
                aria-label="Waitlist benefits"
              >
                {["Early access", "Founding member perks", "Shape the community"].map((benefit) => (
                  <div key={benefit} className="flex items-center space-x-3 text-gray-300" role="listitem">
                    <MemoizedIcon icon={CheckCircle} className="w-5 h-5 text-green-400" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </motion.div>
              
              <motion.form
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                onSubmit={handleSubmit}
                className="max-w-md mx-auto space-y-4"
                aria-label="Join waitlist form"
              >
                <div className="relative">
                  <label htmlFor="email-input" className="sr-only">Your email address</label>
                  <input
                    id="email-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full px-6 py-4 bg-white/10 text-white placeholder-gray-300 rounded-full border border-gray-600 focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-opacity-50 backdrop-blur"
                    required
                    aria-describedby="email-help"
                  />
                  <MemoizedIcon icon={Mail} className="absolute right-4 top-4 w-5 h-5 text-gray-400" />
                </div>
                
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isSubmitted}
                //   onClick={handleSubmit}
                  className="w-full px-8 py-4 bg-gradient-to-r from-[#D9822B] to-[#C8A2C8] text-white rounded-full font-medium text-lg shadow-lg disabled:opacity-70 focus:outline-none focus:ring-2 focus:ring-[#D9822B] focus:ring-offset-2"
                  aria-describedby={isSubmitted ? "success-message" : undefined}
                >
                  {isSubmitted ? '✨ Welcome home — we\'ll whisper when ready' : 'Reserve your space'}
                </motion.button>
              </motion.form>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <p id="email-help" className="text-gray-300 font-light">
                  We'll whisper when it's ready. No spam, only softness.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MemoizedIcon icon={Clock} className="w-4 h-4" />
                    <span>Launching early 2025</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MemoizedIcon icon={Users} className="w-4 h-4" />
                    <span>Invite-only beta</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-12 px-4 bg-[#F3E9DC]" role="contentinfo">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="h-8 w-8 bg-gradient-to-br from-[#D9822B] to-[#C8A2C8] rounded-lg flex items-center justify-center" role="img" aria-label="Ibasho logo">
                <MemoizedIcon icon={Heart} className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-[#2B2B2B]">ibasho</span>
              <span className="text-sm text-[#2B2B2B]/50 font-light" aria-label="Japanese translation">居場所</span>
            </div>
            <p className="text-[#2B2B2B]/60 text-sm">
              A place where you belong. Built with love for authentic emotional expression.
            </p>
          </div>
        </footer>

        {/* Info Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              onClick={handleModalClose}
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl p-8 max-w-2xl w-full relative max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                role="document"
              >
                <button
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#D9822B] rounded-lg p-2"
                  aria-label="Close modal"
                >
                  <MemoizedIcon icon={X} className="w-6 h-6" />
                </button>
                
                <div className="space-y-6">
                  <header className="text-center">
                    <h3 id="modal-title" className="text-3xl font-bold text-[#2B2B2B] mb-4">What is Ibasho?</h3>
                    <p className="text-[#2B2B2B]/70 text-lg">居場所 — "A place where one belongs"</p>
                  </header>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-[#D9822B] pl-6">
                      <h4 className="font-semibold text-[#2B2B2B] mb-2">Private-First Journaling</h4>
                      <p className="text-[#2B2B2B]/70">Every entry begins as a private Polaroid-style journal. Reflect authentically without pressure.</p>
                    </div>
                    
                    <div className="border-l-4 border-[#C8A2C8] pl-6">
                      <h4 className="font-semibold text-[#2B2B2B] mb-2">Consent-Based Connection</h4>
                      <p className="text-[#2B2B2B]/70">Anonymous invitations and mutual acceptance create safe spaces for deeper conversations.</p>
                    </div>
                    
                    <div className="border-l-4 border-[#C1D7AE] pl-6">
                      <h4 className="font-semibold text-[#2B2B2B] mb-2">Weekly Emotional Wrapped</h4>
                      <p className="text-[#2B2B2B]/70">Spotify-style reflection summarizing moods, growth, and emotional patterns — celebrating, not judging.</p>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#F7DAD9]/60 to-[#C1D7AE]/50 rounded-lg p-6 text-center">
                    <blockquote className="text-[#2B2B2B] italic mb-4">
                      "A digital sanctuary for authentic emotional expression and gentle connection."
                    </blockquote>
                    <button
                      onClick={handleJoinFromModal}
                      className="px-6 py-3 bg-gradient-to-r from-[#D9822B] to-[#C8A2C8] text-white rounded-full font-medium shadow-lg hover:opacity-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#D9822B] focus:ring-offset-2"
                      aria-label="Join the waitlist from modal"
                    >
                      Join the waitlist
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Utility function for debouncing
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export default IbashoLanding;