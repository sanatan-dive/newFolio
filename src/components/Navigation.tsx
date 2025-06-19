"use client";

import React, { useState } from 'react';
import { Home, FolderOpen, Info, FileText, Github, Linkedin, Twitter, Sun, Moon } from 'lucide-react';
import { Theme } from '../types';

// Enhanced Dock Components with magnification
interface DockProps {
  children: React.ReactNode;
  className?: string;
  iconMagnification?: number;
  iconDistance?: number;
}

interface DockIconProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  scale?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Dock = ({ children, className = "", iconMagnification = 60, iconDistance = 100 }: DockProps) => {
  return (
    <div className={`flex items-center justify-center p-1.5 bg-black/20 dark:bg-black/40 backdrop-blur-md rounded-xl border border-white/10 dark:border-white/20 ${className}`}>
      <div className="flex items-center gap-0.5">
        {children}
      </div>
    </div>
  );
};

const DockIcon = ({ children, className = "", onClick, onMouseEnter, onMouseLeave, scale = 1 }: DockIconProps) => {
  return (
    <div 
      className={`flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 dark:hover:bg-white/20 transition-all duration-300 cursor-pointer transform ${className}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: 'center bottom'
      }}
    >
      {children}
    </div>
  );
};

// Theme and Section types are imported or defined
type Section = 'home' | 'projects' | 'info';

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  theme: Theme;
  toggleTheme: () => void;
}

export default function Navigation({ activeSection, setActiveSection, theme, toggleTheme }: NavigationProps) {
  const [hoveredIcon, setHoveredIcon] = useState<number | null>(null);

  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={14} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={14} /> },
    { id: 'info', label: 'Info', icon: <Info size={14} /> },
  ];

  const socialLinks = [
    {
      href: "https://drive.google.com/file/d/1OvGCrI1Lc1c4OkufAJ6ZHkbRJPODzC8n/view?usp=sharing",
      icon: <FileText size={14} />,
      label: "Resume"
    },
    {
      href: "https://github.com/sanatan-dive",
      icon: <Github size={14} />,
      label: "GitHub"
    },
    {
      href: "https://linkedin.com/in/sanatan-sharma-637605266",
      icon: <Linkedin size={14} />,
      label: "LinkedIn"
    },
    {
      href: "https://twitter.com/Sanatan_dive",
      icon: <Twitter size={14} />,
      label: "Twitter"
    },
  ];

  const handleNavClick = (section: Section) => {
    setActiveSection(section);
    
    // Smooth scrolling for desktop
    const element = document.getElementById(section);
    if (element && window.innerWidth >= 768) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener noreferrer');
  };

  const getIconScale = (index: number) => {
    if (hoveredIcon === null) return 1;
    const distance = Math.abs(index - hoveredIcon);
    if (distance === 0) return 1.25;
    if (distance === 1) return 1.1;
    if (distance === 2) return 1.0;
    return 1;
  };

  const allItems = [...navItems, ...socialLinks.map(link => ({ ...link, id: link.label }))];

  return (
    <div className="transition-colors duration-300">
      {/* Desktop Navigation */}
      <nav
        className="hidden md:block relative fade-in"
        style={{ fontFamily: 'var(--font-manrope, system-ui)' }}
      >
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`text-sm hover:opacity-100 transition-opacity 
                  ${activeSection === item.id ? 'opacity-100 ' : 'opacity-50'}
                `}
                style={{ fontFamily: 'var(--font-manrope, system-ui)' }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Dock Navigation */}
      <div className="md:hidden fixed bottom-3 left-1/2 transform -translate-x-1/2 z-50">
        <Dock>
          {/* Navigation Items */}
          {navItems.map((item, index) => (
            <DockIcon
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => setHoveredIcon(index)}
              onMouseLeave={() => setHoveredIcon(null)}
              scale={getIconScale(index)}
              className={`relative group ${
                activeSection === item.id ? 'bg-white/20 dark:bg-white/30' : ''
              }`}
            >
              <div className={`transition-colors duration-200 ${
                activeSection === item.id 
                  ? 'text-white dark:text-white' 
                  : 'text-white/70 dark:text-white/60'
              }`}>
                {item.icon}
              </div>
              {/* Tooltip */}
              <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max px-1 py-0.5 bg-black/80 dark:bg-black/90 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                {item.label}
              </span>
            </DockIcon>
          ))}
          
          {/* Divider */}
          <div className="w-px h-5 bg-white/20 dark:bg-white/30 mx-0.5"></div>
          
          {/* Social Links */}
          {socialLinks.map((link, index) => {
            const iconIndex = navItems.length + 1 + index; // +1 for divider
            return (
              <DockIcon
                key={index}
                onClick={() => handleSocialClick(link.href)}
                onMouseEnter={() => setHoveredIcon(iconIndex)}
                onMouseLeave={() => setHoveredIcon(null)}
                scale={getIconScale(iconIndex)}
                className="relative group"
              >
                <div className="text-white/70 dark:text-white/60 hover:text-white dark:hover:text-white transition-colors duration-200">
                  {link.icon}
                </div>
                {/* Tooltip */}
                <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max px-1 py-0.5 bg-black/80 dark:bg-black/90 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  {link.label}
                </span>
              </DockIcon>
            );
          })}

          {/* Another Divider */}
          <div className="w-px h-5 bg-white/20 dark:bg-white/30 mx-0.5"></div>
          
          {/* Theme Toggle */}
          <DockIcon
            onClick={toggleTheme}
            onMouseEnter={() => setHoveredIcon(allItems.length + 1)} // +1 for divider
            onMouseLeave={() => setHoveredIcon(null)}
            scale={getIconScale(allItems.length + 1)}
            className="relative group"
          >
            <div className="text-white/70 dark:text-white/60 hover:text-white dark:hover:text-white transition-colors duration-200">
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </div>
            {/* Tooltip */}
            <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 w-max px-1 py-0.5 bg-black/80 dark:bg-black/90 text-white text-[9px] rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}