from flask import Blueprint, render_template, request, jsonify
from .storage import dummy_crop_recommendation

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return render_template("index.html")

@main.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()
        soil_type = data.get("soil_type", "loamy")
        weather = data.get("weather", "moderate")

        recommendation = dummy_crop_recommendation(soil_type, weather)

        return jsonify({"recommended_crop": recommendation})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
