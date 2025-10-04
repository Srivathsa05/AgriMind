from flask import Blueprint, render_template, request, jsonify
from .storage import predict_crop

main = Blueprint("main", __name__)

@main.route("/")
def home():
    return render_template("index.html")

@main.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.get_json()
        prediction = predict_crop(data)
        return jsonify({"recommended_crop": prediction})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
