import os
import sys
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import classification_report, f1_score
import mlflow
import mlflow.sklearn

# Ensure the backend directory is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from app.core.config import settings

def main():
    dataset_path = os.path.join(os.path.dirname(__file__), "../../dataset/bolivia_fakenews_dataset.csv")
    if settings.TRAINING_DATASET_PATH and os.path.exists(settings.TRAINING_DATASET_PATH):
        dataset_path = settings.TRAINING_DATASET_PATH
        
    if not os.path.exists(dataset_path):
        print(f"Dataset not found at {dataset_path}")
        sys.exit(1)
        
    print(f"Loading dataset from {dataset_path}")
    df = pd.read_csv(dataset_path)
    
    if "text" not in df.columns or "label" not in df.columns:
        print("Dataset must contain 'text' and 'label' columns")
        sys.exit(1)

    df = df.dropna(subset=["text", "label"])
    
    X = df["text"]
    y = df["label"]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    
    pipeline = Pipeline([
        ('tfidf', TfidfVectorizer(max_features=10000)),
        ('clf', LogisticRegression(random_state=42, class_weight='balanced'))
    ])
    
    print("Training model...")
    pipeline.fit(X_train, y_train)
    
    y_pred = pipeline.predict(X_test)
    
    # Calculate weighted f1-score as requested by the user
    f1 = f1_score(y_test, y_pred, average='weighted')
    print(f"Weighted F1-Score: {f1:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    print(f"Connecting to MLflow at {settings.MLFLOW_TRACKING_URI}")
    mlflow.set_tracking_uri(settings.MLFLOW_TRACKING_URI)
    mlflow.set_experiment(settings.MLFLOW_EXPERIMENT_NAME)
    
    with mlflow.start_run():
        mlflow.log_param("model_type", "LogisticRegression")
        mlflow.log_param("tfidf_max_features", 10000)
        mlflow.log_metric("f1_score", f1)
        
        print("Logging model to MLflow...")
        model_info = mlflow.sklearn.log_model(
            sk_model=pipeline,
            artifact_path="model",
            registered_model_name="fake_news_classifier"
        )
        
        client = mlflow.MlflowClient()
        model_version = model_info.registered_model_version
        if model_version:
            client.set_registered_model_alias(
                name="fake_news_classifier",
                alias="champion",
                version=model_version
            )
            print(f"Model registered as 'fake_news_classifier' version {model_version} and aliased as 'champion'.")

if __name__ == "__main__":
    main()
