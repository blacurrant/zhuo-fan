'use client';
import React, { useState } from 'react';
import Button from '@/components/ui/Button';

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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {description}
        </p>
        
        {/* Preview Section */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            {children}
          </div>
        </div>

        {/* Code Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              Code
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {showCode ? 'Hide' : 'Show'} Code
              </button>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-1"
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
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>
    </div>
  );
};

const ButtonComponent: React.FC = () => {
  return (
    <ComponentShowcase
      title="Button"
      description="A versatile button component with multiple variants, sizes, and states. Perfect for forms, navigation, and interactive elements."
      code={`import Button from '@/components/ui/Button';

// Basic usage
<Button onClick={() => console.log('Clicked!')}>
  Click me
</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// With sizes
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With states
<Button disabled>Disabled</Button>
<Button loading>Loading...</Button>

// With icons
<Button rightIcon={<span>→</span>}>
  With Icon
</Button>

// Full width
<Button fullWidth>Full Width</Button>`}
    >
      {/* Button Variants */}
      <div className="space-y-6 w-full">
        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Variants</h4>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Sizes</h4>
          <div className="flex flex-wrap gap-3 items-center">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">States</h4>
          <div className="flex flex-wrap gap-3">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading...</Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">With Icons</h4>
          <div className="flex flex-wrap gap-3">
            <Button rightIcon={<span>→</span>}>
              With Icon
            </Button>
            <Button rightIcon={<span>📧</span>}>
              Email
            </Button>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Full Width</h4>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </div>
    </ComponentShowcase>
  );
};

export default ButtonComponent;
