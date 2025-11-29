const axios = require("axios");

// Pretty print helper
function pretty(obj) {
  return JSON.stringify(obj, null, 2);
}

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "application/json");

  // Root check
  if (req.url === "/" || req.query?.ping === "1") {
    return res.end(
      pretty({ status: "VideoDropper Proxy API is running" })
    );
  }

  // Only GET supported
  if (req.method !== "GET") {
    return res.end(
      pretty({
        success: false,
        message: "Only GET method allowed"
      })
    );
  }

  const userUrl = req.query.url;

  if (!userUrl) {
    return res.end(
      pretty({
        success: false,
        message: "Missing parameter ?url="
      })
    );
  }

  try {
    const apiUrl = `https://api.videodropper.app/allinone?url=${encodeURIComponent(
      userUrl
    )}`;

    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        Origin: "https://reelsave.app",
        Referer: "https://reelsave.app/",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "Sec-CH-UA": '"Chromium";v="137", "Not/A)Brand";v="24"',
        "Sec-CH-UA-Mobile": "?1",
        "Sec-CH-UA-Platform": '"Android"',
        "If-None-Match": 'W/"5cf-Aelj057UN+bQXn0+13m/soAWqaA"'
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
