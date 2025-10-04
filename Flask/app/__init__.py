# File: Flask/app/__init__.py (Modified)

from flask import Flask, jsonify
from .database import init_db 
from .models import User, Query 
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    from .routes import main
    app.register_blueprint(main)

    
    # ... Database Configuration and Initialization (already correct) ...
    
    # ----------------------------------------------------
    # NEW: Test Route for the Root Path ('/')
    # ----------------------------------------------------
    @app.route('/')
    def index():
        # This confirms the server is running and the route is found
        return jsonify({"message": "AgriMind Backend is running!"})
        
    # ----------------------------------------------------
    # Your Example Endpoint (Optional, good to check)
    # ----------------------------------------------------
    @app.route('/test_db')
    def test_db():
        # Make sure the User model is working
        user_count = User.query.count()
        return jsonify({"message": "DB connection successful!", "user_count": user_count})


    # 4. Return the configured app instance
    return app