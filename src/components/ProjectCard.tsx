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

interface ThemeContextType {
  theme: 'light' | 'dark';
}

// Mock ThemeContext - replace with your actual theme context
const ThemeContext = {
  Consumer: ({ children }: { children: (context: ThemeContextType) => React.ReactNode }) => 
    children({ theme: 'dark' }) // Default to dark, replace with your actual context
};

interface Project {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  image: any; 
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  status: 'live' | 'working'; // Added status field
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <ThemeContext.Consumer>
      {({ theme }) => (
        <div
          className="group relative overflow-hidden h-60 sm:h-80 opacity-0 animate-fadeInUp"
          style={{
            animationDelay: `${0.2 * index}s`,
            animationFillMode: 'forwards',
            fontFamily: 'var(--font-manrope)' // Explicitly set font-family
          }}
          onClick={() => setIsActive(!isActive)}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-110 filter ${theme === 'dark' ? 'grayscale-25' : 'grayscale-50'}`}
          />
          
          {/* Status Tag - appears on hover */}
          <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm z-10 
            transition-all duration-300 transform
            ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}
            ${project.status === 'live' 
              ? 'bg-green-500 bg-opacity-90 text-white shadow-lg shadow-green-500/25' 
              : 'bg-yellow-500 bg-opacity-90 text-white shadow-lg shadow-yellow-500/25'}`}
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            {project.status === 'live' ? '● Live' : '● Working'}
          </div>
          
          {/* Info overlay - visible on hover (desktop) or tap (mobile) */}
          <div 
            className={`absolute inset-0 ${theme === 'light' ? 'bg-white' : 'bg-black'} ${theme === 'light' ? 'bg-opacity-80' : 'bg-opacity-60'} flex flex-col justify-end p-4 sm:p-6 backdrop-blur-sm transition-opacity duration-500
              ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-75'}`}
            style={{ fontFamily: 'var(--font-manrope)' }} // Explicitly set font-family
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-xl sm:text-2xl font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`} style={{ fontFamily: 'var(--font-manrope)' }}>{project.title}</h3>
              <div className="flex gap-2 sm:gap-3">
                <Link 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGithub className={`text-xl sm:text-2xl transition-colors duration-300 ${theme === 'light' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`} />
                </Link>
                <Link 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaLink className={`text-xl sm:text-2xl transition-colors duration-300 ${theme === 'light' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`} />
                </Link>
              </div>
            </div>
            <p 
              className={`mb-3 sm:mb-4 text-sm sm:text-base font-light ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {project.description}
            </p>
            <div className="flex gap-3 sm:gap-4">
              <Link
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded font-medium text-sm sm:text-base text-center transition-colors duration-300
                  ${theme === 'light' 
                    ? 'border border-black text-black hover:bg-black hover:text-white' 
                    : 'border border-white text-white hover:bg-white hover:text-black'}`}
                onClick={(e) => e.stopPropagation()}
                style={{ fontFamily: 'var(--font-manrope)' }}
              >
                Visit Site
              </Link>
            </div>
          </div>
          
          {/* Mobile indicator that hints at the card being interactive */}
          <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center sm:hidden
            ${theme === 'dark' ? 'bg-white bg-opacity-20' : 'bg-black bg-opacity-20'}`}>
            <span className={`text-xs font-bold ${theme === 'dark' ? 'text-black' : 'text-white'}`}>+</span>
          </div>
        </div>
      )}
    </ThemeContext.Consumer>
  );
}

interface ProjectsSectionProps {
  activeSection: string;
  theme?: 'light' | 'dark'; // Optional prop to manually control theme
}

export default function ProjectsSection({ activeSection, theme = 'dark' }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false); // State to toggle showing all projects on mobile

  const projects: Project[] = [
    {
      image: project5,
      title: 'Capsulr',
      description: 'TimeCapsule lets you send messages, memories, or surprises into the future — all stored safely on the blockchain.',
      githubLink: 'https://github.com/sanatan-dive/chronos',
      liveLink: 'https://t-ime-capsule-monad.vercel.app',
      status: 'live', // Added status
    },
    {
      image: project6,  
      title: 'Hirin',
      description: 'Get hired using hiring, we automate the process of finding a job',
      githubLink: 'https://github.com/sanatan-dive/hiring',
      liveLink: 'https://hiring-blue.vercel.app/',
      status: 'working', // Added status
    },
    {
      image: project1,  
      title: 'Learnify',
      description: 'A web platform that curates top learning resources from YouTube, Udemy, Coursera, and blogs.',
      githubLink: 'https://github.com/sanatan-dive/learnify',
      liveLink: 'https://drive.google.com/file/d/1BcwIWMqF_JLxzu_MP2X9FZN4zvnJHMX7/view',
      status: 'working', // Added status
    },
    {
      image: project2,  
      title: 'KOSU',
      description: 'An event hosting platform for seamless hackathon organization, engagement hiring, utilizing AI automation and blockchain-based tokens and rewards.',
      githubLink: 'https://github.com/sanatan-dive/kosu',
      liveLink: 'https://kosu-xi.vercel.app/',
      status: 'live', // Added status
    },
    
    {
      image: project3,  
      title: 'Hackathon Club Website',
      description: 'A platform to discover and register for hackathons, connect with developers, and showcase skills.',
      githubLink: 'https://github.com/sanatan-dive/hackathon-club-frontend',
      liveLink: 'https://hackathon-club-frontend.vercel.app/home',
      status: 'live', // Added status
    },
    {
      image: project4,  
      title: 'Twibble',
      description: 'An AI-powered chatbot that mimics Twitter users personas for engaging conversations.',
      githubLink: 'https://github.com/sanatan-dive/xchatbot',
      liveLink: 'https://twibble-alpha.vercel.app/',
      status: 'live', // Added status
    },
    
  ];

  return (
    <>
      {activeSection === 'projects' && (
        <div 
          className={`fade-in px-4 sm:px-0 ${theme === 'light' ? 'text-black' : 'text-white'}`}
          style={{ fontFamily: 'var(--font-manrope)' }} // Explicitly set font-family
        >
          <h2 
            className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6"
            style={{ fontFamily: 'var(--font-manrope)' }}
          >
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {projects.slice(0, showAll || window.innerWidth >= 640 ? projects.length : 3).map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
          {/* View More/View Less Button - Visible only on mobile */}
          {projects.length > 3 && (
            <div className="flex justify-center mt-6 sm:hidden">
              <button
                onClick={() => setShowAll(!showAll)}
                aria-expanded={showAll}
                aria-label={showAll ? 'Collapse to show fewer projects' : 'Expand to show more projects'}
                className={`px-4 py-2 rounded font-medium text-sm sm:text-base transition-colors duration-300
                  ${theme === 'light'
                    ? 'border border-black text-black hover:bg-black hover:text-white'
                    : 'border border-white text-white hover:bg-white hover:text-black'}`}
                style={{ fontFamily: 'var(--font-manrope)' }}
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