async function fetchData(type) {
    try {
        const response = await fetch(`https://adafruit-proxy.onrender.com/${type}`);
        const data = await response.json();
        return data.value;
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        return "Error";
    }
}

async function displayData() {
    const temperature = await fetchData("temperature");
    const humidity = await fetchData("humidity");
    const light = await fetchData("light");

    document.getElementById("temperature").innerText = `Temperature: ${temperature}°C`;
    document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
    document.getElementById("light").innerText = `Light: ${light} lux`;
}

// Call displayData initially and refresh every minute
displayData();
setInterval(displayData, 60000);
