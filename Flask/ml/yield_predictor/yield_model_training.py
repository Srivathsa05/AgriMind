import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# -----------------------------
# Step 1: Load your dataset
df = pd.read_csv('Flask\ml\yield_predictor\synthetic_crop_yield_dataset_full.csv')

# Ensure all crop labels are lowercased
df['label'] = df['label'].str.lower()

# -----------------------------
# Step 2: One-hot encode crops
CROP_COLUMNS = [f'label_{crop}' for crop in df['label'].unique()]
df_encoded = pd.get_dummies(df, columns=['label'], dtype=int)

# -----------------------------
# Step 3: Split features and target
X = df_encoded.drop(columns=['yield'])
y = df_encoded['yield']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Save the feature order for future predictions
FEATURE_COLUMNS = X_train.columns

# -----------------------------
# Step 4: Train Random Forest Regressor
rf_model = RandomForestRegressor(n_estimators=200, random_state=42)
rf_model.fit(X_train, y_train)

# -----------------------------
# Step 5: Save model and feature order
joblib.dump(rf_model, 'crop_yield_model.pkl')
joblib.dump(FEATURE_COLUMNS, 'feature_columns.pkl')
print("Model saved as 'crop_yield_model.pkl'")
print("Feature columns saved as 'feature_columns.pkl'")

# -----------------------------
# Step 6: Prediction function for multiple crops
NUMERIC_FEATURES = ['N','P','K','temperature','humidity','ph','rainfall','soil_moisture','sunlight_hours','farm_size']

def predict_yield_for_crops(numeric_input, crops):
    """
    numeric_input: list of 10 numeric features [N, P, K, temperature, humidity, ph, rainfall, soil_moisture, sunlight_hours, farm_size]
    crops: list of crop names in lowercase, e.g., ['rice', 'wheat', 'maize']
    
    Returns a dict {crop_name: predicted_yield}
    """
    if len(numeric_input) != len(NUMERIC_FEATURES):
        raise ValueError(f"Numeric input must have {len(NUMERIC_FEATURES)} elements")
    
    # Load model and feature order
    model = joblib.load('crop_yield_model.pkl')
    feature_columns = joblib.load('feature_columns.pkl')
    
    results = {}
    
    for crop_name in crops:
        crop_name = crop_name.lower()
        user_input = {feat: val for feat, val in zip(NUMERIC_FEATURES, numeric_input)}

        # Initialize all one-hot crop columns to 0
        for col in CROP_COLUMNS:
            user_input[col] = 0

        # Set the selected crop to 1
        crop_col_name = f'label_{crop_name}'
        if crop_col_name not in CROP_COLUMNS:
            raise ValueError(f"Crop '{crop_name}' not recognized.")
        user_input[crop_col_name] = 1

        # Convert to DataFrame
        df_input = pd.DataFrame([user_input])

        # Reorder columns to match training
        df_input = df_input[feature_columns]

        # Predict
        predicted_yield = model.predict(df_input)[0]
        results[crop_name] = round(predicted_yield, 3)

    return results