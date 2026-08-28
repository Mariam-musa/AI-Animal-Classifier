"""
Minimal API layer for the AI Animal Classifier.

This file is NEW and additive: it does not modify, replace, or import from
src/predict.py, src/train.py, or src/preprocess.py. It reuses the exact same
preprocessing steps and model documented in this project (RGB, resize to
224x224, normalize to [0, 1], MobileNetV2 transfer-learning model) so its
predictions are consistent with the existing pipeline. If you'd rather keep
one single source of truth, feel free to move the `preprocess_image` /
`predict` logic below into src/ and import it from here instead.

Run it with:
    pip install flask flask-cors tensorflow pillow google-genai
    set GEMINI_API_KEY=your-key-here      (Windows: set, macOS/Linux: export)
    python backend/app.py

Endpoint contract expected by the React frontend (src/lib/classify.js):

    POST /api/classify
    Content-Type: multipart/form-data
    field "image": the uploaded file

    200 response:
    {
      "label": "dog" | "cat",
      "confidence": 0.9995,        # float between 0 and 1
      "description": "Golden retrievers are..."
    }

    4xx/5xx response:
    { "error": "human readable message" }
"""

import io
import os

from dotenv import load_dotenv
load_dotenv()

from flask import Flask, jsonify, request
from flask_cors import CORS
from PIL import Image
import numpy as np
import tensorflow as tf

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Path to the trained .keras model produced by src/train.py.
# Override with the MODEL_PATH environment variable if it lives elsewhere.
MODEL_PATH = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    "..",
    "model",
    "animal_classifier.keras",
)

IMAGE_SIZE = (224, 224)
CLASS_NAMES = ["cat", "dog"]  # index 0 -> cat, index 1 -> dog (matches preprocess.py labels)

# IMPORTANT: do not hardcode API keys in source. Set this in your shell/
# environment or a local .env file that is excluded from version control.
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

app = Flask(__name__)
CORS(app)  # allow the Vite dev server (different origin) to call this API

_model = None
_gemini_client = None


def get_model():
    global _model
    if _model is None:
        _model = tf.keras.models.load_model(MODEL_PATH)
    return _model


def get_gemini_client():
    global _gemini_client
    if _gemini_client is None and GEMINI_API_KEY:
        from google import genai

        _gemini_client = genai.Client(api_key=GEMINI_API_KEY)
    return _gemini_client


def preprocess_image(file_bytes):
    """Same steps as the existing pipeline: RGB, resize 224x224, normalize."""
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    image = image.resize(IMAGE_SIZE)
    array = np.array(image) / 255.0
    return np.expand_dims(array, axis=0)


def generate_description(label, confidence):
    client = get_gemini_client()
    if client is None:
        # No Gemini key configured — degrade gracefully instead of failing
        # the whole request, so the UI still shows a prediction.
        return (
            f"This image was classified as a {label} with "
            f"{confidence * 100:.2f}% confidence. Set GEMINI_API_KEY to "
            f"enable AI-generated descriptions."
        )

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=(
            f"Write a short, friendly 2-3 sentence description of the "
            f"animal in this image. It was classified as: {label} with "
            f"{confidence * 100:.2f}% confidence."
        ),
    )
    return response.text.strip()


@app.route("/api/classify", methods=["POST"])
def classify():
    if "image" not in request.files:
        return jsonify({"error": "No image file provided under field 'image'."}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"error": "Empty filename."}), 400

    try:
        input_tensor = preprocess_image(file.read())
        predictions = get_model().predict(input_tensor)[0]
        predicted_index = int(np.argmax(predictions))
        label = CLASS_NAMES[predicted_index]
        confidence = float(predictions[predicted_index])

        description = generate_description(label, confidence)

        return jsonify(
            {
                "label": label,
                "confidence": confidence,
                "description": description,
            }
        )
    except Exception as exc:  # noqa: BLE001 - surface a clean error to the UI
        return jsonify({"error": str(exc)}), 500


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)  # set debug=True for hot reload during development
