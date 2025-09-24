// Comprehensive symptom to disease mapping database
export interface Disease {
  name: string;
  symptoms: string[];
  probability: number;
  doctorType: string;
  description: string;
  causes: string[];
  prevention: string[];
  foodsToEat: string[];
  foodsToAvoid: string[];
  severity: 'mild' | 'moderate' | 'severe';
  category: string;
}

export const diseaseDatabase: Disease[] = [
  {
    name: 'Common Cold',
    symptoms: ['cough', 'fever', 'headache', 'fatigue', 'runny nose', 'sore throat'],
    probability: 0,
    doctorType: 'General Physician',
    description: 'A viral infection affecting the nose and throat',
    causes: ['Viral infection', 'Weakened immune system', 'Close contact with infected person'],
    prevention: ['Wash hands frequently', 'Avoid close contact with sick people', 'Get adequate rest'],
    foodsToEat: ['Warm soups', 'Citrus fruits', 'Ginger tea', 'Honey'],
    foodsToAvoid: ['Dairy products', 'Sugary foods', 'Alcohol', 'Processed foods'],
    severity: 'mild',
    category: 'Respiratory'
  },
  {
    name: 'Influenza (Flu)',
    symptoms: ['fever', 'cough', 'headache', 'fatigue', 'muscle aches', 'chills', 'sore throat'],
    probability: 0,
    doctorType: 'General Physician',
    description: 'A viral infection that attacks your respiratory system',
    causes: ['Influenza virus', 'Weakened immune system', 'Seasonal exposure'],
    prevention: ['Annual flu vaccination', 'Frequent handwashing', 'Avoid crowded places during flu season'],
    foodsToEat: ['Chicken soup', 'Herbal teas', 'Citrus fruits', 'Garlic'],
    foodsToAvoid: ['Alcohol', 'Caffeine', 'Sugary drinks', 'Heavy meals'],
    severity: 'moderate',
    category: 'Respiratory'
  },
  {
    name: 'Migraine',
    symptoms: ['headache', 'nausea', 'dizziness', 'light sensitivity', 'sound sensitivity'],
    probability: 0,
    doctorType: 'Neurologist',
    description: 'A recurring headache disorder characterized by moderate to severe headaches',
    causes: ['Stress', 'Hormonal changes', 'Certain foods', 'Sleep changes'],
    prevention: ['Regular sleep schedule', 'Stress management', 'Avoid trigger foods', 'Stay hydrated'],
    foodsToEat: ['Magnesium-rich foods', 'Ginger', 'Almonds', 'Leafy greens'],
    foodsToAvoid: ['Aged cheese', 'Chocolate', 'Alcohol', 'Processed meats'],
    severity: 'moderate',
    category: 'Neurological'
  },
  {
    name: 'Gastroenteritis',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal pain', 'fever', 'fatigue'],
    probability: 0,
    doctorType: 'Gastroenterologist',
    description: 'Inflammation of the stomach and intestines',
    causes: ['Viral infection', 'Bacterial infection', 'Food poisoning', 'Poor hygiene'],
    prevention: ['Proper food handling', 'Hand hygiene', 'Safe water consumption', 'Vaccination'],
    foodsToEat: ['BRAT diet (Bananas, Rice, Applesauce, Toast)', 'Clear broths', 'Electrolyte drinks'],
    foodsToAvoid: ['Dairy products', 'Fatty foods', 'Spicy foods', 'Alcohol'],
    severity: 'moderate',
    category: 'Gastrointestinal'
  },
  {
    name: 'Hypertension (High Blood Pressure)',
    symptoms: ['headache', 'dizziness', 'chest pain', 'shortness of breath', 'fatigue'],
    probability: 0,
    doctorType: 'Cardiologist',
    description: 'A condition where blood pressure in arteries is persistently elevated',
    causes: ['Poor diet', 'Lack of exercise', 'Obesity', 'Stress', 'Genetics'],
    prevention: ['Regular exercise', 'Healthy diet', 'Limit sodium intake', 'Manage stress'],
    foodsToEat: ['Leafy greens', 'Berries', 'Beets', 'Oats', 'Bananas'],
    foodsToAvoid: ['High sodium foods', 'Processed foods', 'Excessive alcohol', 'Sugary drinks'],
    severity: 'severe',
    category: 'Cardiovascular'
  },
  {
    name: 'Anxiety Disorder',
    symptoms: ['fatigue', 'headache', 'dizziness', 'chest pain', 'shortness of breath', 'rapid heartbeat'],
    probability: 0,
    doctorType: 'Psychiatrist',
    description: 'A mental health disorder characterized by excessive worry and fear',
    causes: ['Stress', 'Trauma', 'Genetics', 'Brain chemistry imbalance'],
    prevention: ['Regular exercise', 'Mindfulness practices', 'Adequate sleep', 'Social support'],
    foodsToEat: ['Complex carbohydrates', 'Omega-3 rich fish', 'Probiotics', 'Herbal teas'],
    foodsToAvoid: ['Caffeine', 'Alcohol', 'Processed sugars', 'High-fat foods'],
    severity: 'moderate',
    category: 'Mental Health'
  },
  {
    name: 'Asthma Attack',
    symptoms: ['shortness of breath', 'cough', 'chest pain', 'wheezing', 'fatigue'],
    probability: 0,
    doctorType: 'Pulmonologist',
    description: 'A condition where airways narrow and swell, producing extra mucus',
    causes: ['Allergens', 'Air pollution', 'Exercise', 'Weather changes', 'Stress'],
    prevention: ['Avoid triggers', 'Take prescribed medications', 'Monitor air quality', 'Regular check-ups'],
    foodsToEat: ['Anti-inflammatory foods', 'Vitamin D rich foods', 'Magnesium sources', 'Antioxidant-rich fruits'],
    foodsToAvoid: ['Sulfites', 'Food additives', 'Excessive salt', 'Processed foods'],
    severity: 'severe',
    category: 'Respiratory'
  },
  {
    name: 'Dehydration',
    symptoms: ['dizziness', 'fatigue', 'headache', 'dry mouth', 'decreased urination'],
    probability: 0,
    doctorType: 'General Physician',
    description: 'A condition that occurs when you use or lose more fluid than you take in',
    causes: ['Insufficient water intake', 'Excessive sweating', 'Fever', 'Vomiting', 'Diarrhea'],
    prevention: ['Drink plenty of water', 'Monitor urine color', 'Increase intake during exercise', 'Eat water-rich foods'],
    foodsToEat: ['Water-rich fruits', 'Coconut water', 'Broths', 'Herbal teas'],
    foodsToAvoid: ['Alcohol', 'Caffeine', 'Sugary drinks', 'High-sodium foods'],
    severity: 'mild',
    category: 'General'
  },
  {
    name: 'COVID-19',
    symptoms: ['fever', 'cough', 'fatigue', 'shortness of breath', 'headache', 'sore throat', 'muscle aches'],
    probability: 0,
    doctorType: 'General Physician',
    description: 'A viral respiratory illness caused by SARS-CoV-2',
    causes: ['SARS-CoV-2 virus', 'Airborne transmission', 'Close contact with infected person'],
    prevention: ['Vaccination', 'Mask wearing', 'Social distancing', 'Hand hygiene'],
    foodsToEat: ['Vitamin C rich foods', 'Zinc supplements', 'Warm liquids', 'Protein-rich foods'],
    foodsToAvoid: ['Alcohol', 'Processed foods', 'Excessive sugar'],
    severity: 'moderate',
    category: 'Respiratory'
  },
  {
    name: 'Diabetes Type 2',
    symptoms: ['fatigue', 'dizziness', 'headache', 'frequent urination', 'excessive thirst'],
    probability: 0,
    doctorType: 'Endocrinologist',
    description: 'A chronic condition affecting blood sugar regulation',
    causes: ['Insulin resistance', 'Obesity', 'Genetics', 'Sedentary lifestyle'],
    prevention: ['Regular exercise', 'Healthy diet', 'Weight management', 'Regular monitoring'],
    foodsToEat: ['Non-starchy vegetables', 'Whole grains', 'Lean proteins', 'Healthy fats'],
    foodsToAvoid: ['Sugary foods', 'Refined carbs', 'Processed foods', 'Sugary drinks'],
    severity: 'severe',
    category: 'Endocrine'
  },
  {
    name: 'Pneumonia',
    symptoms: ['fever', 'cough', 'chest pain', 'shortness of breath', 'fatigue', 'chills'],
    probability: 0,
    doctorType: 'Pulmonologist',
    description: 'An infection that inflames air sacs in lungs',
    causes: ['Bacterial infection', 'Viral infection', 'Fungal infection', 'Weakened immune system'],
    prevention: ['Vaccination', 'Good hygiene', 'Healthy lifestyle', 'Avoid smoking'],
    foodsToEat: ['Warm broths', 'Citrus fruits', 'Ginger', 'Protein-rich foods'],
    foodsToAvoid: ['Dairy products', 'Alcohol', 'Processed foods'],
    severity: 'severe',
    category: 'Respiratory'
  },
  {
    name: 'Food Poisoning',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal pain', 'fever'],
    probability: 0,
    doctorType: 'General Physician',
    description: 'Illness caused by eating contaminated food',
    causes: ['Bacterial contamination', 'Poor food handling', 'Expired food', 'Cross-contamination'],
    prevention: ['Proper food storage', 'Cook food thoroughly', 'Wash hands', 'Check expiration dates'],
    foodsToEat: ['Clear broths', 'BRAT diet', 'Electrolyte drinks', 'Ginger tea'],
    foodsToAvoid: ['Dairy products', 'Fatty foods', 'Spicy foods', 'Alcohol'],
    severity: 'moderate',
    category: 'Gastrointestinal'
  }
];

