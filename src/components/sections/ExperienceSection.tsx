"use client";

interface ExperienceSectionProps {
  theme: 'dark' | 'light';
}

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  type: 'primary' | 'accent';
  responsibilities: string[];
}

export default function ExperienceSection({ theme }: ExperienceSectionProps) {
  const experiences: ExperienceItem[] = [
    {
      title: 'Product Engineer Intern',
      company: 'Dodge AI',
      period: 'August 2025 – October 2025',
      location: 'Remote',
      type: 'primary',
      responsibilities: [
        'Converting Figma designs into pixel-perfect, responsive frontend interfaces using modern frameworks',
        'Building robust APIs with comprehensive error handling and optimized data retrieval mechanisms',
        'Integrating APIs seamlessly with frontend components to ensure smooth data flow and user interactions',
        'Implementing authentication systems and middleware for secure and scalable web application architecture',
      ],
    },
    {
      title: 'Vice President',
      company: 'Hackathon Club of CCET',
      period: 'November 2024 – Present',
      location: 'Onsite, India',
      type: 'accent',
      responsibilities: [
        'Leading club initiatives to foster innovation through hackathons and technical workshops',
        'Organizing events with 200+ participants and mentoring teams in building impactful technology solutions',
        'Managing partnerships with industry sponsors and coordinating with faculty for seamless event execution',
      ],
    },
  ];

  const getColorClasses = (type: 'primary' | 'accent') => {
    const colors = {
      primary: {
        border: 'border-primary/30 dark:border-primary/40',
        title: 'text-primary',
        bullet: 'text-primary/70',
      },
      accent: {
        border: 'border-accent/30 dark:border-accent/40',
        title: 'text-accent',
        bullet: 'text-accent/70',
      },
    };
    return colors[type];
  };

  return (
    <div className="fade-in font-body mb-16">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 tracking-tight font-heading">
        Experience
      </h2>
      <div className="max-w-3xl space-y-8">
        {experiences.map((exp, index) => {
          const colors = getColorClasses(exp.type);
          return (
            <div 
              key={index}
              className={`border-l-2 ${colors.border} pl-6 relative hover-lift`}
            >
              {/* Timeline dot */}
              <div className={`absolute -left-[7px] top-1 w-3 h-3 rounded-full border-2 
                ${theme === 'dark' 
                  ? 'bg-white border-background' 
                  : 'bg-black border-background'
                }`} 
              />
              
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className={`text-lg sm:text-xl font-semibold tracking-tight font-heading ${colors.title}`}>
                    {exp.title}
                  </h3>
                  <span className={`text-sm font-light ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    {exp.period}
                  </span>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <p className={`font-medium ${colors.title}`}>
                    {exp.company}
                  </p>
                  <span className={`hidden sm:inline ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>
                    •
                  </span>
                  <span className={`text-sm font-light ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>
                    {exp.location}
                  </span>
                </div>
                
                <ul className="mt-4 space-y-2 text-sm sm:text-base font-light opacity-95 leading-relaxed">
                  {exp.responsibilities.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <span className={`${colors.bullet} mt-1.5`}>•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
