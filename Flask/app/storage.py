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

def predict_crop(features):
    """
    features: dict with keys matching your ML model inputs
    Example keys: ['temperature', 'humidity', 'rainfall', 'ph', 'nitrogen', ...]
    """
    

    # Convert features dict to list in the order your model expects
    X = [list(features.values())]  # replace with proper preprocessing if needed
    top3 = predict_top_crops_from_features(X)
    # Return just the top suggestion
    return top3[0][0], top3[1][0],top3[2][0] if top3 else "No prediction"
