"use client";
import { useState, useEffect } from 'react';
import ThreeBackground from '../components/ThreeBackground';
import Navigation from '../components/Navigation';
import ThemeToggle from '../components/ThemeToggle';
import { Theme, Section } from '../types';
import ProjectsSection from '@/components/ProjectCard';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div
      className={`min-h-screen w-full transition-opacity duration-1000
        ${isLoading ? 'opacity-0' : 'opacity-100'} 
        ${theme === 'dark' ? 'text-foreground bg-background' : 'text-black bg-white'}`}
    >
      <div className="fixed inset-0 z-10 h-screen w-screen overflow-hidden">
        <ThreeBackground theme={theme} />
      </div>

      <div className="relative z-10 min-h-screen flex p-8 ">
        <div className="container mx-auto max-w-screen-xl">
          <header className="md:pt-12 pb-4 md:pb-16 font-poppins">
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight">Sanatan Sharma</h1>
            <p className="text-base opacity-75 mt-2 font-light">Designer and Developer</p>
          </header>

          <div className="flex flex-col md:flex-row gap-16">
            <aside className="w-full md:w-48 flex-shrink-0">
              <Navigation 
                activeSection={activeSection} 
                setActiveSection={setActiveSection} 
              />
              <div className="mt-4">
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
                      My work blends clean aesthetics with thoughtful functionality, using modern technologies to 
  {/* eslint-disable-next-line react/no-unescaped-entities */}
                      build memorable interfaces. Across various projects, I've achieved <strong>50K+</strong> 
                      impressions and <strong>1000+</strong> users within <strong>24K+</strong> hours, showcasing 
                      the reach and impact of my work.
                    </p>
                    
                    <div>
                      <h3 className="text-xl font-medium mb-4 tracking-tight">Contact Me</h3>
                      <p className="text-lg font-light">
                       
                        <a
                          href="mailto:sanatansharma352@gmail.com"
                          className="hover:underline hover:text-blue-500 transition-all duration-300"
                        >
                          sanatansharma352@gmail.com
                        </a>
                      </p>
                    </div>
                    <br/>
                    <hr></hr>
                    <br></br>
                    <div className="flex gap-6 mb-8">
                      <a href="https://github.com/sanatan-dive" target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <FaGithub className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">GitHub</span>
                      </a>
                      <a href="https://twitter.com/Sanatan_dive" target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <FaSquareXTwitter className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Twitter</span>
                      </a>
                      <a href="https://linkedin.com/in/sanatan-sharma-637605266" target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <FaLinkedin className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">LinkedIn</span>
                      </a>
                      <a href="https://leetcode.com/Sanatan_dive" target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <SiLeetcode className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">LeetCode</span>
                      </a>
                      <a href="https://drive.google.com/file/d/1OvGCrI1Lc1c4OkufAJ6ZHkbRJPODzC8n/view?usp=sharing" 
                        target="_blank" rel="noopener noreferrer" 
                        className="relative group hover:opacity-70 transition-opacity">
                        <FaFileAlt className="w-6 h-6" />
                        <span className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-max px-2 py-1 bg-white text-black text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">Resume</span>
                      </a>
                      
                    </div>
                    {/* Contact Me Section */}
                   
                  </div>
                </div>
              )}

              {activeSection === 'projects' && (
                <div className="fade-in font-manrope">
                  <ProjectsSection activeSection={activeSection} />
                </div>
              )}

              {activeSection === 'info' && (
                <div className="fade-in font-inter">
                  <h2 className="text-3xl font-medium mb-6 tracking-tight">Info</h2>
                  <div className="max-w-2xl opacity-80 leading-relaxed space-y-6 text-lg font-light">
                    <p>
                             {/* eslint-disable-next-line react/no-unescaped-entities */}
                      I'm a developer and student with <strong className="font-medium">1+ year</strong> of experience 
                      in web development and <strong className="font-medium">100+</strong> solved DSA problems.  
                      I specialize in <strong>Full-Stack Development</strong> and <strong>AI integrations</strong>, 
                      building scalable applications while exploring <strong>modern web technologies</strong>, 
                      <strong>system design</strong>, and <strong>machine learning</strong>.  
                             {/* eslint-disable-next-line react/no-unescaped-entities */}
                      I've built <strong className="font-medium">5+</strong> full-stack projects, including AI-driven 
                      apps, web scrapers, and interactive platforms.
                    </p>
                    
                    <hr></hr>
                    
                    <p>My expertise:</p>
                    <div className="space-y-4">
                      <div><strong className="font-medium">Front-end:</strong> React, Next.js, TypeScript, Tailwind CSS, Redux, Framer Motion, and modern JavaScript (ES6+).</div>
                      <div><strong className="font-medium">Back-end:</strong> Node.js, Express.js, Prisma, MongoDB, PostgreSQL, and RESTful API design.</div>
                      <div><strong className="font-medium">AI/ML:</strong> NumPy, Pandas, PyTorch, AI integrations, and basic NLP and computer vision techniques.</div>
                      <div><strong className="font-medium">Tools & DevOps:</strong> Git, GitHub, Firebase, Vercel, Docker, and CI/CD pipelines.</div>
                      <div><strong className="font-medium">Other Skills:</strong> Web scraping (Puppeteer, Beautiful Soup), data structures and algorithms, and responsive design principles.</div>
                    </div>
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