import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Camera, SlidersHorizontal, BrainCircuit, ShieldCheck, MessageSquareText, AlertOctagon, ImageIcon, RefreshCw } from 'lucide-react';
import type { CropId, PipelineStep, Page, PredictionResult, ValidationAnswers } from '@/types';
import { CropSelector } from '@/components/CropSelector';
import { ImageUploader } from '@/components/ImageUploader';
import { Pipeline } from '@/components/Pipeline';
import { ResultCard } from '@/components/ResultCard';
import { CropHealthSection } from '@/components/CropHealthSection';
import { ConfidenceGauge } from '@/components/ConfidenceGauge';
import { mockInference } from '@/lib/mockInference';
import { CROPS } from '@/data';

interface AnalyzePageProps {
  onNavigate: (page: Page) => void;
}

type Phase = 'select-crop' | 'upload' | 'analyzing' | 'result';

export function AnalyzePage({ onNavigate }: AnalyzePageProps) {
  const [phase, setPhase] = useState<Phase>('select-crop');
  const [selectedCrop, setSelectedCrop] = useState<CropId | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [activeStep, setActiveStep] = useState<PipelineStep | null>(null);
  const [completedSteps, setCompletedSteps] = useState<PipelineStep[]>([]);
  const [validation, setValidation] = useState<ValidationAnswers | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const steps: PipelineStep[] = ['capturing', 'preprocessing', 'classifying', 'validating', 'responding'];

  function handleAnalyze() {
    if (!selectedCrop || !image) return;
    setPhase('analyzing');
    setActiveStep(null);
    setCompletedSteps([]);
  }

  useEffect(() => {
    if (phase !== 'analyzing') return;

    let stepIndex = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function runStep() {
      if (stepIndex >= steps.length) {
        const prediction = mockInference(selectedCrop!, image);
        setResult(prediction);
        setActiveStep(null);
        setCompletedSteps(steps);
        setPhase('result');
        return;
      }
      const step = steps[stepIndex];
      setActiveStep(step);
      timers.push(
        setTimeout(() => {
          setCompletedSteps((prev) => [...prev, step]);
          stepIndex++;
          runStep();
        }, 1100)
      );
    }

    timers.push(setTimeout(runStep, 300));

    return () => {
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [phase]);

  function handleReset() {
    setPhase('select-crop');
    setSelectedCrop(null);
    setImage(null);
    setResult(null);
    setActiveStep(null);
    setCompletedSteps([]);
    setValidation(null);
  }

  const cropName = selectedCrop ? CROPS.find((c) => c.id === selectedCrop)?.name ?? '' : '';

  return (
    <div ref={scrollRef} className="animate-fade-in min-h-screen">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => (phase === 'select-crop' ? onNavigate('home') : handleReset())}
          className="inline-flex items-center gap-2 text-sm text-forest-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          {phase === 'select-crop' ? 'Back to Home' : 'Start Over'}
        </button>

        {phase === 'select-crop' && (
          <CropSelector
            selectedCrop={selectedCrop}
            onSelect={setSelectedCrop}
            onContinue={() => setPhase('upload')}
          />
        )}

        {phase === 'upload' && selectedCrop && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="section-label">
                <Camera className="w-3.5 h-3.5" />
                Step 2 — Upload or Capture
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-3">
                Photo for your {cropName} leaf
              </h2>
              <p className="text-forest-400 mt-2">
                Upload a clear photo of the affected leaf, or take one with your camera.
              </p>
            </div>
            <ImageUploader
              image={image}
              onImageChange={setImage}
              onAnalyze={handleAnalyze}
              cropName={cropName}
              isAnalyzing={false}
            />
          </div>
        )}

        {phase === 'analyzing' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-display font-extrabold text-2xl text-white">
                Analyzing your {cropName} leaf...
              </h2>
              <p className="text-forest-400 mt-2 text-sm">
                Demo pipeline simulation — 5-stage process
              </p>
            </div>

            {image && (
              <div className="relative rounded-2xl overflow-hidden border-2 border-forest-600/50 max-w-md mx-auto">
                <img src={image} alt="Analyzing" className="w-full max-h-64 object-contain bg-forest-950" />
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-natural-400 to-transparent animate-scan" />
                </div>
                <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-950/80 backdrop-blur text-xs text-natural-300">
                  <BrainCircuit className="w-3.5 h-3.5 animate-pulse" />
                  AI analysis in progress...
                </div>
              </div>
            )}

            <div className="card p-8 max-w-2xl mx-auto">
              <Pipeline
                activeStep={activeStep}
                completedSteps={completedSteps}
                variant="vertical"
              />
            </div>
          </div>
        )}

        {phase === 'result' && result && (
          <ResultView
            result={result}
            image={image}
            onReset={handleReset}
            onNavigate={onNavigate}
            validation={validation}
            onValidationChange={setValidation}
          />
        )}
      </section>
    </div>
  );
}

interface ResultViewProps {
  result: PredictionResult;
  image: string | null;
  onReset: () => void;
  onNavigate: (page: Page) => void;
  validation: ValidationAnswers | null;
  onValidationChange: (v: ValidationAnswers) => void;
}

function ResultView({
  result,
  image,
  onReset,
  onNavigate,
  validation,
  onValidationChange,
}: ResultViewProps) {
  const { disease, confidence, isReliable, validationError, detectedCropName, cropId } = result;

  if (validationError === 'not_a_plant') {
    return (
      <NotAPlantError image={image} onReset={onReset} />
    );
  }

  if (validationError === 'wrong_crop') {
    const selectedCropName = CROPS.find((c) => c.id === cropId)?.name ?? cropId;
    return (
      <WrongCropError
        image={image}
        selectedCropName={selectedCropName}
        detectedCropName={detectedCropName}
        onReset={onReset}
      />
    );
  }

  if (!isReliable) {
    return (
      <UncertainResult
        confidence={confidence}
        image={image}
        onReset={onReset}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="section-label">
          <ShieldCheck className="w-3.5 h-3.5" />
          Analysis Result — Demo
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-3">
          Here's what we found
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {image && <HeatmapImage image={image} />}
        <ResultCard result={result} />
      </div>

      <ExplainableSection diseaseName={disease.name} />

      <CropHealthSection cropHealth={result.cropHealth} />

      <RecommendationsSection disease={disease} />

      <ValidationSection
        validation={validation}
        onValidationChange={onValidationChange}
      />

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <button onClick={onReset} className="btn-primary">
          <Camera className="w-4 h-4" />
          Analyze Another Leaf
        </button>
        <button onClick={() => onNavigate('home')} className="btn-secondary">
          Back to Home
        </button>
      </div>
    </div>
  );
}

function HeatmapImage({ image }: { image: string }) {
  return (
    <div className="card p-4 animate-scale-in">
      <div className="relative rounded-xl overflow-hidden">
        <img src={image} alt="Leaf analysis" className="w-full max-h-80 object-contain bg-forest-950" />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-24 h-16 rounded-full bg-error-500/30 blur-xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-20 h-14 rounded-full bg-warning-500/25 blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-1/3 right-1/4 w-16 h-12 rounded-full bg-error-500/20 blur-md animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-950/80 backdrop-blur text-xs text-natural-300">
          <BrainCircuit className="w-3.5 h-3.5" />
          AI Highlighted Regions
        </div>
      </div>
      <p className="text-xs text-forest-500 mt-3 text-center">
        Explainable AI — highlighted regions represent detected lesion / affected areas
      </p>
    </div>
  );
}

function ExplainableSection({ diseaseName }: { diseaseName: string }) {
  return (
    <div className="card p-6 sm:p-8">
      <h3 className="font-display font-bold text-lg text-white mb-4">
        Why this prediction?
      </h3>
      <p className="text-sm text-forest-300 leading-relaxed mb-4">
        The system detected visual characteristics consistent with{' '}
        <span className="text-natural-300 font-semibold">{diseaseName}</span>,
        including:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: 'Lesions', desc: 'Visible lesion patterns on leaf surface' },
          { label: 'Discoloration', desc: 'Color changes in affected tissue regions' },
          { label: 'Affected Regions', desc: 'Spotted areas matching disease signatures' },
        ].map((item) => (
          <div key={item.label} className="p-4 rounded-xl bg-forest-800/40 border border-forest-700/30">
            <div className="w-8 h-8 rounded-lg bg-natural-500/15 flex items-center justify-center mb-2">
              <div className="w-3 h-3 rounded-full bg-natural-400" />
            </div>
            <h4 className="text-sm font-semibold text-natural-300">{item.label}</h4>
            <p className="text-xs text-forest-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RecommendationsSection({ disease }: { disease: PredictionResult['disease'] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
            <SlidersHorizontal className="w-5 h-5 text-accent-400" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Management</h3>
        </div>
        <div className="space-y-2.5">
          {disease.management.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-forest-300">
              <span className="w-5 h-5 rounded-md bg-accent-500/15 text-accent-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {item}
            </div>
          ))}
        </div>
        <p className="text-xs text-forest-500 mt-4 pt-3 border-t border-forest-800">
          Follow locally approved agricultural guidance.
        </p>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-natural-500/20 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-natural-400" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">Prevention</h3>
        </div>
        <div className="space-y-2.5">
          {disease.prevention.map((item, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-forest-300">
              <span className="w-5 h-5 rounded-md bg-natural-500/15 text-natural-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ValidationSection({
  validation,
  onValidationChange,
}: {
  validation: ValidationAnswers | null;
  onValidationChange: (v: ValidationAnswers) => void;
}) {
  const questions: { key: keyof ValidationAnswers; text: string }[] = [
    { key: 'nearbyPlants', text: 'Are similar symptoms visible on nearby plants?' },
    { key: 'increasingArea', text: 'Is the affected area increasing?' },
    { key: 'yellowing', text: 'Is the leaf turning yellow or brown?' },
  ];

  const currentVal = validation ?? { nearbyPlants: 'not_sure', increasingArea: 'not_sure', yellowing: 'not_sure' };

  return (
    <div className="card p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-display font-bold text-lg text-white">
          Improve Assessment
        </h3>
        <span className="text-xs px-2 py-0.5 rounded-md bg-natural-500/15 text-natural-400 font-medium">
          Optional
        </span>
      </div>
      <p className="text-sm text-forest-400 mb-5">
        Answer a few quick questions to complement the image analysis. These
        inputs can be used alongside image analysis as a future enhancement.
      </p>
      <div className="space-y-4">
        {questions.map((q, qi) => (
          <div key={q.key} className="p-4 rounded-xl bg-forest-800/40 border border-forest-700/30">
            <p className="text-sm font-medium text-white mb-3">
              {qi + 1}. {q.text}
            </p>
            <div className="flex gap-2">
              {(['yes', 'no', 'not_sure'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => onValidationChange({ ...currentVal, [q.key]: opt })}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                    currentVal[q.key] === opt
                      ? 'bg-natural-500/20 text-natural-300 border border-natural-600/40'
                      : 'bg-forest-700/40 text-forest-400 border border-forest-600/30 hover:border-forest-500'
                  }`}
                >
                  {opt === 'not_sure' ? 'Not Sure' : opt.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UncertainResult({
  confidence,
  image,
  onReset,
}: {
  confidence: number;
  image: string | null;
  onReset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card p-8 text-center border-warning-700/30 animate-scale-in">
        <div className="w-16 h-16 rounded-2xl bg-warning-500/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-warning-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <h2 className="font-display font-extrabold text-2xl text-warning-300 mb-2">
          UNCERTAIN RESULT
        </h2>
        <p className="text-forest-300 text-sm leading-relaxed max-w-md mx-auto">
          "The system does not have enough confidence to provide a reliable
          disease prediction."
        </p>

        <div className="flex justify-center my-6">
          <ConfidenceGauge value={confidence} size="md" />
        </div>

        <p className="text-xs text-forest-500 mb-6">
          Confidence below the reliability threshold ({confidence}%). We don't
          force a prediction when we're not sure.
        </p>

        {image && (
          <div className="rounded-xl overflow-hidden border border-forest-700/40 max-w-xs mx-auto mb-6">
            <img src={image} alt="Analyzed leaf" className="w-full max-h-48 object-contain bg-forest-950" />
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onReset} className="btn-primary">
            <Camera className="w-4 h-4" />
            Retake Photo
          </button>
          <button onClick={onReset} className="btn-secondary">
            Upload Another Image
          </button>
        </div>
      </div>
    </div>
  );
}

function NotAPlantError({
  image,
  onReset,
}: {
  image: string | null;
  onReset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card p-8 text-center border-error-700/40 animate-scale-in">
        <div className="w-16 h-16 rounded-2xl bg-error-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertOctagon className="w-8 h-8 text-error-400" />
        </div>
        <h2 className="font-display font-extrabold text-2xl text-error-300 mb-2">
          INCORRECT IMAGE
        </h2>
        <p className="text-forest-300 text-sm leading-relaxed max-w-md mx-auto mb-4">
          The uploaded image does not appear to be a plant leaf. CropGuard AI
          can only analyze photos of crop leaves — it cannot identify diseases
          from images of shoes, bags, tools, or other non-plant objects.
        </p>

        {image && (
          <div className="rounded-xl overflow-hidden border border-error-700/30 max-w-xs mx-auto mb-6">
            <img src={image} alt="Uploaded image" className="w-full max-h-48 object-contain bg-forest-950" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error-500/80 backdrop-blur text-xs text-white">
              <ImageIcon className="w-3.5 h-3.5" />
              No plant detected
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-error-500/10 border border-error-700/30 mb-6 max-w-md mx-auto">
          <p className="text-sm text-error-200 font-medium mb-1">
            What you should do:
          </p>
          <div className="space-y-1.5 text-left">
            <div className="flex items-start gap-2 text-xs text-forest-300">
              <span className="text-error-400 flex-shrink-0 mt-0.5">1.</span>
              Take a clear photo of a crop leaf — make sure the leaf fills most of the frame
            </div>
            <div className="flex items-start gap-2 text-xs text-forest-300">
              <span className="text-error-400 flex-shrink-0 mt-0.5">2.</span>
              Use good lighting and a plain background if possible
            </div>
            <div className="flex items-start gap-2 text-xs text-forest-300">
              <span className="text-error-400 flex-shrink-0 mt-0.5">3.</span>
              Upload a different image and try again
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onReset} className="btn-primary">
            <RefreshCw className="w-4 h-4" />
            Upload a Different Image
          </button>
        </div>
      </div>
    </div>
  );
}

function WrongCropError({
  image,
  selectedCropName,
  detectedCropName,
  onReset,
}: {
  image: string | null;
  selectedCropName: string;
  detectedCropName: string | null;
  onReset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="card p-8 text-center border-error-700/40 animate-scale-in">
        <div className="w-16 h-16 rounded-2xl bg-error-500/20 flex items-center justify-center mx-auto mb-4">
          <AlertOctagon className="w-8 h-8 text-error-400" />
        </div>
        <h2 className="font-display font-extrabold text-2xl text-error-300 mb-2">
          WRONG CROP DETECTED
        </h2>
        <p className="text-forest-300 text-sm leading-relaxed max-w-md mx-auto mb-4">
          You selected <span className="text-natural-300 font-semibold">{selectedCropName}</span>,
          but the image appears to contain a
          {detectedCropName ? (
            <span className="text-natural-300 font-semibold"> {detectedCropName}</span>
          ) : null} leaf.
          CropGuard AI only produces results when the uploaded leaf matches the
          crop you selected.
        </p>

        {image && (
          <div className="rounded-xl overflow-hidden border border-error-700/30 max-w-xs mx-auto mb-6 relative">
            <img src={image} alt="Uploaded leaf" className="w-full max-h-48 object-contain bg-forest-950" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-error-500/80 backdrop-blur text-xs text-white">
              <AlertOctagon className="w-3.5 h-3.5" />
              Crop mismatch
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-error-500/10 border border-error-700/30 mb-6 max-w-md mx-auto">
          <p className="text-sm text-error-200 font-medium mb-1">
            What you should do:
          </p>
          <div className="space-y-1.5 text-left">
            <div className="flex items-start gap-2 text-xs text-forest-300">
              <span className="text-error-400 flex-shrink-0 mt-0.5">1.</span>
              {detectedCropName ? (
                <>If you want to analyze this {detectedCropName} leaf, go back and select {detectedCropName} as your crop</>
              ) : (
                <>Go back and select the crop that matches the leaf you uploaded</>
              )}
            </div>
            <div className="flex items-start gap-2 text-xs text-forest-300">
              <span className="text-error-400 flex-shrink-0 mt-0.5">2.</span>
              Or upload a {selectedCropName} leaf photo if you want to keep analyzing {selectedCropName}
            </div>
            <div className="flex items-start gap-2 text-xs text-forest-300">
              <span className="text-error-400 flex-shrink-0 mt-0.5">3.</span>
              Make sure the leaf in the photo matches the crop you selected
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onReset} className="btn-primary">
            <RefreshCw className="w-4 h-4" />
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
}
