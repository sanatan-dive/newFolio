import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <div className="flex flex-row items-center justify-between gap-2 font-body">
      <button
        onClick={toggleTheme}
        className={`w-4 h-4 rounded-full transition-all duration-200 
          hover:opacity-100 hover:scale-125
          ${theme === 'dark' 
            ? 'border border-white opacity-50 hover:bg-white/20' 
            : 'border border-black opacity-50 hover:bg-black/20'
          }`}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="sr-only">{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
      <span className={`text-xs  rotate-90   opacity-50 tracking-wider
        ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
        {theme === 'dark' ? 'LIGHT' : 'DARK'}
      </span>
    </div>
  );
}