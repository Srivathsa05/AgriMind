// Frontend/src/App.tsx
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
import YieldPredictor from "./components/YieldPredictor";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* This Layout component now contains your Navbar and wraps all pages */}
            <Route path="/" element={<Layout />}>
              {/* The `index` route is your homepage */}
              <Route index element={<Index />} />
              <Route path="crop-recommender" element={<CropRecommender />} />
              <Route path="weather" element={<WeatherPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="yield-predictor" element={<YieldPredictor />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

