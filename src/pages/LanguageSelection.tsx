import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
    { code: 'or', name: 'Oriya', nativeName: 'ଓଡ଼ିଆ' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  ];

  const selectLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/50 to-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('chooseLanguage')}
          </h1>
          <p className="text-xl text-muted-foreground">
            Select your preferred language for the best experience
          </p>
        </div>
        
        <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-primary">
              Available Languages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {languages.map((language) => (
                <Button
                  key={language.code}
                  variant="wellness"
                  className="h-auto p-6 flex-col space-y-2 text-left hover:scale-105 transition-all duration-300"
                  onClick={() => selectLanguage(language.code)}
                >
                  <span className="font-semibold text-lg">{language.name}</span>
                  <span className="text-sm opacity-80 font-medium">{language.nativeName}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-8">
          <p className="text-muted-foreground">
            More languages will be added soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;