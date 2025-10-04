# File: Flask/app/database.py

from flask_sqlalchemy import SQLAlchemy

# Initialize SQLAlchemy instance globally
db = SQLAlchemy()

def init_db(app):
    """Initializes the database connection and creates tables."""
    
    # 1. Bind the SQLAlchemy instance to the Flask app
    db.init_app(app)
    
    # 2. Create Database and Tables within the application context
    with app.app_context():
        # Ensure that models.py is imported in __init__.py before this runs!
        db.create_all()
        print("Database tables created/checked.")
        
    return db