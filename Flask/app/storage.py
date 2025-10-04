def dummy_crop_recommendation(soil_type, weather):
    # just a mock function for now
    if soil_type == "loamy" and weather == "moderate":
        return "Wheat"
    elif soil_type == "clay" and weather == "humid":
        return "Rice"
    else:
        return "Maize"
