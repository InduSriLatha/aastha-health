import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User, Heart, Activity, Shield, AlertTriangle, Loader2 } from "lucide-react";

const UserProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    height_cm: '',
    weight_kg: '',
    gender: '',
    diseases: [] as string[],
    allergies: [] as string[],
    fitness_level: '',
    weight_goal: '',
    diseaseInput: '',
    allergyInput: ''
  });

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        navigate('/auth');
        return;
      }
      setUser(session.user);
      
      // Load existing profile if available
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
        
      if (profile) {
        setFormData({
          age: profile.age?.toString() || '',
          height_cm: profile.height_cm?.toString() || '',
          weight_kg: profile.weight_kg?.toString() || '',
          gender: profile.gender || '',
          diseases: profile.diseases || [],
          allergies: profile.allergies || [],
          fitness_level: profile.fitness_level || '',
          weight_goal: profile.weight_goal || '',
          diseaseInput: '',
          allergyInput: ''
        });
      }
    };
    
    checkUser();
  }, [navigate]);

  const commonDiseases = [
    'Diabetes', 'High Blood Pressure', 'Heart Disease', 'Asthma', 
    'Arthritis', 'Thyroid', 'Kidney Disease', 'Liver Disease',
    'PCOS', 'Migraine', 'Depression', 'Anxiety'
  ];

  const commonAllergies = [
    'Peanuts', 'Tree Nuts', 'Milk', 'Eggs', 'Wheat', 'Soy', 
    'Fish', 'Shellfish', 'Dust', 'Pollen', 'Pet Dander'
  ];

  const addDisease = () => {
    if (formData.diseaseInput.trim() && !formData.diseases.includes(formData.diseaseInput.trim())) {
      setFormData(prev => ({
        ...prev,
        diseases: [...prev.diseases, prev.diseaseInput.trim()],
        diseaseInput: ''
      }));
    }
  };

  const removeDisease = (disease: string) => {
    setFormData(prev => ({
      ...prev,
      diseases: prev.diseases.filter(d => d !== disease)
    }));
  };

  const addAllergy = () => {
    if (formData.allergyInput.trim() && !formData.allergies.includes(formData.allergyInput.trim())) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, prev.allergyInput.trim()],
        allergyInput: ''
      }));
    }
  };

  const removeAllergy = (allergy: string) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter(a => a !== allergy)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      setLoading(true);

      // Basic validation
      const age = parseInt(formData.age);
      const height_cm = parseInt(formData.height_cm);
      const weight_kg = parseFloat(formData.weight_kg);

      if (isNaN(age) || age < 1 || age > 150) {
        toast({
          title: "Invalid input",
          description: "Please enter a valid age between 1-150",
          variant: "destructive",
        });
        return;
      }

      if (isNaN(height_cm) || height_cm < 50 || height_cm > 300) {
        toast({
          title: "Invalid input",
          description: "Please enter a valid height between 50-300 cm",
          variant: "destructive",
        });
        return;
      }

      if (isNaN(weight_kg) || weight_kg < 10 || weight_kg > 500) {
        toast({
          title: "Invalid input",
          description: "Please enter a valid weight between 10-500 kg",
          variant: "destructive",
        });
        return;
      }

      if (!formData.gender) {
        toast({
          title: "Invalid input",
          description: "Please select your gender",
          variant: "destructive",
        });
        return;
      }

      if (!formData.fitness_level) {
        toast({
          title: "Invalid input",
          description: "Please select your fitness level",
          variant: "destructive",
        });
        return;
      }

      if (!formData.weight_goal) {
        toast({
          title: "Invalid input",
          description: "Please select your weight goal",
          variant: "destructive",
        });
        return;
      }

      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({
          age,
          height_cm,
          weight_kg,
          gender: formData.gender,
          diseases: formData.diseases,
          allergies: formData.allergies,
          fitness_level: formData.fitness_level,
          weight_goal: formData.weight_goal,
          user_id: user.id
        })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Error saving profile",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Profile saved successfully!",
        description: "Your health profile has been updated.",
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "An error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/20 via-background to-secondary/20 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <User className="h-12 w-12 text-primary mr-4" />
            <h1 className="text-4xl font-bold text-foreground">User Profile Setup</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Help us personalize your health experience
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center">
              <Heart className="h-6 w-6 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="Enter height in cm"
                    value={formData.height_cm}
                    onChange={(e) => setFormData(prev => ({ ...prev, height_cm: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="Enter weight in kg"
                    value={formData.weight_kg}
                    onChange={(e) => setFormData(prev => ({ ...prev, weight_kg: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fitness_level">Fitness Level</Label>
                  <Select value={formData.fitness_level} onValueChange={(value) => setFormData(prev => ({ ...prev, fitness_level: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fitness level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight_goal">Weight Goal</Label>
                  <Select value={formData.weight_goal} onValueChange={(value) => setFormData(prev => ({ ...prev, weight_goal: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select weight goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintain">Maintain Weight</SelectItem>
                      <SelectItem value="loss">Weight Loss</SelectItem>
                      <SelectItem value="gain">Weight Gain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center">
                  <Activity className="h-5 w-5 mr-2" />
                  Health Conditions & Diseases
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a health condition or disease..."
                    value={formData.diseaseInput}
                    onChange={(e) => setFormData(prev => ({ ...prev, diseaseInput: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDisease())}
                  />
                  <Button type="button" onClick={addDisease} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {commonDiseases.map((disease) => (
                    <Button
                      key={disease}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!formData.diseases.includes(disease)) {
                          setFormData(prev => ({ ...prev, diseases: [...prev.diseases, disease] }));
                        }
                      }}
                      className="text-xs"
                    >
                      + {disease}
                    </Button>
                  ))}
                </div>
                {formData.diseases.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.diseases.map((disease) => (
                      <div key={disease} className="flex items-center gap-1 bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm">
                        {disease}
                        <Button
                          type="button"
                          onClick={() => removeDisease(disease)}
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-red-600 hover:text-red-800"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-semibold flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Allergies
                </Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add an allergy..."
                    value={formData.allergyInput}
                    onChange={(e) => setFormData(prev => ({ ...prev, allergyInput: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAllergy())}
                  />
                  <Button type="button" onClick={addAllergy} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {commonAllergies.map((allergy) => (
                    <Button
                      key={allergy}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (!formData.allergies.includes(allergy)) {
                          setFormData(prev => ({ ...prev, allergies: [...prev.allergies, allergy] }));
                        }
                      }}
                      className="text-xs"
                    >
                      + {allergy}
                    </Button>
                  ))}
                </div>
                {formData.allergies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.allergies.map((allergy) => (
                      <div key={allergy} className="flex items-center gap-1 bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                        {allergy}
                        <Button
                          type="button"
                          onClick={() => removeAllergy(allergy)}
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-orange-600 hover:text-orange-800"
                        >
                          ×
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="flex-1"
                  disabled={loading}
                >
                  Skip for Now
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Profile"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;