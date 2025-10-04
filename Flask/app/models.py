# File: Flask/app/models.py

# Note: We use relative import here because this file is INSIDE the 'app' package
from .database import db 
from datetime import datetime

# -----------------
# 1. Users Table
# -----------------
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(100), nullable=True)
    preferred_language = db.Column(db.String(10), default='en')

    # Relationship to Query table: A User can have many Queries
    queries = db.relationship('Query', backref='user', lazy=True)

    def __repr__(self):
        return f'<User {self.name}>'

# -----------------
# 2. Queries Table
# -----------------
class Query(db.Model):
    __tablename__ = 'queries'
    id = db.Column(db.Integer, primary_key=True)
    
    # Foreign Key linking to the User table
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Data fields as JSON strings or simple text
    soil_data = db.Column(db.Text, nullable=True)
    weather_data = db.Column(db.Text, nullable=True)
    
    # Recommendations will store the output (e.g., JSON string of the top 3 crops)
    recommendations = db.Column(db.Text, nullable=True)
    
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Query {self.id} for User {self.user_id}>'