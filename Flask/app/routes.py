# Flask/app/routes.py
from flask import Blueprint, request, jsonify, render_template
from .models import db, User
from werkzeug.security import generate_password_hash, check_password_hash
import logging

main = Blueprint('main', __name__)
logger = logging.getLogger(__name__)

@main.route('/farmer/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        
        logger.debug(f"Registration attempt: {email}")
        
        if not all([name, email, password]):
            return jsonify({'error': 'Missing required fields'}), 400
        
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 400
        
        try:
            # Create user with hashed password
            new_user = User(
                name=name,
                email=email
            )
            new_user.set_password(password)  # This will hash the password
            db.session.add(new_user)
            db.session.commit()
            
            logger.info(f"User registered successfully: {email}")
            return jsonify({
                'message': 'Registration successful! Please login.',
                'status': 'success'
            }), 201
            
        except Exception as e:
            db.session.rollback()
            logger.error(f"Database error during registration: {str(e)}")
            return jsonify({'error': 'Failed to register user'}), 500
            
    except Exception as e:
        logger.error(f"Unexpected error in register: {str(e)}")
        return jsonify({'error': 'An unexpected error occurred'}), 500

@main.route('/farmer/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        email = data.get('email')
        password = data.get('password')
        
        logger.debug(f"Login attempt: {email}")
        
        if not all([email, password]):
            return jsonify({'error': 'Missing email or password'}), 400
        
        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password):  # This verifies the password
            logger.info(f"User logged in successfully: {email}")
            return jsonify({
                'message': 'Login successful!', 
                'redirect': '/dashboard',
                'status': 'success'
            }), 200
        else:
            logger.warning(f"Failed login attempt for email: {email}")
            return jsonify({'error': 'Invalid email or password'}), 401
            
    except Exception as e:
        logger.error(f"Error in login: {str(e)}")
        return jsonify({'error': 'An error occurred during login'}), 500

@main.route('/dashboard')
def dashboard():
    return "Welcome to the dashboard!"

# Lightweight endpoints used by the frontend auth flow
@main.route('/farmer/check-auth', methods=['GET'])
def check_auth():
    # TODO: Hook up to real session/token logic. For now, return 200 OK
    return jsonify({'status': 'ok'}), 200

@main.route('/farmer/logout', methods=['POST'])
def logout():
    # TODO: Clear session/token when real auth is added
    return jsonify({'message': 'Logged out successfully'}), 200