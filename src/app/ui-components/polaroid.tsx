'use client';
import React, { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';

interface ComponentShowcaseProps {
  title: string;
  description: string;
  children: React.ReactNode;
  code: string;
}

const ComponentShowcase: React.FC<ComponentShowcaseProps> = ({ 
  title, 
  description, 
  children, 
  code 
}) => {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-3">
          {title}
        </h2>
        <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>
        
        {/* Preview Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg mb-6">
          <div className="flex flex-col gap-6">
            {children}
          </div>
        </div>

        {/* Code Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-300">
              Code
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-3 py-1.5 text-xs md:text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {showCode ? 'Hide' : 'Show'} Code
              </button>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 text-xs md:text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-1"
              >
                {copied ? (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
          
          {showCode && (
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs md:text-sm">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

interface PolaroidCardProps {
  imageUrl: string;
  caption?: string;
  date?: string;
  mood?: string;
  rotation?: number;
  onClick?: () => void;
  className?: string;
  showActions?: boolean;
  vintage?: boolean;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({
  imageUrl,
  caption = 'Beautiful moment captured',
  date = 'Today',
  mood,
  rotation = Math.random() * 10 - 5,
  onClick,
  className = '',
  showActions = false,
  vintage = true
}) => {
  return (
    <div
      className={`bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-xl group ${className}`}
      style={{
        filter: vintage ? 'sepia(10%) saturate(110%)' : 'none',
        transform: `rotate(${rotation}deg)`,
      }}
      onClick={onClick}
    >
      <div className="relative p-2 overflow-visible">
        <div className="z-20 absolute -top-4 left-4 w-6 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-80 transform rotate-12 pointer-events-none shadow-sm"></div>
        <div className="z-20 absolute -top-4 right-4 w-6 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-80 transform -rotate-12 pointer-events-none shadow-sm"></div>
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt="Polaroid memory"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' font-family='sans-serif' font-size='14' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
          {showActions && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex space-x-2">
                <button
                  className="p-1.5 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-4 h-4 text-red-500" />
                </button>
                <button
                  className="p-1.5 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Share2 className="w-4 h-4 text-blue-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-4 pt-2 bg-white">
        <p className="text-gray-800 font-serif italic text-sm mb-2 leading-relaxed">
          {caption}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs font-mono">
            {date}
          </p>
          {mood && (
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
              {mood}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const PolaroidComponent: React.FC = () => {
  const sampleCards = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      caption: 'Sunset over the mountains, a moment of pure serenity',
      date: 'March 15, 2024',
      mood: 'peaceful',
      rotation: -3
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      caption: 'Lost in the woods, found in nature',
      date: 'March 10, 2024',
      mood: 'adventurous',
      rotation: 5
    },
  ];

  const code = `import React from 'react';
import { Heart, Share2 } from 'lucide-react';

interface PolaroidCardProps {
  imageUrl: string;
  caption?: string;
  date?: string;
  mood?: string;
  rotation?: number;
  onClick?: () => void;
  className?: string;
  showActions?: boolean;
  vintage?: boolean;
}

const PolaroidCard: React.FC<PolaroidCardProps> = ({
  imageUrl,
  caption = "Beautiful moment captured",
  date = "Today",
  mood,
  rotation = Math.random() * 10 - 5,
  onClick,
  className = "",
  showActions = false,
  vintage = true
}) => {
  return (
    <div
      className={\`bg-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 hover:rotate-0 hover:shadow-xl group \${className}\`}
      style={{
        filter: vintage ? 'sepia(10%) saturate(110%)' : 'none',
        transform: \`rotate(\${rotation}deg)\`,
      }}
      onClick={onClick}
    >
      <div className="relative p-2 overflow-visible">
        <div className="absolute -top-4 left-4 w-6 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-80 transform rotate-12 pointer-events-none shadow-sm"></div>
        <div className="absolute -top-4 right-4 w-6 h-8 bg-gradient-to-br from-yellow-200 to-yellow-400 opacity-80 transform -rotate-12 pointer-events-none shadow-sm"></div>
        <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
          <img
            src={imageUrl}
            alt="Polaroid memory"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='100' y='100' font-family='sans-serif' font-size='14' fill='%23666' text-anchor='middle' dominant-baseline='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
            }}
          />
          {showActions && (
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex space-x-2">
                <button
                  className="p-1.5 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-4 h-4 text-red-500" />
                </button>
                <button
                  className="p-1.5 bg-white bg-opacity-80 rounded-full shadow-md hover:bg-opacity-100 transition-all"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Share2 className="w-4 h-4 text-blue-500" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-4 pt-2 bg-white">
        <p className="text-gray-800 font-serif italic text-sm mb-2 leading-relaxed">
          {caption}
        </p>
        <div className="flex items-center justify-between">
          <p className="text-gray-500 text-xs font-mono">
            {date}
          </p>
          {mood && (
            <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
              {mood}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default function PolaroidGallery() {
  const sampleCards = [/* ...same as preview... */];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {sampleCards.map((card, index) => (
        <PolaroidCard key={index} {...card} showActions className="mx-auto" />
      ))}
    </div>
  );
}`;

  return (
    <ComponentShowcase
      title="Polaroid Card"
      description="A vintage-styled polaroid card with subtle rotation, tape accents, and optional actions."
      code={code}
    >
      <div>
        <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">Gallery Preview</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sampleCards.map((card, index) => (
            <PolaroidCard
              key={index}
              imageUrl={card.imageUrl}
              caption={card.caption}
              date={card.date}
              mood={card.mood}
              rotation={card.rotation}
              showActions={true}
              onClick={() => console.log(`Clicked card ${index + 1}`)}
              className="mx-auto"
            />
          ))}
        </div>
      </div>
    </ComponentShowcase>
  );
};

export default PolaroidComponent;
