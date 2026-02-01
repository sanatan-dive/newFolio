"use client";

import React from 'react';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  theme: 'dark' | 'light';
  className?: string;
}

export default function SocialLink({ href, icon, label, theme, className = "" }: SocialLinkProps) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`relative group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12
        rounded-xl transition-all duration-300
        hover:scale-110 hover:-translate-y-1
        focus:scale-110 focus:-translate-y-1 focus:outline-none 
        focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
        ${theme === 'dark' 
          ? 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white' 
          : 'bg-black/5 hover:bg-black/10 text-black/70 hover:text-black'
        }
        ${className}`}
      aria-label={label}
    >
      {icon}
      {/* Tooltip */}
      <span className={`absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 
        w-max px-3 py-1.5 text-xs font-medium rounded-lg
        opacity-0 group-hover:opacity-100 pointer-events-none
        transition-all duration-300 scale-90 group-hover:scale-100
        ${theme === 'dark' 
          ? 'bg-white text-black' 
          : 'bg-black text-white'
        }`}
      >
        {label}
      </span>
    </a>
  );
}
