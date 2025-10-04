import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TestTube, Leaf, Droplets } from "lucide-react";

const SoilMeter = () => {
  const soilData = [
    { label: "pH Level", value: 6.5, optimal: "6.0-7.0", color: "text-green-500", progress: 75 },
    { label: "Nitrogen (N)", value: 85, optimal: "80-100", color: "text-blue-500", progress: 85 },
    { label: "Phosphorus (P)", value: 72, optimal: "60-80", color: "text-purple-500", progress: 90 },
    { label: "Potassium (K)", value: 68, optimal: "60-80", color: "text-orange-500", progress: 80 },
    { label: "Moisture", value: 55, optimal: "50-70", color: "text-cyan-500", progress: 60 },
    { label: "Organic Matter", value: 3.2, optimal: "3-5%", color: "text-emerald-500", progress: 70 },
  ];

  return (
    <Card className="glass-effect shadow-glow p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl gradient-earth text-white">
          <TestTube className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Soil Health Analysis</h3>
          <p className="text-sm text-muted-foreground">Real-time soil composition data</p>
        </div>
      </div>

      <div className="space-y-4">
        {soilData.map((item, index) => (
          <div
            key={index}
            className="group p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${item.color}`}>{item.label}</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-foreground">{item.value}</span>
                <span className="text-xs text-muted-foreground ml-2">({item.optimal})</span>
              </div>
            </div>
            <Progress value={item.progress} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <Leaf className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-foreground mb-1">Overall Health: Excellent</h4>
            <p className="text-sm text-muted-foreground">
              Your soil composition is optimal for most crop types. Consider adding organic fertilizers for enhanced sustainability.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SoilMeter;
