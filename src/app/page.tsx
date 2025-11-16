"use client";

import { useState, useEffect, useCallback } from 'react';
import ThreeBackground from '../components/ThreeBackground';
import Navigation from '../components/Navigation';
import ThemeToggle from '../components/ThemeToggle';

import { Theme, Section } from '../types';
import ProjectsSection from '@/components/ProjectCard';
import { SiLeetcode } from "react-icons/si";
import { FileText, Github, Linkedin, Twitter } from 'lucide-react';

export default function Home() {
 const [activeSection, setActiveSection] = useState<Section>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [transitionDuration, setTransitionDuration] = useState(800); // Initial duration in ms

 useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Initial load delay
    return () => clearTimeout(timer);
  }, []);

  // Adjust transition duration when activeSection changes
  useEffect(() => {
    if (!isLoading) { // Only adjust after initial load
      setTransitionDuration((prev) => Math.min(prev + 100, 2500)); // Increase by 500ms, cap at 2500ms
    }
  }, [activeSection, isLoading]);

  // Theme effect with smooth transitions
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--transition-duration', '300ms');
    
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = useCallback((): void => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, []);

  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection(section);
  }, []);

  return (
    <>
    
      
       <div
      className={`min-h-screen w-full transition-all ease-in-out ]
        ${isLoading ? 'opacity-0 blur-md' : 'opacity-100 blur-0'} 
        ${theme === 'dark' ? 'text-foreground bg-background' : 'text-black bg-white'}`}
      style={{ transitionDuration: `${transitionDuration}ms` }} // Dynamic duration
    >
        
      <div
    className="fixed inset-0 z-0 h-screen w-screen bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url(/bg.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity:0.15,
    zIndex: 2
    }}
  />
      
      {/* Three.js Background */}
      <div className="fixed inset-0 z-10 h-screen w-screen overflow-hidden">
        <ThreeBackground theme={theme} />
      </div>

      <div className="relative z-20 min-h-screen flex p-4 sm:p-8">
        <div className="container mx-auto max-w-screen-xl">
          <header className="pt-8 md:pt-12 pb-4 md:pb-16 font-inter">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight transition-all duration-500 ease-out hover:tracking-wide">
              Sanatan Sharma
            </h1>
            <p className="text-base opacity-75 mt-3 font-light transition-all duration-300 hover:opacity-100 hover:translate-x-1">
              Designer and Developer
            </p>
          </header>

           <div className="flex flex-col md:flex-row gap-2 sm:gap-16">
            <aside className="w-full md:w-48 flex-shrink-0">
              <Navigation 
                activeSection={activeSection}
                setActiveSection={handleSectionChange}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <div className=" block mt-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
            </aside>

            <main className="flex-grow">
              {activeSection === 'home' && (
                <div className="fade-in font-inter">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6 tracking-tight">Welcome</h2>
                  <div className="max-w-2xl opacity-90 leading-relaxed text-base sm:text-lg font-light space-y-6">
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      I'm a designer and developer passionate about crafting minimal, elegant digital experiences. 
                      Across various projects, I&apos;ve achieved <strong className="font-semibold">50K+</strong> 
                      impressions and <strong className="font-semibold">1000+</strong> users within <strong className="font-semibold">24K+</strong> hours, showcasing 
                      the reach and impact of my work.
                    </p>
                   
                    <div className="flex gap-4 sm:gap-6">
                      <SocialLink href="https://drive.google.com/file/d/1OvGCrI1Lc1c4OkufAJ6ZHkbRJPODzC8n/view?usp=sharing" 
                        icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />} 
                        label="Resume" 
                        className="hidden sm:block" />
                      
                      <SocialLink href="https://github.com/sanatan-dive" 
                        icon={<Github className="w-5 h-5 sm:w-6 sm:h-6" />} 
                        label="GitHub" />
                      
                      <SocialLink href="https://linkedin.com/in/sanatan-sharma-637605266" 
                        icon={<Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />} 
                        label="LinkedIn" />
                      
                      <SocialLink href="https://twitter.com/Sanatan_dive" 
                        icon={<Twitter className="w-5 h-5 sm:w-6 sm:h-6" />} 
                        label="Twitter" />
                      
                      <SocialLink href="https://leetcode.com/Sanatan_dive" 
                        icon={<SiLeetcode className="w-5 h-5 sm:w-6 sm:h-6" />} 
                        label="LeetCode" />
                    </div>
 
                    <hr className="border-gray-300 dark:border-gray-700 transition-colors duration-300" />
                    
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold mb-3 tracking-tight">Contact Me</h3>
                      <p className="text-base sm:text-lg font-light">
                        <a
                          href="mailto:sanatansharma352@gmail.com"
                          className="transition-all duration-300 hover:underline hover:opacity-80 focus:underline focus:opacity-80 focus:outline-none"
                        >
                          sanatansharma350@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'projects' && (
                <div className="fade-in font-inter mb-16">
                  <ProjectsSection activeSection={activeSection} theme={theme} />
                </div>
              )}

              {activeSection === 'work' && (
                <div className="fade-in font-inter mb-16">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6 tracking-tight text-foreground dark:text-foreground">Experience</h2>
                  <div className="max-w-3xl space-y-8">
                    {/* Full Stack Intern */}
                    <div className="border-l-2 border-primary/30 dark:border-primary/40 pl-6 relative">
                      <div className="absolute -left-[7px] top-1 w-3 h-3  dark:bg-white rounded-full border-2 border-background dark:border-background"></div>
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-primary dark:text-primary">Product Engineer Intern</h3>
                          <span className="text-sm opacity-80 font-light text-foreground dark:text-foreground">August 2025 – October 2025</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <p className="font-medium text-primary dark:text-primary">Dodge AI</p>
                          <span className="hidden sm:inline text-foreground/60 dark:text-foreground/60">•</span>
                          <span className="text-sm opacity-80 font-light text-foreground dark:text-foreground">Remote</span>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm sm:text-base font-light opacity-95 leading-relaxed">
                          <li className="flex items-start gap-2">
                            <span className="text-primary/70 dark:text-primary/70 mt-1.5">•</span>
                            <span>Converting Figma designs into pixel-perfect, responsive frontend interfaces using modern frameworks</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary/70 dark:text-primary/70 mt-1.5">•</span>
                            <span>Building robust APIs with comprehensive error handling and optimized data retrieval mechanisms</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary/70 dark:text-primary/70 mt-1.5">•</span>
                            <span>Integrating APIs seamlessly with frontend components to ensure smooth data flow and user interactions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary/70 dark:text-primary/70 mt-1.5">•</span>
                            <span>Implementing authentication systems and middleware for secure and scalable web application architecture</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Vice President */}
                    <div className="border-l-2 border-accent/30 dark:border-accent/40 pl-6 relative">
                      <div className="absolute -left-[7px] top-1 w-3 h-3 bg-white dark:bg-white rounded-full border-2 border-background dark:border-background"></div>
                      <div className="space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-accent dark:text-accent">Vice President</h3>
                          <span className="text-sm opacity-80 font-light text-foreground dark:text-foreground">November 2024 – Present</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                          <p className="font-medium text-accent dark:text-accent">Hackathon Club of CCET</p>
                          <span className="hidden sm:inline text-foreground/60 dark:text-foreground/60">•</span>
                          <span className="text-sm opacity-80 font-light text-foreground dark:text-foreground">Onsite, India</span>
                        </div>
                        <ul className="mt-4 space-y-2 text-sm sm:text-base font-light opacity-95 leading-relaxed">
                          <li className="flex items-start gap-2">
                            <span className="text-accent/70 dark:text-accent/70 mt-1.5">•</span>
                            <span>Leading club initiatives to foster innovation through hackathons and technical workshops</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent/70 dark:text-accent/70 mt-1.5">•</span>
                            <span>Organizing events with 200+ participants and mentoring teams in building impactful technology solutions</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-accent/70 dark:text-accent/70 mt-1.5">•</span>
                            <span>Managing partnerships with industry sponsors and coordinating with faculty for seamless event execution</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'info' && (
                <div className="fade-in font-inter mb-16">
                  <h2 className="text-2xl sm:text-3xl font-semibold mb-6 tracking-tight">Info</h2>
                  <div className="max-w-2xl opacity-90 leading-relaxed space-y-6 text-base sm:text-lg font-light">
                    <p>
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      I'm a developer and student specializing in <strong className="font-semibold">Full-Stack Development</strong> and <strong className="font-semibold">AI integrations</strong>, 
                      building scalable applications while exploring <strong className="font-semibold">modern web technologies</strong>, 
                      <strong className="font-semibold"> system design</strong>, and <strong className="font-semibold">machine learning</strong>.  
                    </p>
                    
                    <hr className="border-gray-300 dark:border-gray-700 transition-colors duration-300" />
                    
                    <div>
                      <p className="font-semibold mb-3">Achievements:</p>
                      <ul className="list-disc list-inside space-y-2 font-light">
  <li>Winner of <strong className="font-semibold">IPD Expo</strong> at college</li>
  <li>Winner at <strong className="font-semibold">Cyberthon.AI</strong></li>
  <li>1st runner-up at <strong className="font-semibold">Monad Blitz</strong></li>
  <li>Top 10 among 5000 participants in <strong className="font-semibold">HackWithIndia</strong></li>
  <li>Won <strong className="font-semibold">$500 Bonus Prize</strong> in the <strong className="font-semibold">Arweave AI Agent Hackathon</strong></li>
  <li>Top 5 at the <strong className="font-semibold">Avalanche Delhi Hackathon</strong>, awarded <strong className="font-semibold">$300</strong></li>
</ul>

                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

// Reusable Social Link Component
interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

function SocialLink({ href, icon, label, className = "" }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`relative group transition-all duration-300 hover:scale-110 hover:-translate-y-1 focus:scale-110 focus:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2 rounded-lg p-1 ${className}`}
      aria-label={label}
    >
      {icon}
      <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-black/80 dark:bg-white/90 text-white dark:text-black text-xs rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none backdrop-blur-sm">
        {label}
      </span>
    </a>
  );
}