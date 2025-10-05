# app/__init__.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import uuid
from .services import fetch_weather_data , fetch_soil_data 

import logging

from .database import db
from ml.crop_recommender.predict import predict_top_crops_from_features
from ml.yield_predictor.yield_model_training import predict_yield_for_crops

# -----------------------------
# In-memory history storage
# -----------------------------
history = []

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Configure logging
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger(__name__)

    # Database configuration (single init)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///agrimind.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your-secret-key-here'
    db.init_app(app)

    # -----------------------------
    # Root endpoint
    # -----------------------------
    @app.route("/")
    def home():
        return jsonify({"message": "AgriMind API is running"}), 200

    # -----------------------------
    # Crop recommendation endpoint
    # -----------------------------
    @app.route("/predict", methods=["POST"])
    def predict():
        data = request.get_json() or {}
        try:
            N = float(data.get("N"))
            P = float(data.get("P"))
            K = float(data.get("K"))
            pH = float(data.get("pH"))
            temperature = float(data.get("temperature"))
            humidity = float(data.get("humidity"))
            rainfall = float(data.get("rainfall"))

            # Create feature array for ML model
            X = [[N, P, K, temperature, rainfall, pH, humidity]]  # Adjust order if needed

            try:
                from ml.crop_recommender.predict import predict_top_crops_from_features  # type: ignore
                top_crops = predict_top_crops_from_features(X)
                response = [{"crop": crop, "prob": prob} for crop, prob in top_crops]
            except Exception:
                # Fallback to internal simple recommender
                from .storage import predict_crop
                fallback_recs = predict_crop({
                    "N": N,
                    "P": P,
                    "K": K,
                    "temperature": temperature,
                    "humidity": humidity,
                    "pH": pH,
                    "rainfall": rainfall,
                })
                # Ensure shape is [{crop, prob}]
                if isinstance(fallback_recs, list) and fallback_recs and isinstance(fallback_recs[0], dict):
                    response = fallback_recs
                else:
                    response = [{"crop": str(fallback_recs), "prob": 0.5}]

            history_entry = {
                "_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow().isoformat(),
                "recommendations": response
            }
            history.append(history_entry)
            return jsonify(response), 200
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return jsonify({"error": str(e)}), 400

    # -----------------------------
    # Yield prediction endpoint
    # -----------------------------
    @app.route("/predict_yield", methods=["POST"])
    def predict_yield():
        data = request.get_json()
        try:
            numeric_features = data.get("numeric_features")
            crops = data.get("crops")

            if not numeric_features or not crops:
                return jsonify({"error": "Missing 'numeric_features' or 'crops'"}), 400

            if len(numeric_features) != 10:
                return jsonify({"error": f"'numeric_features' must have 10 values, got {len(numeric_features)}"}), 400

            predictions = predict_yield_for_crops(numeric_features, crops)

            history_entry = {
                "_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow().isoformat(),
                "yield_predictions": predictions
            }
            history.append(history_entry)
            return jsonify({"yield_predictions": predictions}), 200

        except Exception as e:
            logger.error(f"Yield prediction error: {e}")
            return jsonify({"error": str(e)}), 400

    # -----------------------------
    # History endpoint
    # -----------------------------
    @app.route("/history", methods=["GET"])
    def get_history():
        return jsonify(history), 200

    @app.route('/api/weather', methods=['POST'])
    def get_weather():
        data = request.json or {}

        # Accept coordinates; default to Pune, IN if not provided
        latitude = float(data.get('latitude', 18.5204))
        longitude = float(data.get('longitude', 73.8567))

        weather_data = fetch_weather_data(latitude, longitude)

        # Always return whatever we have (real or mock) with 200
        return jsonify(weather_data), 200

    @app.route('/api/soil', methods=['POST'])
    def get_soil():
        data = request.json or {}
        # Accept coordinates; default to Pune, IN if not provided
        latitude = float(data.get('latitude', 18.5204))
        longitude = float(data.get('longitude', 73.8567))
        soil_data = fetch_soil_data(latitude, longitude)
        # Always return whatever we have (real or mock) with 200
        return jsonify(soil_data), 200
    
    # Register blueprints
    from .routes import main
    app.register_blueprint(main)
    
    # Create database tables
    with app.app_context():
        try:
            db.create_all()
            logger.info("Database tables created successfully")
        except Exception as e:
            logger.error(f"Error creating database tables: {str(e)}")
            raise

    return app

# -----------------------------
# Run directly
# -----------------------------
if __name__ == "__main__":
    app = create_app()
    app.run(debug=True, host="127.0.0.1", port=5000)
