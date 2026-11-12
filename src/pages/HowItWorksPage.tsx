import {
  Camera,
  SlidersHorizontal,
  BrainCircuit,
  ShieldCheck,
  MessageSquareText,
  ArrowRight,
  Check,
  AlertTriangle,
  Microscope,
  Activity,
  BookOpen,

  Target,
} from 'lucide-react';
import type { Page } from '@/types';
import { PipelineOverview } from '@/components/Pipeline';

interface HowItWorksProps {
  onNavigate: (page: Page) => void;
}

export function HowItWorksPage({ onNavigate }: HowItWorksProps) {
  return (
    <div className="animate-fade-in">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="section-label">
            <Microscope className="w-3.5 h-3.5" />
            The Full Process
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-3">
            How CropGuard AI Works
          </h1>
          <p className="text-forest-400 mt-4 max-w-2xl mx-auto">
            From a simple leaf photo to a validated, actionable answer — here's
            the complete journey through our 5-stage pipeline.
          </p>
        </div>

        <div className="card p-8 sm:p-12 mb-16">
          <PipelineOverview />
        </div>

        <div className="space-y-4">
          <PipelineDetail
            num="01"
            icon={Camera}
            title="Capture"
            description="The farmer captures a photo of the affected leaf using their smartphone camera — either by taking a new photo or uploading an existing image."
            points={['Camera upload or direct capture', 'Works on low-cost smartphones', 'Best results with clear, well-lit photos']}
          />
          <PipelineDetail
            num="02"
            icon={SlidersHorizontal}
            title="Pre-process"
            description="The raw image is prepared for AI inference — resized, normalized, denoised, and formatted to match the model's input requirements."
            points={['Resize and normalize pixel values', 'Denoise and enhance leaf region', 'Format for CNN model input']}
          />
          <PipelineDetail
            num="03"
            icon={BrainCircuit}
            title="Classify"
            description="A convolutional neural network (CNN) analyzes the processed image and predicts the most likely disease from the supported crop diseases."
            points={['CNN model inference (MobileNetV2 / Efficient CNN)', 'Predicts disease class from trained categories', 'Returns confidence score for prediction']}
          />
          <PipelineDetail
            num="04"
            icon={ShieldCheck}
            title="Validate"
            description="The confidence gate checks whether the prediction is reliable enough to share. If confidence is low, the system says so — instead of guessing."
            points={['Confidence threshold gates the result', 'High confidence: reliable prediction shown', 'Low confidence: uncertain result warning shown', 'Non-leaf images flagged as unsupported']}
          />
          <PipelineDetail
            num="05"
            icon={MessageSquareText}
            title="Respond"
            description="A farmer-friendly response is generated with disease identification, severity assessment, management actions, and prevention guidance."
            points={['Severity: Mild / Moderate / Severe', 'Management: practical crop actions', 'Prevention: monitoring and future guidance', 'Explainable AI: highlighted affected regions']}
          />
        </div>
      </section>

      <ConfidenceGateSection />
      <SeveritySection />
      <RecommendationsSection />
      <ValidationSection />
      <EvaluationSection />
      <CTASection onNavigate={onNavigate} />
    </div>
  );
}

