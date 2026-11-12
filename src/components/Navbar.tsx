import { Leaf, ShieldCheck, Menu, X } from 'lucide-react';
import type { Page } from '@/types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: 'Home', page: 'home' },
  { label: 'How It Works', page: 'how-it-works' },
  { label: 'Architecture', page: 'architecture' },
  { label: 'Analyze', page: 'analyze' },
];

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-forest-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center shadow-lg shadow-natural-900/30 group-hover:shadow-glow transition-all">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <ShieldCheck className="w-4 h-4 text-accent-400 absolute -bottom-0.5 -right-0.5" />
              </div>
              <div className="text-left">
                <span className="font-display font-extrabold text-base text-white tracking-tight">
                  CROPGUARD
                </span>
                <span className="ml-1 text-xs font-semibold text-natural-400">
                  AI
                </span>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentPage === link.page
                      ? 'text-white bg-forest-700/60'
                      : 'text-forest-300 hover:text-white hover:bg-forest-800/40'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => onNavigate('analyze')}
              className="hidden md:inline-flex btn-primary text-sm py-2 px-4"
            >
              <Leaf className="w-4 h-4" />
              Analyze a Leaf
            </button>

            <MobileMenu currentPage={currentPage} onNavigate={onNavigate} />
          </div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
}

function MobileMenu({
  currentPage,
  onNavigate,
}: {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}) {
  return (
    <div className="md:hidden">
      <details className="relative">
        <summary className="list-none cursor-pointer p-2 rounded-lg hover:bg-forest-800/40 text-forest-200">
          <Menu className="w-5 h-5" />
        </summary>
        <div className="absolute right-0 top-12 w-56 glass rounded-xl p-3 shadow-card-hover animate-scale-in origin-top-right">
          {NAV_LINKS.map((link) => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                currentPage === link.page
                  ? 'text-white bg-forest-700/60'
                  : 'text-forest-300 hover:text-white hover:bg-forest-800/40'
              }`}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => onNavigate('analyze')}
            className="w-full mt-2 btn-primary text-sm py-2"
          >
            <Leaf className="w-4 h-4" />
            Analyze a Leaf
          </button>
        </div>
      </details>
    </div>
  );
}
