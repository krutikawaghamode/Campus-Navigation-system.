// Campus locations
const locations = {
    "Main Gate": {
        lat: 14.4756669,
        lng: 75.8848120
    },

    "Admin Block": {
        lat: 14.4756669,
        lng: 75.8848120
    },

    "Library": {
        lat: 14.4756669,
        lng: 75.8848120
    },

    "CSE Department": {
        lat: 14.4756669,
        lng: 75.8848120
    },

    "Canteen": {
        lat: 14.4756669,
        lng: 75.8848120
    },

    "Auditorium": {
        lat: 14.4756669,
        lng: 75.8848120
    },

    "Hostel": {
        lat: 14.4756669,
        lng: 75.8848120
    },

    "Sports Ground": {
        lat: 14.4756669,
        lng: 75.8848120
    }
};


// Create map
const map = L.map("map").setView(
    [14.4756669, 75.8848120],
    17
);


// OpenStreetMap
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap contributors"
    }
).addTo(map);


// Add markers
Object.keys(locations).forEach(name => {

    const location = locations[name];

    L.marker([
        location.lat,
        location.lng
    ])
    .addTo(map)
    .bindPopup(`<b>${name}</b>`);

});


// Add locations to dropdowns
const startSelect = document.getElementById("start");
const destinationSelect =
    document.getElementById("destination");

Object.keys(locations).forEach(name => {

    const option1 = document.createElement("option");

    option1.value = name;
    option1.textContent = name;

    startSelect.appendChild(option1);


    const option2 = document.createElement("option");

    option2.value = name;
    option2.textContent = name;

    destinationSelect.appendChild(option2);

});


// Route line
let routeLine = null;


// Find route
function findRoute() {

    const start = startSelect.value;
    const destination = destinationSelect.value;

    if (!start || !destination) {

        alert("Please select both locations.");

        return;
    }

    if (start === destination) {

        alert("Starting point and destination cannot be the same.");

        return;
    }


    const startPoint = locations[start];
    const endPoint = locations[destination];


    // Draw route
    if (routeLine) {
        map.removeLayer(routeLine);
    }


    routeLine = L.polyline(
        [
            [startPoint.lat, startPoint.lng],
            [endPoint.lat, endPoint.lng]
        ],
        {
            color: "blue",
            weight: 6
        }
    ).addTo(map);


    // Zoom to route
    map.fitBounds(routeLine.getBounds());


    // Calculate distance
    const distance = calculateDistance(
        startPoint.lat,
        startPoint.lng,
        endPoint.lat,
        endPoint.lng
    );


    // Walking speed
    const walkingSpeed = 80;

    const walkingTime = Math.ceil(
        distance / walkingSpeed
    );


    // Display information
    document.getElementById("result").innerHTML = `

        <h3>🧭 Route Found</h3>

        <p>
            <strong>From:</strong>
            ${start}
        </p>

        <p>
            <strong>To:</strong>
            ${destination}
        </p>

        <p>
            <strong>Distance:</strong>
            ${distance.toFixed(0)} metres
        </p>

        <p>
            <strong>Walking Time:</strong>
            ${walkingTime} minutes
        </p>

    `;
}


// Distance calculation
function calculateDistance(
    lat1,
    lon1,
    lat2,
    lon2
) {

    const R = 6371000;

    const dLat =
        (lat2 - lat1) * Math.PI / 180;

    const dLon =
        (lon2 - lon1) * Math.PI / 180;


    const a =
        Math.sin(dLat / 2) *
        Math.sin(dLat / 2) +

        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *

        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);


    const c =
        2 * Math.atan2(
            Math.sqrt(a),
            Math.sqrt(1 - a)
        );


    return R * c;
}


// Clear route
function clearRoute() {

    if (routeLine) {

        map.removeLayer(routeLine);

        routeLine = null;
    }


    document.getElementById("result").innerHTML = `

        <h3>Route Information</h3>

        <p>Select locations to find a route.</p>

    `;

    map.setView(
        [12.9728, 77.5955],
        17
    );
}