'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light'); // Start with light to avoid hydration issues
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // After mounting, check for user preference or default to dark
    try {
      const stored = localStorage.getItem('framefinder-theme') as Theme;
      if (stored && (stored === 'light' || stored === 'dark')) {
        setTheme(stored);
      } else {
        // Default to dark mode as in snazzy demo
        setTheme('dark');
      }
    } catch (error) {
      console.log('Theme provider: localStorage not available, using light theme');
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    try {
      // Apply theme to document
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      
      // Store preference
      localStorage.setItem('framefinder-theme', theme);
    } catch (error) {
      console.log('Theme provider: Error applying theme', error);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // During SSR/static generation, provide safe fallback values
    if (typeof window === 'undefined') {
      return {
        theme: 'light' as Theme, // Safe default for SSR
        toggleTheme: () => {},
      };
    }
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}