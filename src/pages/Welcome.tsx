import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import welcomeBg from "@/assets/welcome-bg.jpg";

const Welcome = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${welcomeBg})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/50 to-accent/60 backdrop-blur-[1px]" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-2xl">
          {t('welcome')}
        </h1>
        
        <div className="mb-12">
          <p className="text-xl md:text-2xl text-white/90 font-medium drop-shadow-lg">
            Your AI-Powered Health Companion for Better Living
          </p>
        </div>
        
        <Button 
          variant="hero"
          size="lg"
          onClick={() => navigate('/language-selection')}
          className="text-lg px-8 py-6 text-white font-semibold shadow-2xl"
        >
          {t('getStarted')}
        </Button>
      </div>
      
      {/* Decorative health elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-20 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse delay-500" />
    </div>
  );
};

export default Welcome;