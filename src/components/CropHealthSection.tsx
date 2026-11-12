import { Bug, FlaskConical, CloudSun, Check, X, AlertCircle } from 'lucide-react';
import type { CropHealthAssessment } from '@/types';

interface CropHealthSectionProps {
  cropHealth: CropHealthAssessment;
}

export function CropHealthSection({ cropHealth }: CropHealthSectionProps) {
  const { pests, nutrientDeficiencies, environmentalStress } = cropHealth;
  const detectedPests = pests.filter((p) => p.present);
  const detectedNutrients = nutrientDeficiencies.filter((n) => n.deficient);
  const detectedStress = environmentalStress.filter((s) => s.detected);

  const totalFindings = detectedPests.length + detectedNutrients.length + detectedStress.length;

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-display font-bold text-lg text-white">
          Crop Health Assessment
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-md bg-natural-500/15 text-natural-400 font-medium">
          {totalFindings > 0 ? `${totalFindings} findings` : 'No issues detected'}
        </span>
      </div>
      <p className="text-sm text-forest-400 mb-6">
        Beyond disease detection, the system also assesses visible pest activity,
        nutrient deficiencies, and environmental stress indicators from the leaf image.
      </p>

      {/* Pests */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Bug className="w-4 h-4 text-accent-400" />
          <h4 className="text-sm font-semibold text-white">Pest Detection</h4>
        </div>
        <div className="space-y-2">
          {pests.map((pest) => (
            <div
              key={pest.name}
              className={`p-3 rounded-xl border transition-all ${
                pest.present
                  ? 'bg-accent-500/10 border-accent-700/30'
                  : 'bg-forest-800/40 border-forest-700/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {pest.present ? (
                    <AlertCircle className="w-4 h-4 text-accent-400" />
                  ) : (
                    <Check className="w-4 h-4 text-success-400" />
                  )}
                  <span className="text-sm font-medium text-white">{pest.name}</span>
                </div>
                <span className={`text-xs font-semibold ${pest.present ? 'text-accent-400' : 'text-success-400'}`}>
                  {pest.present ? `${pest.confidence}% match` : 'Not detected'}
                </span>
              </div>
              <p className="text-xs text-forest-400 ml-6">{pest.description}</p>
              {pest.present && pest.management.length > 0 && (
                <div className="mt-2 ml-6 space-y-1">
                  {pest.management.map((m, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-forest-300">
                      <span className="text-accent-400 flex-shrink-0">•</span>
                      {m}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Nutrient Deficiencies */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FlaskConical className="w-4 h-4 text-warning-400" />
          <h4 className="text-sm font-semibold text-white">Nutrient Deficiencies</h4>
        </div>
        <div className="space-y-2">
          {nutrientDeficiencies.map((nut) => (
            <div
              key={nut.nutrient}
              className={`p-3 rounded-xl border transition-all ${
                nut.deficient
                  ? 'bg-warning-500/10 border-warning-700/30'
                  : 'bg-forest-800/40 border-forest-700/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {nut.deficient ? (
                    <AlertCircle className="w-4 h-4 text-warning-400" />
                  ) : (
                    <Check className="w-4 h-4 text-success-400" />
                  )}
                  <span className="text-sm font-medium text-white">{nut.nutrient}</span>
                </div>
                <span className={`text-xs font-semibold ${nut.deficient ? 'text-warning-400' : 'text-success-400'}`}>
                  {nut.deficient ? `${nut.confidence}% likely` : 'Sufficient'}
                </span>
              </div>
              <p className="text-xs text-forest-400 ml-6">{nut.description}</p>
              {nut.deficient && nut.recommendation && (
                <p className="text-xs text-forest-300 ml-6 mt-1.5">
                  <span className="text-warning-400 font-medium">Recommendation: </span>
                  {nut.recommendation}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Stress */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <CloudSun className="w-4 h-4 text-natural-400" />
          <h4 className="text-sm font-semibold text-white">Environmental Stress</h4>
        </div>
        <div className="space-y-2">
          {environmentalStress.map((stress) => (
            <div
              key={stress.type}
              className={`p-3 rounded-xl border transition-all ${
                stress.detected
                  ? 'bg-natural-500/10 border-natural-700/30'
                  : 'bg-forest-800/40 border-forest-700/30'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {stress.detected ? (
                    <AlertCircle className="w-4 h-4 text-natural-400" />
                  ) : (
                    <Check className="w-4 h-4 text-success-400" />
                  )}
                  <span className="text-sm font-medium text-white">{stress.type}</span>
                </div>
                <span className={`text-xs font-semibold ${stress.detected ? 'text-natural-400' : 'text-success-400'}`}>
                  {stress.detected ? `${stress.confidence}% likely` : 'No stress detected'}
                </span>
              </div>
              <p className="text-xs text-forest-400 ml-6">{stress.description}</p>
              {stress.detected && stress.recommendation && (
                <p className="text-xs text-forest-300 ml-6 mt-1.5">
                  <span className="text-natural-400 font-medium">Recommendation: </span>
                  {stress.recommendation}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-forest-500 mt-6 pt-4 border-t border-forest-800">
        Prototype estimation from visual leaf analysis. Follow locally approved agricultural guidance for all interventions.
      </p>
    </div>
  );
}
