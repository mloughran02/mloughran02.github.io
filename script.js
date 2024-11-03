// Define the base URL for the Render proxy server
const BASE_URL = 'https://adafruit-proxy.onrender.com';

// Function to fetch data from each feed and update the HTML elements
function fetchData() {
    const feeds = ["temperature", "humidity", "light"];
    feeds.forEach(feed => {
        $.ajax({
            url: `${BASE_URL}/${feed}`, // Access Render proxy for each feed
            method: 'GET',
            success: function(data) {
                if (feed === "temperature") {
                    $("#temperature").text(data.value);
                } else if (feed === "humidity") {
                    $("#humidity").text(data.value);
                } else if (feed === "light") {
                    $("#light").text(data.value);
                }
            },
            error: function(err) {
                console.error("Error fetching data: ", err);
            }
        });
    });
}

// Initial fetch and then repeat every 10 seconds
fetchData();
setInterval(fetchData, 10000);
