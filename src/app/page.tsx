"use client";
import { useState, useEffect } from 'react';
import Head from 'next/head';
import ThreeBackground from '../components/ThreeBackground';
import Navigation from '../components/Navigation';
import ThemeToggle from '../components/ThemeToggle';
import { Theme, Section } from '../types';
import { motion } from "framer-motion";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import ProjectsSection from '@/components/ProjectCard';
import emailjs from '@emailjs/browser';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);
  const [formStatus, setFormStatus] = useState<string>('');

  const toggleFAQ = (index: number) => {
    // @ts-expect-error okay
    setOpenIndex(openIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "Which technologies are you most proficient in?",
      answer: "I specialize in React, Next.js, TypeScript, Tailwind CSS, Firebase, and backend technologies like Node.js and Prisma.",
    },
    {
      question: "How many real-world projects have you developed?",
      answer: "I've built over 5 full-stack projects, including AI-driven applications, web scrapers, and interactive platforms.",
    },
    {
      question: "Have you worked with AI and machine learning?",
      answer: "Yes, I've integrated AI models like Gemini AI and have hands-on experience with PyTorch and machine learning concepts.",
    },
    {
      question: "What’s your experience with Data Structures and Algorithms?",
      answer: "I have solved 100+ DSA problems on platforms like LeetCode and Codeforces, focusing on problem-solving and optimization.",
    },
    {
      question: "Are you available for freelance or open-source collaborations?",
      answer: "Yes, I'm open to freelance and collaborative opportunities, especially in web development, AI, and software engineering.",
    },
  ];

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
        // @ts-expect-error okay
       process.env.SERVICE_ID,
       process.env.TEMPLATE_ID,
        form,
        process.env.PUBLIC_KEY
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
        ${theme === 'dark' ? 'text-foreground bg-background' : 'text-foreground bg-background'}`}
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
                    I’m a designer and developer focused on creating minimal, elegant digital experiences.
                    My work combines clean aesthetics with thoughtful functionality, leveraging modern
                    technologies to build memorable interfaces.
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
        I’m a developer and student with <strong className="font-medium">1+ year</strong> of experience in web development and <strong className="font-medium">100+</strong> solved DSA problems across platforms like LeetCode and Codeforces. My focus is on building scalable, user-centric solutions with a blend of creativity and technical precision.
      </p>
      <p>
        My expertise spans a wide range of technologies, including:
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
      <p>
        I have built <strong className="font-medium">5+</strong> full-stack projects, including AI-driven applications, web scrapers, and interactive platforms. I specialize in front-end development, backend systems, and AI integrations, constantly refining my skills and exploring innovative solutions.
      </p>
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
                          className="w-full p-2 bg-transparent border-b border-gray-700 focus:border-white outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm opacity-75 mb-1 font-light">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email" // Required for EmailJS
                          required
                          className="w-full p-2 bg-transparent border-b border-gray-700 focus:border-white outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm opacity-75 mb-1 font-light">Message</label>
                        <textarea
                          id="message"
                          name="message" // Required for EmailJS
                          rows={4}
                          required
                          className="w-full p-2 bg-transparent border-b border-gray-700 focus:border-white outline-none transition-colors"
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
              {activeSection === 'faq' && (
                <div className="fade-in font-roboto">
                  <h2 className="text-3xl font-medium mb-6 tracking-tight">FAQ</h2>
                  <div className="max-w-2xl space-y-6">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-b border-gray-700 pb-3">
                        <button
                          onClick={() => toggleFAQ(index)}
                          className="flex justify-between items-center w-full text-left text-xl font-medium mb-2 tracking-tight"
                        >
                          {faq.question}
                          {openIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: openIndex === index ? 'auto' : 0, opacity: openIndex === index ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden opacity-80"
                        >
                          <p className="mt-2 text-lg font-light">{faq.answer}</p>
                        </motion.div>
                      </div>
                    ))}
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