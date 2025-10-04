from flask import Flask, request, jsonify, render_template  
from flask_cors import CORS
from ml.crop_recommender.predict import predict_top_crops_from_features
from datetime import datetime
import uuid

# In-memory history storage (replace with DB if needed)
history = []
from .database import init_db, db

import logging

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route("/")
    def home():
        return jsonify({"message": "AgriMind API is running"}), 200

    @app.route("/predict", methods=["POST"])
    def predict():
        data = request.get_json()
        try:
            # Extract features from JSON
            N = float(data.get("N"))
            P = float(data.get("P"))
            K = float(data.get("K"))
            pH = float(data.get("pH"))
            location = data.get("location")
            temperature = float(data.get("temperature"))
            humidity = float(data.get("humidity"))
            rainfall = float(data.get("rainfall"))

            # Create feature array for ML model
            X = [[N, P, K, temperature, rainfall, pH, humidity]]  # Adjust order if needed

            top_crops = predict_top_crops_from_features(X)
            response = [{"crop": crop, "prob": prob} for crop, prob in top_crops]

            # Save to history
            history_entry = {
                "_id": str(uuid.uuid4()),
                "timestamp": datetime.utcnow().isoformat(),
                "recommendations": response
            }
            history.append(history_entry)

            return jsonify(response), 200
        except Exception as e:
            print("Prediction error:", e)
            return jsonify({"error": str(e)}), 400

    @app.route("/history", methods=["GET"])
    def get_history():
        return jsonify(history), 200

    return app
    
    # Configure logging
    logging.basicConfig(level=logging.DEBUG)
    logger = logging.getLogger(__name__)
    
    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///agrimind.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'your-secret-key-here'
    
    # Initialize the database
    db.init_app(app)
    
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
    
    @app.route('/')
    def index():
        return render_template('farmer_auth.html')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found_error(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        db.session.rollback()
        logger.error(f"Internal Server Error: {str(error)}")
        return jsonify({'error': 'An internal error occurred'}), 500
    
    return app
