import os
import sys

# Add ML folder to sys.path so we can import predict.py
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_PATH = os.path.join(BASE_DIR, "ml")
sys.path.append(ML_PATH)

try:
    from predict import predict_top_crops_from_features
except Exception as e:
    print(f"Failed to import ML functions: {e}")
    predict_top_crops_from_features = None

def dummy_crop_recommendation(soil_type: str, weather: str) -> str:
    """Simple placeholder recommender to keep the API working without ML.
    Returns a crop name based on basic heuristics.
    """
    soil = (soil_type or '').lower()
    w = (weather or '').lower()
    if 'loam' in soil and 'moderate' in w:
        return 'Wheat'
    if 'clay' in soil and 'rain' in w:
        return 'Rice'
    if 'sandy' in soil:
        return 'Millet'
    return 'Maize'

def predict_crop(features):
    """
    features: dict with keys matching your ML model inputs
    Example keys: ['temperature', 'humidity', 'rainfall', 'ph', 'nitrogen', ...]
    """
    

    # Convert features dict to list in the order your model expects
    if predict_top_crops_from_features is None:
        # Fallback to dummy logic if ML isn't available
        soil = features.get('soil_type', 'loamy')
        weather = features.get('weather', 'moderate')
        return dummy_crop_recommendation(soil, weather)

    # Convert features dict to list in a stable order if needed
    X = [list(features.values())]
    top3 = predict_top_crops_from_features(X)
    if not top3:
        return "No prediction"
    # Return top-1 crop (string)
    return top3[0][0]
