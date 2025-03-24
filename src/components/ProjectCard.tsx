import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaLink } from 'react-icons/fa';

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
  return (
    <div
      className="group relative overflow-hidden h-80 opacity-0 animate-fadeInUp font-manrope"
      style={{
        animationDelay: `${0.2 * index}s`,
        animationFillMode: 'forwards',
      }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-2xl font-semibold">{project.title}</h3>
          <div className="flex gap-3">
            <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white text-2xl hover:text-gray-300 transition-colors duration-300" />
            </Link>
            <Link href={project.liveLink} target="_blank" rel="noopener noreferrer">
              <FaLink className="text-white text-2xl hover:text-gray-300 transition-colors duration-300" />
            </Link>
          </div>
        </div>
        <p className="text-gray-300 mb-4 font-light">{project.description}</p>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors duration-300 font-medium">
            View Details
          </button>
          <Link
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white hover:bg-white hover:text-black transition-colors duration-300 text-center font-medium"
          >
            Visit Site
          </Link>
        </div>
      </div>
    </div>
  );
}

interface ProjectsSectionProps {
  activeSection: string;
}

export default function ProjectsSection({ activeSection }: ProjectsSectionProps) {
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
        <div className="fade-in font-manrope">
          <h2 className="text-3xl font-semibold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}