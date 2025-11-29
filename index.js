// index.js
const axios = require("axios");

// Pretty print helper
function pretty(data) {
  console.log(JSON.stringify(data, null, 2));
}

async function run() {
  const url = "https://api.videodropper.app/allinone";

  try {
    const response = await axios.get(url, {
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Origin": "https://reelsave.app",
        "Referer": "https://reelsave.app/",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Sec-CH-UA": '"Chromium";v="137", "Not/A)Brand";v="24"',
        "Sec-CH-UA-Mobile": "?1",
        "Sec-CH-UA-Platform": '"Android"',
        "If-None-Match": 'W/"5cf-Aelj057UN+bQXn0+13m/soAWqaA"' // from your log
      }
    });

    pretty(response.data);
  } catch (err) {
    pretty({
      error: true,
      message: err.message,
      details: err.response?.data || null
    });
  }
}

run();
