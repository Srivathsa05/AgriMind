import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CropRecommender from "./components/CropRecommender"; // Corrected import path
import Layout from "./components/LayoutPage";           // Corrected import path
// import WeatherPage from "./pages/WeatherPage"; // No longer needed
import SettingsPage from "./pages/SettingsPage";
import YieldPredictor from "./components/YieldPredictor";   // Corrected import path
import EquipmentPage from "./pages/EquipmentPage";
import CommunityPage from "./pages/CommunityPage";
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
              {/* REMOVED: The /weather route is no longer a separate page */}
              <Route path="settings" element={<SettingsPage />} />
              <Route path="yield-predictor" element={<YieldPredictor />} />
              <Route path="equipment" element={<EquipmentPage />} />
              <Route path="community" element={<CommunityPage />} />

              {/* This is the catch-all route for pages that don't exist */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

