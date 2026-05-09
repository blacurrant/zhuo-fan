'use client';
import React from 'react';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';

const IbashoCaseStudy: React.FC = () => {
  const metrics = [
    { value: 'Private', label: 'Privacy First' },
    { value: 'Consent', label: 'Based Connection' },
    { value: 'Gentle', label: 'Safe Interactions' }
  ];

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <p>
          A privacy-first digital sanctuary for authentic emotional expression. Ibasho (居場所 — "a place where one belongs") merges journaling with gentle connection, enabling users to process emotions safely while building meaningful consent-based relationships.
        </p>
      )
    },
    {
      id: 'challenge',
      title: 'Challenge',
      content: (
        <div className="space-y-4">
          <p className="mb-6">Digital wellness platforms struggle with fundamental conflicts:</p>
          <ul className="space-y-3">
            <li>
              <strong>Privacy Paradox:</strong> Platforms monetize data while claiming privacy
            </li>
            <li>
              <strong>Connection Anxiety:</strong> Social features breed comparison and validation-seeking
            </li>
            <li>
              <strong>Emotional Safety:</strong> Users hesitate to be vulnerable in exposed environments
            </li>
            <li>
              <strong>Consent Gaps:</strong> Data sharing is opaque and rarely truly consensual
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
            Ibasho inverts platform incentives: journaling remains private by default, connection requires explicit consent, and the interface reflects emotional safety rather than engagement metrics.
          </p>
          <div className="bg-replicate-surface-bone p-6 rounded-md border-l-4 border-replicate-primary">
            <h3 className="font-display text-lg font-bold mb-3">Core Philosophy</h3>
            <p>
              Privacy is a feature, not a setting. Consent is active, not assumed. Emotional intelligence guides UX. Every decision prioritizes user agency over platform growth.
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
              icon: '🔒',
              title: 'End-to-End Encryption',
              desc: 'All journals encrypted with user-held keys. Platform cannot read entries.'
            },
            {
              icon: '🤝',
              title: 'Consent-Based Sharing',
              desc: 'Share specific entries with explicit, revocable permission tokens.'
            },
            {
              icon: '💭',
              title: 'Emotional Journaling',
              desc: 'Prompts guide reflection without manipulating towards specific emotions.'
            },
            {
              icon: '🌱',
              title: 'Gentle Social',
              desc: 'Asynchronous sharing, no feeds, no likes, no algorithmic ranking.'
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
      title: 'Tech Stack & Security',
      isDark: true,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              category: 'Frontend',
              items: ['Next.js 16', 'React 19', 'TweetNaCl.js (NaCl crypto)', 'TypeScript', 'Tailwind CSS']
            },
            {
              category: 'Encryption',
              items: ['libsodium.js for E2EE', 'XSalsa20-Poly1305', 'Curve25519 key exchange', 'Secure random generation']
            },
            {
              category: 'Backend',
              items: ['REST API', 'Minimal data retention', 'Audit logging', 'PostgreSQL']
            },
            {
              category: 'Privacy',
              items: ['Zero-knowledge architecture', 'GDPR compliant', 'No tracking', 'Data export on demand']
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
              title: 'Client-Side Encryption',
              solution: 'Implement full E2EE with key derivation and secure storage',
              result: 'Zero server access to plaintext'
            },
            {
              title: 'Consent Tokens',
              solution: 'Implement time-limited, revocable share tokens with granular permissions',
              result: 'Sharing without platform middleman'
            },
            {
              title: 'Emotional Safety UX',
              solution: 'Remove engagement dark patterns, design for reflection not activation',
              result: 'Users report less anxiety after journaling'
            },
            {
              title: 'Privacy-First Monetization',
              solution: 'Build sustainable model without surveillance data',
              result: 'User subscription, not ad-tech'
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
      title: 'Impact',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { metric: '100%', label: 'Journal privacy' },
              { metric: 'Zero', label: 'Platform data sales' },
              { metric: 'User', label: 'Held encryption keys' }
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
            <h3 className="font-display font-bold text-lg mb-4">Key Insights</h3>
            <ul className="space-y-3">
              {[
                'Privacy and wellness are inseparable',
                'Dark patterns harm long-term user health',
                'Consent-based design is both ethical and functional',
                'Sustainable business models exist outside ad-tech'
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
      title="Ibasho"
      subtitle="Digital Sanctuary for Authentic Emotional Expression"
      description="居場所 — 'A place where one belongs' · Privacy-first journaling meets gentle connection"
      meta={{
        role: 'Lead Designer & Developer',
        duration: '4 months',
        industry: 'Digital Wellness',
        status: 'Web App · PWA'
      }}
      metrics={metrics}
      sections={sections}
      backHref="/landing"
    />
  );
};

export default React.memo(IbashoCaseStudy);
