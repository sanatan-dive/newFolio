"use client";
import { useState, useEffect } from 'react';
import ThreeBackground from '../components/ThreeBackground';
import Navigation from '../components/Navigation';
import ThemeToggle from '../components/ThemeToggle';
import { Theme, Section } from '../types';
import TweetCarousel from '../components/tweet';
import ProjectsSection from '@/components/ProjectCard';
import emailjs from '@emailjs/browser';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa'; // Added FaFileAlt for resume
import { FaSquareXTwitter } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [formStatus, setFormStatus] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = (): void => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('Sending...');

    const form = e.currentTarget;
    
    emailjs
      .sendForm(
       'service_5u6pqos',
       'template_dwjpfxc',
        form,
        'b71CAHxhlq0Y5WvuO'
      )
      .then(
        () => {
          setFormStatus('Message sent successfully!');
          form.reset(); // Clear the form
          setTimeout(() => setFormStatus(''), 3000); // Clear status after 3s
        },
        (error) => {
          setFormStatus(`Failed to send message: ${error.text}`);
        }
      );
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
          <header className=" md:pt-12 pb-4 md:pb-16 font-poppins">
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight">Sanatan Sharma</h1>
            <p className="text-base opacity-75 mt-2 font-light">Designer and Developer</p>
          </header>

          <div className="flex flex-col md:flex-row gap-16">
            <aside className="w-full md:w-48 flex-shrink-0">
              <Navigation  activeSection={activeSection} setActiveSection={setActiveSection} />
              <div className="mt-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
            </aside>

            <main className="flex-grow">
              {activeSection === 'home' && (
                <div className="fade-in font-poppins">
                  <h2 className="text-3xl font-medium mb-6 tracking-tight">Welcome</h2>
                  <p className="max-w-2xl opacity-80 leading-relaxed text-lg font-light">
                    {/*  eslint-disable-next-line react/no-unescaped-entities */}
                  I'm a designer and developer passionate about crafting minimal, elegant digital experiences. My work blends clean aesthetics with thoughtful functionality, using modern technologies to build memorable interfaces.
                  Across various projects,
                  <br/>
                  <br/>
                  {/*  eslint-disable-next-line react/no-unescaped-entities */}
                  I've achieved <strong>50K+</strong> impressions and <strong>1000+</strong> users within <strong>24K+</strong> hours, showcasing the reach and impact of my work.
                  </p>
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
                    
                    {/*  eslint-disable-next-line react/no-unescaped-entities */}
                    I'm a developer and student with <strong className="font-medium">1+ year</strong> of experience in web development and <strong className="font-medium">100+</strong> solved DSA problems.  
                    I specialize in <strong>Full-Stack Development</strong> and <strong>AI integrations</strong>, building scalable applications while exploring <strong>modern web technologies</strong>, <strong>system design</strong>, and <strong>machine learning</strong>.  
                    {/*  eslint-disable-next-line react/no-unescaped-entities */}
                    I've built <strong className="font-medium">5+</strong> full-stack projects, including AI-driven apps, web scrapers, and interactive platforms.
                  </p>

                  <p>
                    My expertise:
                  </p>
                  <div className="space-y-4">
                    <div>
                      <strong className="font-medium">Front-end:</strong> React, Next.js, TypeScript, Tailwind CSS, Redux, Framer Motion, and modern JavaScript (ES6+).
                    </div>
                    <div>
                      <strong className="font-medium">Back-end:</strong> Node.js, Express.js, Prisma, MongoDB, PostgreSQL, and RESTful API design.
                    </div>
                    <div>
                      <strong className="font-medium">AI/ML:</strong> NumPy, Pandas, PyTorch, AI integrations, and basic NLP and computer vision techniques.
                    </div>
                    <div>
                      <strong className="font-medium">Tools & DevOps:</strong> Git, GitHub, Firebase, Vercel, Docker, and CI/CD pipelines.
                    </div>
                    <div>
                      <strong className="font-medium">Other Skills:</strong> Web scraping (Puppeteer, Beautiful Soup), data structures and algorithms, and responsive design principles.
                    </div>
                  </div>
                  </div>
                </div>
              )}

              {activeSection === 'links' && (
                <div className="fade-in font-poppins">
                  <h2 className="text-3xl font-medium mb-6 tracking-tight">Connect</h2>
                  <div className="max-w-2xl opacity-80">
                    <p className="mb-8 text-lg font-light">
                      Find me around the web and explore my work through these links:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <a 
                        href="https://github.com/sanatan-dive" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center p-4 border rounded border-opacity-20 hover:border-opacity-100 transition-all duration-300"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mr-4">
                          <FaGithub className='w-6 h-6'/>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg group-hover:underline">GitHub</h3>
                          <p className="text-sm opacity-75">Explore my code repositories</p>
                        </div>
                      </a>
                      
                      <a 
                        href="https://twitter.com/Sanatan_dive" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center rounded p-4 border border-opacity-20 hover:border-opacity-100 transition-all duration-300"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mr-4">
                          <FaSquareXTwitter className='w-6 h-6'/>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg group-hover:underline">Twitter</h3>
                          <p className="text-sm opacity-75">Follow me for updates</p>
                        </div>
                      </a>
                      
                      <a 
                        href="https://linkedin.com/in/sanatan-sharma-637605266" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group rounded flex items-center p-4 border border-opacity-20 hover:border-opacity-100 transition-all duration-300"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mr-4">
                          <FaLinkedin className='w-6 h-6'/>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg group-hover:underline">LinkedIn</h3>
                          <p className="text-sm opacity-75">Connect professionally</p>
                        </div>
                      </a>
                      
                      <a 
                        href="https://leetcode.com/Sanatan_dive" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center p-4 border border-opacity-20 hover:border-opacity-100 transition-all duration-300"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mr-4">
                         <SiLeetcode className='w-6 h-6'/>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg group-hover:underline">LeetCode</h3>
                          <p className="text-sm opacity-75">Check my problem-solving skills</p>
                        </div>
                      </a>
                      
                      <a 
                        href="https://drive.google.com/file/d/1OvGCrI1Lc1c4OkufAJ6ZHkbRJPODzC8n/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center p-4 border border-opacity-20 hover:border-opacity-100 transition-all duration-300 md:col-span-2"
                      >
                        <div className="w-10 h-10 flex items-center justify-center mr-4">
                         <FaFileAlt className='w-6 h-6'/>
                        </div>
                        <div>
                          <h3 className="font-medium text-lg group-hover:underline">Resume</h3>
                          <p className="text-sm opacity-75">Download my CV/Resume</p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'contact' && (
                <div className="fade-in font-lora">
                  <h2 className="text-3xl font-medium mb-6 tracking-tight">Contact</h2>
                  <div className="max-w-md">
                    <p className="mb-8 opacity-80 text-lg font-light">
                      For inquiries about projects or collaborations, please reach out through the form below.
                    </p>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="name" className="block text-sm opacity-75 mb-1 font-light">Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name" // Required for EmailJS
                          required
                          className="w-full p-2 bg-transparent border-b  border-stone-800 focus:border-white outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm opacity-75 mb-1 font-light">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email" // Required for EmailJS
                          required
                          className="w-full p-2 bg-transparent border-b border-stone-800 focus:border-white outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm opacity-75 mb-1 font-light">Message</label>
                        <textarea
                          id="message"
                          name="message" // Required for EmailJS
                          rows={4}
                          required
                          className="w-full p-2 bg-transparent border-b  border-stone-800 focus:border-white outline-none transition-colors"
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-colors font-medium"
                      >
                        Send
                      </button>
                      {formStatus && (
                        <p className={`mt-2 text-sm ${formStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>
                          {formStatus}
                        </p>
                      )}
                    </form>
                  </div>
                </div>
              )}

              {activeSection === 'feedback' && (
                <div className="fade-in">
                  <TweetCarousel />
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}