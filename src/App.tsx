import { useState, useEffect } from 'react';
import type { Page } from '@/types';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { IntroAnimation } from '@/components/IntroAnimation';
import { CropiAssistant } from '@/components/CropiAssistant';
import { HomePage } from '@/pages/HomePage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { ArchitecturePage } from '@/pages/ArchitecturePage';
import { AnalyzePage } from '@/pages/AnalyzePage';

function App() {
  const [page, setPage] = useState<Page>('home');
  const [introDone, setIntroDone] = useState(false);

  function navigate(next: Page) {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  if (!introDone) {
    return <IntroAnimation onComplete={() => setIntroDone(true)} />;
  }

  return (
    <div className="min-h-screen bg-forest-950 flex flex-col animate-fade-in">
      <Navbar currentPage={page} onNavigate={navigate} />

      <main className="flex-1">
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'how-it-works' && <HowItWorksPage onNavigate={navigate} />}
        {page === 'architecture' && <ArchitecturePage />}
        {page === 'analyze' && <AnalyzePage onNavigate={navigate} />}
        {page === 'result' && <AnalyzePage onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />
      <CropiAssistant />
    </div>
  );
}

export default App;
