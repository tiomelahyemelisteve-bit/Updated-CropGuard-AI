import {
  Camera,
  SlidersHorizontal,
  BrainCircuit,
  ShieldCheck,
  MessageSquareText,
  Smartphone,
  Cpu,
  Database,
  Cloud,
  HardDrive,
  Layers,
  ArrowRight,
  Code,
} from 'lucide-react';

export function ArchitecturePage() {
  return (
    <div className="animate-fade-in">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="section-label">
            <Cpu className="w-3.5 h-3.5" />
            Under the Hood
          </span>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white mt-3">
            Technical Architecture
          </h1>
          <p className="text-forest-400 mt-4 max-w-2xl mx-auto">
            The complete system flow — from phone camera to farmer result — and
            the technologies powering each stage.
          </p>
        </div>

        <ArchitectureFlow />
        <TechStack />
        <FutureDirection />
      </section>
    </div>
  );
}

function ArchitectureFlow() {
  const stages = [
    { icon: Smartphone, label: 'Phone Camera / Upload', desc: 'Image capture via mobile or web app' },
    { icon: SlidersHorizontal, label: 'Image Pre-processing', desc: 'Resize, normalize, denoise, augment' },
    { icon: BrainCircuit, label: 'AI Classification', desc: 'CNN model inference on processed image' },
    { icon: ShieldCheck, label: 'Confidence Gate', desc: 'Threshold check on prediction confidence' },
    { icon: Layers, label: 'Severity Assessment', desc: 'Estimate affected area from lesion coverage' },
    { icon: MessageSquareText, label: 'Recommendation Engine', desc: 'Generate management & prevention advice' },
    { icon: Camera, label: 'Farmer Result', desc: 'Disease + confidence + severity + advice' },
  ];

  return (
    <div className="card p-8 sm:p-10 mb-12">
      <h2 className="font-display font-bold text-xl text-white mb-8 text-center">
        System Flow
      </h2>
      <div className="flex flex-col items-center gap-2">
        {stages.map((stage, index) => (
          <div key={stage.label} className="w-full max-w-2xl">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-forest-800/40 border border-forest-700/30 hover:border-natural-700/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-800 to-forest-900 border border-forest-700 flex items-center justify-center flex-shrink-0">
                <stage.icon className="w-6 h-6 text-natural-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-semibold text-white text-sm">{stage.label}</h4>
                <p className="text-xs text-forest-400 mt-0.5">{stage.desc}</p>
              </div>
              <span className="font-mono text-xs text-forest-600">{String(index + 1).padStart(2, '0')}</span>
            </div>
            {index < stages.length - 1 && (
              <div className="flex justify-center my-1">
                <ArrowRight className="w-4 h-4 text-forest-600 rotate-90" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function TechStack() {
  const stacks = [
    {
      icon: Smartphone,
      title: 'Frontend',
      tag: 'User Interface',
      items: [
        { name: 'Mobile / Web Application', desc: 'Responsive interface for field and desktop use' },
      ],
    },
    {
      icon: BrainCircuit,
      title: 'AI / ML',
      tag: 'Model & Training',
      items: [
        { name: 'Python', desc: 'Core ML development language' },
        { name: 'TensorFlow / Keras', desc: 'Deep learning framework for model training' },
        { name: 'MobileNetV2 / Efficient CNN', desc: 'Lightweight convolutional architectures' },
      ],
    },
    {
      icon: Cloud,
      title: 'Future Deployment',
      tag: 'On-Device',
      items: [
        { name: 'TensorFlow Lite', desc: 'Mobile-optimized model format' },
        { name: 'On-device inference', desc: 'Offline-capable prediction on smartphone' },
      ],
    },
    {
      icon: Database,
      title: 'Dataset',
      tag: 'Training Data',
      items: [
        { name: 'PlantVillage', desc: 'Benchmark dataset of leaf images' },
        { name: 'Future field photographs', desc: 'Real Kenyan field data for robustness' },
      ],
    },
  ];

  return (
    <div className="mb-12">
      <h2 className="font-display font-bold text-xl text-white mb-6 text-center">
        Technology Stack
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stacks.map((stack) => (
          <div key={stack.title} className="card p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-natural-500/15 flex items-center justify-center">
                <stack.icon className="w-5 h-5 text-natural-400" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white">{stack.title}</h3>
                <span className="text-xs text-forest-500">{stack.tag}</span>
              </div>
            </div>
            <div className="space-y-3">
              {stack.items.map((item) => (
                <div key={item.name} className="p-3 rounded-lg bg-forest-800/40 border border-forest-700/30">
                  <p className="text-sm font-semibold text-natural-300">{item.name}</p>
                  <p className="text-xs text-forest-400 mt-0.5">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FutureDirection() {
  return (
    <div className="card p-8 border-natural-700/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-natural-500/10 rounded-full blur-3xl" />
      <div className="flex items-start gap-4 relative">
        <div className="w-12 h-12 rounded-xl bg-natural-500/20 flex items-center justify-center flex-shrink-0">
          <HardDrive className="w-6 h-6 text-natural-400" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg text-white mb-2">
            Offline / On-Device — Future Direction
          </h3>
          <p className="text-sm text-forest-300 leading-relaxed mb-4">
            The presentation describes an offline-capable, on-device future
            direction using TensorFlow Lite. This would allow farmers to get
            predictions without internet connectivity — critical for rural
            areas with limited network access.
          </p>
          <div className="flex flex-wrap gap-2">
            {['TensorFlow Lite', 'On-device inference', 'No internet required', 'Low latency'].map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-natural-500/10 border border-natural-700/30 text-xs text-natural-300">
                <Code className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-forest-500 mt-4">
            The current prototype website uses mock inference and does not perform real offline AI prediction.
          </p>
        </div>
      </div>
    </div>
  );
}
