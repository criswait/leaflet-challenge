// Create the map
const map = L.map('map').setView([37.09, -95.71], 5);  

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Retrievearthquake data
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    .then(response => response.json())
    .then(data => {
        // Function to define color based on depth
        function getColor(depth) {
            return depth > 700 ? '#800026' :
                   depth > 300 ? '#BD0026' :
                   depth > 100 ? '#E31A1C' :
                   depth > 50  ? '#FC4E2A' :
                   depth > 20  ? '#FD8D3C' :
                   depth > 0   ? '#FEB24C' :
                                 '#FFEDA0';
        }

        // Function to define marker size based on magnitude
        function getRadius(magnitude) {
            return magnitude * 4;  // Adjust size based on magnitude
        }

        // Add markers for each earthquake
        data.features.forEach(feature => {
            const lat = feature.geometry.coordinates[1];
            const lon = feature.geometry.coordinates[0];
            const magnitude = feature.properties.mag;
            const depth = feature.geometry.coordinates[2];
            const place = feature.properties.place;
            const time = new Date(feature.properties.time);

            // Create a circle marker with size based on magnitude and color based on depth
            L.circleMarker([lat, lon], {
                radius: getRadius(magnitude),
                fillColor: getColor(depth),
                color: '#000',
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            })
            .bindPopup(`
                <b>Location:</b> ${place} <br>
                <b>Magnitude:</b> ${magnitude} <br>
                <b>Depth:</b> ${depth} km <br>
                <b>Time:</b> ${time.toLocaleString()}
            `)
            .addTo(map);
        });

        // Create the legend
        const legend = L.control({position: 'bottomright'});

        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'info legend');
            const depthRanges = [0, 20, 50, 100, 300, 700];
            const colors = ['#FFEDA0', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

            // Loop through depth ranges and create a legend
            for (let i = 0; i < depthRanges.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + colors[i] + '"></i> ' +
                    depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + ' km<br>' : '+ km');
            }

            return div;
        };

        legend.addTo(map);
    })
    .catch(error => console.error('Error fetching earthquake data:', error));
