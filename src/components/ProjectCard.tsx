import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLink } from 'react-icons/fa';
import { useState, useContext } from 'react';

// Assuming you have a theme context in your app
// If you don't already have one, you'll need to implement it
interface ThemeContextType {
  theme: 'light' | 'dark';
}

// Mock ThemeContext - replace with your actual theme context
const ThemeContext = {
  Consumer: ({ children }: { children: (context: ThemeContextType) => React.ReactNode }) => 
    children({ theme: 'dark' }) // Default to dark, replace with your actual context
};

interface Project {
  image: string;
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
          className="group relative overflow-hidden h-60 sm:h-80 opacity-0 animate-fadeInUp font-manrope"
          style={{
            animationDelay: `${0.2 * index}s`,
            animationFillMode: 'forwards',
          }}
          onClick={() => setIsActive(!isActive)}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-110 filter ${theme === 'dark' ? 'grayscale' : 'grayscale-[50%]'}`}
          />
          
          {/* Info overlay - visible on hover (desktop) or tap (mobile) */}
          <div 
            className={`absolute inset-0 ${theme === 'light' ? 'bg-white' : 'bg-black'} ${theme === 'light' ? 'bg-opacity-80' : 'bg-opacity-60'} flex flex-col justify-end p-4 sm:p-6 backdrop-blur-sm transition-opacity duration-500
              ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-xl sm:text-2xl font-semibold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{project.title}</h3>
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
            <p className={`mb-3 sm:mb-4 text-sm sm:text-base font-light ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{project.description}</p>
            <div className="flex gap-3 sm:gap-4">
              <button 
                className={`px-3 py-1.5 sm:px-4 sm:py-2 font-medium text-sm sm:text-base transition-colors duration-300 
                  ${theme === 'light' 
                    ? 'border border-black text-black hover:bg-black hover:text-white' 
                    : 'border border-white text-white hover:bg-white hover:text-black'}`}
                onClick={(e) => e.stopPropagation()}
              >
                View Details
              </button>
              <Link
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-3 py-1.5 sm:px-4 sm:py-2 font-medium text-sm sm:text-base text-center transition-colors duration-300
                  ${theme === 'light' 
                    ? 'border border-black text-black hover:bg-black hover:text-white' 
                    : 'border border-white text-white hover:bg-white hover:text-black'}`}
                onClick={(e) => e.stopPropagation()}
              >
                Visit Site
              </Link>
            </div>
          </div>
          
          {/* Mobile indicator that hints at the card being interactive */}
          <div className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center sm:hidden
            ${theme === 'light' ? 'bg-black bg-opacity-20' : 'bg-white bg-opacity-20'}`}>
            <span className={`text-xs font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>+</span>
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
      image: '/api/placeholder/600/400',
      title: 'Project 1',
      description: 'An innovative design and development solution',
      githubLink: 'https://github.com/username/project1',
      liveLink: 'https://project1.example.com',
    },
    {
      image: '/api/placeholder/600/400',
      title: 'Project 2',
      description: 'Creative digital experience platform',
      githubLink: 'https://github.com/username/project2',
      liveLink: 'https://project2.example.com',
    },
    {
      image: '/api/placeholder/600/400',
      title: 'Project 3',
      description: 'Modern web application architecture',
      githubLink: 'https://github.com/username/project3',
      liveLink: 'https://project3.example.com',
    },
    {
      image: '/api/placeholder/600/400',
      title: 'Project 4',
      description: 'Scalable enterprise solution',
      githubLink: 'https://github.com/username/project4',
      liveLink: 'https://project4.example.com',
    },
  ];

  return (
    <>
      {activeSection === 'projects' && (
        <div className={`fade-in font-manrope px-4 sm:px-0 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">Projects</h2>
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