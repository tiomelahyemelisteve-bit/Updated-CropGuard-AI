export type CropId = string;
export type DiseaseId = string;

export type SeverityLevel = 'mild' | 'moderate' | 'severe';
export type ReliabilityLevel = 'high' | 'medium' | 'low';

export interface DiseaseInfo {
  id: DiseaseId;
  cropId: CropId;
  name: string;
  confidenceBaseline: number;
  severityBaseline: SeverityLevel;
  symptoms: string[];
  management: string[];
  prevention: string[];
  lesionArea: number;
}

export interface CropInfo {
  id: CropId;
  name: string;
  tagline: string;
  image: string;
  diseases: DiseaseId[];
}

export interface PestInfo {
  name: string;
  present: boolean;
  confidence: number;
  description: string;
  management: string[];
}

export interface NutrientDeficiencyInfo {
  nutrient: string;
  deficient: boolean;
  confidence: number;
  description: string;
  recommendation: string;
}

export interface EnvironmentalStressInfo {
  type: string;
  detected: boolean;
  confidence: number;
  description: string;
  recommendation: string;
}

export interface CropHealthAssessment {
  pests: PestInfo[];
  nutrientDeficiencies: NutrientDeficiencyInfo[];
  environmentalStress: EnvironmentalStressInfo[];
}

export type ValidationErrorType = 'wrong_crop' | 'not_a_plant' | null;

export interface PredictionResult {
  cropId: CropId;
  disease: DiseaseInfo;
  confidence: number;
  severity: SeverityLevel;
  lesionArea: number;
  reliability: ReliabilityLevel;
  isReliable: boolean;
  cropHealth: CropHealthAssessment;
  validationError: ValidationErrorType;
  detectedCropName: string | null;
}

export interface ValidationAnswers {
  nearbyPlants: 'yes' | 'no' | 'not_sure';
  increasingArea: 'yes' | 'no' | 'not_sure';
  yellowing: 'yes' | 'no' | 'not_sure';
}

export type Page = 'home' | 'how-it-works' | 'architecture' | 'analyze' | 'result';

export type PipelineStep =
  | 'capturing'
  | 'preprocessing'
  | 'classifying'
  | 'validating'
  | 'responding';

export interface PipelineStageInfo {
  step: PipelineStep;
  label: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
