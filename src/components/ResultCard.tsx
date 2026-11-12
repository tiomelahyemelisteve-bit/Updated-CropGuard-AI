import { ConfidenceGauge } from './ConfidenceGauge';
import type { PredictionResult } from '@/types';
import { SEVERITY_INFO } from '@/data';

interface ResultCardProps {
  result: PredictionResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const { disease, confidence, severity, lesionArea, reliability, isReliable } =
    result;
  const sev = SEVERITY_INFO[severity];

  const reliabilityLabel =
    reliability === 'high'
      ? 'High-confidence prediction'
      : reliability === 'medium'
        ? 'Moderate confidence'
        : 'Low confidence';

  return (
    <div className="card p-6 sm:p-8 animate-scale-in">
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${isReliable ? 'bg-success-500' : 'bg-warning-500'} animate-pulse`} />
        <span className="text-xs font-semibold uppercase tracking-widest text-forest-400">
          Analysis Complete — Demo Result
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <InfoTile label="Crop" value={result.cropId.charAt(0).toUpperCase() + result.cropId.slice(1)} />
            <InfoTile label="Possible Disease" value={disease.name} highlight />
            <InfoTile label="Severity" value={sev.label} badge={severity} />
            <InfoTile label="Affected Area" value={`${lesionArea}%`} />
          </div>

          <div className="flex items-center gap-3 p-4 rounded-xl bg-forest-800/40 border border-forest-700/40">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isReliable ? 'bg-success-500/20' : 'bg-warning-500/20'}`}>
              {isReliable ? (
                <CheckIcon className="w-5 h-5 text-success-400" />
              ) : (
                <WarningIcon className="w-5 h-5 text-warning-400" />
              )}
            </div>
            <div>
              <p className={`text-sm font-semibold ${isReliable ? 'text-success-300' : 'text-warning-300'}`}>
                {reliabilityLabel}
              </p>
              <p className="text-xs text-forest-400 mt-0.5">
                {isReliable
                  ? 'Prediction passed the confidence gate'
                  : 'Prediction below confidence threshold — handle with caution'}
              </p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-forest-400">
                Severity Scale
              </span>
              <span className={`text-xs font-semibold ${sev.color}`}>{sev.label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <SeverityBar level="mild" active={severity} />
              <SeverityBar level="moderate" active={severity} />
              <SeverityBar level="severe" active={severity} />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-forest-500">&lt;10%</span>
              <span className="text-[10px] text-forest-500">10–30%</span>
              <span className="text-[10px] text-forest-500">&gt;30%</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-forest-800/40 border border-forest-700/40">
          <ConfidenceGauge value={confidence} size="md" />
          <p className="text-xs text-center text-forest-400">
            {isReliable
              ? 'Reliable prediction'
              : 'Below confidence threshold'}
          </p>
        </div>
      </div>
    </div>
  );
}

function InfoTile({
  label,
  value,
  highlight,
  badge,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  badge?: string;
}) {
  const sevColors: Record<string, string> = {
    mild: 'text-success-400 bg-success-500/15',
    moderate: 'text-warning-400 bg-warning-500/15',
    severe: 'text-error-400 bg-error-500/15',
  };

  return (
    <div className="p-4 rounded-xl bg-forest-800/40 border border-forest-700/40">
      <p className="text-xs font-medium uppercase tracking-wider text-forest-500 mb-1">
        {label}
      </p>
      {badge ? (
        <span className={`inline-flex px-2.5 py-1 rounded-md text-sm font-semibold ${sevColors[badge]}`}>
          {value}
        </span>
      ) : (
        <p className={`text-lg font-display font-bold ${highlight ? 'text-natural-300' : 'text-white'}`}>
          {value}
        </p>
      )}
    </div>
  );
}

function SeverityBar({ level, active }: { level: string; active: string }) {
  const colors: Record<string, string> = {
    mild: 'bg-success-500',
    moderate: 'bg-warning-500',
    severe: 'bg-error-500',
  };
  const isActive = level === active;
  const isBefore =
    (active === 'moderate' && level === 'mild') ||
    (active === 'severe' && (level === 'mild' || level === 'moderate'));

  return (
    <div className={`flex-1 h-2.5 rounded-full transition-all ${isActive ? colors[level] : isBefore ? colors[level] + ' opacity-60' : 'bg-forest-700'}`} />
  );
}

function CheckIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function WarningIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
    </svg>
  );
}
