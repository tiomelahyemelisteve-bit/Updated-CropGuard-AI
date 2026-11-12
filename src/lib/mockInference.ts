import type {
  CropId,
  PredictionResult,
  SeverityLevel,
  DiseaseInfo,
  CropHealthAssessment,
  PestInfo,
  NutrientDeficiencyInfo,
  EnvironmentalStressInfo,
  ValidationErrorType,
} from '@/types';
import { DISEASES, CROPS } from '@/data';

const CONFIDENCE_THRESHOLD = 60;

function getSeverityFromArea(area: number): SeverityLevel {
  if (area < 10) return 'mild';
  if (area <= 30) return 'moderate';
  return 'severe';
}

function getReliability(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence >= 80) return 'high';
  if (confidence >= 60) return 'medium';
  return 'low';
}

const CROP_DEFAULT_DISEASE: Record<string, DiseaseInfo> = {
  maize: DISEASES.northern_leaf_blight,
  tomato: DISEASES.late_blight,
  potato: DISEASES.potato_late_blight,
  banana: DISEASES.banana_sigatoka,
  beans: DISEASES.beans_anthracnose,
  cassava: DISEASES.cassava_mosaic,
  coffee: DISEASES.coffee_leaf_rust,
  kale: DISEASES.kale_black_rot,
  rice: DISEASES.rice_blast,
  sorghum: DISEASES.sorghum_anthracnose,
  wheat: DISEASES.wheat_leaf_rust,
  millet: DISEASES.millet_downy_mildew,
  groundnut: DISEASES.groundnut_leaf_spot,
  sunflower: DISEASES.sunflower_leaf_blight,
  cotton: DISEASES.cotton_leaf_curl,
  onion: DISEASES.onion_purple_blotch,
  pepper: DISEASES.pepper_bacterial_spot,
  cabbage: DISEASES.cabbage_black_rot,
  sweet_potato: DISEASES.sweet_potato_virus,
};

function generateGenericDisease(cropId: string, cropName: string): DiseaseInfo {
  return {
    id: `custom_${cropId}_disease`,
    cropId,
    name: 'Possible Leaf Disease',
    confidenceBaseline: 78,
    severityBaseline: 'moderate',
    lesionArea: 16,
    symptoms: [
      `Visible lesions or discoloration on the ${cropName} leaf`,
      'Irregular patterns of affected tissue',
      'Color changes consistent with fungal or bacterial infection',
    ],
    management: [
      'Apply appropriate fungicide or bactericide following locally approved agricultural guidance',
      'Remove and destroy infected plant material',
      'Improve field sanitation and plant spacing for airflow',
    ],
    prevention: [
      `Plant resistant ${cropName} varieties where available`,
      'Practice crop rotation with non-host crops',
      'Monitor field conditions regularly for early detection',
    ],
  };
}

const GENERIC_PESTS: PestInfo[] = [
  { name: 'Aphid', present: true, confidence: 55, description: 'Possible sap-sucking insects on leaves causing yellowing and curling', management: ['Apply insecticide following locally approved guidance', 'Encourage natural predators like ladybirds', 'Remove heavily infested plants'] },
  { name: 'Caterpillar', present: false, confidence: 28, description: 'No visible feeding damage on leaves', management: [] },
];

const GENERIC_NUTRIENTS: NutrientDeficiencyInfo[] = [
  { nutrient: 'Nitrogen', deficient: true, confidence: 58, description: 'General yellowing of older leaves may indicate nitrogen deficiency', recommendation: 'Apply balanced NPK fertilizer following locally approved guidance' },
  { nutrient: 'Potassium', deficient: false, confidence: 30, description: 'No marginal necrosis observed', recommendation: '' },
];

const GENERIC_STRESS: EnvironmentalStressInfo[] = [
  { type: 'Drought Stress', detected: true, confidence: 50, description: 'Possible moisture stress indicators on leaf', recommendation: 'Irrigate and mulch to conserve soil moisture' },
  { type: 'Heat Stress', detected: false, confidence: 25, description: 'No clear heat damage symptoms', recommendation: '' },
];

