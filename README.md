\# 🐾 AI Animal Classifier



> A full-stack Computer Vision application for intelligent \*\*Cat vs Dog image classification\*\*, combining a custom deep learning pipeline, a Flask REST API, a React frontend, and Gemini-powered natural language descriptions.



<p align="center">



\*\*Computer Vision · Deep Learning · Transfer Learning · Flask · React · Gemini AI\*\*



</p>



\---



\## 📌 Overview



\*\*AI Animal Classifier\*\* is an end-to-end artificial intelligence application designed to classify animal images into two categories:



\- 🐱 \*\*Cat\*\*

\- 🐶 \*\*Dog\*\*



The project was built to demonstrate the complete lifecycle of a Computer Vision system — starting from image preprocessing and dataset preparation, moving through deep learning model training and inference, and finally integrating the trained model into a backend API and an interactive web interface.



Instead of treating image classification as only a model-training problem, this project connects the complete pipeline:



```text

┌──────────────────────┐

│      User Image      │

└──────────┬───────────┘

&#x20;          │

&#x20;          ▼

┌──────────────────────┐

│   React Frontend     │

│  Image Upload / UI   │

└──────────┬───────────┘

&#x20;          │ HTTP POST

&#x20;          ▼

┌──────────────────────┐

│    Flask Backend     │

│    REST API          │

└──────────┬───────────┘

&#x20;          │

&#x20;          ▼

┌──────────────────────┐

│ Image Preprocessing  │

│ RGB → Resize → Norm  │

└──────────┬───────────┘

&#x20;          │

&#x20;          ▼

┌──────────────────────┐

│  Trained Deep        │

│  Learning Model      │

│    MobileNetV2       │

└──────────┬───────────┘

&#x20;          │

&#x20;          ▼

┌──────────────────────┐

│ Prediction +         │

│ Confidence Score     │

└──────────┬───────────┘

&#x20;          │

&#x20;          ▼

┌──────────────────────┐

│    Gemini AI         │

│ Animal Description   │

└──────────┬───────────┘

&#x20;          │

&#x20;          ▼

┌──────────────────────┐

│ Results displayed    │

│ in the React UI      │

└──────────────────────┘

✨ Key Features

🖼️ Image Classification



Upload an image of a cat or dog and receive a predicted class from the trained deep learning model.



📊 Confidence Score



The application returns the model's prediction confidence and presents it visually in the frontend.



🤖 AI-Generated Description



After classification, Gemini can generate a short natural-language description of the detected animal.



⚛️ Interactive React Interface



The frontend provides:



Drag-and-drop image upload

Image preview

File validation

Loading state

Analysis animation

Prediction result

Confidence visualization

Error handling

Reset / replace image functionality

🐍 Flask REST API



The backend exposes an API endpoint that accepts an image and returns structured classification results.



Example response:



{

&#x20; "label": "cat",

&#x20; "confidence": 0.9999997615814209,

&#x20; "description": "AI-generated animal description"

}

🧠 Machine Learning



The classification system uses deep learning with transfer learning.



The project uses MobileNetV2 as the pretrained feature extraction backbone and a custom classification head for the final Cat/Dog prediction task.



Why Transfer Learning?



Training a deep convolutional neural network completely from scratch requires a large dataset and significant computational resources.



Transfer learning allows the project to start from a model that has already learned general visual features and adapt those features to the specific classification problem.



Conceptually:



Pretrained MobileNetV2

&#x20;         │

&#x20;         ▼

Learned Visual Features

&#x20;         │

&#x20;         ▼

Custom Classification Head

&#x20;         │

&#x20;         ▼

&#x20;    Cat / Dog



This makes the project more practical while still demonstrating important Computer Vision concepts.



🔬 Computer Vision Pipeline



The cv/ directory contains the main Computer Vision and machine learning workflow.



Dataset

&#x20;  │

&#x20;  ▼

Image Exploration

&#x20;  │

&#x20;  ▼

Dataset Preparation

&#x20;  │

&#x20;  ▼

Preprocessing

&#x20;  │

&#x20;  ├── Convert to RGB

&#x20;  ├── Resize to 224 × 224

&#x20;  └── Normalize pixel values

&#x20;  │

&#x20;  ▼

Training / Validation

&#x20;  │

&#x20;  ▼

Deep Learning Model

&#x20;  │

&#x20;  ▼

Model Evaluation

&#x20;  │

&#x20;  ▼

Saved Keras Model

&#x20;  │

&#x20;  ▼

Inference / Prediction

🖼️ Image Preprocessing



Before an image is passed to the neural network, it follows a consistent preprocessing pipeline.



1\. RGB Conversion



Images are converted to RGB format to ensure a consistent three-channel input.



Input Image

&#x20;    ↓

RGB

2\. Resizing



Every image is resized to:



224 × 224 × 3



This matches the input resolution used by the model pipeline.



3\. Normalization



Pixel values are normalized to the range:



\[0, 1]



This provides a consistent numerical representation for the neural network.



🧩 Model Architecture



The project uses a transfer-learning-based image classification approach centered around MobileNetV2.



The model can be viewed conceptually as:



Input Image

&#x20;  │

&#x20;  ▼

224 × 224 × 3

&#x20;  │

&#x20;  ▼

MobileNetV2

&#x20;  │

&#x20;  ▼

Visual Feature Extraction

&#x20;  │

&#x20;  ▼

Classification Head

&#x20;  │

&#x20;  ▼

2-Class Output

&#x20;  │

&#x20;  ├── Cat

&#x20;  └── Dog



The final prediction produces probabilities for the available classes.



The class with the highest probability becomes the predicted label.



📈 Prediction



For an input image, the model produces probabilities representing how strongly the model supports each class.



For example:



Cat: 99.99%

Dog:  0.01%



The application then selects the class with the highest probability.



The backend returns both:



Predicted Label

Confidence



This allows the frontend to communicate not only what the model predicted, but also how confident the prediction was.



🐍 Backend



The backend is implemented using Flask.



Its main responsibility is to provide a bridge between the web interface and the trained machine learning model.



Backend responsibilities

Receive Image

&#x20;    ↓

Validate Upload

&#x20;    ↓

Preprocess Image

&#x20;    ↓

Load / Run Model

&#x20;    ↓

Generate Prediction

&#x20;    ↓

Calculate Confidence

&#x20;    ↓

Generate Description

&#x20;    ↓

Return JSON Response



The main API endpoint is:



POST /api/classify



The image is sent to the endpoint using multipart form data.



Example:



curl -X POST http://127.0.0.1:5000/api/classify \\

&#x20; -F "image=@path/to/image.jpg"



Example response:



{

&#x20; "label": "cat",

&#x20; "confidence": 0.9999997615814209,

&#x20; "description": "AI-generated animal description"

}

⚛️ Frontend



The frontend is built with:



React

Vite

JavaScript

CSS



The interface is component-based and separates the main responsibilities into reusable React components.



Main Components

src/

│

├── App.jsx

│

├── components/

│   ├── Header.jsx

│   ├── Hero.jsx

│   ├── ClassifierCard.jsx

│   ├── ConfidenceRing.jsx

│   └── ResultsPanel.jsx

│

├── lib/

│   └── classify.js

│

└── assets/

ClassifierCard



Responsible for:



Selecting an image

Drag-and-drop upload

File validation

Image preview

Starting the analysis

Resetting the selected image

ResultsPanel



Responsible for displaying:



Predicted class

Confidence

Description

Loading state

Error state

Empty state

ConfidenceRing



Provides a visual representation of the model confidence.



🤖 Gemini Integration



The project can use Gemini to generate a human-readable description of the classified animal.



The machine learning model handles the visual classification:



Image → Cat / Dog + Confidence



Gemini handles the natural-language generation:



Classification Result → Animal Description



This creates a separation between:



Computer Vision

&#x20;       +

Generative AI



The API key is accessed through an environment variable:



os.getenv("GEMINI\_API\_KEY")



The actual API key is intentionally not stored in the repository.



🔐 Security



API credentials should never be committed to Git repositories.



The project uses an environment variable:



GEMINI\_API\_KEY=your\_api\_key\_here



The .env file is excluded from Git using .gitignore.



A safe template is provided through:



frontend/.env.example



Never replace the placeholder in the example file with a real API key before committing it.



📁 Project Structure

AI-Animal-Classifier/

│

├── backend/

│   ├── app.py

│   └── requirements.txt

│

├── cv/

│   ├── train.py

│   ├── predict.py

│   ├── preprocess.py

│   ├── explore\_image.py

│   ├── extract\_subset.py

│   └── check\_zip.py

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── assets/

│   │   ├── components/

│   │   ├── lib/

│   │   ├── App.jsx

│   │   ├── App.css

│   │   ├── index.css

│   │   └── main.jsx

│   ├── package.json

│   ├── package-lock.json

│   └── vite.config.js

│

├── model/

│   └── animal\_classifier.keras

│

├── .gitignore

└── README.md

🛠️ Technology Stack

Layer	Technology

Programming Language	Python

Machine Learning	TensorFlow / Keras

Computer Vision	PIL / NumPy

Deep Learning Architecture	MobileNetV2

Backend	Flask

API	REST

Frontend	React

Build Tool	Vite

Frontend Language	JavaScript

Generative AI	Gemini

Version Control	Git

Repository	GitHub

🚀 Installation \& Setup

1\. Clone the Repository

git clone https://github.com/Mariam-musa/AI-Animal-Classifier.git

cd AI-Animal-Classifier

🐍 Backend Setup



Navigate to the backend:



cd backend



Create a Python virtual environment:



python -m venv .venv



Activate it on Windows:



.venv\\Scripts\\Activate.ps1



Install the dependencies:



pip install -r requirements.txt



Run the Flask server:



python app.py



The backend will be available at:



http://127.0.0.1:5000

⚛️ Frontend Setup



Open a second terminal.



Navigate to:



cd frontend



Install the Node.js dependencies:



npm install



Start the Vite development server:



npm run dev



Open the local URL displayed by Vite, normally:



http://localhost:5173

🔑 Environment Variables



If Gemini descriptions are enabled, configure the API key as an environment variable.



Example:



GEMINI\_API\_KEY=your\_api\_key\_here



Do not commit the real value.



🧪 Testing the Backend



The API can be tested independently of the frontend.



Example:



curl -X POST http://127.0.0.1:5000/api/classify \\

&#x20; -F "image=@path/to/image.jpg"



A successful request should return a JSON response containing:



label

confidence

description



This makes it possible to verify the machine learning backend independently before connecting it to the React interface.



🔄 End-to-End Workflow



The complete application works as follows:



Step 1 — Upload



The user selects or drops an image into the React application.



Step 2 — Preview



The frontend creates a local preview of the uploaded image.



Step 3 — Analyze



The user clicks:



Analyze Image

Step 4 — API Request



React sends the image to:



POST /api/classify

Step 5 — Preprocessing



The backend prepares the image using the same preprocessing pipeline used by the model.



Step 6 — Inference



The trained model processes the image.



Step 7 — Classification



The model predicts:



Cat



or:



Dog



along with a confidence score.



Step 8 — Description



Gemini can generate a short natural-language description of the result.



Step 9 — Display



The frontend presents the final result to the user.



🎯 Project Goals



This project was developed to explore the practical implementation of a complete AI application rather than focusing only on model training.



The main learning goals include:



Understanding Computer Vision fundamentals

Working with image datasets

Building preprocessing pipelines

Understanding CNN-based image classification

Applying transfer learning

Using MobileNetV2

Training and saving Keras models

Performing model inference

Building REST APIs with Flask

Connecting machine learning models to web applications

Building reusable React components

Handling asynchronous frontend requests

Integrating generative AI

Managing environment variables and API credentials

Using Git and GitHub for version control

📚 What This Project Demonstrates



This project demonstrates how multiple AI and software engineering layers can work together:



&#x20;                AI APPLICATION

&#x20;                     │

&#x20;       ┌─────────────┴─────────────┐

&#x20;       │                           │

&#x20;Computer Vision              Web Application

&#x20;       │                           │

&#x20;       ▼                           ▼

&#x20;Image Processing              React Frontend

&#x20;       │                           │

&#x20;       ▼                           ▼

&#x20;Deep Learning                   Flask API

&#x20;       │                           │

&#x20;       └─────────────┬─────────────┘

&#x20;                     │

&#x20;                     ▼

&#x20;                AI Integration

&#x20;                     │

&#x20;                     ▼

&#x20;                 Gemini AI



The result is a complete pipeline from raw image → machine learning inference → API → user interface → AI-generated explanation.



🧠 Future Improvements



The current system focuses on Cat/Dog classification, but the architecture can be extended.



Potential improvements include:



More Animal Classes



Expand the classifier beyond:



Cat / Dog



to multiple animal categories.



Larger Dataset



Increase the number and diversity of training images to improve generalization.



Data Augmentation



Introduce transformations such as:



Rotation

Horizontal flipping

Zoom

Translation

Brightness variation



This can help the model become more robust to different image conditions.



Fine-Tuning



Instead of using MobileNetV2 only as a feature extractor, selected layers could be unfrozen and fine-tuned on the target dataset.



Model Evaluation



Add:



Accuracy

Precision

Recall

F1-score

Confusion matrix

Classification report

Deployment



Deploy the backend and frontend so the application can be accessed remotely.



Improved UX



Additional interface features could include:



Prediction history

Multiple image analysis

More detailed animal information

Better mobile responsiveness

Accessibility improvements

📸 Demo



The application provides an interactive interface where users can upload an animal image and receive:


![AI Animal Classifier Demo](screenshots/demo.png)


⚠️ Important Notes

API Keys



Never commit API keys, passwords, tokens, or other credentials to GitHub.



Model File



The trained model is included under:



model/animal\_classifier.keras

Dependencies



Frontend dependencies are intentionally not included in the repository as node\_modules.



Install them using:



npm install



Python dependencies are installed using:



pip install -r requirements.txt

👩‍💻 Author



Mariam Mousa



Computer Science / Artificial Intelligence Student



This project was developed as a hands-on exploration of Computer Vision, Deep Learning, backend development, frontend development, and Generative AI integration.



⭐ Project Highlights

✔ Computer Vision

✔ Deep Learning

✔ Transfer Learning

✔ MobileNetV2

✔ Image Preprocessing

✔ Model Training

✔ Model Inference

✔ Confidence Scoring

✔ Flask REST API

✔ React Frontend

✔ Vite

✔ Gemini AI Integration

✔ Environment Variable Security

✔ Git / GitHub

📄 License



This project is intended primarily for educational and portfolio purposes.



<p align="center">

🐱 Teach machines to see. 🐶

🤖 Connect intelligence to applications.



AI Animal Classifier



</p> ```

