import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, Apple, Dumbbell, Brain, MessageCircle } from "lucide-react";
import symptomRedBg from "@/assets/symptom-red-bg.jpg";
import dietColorfulBg from "@/assets/diet-colorful-bg.jpg";
import fitnessOrangeBg from "@/assets/fitness-orange-bg.jpg";
import mentalPeacefulBg from "@/assets/mental-peaceful-bg.jpg";

const Dashboard = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const healthModules = [
    {
      id: 'symptom-checker',
      title: t('symptomChecker'),
      description: t('checkSymptoms'),
      icon: Stethoscope,
      image: symptomRedBg,
      path: '/symptom-checker',
      gradient: 'from-red-600 to-red-800',
    },
    {
      id: 'diet-management',
      title: t('dietManagement'),
      description: t('manageDiet'),
      icon: Apple,
      image: dietColorfulBg,
      path: '/diet-management',
      gradient: 'from-green-500 to-orange-600',
    },
    {
      id: 'fitness',
      title: t('fitness'),
      description: t('stayFit'),
      icon: Dumbbell,
      image: fitnessOrangeBg,
      path: '/fitness',
      gradient: 'from-orange-500 to-amber-600',
    },
    {
      id: 'mental-health',
      title: t('mentalHealth'),
      description: t('mentalWellness'),
      icon: Brain,
      image: mentalPeacefulBg,
      path: '/mental-health',
      gradient: 'from-green-600 to-blue-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                {t('dashboard')}
              </h1>
              <p className="text-muted-foreground mt-1">
                Your comprehensive health companion
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/language-selection')}
              className="hover:scale-105 transition-transform duration-300"
            >
              Change Language
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {healthModules.map((module) => {
            const IconComponent = module.icon;
            return (
              <Card
                key={module.id}
                className="group relative overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border-border/50 bg-card/80 backdrop-blur-sm"
                onClick={() => navigate(module.path)}
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${module.image})` }}
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-85 group-hover:opacity-90 transition-opacity duration-300`} />
                
                {/* Content */}
                <div className="relative z-10 text-white">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-white drop-shadow-lg">
                        {module.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-white/90 text-lg mb-6 drop-shadow-md">
                      {module.description}
                    </p>
                    
                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full group-hover:scale-105 transition-transform duration-300 bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-60" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-xl opacity-40" />
              </Card>
            );
          })}
        </div>
        
        {/* Chat Assistant */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            variant="health"
            className="rounded-full p-4 shadow-2xl hover:shadow-[var(--shadow-glow)] animate-pulse"
            onClick={() => {/* TODO: Open chat */}}
          >
            <MessageCircle className="h-6 w-6" />
            <span className="ml-2 hidden sm:inline">{t('chatWithAI')}</span>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;