function PipelineDetail({
  num,
  icon: Icon,
  title,
  description,
  points,
}: {
  num: string;
  icon: typeof Camera;
  title: string;
  description: string;
  points: string[];
}) {
  return (
    <div className="card p-6 sm:p-8 hover:border-natural-700/40 transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex sm:flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-900 border border-forest-700 flex items-center justify-center group-hover:border-natural-600/40 transition-all">
            <Icon className="w-7 h-7 text-natural-400" />
          </div>
          <span className="font-mono text-xs text-forest-600">{num}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-display font-bold text-xl text-white mb-2">{title}</h3>
          <p className="text-forest-300 text-sm leading-relaxed mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {points.map((point) => (
              <span key={point} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-800/40 text-xs text-forest-300">
                <Check className="w-3 h-3 text-natural-400" />
                {point}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfidenceGateSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="section-label">
          <ShieldCheck className="w-3.5 h-3.5" />
          The Confidence Gate
        </span>
        <h2 className="font-display font-extrabold text-3xl text-white mt-3">
          We don't blindly guess
        </h2>
        <p className="text-forest-400 mt-3 max-w-2xl mx-auto">
          One of our most important features. If the AI isn't confident enough,
          we tell the farmer — instead of forcing a potentially wrong diagnosis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-8 border-success-700/30">
          <div className="w-12 h-12 rounded-xl bg-success-500/20 flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-success-400" />
          </div>
          <h3 className="font-display font-bold text-xl text-success-300 mb-2">
            Reliable Prediction
          </h3>
          <p className="text-forest-300 text-sm leading-relaxed mb-4">
            When confidence is sufficiently high, the system shows the disease
            identification, severity, and full recommendations.
          </p>
          <div className="space-y-2">
            {['Disease name + confidence score', 'Severity assessment', 'Management & prevention advice', 'Explainable AI highlight'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-forest-300">
                <Check className="w-4 h-4 text-success-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8 border-warning-700/30">
          <div className="w-12 h-12 rounded-xl bg-warning-500/20 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-warning-400" />
          </div>
          <h3 className="font-display font-bold text-xl text-warning-300 mb-2">
            Uncertain Result
          </h3>
          <p className="text-forest-300 text-sm leading-relaxed mb-4">
            When confidence is low, the system shows a clear warning instead of
            forcing a diagnosis.
          </p>
          <div className="p-4 rounded-xl bg-warning-500/10 border border-warning-700/30">
            <p className="text-sm text-warning-200 font-medium mb-1">
              "The system does not have enough confidence to provide a reliable
              disease prediction."
            </p>
          </div>
          <div className="flex gap-3 mt-4">
            <span className="px-3 py-1.5 rounded-lg bg-forest-800 text-xs text-forest-300">Retake Photo</span>
            <span className="px-3 py-1.5 rounded-lg bg-forest-800 text-xs text-forest-300">Upload Another Image</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeveritySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="section-label">
          <Activity className="w-3.5 h-3.5" />
          Severity Assessment
        </span>
        <h2 className="font-display font-extrabold text-3xl text-white mt-3">
          How bad is it?
        </h2>
        <p className="text-forest-400 mt-3 max-w-2xl mx-auto">
          Based on visible lesion and affected area estimation from the leaf
          image. This is a prototype estimation, not a certified agricultural
          diagnosis.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { level: 'Mild', range: 'Affected area < 10%', color: 'success', desc: 'Early stage or minor infection. Monitor closely and begin preventive measures.' },
          { level: 'Moderate', range: 'Affected area 10–30%', color: 'warning', desc: 'Active infection spreading. Management actions recommended promptly.' },
          { level: 'Severe', range: 'Affected area > 30%', color: 'error', desc: 'Heavy infection. Immediate intervention and crop protection measures needed.' },
        ].map((item) => (
          <div
            key={item.level}
            className={`card p-6 border-${item.color}-700/30`}
          >
            <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/20 flex items-center justify-center mb-4`}>
              <div className={`w-6 h-6 rounded-full bg-${item.color}-500`} />
            </div>
            <h3 className={`font-display font-bold text-lg text-${item.color}-400`}>{item.level}</h3>
            <p className="text-xs text-forest-400 mt-1 mb-3">{item.range}</p>
            <p className="text-sm text-forest-300 leading-relaxed">{item.desc}</p>
            <div className="mt-4 h-1.5 rounded-full bg-forest-800 overflow-hidden">
              <div
                className={`h-full bg-${item.color}-500`}
                style={{ width: item.level === 'Mild' ? '30%' : item.level === 'Moderate' ? '65%' : '95%' }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-forest-500 mt-6">
        Prototype estimation based on visible lesion/affected area. Not a certified agricultural diagnosis.
      </p>
    </section>
  );
}

function RecommendationsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="section-label">
          <BookOpen className="w-3.5 h-3.5" />
          Recommendations
        </span>
        <h2 className="font-display font-extrabold text-3xl text-white mt-3">
          What should the farmer do?
        </h2>
        <p className="text-forest-400 mt-3 max-w-2xl mx-auto">
          After identifying a disease, CropGuard AI provides two sections:
          immediate management actions and long-term prevention guidance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5 text-accent-400" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Management</h3>
          </div>
          <p className="text-sm text-forest-300 mb-4">
            General, safe crop-management actions relevant to the identified condition.
          </p>
          <div className="space-y-2">
            {[
              'Apply fungicide following locally approved agricultural guidance',
              'Remove and destroy infected plant material',
              'Improve field airflow through proper plant spacing',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-forest-300">
                <ArrowRight className="w-4 h-4 text-accent-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="card p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-natural-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-natural-400" />
            </div>
            <h3 className="font-display font-bold text-xl text-white">Prevention</h3>
          </div>
          <p className="text-sm text-forest-300 mb-4">
            Practical prevention and monitoring guidance for the future.
          </p>
          <div className="space-y-2">
            {[
              'Plant resistant crop varieties where available',
              'Practice crop rotation with non-host crops',
              'Maintain field sanitation and monitor weather conditions',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm text-forest-300">
                <Check className="w-4 h-4 text-natural-400 flex-shrink-0 mt-0.5" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-forest-500 mt-6">
        We do not invent exact pesticide dosages or unsafe treatment instructions. Follow locally approved agricultural guidance.
      </p>
    </section>
  );
}

function ValidationSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="section-label">
          <Microscope className="w-3.5 h-3.5" />
          Future Enhancement
        </span>
        <h2 className="font-display font-extrabold text-3xl text-white mt-3">
          Symptom Validation — Improve Assessment
        </h2>
        <p className="text-forest-400 mt-3 max-w-2xl mx-auto">
          An optional section with simple farmer questions that can be used
          alongside image analysis as a future enhancement.
        </p>
      </div>

      <div className="card p-8 max-w-3xl mx-auto">
        <div className="space-y-6">
          {[
            'Are similar symptoms visible on nearby plants?',
            'Is the affected area increasing?',
            'Is the leaf turning yellow or brown?',
          ].map((question, i) => (
            <div key={i} className="p-4 rounded-xl bg-forest-800/40 border border-forest-700/30">
              <p className="text-sm font-medium text-white mb-3">{i + 1}. {question}</p>
              <div className="flex gap-2">
                {['YES', 'NO', 'NOT SURE'].map((opt) => (
                  <span
                    key={opt}
                    className="px-4 py-1.5 rounded-lg text-xs font-medium bg-forest-700/50 text-forest-300 border border-forest-600/40"
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-forest-500 mt-6 text-center">
          These inputs can complement image analysis in a future version of CropGuard AI.
        </p>
      </div>
    </section>
  );
}

function EvaluationSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <span className="section-label">
          <Target className="w-3.5 h-3.5" />
          Targets / Evaluation Goals
        </span>
        <h2 className="font-display font-extrabold text-3xl text-white mt-3">
          What we're aiming for
        </h2>
        <p className="text-forest-400 mt-3 max-w-2xl mx-auto">
          These are intended evaluation targets — not achieved results.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { value: '≥90%', label: 'Recall', desc: 'Correctly identifying diseased leaves' },
          { value: '≥90%', label: 'Precision', desc: 'Minimizing false positives' },
          { value: '10 + 19', label: 'Crops & Diseases', desc: '10 crops, 19 disease classes + healthy' },
        ].map((item) => (
          <div key={item.label} className="card p-8 text-center">
            <p className="font-display font-extrabold text-4xl text-natural-400">{item.value}</p>
            <p className="font-semibold text-white mt-2">{item.label}</p>
            <p className="text-xs text-forest-400 mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
      <p className="text-center text-xs text-forest-500 mt-6">
        Target goals — not fabricated accuracy or test results. Real evaluation will be conducted with trained models and field data.
      </p>
    </section>
  );
}

function CTASection({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="card p-10 sm:p-14 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-natural-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-500/5 rounded-full blur-3xl" />
        <h2 className="font-display font-extrabold text-3xl text-white relative">
          Ready to try it?
        </h2>
        <p className="text-forest-400 mt-3 relative">
          Select your crop and upload a leaf photo to see the pipeline in action.
        </p>
        <button onClick={() => onNavigate('analyze')} className="btn-primary mt-6 text-base px-8 py-4 relative">
          <Camera className="w-5 h-5" />
          Analyze a Leaf
        </button>
      </div>
    </section>
  );
}
