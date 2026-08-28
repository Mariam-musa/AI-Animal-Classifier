# 🐾 AI Animal Classifier

> A full-stack Computer Vision application for intelligent **Cat vs Dog image classification**, combining deep learning, transfer learning with MobileNetV2, a Flask REST API, a React frontend, and Gemini-powered animal descriptions.

<p align="center">
  <b>Computer Vision · Deep Learning · Transfer Learning · Flask · React · Gemini AI</b>
</p>

<p align="center">
  <img alt="Python" src="https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white">
  <img alt="TensorFlow" src="https://img.shields.io/badge/TensorFlow-Keras-FF6F00?logo=tensorflow&logoColor=white">
  <img alt="Flask" src="https://img.shields.io/badge/Backend-Flask-000000?logo=flask&logoColor=white">
  <img alt="React" src="https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=black">
  <img alt="Vite" src="https://img.shields.io/badge/Build-Vite-646CFF?logo=vite&logoColor=white">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green">
</p>

---

## 📸 Demo

The application provides an interactive interface where users can upload an animal image and receive a classification, confidence score, and AI-generated description.

### 🐱 Cat Prediction

<p align="center">
  <img src="screenshots/demo.png" alt="AI Animal Classifier - Cat prediction" width="850">
</p>

### 🐶 Dog Prediction

<p align="center">
  <img src="screenshots/dog-demo.png" alt="AI Animal Classifier - Dog prediction" width="850">
</p>

---

## 📌 Overview

**AI Animal Classifier** is an end-to-end Computer Vision application that classifies animal images into two categories:

- 🐱 **Cat**
- 🐶 **Dog**

The project demonstrates the complete lifecycle of a Computer Vision application, from image preprocessing and model inference to backend API integration and an interactive web interface.

The system connects the following components:

```text
User Image
     │
     ▼
React Frontend
(Image Upload / UI)
     │
     │ HTTP POST
     ▼
Flask REST API
     │
     ▼
Image Preprocessing
RGB → Resize → Normalize
     │
     ▼
MobileNetV2 Model
     │
     ▼
Prediction + Confidence
     │
     ▼
Gemini AI
(Animal Description)
     │
     ▼
React UI
(Display Results)
