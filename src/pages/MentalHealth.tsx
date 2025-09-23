import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Music, Palette, Heart, MessageCircle, Headphones, Star } from "lucide-react";
import mentalPeacefulBg from "@/assets/mental-peaceful-bg.jpg";

const MentalHealth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mood, setMood] = useState('');
  const [sharing, setSharing] = useState('');
  const [showQuote, setShowQuote] = useState(false);

  const activities = [
    {
      title: 'Art Therapy',
      icon: Palette,
      description: 'Express yourself through creative painting',
      color: 'bg-purple-500',
      links: [
        { name: 'Digital Painting App', url: 'https://example.com/paint' },
        { name: 'Mandala Coloring', url: 'https://example.com/mandala' },
        { name: 'Art Therapy Guide', url: 'https://example.com/art-guide' }
      ]
    },
    {
      title: 'Relaxing Music',
      icon: Music,
      description: 'Soothing sounds for peace and tranquility',
      color: 'bg-blue-500',
      links: [
        { name: 'Nature Sounds', url: 'https://youtube.com/watch?v=example1' },
        { name: 'Meditation Music', url: 'https://youtube.com/watch?v=example2' },
        { name: 'Classical Relaxation', url: 'https://youtube.com/watch?v=example3' }
      ]
    },
    {
      title: 'Guided Meditation',
      icon: Headphones,
      description: 'Mindfulness exercises and breathing techniques',
      color: 'bg-green-500',
      links: [
        { name: '5-Minute Meditation', url: 'https://youtube.com/watch?v=example4' },
        { name: 'Deep Breathing Exercise', url: 'https://youtube.com/watch?v=example5' },
        { name: 'Sleep Meditation', url: 'https://youtube.com/watch?v=example6' }
      ]
    }
  ];

  const motivationalQuotes = [
    "Your mental health is a priority. Your happiness is essential. Your self-care is a necessity.",
    "It's okay to not be okay. What's important is that you don't give up.",
    "Healing takes time, and asking for help is a courageous step.",
    "You are stronger than you think and braver than you feel.",
    "Every small step forward is progress worth celebrating."
  ];

  const shareProblem = () => {
    if (sharing.trim()) {
      // In real app, this would be stored anonymously in database
      alert('Your message has been shared anonymously. The community will provide support.');
      setSharing('');
    }
  };

  const getRandomQuote = () => {
    const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
    setShowQuote(true);
    return randomQuote;
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${mentalPeacefulBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/60 via-blue-800/50 to-purple-900/60" />

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
              Mental Health & Wellness
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Wellness Activities */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Heart className="h-6 w-6 mr-2" />
                    Wellness Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {activities.map((activity, index) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={index} className="bg-white/10 p-6 rounded-lg">
                          <div className={`w-12 h-12 ${activity.color} rounded-full flex items-center justify-center mb-4`}>
                            <IconComponent className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-white font-bold text-lg mb-2">{activity.title}</h3>
                          <p className="text-white/80 text-sm mb-4">{activity.description}</p>
                          <div className="space-y-2">
                            {activity.links.map((link, linkIndex) => (
                              <Button
                                key={linkIndex}
                                variant="outline"
                                size="sm"
                                className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30 text-xs"
                                onClick={() => window.open(link.url, '_blank')}
                              >
                                {link.name}
                              </Button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Problem Sharing */}
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <MessageCircle className="h-6 w-6 mr-2" />
                    Anonymous Sharing Wall
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white/90">
                    Share your feelings anonymously. Our community is here to support you.
                  </p>
                  <Textarea
                    placeholder="Share what's on your mind... (Anonymous)"
                    value={sharing}
                    onChange={(e) => setSharing(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70 min-h-24"
                  />
                  <div className="flex gap-4">
                    <Button
                      onClick={shareProblem}
                      disabled={!sharing.trim()}
                      className="flex-1 bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                    >
                      Share Anonymously
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-white/20 border-white/30 text-white hover:bg-white/30"
                      onClick={() => alert('Connecting to helpline: 1800-XXX-XXXX')}
                    >
                      Get Professional Help
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Motivational Section */}
            <div className="space-y-6">
              {/* Daily Quote */}
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-white flex items-center">
                    <Star className="h-5 w-5 mr-2" />
                    Daily Motivation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    onClick={() => setShowQuote(true)}
                    className="w-full bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                  >
                    Get Inspired
                  </Button>
                  {showQuote && (
                    <div className="bg-white/20 p-4 rounded-lg">
                      <p className="text-white italic">"{getRandomQuote()}"</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="backdrop-blur-lg bg-white/10 border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-green-500/30 hover:bg-green-500/40 border border-green-300/30 text-white">
                    5-Minute Breathing
                  </Button>
                  <Button className="w-full bg-blue-500/30 hover:bg-blue-500/40 border border-blue-300/30 text-white">
                    Gratitude Journal
                  </Button>
                  <Button className="w-full bg-purple-500/30 hover:bg-purple-500/40 border border-purple-300/30 text-white">
                    Mood Tracker
                  </Button>
                  <Button className="w-full bg-orange-500/30 hover:bg-orange-500/40 border border-orange-300/30 text-white">
                    Sleep Stories
                  </Button>
                </CardContent>
              </Card>

              {/* Emergency Support */}
              <Card className="backdrop-blur-lg bg-red-500/20 border-red-300/30 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-xl text-red-100">Need Immediate Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-red-200 text-sm">
                    If you're having thoughts of self-harm, please reach out immediately.
                  </p>
                  <Button className="w-full bg-red-500/30 hover:bg-red-500/40 border border-red-300/30 text-white">
                    Crisis Helpline
                  </Button>
                  <Button variant="outline" className="w-full bg-white/20 border-white/30 text-white hover:bg-white/30">
                    Find Local Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentalHealth;