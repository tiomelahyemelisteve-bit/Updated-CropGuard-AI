import type { CropInfo } from '@/types';

interface KnowledgeEntry {
  keywords: string[];
  response: string;
  followUp?: string[];
}

export const CROPS: CropInfo[] = [
  { id: 'maize', name: 'Maize', tagline: 'Gray Leaf Spot, Northern Leaf Blight, Common Rust', image: 'https://images.pexels.com/photos/18005301/pexels-photo-18005301.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['gray_leaf_spot', 'northern_leaf_blight', 'common_rust'] },
  { id: 'tomato', name: 'Tomato', tagline: 'Early Blight, Late Blight', image: 'https://images.pexels.com/photos/6342164/pexels-photo-6342164.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['early_blight', 'late_blight'] },
  { id: 'potato', name: 'Potato', tagline: 'Late Blight', image: 'https://images.pexels.com/photos/31908568/pexels-photo-31908568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['potato_late_blight'] },
  { id: 'banana', name: 'Banana', tagline: 'Black Sigatoka, Bunchy Top', image: 'https://images.pexels.com/photos/2336784/pexels-photo-2336784.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['banana_sigatoka', 'banana_bunchy_top'] },
  { id: 'beans', name: 'Beans', tagline: 'Anthracnose, Angular Leaf Spot', image: 'https://images.pexels.com/photos/4148642/pexels-photo-4148642.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['beans_anthracnose', 'beans_angular_leaf_spot'] },
  { id: 'cassava', name: 'Cassava', tagline: 'Brown Streak Disease, Cassava Mosaic', image: 'https://images.pexels.com/photos/18344824/pexels-photo-18344824.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['cassava_brown_streak', 'cassava_mosaic'] },
  { id: 'coffee', name: 'Coffee', tagline: 'Leaf Rust, Coffee Berry Disease', image: 'https://images.pexels.com/photos/7125439/pexels-photo-7125439.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['coffee_leaf_rust', 'coffee_berry_disease'] },
  { id: 'kale', name: 'Kale', tagline: 'Black Rot, Downy Mildew', image: 'https://images.pexels.com/photos/12901835/pexels-photo-12901835.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['kale_black_rot', 'kale_downy_mildew'] },
  { id: 'rice', name: 'Rice', tagline: 'Rice Blast, Bacterial Blight', image: 'https://images.pexels.com/photos/13888402/pexels-photo-13888402.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['rice_blast', 'rice_bacterial_blight'] },
  { id: 'sorghum', name: 'Sorghum', tagline: 'Anthracnose, Leaf Blight', image: 'https://images.pexels.com/photos/17164609/pexels-photo-17164609.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['sorghum_anthracnose', 'sorghum_leaf_blight'] },
  { id: 'wheat', name: 'Wheat', tagline: 'Leaf Rust, Powdery Mildew', image: 'https://images.pexels.com/photos/12873375/pexels-photo-12873375.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['wheat_leaf_rust', 'wheat_powdery_mildew'] },
  { id: 'millet', name: 'Millet', tagline: 'Downy Mildew, Smut', image: 'https://images.pexels.com/photos/16977456/pexels-photo-16977456.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['millet_downy_mildew', 'millet_smut'] },
  { id: 'groundnut', name: 'Groundnut', tagline: 'Leaf Spot, Rust', image: 'https://images.pexels.com/photos/35842750/pexels-photo-35842750.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['groundnut_leaf_spot', 'groundnut_rust'] },
  { id: 'sunflower', name: 'Sunflower', tagline: 'Leaf Blight, Powdery Mildew', image: 'https://images.pexels.com/photos/29278365/pexels-photo-29278365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['sunflower_leaf_blight', 'sunflower_powdery_mildew'] },
  { id: 'cotton', name: 'Cotton', tagline: 'Leaf Curl, Bacterial Blight', image: 'https://images.pexels.com/photos/13924870/pexels-photo-13924870.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['cotton_leaf_curl', 'cotton_bacterial_blight'] },
  { id: 'onion', name: 'Onion', tagline: 'Purple Blotch, Downy Mildew', image: 'https://images.pexels.com/photos/2284170/pexels-photo-2284170.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['onion_purple_blotch', 'onion_downy_mildew'] },
  { id: 'pepper', name: 'Pepper', tagline: 'Bacterial Spot, Anthracnose', image: 'https://images.pexels.com/photos/13220059/pexels-photo-13220059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['pepper_bacterial_spot', 'pepper_anthracnose'] },
  { id: 'cabbage', name: 'Cabbage', tagline: 'Black Rot, Club Root', image: 'https://images.pexels.com/photos/33901158/pexels-photo-33901158.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['cabbage_black_rot', 'cabbage_club_root'] },
  { id: 'sweet_potato', name: 'Sweet Potato', tagline: 'Leaf Spot, Virus Disease', image: 'https://images.pexels.com/photos/19067632/pexels-photo-19067632.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', diseases: ['sweet_potato_leaf_spot', 'sweet_potato_virus'] },
];

export const CROPI_KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'jambo', 'hola'],
    response: "Hello! I'm Cropi, your CropGuard AI assistant. I can help you with crop diseases, pest identification, nutrient deficiencies, environmental stress, and guide you through leaf analysis. What would you like to know?",
    followUp: ['What crops do you support?', 'How do I analyze a leaf?', 'What is the confidence gate?'],
  },
  {
    keywords: ['what can you do', 'help', 'who are you', 'what are you', 'your name'],
    response: "I'm Cropi, the conversational AI assistant for CropGuard AI. I can:\n\n- Answer questions about crop diseases across unlimited crop types\n- Explain the 5-stage pipeline (Capture -> Pre-process -> Classify -> Validate -> Respond)\n- Help you understand confidence scores and severity levels\n- Provide management and prevention guidance\n- Explain nutrient deficiencies and environmental stress\n- Guide you through the leaf analysis process\n\nWhat would you like to explore?",
    followUp: ['How do I analyze a leaf?', 'What crops do you support?', 'Tell me about the confidence gate'],
  },
  {
    keywords: ['how', 'analyze', 'upload', 'photo', 'leaf', 'start', 'begin', 'camera'],
    response: "To analyze a leaf, follow these steps:\n\n1. Click 'Analyze a Leaf' on the homepage\n2. Select your crop type (or add a custom crop)\n3. Upload a photo or take one with your camera\n4. Click 'Analyze Leaf' and watch the 5-stage pipeline run\n5. Review your results -- disease, confidence, severity, crop health, and recommendations\n\nThe whole process takes just a few seconds. Would you like to try it now?",
    followUp: ['What crops do you support?', 'What is the confidence gate?', 'What is severity assessment?'],
  },
  {
    keywords: ['crop', 'crops', 'support', 'supported', 'available', 'list'],
    response: "CropGuard AI supports UNLIMITED crops! We have detailed disease profiles for 19 built-in crops:\n\n- Maize, Tomato, Potato, Banana, Beans, Cassava, Coffee\n- Kale, Rice, Sorghum, Wheat, Millet, Groundnut\n- Sunflower, Cotton, Onion, Pepper, Cabbage, Sweet Potato\n\nYou can also add ANY custom crop and the system will analyze it with a generic disease and health profile. That's what we mean by unlimited -- no matter what you grow, CropGuard AI can help.",
    followUp: ['How do I add a custom crop?', 'Tell me about maize diseases', 'Analyze a leaf'],
  },
  {
    keywords: ['confidence', 'gate', 'reliable', 'uncertain', 'threshold', 'trust'],
    response: "The Confidence Gate is one of CropGuard AI's most important features:\n\n- After AI classification, the system checks the confidence score\n- If confidence is 60% or higher: The result is marked as reliable -- full disease, severity, and recommendations are shown\n- If confidence is below 60%: The system shows an 'UNCERTAIN RESULT' warning instead of forcing a wrong diagnosis\n- The farmer is then prompted to retake the photo or upload another image\n\nThis means we don't blindly guess -- we tell you when we're not sure.",
    followUp: ['What is severity assessment?', 'How do I get a better photo?', 'What is the pipeline?'],
  },
  {
    keywords: ['severity', 'mild', 'moderate', 'severe', 'scale', 'how bad'],
    response: "CropGuard AI uses a 3-level severity scale based on visible affected area:\n\nMILD -- Affected area less than 10%\nEarly stage or minor infection. Monitor closely and begin preventive measures.\n\nMODERATE -- Affected area 10-30%\nActive infection spreading. Management actions recommended promptly.\n\nSEVERE -- Affected area over 30%\nHeavy infection. Immediate intervention needed.\n\nThis is a prototype estimation based on visible lesion area -- not a certified agricultural diagnosis.",
    followUp: ['What are the recommendations?', 'What is the confidence gate?', 'How do I analyze a leaf?'],
  },
  {
    keywords: ['pipeline', 'stages', 'steps', 'process', 'flow', 'how it works'],
    response: "CropGuard AI uses a 5-stage pipeline:\n\n1. CAPTURE -- Leaf photo acquired via camera or upload\n2. PRE-PROCESS -- Image is resized, normalized, denoised\n3. CLASSIFY -- CNN model predicts the disease class\n4. VALIDATE -- Confidence gate checks prediction reliability\n5. RESPOND -- Severity, management and prevention advice generated\n\nEvery photo passes through all five stages before showing a result.",
    followUp: ['What is the confidence gate?', 'What is severity assessment?', 'What technology does it use?'],
  },
  {
    keywords: ['recommendation', 'management', 'prevention', 'treatment', 'advice', 'what to do'],
    response: "After identifying a disease, CropGuard AI provides two types of recommendations:\n\nMANAGEMENT -- Immediate, practical actions to address the current infection (e.g. applying fungicides, removing infected material, improving airflow)\n\nPREVENTION -- Long-term guidance to avoid future outbreaks (e.g. planting resistant varieties, crop rotation, field sanitation)\n\nAll advice follows the principle: 'Follow locally approved agricultural guidance.' We never invent exact pesticide dosages or unsafe treatment instructions.",
    followUp: ['What is severity assessment?', 'Tell me about crop health', 'How do I analyze a leaf?'],
  },
  {
    keywords: ['pest', 'insect', 'bug', 'worm', 'aphid', 'armyworm', 'whitefly', 'borer'],
    response: "CropGuard AI's Crop Health Assessment includes pest detection! When you analyze a leaf, the system checks for crop-specific pests such as:\n\n- Fall Armyworm (maize)\n- Whitefly (tomato, cotton)\n- Banana Aphid (banana)\n- Diamondback Moth (kale, cabbage)\n- Coffee Berry Borer (coffee)\n- Rice Stem Borer (rice)\n- Thrips (onion)\n- And more for each crop\n\nDetected pests show a confidence percentage, damage description, and management steps.",
    followUp: ['What about nutrient deficiencies?', 'How do I analyze a leaf?', 'Tell me about environmental stress'],
  },
  {
    keywords: ['nutrient', 'deficiency', 'fertilizer', 'nitrogen', 'phosphorus', 'potassium', 'calcium', 'zinc', 'iron', 'magnesium'],
    response: "The Crop Health Assessment also checks for nutrient deficiencies visible on the leaf:\n\n- Nitrogen -- yellowing of older leaves\n- Potassium -- marginal leaf scorch\n- Calcium -- leaf tip burn\n- Phosphorus -- purpling of leaves\n- Zinc -- interveinal chlorosis on new growth\n- And more\n\nEach flagged deficiency includes a description and fertilizer recommendation following locally approved guidance.",
    followUp: ['What about pests?', 'Tell me about environmental stress', 'How do I analyze a leaf?'],
  },
  {
    keywords: ['environmental', 'stress', 'drought', 'heat', 'water', 'cold', 'sun', 'wind', 'waterlog'],
    response: "CropGuard AI also detects environmental stress indicators from the leaf image:\n\n- Heat Stress -- leaf curling, sunscald\n- Drought Stress -- leaf rolling, wilting\n- Waterlogging -- yellowing, root rot risk\n- Cold Stress -- purpling, reduced growth\n- Wind Damage -- tearing, shredding\n\nEach detected stress comes with a practical recommendation to help the farmer respond quickly.",
    followUp: ['What about pests?', 'What about nutrient deficiencies?', 'How do I analyze a leaf?'],
  },
  {
    keywords: ['crop health', 'health assessment', 'full picture', 'beyond disease'],
    response: "CropGuard AI goes beyond just disease detection. When you submit a leaf photo, you get a full Crop Health Assessment covering:\n\n1. Disease identification with confidence score\n2. Pest detection (crop-specific pests)\n3. Nutrient deficiency analysis\n4. Environmental stress indicators\n5. Severity assessment\n6. Management and prevention recommendations\n\nThis holistic approach gives farmers a complete picture of their crop's health in one photo.",
    followUp: ['How do I analyze a leaf?', 'What is the confidence gate?', 'What crops do you support?'],
  },
  {
    keywords: ['maize', 'corn'],
    response: "Maize is one of our most detailed crops. Supported diseases:\n- Gray Leaf Spot -- rectangular gray-to-tan lesions bounded by veins\n- Northern Leaf Blight -- cigar-shaped gray-green lesions\n- Common Rust -- cinnamon-brown raised pustules\n\nPest checks: Fall Armyworm, Maize Stem Borer\nNutrient checks: Nitrogen, Phosphorus\nStress checks: Drought, Heat\n\nReady to analyze a maize leaf?",
    followUp: ['How do I analyze a leaf?', 'Tell me about tomato diseases', 'What is the confidence gate?'],
  },
  {
    keywords: ['tomato'],
    response: "Tomato is fully supported. Supported diseases:\n- Early Blight -- concentric ring spots (target-board pattern)\n- Late Blight -- large dark blotches, white fungal growth\n\nPest checks: Whitefly, Tomato Leaf Miner\nNutrient checks: Nitrogen, Calcium\nStress checks: Heat, Waterlogging\n\nReady to analyze a tomato leaf?",
    followUp: ['How do I analyze a leaf?', 'Tell me about potato diseases', 'What is severity?'],
  },
  {
    keywords: ['wheat'],
    response: "Wheat is supported with Leaf Rust (orange-brown pustules) and Powdery Mildew (white fungal growth on leaves). Pest checks include Wheat Aphid and Hessian Fly. Nutrient checks cover Nitrogen and Zinc. Ready to analyze?",
    followUp: ['How do I analyze a leaf?', 'What crops do you support?'],
  },
  {
    keywords: ['millet'],
    response: "Millet is supported with Downy Mildew (yellowish streaks, white fungal growth) and Smut (dark smutted areas on seed heads). Pest checks include Millet Stem Borer. Nutrient checks cover Nitrogen and Phosphorus. Ready to analyze?",
    followUp: ['How do I analyze a leaf?', 'What crops do you support?'],
  },
  {
    keywords: ['cotton'],
    response: "Cotton is supported with Leaf Curl Virus (upward curling, thickened veins) and Bacterial Blight (water-soaked angular lesions). Pest checks include Whitefly and Bollworm. Nutrient checks cover Nitrogen and Potassium. Ready to analyze?",
    followUp: ['How do I analyze a leaf?', 'What crops do you support?'],
  },
  {
    keywords: ['onion'],
    response: "Onion is supported with Purple Blotch (purple lesions with concentric rings) and Downy Mildew (pale yellow patches with gray fungal growth). Pest checks include Thrips and Onion Maggot. Ready to analyze?",
    followUp: ['How do I analyze a leaf?', 'What crops do you support?'],
  },
  {
    keywords: ['custom', 'add crop', 'new crop', 'my crop', 'other crop', 'unlimited'],
    response: "Yes! CropGuard AI supports UNLIMITED crops. On the Analyze page, click 'Add a custom crop' and type in any crop name. The system will create a generic disease and health profile for it. This means you can analyze any crop -- wheat, millet, groundnut, yam, barley, sugarcane, or anything else you can think of!",
    followUp: ['How do I analyze a leaf?', 'What crops do you support?'],
  },
  {
    keywords: ['technology', 'tech', 'architecture', 'model', 'ai', 'tensorflow', 'cnn', 'mobilenet', 'python'],
    response: "CropGuard AI's technical stack:\n- Frontend: Mobile/Web Application\n- AI: Python, TensorFlow/Keras, MobileNetV2 / Efficient CNN\n- Future: TensorFlow Lite for on-device/offline inference\n- Dataset: PlantVillage + future field photographs\n\nThe current prototype uses a MOCK inference function that simulates predictions. This is structured so it can be replaced with a real trained model later.",
    followUp: ['What is the pipeline?', 'Is this offline?', 'How accurate is it?'],
  },
  {
    keywords: ['offline', 'on-device', 'internet', 'connectivity', 'tflite'],
    response: "Offline/on-device inference is a key future direction. The plan is to use TensorFlow Lite to run models directly on the farmer's smartphone -- no internet required. This is critical for rural areas with limited connectivity.\n\nNote: The current prototype does NOT perform real offline AI. It uses a mock inference function for demonstration.",
    followUp: ['What technology does it use?', 'What is the pipeline?'],
  },
  {
    keywords: ['accuracy', 'precise', 'recall', 'evaluation', 'target', 'performance'],
    response: "Our intended evaluation targets (NOT achieved results):\n- 90%+ Recall -- correctly identifying diseased leaves\n- 90%+ Precision -- minimizing false positives\n- Unlimited crops and disease classes + healthy\n\nThese are goals, not claimed results. Real evaluation will be conducted with trained models and field data.",
    followUp: ['What is the confidence gate?', 'What technology does it use?'],
  },
  {
    keywords: ['kenya', 'kenyan', 'farmer', 'africa', 'kiswahili', 'swahili'],
    response: "CropGuard AI is designed with Kenyan farmers in mind:\n- Simple farmer-friendly interface\n- English now, Kiswahili guidance planned\n- Low-cost smartphone compatibility\n- Future offline/on-device capability\n- Future validation with real Kenyan field photographs\n\nWe don't claim field validation or Kiswahili support is completed yet -- these are planned features.",
    followUp: ['How do I analyze a leaf?', 'Is this offline?', 'What crops do you support?'],
  },
  {
    keywords: ['demo', 'mock', 'prototype', 'real', 'fake', 'simulation'],
    response: "Important clarification: The current website is a hackathon PROTOTYPE. It uses a MOCK inference function that simulates AI predictions -- it does NOT perform real AI classification.\n\nThe mock function is structured so it can be replaced with a real Python/TensorFlow/TensorFlow Lite model in the future. All results should be treated as demonstrations, not real diagnoses.",
    followUp: ['What technology does it use?', 'How accurate is it?'],
  },
  {
    keywords: ['explanation', 'explain', 'why', 'heatmap', 'highlight', 'xai', 'explainable'],
    response: "CropGuard AI includes explainable AI features. When a result is shown, you'll see:\n- An AI heatmap-style overlay on the leaf image highlighting detected affected regions\n- A 'Why this prediction?' section explaining what visual characteristics were detected (lesions, discoloration, affected regions)\n\nThis helps farmers understand WHY the system made its prediction -- not just WHAT it predicted.",
    followUp: ['How do I analyze a leaf?', 'What is the confidence gate?'],
  },
  {
    keywords: ['thank', 'thanks', 'appreciate', 'great', 'awesome', 'good job', 'nice'],
    response: "You're welcome! I'm here to help anytime. Feel free to ask me anything about CropGuard AI, crop diseases, or how to analyze your leaves. Is there anything else you'd like to know?",
    followUp: ['How do I analyze a leaf?', 'What crops do you support?', 'What is the confidence gate?'],
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later', 'quit', 'close'],
    response: "Goodbye! I'm always here if you need help with your crops. Just click the Cropi button anytime. Happy farming!",
    followUp: [],
  },
];

export function findResponse(query: string): { response: string; followUp?: string[] } {
  const normalized = query.toLowerCase().trim();

  let bestMatch: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of CROPI_KNOWLEDGE) {
    let score = 0;
    for (const keyword of entry.keywords) {
      if (normalized.includes(keyword)) {
        score += keyword.length;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (bestMatch && bestScore > 0) {
    return { response: bestMatch.response, followUp: bestMatch.followUp };
  }

  return {
    response: "I'm not quite sure about that specific question, but I can help with:\n\n- Crop diseases and symptoms\n- How to analyze a leaf\n- The confidence gate and severity scale\n- Pests, nutrient deficiencies, and environmental stress\n- Technology and architecture\n- Custom crops and supported crops\n\nTry asking me about one of these topics, or use the follow-up suggestions below!",
    followUp: ['What can you do?', 'How do I analyze a leaf?', 'What crops do you support?'],
  };
}
