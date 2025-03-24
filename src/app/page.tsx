"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ThreeBackground from '../components/ThreeBackground';
import Navigation from '../components/Navigation';
import ThemeToggle from '../components/ThemeToggle';
import { Theme, Section } from '../types';
import TweetCarousel from '../components/tweet';
import ProjectsSection from '@/components/ProjectCard';
import emailjs from '@emailjs/browser';

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
      <Head>
        <title>Sanatan Sharma | Designer and Developer</title>
        <meta name="description" content="Portfolio of Sanatan Sharma, Designer and Developer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="fixed inset-0 z-10 h-screen w-screen overflow-hidden">
        <ThreeBackground theme={theme} />
      </div>

      <div className="relative z-10 min-h-screen flex p-8">
        <div className="container mx-auto max-w-screen-xl">
          <header className="pt-12 pb-16 font-poppins">
            <h1 className="text-5xl md:text-6xl font-medium tracking-tight">Sanatan Sharma</h1>
            <p className="text-base opacity-75 mt-2 font-light">Designer and Developer</p>
          </header>

          <div className="flex flex-col md:flex-row gap-16">
            <aside className="w-full md:w-48 flex-shrink-0">
              <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
              <div className="mt-4">
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              </div>
            </aside>

            <main className="flex-grow">
              {activeSection === 'home' && (
                <div className="fade-in font-poppins">
                  <h2 className="text-3xl font-medium mb-6 tracking-tight">Welcome</h2>
                  <p className="max-w-2xl opacity-80 leading-relaxed text-lg font-light">
                  I’m a designer and developer passionate about crafting minimal, elegant digital experiences. My work blends clean aesthetics with thoughtful functionality, using modern technologies to build memorable interfaces.
Across various projects,
<br/>
<br/>
 I’ve achieved <strong>50K+</strong> impressions and <strong>1000+</strong> users within <strong>24K+</strong> hours, showcasing the reach and impact of my work.
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
        I’m a developer and student with <strong className="font-medium">1+ year</strong> of experience in web development and <strong className="font-medium">100+</strong> solved DSA problems across platforms like LeetCode and Codeforces. I specialize in front-end development, backend systems, and AI integrations, constantly refining my skills and exploring innovative solutions.
      </p>
      <p>
        I have built <strong className="font-medium">5+</strong> full-stack projects, including AI-driven applications, web scrapers, and interactive platforms.
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
          <strong className="font-medium">AI/ML:</strong> NumPy, Pandas, PyTorch,  AI integrations, and basic NLP and computer vision techniques.
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