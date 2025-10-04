import WeatherWidget from "@/components/WeatherWidget";

const WeatherPage = () => {
  return (
    // Add padding-top to account for the fixed navbar
    <div className="min-h-screen bg-background pt-16">
      <section id="weather" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Weather & Conditions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real-time weather data and 5-day forecast for optimal farming decisions
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <WeatherWidget />
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeatherPage;
