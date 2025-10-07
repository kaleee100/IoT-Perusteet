const url =
  "https://api.thingspeak.com/channels/3096072/feeds.json?api_key=EFUW4BEPH4YUMLQN&results=10";

// Alkuperäinen harjoitus
// Hae data thingspeakistä ja syötä "output" kenttään
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const feeds = data.feeds;
    const temperatures = feeds.map((feed) => ({
      time: feed.created_at,
      temp: parseFloat(feed.field1),
    }));
    document.getElementById("output").textContent =
      JSON.stringify(temperatures);
  })
  .catch((error) => {
    console.log("Error fetching data", error);
    document.getElementById("output").textContent = "Error loadin data";
  });
