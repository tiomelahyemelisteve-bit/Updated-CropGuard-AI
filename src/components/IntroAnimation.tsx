import { useState, useEffect } from 'react';
import { Leaf, ShieldCheck, Camera, SlidersHorizontal, BrainCircuit, MessageSquareText, Sprout, Microscope, Activity } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 2000));
    timers.push(setTimeout(() => setPhase(2), 5000));
    timers.push(setTimeout(() => setPhase(3), 9000));
    timers.push(setTimeout(() => setPhase(4), 13000));
    timers.push(setTimeout(() => setPhase(5), 16000));
    timers.push(setTimeout(onComplete, 20000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  const stages = [
    { icon: Camera, label: 'Capture', delay: '0s' },
    { icon: SlidersHorizontal, label: 'Pre-process', delay: '0.1s' },
    { icon: BrainCircuit, label: 'Classify', delay: '0.2s' },
    { icon: ShieldCheck, label: 'Validate', delay: '0.3s' },
    { icon: MessageSquareText, label: 'Respond', delay: '0.4s' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-forest-950 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-natural-500/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1.5s' }} />

      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className={`transition-all duration-1000 ${phase >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
          <div className="relative mb-8">
            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center shadow-glow transition-all duration-700 ${
              phase >= 1 ? 'scale-110 shadow-glow' : 'scale-100'
            }`}>
              <Leaf className="w-12 h-12 text-white" />
            </div>
            {phase >= 1 && (
              <div className="absolute -inset-2 rounded-3xl border-2 border-natural-400/30 animate-pulse-ring" />
            )}
            {phase >= 1 && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-accent-500 flex items-center justify-center animate-scale-in">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className={`font-display font-extrabold text-4xl sm:text-6xl text-white transition-all duration-700 ${
          phase >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          CROPGUARD <span className="text-natural-400">AI</span>
        </h1>

        <p className={`font-display font-semibold text-lg sm:text-xl text-natural-300 mt-3 transition-all duration-700 ${
          phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          "From Leaf Photo to Trusted Answer"
        </p>

        {/* Pipeline stages */}
        <div className={`flex items-center gap-2 sm:gap-4 mt-10 transition-all duration-700 ${
          phase >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}>
          {stages.map((stage, index) => {
            const isActive = phase >= 4 || (phase >= 3 && index <= phase - 3);
            return (
              <div key={stage.label} className="flex items-center">
                <div
                  className={`flex flex-col items-center gap-2 transition-all duration-500`}
                  style={{ transitionDelay: stage.delay }}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border transition-all duration-500 ${
                      isActive
                        ? 'bg-gradient-to-br from-natural-500 to-natural-700 border-natural-400 shadow-glow scale-110'
                        : 'bg-forest-900 border-forest-700'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <stage.icon className={`w-6 h-6 transition-colors duration-500 ${isActive ? 'text-white' : 'text-forest-600'}`} />
                  </div>
                  <span className={`text-[10px] sm:text-xs font-medium transition-colors duration-500 ${isActive ? 'text-natural-300' : 'text-forest-600'}`}>
                    {stage.label}
                  </span>
                </div>
                {index < stages.length - 1 && (
                  <div className={`h-0.5 w-4 sm:w-8 mb-5 rounded-full transition-colors duration-500 ${
                    phase >= 4 ? 'bg-natural-500' : 'bg-forest-800'
                  }`} style={{ transitionDelay: `${index * 100 + 50}ms` }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Loading bar */}
        <div className={`mt-12 w-64 transition-all duration-500 ${phase >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-1 w-full bg-forest-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-natural-400 to-natural-500 rounded-full"
              style={{
                width: phase >= 5 ? '100%' : '60%',
                transition: 'width 4s ease-in-out',
              }}
            />
          </div>
          <p className="text-center text-xs text-forest-500 mt-3">
            {phase >= 5 ? 'Ready' : 'Initializing system...'}
          </p>
        </div>

        {/* Skip button */}
        <button
          onClick={onComplete}
          className={`absolute -bottom-20 right-0 text-xs text-forest-600 hover:text-forest-400 transition-all ${
            phase >= 1 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Skip intro →
        </button>
      </div>
    </div>
  );
}