export function analyzeSymptoms(selectedSymptoms: string[]): Disease | null {
  if (selectedSymptoms.length === 0) return null;

  // Normalize symptoms to lowercase for matching
  const normalizedSymptoms = selectedSymptoms.map(s => s.toLowerCase().trim());
  
  // Calculate probability for each disease with improved matching
  const results = diseaseDatabase.map(disease => {
    let matchingSymptoms = 0;
    let totalWeight = 0;
    
    disease.symptoms.forEach(symptom => {
      const matchFound = normalizedSymptoms.some(selected => {
        // Exact match (highest weight)
        if (selected === symptom) return true;
        // Partial match (medium weight)
        if (selected.includes(symptom) || symptom.includes(selected)) return true;
        // Similar symptoms mapping
        const synonyms: { [key: string]: string[] } = {
          'headache': ['head pain', 'migraine', 'head ache'],
          'fever': ['high temperature', 'temperature', 'hot'],
          'cough': ['coughing', 'hack'],
          'fatigue': ['tired', 'weakness', 'exhaustion', 'tiredness'],
          'nausea': ['sick', 'queasy', 'stomach upset'],
          'dizziness': ['dizzy', 'lightheaded', 'vertigo'],
          'chest pain': ['chest ache', 'heart pain'],
          'shortness of breath': ['breathing difficulty', 'breathless', 'can\'t breathe'],
          'sore throat': ['throat pain', 'throat ache'],
          'muscle aches': ['muscle pain', 'body aches', 'joint pain'],
          'abdominal pain': ['stomach pain', 'belly pain', 'tummy ache'],
          'vomiting': ['throwing up', 'puking', 'sick']
        };
        
        const symptomSynonyms = synonyms[symptom] || [];
        return symptomSynonyms.some(synonym => selected.includes(synonym));
      });
      
      if (matchFound) {
        matchingSymptoms++;
        totalWeight++;
      }
      totalWeight++;
    });
    
    // Enhanced probability calculation
    const baseProb = (matchingSymptoms / disease.symptoms.length) * 100;
    // Bonus for having many symptoms match
    const bonus = matchingSymptoms >= 3 ? 10 : 0;
    const probability = Math.min(95, Math.round(baseProb + bonus));
    
    return {
      ...disease,
      probability,
      matchingSymptoms
    };
  });

  // Find the best matches (allow multiple if close)
  const topMatches = results
    .filter(result => result.matchingSymptoms >= 1)
    .sort((a, b) => {
      // Primary sort by probability
      if (b.probability !== a.probability) return b.probability - a.probability;
      // Secondary sort by number of matching symptoms
      return b.matchingSymptoms - a.matchingSymptoms;
    });

  const bestMatch = topMatches[0];

  if (!bestMatch || bestMatch.probability < 25) {
    // Return a more specific generic result
    return {
      name: `Unspecified Condition (${normalizedSymptoms.length} symptoms)`,
      symptoms: normalizedSymptoms,
      probability: 35,
      doctorType: 'General Physician',
      description: `Based on your ${normalizedSymptoms.length} symptom(s): ${normalizedSymptoms.join(', ')}, a medical evaluation is recommended for proper diagnosis.`,
      causes: ['Multiple factors could contribute to these symptoms', 'May require further medical investigation'],
      prevention: ['Maintain good hygiene', 'Eat a balanced diet', 'Get adequate rest', 'Stay hydrated', 'Monitor symptoms'],
      foodsToEat: ['Nutritious whole foods', 'Plenty of water', 'Fresh fruits and vegetables', 'Light, easily digestible meals'],
      foodsToAvoid: ['Processed foods', 'Excessive alcohol', 'Sugary drinks', 'Heavy or spicy foods'],
      severity: 'mild' as const,
      category: 'General'
    };
  }

  return bestMatch;
}

export function getEmergencyWarning(symptoms: string[]): string | null {
  const emergencySymptoms = [
    'chest pain',
    'shortness of breath',
    'severe headache',
    'difficulty breathing',
    'severe abdominal pain',
    'loss of consciousness',
    'severe allergic reaction'
  ];

  const normalizedSymptoms = symptoms.map(s => s.toLowerCase());
  const hasEmergencySymptom = emergencySymptoms.some(emergency =>
    normalizedSymptoms.some(symptom => symptom.includes(emergency))
  );

  if (hasEmergencySymptom) {
    return '🚨 SEEK IMMEDIATE MEDICAL ATTENTION - Some of your symptoms may indicate a medical emergency.';
  }

  return null;
}