import {
  Camera,
  SlidersHorizontal,
  BrainCircuit,
  ShieldCheck,
  MessageSquareText,
  Check,
  Loader2,
} from 'lucide-react';
import type { PipelineStep } from '@/types';
import { PIPELINE_STAGES } from '@/data';

const ICONS: Record<string, typeof Camera> = {
  Camera,
  SlidersHorizontal,
  BrainCircuit,
  ShieldCheck,
  MessageSquareText,
};

interface PipelineProps {
  activeStep: PipelineStep | null;
  completedSteps: PipelineStep[];
  variant?: 'horizontal' | 'vertical';
}

export function Pipeline({
  activeStep,
  completedSteps,
  variant = 'horizontal',
}: PipelineProps) {
  if (variant === 'vertical') {
    return (
      <div className="flex flex-col gap-1">
        {PIPELINE_STAGES.map((stage, index) => {
          const Icon = ICONS[stage.icon];
          const isActive = activeStep === stage.step;
          const isComplete = completedSteps.includes(stage.step);
          const isPending = !isActive && !isComplete;

          return (
            <div key={stage.step} className="flex items-stretch gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 relative ${
                    isActive
                      ? 'bg-gradient-to-br from-natural-400 to-natural-600 shadow-glow scale-110'
                      : isComplete
                        ? 'bg-natural-700/80'
                        : 'bg-forest-800/60 border border-forest-700/50'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-xl border-2 border-natural-400 animate-pulse-ring" />
                  )}
                  {isComplete ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : isActive ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : (
                    <Icon className={`w-5 h-5 ${isPending ? 'text-forest-500' : 'text-white'}`} />
                  )}
                </div>
                {index < PIPELINE_STAGES.length - 1 && (
                  <div
                    className={`w-0.5 flex-1 my-1 rounded-full transition-all duration-500 ${
                      isComplete ? 'bg-natural-600' : 'bg-forest-800'
                    }`}
                    style={{ minHeight: '24px' }}
                  />
                )}
              </div>
              <div className="flex-1 pb-3 pt-2">
                <div className="flex items-baseline gap-2">
                  <span className={`text-xs font-mono ${isPending ? 'text-forest-600' : 'text-natural-400'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h4 className={`font-display font-bold text-sm ${isPending ? 'text-forest-500' : isActive ? 'text-white' : 'text-forest-200'}`}>
                    {stage.label}
                  </h4>
                </div>
                <p className={`text-xs mt-0.5 ${isPending ? 'text-forest-600' : 'text-forest-400'}`}>
                  {stage.description}
                </p>
                {isActive && (
                  <div className="mt-2 h-1 w-full bg-forest-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-natural-400 to-natural-500 animate-progress" />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 overflow-x-auto pb-2">
      {PIPELINE_STAGES.map((stage, index) => {
        const Icon = ICONS[stage.icon];
        const isActive = activeStep === stage.step;
        const isComplete = completedSteps.includes(stage.step);
        const isPending = !isActive && !isComplete;

        return (
          <div key={stage.step} className="flex items-center flex-shrink-0">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 relative ${
                  isActive
                    ? 'bg-gradient-to-br from-natural-400 to-natural-600 shadow-glow scale-110'
                    : isComplete
                      ? 'bg-natural-700/80'
                      : 'bg-forest-800/60 border border-forest-700/50'
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl border-2 border-natural-400 animate-pulse-ring" />
                )}
                {isComplete ? (
                  <Check className="w-5 h-5 text-white" />
                ) : isActive ? (
                  <Loader2 className="w-5 h-5 text-white animate-spin" />
                ) : (
                  <Icon className={`w-5 h-5 ${isPending ? 'text-forest-500' : 'text-white'}`} />
                )}
              </div>
              <span className={`text-xs font-medium whitespace-nowrap ${isPending ? 'text-forest-600' : isActive ? 'text-white' : 'text-forest-300'}`}>
                {stage.label}
              </span>
            </div>
            {index < PIPELINE_STAGES.length - 1 && (
              <div
                className={`h-0.5 w-8 sm:w-16 mx-1 sm:mx-2 mb-5 rounded-full transition-all duration-500 ${
                  isComplete ? 'bg-natural-600' : 'bg-forest-800'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PipelineOverview() {
  const icons = {
    Camera: Camera,
    SlidersHorizontal: SlidersHorizontal,
    BrainCircuit: BrainCircuit,
    ShieldCheck: ShieldCheck,
    MessageSquareText: MessageSquareText,
  };

  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      {PIPELINE_STAGES.map((stage, index) => {
        const Icon = icons[stage.icon as keyof typeof icons];
        return (
          <div key={stage.step} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-900 border border-forest-700/60 flex items-center justify-center shadow-card">
                <Icon className="w-6 h-6 text-natural-400" />
              </div>
              <span className="text-xs font-medium text-forest-300">
                {stage.label}
              </span>
            </div>
            {index < PIPELINE_STAGES.length - 1 && (
              <div className="h-0.5 w-6 sm:w-12 mx-1 bg-gradient-to-r from-natural-700 to-natural-800 mb-5" />
            )}
          </div>
        );
      })}
    </div>
  );
}
