import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useState } from 'react';
// Import your images correctly
import project1 from '@/projects/project-1.webp';
import project2 from '@/projects/project-2.webp';
import project3 from '@/projects/project-3.webp';
import project4 from '@/projects/project-4.webp';
import project5 from '@/projects/project-5.webp';
import project6 from '@/projects/project-6.webp';
import project7 from '@/projects/project-7.webp';
import project8 from '@/projects/project-8.webp';
import project9 from '@/projects/project-9.webp';

interface Project {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any; 
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  status: 'live' | 'working';
}

interface ProjectCardProps {
  project: Project;
  index: number;
  theme?: 'light' | 'dark';
}

function ProjectCard({ project, index, theme = 'dark' }: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="group relative h-60 sm:h-80 opacity-0 overflow-hidden animate-fadeInUp cursor-pointer focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-current rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 ease-out"
      style={{
        animationDelay: `${0.1 * index}s`,
        animationFillMode: 'forwards',
        '--index': index,
        willChange: 'transform, opacity, box-shadow'
      } as React.CSSProperties}
      onClick={() => setIsActive(!isActive)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsActive(!isActive);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title}`}
      aria-expanded={isActive}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 filter ${
          theme === 'dark' ? 'grayscale-25' : 'grayscale-50'
        } group-hover:grayscale-0`}
        sizes="(max-width: 640px) 100vw, 50vw"
        priority={index < 4}
        style={{ willChange: 'transform, filter' }}
      />
      
      {/* Status Tag */}
      <div 
        className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md z-10 
          transition-all duration-300 ease-out transform
          ${isActive || 'group-hover:opacity-100 group-hover:scale-100'} 
          ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          ${project.status === 'live' 
            ? 'bg-green-500/90 text-white shadow-lg shadow-green-500/25' 
            : 'bg-yellow-500/90 text-white shadow-lg shadow-yellow-500/25'}`}
      >
        {project.status === 'live' ? '● Live' : '● Working'}
      </div>
      
      {/* Info overlay */}
      <div 
        className={`absolute inset-0 ${
          theme === 'light' ? 'bg-white/95' : 'bg-black/80'
        } flex flex-col justify-end p-4 sm:p-6 backdrop-blur-md transition-all duration-500 ease-out
          ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-xl sm:text-2xl font-semibold ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}>
            {project.title}
          </h3>
          <div className="flex gap-2 sm:gap-3">
            <Link 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="transition-transform duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-current rounded"
              aria-label={`View ${project.title} on GitHub`}
            >
              <FaGithub className={`text-xl sm:text-2xl transition-colors duration-300 ${
                theme === 'light' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
              }`} />
            </Link>
            <Link 
              href={project.liveLink} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="transition-transform duration-200 hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-current rounded"
              aria-label={`Visit ${project.title} live site`}
            >
              <FaLink className={`text-xl sm:text-2xl transition-colors duration-300 ${
                theme === 'light' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'
              }`} />
            </Link>
          </div>
        </div>
        <p className={`mb-3 sm:mb-4 text-sm sm:text-base font-light leading-relaxed ${
          theme === 'light' ? 'text-gray-700' : 'text-gray-300'
        }`}>
          {project.description}
        </p>
        <div className="flex gap-3 sm:gap-4">
          <Link
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-medium text-sm sm:text-base text-center transition-all duration-300 ease-out hover:translate-y-[-2px] hover:shadow-lg focus:translate-y-[-2px] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
              ${theme === 'light' 
                ? 'border border-black text-black hover:bg-black hover:text-white focus:bg-black focus:text-white' 
                : 'border border-white text-white hover:bg-white hover:text-black focus:bg-white focus:text-black'}`}
            onClick={(e) => e.stopPropagation()}
          >
            Visit Site
          </Link>
        </div>
      </div>
      
      {/* Mobile interaction indicator */}
      <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center sm:hidden transition-all duration-300 ${
        theme === 'dark' ? 'bg-white/20 backdrop-blur-sm' : 'bg-black/20 backdrop-blur-sm'
      } ${isActive ? 'rotate-45' : ''}`}>
        <span className={`text-xs font-bold transition-colors duration-300 ${
          theme === 'dark' ? 'text-white' : 'text-black'
        }`}>
          +
        </span>
      </div>
    </div>
  );
}

interface ProjectsSectionProps {
  activeSection: string;
  theme?: 'light' | 'dark';
}

