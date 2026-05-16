'use client';
import React from 'react';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';
import { Zap, Film, Cloud, Users } from 'lucide-react';

const CraonCaseStudy: React.FC = () => {
  const metrics = [
    { value: '50K+', label: 'Videos Processed' },
    { value: '70%', label: 'Time Saved' },
    { value: '60 FPS', label: 'Timeline Performance' },
    { value: '99.9%', label: 'Upload Success' }
  ];

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <p>
          A web-based video editing platform combining AI automation with professional editing tools. Craon delivers desktop-class performance in the browser, making professional video editing accessible while reducing editing time by 70%.
        </p>
      )
    },
    {
      id: 'challenge',
      title: 'Challenge',
      content: (
        <div className="space-y-4">
          <p className="mb-6">Modern video creators face significant productivity barriers:</p>
          <ul className="space-y-3">
            <li>
              <strong>Too Complex:</strong> Steep learning curves with overwhelming interfaces
            </li>
            <li>
              <strong>Time-Consuming:</strong> Manual subtitles, timeline editing consume hours
            </li>
            <li>
              <strong>Hardware-Intensive:</strong> Powerful machines, expensive licenses required
            </li>
            <li>
              <strong>Collaboration-Limited:</strong> Difficult real-time teamwork and sharing
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'Solution',
      content: (
        <div className="space-y-6">
          <p>
            Craon leverages modern web technologies and AI to deliver a browser-based video editor rivaling desktop applications while offering superior accessibility and collaboration.
          </p>
          <div className="bg-replicate-surface-bone p-6 rounded-md border-l-4 border-replicate-primary">
            <h3 className="font-display text-lg font-bold mb-3">Core Innovation</h3>
            <p>
              AI-first approach combined with professional editing tools, delivering 70% time savings while maintaining broadcast-quality output.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'features',
      title: 'Core Features',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: '⚡',
              title: 'AI Subtitle Generation',
              desc: 'Automatic transcription with 30+ language support and frame-accurate sync.'
            },
            {
              icon: '🎬',
              title: 'Professional Timeline',
              desc: 'Multi-track editing with 60 FPS GPU-accelerated scrubbing.'
            },
            {
              icon: '☁️',
              title: 'Resumable Uploads',
              desc: 'Chunked multipart uploads with automatic resume and 99.9% success.'
            },
            {
              icon: '👥',
              title: 'Real-Time Collaboration',
              desc: 'Multiple users editing simultaneously with live sync.'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-replicate-surface-bone p-6 rounded-md">
              <div className="text-3xl mb-3">{feature.icon}</div>
              <h3 className="font-display font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-replicate-body text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'tech',
      title: 'Tech Stack',
      isDark: true,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              category: 'Frontend',
              items: ['Next.js 16', 'React 19', 'TypeScript', 'Redux Toolkit', 'Tailwind CSS 4', 'Framer Motion']
            },
            {
              category: 'Video Processing',
              items: ['HLS.js', 'FFmpeg.wasm', 'Canvas API', 'Web Workers', 'react-moveable']
            },
            {
              category: 'Backend',
              items: ['REST API', 'WebSocket SSE', 'Cloudflare R2', 'Axios']
            },
            {
              category: 'Storage',
              items: ['IndexedDB', 'R2 Storage', 'HLS Streaming']
            }
          ].map((stack, idx) => (
            <div key={idx}>
              <h3 className="font-display font-bold mb-3">{stack.category}</h3>
              <ul className="space-y-1 text-replicate-on-dark-mute text-sm font-body">
                {stack.items.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'challenges',
      title: 'Key Challenges Solved',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Large File Uploads',
              solution: 'Chunked multipart upload system with automatic resume',
              result: '99.9% success rate'
            },
            {
              title: 'Real-Time Performance',
              solution: 'Canvas-based timeline with HLS streaming and Web Workers',
              result: '60 FPS scrubbing'
            },
            {
              title: 'Complex State Management',
              solution: 'Redux Toolkit with normalized slices and optimized selectors',
              result: '120+ components'
            },
            {
              title: 'Frame-Accurate Sync',
              solution: 'Centralized time management with event-driven architecture',
              result: 'Sub-second updates'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-replicate-surface-bone p-6 rounded-md border-l-4 border-replicate-primary">
              <h3 className="font-display font-bold mb-2">{item.title}</h3>
              <p className="text-replicate-body text-sm mb-3">{item.solution}</p>
              <div className="text-replicate-badge-success text-sm font-display font-bold">
                ✓ {item.result}
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'impact',
      title: 'Impact & Learnings',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { metric: '70%', label: 'Time saved' },
              { metric: '60 FPS', label: 'Timeline performance' },
              { metric: '99.9%', label: 'Upload success' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-replicate-surface-bone rounded-md">
                <div className="text-3xl font-bold text-replicate-primary mb-2">
                  {stat.metric}
                </div>
                <div className="text-replicate-body text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h3 className="font-display font-bold text-lg mb-4">Key Takeaways</h3>
            <ul className="space-y-3">
              {[
                'Modern web APIs enable desktop-class performance',
                'Complex state requires intentional architecture',
                'Progressive enhancement enables rapid iteration',
                'Performance optimization is non-negotiable'
              ].map((point, idx) => (
                <li key={idx} className="flex gap-3">
                  <span className="text-replicate-primary flex-shrink-0">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )
    }
  ];

  return (
    <CaseStudyTemplate
      title="Craon"
      subtitle="Next-Generation Web-Based Video Editor"
      description="Combining AI automation with professional editing tools to democratize video production"
      meta={{
        role: 'Lead Frontend Engineer',
        duration: '6 months (ongoing)',
        industry: 'Creative Software',
        status: 'Active Development'
      }}
      metrics={metrics}
      sections={sections}
      backHref="/journey"
    />
  );
};

export default React.memo(CraonCaseStudy);
