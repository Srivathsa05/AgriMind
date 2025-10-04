from model_training import predict_top_crops
import joblib
# Load trained model and label encoder
model = joblib.load("crop_model.pkl")
le = joblib.load("label_encoder.pkl")
sample_input = [50, 30, 20, 22, 60, 7.0, 400]
top3 = predict_top_crops(model, le, sample_input)
print("Top 3 crop suggestions:")
for crop, prob in top3:
    print(f"{crop}: {prob*100}%")