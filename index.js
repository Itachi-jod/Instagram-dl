const axios = require("axios");

// Pretty print helper
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Only GET method
  if (req.method !== "GET") {
    return res.end(pretty({ success: false, message: "Only GET allowed" }));
  }

  // Query param
  const postUrl = req.query.postUrl;
  if (!postUrl) {
    return res.end(
      pretty({
        success: false,
        message: "Missing ?postUrl="
      })
    );
  }

  try {
    // API endpoint (replace with your backend or any extractor)
    const apiUrl = `https://api.videodropper.app/instagram?url=${encodeURIComponent(
      postUrl
    )}`;

    // Perfect Instagram-like browser headers
    const response = await axios.get(apiUrl, {
      headers: {
        "Accept": "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        "Origin": "https://reelsaver.vercel.app",
        "Referer": "https://reelsaver.vercel.app/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Sec-CH-UA": '"Chromium";v="137", "Not/A)Brand";v="24"',
        "Sec-CH-UA-Mobile": "?1",
        "Sec-CH-UA-Platform": '"Android"'
      }
    });

    return res.end(pretty(response.data));
  } catch (err) {
    return res.end(
      pretty({
        success: false,
        message: err.message,
        details: err.response?.data || null
      })
    );
  }
};
