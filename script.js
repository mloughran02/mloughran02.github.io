// Get references to the HTML elements where the data will be displayed
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const lightElement = document.getElementById('light');

// Function to fetch data from the Render service
async function fetchData() {
    try {
        // Fetch data from the Render API for temperature, humidity, and light
        const temperatureResponse = await fetch('https://adafruit-proxy.onrender.com/temperature');
        const humidityResponse = await fetch('https://adafruit-proxy.onrender.com/humidity');
        const lightResponse = await fetch('https://adafruit-proxy.onrender.com/light');

        // Check if the responses are OK (status 200)
        if (!temperatureResponse.ok || !humidityResponse.ok || !lightResponse.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON data from the responses
        const temperatureData = await temperatureResponse.json();
        const humidityData = await humidityResponse.json();
        const lightData = await lightResponse.json();

        // Update the HTML elements with the fetched data
        temperatureElement.innerText = `Temperature: ${temperatureData[0]?.value} °C`;
        humidityElement.innerText = `Humidity: ${humidityData[0]?.value} %`;
        lightElement.innerText = `Light: ${lightData[0]?.value} Lux`;
    } catch (error) {
        console.error('Error fetching data:', error);
        // Optional: Display an error message in the HTML
        temperatureElement.innerText = 'Error fetching temperature data';
        humidityElement.innerText = 'Error fetching humidity data';
        lightElement.innerText = 'Error fetching light data';
    }
}

// Fetch data initially
fetchData();
// Refresh data every 5 seconds
setInterval(fetchData, 5000);

