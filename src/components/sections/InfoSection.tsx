"use client";

interface InfoSectionProps {
  theme: 'dark' | 'light';
}

interface Achievement {
  text: string;
  highlight: string;
  suffix?: string;
}

export default function InfoSection({ theme }: InfoSectionProps) {
  const achievements: Achievement[] = [
    { text: 'Winner of ', highlight: 'IPD Expo', suffix: ' at college' },
    { text: 'Winner at ', highlight: 'Cyberthon.AI', suffix: ' organized by Chandigarh Police' },
    { text: '1st runner-up at ', highlight: 'Monad Blitz' },
    { text: 'Top 10 among 30000+ participants in ', highlight: 'HackWithIndia' },
    { text: 'Won ', highlight: '$500 Bonus Prize', suffix: ' in the Arweave AI Agent Hackathon' },
    { text: 'Top 5 at the ', highlight: 'Avalanche Delhi Hackathon', suffix: ', awarded $300' },
  ];

  return (
    <div className="fade-in font-body mb-16">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 tracking-tight font-heading">
        Info
      </h2>
      <div className="max-w-3xl opacity-90 leading-relaxed space-y-6 text-base sm:text-lg font-light">
        <p className="text-balance">
          I&apos;m a developer and student specializing in{' '}
          <strong className="font-semibold text-primary">Full-Stack Development</strong> and{' '}
          <strong className="font-semibold text-primary">AI integrations</strong>, 
          building scalable applications while exploring{' '}
          <strong className="font-semibold">modern web technologies</strong>,{' '}
          <strong className="font-semibold">system design</strong>, and{' '}
          <strong className="font-semibold">machine learning</strong>.
        </p>
        
        <hr className={`border-t ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} transition-colors duration-300`} />
        
        <div>
          <p className="font-semibold mb-4 text-lg font-heading">Achievements:</p>
          <ul className="space-y-3 font-light">
            {achievements.map((achievement, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2 hover-lift"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="text-primary mt-1">✦</span>
                <span>
                  {achievement.text}
                  <strong className="font-semibold text-primary">{achievement.highlight}</strong>
                  {achievement.suffix}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
