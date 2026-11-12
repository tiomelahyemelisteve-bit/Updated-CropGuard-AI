import { useState } from 'react';
import { Upload, Camera, X, ImageIcon, Leaf } from 'lucide-react';

interface ImageUploaderProps {
  image: string | null;
  onImageChange: (image: string | null) => void;
  onAnalyze: () => void;
  cropName: string;
  isAnalyzing: boolean;
}

export function ImageUploader({
  image,
  onImageChange,
  onAnalyze,
  cropName,
  isAnalyzing,
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file: File) {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      onImageChange(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  if (image) {
    return (
      <div className="space-y-4 animate-scale-in">
        <div className="relative rounded-2xl overflow-hidden border-2 border-forest-600/50 bg-forest-900 group">
          <img src={image} alt="Uploaded leaf" className="w-full max-h-[400px] object-contain bg-forest-950" />
          <button
            onClick={() => onImageChange(null)}
            className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-forest-950/80 backdrop-blur flex items-center justify-center text-forest-200 hover:text-white hover:bg-forest-900 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-950/80 backdrop-blur text-xs font-medium text-natural-300">
            <Leaf className="w-3.5 h-3.5" />
            {cropName} leaf preview
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ImageIcon className="w-5 h-5" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Leaf'}
          </button>
          <button
            onClick={() => onImageChange(null)}
            disabled={isAnalyzing}
            className="btn-secondary disabled:opacity-50"
          >
            <X className="w-4 h-4" />
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative rounded-2xl border-2 border-dashed transition-all duration-300 p-8 sm:p-12 ${
        isDragging
          ? 'border-natural-400 bg-natural-500/10 scale-[1.01]'
          : 'border-forest-700 bg-forest-900/40 hover:border-forest-600'
      }`}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-900 border border-forest-700 flex items-center justify-center">
          <Upload className="w-7 h-7 text-natural-400" />
        </div>
        <div>
          <p className="font-display font-bold text-lg text-white">
            Drag &amp; drop your leaf photo
          </p>
          <p className="text-sm text-forest-400 mt-1">
            or choose an option below
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
          <label className="btn-primary flex-1 cursor-pointer">
            <Upload className="w-4 h-4" />
            Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>
          <label className="btn-secondary flex-1 cursor-pointer">
            <Camera className="w-4 h-4" />
            Take Photo
            <input
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>
        </div>
        <p className="text-xs text-forest-500 mt-2">
          Supports JPG, PNG • Best results with clear, well-lit leaf photos
        </p>
      </div>
    </div>
  );
}
