import axios from "axios";

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  // Helper function for pretty JSON
  const sendPretty = (data, status = 200) => {
    res.status(status).end(JSON.stringify(data, null, 2)); // 2-space indentation
  };

  // Allow only GET
  if (req.method !== "GET") {
    return sendPretty({
      success: false,
      message: "Only GET allowed"
    }, 405);
  }

  // ?url=
  const url = req.query.url;
  if (!url) {
    return sendPretty({
      success: false,
      message: "Missing ?url="
    }, 400);
  }

  try {
    // Reelsaver API
    const apiUrl = `https://reelsaver.vercel.app/api/video?postUrl=${encodeURIComponent(
      url
    )}`;

    const response = await axios.get(apiUrl, {
      headers: {
        "Accept": "*/*",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Mobile Safari/537.36",
        "Referer": "https://reelsaver.vercel.app/",
        "Origin": "https://reelsaver.vercel.app"
      }
    });

    return sendPretty({
      success: true,
      data: response.data
    }, 200);

  } catch (err) {
    return sendPretty({
      success: false,
      message: err.message,
      details: err.response?.data || null
    }, 500);
  }
}
