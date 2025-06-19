"use client";

import { useState } from 'react';
import { Home, FolderOpen, Info, FileText, Github, Linkedin, Twitter } from 'lucide-react';
import { SiLeetcode } from 'react-icons/si';
import { Theme, Section } from '../types';

// Dock Components (based on your provided dock code)
interface DockProps {
  children: React.ReactNode;
  direction?: "top" | "middle" | "bottom";
  className?: string;
}

interface DockIconProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Dock = ({ children, direction = "middle", className = "" }: DockProps) => {
  return (
    <div className={`flex items-center justify-center p-2 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 ${className}`}>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
};

const DockIcon = ({ children, className = "", onClick }: DockIconProps) => {
  return (
    <div 
      className={`flex items-center justify-center w-12 h-12 rounded-xl hover:bg-white/10 transition-all duration-200 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  theme?: Theme;
}

export default function Navigation({ activeSection, setActiveSection, theme = 'dark' }: NavigationProps) {
  const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home size={20} /> },
    { id: 'projects', label: 'Projects', icon: <FolderOpen size={20} /> },
    { id: 'info', label: 'Info', icon: <Info size={20} /> },
  ];

  const socialLinks = [
    {
      href: "https://drive.google.com/file/d/1OvGCrI1Lc1c4OkufAJ6ZHkbRJPODzC8n/view?usp=sharing",
      icon: <FileText size={20} />,
      label: "Resume"
    },
    {
      href: "https://github.com/sanatan-dive",
      icon: <Github size={20} />,
      label: "GitHub"
    },
    {
      href: "https://linkedin.com/in/sanatan-sharma-637605266",
      icon: <Linkedin size={20} />,
      label: "LinkedIn"
    },
    {
      href: "https://twitter.com/Sanatan_dive",
      icon: <Twitter size={20} />,
      label: "Twitter"
    },
    {
      href: "https://leetcode.com/Sanatan_dive",
      icon: <SiLeetcode size={20} />,
      label: "LeetCode"
    }
  ];

  const handleNavClick = (section: Section) => {
    setActiveSection(section);
    
    // On desktop view (md and above), use smooth scrolling
    const element = document.getElementById(section);
    if (element && window.innerWidth >= 768) { // 768px is the md breakpoint in Tailwind
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialClick = (href: string) => {
    window.open(href, '_blank', 'noopener noreferrer');
  };

  return (
    <div>
    <nav
      className="relative fade-in"
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      {/* Desktop Navigation */}
      <ul className="hidden md:block space-y-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleNavClick(item.id)}
              className={`text-sm hover:opacity-100 transition-opacity
                ${activeSection === item.id ? 'opacity-100' : 'opacity-50'}
              `}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Dock Navigation */}
      

     
    </nav>
    <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <Dock direction="middle">
          {/* Navigation Items */}
          {navItems.map((item) => (
            <DockIcon
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative group ${
                activeSection === item.id ? 'bg-white/20' : ''
              }`}
            >
              <div className={`${activeSection === item.id ? 'text-white' : 'text-white/70'}`}>
                {item.icon}
              </div>
              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {item.label}
              </span>
            </DockIcon>
          ))}
          
          {/* Divider */}
          <div className="w-px h-8 bg-white/20 mx-1"></div>
          
          {/* Social Links */}
          {socialLinks.map((link, index) => (
            <DockIcon
              key={index}
              onClick={() => handleSocialClick(link.href)}
              className="relative group"
            >
              <div className="text-white/70 hover:text-white transition-colors">
                {link.icon}
              </div>
              {/* Tooltip */}
              <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-max px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {link.label}
              </span>
            </DockIcon>
          ))}
        </Dock>
      </div>
      </div>
  );
}