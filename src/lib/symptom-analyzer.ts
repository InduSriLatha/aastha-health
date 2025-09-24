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
  }
];

export function analyzeSymptoms(selectedSymptoms: string[]): Disease | null {
  if (selectedSymptoms.length === 0) return null;

  // Normalize symptoms to lowercase for matching
  const normalizedSymptoms = selectedSymptoms.map(s => s.toLowerCase().trim());
  
  // Calculate probability for each disease
  const results = diseaseDatabase.map(disease => {
    const matchingSymptoms = disease.symptoms.filter(symptom => 
      normalizedSymptoms.some(selected => 
        selected.includes(symptom) || symptom.includes(selected)
      )
    );
    
    const probability = Math.round((matchingSymptoms.length / disease.symptoms.length) * 100);
    
    return {
      ...disease,
      probability,
      matchingSymptoms: matchingSymptoms.length
    };
  });

  // Find the disease with highest probability and at least 2 matching symptoms
  const bestMatch = results
    .filter(result => result.matchingSymptoms >= 2)
    .sort((a, b) => b.probability - a.probability)[0];

  if (!bestMatch || bestMatch.probability < 30) {
    // Return a generic result if no good match found
    return {
      name: 'Unspecified Condition',
      symptoms: normalizedSymptoms,
      probability: 50,
      doctorType: 'General Physician',
      description: 'Based on your symptoms, it\'s recommended to consult with a healthcare professional for proper evaluation.',
      causes: ['Various factors could contribute to these symptoms'],
      prevention: ['Maintain good hygiene', 'Eat a balanced diet', 'Get adequate rest', 'Stay hydrated'],
      foodsToEat: ['Nutritious whole foods', 'Plenty of water', 'Fresh fruits and vegetables'],
      foodsToAvoid: ['Processed foods', 'Excessive alcohol', 'Sugary drinks'],
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