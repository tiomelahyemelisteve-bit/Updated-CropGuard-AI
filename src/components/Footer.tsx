import { Leaf, ShieldCheck, Github } from 'lucide-react';
import type { Page } from '@/types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-forest-800/60 bg-forest-950 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-extrabold text-white">
                CROPGUARD <span className="text-natural-400 text-sm">AI</span>
              </span>
            </div>
            <p className="text-sm text-forest-400 max-w-sm">
              From Leaf Photo to Trusted Answer. AI-powered crop health
              assistance for early disease identification, severity assessment
              and practical action.
            </p>
            <p className="text-xs text-forest-600 mt-4">
              Prototype — Not a certified agricultural diagnosis. Follow
              locally approved agricultural guidance.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Explore</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: 'Home', page: 'home' as Page },
                { label: 'How It Works', page: 'how-it-works' as Page },
                { label: 'Architecture', page: 'architecture' as Page },
                { label: 'Analyze a Leaf', page: 'analyze' as Page },
              ].map((link) => (
                <button
                  key={link.page}
                  onClick={() => onNavigate(link.page)}
                  className="text-sm text-forest-400 hover:text-natural-400 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Project</h4>
            <div className="flex flex-col gap-2 text-sm text-forest-400">
              <span>University Hackathon Prototype</span>
              <span>Designed for Kenyan farmers</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-natural-400" />
                Confidence-Validated Results
              </span>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-forest-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-forest-500">
            © {new Date().getFullYear()} CropGuard AI — Hackathon Prototype
          </p>
          <div className="flex items-center gap-3 text-forest-500">
            <span className="text-xs">Demo / Mock inference — not a real AI model</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
