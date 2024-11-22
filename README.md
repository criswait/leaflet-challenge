## Earthquake and Tectonic Plates Map Visualization
This project visualizes earthquake data and tectonic plate boundaries using Leaflet.js, with multiple map view options (Satellite, Greyscale, Outdoors) and interactive layers. The map fetches live data from the USGS Earthquake API and displays it as markers based on earthquake magnitude and depth. The tectonic plates are drawn from the USGS ArcGIS service.

## Features:
- Interactive Map: Visualizes global earthquake data with custom markers.
- Multiple Map Views: Toggle between Satellite, Greyscale, and Outdoors map views.
- Earthquake Data Layer: Markers size and color represent the magnitude and depth of earthquakes.
- Tectonic Plates Layer: Display tectonic plate boundaries fetched from the USGS ArcGIS service.
- Popup Information: Click on earthquake markers for detailed information (magnitude, depth, location, time).
- Legend: Provides context for depth and marker color.
- Layer Control: Toggle layers for earthquakes and tectonic plates.

## Technologies:
- Leaflet.js: For rendering and interacting with the map.
- D3.js: For manipulating and visualizing data (though not explicitly used for visualization in this case).
- GeoJSON: For rendering tectonic plate boundaries.
- Fetch API: To retrieve earthquake and tectonic plates data in real-time.

## Setup:
### Prerequisites:
- Ensure you have a working internet connection to fetch the required data (earthquake data and tectonic plate boundaries).
- Mapbox Token: If using the Satellite view, you’ll need a Mapbox API token. Get one by signing up at Mapbox.

## Files:
index.html: Main HTML file that sets up the map and layers.
style.css: CSS for styling the map container and layers.
logic.js: JavaScript code to fetch and display earthquake and tectonic plate data.
