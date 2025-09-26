import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import languageBg1 from "@/assets/language-bg-1.jpg";
import languageBg2 from "@/assets/language-bg-2.jpg";
import languageBg3 from "@/assets/language-bg-3.jpg";
import languageBg4 from "@/assets/language-bg-4.jpg";

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgrounds = [languageBg1, languageBg2, languageBg3, languageBg4];
  
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English', color: 'from-blue-500 to-blue-700' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', color: 'from-orange-500 to-red-600' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', color: 'from-purple-500 to-purple-700' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', color: 'from-red-500 to-pink-600' },
    { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', color: 'from-yellow-500 to-orange-600' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', color: 'from-green-500 to-emerald-600' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी', color: 'from-teal-500 to-cyan-600' },
    { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', color: 'from-indigo-500 to-blue-600' },
    { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', color: 'from-pink-500 to-rose-600' },
    { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', color: 'from-emerald-500 to-green-600' },
    { code: 'or', name: 'Oriya', nativeName: 'ଓଡ଼ିଆ', color: 'from-amber-500 to-yellow-600' },
    { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', color: 'from-violet-500 to-purple-600' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('selectedLanguage', languageCode);
    navigate('/user-profile');
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        {backgrounds.map((bg, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentBgIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${bg})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 pt-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl">
              {t('chooseLanguage')}
            </h1>
            <p className="text-xl text-white/90 drop-shadow-lg">
              Select your preferred language for the best experience
            </p>
          </div>
          
          <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-center text-3xl text-white drop-shadow-lg">
                Available Languages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={`relative overflow-hidden rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 bg-gradient-to-br ${language.color} shadow-lg hover:shadow-2xl group`}
                    onClick={() => selectLanguage(language.code)}
                  >
                    <div className="relative z-10">
                      <div className="text-xl font-bold mb-2">{language.name}</div>
                      <div className="text-lg opacity-90">{language.nativeName}</div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full opacity-60 group-hover:opacity-80 transition-opacity" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/20 rounded-full opacity-40 group-hover:opacity-60 transition-opacity" />
                    
                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center mt-8">
            <p className="text-white/80 text-lg drop-shadow-md">
              More languages will be added soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;