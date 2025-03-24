import { Section } from '../types';

interface NavigationProps {
  activeSection: Section;
  setActiveSection: (section: Section) => void;
}

export default function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const navItems: { id: Section; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'info', label: 'Info' },
    { id: 'contact', label: 'Contact' },
    { id: 'faq', label: 'FAQ' }
  ];
  
  return (
    <nav>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => setActiveSection(item.id)}
              className={`text-sm hover:opacity-100 transition-opacity ${
                activeSection === item.id ? 'opacity-100' : 'opacity-50'
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
