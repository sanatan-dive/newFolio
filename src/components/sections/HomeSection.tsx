"use client";

import { SiLeetcode } from "react-icons/si";
import { FileText, Github, Linkedin, Twitter } from 'lucide-react';
import SocialLink from '@/components/SocialLink';

interface HomeSectionProps {
  theme: 'dark' | 'light';
}

export default function HomeSection({ theme }: HomeSectionProps) {
  return (
    <div className="fade-in font-body">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 tracking-tight font-heading">
        Welcome
      </h2>
      <div className="max-w-3xl opacity-90 leading-relaxed text-base sm:text-lg font-light space-y-6">
        <p className="text-balance">
          I&apos;m a designer and developer passionate about crafting minimal, elegant digital experiences. 
          Across various projects, I&apos;ve achieved <strong className="font-semibold text-primary">50K+</strong> impressions 
          and <strong className="font-semibold text-primary">1000+</strong> users within <strong className="font-semibold text-primary">24K+</strong> hours, 
          showcasing the reach and impact of my work.
        </p>
       
        <div className="flex gap-4 sm:gap-6 flex-wrap">
          <SocialLink 
            href="https://drive.google.com/file/d/1OvGCrI1Lc1c4OkufAJ6ZHkbRJPODzC8n/view?usp=sharing" 
            icon={<FileText className="w-5 h-5 sm:w-6 sm:h-6" />} 
            label="Resume" 
            theme={theme}
            className="hidden sm:flex" 
          />
          
          <SocialLink 
            href="https://github.com/sanatan-dive" 
            icon={<Github className="w-5 h-5 sm:w-6 sm:h-6" />} 
            label="GitHub"
            theme={theme}
          />
          
          <SocialLink 
            href="https://linkedin.com/in/sanatan-sharma-637605266" 
            icon={<Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />} 
            label="LinkedIn"
            theme={theme}
          />
          
          <SocialLink 
            href="https://twitter.com/Sanatan_dive" 
            icon={<Twitter className="w-5 h-5 sm:w-6 sm:h-6" />} 
            label="Twitter"
            theme={theme}
          />
          
          <SocialLink 
            href="https://leetcode.com/Sanatan_dive" 
            icon={<SiLeetcode className="w-5 h-5 sm:w-6 sm:h-6" />} 
            label="LeetCode"
            theme={theme}
          />
        </div>

        <hr className={`border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} transition-colors duration-300`} />
        
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3 tracking-tight font-heading">
            Contact Me
          </h3>
          <p className="text-base sm:text-lg font-light">
            <a
              href="mailto:sanatansharma352@gmail.com"
              className={`transition-all duration-300 hover:underline underline-offset-4
                ${theme === 'dark' ? 'hover:text-primary' : 'hover:text-primary'}
                focus:underline focus:outline-none`}
            >
              sanatansharma350@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
