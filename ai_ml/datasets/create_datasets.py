import pandas as pd
import numpy as np

# Create diabetes dataset
np.random.seed(42)
n_samples = 200
diabetes_data = pd.DataFrame({
    'Pregnancies': np.random.randint(0, 10, n_samples),
    'Glucose': np.random.randint(70, 200, n_samples),
    'BloodPressure': np.random.randint(60, 130, n_samples),
    'SkinThickness': np.random.randint(0, 100, n_samples),
    'Insulin': np.random.randint(0, 850, n_samples),
    'BMI': np.random.uniform(18, 40, n_samples).round(1),
    'DiabetesPedigreeFunction': np.random.uniform(0.08, 2.5, n_samples).round(3),
    'Age': np.random.randint(21, 81, n_samples),
    'Outcome': np.random.randint(0, 2, n_samples)
})
diabetes_data.to_csv('diabetes.csv', index=False)
print(f"Created diabetes.csv with {len(diabetes_data)} samples")

# Create heart disease dataset
heart_data = pd.DataFrame({
    'age': np.random.randint(29, 78, n_samples),
    'sex': np.random.randint(0, 2, n_samples),
    'cp': np.random.randint(0, 4, n_samples),
    'trestbps': np.random.randint(90, 200, n_samples),
    'chol': np.random.randint(126, 565, n_samples),
    'fbs': np.random.randint(0, 2, n_samples),
    'thalach': np.random.randint(71, 202, n_samples),
    'target': np.random.randint(0, 2, n_samples)
})
heart_data.to_csv('heart.csv', index=False)
print(f"Created heart.csv with {len(heart_data)} samples")
