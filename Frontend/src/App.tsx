import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CropRecommender from "./components/CropRecommender"; // Corrected import path
import Layout from "./components/LayoutPage";           // Corrected import path
import WeatherPage from "./pages/WeatherPage";
import SettingsPage from "./pages/SettingsPage";     // 1. Import the new SettingsPage

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* This Layout component now contains your Navbar and wraps all pages */}
          <Route path="/" element={<Layout />}>
            {/* The `index` route is your homepage */}
            <Route index element={<Index />} />
            <Route path="crop-recommender" element={<CropRecommender />} />
            
            {/* Enabled the route for your WeatherPage */}
            <Route path="weather" element={<WeatherPage />} />
            
            {/* 2. Added the route for your new SettingsPage */}
            <Route path="settings" element={<SettingsPage />} />

            {/* This is the catch-all route for pages that don't exist */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

