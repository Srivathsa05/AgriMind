import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCopy, FaCheck, FaHistory, FaQuestionCircle } from 'react-icons/fa';
import { GiMoneyStack, GiWheat } from "react-icons/gi";
import { GrCycle } from "react-icons/gr";

// Use environment variable from the parent project, or fallback to your local backend
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

// ==============================================================================
// 1. SUB-COMPONENTS (Consolidated for easy portability)
// ==============================================================================

const Loader = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const RecommendationCard = ({ recommendation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Recommended Crop: ${recommendation.crop}\nEstimated Yield: ${recommendation.yield}\nEstimated Profit: $${recommendation.profit.toFixed(2)}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Recommended Crop</p>
          <h3 className="text-2xl font-bold text-green-500 capitalize">{recommendation.crop}</h3>
        </div>
        <button onClick={handleCopy} className="text-gray-400 hover:text-green-500">
          {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
           <GiWheat className="mx-auto text-3xl text-yellow-500 mb-1"/>
           <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Est. Yield</p>
           <p className="text-lg font-semibold">{recommendation.yield}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
           <GiMoneyStack className="mx-auto text-3xl text-green-500 mb-1"/>
           <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Est. Profit</p>
           <p className="text-lg font-semibold">${recommendation.profit.toFixed(2)}</p>
        </div>
         <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
           <GrCycle className="mx-auto text-3xl text-blue-500 mb-1"/>
           <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Sustainability</p>
           <p className="text-lg font-semibold">{recommendation.sustainability}</p>
        </div>
      </div>
    </div>
  );
};

const HistoryPanel = ({ history }) => {
  if (!history || history.length === 0) return null;
  const formatTimestamp = (isoString) => new Date(isoString).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 flex items-center"><FaHistory className="mr-2"/> Recommendation History</h3>
      <ul className="space-y-3 max-h-60 overflow-y-auto">
        {history.map((item) => (
          <li key={item._id} className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 p-2 rounded-md">
            <span className="font-medium capitalize">{item.recommendations[0]?.crop || 'N/A'}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{formatTimestamp(item.timestamp)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const HowItWorksTooltip = () => (
  <div className="fixed bottom-5 right-5 group">
    <FaQuestionCircle className="text-3xl text-green-500 cursor-pointer" />
    <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      We use a Machine Learning model and your farm data to provide crop recommendations.
      <div className="absolute bottom-[-4px] right-4 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-gray-800"></div>
    </div>
  </div>
);

// Helper component for form inputs to reduce repetition
const FormInput = ({ name, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{name}</label>
    <input
      type={name === 'location' ? 'text' : 'number'}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
      step="any"
      required
    />
  </div>
);

// ==============================================================================
// 2. MAIN COMPONENT
// ==============================================================================

function CropRecommender() {
  const [formData, setFormData] = useState({
    N: '90',
    P: '42',
    K: '43',
    pH: '6.5',
    location: 'Bengaluru',
    temperature: '27.1',
    humidity: '80',
    rainfall: '202.9',
  });
  const [recommendations, setRecommendations] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/history`);
      setHistory(response.data.slice().reverse());
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const response = await axios.post(`${API_URL}/recommend`, {
        N: parseFloat(formData.N),
        P: parseFloat(formData.P),
        K: parseFloat(formData.K),
        pH: parseFloat(formData.pH),
        location: formData.location,
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        rainfall: parseFloat(formData.rainfall),
      });
      setRecommendations(response.data);
      await fetchHistory();
    } catch (err) {
      setError('Failed to get recommendation. Please check the inputs or try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePresetClick = (preset) => {
    setFormData(preset);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-bold text-green-500">Agri-Assist</h1>
        <p className="text-gray-600 dark:text-gray-400">AI-Powered Crop Recommendations</p>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Soil Data Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Soil Data</h3>
                <div className="grid grid-cols-2 gap-4">
                  <FormInput name="N" value={formData.N} onChange={handleInputChange} />
                  <FormInput name="P" value={formData.P} onChange={handleInputChange} />
                  <FormInput name="K" value={formData.K} onChange={handleInputChange} />
                  <FormInput name="pH" value={formData.pH} onChange={handleInputChange} />
                </div>
              </div>

              {/* Location Data Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Location & Weather Data</h3>
                <div className="space-y-4">
                  <FormInput name="location" value={formData.location} onChange={handleInputChange} />
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <FormInput name="temperature" value={formData.temperature} onChange={handleInputChange} />
                    <FormInput name="humidity" value={formData.humidity} onChange={handleInputChange} />
                    <FormInput name="rainfall" value={formData.rainfall} onChange={handleInputChange} />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button type="button" onClick={() => handlePresetClick({ N: '90', P: '45', K: '45', pH: '6.8', location: 'Bengaluru', temperature: '27', humidity: '75', rainfall: '200' })} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Loamy Soil</button>
                  <button type="button" onClick={() => handlePresetClick({ N: '25', P: '20', K: '30', pH: '5.5', location: 'Jaipur', temperature: '32', humidity: '40', rainfall: '65' })} className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">Sandy Soil</button>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">
                  {loading ? 'Analyzing...' : 'Get Recommendation'}
                </button>
              </div>
            </form>
          </div>
          <HistoryPanel history={history} />
        </div>

        {/* Right Column: Recommendations */}
        <div className="lg:col-span-1">
           <h2 className="text-2xl font-semibold mb-4">Top 3 Recommendations</h2>
           {loading && <Loader />}
           {error && <p className="text-red-500 bg-red-100 dark:bg-red-900/50 p-4 rounded-lg">{error}</p>}
           {!loading && recommendations.length === 0 && !error && (
             <div className="text-center py-12 px-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-500 dark:text-gray-400">Your crop recommendations will appear here.</p>
             </div>
           )}
           <div className="space-y-4">
             {recommendations.map((rec, index) => (
               <RecommendationCard key={index} recommendation={rec} />
             ))}
           </div>
        </div>
      </main>

      <HowItWorksTooltip />
    </div>
  );
}

export default CropRecommender;