const CROP_PESTS: Record<string, PestInfo[]> = {
  maize: [
    { name: 'Fall Armyworm', present: true, confidence: 78, description: 'Larval feeding damage visible on leaf tissue with ragged edges and frass', management: ['Inspect whorl for larvae and remove by hand', 'Apply biopesticide or recommended insecticide following locally approved guidance', 'Plant early to avoid peak armyworm season'] },
    { name: 'Maize Stem Borer', present: false, confidence: 30, description: 'No visible tunneling or frass near leaf whorls', management: [] },
  ],
  tomato: [
    { name: 'Whitefly', present: true, confidence: 72, description: 'Small white insects on leaf undersides, associated with yellowing and virus transmission', management: ['Use yellow sticky traps to monitor adults', 'Apply insecticide following locally approved guidance', 'Remove heavily infested plants'] },
    { name: 'Tomato Leaf Miner', present: false, confidence: 25, description: 'No serpentine mines visible on leaf surface', management: [] },
  ],
  potato: [
    { name: 'Aphid', present: true, confidence: 65, description: 'Clusters of small sap-sucking insects on new growth, potential virus vectors', management: ['Spray with recommended insecticide following locally approved guidance', 'Encourage natural predators like ladybirds', 'Remove volunteer potato plants'] },
    { name: 'Potato Tuber Moth', present: false, confidence: 20, description: 'No visible leaf mining or frass', management: [] },
  ],
  banana: [
    { name: 'Banana Aphid', present: true, confidence: 70, description: 'Small dark aphids colonies near leaf bases, vectors for Bunchy Top virus', management: ['Remove and destroy infected suckers', 'Apply insecticide following locally approved guidance', 'Use clean planting material'] },
    { name: 'Banana Weevil', present: false, confidence: 28, description: 'No visible weevil damage or frass in pseudostem', management: [] },
  ],
  beans: [
    { name: 'Bean Fly', present: true, confidence: 60, description: 'Pinhole feeding marks on leaves and stunting of seedlings', management: ['Apply insecticide following locally approved guidance', 'Rotate crops to break pest cycle', 'Plant early to avoid pest pressure'] },
    { name: 'Aphid', present: false, confidence: 22, description: 'No visible colonies on stems or leaves', management: [] },
  ],
  cassava: [
    { name: 'Cassava Whitefly', present: true, confidence: 75, description: 'Whitefly populations on leaf undersides, vectors for mosaic and brown streak viruses', management: ['Plant resistant varieties', 'Apply insecticide following locally approved guidance', 'Remove infected plants promptly'] },
    { name: 'Cassava Mealybug', present: false, confidence: 18, description: 'No visible mealybug colonies on stems or leaves', management: [] },
  ],
  coffee: [
    { name: 'Coffee Berry Borer', present: true, confidence: 68, description: 'Small boring holes visible on berries, causing premature drop', management: ['Pick and destroy affected berries', 'Use Beauveria bassiana biopesticide following locally approved guidance', 'Maintain farm sanitation'] },
    { name: 'Antestia Bug', present: false, confidence: 24, description: 'No visible pinhole damage on berries', management: [] },
  ],
  kale: [
    { name: 'Diamondback Moth', present: true, confidence: 73, description: 'Small larvae chewing irregular holes on leaves, leaving window-pane effect', management: ['Apply biopesticide (Bt) following locally approved guidance', 'Use row covers to prevent egg-laying', 'Remove crop residues after harvest'] },
    { name: 'Cabbage Aphid', present: false, confidence: 26, description: 'No visible aphid colonies on leaves', management: [] },
  ],
  rice: [
    { name: 'Rice Stem Borer', present: true, confidence: 64, description: 'Deadheart symptoms and frass near stem bases', management: ['Apply insecticide following locally approved guidance', 'Remove and destroy infected tillers', 'Maintain proper water management'] },
    { name: 'Brown Planthopper', present: false, confidence: 20, description: 'No visible hopper burn or sooty mould', management: [] },
  ],
  sorghum: [
    { name: 'Sorghum Shoot Fly', present: true, confidence: 62, description: 'Deadheart symptoms in young plants with bored shoots', management: ['Apply insecticide following locally approved guidance', 'Plant in synchronous stands', 'Remove affected plants'] },
    { name: 'Aphid', present: false, confidence: 22, description: 'No visible aphid colonies', management: [] },
  ],
  wheat: [
    { name: 'Wheat Aphid', present: true, confidence: 66, description: 'Aphid colonies on leaves and stems causing yellowing and stunting', management: ['Apply insecticide following locally approved guidance', 'Encourage natural predators', 'Plant early to reduce aphid pressure'] },
    { name: 'Hessian Fly', present: false, confidence: 22, description: 'No visible fly larvae or stunted stems', management: [] },
  ],
  millet: [
    { name: 'Millet Stem Borer', present: true, confidence: 58, description: 'Boring damage and frass at stem bases causing deadhearts', management: ['Apply insecticide following locally approved guidance', 'Remove and destroy affected tillers', 'Plant early to avoid pest peak'] },
    { name: 'Aphid', present: false, confidence: 24, description: 'No visible aphid colonies', management: [] },
  ],
  groundnut: [
    { name: 'Leaf Hopper', present: true, confidence: 60, description: 'Hopper burn and yellowing of leaf margins from sap-feeding', management: ['Apply insecticide following locally approved guidance', 'Use resistant varieties', 'Remove weed hosts'] },
    { name: 'Thrips', present: false, confidence: 22, description: 'No visible feeding damage or leaf distortion', management: [] },
  ],
  sunflower: [
    { name: 'Sunflower Moth', present: true, confidence: 56, description: 'Larval feeding on flower heads and bracts', management: ['Apply insecticide following locally approved guidance', 'Harvest early to avoid damage', 'Remove crop residues'] },
    { name: 'Aphid', present: false, confidence: 20, description: 'No visible colonies', management: [] },
  ],
  cotton: [
    { name: 'Whitefly', present: true, confidence: 70, description: 'Whitefly populations on leaf undersides, vectors for leaf curl virus', management: ['Apply insecticide following locally approved guidance', 'Use yellow sticky traps', 'Remove infected plants'] },
    { name: 'Bollworm', present: false, confidence: 25, description: 'No visible feeding damage on squares or bolls', management: [] },
  ],
  onion: [
    { name: 'Thrips', present: true, confidence: 67, description: 'Silvery feeding damage on leaves with black frass dots', management: ['Apply insecticide following locally approved guidance', 'Use blue sticky traps', 'Remove crop residues after harvest'] },
    { name: 'Onion Maggot', present: false, confidence: 20, description: 'No visible damage to base of plants', management: [] },
  ],
  pepper: [
    { name: 'Aphid', present: true, confidence: 62, description: 'Aphid colonies on new growth causing leaf curling and virus spread', management: ['Apply insecticide following locally approved guidance', 'Encourage natural predators', 'Remove heavily infested plants'] },
    { name: 'Thrips', present: false, confidence: 22, description: 'No visible feeding damage', management: [] },
  ],
  cabbage: [
    { name: 'Diamondback Moth', present: true, confidence: 72, description: 'Small larvae chewing irregular holes on leaves, leaving window-pane effect', management: ['Apply biopesticide (Bt) following locally approved guidance', 'Use row covers to prevent egg-laying', 'Remove crop residues after harvest'] },
    { name: 'Cabbage Aphid', present: false, confidence: 24, description: 'No visible aphid colonies on leaves', management: [] },
  ],
  sweet_potato: [
    { name: 'Sweet Potato Weevil', present: true, confidence: 64, description: 'Feeding damage on vines and tubers causing hollowing and discoloration', management: ['Apply insecticide following locally approved guidance', 'Use clean planting material', 'Remove crop residues after harvest'] },
    { name: 'Whitefly', present: false, confidence: 22, description: 'No visible whitefly populations', management: [] },
  ],
};

