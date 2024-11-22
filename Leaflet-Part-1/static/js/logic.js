// Create the map
const map = L.map('map').setView([37.09, -95.71], 5);  // Centered on the US

// Define different tile layers for map views
const satellite = L.tileLayer('https://{s}.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=YOUR_MAPBOX_ACCESS_TOKEN', {
    attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18
});

const greyscale = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://carto.com/attributions">CartoDB</a>',
    maxZoom: 18
});

const outdoors = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18
});

// Add default tile layer (Outdoors view)
outdoors.addTo(map);

// Fetch earthquake data
fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson')
    .then(response => response.json())
    .then(data => {
        const earthquakeLayer = L.layerGroup();

        // Add markers for each earthquake
        data.features.forEach(feature => {
            const lat = feature.geometry.coordinates[1];
            const lon = feature.geometry.coordinates[0];
            const magnitude = feature.properties.mag;
            const depth = feature.geometry.coordinates[2];
            const place = feature.properties.place;
            const time = new Date(feature.properties.time);

            L.circleMarker([lat, lon], {
                radius: magnitude * 4,  // Adjust size based on magnitude
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
            .addTo(earthquakeLayer);
        });

        // Add the earthquake layer to the map
        earthquakeLayer.addTo(map);

        // Create the legend for depth
        const legend = L.control({position: 'bottomright'});

        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'info legend');
            const depthRanges = [0, 20, 50, 100, 300, 700];
            const colors = ['#FFEDA0', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

            for (let i = 0; i < depthRanges.length; i++) {
                div.innerHTML +=
                    '<i style="background:' + colors[i] + '"></i> ' +
                    depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + ' km<br>' : '+ km');
            }
            return div;
        };

        legend.addTo(map);

        // Layer control
        const baseLayers = {
            "Satellite": satellite,
            "Greyscale": greyscale,
            "Outdoors": outdoors
        };

        const overlays = {
            "Earthquakes": earthquakeLayer
        };

        L.control.layers(baseLayers, overlays).addTo(map);
    })
    .catch(error => console.error('Error fetching earthquake data:', error));

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

