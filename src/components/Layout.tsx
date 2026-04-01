import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Menu, X, Home, BookOpen, CheckCircle, Search, Moon, Sun,
  Heart, Droplets, Wind, Utensils, Baby, Brain, Bone,
  ChevronDown, ChevronRight, Activity, Microscope, Pill, Shield,
  Stethoscope
} from 'lucide-react';
import clsx from 'clsx';

interface LayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    title: 'Hlavní stránka',
    href: '/',
    icon: Home,
    color: 'text-gray-600'
  },
  {
    title: 'Obecná patologie',
    href: '/obecna',
    icon: Microscope,
    color: 'text-blue-600',
    subsections: [
      { title: 'Buněčné mechanismy', href: '/obecna/bunecne', color: 'text-red-600' },
      { title: 'Adaptace', href: '/obecna/adaptace', color: 'text-orange-600' },
      { title: 'Poruchy oběhu', href: '/obecna/obeh', color: 'text-yellow-600' },
      { title: 'Metabolické poruchy', href: '/obecna/metabolismus', color: 'text-amber-700' },
      { title: 'Zánět', href: '/obecna/zanet', color: 'text-blue-600' },
      { title: 'Hojení', href: '/obecna/hojeni', color: 'text-green-600' },
      { title: 'Imunita', href: '/obecna/imunita', color: 'text-gray-600' },
      { title: 'Nádory', href: '/obecna/nadory', color: 'text-purple-600' },
    ]
  },
  {
    title: 'Speciální patologie',
    href: '/specialni',
    icon: BookOpen,
    color: 'text-indigo-600',
    subsections: [
      { title: 'Kardiovaskulární', href: '/specialni/kardio', icon: Heart, color: 'text-pink-600' },
      { title: 'Hematopatologie', href: '/specialni/hemato', icon: Droplets, color: 'text-rose-800' },
      { title: 'Respirační', href: '/specialni/respiracni', icon: Wind, color: 'text-cyan-600' },
      { title: 'GIT a játra', href: '/specialni/git', icon: Utensils, color: 'text-lime-600' },
      { title: 'Ledviny', href: '/specialni/ledviny', icon: Droplets, color: 'text-indigo-700' },
      { title: 'Gynekologie', href: '/specialni/gynekologie', icon: Baby, color: 'text-violet-400' },
      { title: 'CNS', href: '/specialni/cns', icon: Brain, color: 'text-indigo-600' },
      { title: 'Kosti a endokrinní', href: '/specialni/kosti', icon: Bone, color: 'text-amber-600' },
      { title: 'Kůže', href: '/specialni/kuze', icon: Shield, color: 'text-amber-700' },
      { title: 'Pediatrie', href: '/specialni/pediatrie', icon: Baby, color: 'text-violet-500' },
      { title: 'Infekce', href: '/specialni/infekce', icon: Activity, color: 'text-gray-600' },
    ]
  },
  {
    title: 'Studijní postup',
    href: '/progress',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'Vyhledávání',
    href: '/search',
    icon: Search,
    color: 'text-gray-600'
  },
  {
    title: 'Studijní kartičky',
    href: '/cards',
    icon: Pill,
    color: 'text-purple-600'
  },
  {
    title: 'Adaptivní kvíz',
    href: '/quiz',
    icon: Brain,
    color: 'text-indigo-600'
  }
];

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Load dark mode preference on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
    setMounted(true);
  }, []);

  const toggleSection = (title: string) => {
    setExpandedSections(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile header */}
      <div className="lg:hidden bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Patologie</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className={clsx(
        'fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="hidden lg:flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Patologie</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-4 py-4">
            {navigationItems.map((item) => (
              <div key={item.href} className="mb-2">
                <div className="flex items-center">
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex-1 flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                      router.pathname === item.href
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    )}
                  >
                    <item.icon className={clsx('w-5 h-5', item.color)} />
                    <span className="font-medium text-gray-900 dark:text-white">{item.title}</span>
                  </Link>
                  {item.subsections && (
                    <button
                      onClick={() => toggleSection(item.title)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                    >
                      {expandedSections.includes(item.title) ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
                
                {/* Subsections */}
                {item.subsections && expandedSections.includes(item.title) && (
                  <div className="ml-4 mt-1">
                    {item.subsections.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className={clsx(
                          'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors',
                          router.pathname === sub.href
                            ? 'bg-gray-100 dark:bg-gray-700'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                        )}
                      >
                        {sub.icon && <sub.icon className={clsx('w-4 h-4', sub.color)} />}
                        <span className={clsx('font-medium', sub.color)}>{sub.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Patologické studium v2.0
            </p>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-72 min-h-screen">
        <div className="p-4 lg:p-8">
          {children}
        </div>
      </main>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};