export default function ProjectsSection({ activeSection, theme = 'dark' }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const projects: Project[] = [
    {
      image: project8,
      title: 'Aura Protocol',
      description: 'AuraProtocol is an AI-driven DeFi platform that uses machine learning to optimize on-chain governance, trading fees, and token launch workflows.',
      githubLink: 'https://github.com/adityajha2005/Aura',
      liveLink: 'https://auraprotocol.vercel.app',
      status: 'live',
    },
    {
      image: project5,
      title: 'Capsulr',
      description: 'TimeCapsule lets you send messages, memories, or surprises into the future — all stored safely on the blockchain.',
      githubLink: 'https://github.com/sanatan-dive/chronos',
      liveLink: 'https://t-ime-capsule-monad.vercel.app',
      status: 'live',
    },
    {
      image: project6,  
      title: 'Hirin',
      description: 'Get hired using hiring, we automate the process of finding a job',
      githubLink: 'https://github.com/sanatan-dive/hiring',
      liveLink: 'https://hiring-blue.vercel.app/',
      status: 'working',
    },
    {
      image: project9,
      title: 'SwapiNad',
      description: 'A Fun DEX for swapping tokens in monad',
      githubLink: 'https://github.com/sanatan-dive/swapinad',
      liveLink: 'https://swapinad.vercel.app/',
      status: 'live',
    },
    {
      image: project1,  
      title: 'Learnify',
      description: 'A web platform that curates top learning resources from YouTube, Udemy, Coursera, and blogs.',
      githubLink: 'https://github.com/sanatan-dive/learnify',
      liveLink: 'https://drive.google.com/file/d/1BcwIWMqF_JLxzu_MP2X9FZN4zvnJHMX7/view',
      status: 'working',
    },
   
    {
      image: project7,  
      title: 'Madio',
      description: 'Generate beautiful mathematical equations with just a prompt.',
      githubLink: 'https://github.com/sanatan-dive/manim',
      liveLink: 'https://manim-eosin.vercel.app/',
      status: 'working',
    },
     {
      image: project2,  
      title: 'KOSU',
      description: 'An event hosting platform for seamless hackathon organization, engagement hiring, utilizing AI automation and blockchain-based tokens and rewards.',
      githubLink: 'https://github.com/sanatan-dive/kosu',
      liveLink: 'https://kosu-xi.vercel.app/',
      status: 'live',
    },
    {
      image: project3,  
      title: 'Hackathon Club Website',
      description: 'A platform to discover and register for hackathons, connect with developers, and showcase skills.',
      githubLink: 'https://github.com/sanatan-dive/hackathon-club-frontend',
      liveLink: 'https://hackathon-club-frontend.vercel.app/home',
      status: 'live',
    },
    {
      image: project4,  
      title: 'Twibble',
      description: 'An AI-powered chatbot that mimics Twitter users personas for engaging conversations.',
      githubLink: 'https://github.com/sanatan-dive/xchatbot',
      liveLink: 'https://twibble-alpha.vercel.app/',
      status: 'live',
    },
  ];

  const visibleProjects = showAll || typeof window !== 'undefined' && window.innerWidth >= 640 
    ? projects 
    : projects.slice(0, 3);

  return (
    <>
      {activeSection === 'projects' && (
        <div className={`fade-in px-4 overflow-hidden sm:px-0 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 font-inter ">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-hidden sm:gap-6">
            {visibleProjects.map((project, index) => (
              <div
                key={`${project.title}-${index}`}
                style={{
                  animationDelay: `${0.1 * index}s`
                }}
                className="opacity-0 animate-fadeInUp"
              >
                <ProjectCard 
                  project={project} 
                  index={index} 
                  theme={theme}
                />
              </div>
            ))}
          </div>
          {/* View More/View Less Button - Visible only on mobile */}
          {projects.length > 3 && (
            <div className="flex justify-center mt-6 sm:hidden">
              <button
                onClick={() => setShowAll(!showAll)}
                aria-expanded={showAll}
                aria-label={showAll ? 'Collapse to show fewer projects' : 'Expand to show more projects'}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ease-out hover:translate-y-[-2px] hover:shadow-lg focus:translate-y-[-2px] focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current
                  ${theme === 'light'
                    ? 'border border-black text-black hover:bg-black hover:text-white focus:bg-black focus:text-white'
                    : 'border border-white text-white hover:bg-white hover:text-black focus:bg-white focus:text-black'}`}
              >
                {showAll ? 'View Less' : 'View More'}
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}