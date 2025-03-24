import { Section } from '../types';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Theme } from '../types';

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
  theme?: Theme; // Optional prop to manually control theme
}

export default function Navigation({ activeSection, setActiveSection, theme = 'dark' }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems: { id: Section; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'info', label: 'Info' },
    { id: 'contact', label: 'Contact' },
    { id: 'feedback', label: 'Feedbacks' }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section: Section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav
      className="relative fade-in"
      style={{ fontFamily: 'var(--font-manrope)' }}
    >
      {/* Mobile Menu Button */}
      <div className="md:hidden flex  justify-end pb-3 relative z-50">
        <button
          onClick={toggleMenu}
          aria-label="Toggle menu"
          className={`transition-colors duration-300 ${theme === 'light' ? 'text-black hover:text-gray-600' : 'text-white hover:text-gray-300'}`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:block space-y-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveSection(item.id)}
              className={`text-sm hover:opacity-100 transition-opacity
                ${activeSection === item.id ? 'opacity-100' : 'opacity-50'}
                ${theme === 'light' ? 'text-black' : 'text-white'}`}
              style={{ fontFamily: 'var(--font-manrope)' }}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden  top-12 right-0 w-48 shadow-lg rounded-lg z-50 backdrop-blur-sm animate-fadeInUp
            ${theme === 'light' ? 'bg-white bg-opacity-90' : 'bg-black bg-opacity-75'}`}
        >
          <ul className="py-3">
            {navItems.map((item) => (
              <li key={item.id} className="relative z-50">
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-sm transition-colors duration-300
                    ${activeSection === item.id
                      ? 'opacity-100'
                      : 'opacity-50 hover:opacity-80'}
                    ${theme === 'light' ? 'text-black' : 'text-white'}`}
                  style={{ fontFamily: 'var(--font-manrope)' }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}