const CROP_NUTRIENTS: Record<string, NutrientDeficiencyInfo[]> = {
  maize: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 70, description: 'Yellowing starting at older leaf tips progressing downward (V-shaped chlorosis)', recommendation: 'Apply nitrogen fertilizer (e.g. urea or CAN) following locally approved guidance and soil test results' },
    { nutrient: 'Phosphorus', deficient: false, confidence: 35, description: 'No distinct purpling or stunting observed', recommendation: '' },
  ],
  tomato: [
    { nutrient: 'Nitrogen', deficient: false, confidence: 30, description: 'No general yellowing of older leaves', recommendation: '' },
    { nutrient: 'Calcium', deficient: true, confidence: 66, description: 'Leaf tip burn and dark spots consistent with localized calcium deficiency', recommendation: 'Apply calcium amendments (e.g. lime or gypsum) following locally approved guidance' },
  ],
  potato: [
    { nutrient: 'Potassium', deficient: true, confidence: 68, description: 'Marginal leaf scorch and bronzing on older leaves', recommendation: 'Apply potash fertilizer following locally approved guidance and soil test results' },
    { nutrient: 'Nitrogen', deficient: false, confidence: 28, description: 'No general chlorosis observed', recommendation: '' },
  ],
  banana: [
    { nutrient: 'Potassium', deficient: true, confidence: 72, description: 'Marginal yellowing and rapid necrosis of older leaves', recommendation: 'Apply potassium fertilizer following locally approved guidance — bananas are high K consumers' },
    { nutrient: 'Magnesium', deficient: false, confidence: 32, description: 'No interveinal chlorosis observed', recommendation: '' },
  ],
  beans: [
    { nutrient: 'Nitrogen', deficient: false, confidence: 25, description: 'No yellowing — legumes fix atmospheric nitrogen', recommendation: '' },
    { nutrient: 'Zinc', deficient: true, confidence: 58, description: 'Interveinal chlorosis and reduced leaf size on new growth', recommendation: 'Apply zinc foliar spray following locally approved guidance' },
  ],
  cassava: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 60, description: 'General pale green to yellow coloration of older leaves', recommendation: 'Apply balanced NPK fertilizer following locally approved guidance' },
    { nutrient: 'Potassium', deficient: false, confidence: 30, description: 'No marginal necrosis observed', recommendation: '' },
  ],
  coffee: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 65, description: 'Yellowing of older leaves and reduced shoot growth', recommendation: 'Apply nitrogen fertilizer following locally approved guidance and leaf analysis' },
    { nutrient: 'Iron', deficient: false, confidence: 28, description: 'No interveinal chlorosis on young leaves', recommendation: '' },
  ],
  kale: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 67, description: 'Pale yellow older leaves with reduced leaf size', recommendation: 'Apply nitrogen fertilizer following locally approved guidance — brassicas are high N consumers' },
    { nutrient: 'Boron', deficient: false, confidence: 32, description: 'No hollow stems or corky lesions observed', recommendation: '' },
  ],
  rice: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 69, description: 'Yellowing of older leaves and reduced tillering', recommendation: 'Apply urea top-dressing following locally approved guidance' },
    { nutrient: 'Zinc', deficient: false, confidence: 30, description: 'No khaira symptoms observed', recommendation: '' },
  ],
  sorghum: [
    { nutrient: 'Phosphorus', deficient: true, confidence: 62, description: 'Purpling of leaves and stunted growth', recommendation: 'Apply phosphate fertilizer following locally approved guidance and soil test results' },
    { nutrient: 'Nitrogen', deficient: false, confidence: 28, description: 'No general chlorosis observed', recommendation: '' },
  ],
  wheat: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 68, description: 'Yellowing of older leaves and reduced tillering', recommendation: 'Apply nitrogen fertilizer following locally approved guidance' },
    { nutrient: 'Zinc', deficient: false, confidence: 28, description: 'No interveinal chlorosis observed', recommendation: '' },
  ],
  millet: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 60, description: 'Pale yellow older leaves with stunted growth', recommendation: 'Apply nitrogen fertilizer following locally approved guidance' },
    { nutrient: 'Phosphorus', deficient: false, confidence: 30, description: 'No purpling observed', recommendation: '' },
  ],
  groundnut: [
    { nutrient: 'Nitrogen', deficient: false, confidence: 22, description: 'Legumes fix atmospheric nitrogen — no deficiency expected', recommendation: '' },
    { nutrient: 'Calcium', deficient: true, confidence: 58, description: 'Dark lesions on pods and poor pod fill', recommendation: 'Apply gypsum (calcium sulfate) following locally approved guidance' },
  ],
  sunflower: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 62, description: 'Yellowing of older leaves and reduced head size', recommendation: 'Apply nitrogen fertilizer following locally approved guidance' },
    { nutrient: 'Boron', deficient: false, confidence: 30, description: 'No hollow stems observed', recommendation: '' },
  ],
  cotton: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 64, description: 'Yellowing of older leaves and reduced boll set', recommendation: 'Apply nitrogen fertilizer following locally approved guidance' },
    { nutrient: 'Potassium', deficient: false, confidence: 32, description: 'No marginal necrosis observed', recommendation: '' },
  ],
  onion: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 60, description: 'Yellowing of leaf tips and reduced bulb size', recommendation: 'Apply nitrogen fertilizer following locally approved guidance' },
    { nutrient: 'Sulfur', deficient: false, confidence: 30, description: 'No uniform yellowing observed', recommendation: '' },
  ],
  pepper: [
    { nutrient: 'Nitrogen', deficient: false, confidence: 28, description: 'No general yellowing observed', recommendation: '' },
    { nutrient: 'Calcium', deficient: true, confidence: 60, description: 'Blossom end rot on fruit and leaf tip burn', recommendation: 'Apply calcium amendments following locally approved guidance' },
  ],
  cabbage: [
    { nutrient: 'Nitrogen', deficient: true, confidence: 66, description: 'Pale yellow older leaves with reduced head size', recommendation: 'Apply nitrogen fertilizer following locally approved guidance — brassicas are high N consumers' },
    { nutrient: 'Boron', deficient: false, confidence: 30, description: 'No hollow stems observed', recommendation: '' },
  ],
  sweet_potato: [
    { nutrient: 'Potassium', deficient: true, confidence: 64, description: 'Marginal leaf scorch and yellowing of older leaves', recommendation: 'Apply potash fertilizer following locally approved guidance' },
    { nutrient: 'Nitrogen', deficient: false, confidence: 28, description: 'No general chlorosis observed', recommendation: '' },
  ],
};

