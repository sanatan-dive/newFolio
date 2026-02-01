"use client";

import { useState, useEffect, useCallback } from 'react';
import ThreeBackground from '../components/ThreeBackground';
import Navigation from '../components/Navigation';
import ThemeToggle from '../components/ThemeToggle';
import ProjectsSection from '@/components/ProjectCard';
import HomeSection from '@/components/sections/HomeSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import InfoSection from '@/components/sections/InfoSection';
import { Theme, Section } from '../types';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [transitionDuration, setTransitionDuration] = useState(800);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Adjust transition duration when activeSection changes
  useEffect(() => {
    if (!isLoading) {
      setTransitionDuration((prev) => Math.min(prev + 100, 2500));
    }
  }, [activeSection, isLoading]);

  // Theme effect with smooth transitions
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--transition-duration', '300ms');
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [theme]);

  const toggleTheme = useCallback((): void => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection(section);
  }, []);

  return (
    <div
      className={`min-h-screen w-full transition-all ease-in-out
        ${isLoading ? 'opacity-0 blur-md' : 'opacity-100 blur-0'} 
        ${theme === 'dark' ? 'text-foreground bg-background' : 'text-black bg-white'}`}
      style={{ transitionDuration: `${transitionDuration}ms` }}
    >
      {/* Three.js Background - kept behind content with z-[1] */}
      <div className="fixed inset-0 z-[1] h-screen w-screen overflow-hidden pointer-events-none">
        <ThreeBackground theme={theme} />
      </div>

      {/* Main Content - z-10 to stay above background */}
      <div className="relative z-10 min-h-screen flex p-4 sm:p-8">
        <div className="container mx-auto max-w-screen-xl">
          {/* Header */}
          <header className="pt-8 md:pt-12 pb-4 md:pb-16 font-heading">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight transition-all duration-500 ease-out hover:tracking-wide">
              <span className="gradient-text-silver">Sanatan Sharma</span>
            </h1>
            <p className={`text-base mt-3 font-light font-body transition-all duration-300 hover:translate-x-1
              ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
              Designer and Developer
            </p>
          </header>

          {/* Main Layout */}
          <div className="flex flex-col md:flex-row gap-2 sm:gap-16">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-48 flex-shrink-0">
              <Navigation 
                activeSection={activeSection}
                setActiveSection={handleSectionChange}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <div className="block mt-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
            </aside>

            {/* Main Content Area - Fixed min-width to prevent layout shift */}
            <main className="flex-grow min-w-0 w-full">
              {activeSection === 'home' && (
                <HomeSection theme={theme} />
              )}

              {activeSection === 'projects' && (
                <div className="fade-in font-body mb-16">
                  <ProjectsSection activeSection={activeSection} theme={theme} />
                </div>
              )}

              {activeSection === 'work' && (
                <ExperienceSection theme={theme} />
              )}

              {activeSection === 'info' && (
                <InfoSection theme={theme} />
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}