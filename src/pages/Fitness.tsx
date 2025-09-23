import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Clock, Flame, Dumbbell } from "lucide-react";
import fitnessOrangeBg from "@/assets/fitness-orange-bg.jpg";

const Fitness = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [exercises, setExercises] = useState<any>(null);

  const generateExercises = () => {
    // Mock exercise plan - in real app, this would call AI API
    const mockExercises = {
      level: level,
      category: category,
      workouts: [
        {
          name: 'Push-ups',
          duration: '3 sets x 15 reps',
          calories: 50,
          difficulty: 'Beginner',
          videoUrl: 'https://youtube.com/watch?v=example1',
          description: 'Classic upper body exercise targeting chest, shoulders, and triceps'
        },
        {
          name: 'Squats',
          duration: '3 sets x 20 reps',
          calories: 80,
          difficulty: 'Beginner',
          videoUrl: 'https://youtube.com/watch?v=example2',
          description: 'Lower body exercise focusing on quadriceps, hamstrings, and glutes'
        },
        {
          name: 'Plank',
          duration: '3 sets x 30 seconds',
          calories: 25,
          difficulty: 'Beginner',
          videoUrl: 'https://youtube.com/watch?v=example3',
          description: 'Core strengthening exercise for abdominal muscles and stability'
        },
        {
          name: 'Jumping Jacks',
          duration: '3 sets x 30 seconds',
          calories: 60,
          difficulty: 'Beginner',
          videoUrl: 'https://youtube.com/watch?v=example4',
          description: 'Full-body cardio exercise to improve cardiovascular fitness'
        }
      ],
      totalCalories: 215,
      estimatedTime: 25
    };
    setExercises(mockExercises);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${fitnessOrangeBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-orange-900/80 via-amber-800/70 to-orange-900/80" />

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
              Fitness & Exercises
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Exercise Selection */}
            <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-2xl text-white flex items-center">
                  <Dumbbell className="h-6 w-6 mr-2" />
                  Workout Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-white font-medium mb-2 block">Fitness Level</label>
                    <Select value={level} onValueChange={setLevel}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-white font-medium mb-2 block">Goal</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger className="bg-white/20 border-white/30 text-white">
                        <SelectValue placeholder="Select goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                        <SelectItem value="strength">Strength</SelectItem>
                        <SelectItem value="flexibility">Flexibility</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/10 p-3 rounded-lg">
                    <h4 className="text-white font-semibold text-sm">Beginner</h4>
                    <p className="text-white/80 text-xs">15-20 min workouts</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <h4 className="text-white font-semibold text-sm">Intermediate</h4>
                    <p className="text-white/80 text-xs">25-35 min workouts</p>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg">
                    <h4 className="text-white font-semibold text-sm">Advanced</h4>
                    <p className="text-white/80 text-xs">40-60 min workouts</p>
                  </div>
                </div>

                <Button
                  onClick={generateExercises}
                  disabled={!level || !category}
                  className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                  size="lg"
                >
                  <Flame className="h-4 w-4 mr-2" />
                  Get Workout Plan
                </Button>
              </CardContent>
            </Card>

            {/* Exercise List */}
            {exercises && (
              <div className="lg:col-span-3 space-y-6">
                {/* Workout Summary */}
                <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">Workout Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-white/20 p-4 rounded-lg">
                        <Clock className="h-8 w-8 text-white mx-auto mb-2" />
                        <p className="text-white font-bold text-xl">{exercises.estimatedTime}</p>
                        <p className="text-white/80 text-sm">Minutes</p>
                      </div>
                      <div className="bg-white/20 p-4 rounded-lg">
                        <Flame className="h-8 w-8 text-white mx-auto mb-2" />
                        <p className="text-white font-bold text-xl">{exercises.totalCalories}</p>
                        <p className="text-white/80 text-sm">Calories</p>
                      </div>
                      <div className="bg-white/20 p-4 rounded-lg">
                        <Dumbbell className="h-8 w-8 text-white mx-auto mb-2" />
                        <p className="text-white font-bold text-xl">{exercises.workouts.length}</p>
                        <p className="text-white/80 text-sm">Exercises</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Exercise Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {exercises.workouts.map((exercise: any, index: number) => (
                    <Card key={index} className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-xl text-white">{exercise.name}</CardTitle>
                          <Badge variant="secondary" className="bg-orange-500/20 text-orange-100">
                            {exercise.difficulty}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-white/90 text-sm">{exercise.description}</p>
                        
                        <div className="flex justify-between items-center bg-white/20 p-3 rounded-lg">
                          <div>
                            <p className="text-white font-medium">{exercise.duration}</p>
                            <p className="text-white/70 text-sm">{exercise.calories} calories</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                            onClick={() => window.open(exercise.videoUrl, '_blank')}
                          >
                            <Play className="h-4 w-4 mr-2" />
                            Watch Demo
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fitness;