const CROP_STRESS: Record<string, EnvironmentalStressInfo[]> = {
  maize: [
    { type: 'Drought Stress', detected: true, confidence: 64, description: 'Leaf curling and rolling consistent with moisture deficit', recommendation: 'Irrigate if possible; mulch to conserve soil moisture' },
    { type: 'Heat Stress', detected: false, confidence: 30, description: 'No leaf scorching or bleaching observed', recommendation: '' },
  ],
  tomato: [
    { type: 'Heat Stress', detected: true, confidence: 60, description: 'Leaf curling and sunscald on exposed tissue', recommendation: 'Provide shade cloth during peak heat; irrigate early morning' },
    { type: 'Waterlogging', detected: false, confidence: 25, description: 'No yellowing or wilting consistent with excess water', recommendation: '' },
  ],
  potato: [
    { type: 'Drought Stress', detected: false, confidence: 28, description: 'No wilting or leaf rolling observed', recommendation: '' },
    { type: 'Heat Stress', detected: true, confidence: 58, description: 'Leaf browning and reduced canopy consistent with high temperature', recommendation: 'Irrigate during cool periods; mulch to moderate soil temperature' },
  ],
  banana: [
    { type: 'Drought Stress', detected: true, confidence: 62, description: 'Leaf folding and drooping consistent with water deficit', recommendation: 'Mulch heavily and irrigate during dry periods' },
    { type: 'Wind Damage', detected: false, confidence: 22, description: 'No tearing or shredding of leaves', recommendation: '' },
  ],
  beans: [
    { type: 'Drought Stress', detected: true, confidence: 56, description: 'Leaf wilting and premature senescence', recommendation: 'Irrigate at flowering and pod-fill stages' },
    { type: 'Heat Stress', detected: false, confidence: 26, description: 'No blossom drop or leaf scorch', recommendation: '' },
  ],
  cassava: [
    { type: 'Drought Stress', detected: false, confidence: 20, description: 'Cassava is drought-tolerant; no stress symptoms visible', recommendation: '' },
    { type: 'Waterlogging', detected: true, confidence: 54, description: 'Leaf yellowing and root rot risk consistent with saturated soil', recommendation: 'Improve drainage; plant on ridges in high-rainfall areas' },
  ],
  coffee: [
    { type: 'Drought Stress', detected: true, confidence: 58, description: 'Leaf dropping and berry shrivel consistent with moisture stress', recommendation: 'Mulch, irrigate, and provide shade trees' },
    { type: 'Sun Scorch', detected: false, confidence: 28, description: 'No bleaching of exposed leaves', recommendation: '' },
  ],
  kale: [
    { type: 'Cold Stress', detected: true, confidence: 55, description: 'Purpling of leaves and reduced growth consistent with low temperature', recommendation: 'Use row covers; plant at appropriate season' },
    { type: 'Drought Stress', detected: false, confidence: 24, description: 'No wilting observed', recommendation: '' },
  ],
  rice: [
    { type: 'Water Stress', detected: true, confidence: 60, description: 'Leaf rolling and reduced tillering consistent with intermittent water supply', recommendation: 'Maintain continuous flooded or AWD irrigation regime' },
    { type: 'Heat Stress', detected: false, confidence: 26, description: 'No spikelet sterility or leaf scorch', recommendation: '' },
  ],
  sorghum: [
    { type: 'Drought Stress', detected: false, confidence: 22, description: 'Sorghum is drought-tolerant; no stress symptoms visible', recommendation: '' },
    { type: 'Nutrient Stress', detected: true, confidence: 52, description: 'Stunted growth and leaf discoloration consistent with poor soil fertility', recommendation: 'Apply balanced fertilizer following soil test results' },
  ],
  wheat: [
    { type: 'Drought Stress', detected: true, confidence: 56, description: 'Leaf rolling and reduced tillering consistent with moisture deficit', recommendation: 'Irrigate at critical growth stages; mulch to conserve moisture' },
    { type: 'Heat Stress', detected: false, confidence: 28, description: 'No leaf scorching observed', recommendation: '' },
  ],
  millet: [
    { type: 'Drought Stress', detected: false, confidence: 20, description: 'Millet is drought-tolerant; no stress symptoms visible', recommendation: '' },
    { type: 'Heat Stress', detected: true, confidence: 50, description: 'Leaf tip burn and reduced tillering', recommendation: 'Plant early; mulch to moderate soil temperature' },
  ],
  groundnut: [
    { type: 'Drought Stress', detected: true, confidence: 54, description: 'Leaf wilting and reduced pod fill', recommendation: 'Irrigate at flowering and pod-fill stages' },
    { type: 'Heat Stress', detected: false, confidence: 24, description: 'No scorching observed', recommendation: '' },
  ],
  sunflower: [
    { type: 'Drought Stress', detected: true, confidence: 52, description: 'Leaf wilting and reduced head size', recommendation: 'Irrigate during bud and flower stages' },
    { type: 'Heat Stress', detected: false, confidence: 22, description: 'No scorching observed', recommendation: '' },
  ],
  cotton: [
    { type: 'Heat Stress', detected: true, confidence: 54, description: 'Leaf curling and boll shed consistent with high temperature', recommendation: 'Irrigate early morning; provide shade during peak heat' },
    { type: 'Waterlogging', detected: false, confidence: 24, description: 'No yellowing consistent with excess water', recommendation: '' },
  ],
  onion: [
    { type: 'Drought Stress', detected: true, confidence: 56, description: 'Leaf tip dieback and reduced bulb size', recommendation: 'Irrigate consistently; mulch to retain soil moisture' },
    { type: 'Heat Stress', detected: false, confidence: 24, description: 'No scorching observed', recommendation: '' },
  ],
  pepper: [
    { type: 'Heat Stress', detected: true, confidence: 56, description: 'Leaf curling and blossom drop consistent with high temperature', recommendation: 'Provide shade cloth; irrigate early morning' },
    { type: 'Drought Stress', detected: false, confidence: 24, description: 'No wilting observed', recommendation: '' },
  ],
  cabbage: [
    { type: 'Cold Stress', detected: true, confidence: 52, description: 'Purpling and reduced growth consistent with low temperature', recommendation: 'Use row covers; plant at appropriate season' },
    { type: 'Drought Stress', detected: false, confidence: 22, description: 'No wilting observed', recommendation: '' },
  ],
  sweet_potato: [
    { type: 'Drought Stress', detected: false, confidence: 22, description: 'Sweet potato is somewhat drought-tolerant; no clear stress', recommendation: '' },
    { type: 'Waterlogging', detected: true, confidence: 50, description: 'Leaf yellowing and tuber rot risk from saturated soil', recommendation: 'Improve drainage; plant on ridges' },
  ],
};

function assessCropHealth(cropId: string): CropHealthAssessment {
  const pests = CROP_PESTS[cropId];
  const nutrients = CROP_NUTRIENTS[cropId];
  const stress = CROP_STRESS[cropId];

  if (pests && nutrients && stress) {
    return { pests, nutrientDeficiencies: nutrients, environmentalStress: stress };
  }

  return {
    pests: GENERIC_PESTS,
    nutrientDeficiencies: GENERIC_NUTRIENTS,
    environmentalStress: GENERIC_STRESS,
  };
}

/**
 * MOCK image validation function for the hackathon prototype.
 *
 * Simulates two checks that a real CNN-based system would perform:
 *
 * 1. CROP MATCH: Does the uploaded image actually contain a leaf of the
 *    crop the farmer selected? If the farmer selected "tomato" but uploaded
 *    a maize leaf, this returns 'wrong_crop' with the detected crop name.
 *
 * 2. PLANT DETECTION: Is the image actually a plant/leaf at all? If the
 *    farmer uploaded a photo of a shoe, bag, or any non-plant object, this
 *    returns 'not_a_plant'.
 *
 * In production, replace this with a real plant classification model that
 * first detects whether the image contains plant material, then identifies
 * the crop species before running disease classification.
 *
 * The mock uses deterministic pseudo-random logic based on a hash of the
 * image data so results are stable within a session.
 */
