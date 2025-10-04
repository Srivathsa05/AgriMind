import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split

# -----------------------------
# Step 1: Load your dataset
df = pd.read_csv('Flask\ml\yield_predictor\synthetic_crop_yield_dataset_full.csv')

# One-hot encode crops
CROP_COLUMNS = [
    'label_Barley','label_Brinjal','label_Chili','label_Millets','label_Onion',
    'label_Potato','label_Sorghum','label_Soybean','label_Sugarcane','label_Tobacco',
    'label_Tomato','label_Wheat','label_apple','label_banana','label_blackgram',
    'label_chickpea','label_coconut','label_coffee','label_cotton','label_grapes',
    'label_jute','label_kidneybeans','label_lentil','label_maize','label_mango',
    'label_mothbeans','label_mungbean','label_muskmelon','label_orange','label_papaya',
    'label_pigeonpeas','label_pomegranate','label_rice','label_watermelon'
]

df_encoded = pd.get_dummies(df, columns=['label'], dtype=int)

# -----------------------------
# Step 2: Split features and target
X = df_encoded.drop(columns=['yield'])
y = df_encoded['yield']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# -----------------------------
# Step 3: Train Random Forest
rf_model = RandomForestRegressor(n_estimators=200, random_state=42)
rf_model.fit(X_train, y_train)

# -----------------------------
# Step 4: Save the model
joblib.dump(rf_model, 'crop_yield_model.pkl')
print("Model saved as 'crop_yield_model.pkl'")

# -----------------------------
# Step 5: Prediction function with list input
NUMERIC_FEATURES = ['N','P','K','temperature','humidity','ph','rainfall','soil_moisture','sunlight_hours','farm_size']

def predict_yield_from_list(input_list):
    """
    input_list: [N, P, K, temperature, humidity, ph, rainfall, soil_moisture, sunlight_hours, farm_size, crop_name]
    Example:
    [100, 50, 50, 27, 85, 6.5, 180, 40, 7, 5, 'rice']
    """
    if len(input_list) != len(NUMERIC_FEATURES) + 1:
        raise ValueError(f"Input list must have {len(NUMERIC_FEATURES) + 1} elements (10 numeric + 1 crop name)")

    # Split numeric features and crop
    numeric_values = input_list[:-1]
    crop_name = input_list[-1]

    # Build initial dict
    user_input = {feat: val for feat, val in zip(NUMERIC_FEATURES, numeric_values)}
    user_input['label'] = crop_name

    # Load model
    model = joblib.load('crop_yield_model.pkl')

    # Initialize all one-hot crop columns to 0
    for col in CROP_COLUMNS:
        user_input[col] = 0

    # Set the selected crop to 1
    crop_col_name = f'label_{crop_name}'
    if crop_col_name not in CROP_COLUMNS:
        raise ValueError(f"Crop '{crop_name}' not recognized.")
    user_input[crop_col_name] = 1

    # Remove 'label'
    user_input.pop('label')

    # Convert to DataFrame
    df_input = pd.DataFrame([user_input])

    # Predict
    predicted_yield = model.predict(df_input)[0]
    return round(predicted_yield, 3)