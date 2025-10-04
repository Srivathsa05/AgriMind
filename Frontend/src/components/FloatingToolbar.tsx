import { Sprout, CloudRain, TrendingUp, BookOpen, Settings, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const FloatingToolbar = () => {
  const tools = [
    { icon: Sprout, label: "Crop Recommendations", action: () => document.getElementById('crops')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: CloudRain, label: "Weather Forecast", action: () => document.getElementById('weather')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: TrendingUp, label: "Market Trends", action: () => document.getElementById('market')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: Map, label: "Soil Analysis", action: () => document.getElementById('soil')?.scrollIntoView({ behavior: 'smooth' }) },
    { icon: BookOpen, label: "Resources", action: () => {} },
    { icon: Settings, label: "Settings", action: () => {} },
  ];

  return (
    <TooltipProvider>
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        <div className="glass-effect rounded-2xl p-2 shadow-elevated animate-slide-up">
          {tools.map((tool, index) => (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={tool.action}
                  className="w-12 h-12 hover:bg-primary/10 hover:text-primary transition-smooth"
                >
                  <tool.icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-card border-border">
                <p>{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default FloatingToolbar;
