import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

interface YieldPrediction {
  crop: string;
  predicted_yield: number;
}

const cropOptions = [
  "barley", "brinjal", "chili", "millets", "onion", "potato", "sorghum", "soybean",
  "sugarcane", "tobacco", "tomato", "wheat", "apple", "banana", "blackgram", "chickpea",
  "coconut", "coffee", "cotton", "grapes", "jute", "kidneybeans", "lentil", "maize",
  "mango", "mothbeans", "mungbean", "muskmelon", "orange", "papaya", "pigeonpeas",
  "pomegranate", "rice", "watermelon"
].map(crop => ({ value: crop, label: crop }));

function YieldPredictor() {
  const [formData, setFormData] = useState({
    N: "", P: "", K: "", pH: "",
    temperature: "", humidity: "", rainfall: "",
    soil_moisture: "", sunlight_hours: "", farm_size: "",
  });
  const [selectedCrop, setSelectedCrop] = useState<{ value: string; label: string } | null>(null);
  const [predictions, setPredictions] = useState<YieldPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPredictions([]);

    if (!selectedCrop) {
      setError("Please select a crop.");
      setLoading(false);
      return;
    }

    try {
      const numeric_features = [
        parseFloat(formData.N),
        parseFloat(formData.P),
        parseFloat(formData.K),
        parseFloat(formData.temperature),
        parseFloat(formData.humidity),
        parseFloat(formData.pH),
        parseFloat(formData.rainfall),
        parseFloat(formData.soil_moisture),
        parseFloat(formData.sunlight_hours),
        parseFloat(formData.farm_size),
      ];

      const response = await axios.post(`${API_URL}/predict_yield`, {
        numeric_features,
        crops: [selectedCrop.value]
      });

      const preds = response.data.yield_predictions;
      if (preds && typeof preds === "object") {
        setPredictions(Object.entries(preds).map(([crop, predicted_yield]) => ({
          crop,
          predicted_yield: predicted_yield as number
        })));
      } else {
        setError("Unexpected response format from server.");
      }

    } catch (err) {
      console.error(err);
      setError("❌ Failed to get yield prediction. Please check inputs or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const isDark = document.documentElement.classList.contains("dark");

  // Placeholder mapping
  const placeholders: Record<string, string> = {
    N: "Nitrogen (kg/ha)",
    P: "Phosphorus (kg/ha)",
    K: "Potassium (kg/ha)",
    pH: "Soil pH",
    temperature: "Temperature (°C)",
    humidity: "Humidity (%)",
    rainfall: "Rainfall (mm)",
    soil_moisture: "Soil Moisture (%)",
    sunlight_hours: "Sunlight Hours/day",
    farm_size: "Farm Size (ha)"
  };

  return (
    <div className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-green-600 text-center">Yield Predictor</h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl space-y-6">
        {/* Searchable crop dropdown */}
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">Crop</label>
          <Select
            options={cropOptions}
            value={selectedCrop}
            onChange={setSelectedCrop}
            placeholder="Select crop..."
            classNamePrefix="react-select"
            isSearchable
            styles={{
              control: (base) => ({
                ...base,
                minHeight: 48,
                backgroundColor: isDark ? "#1F2937" : "#F9FAFB",
                borderColor: isDark ? "#374151" : "#D1D5DB",
                color: isDark ? "#F9FAFB" : "#111827",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
                color: isDark ? "#F9FAFB" : "#111827",
                zIndex: 9999
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? isDark ? "#374151" : "#E5E7EB"
                  : "transparent",
                color: isDark ? "#F9FAFB" : "#111827",
              }),
              singleValue: (base) => ({
                ...base,
                color: isDark ? "#F9FAFB" : "#111827"
              }),
              placeholder: (base) => ({
                ...base,
                color: isDark ? "#9CA3AF" : "#6B7280"
              })
            }}
          />
        </div>

        {/* Numeric inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-medium mb-1 capitalize text-gray-700 dark:text-gray-200">{key.replace("_", " ")}</label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                placeholder={placeholders[key]}
                required
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-green-500 focus:outline-none transition"
                type="number"
                step="any"
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400 transition"
        >
          {loading ? "Predicting..." : "Predict Yield"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

      {predictions.length > 0 && (
        <div className="mt-8 flex flex-col items-center space-y-4">
          {predictions.map((pred, idx) => (
            <div key={idx} className="w-full sm:w-2/3 p-6 bg-gray-100 dark:bg-gray-700 rounded-xl shadow hover:shadow-lg transition">
              <p className="mt-2 text-white font-bold text-center text-2xl"><strong>Crop:</strong> {pred.crop}</p>
              <p className="mt-2 text-green-600 font-bold text-center text-2xl">
                <strong>Predicted Yield:</strong> {pred.predicted_yield} tonnes/ha
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YieldPredictor;
