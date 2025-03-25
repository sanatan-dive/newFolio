import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useState } from 'react';
// Import your images correctly
import project1 from "@/projects/project-1.webp";
import project2 from "@/projects/project-2.webp";
import project3 from "@/projects/project-3.webp";
import project4 from "@/projects/project-4.webp";

interface ThemeContextType {
  theme: 'light' | 'dark';
}

// Mock ThemeContext - replace with your actual theme context
const ThemeContext = {
  Consumer: ({ children }: { children: (context: ThemeContextType) => React.ReactNode }) => 
    children({ theme: 'dark' }) // Default to dark, replace with your actual context
};

interface Project {
  // eslint-disable-next-line
  image: any; 
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
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
          
          {/* Info overlay - visible on hover (desktop) or tap (mobile) */}
          <div 
            className={`absolute inset-0 ${theme === 'light' ? 'bg-white' : 'bg-black'} ${theme === 'light' ? 'bg-opacity-80' : 'bg-opacity-60'} flex flex-col justify-end p-4 sm:p-6 backdrop-blur-sm transition-opacity duration-500
              ${isActive ? 'opacity-100' : 'opacity-0 hover:opacity-75'}`}
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
  const projects: Project[] = [
    {
      image: project2,  
      title: 'KOSU',
      description: 'An event hosting platform for seamless hackathon organization, engagement hiring, utilizing AI automation and blockchain-based tokens and rewards.',
      githubLink: 'https://github.com/sanatan-dive/kosu',
      liveLink: 'https://kosu-xi.vercel.app/',
    },
    {
      image: project1,  
      title: 'Learnify',
      description: 'A web platform that curates top learning resources from YouTube, Udemy, Coursera, and blogs.',
      githubLink: 'https://github.com/sanatan-dive/learnify',
      liveLink: 'https://drive.google.com/file/d/1BcwIWMqF_JLxzu_MP2X9FZN4zvnJHMX7/view',
    },
    {
      image: project3,  
      title: 'Hackathon Club Website',
      description: 'A platform to discover and register for hackathons, connect with developers, and showcase skills.',
      githubLink: 'https://github.com/sanatan-dive/hackathon-club-frontend',
      liveLink: 'https://hackathon-club-frontend.vercel.app/home',
    },
    {
      image: project4,  
      title: 'Twibble',
      description: 'An AI-powered chatbot that mimics Twitter users’ personas for engaging conversations.',
      githubLink: 'https://github.com/sanatan-dive/xchatbot',
      liveLink: 'https://twibble-alpha.vercel.app/',
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
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}