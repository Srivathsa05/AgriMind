from yield_model_training import predict_yield_from_list

# Example usage
example_input = [100, 50, 50, 27, 85, 6.5, 180, 40, 7, 5, 'rice']
print("Predicted yield (tonnes/ha):", predict_yield_from_list(example_input))

example_maize = [120, 60, 55, 25, 70, 6.5, 150, 38, 8, 7, 'maize']
print("Predicted yield (tonnes/ha):", predict_yield_from_list(example_maize))