import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Thermometer, HeadphonesIcon, Heart, Zap, AlertTriangle, Activity, Brain, Stethoscope } from "lucide-react";
import { analyzeSymptoms, getEmergencyWarning, Disease } from "@/lib/symptom-analyzer";
import { useToast } from "@/hooks/use-toast";
import symptomRedBg from "@/assets/symptom-red-bg.jpg";

const SymptomChecker = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [otherSymptom, setOtherSymptom] = useState('');
  const [results, setResults] = useState<Disease | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const commonSymptoms = [
    { name: 'Fever', icon: Thermometer, color: 'bg-red-500' },
    { name: 'Cough', icon: Activity, color: 'bg-orange-500' },
    { name: 'Headache', icon: Brain, color: 'bg-yellow-500' },
    { name: 'Fatigue', icon: Heart, color: 'bg-purple-500' },
    { name: 'Nausea', icon: AlertTriangle, color: 'bg-green-500' },
    { name: 'Dizziness', icon: Zap, color: 'bg-blue-500' },
    { name: 'Chest Pain', icon: Heart, color: 'bg-red-600' },
    { name: 'Shortness of Breath', icon: Stethoscope, color: 'bg-cyan-500' },
    { name: 'Sore Throat', icon: Activity, color: 'bg-pink-500' },
    { name: 'Muscle Aches', icon: Activity, color: 'bg-indigo-500' },
    { name: 'Abdominal Pain', icon: AlertTriangle, color: 'bg-orange-600' },
    { name: 'Vomiting', icon: AlertTriangle, color: 'bg-red-400' }
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

  const performAnalysis = async () => {
    if (selectedSymptoms.length === 0) {
      toast({
        title: "No symptoms selected",
        description: "Please select at least one symptom to analyze.",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Check for emergency symptoms
    const emergencyWarning = getEmergencyWarning(selectedSymptoms);
    if (emergencyWarning) {
      toast({
        title: "Emergency Warning",
        description: emergencyWarning,
        variant: "destructive"
      });
    }

    // Simulate API call delay for realistic UX
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const analysis = analyzeSymptoms(selectedSymptoms);
      setResults(analysis);
      
      if (analysis) {
        toast({
          title: "Analysis Complete",
          description: `Most likely condition: ${analysis.name} (${analysis.probability}% match)`
        });
      }
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze symptoms. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                  onClick={performAnalysis}
                  disabled={selectedSymptoms.length === 0 || isAnalyzing}
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    'Analyze Symptoms'
                  )}
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
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{results.name}</h3>
                      <Badge 
                        variant="secondary" 
                        className={`${
                          results.severity === 'severe' ? 'bg-red-500/20 text-red-100' :
                          results.severity === 'moderate' ? 'bg-yellow-500/20 text-yellow-100' :
                          'bg-green-500/20 text-green-100'
                        }`}
                      >
                        {results.severity}
                      </Badge>
                    </div>
                    <div className="flex items-center mb-3">
                      <span className="text-sm">Match Probability: </span>
                      <div className="ml-2 flex-1 bg-white/20 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-1000 ${
                            results.probability >= 70 ? 'bg-green-400' :
                            results.probability >= 50 ? 'bg-yellow-400' : 'bg-red-400'
                          }`}
                          style={{ width: `${results.probability}%` }}
                        />
                      </div>
                      <span className="ml-2 font-bold">{results.probability}%</span>
                    </div>
                    <p className="text-sm opacity-90 mb-3">{results.description}</p>
                    <div className="flex items-center text-sm text-blue-200">
                      <Stethoscope className="h-4 w-4 mr-1" />
                      Category: {results.category}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-green-200">🥗 Recommended Foods:</h4>
                      <ul className="text-sm space-y-1">
                        {results.foodsToEat.map((food: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="text-green-400 mr-2">•</span>
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/10 p-4 rounded-lg">
                      <h4 className="font-bold mb-2 text-red-200">🚫 Foods to Avoid:</h4>
                      <ul className="text-sm space-y-1">
                        {results.foodsToAvoid.map((food: string, index: number) => (
                          <li key={index} className="flex items-center">
                            <span className="text-red-400 mr-2">•</span>
                            {food}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-blue-200">🛡️ Prevention Tips:</h4>
                    <ul className="text-sm space-y-1">
                      {results.prevention.map((tip: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="text-blue-400 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="font-bold mb-2 text-orange-200">🔍 Possible Causes:</h4>
                    <ul className="text-sm space-y-1">
                      {results.causes.map((cause: string, index: number) => (
                        <li key={index} className="flex items-center">
                          <span className="text-orange-400 mr-2">•</span>
                          {cause}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`border p-4 rounded-lg ${
                    results.severity === 'severe' 
                      ? 'bg-red-500/20 border-red-300/30' 
                      : 'bg-yellow-500/20 border-yellow-300/30'
                  }`}>
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="h-5 w-5 mr-2 text-red-300" />
                      <p className="font-bold text-red-100">
                        Consult a {results.doctorType}
                      </p>
                    </div>
                    <p className="text-sm text-red-200">
                      This is an AI-powered analysis based on symptom patterns. Please consult a qualified healthcare professional for proper medical diagnosis and treatment recommendations.
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
