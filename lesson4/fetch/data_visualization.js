google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(fetchData);

//Paranneltu versio
// ThingSpeak URL
const url =
  "https://api.thingspeak.com/channels/3096072/feeds.json?api_key=EFUW4BEPH4YUMLQN";

// Hae data ThingSpeakistä ja piirrä chart
function fetchData() {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const feeds = data.feeds;

      // Muodosta taulukko Google Chartille
      const chartData = [["Time", "Temperature"]];
      feeds.forEach((feed) => {
        const time = new Date(feed.created_at);
        const temp = parseFloat(feed.field1);
        if (!isNaN(temp)) {
          chartData.push([time, temp]);
        }
      });

      drawChart(chartData);
    })
    .catch((error) => {
      console.log("Error fetching data", error);
      document.getElementById("output").textContent = "Error loading data";
    });
}

// Piirrä kaavio Google Chartilla
function drawChart(chartData) {
  const data = google.visualization.arrayToDataTable(chartData);

  const options = {
    title: "Temperatures",
    curveType: "function",
    legend: { position: "bottom" },
  };

  const chart = new google.visualization.LineChart(
    document.getElementById("curve_chart")
  );
  chart.draw(data, options);
}
