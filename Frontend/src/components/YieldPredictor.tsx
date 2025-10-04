import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

interface YieldPrediction {
  crop: string;
  predicted_yield: number;
}

const crops = ["Wheat", "Rice", "Maize", "Barley", "Soybean", "Cotton"]; // Example crops

function YieldPredictor() {
  const [formData, setFormData] = useState({
    crop: "",
    N: "", P: "", K: "", pH: "",
    temperature: "", humidity: "", rainfall: "",
    soil_moisture: "", sunlight_hours: "", farm_size: "",
  });
  const [predictions, setPredictions] = useState<YieldPrediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Top padding for navbar
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPredictions([]);

    if (!formData.crop) {
      setError("Please select a crop.");
      setLoading(false);
      return;
    }

    try {
      // Build numeric_features array in correct order
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
        crops: [formData.crop.toLowerCase()]
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

  return (
    <div className="pt-20 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-500 text-center">Yield Predictor</h2>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Crop</label>
          <select
            name="crop"
            value={formData.crop}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700"
            required
          >
            <option value="">Select crop</option>
            {crops.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input name="N" placeholder="N" value={formData.N} onChange={handleChange} required className="input-field"/>
          <input name="P" placeholder="P" value={formData.P} onChange={handleChange} required className="input-field"/>
          <input name="K" placeholder="K" value={formData.K} onChange={handleChange} required className="input-field"/>
          <input name="pH" placeholder="pH" value={formData.pH} onChange={handleChange} required className="input-field"/>
          <input name="temperature" placeholder="Temperature" value={formData.temperature} onChange={handleChange} required className="input-field"/>
          <input name="humidity" placeholder="Humidity" value={formData.humidity} onChange={handleChange} required className="input-field"/>
          <input name="rainfall" placeholder="Rainfall" value={formData.rainfall} onChange={handleChange} required className="input-field"/>
          <input name="soil_moisture" placeholder="Soil Moisture" value={formData.soil_moisture} onChange={handleChange} required className="input-field"/>
          <input name="sunlight_hours" placeholder="Sunlight Hours" value={formData.sunlight_hours} onChange={handleChange} required className="input-field"/>
          <input name="farm_size" placeholder="Farm Size (ha)" value={formData.farm_size} onChange={handleChange} required className="input-field"/>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-400"
        >
          {loading ? "Predicting..." : "Predict Yield"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {predictions.length > 0 && (
        <div className="mt-6 space-y-4">
          {predictions.map((pred, idx) => (
            <div key={idx} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow">
              <p><strong>Crop:</strong> {pred.crop}</p>
              <p><strong>Predicted Yield:</strong> {pred.predicted_yield} tonnes/ha</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default YieldPredictor;
