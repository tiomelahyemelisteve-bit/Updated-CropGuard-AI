import { Leaf, ShieldCheck, ArrowRight, Play, Sprout, Microscope, Brain, AlertTriangle, MapPin } from 'lucide-react';
import type { Page } from '@/types';
import { PipelineOverview } from '@/components/Pipeline';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="animate-fade-in">
      <Hero onNavigate={onNavigate} />
      <ProblemSolution />
      <PipelineSection />
      <InnovationSection />
      <KenyaSection />
    </div>
  );
}

function Hero({ onNavigate }: { onNavigate: (page: Page) => void }) {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/39741261/pexels-photo-39741261.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Lush green cornfield under blue sky"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-950/85 to-forest-950/40" />
        <div className="absolute inset-0 grid-pattern opacity-30" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-natural-700/40 mb-6 animate-fade-in-down">
            <Sprout className="w-4 h-4 text-natural-400" />
            <span className="text-xs font-semibold tracking-wide text-natural-300">
              AI-Powered Crop Health Assistance
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight animate-fade-in-up">
            CROPGUARD <span className="text-natural-400">AI</span>
          </h1>

          <p className="font-display font-semibold text-lg sm:text-xl text-natural-300 mt-3 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            "From Leaf Photo to Trusted Answer"
          </p>

          <p className="text-base sm:text-lg text-forest-200 mt-6 leading-relaxed max-w-xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            AI-powered crop health assistance for early disease identification,
            severity assessment and practical action.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={() => onNavigate('analyze')} className="btn-primary text-base px-8 py-4">
              <Leaf className="w-5 h-5" />
              Analyze a Leaf
            </button>
            <button onClick={() => onNavigate('how-it-works')} className="btn-secondary text-base px-8 py-4">
              <Play className="w-5 h-5" />
              How It Works
            </button>
          </div>

          <div className="flex items-center gap-6 mt-10 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Stat value="∞" label="Crops" />
            <Divider />
            <Stat value="∞" label="Diseases" />
            <Divider />
            <Stat value="5" label="Pipeline Stages" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display font-extrabold text-2xl text-white">{value}</p>
      <p className="text-xs uppercase tracking-widest text-forest-400">{label}</p>
    </div>
  );
}

function Divider() {
  return <div className="w-px h-10 bg-forest-700" />;
}

function ProblemSolution() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-8">
          <div className="w-12 h-12 rounded-xl bg-error-500/20 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-error-400" />
          </div>
          <h3 className="section-label mb-2">The Problem</h3>
          <h2 className="font-display font-bold text-2xl text-white mb-3">
            Farmer sees unusual symptoms
          </h2>
          <p className="text-forest-300 leading-relaxed">
            A farmer notices unusual spots, discoloration, or wilting on crop
            leaves but doesn't know what disease it is, how severe it is, or what
            to do about it. Without timely identification, crop losses can spread
            quickly across the field.
          </p>
        </div>

        <div className="card p-8 border-natural-700/40">
          <div className="w-12 h-12 rounded-xl bg-natural-500/20 flex items-center justify-center mb-4">
            <ShieldCheck className="w-6 h-6 text-natural-400" />
          </div>
          <h3 className="section-label mb-2">The Solution</h3>
          <h2 className="font-display font-bold text-2xl text-white mb-3">
            CropGuard AI analyzes a leaf photo
          </h2>
          <p className="text-forest-300 leading-relaxed">
            The farmer captures a photo of the affected leaf with their
            smartphone. CropGuard AI processes the image through a 5-stage
            pipeline — from capture to validated response — providing disease
            identification, confidence assessment, severity estimation, and
            practical management advice.
          </p>
          <div className="flex items-center gap-2 mt-4 text-natural-400 text-sm font-medium">
            <ArrowRight className="w-4 h-4" />
            Capture → Pre-process → Classify → Validate → Respond
          </div>
        </div>
      </div>
    </section>
  );
}

function PipelineSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <span className="section-label">
          <Microscope className="w-3.5 h-3.5" />
          Technical Pipeline
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-3">
          How a leaf becomes an answer
        </h2>
        <p className="text-forest-400 mt-3 max-w-2xl mx-auto">
          Every photo passes through five carefully designed stages — from raw
          capture to a validated, farmer-friendly response.
        </p>
      </div>

      <div className="card p-8 sm:p-12">
        <PipelineOverview />
      </div>
    </section>
  );
}

function InnovationSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <span className="section-label">
          <Brain className="w-3.5 h-3.5" />
          Our Differentiator
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-3">
          We Don't Just Detect — We Validate and Respond
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card p-8 border-forest-700/40">
          <span className="text-xs font-semibold uppercase tracking-widest text-forest-500">
            Basic System
          </span>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-800/40">
              <div className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center text-forest-400 text-xs font-bold">1</div>
              <span className="text-forest-300 text-sm">Image input</span>
            </div>
            <div className="ml-4 w-px h-6 bg-forest-700" />
            <div className="flex items-center gap-3 p-3 rounded-xl bg-forest-800/40">
              <div className="w-8 h-8 rounded-lg bg-forest-700 flex items-center justify-center text-forest-400 text-xs font-bold">2</div>
              <span className="text-forest-300 text-sm">Disease name output</span>
            </div>
          </div>
          <p className="text-xs text-forest-500 mt-6">
            No confidence check. No severity. No guidance. No uncertainty handling.
          </p>
        </div>

        <div className="card p-8 border-natural-700/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-natural-500/10 rounded-full blur-3xl" />
          <span className="text-xs font-semibold uppercase tracking-widest text-natural-400 relative">
            CropGuard AI
          </span>
          <div className="mt-6 space-y-2">
            {[
              'Image input',
              'AI Classification',
              'Confidence Validation',
              'Severity Assessment',
              'Management Advice',
              'Prevention Guidance',
            ].map((label, i) => (
              <div key={label}>
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-natural-500/10 border border-natural-700/30">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-natural-400 to-natural-600 flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-natural-200 text-sm font-medium">{label}</span>
                </div>
                {i < 5 && <div className="ml-3.5 w-px h-3 bg-natural-700/50" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-8">
        {[
          { icon: ShieldCheck, label: 'Confidence Gate' },
          { icon: AlertTriangle, label: 'Uncertain-Result Handling' },
          { icon: Microscope, label: 'Severity Estimation' },
          { icon: Brain, label: 'Explainable Prediction' },
          { icon: Leaf, label: 'Farmer-Friendly Advice' },
        ].map((item) => (
          <div key={item.label} className="card p-4 text-center hover:border-natural-600/40 transition-all hover:scale-[1.03]">
            <item.icon className="w-6 h-6 text-natural-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-forest-200">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function KenyaSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="card p-8 sm:p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-natural-500/5 rounded-full blur-3xl" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-2 text-natural-400 mb-3">
              <MapPin className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-widest">Local Focus</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Designed with Kenyan farmers in mind
            </h2>
            <div className="relative h-48 mt-6 rounded-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/16678079/pexels-photo-16678079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Farmer using smartphone in field"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 to-transparent" />
            </div>
          </div>

          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Simple Interface', desc: 'Farmer-friendly design that anyone can use without technical training' },
              { title: 'English + Future Kiswahili', desc: 'Currently in English, with Kiswahili guidance planned for the future' },
              { title: 'Low-Cost Smartphone Compatible', desc: 'Works on affordable phones commonly used by smallholder farmers' },
              { title: 'Future Offline Capability', desc: 'Planned on-device TensorFlow Lite inference for areas with limited connectivity' },
              { title: 'Future Field Validation', desc: 'Validation using real Kenyan field photographs is planned — not yet completed' },
              { title: 'Practical Recommendations', desc: 'Management and prevention advice following locally approved agricultural guidance' },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-xl bg-forest-800/40 border border-forest-700/30">
                <h4 className="font-semibold text-sm text-natural-300 mb-1">{item.title}</h4>
                <p className="text-xs text-forest-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
