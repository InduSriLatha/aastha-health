import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Thermometer, HeadphonesIcon, Heart, Zap } from "lucide-react";
import symptomRedBg from "@/assets/symptom-red-bg.jpg";

const SymptomChecker = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherSymptom, setOtherSymptom] = useState('');
  const [results, setResults] = useState<any>(null);

  const commonSymptoms = [
    { name: 'Fever', icon: Thermometer, color: 'bg-red-500' },
    { name: 'Cough', icon: HeadphonesIcon, color: 'bg-orange-500' },
    { name: 'Headache', icon: Zap, color: 'bg-yellow-500' },
    { name: 'Fatigue', icon: Heart, color: 'bg-purple-500' },
    { name: 'Nausea', icon: Heart, color: 'bg-green-500' },
    { name: 'Dizziness', icon: Zap, color: 'bg-blue-500' },
    { name: 'Chest Pain', icon: Heart, color: 'bg-red-600' },
    { name: 'Shortness of Breath', icon: HeadphonesIcon, color: 'bg-cyan-500' }
  ];

  const toggleSymptom = (symptom: string) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(prev => prev.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms(prev => [...prev, symptom]);
    }
  };

  const addOtherSymptom = () => {
    if (otherSymptom.trim() && !selectedSymptoms.includes(otherSymptom.trim())) {
      setSelectedSymptoms(prev => [...prev, otherSymptom.trim()]);
      setOtherSymptom('');
    }
  };

  const analyzeSymptoms = () => {
    // Mock analysis - in real app, this would call AI API
    const mockResults = {
      disease: 'Common Cold',
      probability: 75,
      doctorType: 'General Physician',
      description: 'A viral infection affecting the nose and throat',
      causes: ['Viral infection', 'Weakened immune system', 'Close contact with infected person'],
      prevention: ['Wash hands frequently', 'Avoid close contact with sick people', 'Get adequate rest'],
      foodsToEat: ['Warm soups', 'Citrus fruits', 'Ginger tea', 'Honey'],
      foodsToAvoid: ['Dairy products', 'Sugary foods', 'Alcohol', 'Processed foods']
    };
    setResults(mockResults);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${symptomRedBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/70 to-red-900/80" />

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center mb-8 pt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              className="mr-4 bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              Symptom Checker
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Symptom Selection */}
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Select Your Symptoms</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Common Symptoms */}
                <div className="grid grid-cols-2 gap-4">
                  {commonSymptoms.map((symptom) => {
                    const IconComponent = symptom.icon;
                    const isSelected = selectedSymptoms.includes(symptom.name);
                    return (
                      <button
                        key={symptom.name}
                        onClick={() => toggleSymptom(symptom.name)}
                        className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                          isSelected 
                            ? 'border-white bg-white/20 scale-105' 
                            : 'border-white/30 hover:border-white/50 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full ${symptom.color} flex items-center justify-center mx-auto mb-2`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <p className="text-white text-sm font-medium">{symptom.name}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Other Symptoms */}
                <div className="space-y-3">
                  <Label className="text-white font-medium">Other Symptoms:</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter additional symptom"
                      value={otherSymptom}
                      onChange={(e) => setOtherSymptom(e.target.value)}
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                      onKeyPress={(e) => e.key === 'Enter' && addOtherSymptom()}
                    />
                    <Button
                      onClick={addOtherSymptom}
                      size="icon"
                      className="bg-white/20 hover:bg-white/30 border-white/30"
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Selected Symptoms */}
                {selectedSymptoms.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-white font-medium">Selected Symptoms:</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedSymptoms.map((symptom) => (
                        <Badge
                          key={symptom}
                          variant="secondary"
                          className="bg-white/20 text-white hover:bg-white/30 cursor-pointer"
                          onClick={() => toggleSymptom(symptom)}
                        >
                          {symptom} ×
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={analyzeSymptoms}
                  disabled={selectedSymptoms.length === 0}
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                  size="lg"
                >
                  Analyze Symptoms
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            {results && (
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Analysis Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-white">
                  <div className="bg-white/20 p-4 rounded-lg">
                    <h3 className="text-xl font-bold mb-2">{results.disease}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-sm">Probability: </span>
                      <div className="ml-2 flex-1 bg-white/20 rounded-full h-2">
                        <div 
                          className="bg-white h-2 rounded-full transition-all duration-500"
                          style={{ width: `${results.probability}%` }}
                        />
                      </div>
                      <span className="ml-2 font-bold">{results.probability}%</span>
                    </div>
                    <p className="text-sm opacity-90">{results.description}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Foods to Eat:</h4>
                      <ul className="text-sm space-y-1">
                        {results.foodsToEat.map((food: string, index: number) => (
                          <li key={index}>• {food}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-bold mb-2">Foods to Avoid:</h4>
                      <ul className="text-sm space-y-1">
                        {results.foodsToAvoid.map((food: string, index: number) => (
                          <li key={index}>• {food}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-red-500/20 border border-red-300/30 p-4 rounded-lg">
                    <p className="font-bold text-red-100">⚠️ Consult a {results.doctorType}</p>
                    <p className="text-sm text-red-200 mt-1">
                      This is an AI analysis. Please consult a healthcare professional for proper diagnosis.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomChecker;