const CROP_NAMES = CROPS.map((c) => c.name);

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function validateImage(
  cropId: CropId,
  image: string
): { error: ValidationErrorType; detectedCropName: string | null } {
  const hash = hashString(image.slice(0, 500) + cropId);
  const roll = hash % 100;

  // 15% chance: not a plant at all (shoe, bag, random object)
  if (roll < 15) {
    return { error: 'not_a_plant', detectedCropName: null };
  }

  // 20% chance: wrong crop uploaded (a leaf, but not the selected crop)
  if (roll < 35) {
    const otherCrops = CROP_NAMES.filter((name) => {
      const c = CROPS.find((crop) => crop.name === name);
      return c && c.id !== cropId;
    });
    const detectedIdx = hash % otherCrops.length;
    return { error: 'wrong_crop', detectedCropName: otherCrops[detectedIdx] ?? null };
  }

  // 65% chance: correct crop — proceed with analysis
  return { error: null, detectedCropName: null };
}

/**
 * MOCK inference function for the hackathon prototype.
 * Does NOT perform real AI prediction — simulates a classification result.
 * Replace with a real Python/TensorFlow/TFLite model in production.
 */
export function mockInference(
  cropId: CropId,
  image: string | null
): PredictionResult {
  const cropName = CROPS.find((c) => c.id === cropId)?.name ?? cropId;
  const crop = CROP_DEFAULT_DISEASE[cropId] ?? generateGenericDisease(cropId, cropName);
  const cropHealth = assessCropHealth(cropId);

  // No image — low confidence, no validation error
  if (!image) {
    const lowConfidence = 42;
    return {
      cropId,
      disease: crop,
      confidence: lowConfidence,
      severity: getSeverityFromArea(crop.lesionArea),
      lesionArea: crop.lesionArea,
      reliability: getReliability(lowConfidence),
      isReliable: lowConfidence >= CONFIDENCE_THRESHOLD,
      cropHealth,
      validationError: null,
      detectedCropName: null,
    };
  }

  // Validate the image first — check if it's a plant and if it matches the selected crop
  const validation = validateImage(cropId, image);

  if (validation.error === 'not_a_plant') {
    return {
      cropId,
      disease: crop,
      confidence: 0,
      severity: getSeverityFromArea(crop.lesionArea),
      lesionArea: crop.lesionArea,
      reliability: 'low',
      isReliable: false,
      cropHealth,
      validationError: 'not_a_plant',
      detectedCropName: null,
    };
  }

  if (validation.error === 'wrong_crop') {
    return {
      cropId,
      disease: crop,
      confidence: 0,
      severity: getSeverityFromArea(crop.lesionArea),
      lesionArea: crop.lesionArea,
      reliability: 'low',
      isReliable: false,
      cropHealth,
      validationError: 'wrong_crop',
      detectedCropName: validation.detectedCropName,
    };
  }

  // Image passed validation — proceed with disease classification
  const variance = Math.floor(Math.random() * 8) - 4;
  const confidence = Math.min(97, Math.max(0, crop.confidenceBaseline + variance));
  const lesionArea = crop.lesionArea + Math.floor(Math.random() * 6) - 3;
  const severity = getSeverityFromArea(Math.max(0, lesionArea));

  return {
    cropId,
    disease: crop,
    confidence,
    severity,
    lesionArea: Math.max(0, lesionArea),
    reliability: getReliability(confidence),
    isReliable: confidence >= CONFIDENCE_THRESHOLD,
    cropHealth,
    validationError: null,
    detectedCropName: null,
  };
}

export const CONFIDENCE_GATE_THRESHOLD = CONFIDENCE_THRESHOLD;
