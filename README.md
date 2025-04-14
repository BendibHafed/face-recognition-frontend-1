# Face Recognition Fullstack App

<div align="center">
  <img src="https://via.placeholder.com/800x400?text=Face+Recognition+Demo" alt="App Demo">
</div>

## 📌 Table of Contents
- [Features](#-features)
- [How It Works](#-how-it-works)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the App](#-running-the-app)
- [About the Developer](#-about-the-developer)

## ✨ Features
- 🔒 User authentication (Register/Login)
- 🔍 Face detection in images via URL
- 📊 User profile with entry count
- ✨ Interactive particle background
- 🚀 Single-page application with smooth routing

## 🤖 How It Works
The app uses Clarifai's AI API to detect faces in images:

1. User enters an image URL
2. Frontend sends to Node.js backend
3. Backend processes with Clarifai API
4. Returns face coordinates and updates count
5. Frontend displays image with bounding box

```javascript
// Core face detection logic
calculateFaceLocation = (data) => {
  const face = data.outputs[0].data.regions[0].region_info.bounding_box;
  return {
    leftCol: face.left_col * width,
    topRow: face.top_row * height,
    rightCol: width - (face.right_col * width),
    bottomRow: height - (face.bottom_row * height)
  };
}