"use client"

import { ArrowBigLeft, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function IbashoCase() {

    const router = useRouter();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero Section */}
      <section className="px-6 py-20 container mx-auto">
        <div onClick={() => router.push('/landing')} className='text-lg flex items-center gap-1 border-b border-black/50 w-full my-8 cursor-pointer'>
            <ArrowLeft size={20} />
            <p>back.</p>
        </div>
        <div className="text-start mb-16">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-6">Ibasho</h1>
          <p className="text-xl  text-start md:text-2xl text-gray-600 max-w-3xl leading-relaxed">
            A digital sanctuary for authentic emotional expression and gentle connection. 居場所 —
            "A place where one belongs."
          </p>
        </div>

        <div className="w-full h-96 md:h-[600px] bg-gray-100 rounded-lg mb-20">
          <Image
            src=""
            alt="Ibasho app interface showing the main journaling dashboard"
            width={1200}
            height={600}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </section>

      {/* Project Overview */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">The Challenge</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
            In our hyper-connected world, authentic emotional expression has become increasingly
            rare. Social media platforms prioritize performance over presence, leaving users feeling
            more isolated despite constant connectivity.
          </p>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            We needed to create a space that fostered genuine emotional authenticity, where
            reflection comes before sharing, and where consent-based interactions replace
            unsolicited engagement.
          </p>
        </div>
      </section>

      {/* Solution */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">My Solution</h2>
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Private-First Journaling
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Every entry begins as a private Polaroid-style journal. Users can reflect
                authentically without the pressure of immediate sharing or social validation.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Consent-Based Connection
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Anonymous invitations and mutual acceptance create safe spaces for deeper
                conversations, ensuring all interactions are wanted and welcomed.
              </p>
            </div>
          </div>

          <div className="w-full h-80 md:h-96 bg-gray-100 rounded-lg mb-16">
            <Image
              src=""
              alt="Ibasho private journaling interface with Polaroid-style cards"
              width={1000}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-16 text-start">
            Key Features
          </h2>

          <div className="grid md:grid-cols-3 gap-12 mb-20">
            <div className="text-start">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-6">
                <Image
                  src=""
                  alt="Daily journaling feature with mood tracking"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Daily Emotional Check-ins
              </h3>
              <p className="text-gray-600">
                Polaroid-style visual entries with photos, captions, and mood metadata
              </p>
            </div>

            <div className="text-start">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-6">
                <Image
                  src=""
                  alt="Community postcards feature showing gentle interactions"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Postcards</h3>
              <p className="text-gray-600">
                Optional sharing of journal entries as community postcards with empathic reactions
              </p>
            </div>

            <div className="text-start">
              <div className="w-full h-48 bg-gray-100 rounded-lg mb-6">
                <Image
                  src=""
                  alt="Weekly emotional wrapped report interface"
                  width={400}
                  height={300}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Weekly Emotional Wrapped</h3>
              <p className="text-gray-600">
                Spotify-style reflection summarizing moods, growth, and emotional patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Design System */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">Design Philosophy</h2>

          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Visual Identity</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Our design system reflects the core philosophy of gentle, authentic connection. Warm
              earth tones create a sense of safety, while Polaroid-style cards evoke nostalgia and
              intimacy.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Typography</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>Headings: Warm serif (Cormorant Garamond)</li>
                  <li>Body: Clean sans-serif (Inter)</li>
                  <li>Accent: Handwritten for prompts</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Color Palette</h4>
                <ul className="text-gray-700 space-y-1">
                  <li>Oatmeal Beige, Dusty Rose</li>
                  <li>Sage Green, Midnight Blue</li>
                  <li>Terracotta, Lavender Mist</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full h-80 md:h-96 bg-gray-100 rounded-lg">
            <Image
              src=""
              alt="Ibasho design system showcase with color palette and typography"
              width={1000}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Technical Implementation */}
      <section className="px-6 py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">Technical Stack</h2>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Frontend</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Next.js & React for robust user interfaces</li>
                <li>• Tailwind CSS for responsive design</li>
                <li>• Framer Motion & GSAP for smooth animations</li>
                <li>• Privacy-first architecture</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Backend</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Supabase for database & authentication</li>
                <li>• Encrypted storage for user privacy</li>
                <li>• GDPR-compliant data handling</li>
                <li>• Anonymous chat system</li>
              </ul>
            </div>
          </div>

          <div className="w-full h-80 md:h-96 bg-gray-100 rounded-lg">
            <Image
              src=""
              alt="Technical architecture diagram of Ibasho platform"
              width={1000}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Results & Impact */}
      {/* <section className="px-6 py-20 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-12">
            Impact
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-16">
            Ibasho represents a new paradigm in digital wellness — prioritizing authentic 
            emotional expression over performative social media interactions.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">Private First</div>
              <p className="text-gray-600">Every interaction begins with personal reflection</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">Consent Based</div>
              <p className="text-gray-600">All connections require mutual acceptance</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">Authenticity</div>
              <p className="text-gray-600">Genuine expression over social performance</p>
            </div>
          </div>
          
          <div className="w-full h-80 md:h-96 bg-gray-100 rounded-lg">
            <Image 
              src="" 
              alt="Ibasho app success metrics and user testimonials"
              width={1000}
              height={400}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </section> */}

      {/* Next Steps */}
      <section className="px-6 py-20">
        <div className="container mx-auto text-start">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">What's Next</h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-12">
            Ibasho continues to evolve as a sanctuary for authentic emotional expression, with
            upcoming features including guided audio journaling, therapist reflections, and seasonal
            wellness packs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <button className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
              View Live Project
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
              See More Work
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
