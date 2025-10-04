import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { Card } from "@/components/ui/card";

const WeatherWidget = () => {
  const currentWeather = {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    precipitation: 20,
  };

  const forecast = [
    { day: "Mon", temp: 30, icon: Sun, condition: "Sunny" },
    { day: "Tue", temp: 28, icon: Cloud, condition: "Cloudy" },
    { day: "Wed", temp: 26, icon: CloudRain, condition: "Rain" },
    { day: "Thu", temp: 29, icon: Sun, condition: "Sunny" },
    { day: "Fri", temp: 27, icon: Cloud, condition: "Cloudy" },
  ];

  return (
    <Card className="glass-effect shadow-glow p-6 hover:scale-105 transition-smooth">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {currentWeather.temp}°C
            </h3>
            <p className="text-muted-foreground">{currentWeather.condition}</p>
          </div>
          <div className="p-4 rounded-2xl gradient-sky">
            <Cloud className="h-12 w-12 text-white" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
            <Droplets className="h-5 w-5 text-blue-500 mb-1" />
            <span className="text-xs text-muted-foreground">Humidity</span>
            <span className="text-sm font-semibold">{currentWeather.humidity}%</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
            <Wind className="h-5 w-5 text-primary mb-1" />
            <span className="text-xs text-muted-foreground">Wind</span>
            <span className="text-sm font-semibold">{currentWeather.windSpeed} km/h</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-muted/50">
            <CloudRain className="h-5 w-5 text-blue-600 mb-1" />
            <span className="text-xs text-muted-foreground">Rain</span>
            <span className="text-sm font-semibold">{currentWeather.precipitation}%</span>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-semibold mb-3">5-Day Forecast</h4>
        <div className="grid grid-cols-5 gap-2">
          {forecast.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-2 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth"
            >
              <span className="text-xs font-medium mb-2">{day.day}</span>
              <day.icon className="h-6 w-6 text-primary mb-2" />
              <span className="text-sm font-semibold">{day.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default WeatherWidget;
