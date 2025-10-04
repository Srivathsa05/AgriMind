# app/__init__.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import uuid
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

    # Database configuration
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
        data = request.get_json()
        try:
            N = float(data.get("N"))
            P = float(data.get("P"))
            K = float(data.get("K"))
            pH = float(data.get("pH"))
            temperature = float(data.get("temperature"))
            humidity = float(data.get("humidity"))
            rainfall = float(data.get("rainfall"))

            X = [[N, P, K, temperature, rainfall, pH, humidity]]
            top_crops = predict_top_crops_from_features(X)
            response = [{"crop": crop, "prob": prob} for crop, prob in top_crops]

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

    # -----------------------------
    # Error handlers
    # -----------------------------
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({'error': 'Not found'}), 404

    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        logger.error(f"Internal Server Error: {error}")
        return jsonify({'error': 'An internal error occurred'}), 500

    # -----------------------------
    # Create DB tables
    # -----------------------------
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
