
from app import create_app

if __name__ == '__main__':
    # Creates and configures the Flask app instance
    app = create_app() 
    
    # Runs the application on the local server
    app.run(debug=True)