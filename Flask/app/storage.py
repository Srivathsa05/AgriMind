import os
import sys

# Add ML folder to sys.path so we can import predict.py
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ML_PATH = os.path.join(BASE_DIR, "ml")
sys.path.append(ML_PATH)

try:
    from ml.crop_recommender.predict import predict_top_crops_from_features
except Exception as e:
    print(f"Failed to import ML functions: {e}")
    predict_top_crops_from_features = None


def predict_crop(features: dict):
    """
    features: dict with keys matching your ML model inputs
    Expected keys: N, P, K, temperature, humidity, pH, rainfall
    """

    X = [[
        float(features.get("N", 0)),
        float(features.get("P", 0)),
        float(features.get("K", 0)),
        float(features.get("temperature", 0)),
        float(features.get("humidity", 0)),
        float(features.get("pH", 7)),
        float(features.get("rainfall", 0)),
    ]]

    if predict_top_crops_from_features is None:
        return [{"crop": "No model", "prob": 0.0}]

    top3 = predict_top_crops_from_features(X)

    # Case 1: function returns tuples (crop, prob)
    if isinstance(top3[0], (list, tuple)) and len(top3[0]) == 2:
        recommendations = [{"crop": crop, "prob": float(prob)} for crop, prob in top3[:3]]

    # Case 2: function returns just crop names
    else:
        recommendations = [{"crop": crop, "prob": 1.0} for crop in top3[:3]]

    return recommendations
