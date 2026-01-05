'use client';
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const getStoredTheme = (): Theme | null => {
  try {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('theme') as Theme;
  } catch {
    return null;
  }
};

const setStoredTheme = (theme: Theme): void => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme', theme);
  } catch {
    // Silent fail in incognito mode or when storage is disabled
  }
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = getStoredTheme();
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setStoredTheme(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  return { theme, toggleTheme };
};