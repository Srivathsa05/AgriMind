import { useState, useEffect } from "react";
import { Sprout, ChevronDown, Sparkles, Tractor, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingToolbar from "@/components/FloatingToolbar";
import ScrollIndicator from "@/components/ScrollIndicator";
import CropCard from "@/components/CropCard";
import SoilMeter from "@/components/SoilMeter";
import MarketTrends from "@/components/MarketTrends";
import { Link } from "react-router-dom";
import WeatherWidget from "@/components/WeatherWidget"; // 1. Re-import WeatherWidget

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const recommendedCrops = [
    { name: "Rice", season: "Kharif Season", yield: "4.5 tons/hectare", profitability: 85, waterNeeds: "High", sunlight: "Full Sun", sustainability: 78, },
    { name: "Wheat", season: "Rabi Season", yield: "3.8 tons/hectare", profitability: 82, waterNeeds: "Moderate", sunlight: "Full Sun", sustainability: 85, },
    { name: "Maize", season: "Kharif Season", yield: "5.2 tons/hectare", profitability: 88, waterNeeds: "Moderate", sunlight: "Full Sun", sustainability: 80, },
    { name: "Cotton", season: "Kharif Season", yield: "2.1 tons/hectare", profitability: 75, waterNeeds: "High", sunlight: "Full Sun", sustainability: 65, },
    { name: "Pulses", season: "Rabi Season", yield: "1.8 tons/hectare", profitability: 90, waterNeeds: "Low", sunlight: "Full Sun", sustainability: 92, },
    { name: "Sugarcane", season: "Year-round", yield: "80 tons/hectare", profitability: 78, waterNeeds: "Very High", sunlight: "Full Sun", sustainability: 60, },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FloatingToolbar />
      <ScrollIndicator />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect mb-6 animate-float">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-white">AI-Powered Agriculture</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            AgriMind
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get personalized crop recommendations based on real-time soil data, weather forecasts, 
            and market trends. Maximize yield, profitability, and sustainability.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevated font-semibold px-8">
              <Link to="/crop-recommender">Crop Recommender</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 shadow-elevated font-semibold px-8">
              <Link to="/yield-predictor">Yield Predictor</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Crop Types", value: "30+", icon: "🌾" },
              { label: "Accuracy", value: "95%", icon: "🎯" },
              { label: "Farmers Helped", value: "10K+", icon: "👨‍🌾" },
            ].map((stat, index) => (
              <div key={index} className="glass-effect rounded-2xl p-6 hover:scale-105 transition-smooth">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white text-sm font-medium" style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById('crops')?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </button>
        </div>
      </section>

      {/* Crop Recommendations Section */}
      <section id="crops" className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
            <Sprout className="h-4 w-4" />
            <span className="text-sm font-medium">Personalized Recommendations</span>
          </div>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Best Crops for Your Farm
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Based on your soil analysis, weather patterns, and current market conditions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCrops.map((crop, index) => (
            <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }} >
              <CropCard {...crop} />
            </div>
          ))}
        </div>
      </section>

      {/* --- WEATHER SECTION ADDED BACK HERE --- */}
      <section id="weather" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Weather & Conditions
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time weather data and 5-day forecast for optimal farming decisions
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <WeatherWidget />
          </div>
        </div>
      </section>

      {/* Soil Analysis Section */}
      <section id="soil" className="py-20 container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Soil Health Monitor
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive soil analysis with real-time nutrient levels and recommendations
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <SoilMeter />
        </div>
      </section>

      {/* Market Trends Section */}
      <section id="market" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Market Intelligence
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Live market prices and demand trends to maximize your profitability
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <MarketTrends />
          </div>
        </div>
      </section>

      {/* Explore More Features Section */}
      <section id="more-features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Explore More Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connect with the community and access the tools you need to succeed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Equipment Rentals Card */}
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Tractor className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Equipment Rentals</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Access a wide range of farming equipment. Rent tractors, plows, and harvesters from verified owners near you.
              </p>
              <Button asChild variant="outline">
                <Link to="/equipment">Browse Equipment</Link>
              </Button>
            </div>

            {/* Community Hub Card */}
            <div className="bg-card border border-border rounded-xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-2">Community Hub</h3>
              <p className="text-muted-foreground mb-6 flex-grow">
                Join our community forum to connect with fellow farmers, share knowledge, and get answers to your questions.
              </p>
              <Button asChild variant="outline">
                <Link to="/community">Join the Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sprout className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">AgriMind</span>
          </div>
          <p className="text-muted-foreground mb-4">
            Empowering farmers with AI-driven insights for sustainable agriculture
          </p>
          <p className="text-sm text-muted-foreground">
            © 2025 AgriMind. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

