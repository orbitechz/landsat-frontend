
# Landsat-Frontend

Welcome to the **Landsat-Frontend** repository! This is the front-end implementation for the Landsat Notification and Visualization System, which aims to provide users with an interactive and educational experience with satellite data. The frontend is built using React and various supporting libraries, including `react-leaflet` for geographic visualization. It connects users to real-time Landsat satellite overpass data, empowering them to monitor and analyze remote sensing imagery over their areas of interest.

## 📚 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [How It Works](#how-it-works)
  - [Target Location Input](#target-location-input)
  - [Satellite Overpass Tracking](#satellite-overpass-tracking)
  - [Notification System](#notification-system)
  - [Visualization and Analysis](#visualization-and-analysis)
- [Technologies Used](#technologies-used)
- [Project Goals](#project-goals)
- [License](#license)
- [Contact Information](#contact-information)

## 🌍 Project Overview

The **Landsat-Frontend** is an interactive web application that allows users to define a specific target location on Earth and receive notifications when a Landsat satellite will pass over that area. After the satellite has passed, users can view the corresponding Landsat Surface Reflectance (SR) data, enabling them to compare it with their own ground-based spectral measurements. The web-based interface provides visualization tools for analyzing and interpreting the data, supporting both scientific exploration and practical learning.

### 🎯 What Exactly Does It Do?
- Allows users to specify a geographic location and time of interest.
- Tracks upcoming Landsat satellite overpasses for the selected location.
- Sends real-time notifications when a satellite pass is imminent.
- Retrieves and displays Landsat Surface Reflectance data for the specified region and time.
- Supports comparison between satellite and ground-based spectral data.
- Provides interactive tools for visualizing and analyzing environmental data.

### 🛠️ How Does It Work?
1. **Target Location Input**: Users define their target location through the web interface using an interactive map.
2. **Satellite Overpass Tracking**: The system leverages publicly available satellite orbit data to predict when a Landsat satellite will pass over the selected area.
3. **Notification System**: When a pass is imminent, the application sends alerts to the user, ensuring they don't miss the overpass.
4. **Data Visualization**: Once the satellite has passed, the application retrieves the corresponding Landsat Surface Reflectance data. This data is then displayed alongside the user’s own ground-based measurements, providing a comparative view.

### 💡 Benefits
- **Experiential Learning**: Users can explore real satellite data, enhancing their understanding of remote sensing concepts.
- **Interdisciplinary Approach**: Combines elements of geography, environmental science, and data analysis.
- **Scientific Exploration**: Facilitates research and monitoring of environmental changes.
- **Informed Decision-Making**: Supports data-driven insights into environmental issues.

## ✨ Features
- **Interactive Map Interface** using React-Leaflet for precise location selection.
- **Real-Time Notifications** for satellite overpasses.
- **Satellite Data Integration** for displaying Landsat Surface Reflectance imagery.
- **Comparison Tools** for analyzing ground-based and satellite spectral measurements.
- **Data Visualization** using charts and spectral signatures.

## 🚀 Getting Started

Follow the instructions below to set up and run the project on your local machine.

### Prerequisites
- Node.js (v14 or later)
- npm or yarn
- Basic understanding of React and JavaScript

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/orbitechz/landsat-frontend.git
   cd landsat-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   Or, if you prefer `yarn`:
   ```bash
   yarn install
   ```

### Running the Application
1. Start the development server:
   ```bash
   npm start
   ```
   Or with `yarn`:
   ```bash
   yarn start
   ```

2. Open your browser and navigate to `http://localhost:3000` to view the application.

## 🧠 How It Works

### Target Location Input
Users can define a specific location using an interactive map interface provided by `react-leaflet`. Simply select the desired area on the map, and the coordinates will be saved as the target location for monitoring.

### Satellite Overpass Tracking
Using external APIs and satellite orbit data, the application calculates when a Landsat satellite will pass over the target location. This prediction is based on orbit models and timing parameters, ensuring accurate overpass tracking.

### Notification System
The application provides real-time notifications through the web interface, alerting users when an overpass is approaching. This feature ensures that users have ample time to prepare for data collection.

### Visualization and Analysis
After the satellite has passed, the system retrieves the corresponding Landsat Surface Reflectance (SR) data for the specified location and time. Users can then view the data using intuitive visualization tools, such as:
- **Color-Composite Images**: View the satellite image in true or false color.
- **Spectral Signature Graphs**: Compare spectral signatures from satellite and ground-based measurements.
- **Statistical Analysis**: Calculate NDVI (Normalized Difference Vegetation Index) and other indices.

## 💻 Technologies Used
The frontend is built using modern web development frameworks and libraries:
- **React** - for building the user interface.
- **React-Leaflet** - for mapping and geographic visualization.
- **Axios** - for making API requests.
- **Recharts** - for data visualization and graphing.
- **CSS Modules** - for styling components.

## 🎯 Project Goals
- **Accessibility**: Make satellite data accessible and understandable to a wider audience.
- **Educational Support**: Create a learning platform that supports environmental science education.
- **Scientific Contribution**: Encourage users to engage in environmental research and contribute to monitoring efforts.

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## 📧 Contact Information
For questions, suggestions, or feedback, please reach out to:

- **GitHub**: [orbitechz](https://github.com/orbitechz)
