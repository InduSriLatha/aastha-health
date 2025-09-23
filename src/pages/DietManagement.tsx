import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Apple, Utensils, Target } from "lucide-react";
import dietColorfulBg from "@/assets/diet-colorful-bg.jpg";

const DietManagement = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [goal, setGoal] = useState('');
  const [dietPlan, setDietPlan] = useState<any>(null);

  const generateDietPlan = () => {
    // Mock diet plan - in real app, this would call AI API
    const mockPlan = {
      goal: goal,
      calories: goal === 'weight-loss' ? 1500 : goal === 'weight-gain' ? 2500 : 2000,
      meals: [
        {
          name: 'Breakfast',
          time: '7:00 AM',
          foods: [
            { name: 'Oatmeal with berries', quantity: '1 cup', calories: 300, protein: 10 },
            { name: 'Green tea', quantity: '1 cup', calories: 0, protein: 0 }
          ]
        },
        {
          name: 'Lunch',
          time: '12:30 PM',
          foods: [
            { name: 'Grilled chicken salad', quantity: '1 bowl', calories: 400, protein: 35 },
            { name: 'Brown rice', quantity: '1/2 cup', calories: 110, protein: 3 }
          ]
        },
        {
          name: 'Dinner',
          time: '7:00 PM',
          foods: [
            { name: 'Vegetable curry', quantity: '1 cup', calories: 250, protein: 8 },
            { name: 'Whole wheat roti', quantity: '2 pieces', calories: 140, protein: 6 }
          ]
        }
      ],
      nutrition: {
        protein: 62,
        carbs: 180,
        fats: 45,
        fiber: 25
      }
    };
    setDietPlan(mockPlan);
  };

  const downloadPlan = () => {
    // In real app, generate and download PDF
    alert('Diet plan download feature will be implemented with backend integration');
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${dietColorfulBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-orange-800/60 to-purple-900/70" />

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
              Diet & Weight Management
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Goal Selection */}
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Target className="h-6 w-6 mr-2" />
                  Your Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Select value={goal} onValueChange={setGoal}>
                  <SelectTrigger className="bg-white/20 border-white/30 text-white">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                    <SelectItem value="weight-gain">Weight Gain</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                  </SelectContent>
                </Select>

                <div className="space-y-4">
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Weight Loss</h4>
                    <p className="text-white/80 text-sm">1500-1800 calories/day</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Weight Gain</h4>
                    <p className="text-white/80 text-sm">2200-2800 calories/day</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg">
                    <h4 className="text-white font-semibold mb-2">Maintain</h4>
                    <p className="text-white/80 text-sm">1800-2200 calories/day</p>
                  </div>
                </div>

                <Button
                  onClick={generateDietPlan}
                  disabled={!goal}
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                  size="lg"
                >
                  <Utensils className="h-4 w-4 mr-2" />
                  Generate Diet Plan
                </Button>
              </CardContent>
            </Card>

            {/* Diet Plan */}
            {dietPlan && (
              <div className="lg:col-span-2 space-y-6">
                <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl text-white flex items-center">
                      <Apple className="h-6 w-6 mr-2" />
                      Your Personalized Diet Plan
                    </CardTitle>
                    <Button
                      onClick={downloadPlan}
                      variant="outline"
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Daily Summary */}
                    <div className="bg-white/20 p-4 rounded-lg">
                      <h3 className="text-white font-bold text-lg mb-4">Daily Summary</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div className="bg-white/10 p-3 rounded">
                          <p className="text-white/80 text-sm">Calories</p>
                          <p className="text-white font-bold text-xl">{dietPlan.calories}</p>
                        </div>
                        <div className="bg-white/10 p-3 rounded">
                          <p className="text-white/80 text-sm">Protein</p>
                          <p className="text-white font-bold text-xl">{dietPlan.nutrition.protein}g</p>
                        </div>
                        <div className="bg-white/10 p-3 rounded">
                          <p className="text-white/80 text-sm">Carbs</p>
                          <p className="text-white font-bold text-xl">{dietPlan.nutrition.carbs}g</p>
                        </div>
                        <div className="bg-white/10 p-3 rounded">
                          <p className="text-white/80 text-sm">Fats</p>
                          <p className="text-white font-bold text-xl">{dietPlan.nutrition.fats}g</p>
                        </div>
                      </div>
                    </div>

                    {/* Meals */}
                    <div className="space-y-4">
                      {dietPlan.meals.map((meal: any, index: number) => (
                        <div key={index} className="bg-white/10 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="text-white font-bold text-lg">{meal.name}</h4>
                            <Badge variant="secondary" className="bg-white/20 text-white">
                              {meal.time}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            {meal.foods.map((food: any, foodIndex: number) => (
                              <div key={foodIndex} className="flex justify-between items-center bg-white/10 p-2 rounded">
                                <div>
                                  <p className="text-white font-medium">{food.name}</p>
                                  <p className="text-white/70 text-sm">{food.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-white font-medium">{food.calories} cal</p>
                                  <p className="text-white/70 text-sm">{food.protein}g protein</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietManagement;