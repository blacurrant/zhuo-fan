'use client';
import React from 'react';
import CaseStudyTemplate from '@/components/CaseStudyTemplate';

const FreightEZCaseStudy: React.FC = () => {
  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: (
        <div className="space-y-4">
          <p>
            FreightEZ is a comprehensive Transportation Management System (TMS) designed specifically for small to medium-sized North American freight fleets. The platform replaces traditional spreadsheets with smart, automated tools that streamline every aspect of fleet operations.
          </p>
          <p>
            From dispatch management and invoice automation to real-time fleet tracking and compliance handling, FreightEZ provides an all-in-one solution that helps smaller fleets compete with larger operations while maintaining operational efficiency.
          </p>
        </div>
      )
    },
    {
      id: 'problem',
      title: 'The Problem',
      content: (
        <div className="space-y-4">
          <p className="mb-6">Small and medium-sized freight fleets face unique operational challenges:</p>
          <ul className="space-y-3">
            <li>
              <strong>Spreadsheet Dependency:</strong> Outdated systems leading to errors and inefficiencies
            </li>
            <li>
              <strong>Manual Invoicing:</strong> Time-consuming payment tracking and reconciliation
            </li>
            <li>
              <strong>Visibility Gaps:</strong> No real-time insight into fleet operations and driver locations
            </li>
            <li>
              <strong>Scattered Documents:</strong> Compliance paperwork across multiple platforms
            </li>
            <li>
              <strong>Communication Silos:</strong> Gaps between dispatchers, drivers, and office staff
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
            FreightEZ provides an integrated platform bringing all fleet operations under one roof, with role-specific interfaces for different team members. Dispatch management, invoice automation, compliance tracking, and driver communication all converge in a single, cohesive system.
          </p>
          <div className="bg-replicate-surface-bone p-6 rounded-md border-l-4 border-replicate-primary">
            <h3 className="font-display text-lg font-bold mb-3">Competitive Advantage</h3>
            <p>
              Small fleets gain enterprise-grade operational tools without enterprise complexity or cost. The result: faster dispatch, better compliance, and happier drivers.
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
              icon: '📍',
              title: 'Real-Time Fleet Tracking',
              desc: 'GPS tracking, live driver location, and trip status updates.'
            },
            {
              icon: '📋',
              title: 'Dispatch Management',
              desc: 'Optimized route planning, load assignment, and driver scheduling.'
            },
            {
              icon: '💰',
              title: 'Invoice Automation',
              desc: 'Auto-generated invoices, payment tracking, and financial reporting.'
            },
            {
              icon: '✅',
              title: 'Compliance Hub',
              desc: 'DOT compliance, HOS logs, vehicle maintenance, insurance tracking.'
            },
            {
              icon: '💬',
              title: 'Driver Communication',
              desc: 'In-app messaging, delivery confirmations, and feedback collection.'
            },
            {
              icon: '📊',
              title: 'Analytics Dashboard',
              desc: 'Fleet KPIs, cost per mile, efficiency metrics, and trend analysis.'
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
              items: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Shadcn UI']
            },
            {
              category: 'Mapping & Tracking',
              items: ['Mapbox GL', 'Real-time WebSocket updates', 'GPS data integration']
            },
            {
              category: 'Backend',
              items: ['REST API', 'PostgreSQL', 'Redis for caching', 'Background jobs']
            },
            {
              category: 'Infrastructure',
              items: ['Docker containers', 'AWS deployment', 'CI/CD pipelines', 'Monitoring']
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
              title: 'Real-Time GPS Tracking',
              solution: 'WebSocket-based location updates with map rendering optimization',
              result: 'Sub-second location accuracy'
            },
            {
              title: 'Route Optimization',
              solution: 'Integration with routing APIs and custom algorithms for efficient dispatch',
              result: '15-20% fuel cost reduction'
            },
            {
              title: 'Compliance Automation',
              solution: 'Automated HOS calculations, document generation, and compliance checking',
              result: 'Zero DOT violations'
            },
            {
              title: 'Multi-Tenant Architecture',
              solution: 'Secure data isolation for multiple fleet customers in single system',
              result: 'Scalable SaaS model'
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
      title: 'Business Impact',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { metric: '40%', label: 'Admin time reduction' },
              { metric: '18%', label: 'Cost savings' },
              { metric: '95%', label: 'User adoption' }
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
            <h3 className="font-display font-bold text-lg mb-4">Key Learnings</h3>
            <ul className="space-y-3">
              {[
                'Domain expertise is crucial for B2B SaaS product design',
                'User testing with operators beats assumptions',
                'Compliance requirements drive feature design',
                'Real-time features create genuine competitive advantage'
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
      title="FreightEZ"
      subtitle="Transportation Management System for Small to Medium Fleets"
      description="Simplifying fleet operations through intelligent automation and real-time visibility"
      meta={{
        role: 'Frontend Engineer',
        duration: '2024-2025',
        industry: 'B2B SaaS · Logistics',
        status: 'Active Development'
      }}
      sections={sections}
      backHref="/journey"
    />
  );
};

export default React.memo(FreightEZCaseStudy);
