import { useState } from 'react';
import { CropId } from '@/types';
import { CROPS } from '@/data';
import { Sprout, ChevronRight, Plus, Wheat, CircleDot, Flower, Banana, Trees, Leaf, Disc, Search, Carrot } from 'lucide-react';

interface CropSelectorProps {
  selectedCrop: CropId | null;
  onSelect: (crop: CropId) => void;
  onContinue: () => void;
}

const CROP_ICONS: Record<string, typeof Wheat> = {
  maize: Wheat,
  tomato: CircleDot,
  potato: Flower,
  banana: Banana,
  beans: Sprout,
  cassava: Trees,
  coffee: Disc,
  kale: Leaf,
  rice: Wheat,
  sorghum: Wheat,
  wheat: Wheat,
  millet: Wheat,
  groundnut: Sprout,
  sunflower: Flower,
  cotton: Leaf,
  onion: Carrot,
  pepper: CircleDot,
  cabbage: Leaf,
  sweet_potato: Trees,
};

const GENERIC_CROP_IMAGE = 'https://images.pexels.com/photos/1656666/pexels-photo-1656666.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function CropSelector({ selectedCrop, onSelect, onContinue }: CropSelectorProps) {
  const [showCustom, setShowCustom] = useState(false);
  const [customCropName, setCustomCropName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCrops = CROPS.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleAddCustomCrop() {
    const trimmed = customCropName.trim();
    if (!trimmed) return;
    const id = trimmed.toLowerCase().replace(/\s+/g, '_');
    onSelect(id);
    setShowCustom(false);
    setCustomCropName('');
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="section-label">
          <Sprout className="w-3.5 h-3.5" />
          Step 1 — Select Your Crop
        </span>
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-3">
          Which crop are you checking?
        </h2>
        <p className="text-forest-400 mt-2 max-w-lg mx-auto">
          Choose from {CROPS.length} supported crops or add any custom crop you need. Then upload or capture a leaf photo for analysis.
        </p>
      </div>

      <div className="relative max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-forest-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search crops..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-900/60 border border-forest-700/50 text-sm text-white placeholder-forest-500 focus:outline-none focus:border-natural-500 transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredCrops.map((crop) => {
          const isSelected = selectedCrop === crop.id;
          const Icon = CROP_ICONS[crop.id] ?? Sprout;
          return (
            <button
              key={crop.id}
              onClick={() => onSelect(crop.id)}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 text-left ${
                isSelected
                  ? 'border-natural-400 shadow-glow scale-[1.02]'
                  : 'border-forest-700/50 hover:border-forest-600'
              }`}
            >
              <div className="relative h-28 overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    isSelected ? 'scale-105' : ''
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
                <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-forest-950/60 backdrop-blur flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-natural-300" />
                  </div>
                  <span className="font-display font-bold text-base text-white">
                    {crop.name}
                  </span>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-natural-500 flex items-center justify-center animate-scale-in">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3 bg-forest-900/60">
                <p className="text-[11px] text-forest-400 leading-snug">{crop.tagline}</p>
                <p className="text-[11px] text-natural-400 mt-1 font-medium">
                  {crop.diseases.length} diseases
                </p>
              </div>
            </button>
          );
        })}

        {selectedCrop && !CROPS.find((c) => c.id === selectedCrop) && (
          <div className="relative overflow-hidden rounded-2xl border-2 border-natural-400 shadow-glow scale-[1.02]">
            <div className="relative h-28 overflow-hidden">
              <img src={GENERIC_CROP_IMAGE} alt={selectedCrop} className="w-full h-full object-cover scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />
              <div className="absolute bottom-2 left-3 flex items-center gap-1.5">
                <div className="w-7 h-7 rounded-lg bg-forest-950/60 backdrop-blur flex items-center justify-center">
                  <Sprout className="w-3.5 h-3.5 text-natural-300" />
                </div>
                <span className="font-display font-bold text-base text-white capitalize">
                  {selectedCrop.replace(/_/g, ' ')}
                </span>
              </div>
              <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-natural-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <div className="p-3 bg-forest-900/60">
              <p className="text-[11px] text-natural-400 font-medium">Custom crop</p>
            </div>
          </div>
        )}
      </div>

      {!showCustom ? (
        <div className="flex justify-center">
          <button
            onClick={() => setShowCustom(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-natural-300 border border-dashed border-forest-600 hover:border-natural-500 hover:bg-forest-800/40 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add a custom crop
          </button>
        </div>
      ) : (
        <div className="max-w-md mx-auto p-4 rounded-xl bg-forest-900/60 border border-forest-700/50 animate-scale-in">
          <div className="flex gap-2">
            <input
              type="text"
              value={customCropName}
              onChange={(e) => setCustomCropName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddCustomCrop()}
              placeholder="Enter crop name (e.g. yam, barley, sugarcane)"
              autoFocus
              className="flex-1 px-4 py-2.5 rounded-lg bg-forest-950 border border-forest-700 text-sm text-white placeholder-forest-500 focus:outline-none focus:border-natural-500"
            />
            <button onClick={handleAddCustomCrop} className="btn-primary py-2.5 px-4 text-sm">
              Add
            </button>
            <button onClick={() => setShowCustom(false)} className="btn-secondary py-2.5 px-4 text-sm">
              Cancel
            </button>
          </div>
          <p className="text-xs text-forest-500 mt-2">
            Any crop you add will work with the analysis pipeline. Custom crops use a generic disease and health profile.
          </p>
        </div>
      )}

      {selectedCrop && (
        <div className="flex justify-end animate-fade-in-up">
          <button onClick={onContinue} className="btn-primary">
            Continue to Photo Upload
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
