'use client';
import React from 'react';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';

const MelloupCaseStudy: React.FC = () => {
  const metrics = [
    { value: '3mo', label: 'MVP Delivery' },
    { value: '100%', label: 'Next.js Stack' },
    { value: 'Fast', label: 'Iteration Speed' }
  ];

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-4">
          <p>
            MelloUp is an AI-powered SaaS platform designed to help businesses measure and optimize the ROI of their event marketing campaigns. As founding engineer, I translated the founders' vision into a functional MVP within a tight 3-month timeframe.
          </p>
          <p>
            The platform provides real-time dashboards, lead quality insights, and engagement tracking—empowering marketing teams to make data-driven decisions and demonstrate clear ROI to stakeholders.
          </p>
        </div>
      )
    },
    {
      id: 'challenge',
      title: 'The Challenge',
      content: (
        <div className="space-y-4">
          <p className="mb-6">MelloUp needed a fully functional MVP in short timeframe to demonstrate product vision to early customers and investors:</p>
          <ul className="space-y-3">
            <li>
              <strong>Complex Data Visualization:</strong> ROI metrics, lead quality tracking, and engagement analytics required intuitive visual design
            </li>
            <li>
              <strong>Enterprise Credibility:</strong> Marketing website and product needed to build trust with enterprise clients from day one
            </li>
            <li>
              <strong>User Experience:</strong> Interface had to be simple for non-technical users while remaining powerful
            </li>
            <li>
              <strong>Time Constraints:</strong> Tight 3-month deadline to deliver both marketing site and functional MVP
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 'solution',
      title: 'The Solution',
      content: (
        <div className="space-y-6">
          <p>
            Built enterprise-grade SaaS MVP using modern Next.js stack. Prioritized core functionality: real-time lead import, automatic ROI calculations, and intuitive dashboards. Every feature built for speed and clarity.
          </p>
          <div className="bg-replicate-surface-bone p-6 rounded-md border-l-4 border-replicate-primary">
            <h3 className="font-display text-lg font-bold mb-3">Execution Strategy</h3>
            <p>
              Component-first architecture enabled rapid iteration. Shadcn UI for consistency, customizable dashboards for flexibility, API-first design for future scale.
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
              icon: '📊',
              title: 'ROI Dashboard',
              desc: 'Real-time calculations showing event ROI, cost per lead, and revenue attribution.'
            },
            {
              icon: '👥',
              title: 'Lead Management',
              desc: 'Import leads from multiple sources, track quality scores, and engagement metrics.'
            },
            {
              icon: '📈',
              title: 'Analytics',
              desc: 'Custom reports, trend analysis, and predictive insights powered by AI.'
            },
            {
              icon: '🔄',
              title: 'Integrations',
              desc: 'Connect with CRM, email, and analytics platforms via webhooks and APIs.'
            },
            {
              icon: '🤖',
              title: 'AI Insights',
              desc: 'Automated recommendations for campaign optimization and ROI improvement.'
            },
            {
              icon: '👤',
              title: 'Multi-User',
              desc: 'Role-based access, team collaboration, and activity audit logs.'
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
              items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Shadcn UI', 'Recharts']
            },
            {
              category: 'State Management',
              items: ['TanStack Query', 'Zustand', 'React Hook Form', 'Zod validation']
            },
            {
              category: 'Backend',
              items: ['Next.js API Routes', 'PostgreSQL', 'Prisma ORM', 'OpenAI API for insights']
            },
            {
              category: 'Infrastructure',
              items: ['Vercel deployment', 'GitHub Actions CI/CD', 'Sentry monitoring', 'Stripe integration']
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
              title: 'Real-Time Data Processing',
              solution: 'Built data pipeline to process lead imports and calculate ROI instantly',
              result: '< 1s calculation latency'
            },
            {
              title: 'Dashboard Customization',
              solution: 'Flexible widget system allowing teams to build custom reporting views',
              result: 'Zero custom dev requests'
            },
            {
              title: 'Multi-Event Tracking',
              solution: 'Attribution modeling across multiple events and lead sources',
              result: 'Accurate cross-event ROI'
            },
            {
              title: 'AI-Powered Insights',
              solution: 'Integrated OpenAI API to generate actionable optimization recommendations',
              result: 'Unique competitive feature'
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { metric: '50%', label: 'Feature adoption' },
              { metric: '4.8/5', label: 'NPS score' },
              { metric: '3x', label: 'Conversion lift' }
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
                'Constraint-driven design accelerates decision-making',
                'Core features ship faster when UI components are reusable',
                'Data visualization is core product, not decoration',
                'Early user feedback validates product direction faster than assumptions'
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
      title="MelloUp"
      subtitle="AI-Powered Event Marketing ROI Platform"
      description="Helping businesses measure and optimize event marketing ROI through intelligent data insights"
      meta={{
        role: 'Founding Engineer',
        duration: '3 months',
        industry: 'B2B SaaS · MarTech',
        status: 'MVP · Web App'
      }}
      metrics={metrics}
      sections={sections}
      backHref="/landing"
    />
  );
};

export default React.memo(MelloupCaseStudy);
