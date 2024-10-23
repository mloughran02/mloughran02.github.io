const AIO_USERNAME = "YOUR_AIO_USERNAME";
const AIO_KEY = "YOUR_AIO_KEY";

function fetchData() {
    const feeds = ["temperature", "humidity", "light"];
    feeds.forEach(feed => {
        $.ajax({
            url: `https://io.adafruit.com/api/v2/${AIO_USERNAME}/feeds/${feed}/data/last`,
            method: 'GET',
            headers: {
                'X-AIO-Key': AIO_KEY,
            },
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

// Fetch data every 10 seconds
setInterval(fetchData, 10000);
fetchData(); // Initial fetch
