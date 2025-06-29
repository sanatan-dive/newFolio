"use client";

import { useState, useEffect } from 'react';
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
  const [transitionDuration, setTransitionDuration] = useState(1000); // Initial duration in ms

  // Handle initial page load fade-in
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Initial load delay
    return () => clearTimeout(timer);
  }, []);

  // Adjust transition duration when activeSection changes
  useEffect(() => {
    if (!isLoading) { // Only adjust after initial load
      setTransitionDuration((prev) => Math.min(prev + 500, 2500)); // Increase by 500ms, cap at 2500ms
    }
  }, [activeSection, isLoading]);

  // Theme effect
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={`min-h-screen w-full transition-all ease-in-out ]
        ${isLoading ? 'opacity-0 blur-md' : 'opacity-100 blur-0'} 
        ${theme === 'dark' ? 'text-foreground bg-background' : 'text-black bg-white'}`}
      style={{ transitionDuration: `${transitionDuration}ms` }} // Dynamic duration
    >
      <div
    className="absolute fixed inset-0 z-0"
    style={{
      backgroundImage: `url(/bg.jpg)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity:0.15,
    zIndex: 1
    }}
  />
      <div className="fixed inset-0 z-10 h-screen w-screen  overflow-hidden">
        <ThreeBackground theme={theme} />
      </div>

      <div className="relative z-10 min-h-screen flex p-8">
        <div className="container mx-auto max-w-screen-xl">
          <header className="md:pt-12 pb-4 md:pb-16 font-poppins">
            <h1 className="text-4xl md:text-6xl font-medium tracking-tight">Sanatan Sharma</h1>
            <p className="text-base opacity-75 mt-2 font-light">Designer and Developer</p>
          </header>

          {/* <hr className='pt-6 sm:hidden opacity-80'/> */}

          <div className="flex flex-col md:flex-row gap-4 sm:gap-16">
            <aside className="w-full md:w-48 flex-shrink-0">
              <Navigation 
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                theme={theme}
                toggleTheme={toggleTheme}
              />
              <div className=" sm:block mt-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
            </aside>

            <main className="flex-grow">
              {activeSection === 'home' && (
                <div className="fade-in font-poppins">
                  <h2 className="text-3xl font-medium mb-6 tracking-tight">Welcome</h2>
                  <div className="max-w-2xl opacity-80 leading-relaxed text-lg font-light">
                    <p className="mb-6">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      I'm a designer and developer passionate about crafting minimal, elegant digital experiences. 
                      Across various projects, I&apos;ve achieved <strong>50K+</strong> 
                      impressions and <strong>1000+</strong> users within <strong>24K+</strong> hours, showcasing 
                      the reach and impact of my work.
                    </p>
                    
                   
                   
                    <div className=" flex gap-6 mb-8">
                      <a href="https://drive.google.com/file/d/1OvGCrI1Lc1c4OkufAJ6ZHkbRJPODzC8n/view?usp=sharing" 
                        target="_blank" rel="noopener noreferrer" 
                        className="relative hidden sm:block group hover:opacity-70 transition-opacity">
                        <FileText className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Resume</span>
                      </a>
                      <a href="https://github.com/sanatan-dive" target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <Github className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">GitHub</span>
                      </a>
                      <a href="https://linkedin.com/in/sanatan-sharma-637605266" target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <Linkedin className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">LinkedIn</span>
                      </a>
                      <a href="https://twitter.com/Sanatan_dive" target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <Twitter className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Twitter</span>
                      </a>
                      <a href="https://leetcode.com/Sanatan_dive" target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <SiLeetcode className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">LeetCode</span>
                      </a>
                    </div>
 
                    <hr />
                    
                     <div>
                      <h3 className="text-xl font-medium mb-4 mt-4 tracking-tight">Contact Me</h3>
                      <p className="text-lg font-light">
                        <a
                          href="mailto:sanatansharma352@gmail.com"
                          className="hover:underline hover:text-gray-300 transition-all duration-300"
                        >
                          sanatansharma352@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'projects' && (
                <div className="fade-in font-manrope mb-16">
                  <ProjectsSection activeSection={activeSection} />
                </div>
              )}

              {activeSection === 'info' && (
  <div className="fade-in font-inter mb-16">
    <h2 className="text-3xl font-medium mb-6 tracking-tight">Info</h2>
    <div className="max-w-2xl opacity-80 leading-relaxed space-y-6 text-lg font-light">
      <p>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        I'm a developer and student. <br/>
        I specialize in <strong>Full-Stack Development</strong> and <strong>AI integrations</strong>, 
        building scalable applications while exploring <strong>modern web technologies</strong>, 
        <strong>system design</strong>, and <strong>machine learning</strong>.  
        {/* eslint-disable-next-line react/no-unescaped-entities */}
      </p>
      <hr/>
              <p>Achievements:</p>
      <ul className="list-disc font-light list-inside space-y-2">
        <li>Winner of <strong>IPD Expo</strong> at college</li>
        <li>Winner at <strong>Cyberthon.AI</strong></li>
        <li>1st runner-up at <strong>Monad Blitz</strong></li>
        <li>Top 10 among 5000 participants in <strong>HackWithIndia</strong></li>
      </ul>


      

      

    
    </div>
  </div>
)}

            </main>
          </div>
        </div>
      </div>
    </div>
  );
}