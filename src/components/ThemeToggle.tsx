import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  return (
    <div className="flex flex-col space-y-1 font-space-mono">
      <button
        onClick={toggleTheme}
        className={`w-4 h-4 rounded-full opacity-50 hover:opacity-100 transition-opacity ${
          theme === 'dark' ? 'border border-white' : 'border border-black'
        }`}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        <span className="sr-only">{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
      <span className="text-xs opacity-50 vertical-text tracking-wider">
        {theme === 'dark' ? 'LIGHT' : 'DARK'}
      </span>
    </div>
  );
}